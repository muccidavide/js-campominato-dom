/* Campo Minato */

// selection of DOM input node to choose difficulty 

const levelButtonElement = document.getElementById('play');

// EventListener to click to select difficulty and set param to generate bombs and grid

levelButtonElement.addEventListener('click', function(event) {

    let difficultyData = levelChoice(event);
    
    generateGrid(difficultyData)

    letsPLay(difficultyData)

    
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

function levelChoice(event) {
        const userLevelChoiceElement = document.getElementById('difficulty');
        let levelChosed = userLevelChoiceElement.value;
        let cellNumber;
        let colsNumber;

        // scelta livello
    
        switch (levelChosed) {
            case "easy": 
                cellNumber = 100;
                colsNumber = 10;
                    
                break;
            case "medium": 
                cellNumber = 81;
                colsNumber = 9;
                
                break;
            case "hard": 
                cellNumber = 49;
                colsNumber = 7;
                
                break;
        }
        /// creazione Bombe

        let bombsNumbers = bombsGenerator(cellNumber);
        return {
            bombs: bombsNumbers, 
            cell:cellNumber, 
            cols: colsNumber};
    } 
/**
 * Returns an array of random numbers between 1 and cellNumber values
 * @param {number} cellNumber The minimun number to generate the bombs from
 * @returns {array} 
 */

function bombsGenerator(cellNumber) {
    
    let bombArray = [];
        while (bombArray.length !== 16){

            let newBomb = Math.floor(Math.random() * cellNumber) + 1;
            if (!bombArray.includes(newBomb)){
                bombArray.push(newBomb)
            }

        }

    return bombArray
   
}

/**
 * 
 * @param {object} difficultyData object with cell number, cols number and bombs number
 */
function generateGrid(difficultyData) {
    let tableBoxElement = document.querySelector('.cells');
    tableBoxElement.innerHTML = "";
    
    for (let i = 1; i <= difficultyData.cell; i++) {
        let newCell =  document.createElement("div");
        newCell.classList.add("cell");
        tableBoxElement.append(newCell)
        newCell.insertAdjacentHTML("beforeend", i )
        newCell.style.width = `calc(100%/${difficultyData.cols})`;

    }
    
}

/**
 * 
 * @param {object} difficultyData object with cell number, cols number and bombs number
 */

function letsPLay(difficultyData) {
    let cellElement = document.querySelectorAll(".cell");
    let bombsNumber = difficultyData.bombs.sort((a, b) => a - b);;
    let victoryNumbers = cellElement.length - bombsNumber.length;
    let userNumbers = [];

    cellElement.forEach((cell, index) => {
        
        cell.bombs = bombsNumber;
        cell.victory = victoryNumbers;
        cell.index = index
        cell.cellElement = cellElement
        cell.userNumbers = userNumbers
    
        
        cell.addEventListener('click', winOrLoose)
        
    });
    
}

// Main function to play game when selecting cell

function winOrLoose(event) {
    // keep data from target to pass it to Event Listener
    let bombsNumber = event.target.bombs;
    let victoryNumbers = event.target.victory
    let index = event.target.index
    let userNumbers = event.target.userNumbers
    
    // check if number is a bomb or not
    if (!bombsNumber.includes(index + 1)){
        this.style.backgroundColor = "blue";
        this.style.color = "white";

        if (!userNumbers.includes(index + 1)) {
            userNumbers.push(index + 1)
            // Victory condition
            if (userNumbers.length == victoryNumbers) {
                alert("Bravissimo Hai Vinto")
                
            } 
        }
        
    } else {
        // Game Over if cell is a bomb and stop the game
        game_over(bombsNumber)
        console.log(userNumbers);
        alert(`Oops Hai perso tentativi corretti ${userNumbers.length}`)
    }
}

/**
 * 
 * @param {number} bombsNumber // bombs number random generated
 */

function game_over(bombsNumber,) {
  // show all bombs and remove event listener
  const cells = document.querySelectorAll('.cell') 


  /* End game with a loop and remove eventListener form all cells */
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    // remove event listner
    cell.removeEventListener('click', winOrLoose) 
    // show all bombsNumber
    if (bombsNumber.includes(Number(cell.innerText))) {
      cell.style.backgroundColor = 'red'
      cell.innerText = '💣'
    }
  }
}