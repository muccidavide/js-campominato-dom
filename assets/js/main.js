// Funzione creazione griglia
let cellsElement = document.querySelector('.cells');
let submitClick = document.getElementById('play')

let userDifficultyChoice = submitClick.addEventListener('click', function(){
    let difficultySelectorElement = document.getElementById('difficulty').value;
    let cellNumber;

    //Reset Griglia e valori
    cellsElement.innerHTML = '';
    
    //Livello di difficolta
    if (difficultySelectorElement === 'easy') {
        cellNumber = 100;
        cellForRowNumber = 10;
    } else if (difficultySelectorElement === 'medium'){
        cellNumber = 81;
        cellForRowNumber = 9;
    } else {
        cellNumber = 49;
        cellForRowNumber = 7;
    }

    // Generare Griglia

    generateGrid(cellsElement, 'div', 'cell', cellNumber);

    // Selezione Celle
    activateCell('.cell', cellNumber)
   
})


function generateGrid(selector, tag_name, class_name, limit) {

    const gameAreaElement = document.querySelector('.cells')

    // pulire area di gioco
    gameAreaElement.innerHTML = ''
  
    for (let index = 1; index <= limit; index++) {
        let cellItem = document.createElement(tag_name);
        selector.append(cellItem);
        cellItem.classList.add(class_name);
        cellItem.style.width = `calc(100% / ${cellForRowNumber})`
        cellItem.append(index)

        gameAreaElement.append(cellItem)   
    } 
}

function activateCell(class_name, cellNumber) {

    const cells = document.querySelectorAll(class_name)
    //console.log(cells);
    let bombsNumber = bombsGenerator(cellNumber);
    console.log(bombsNumber);
    // valori per vittoria utente
    let victoryNumber = cells.length - bombsNumber.length;
    let userNumbersPlayed = [];
    
  
    for (let index = 0; index < cells.length; index++) {

        const cell = cells[index];
        let cellNumber = index + 1;
        
        cell.addEventListener('click', function letsPlay() {
            let endGameBooleanValue = false;

            // Utente seleziona cella senza bomba    
            if (bombsNumber.indexOf(cellNumber) === -1 && userNumbersPlayed.indexOf(cellNumber)  === -1 ) {

                cell.style.backgroundColor = 'cornflowerblue';
                cell.style.color = 'white';
                userNumbersPlayed.push(cellNumber)
                console.log(userNumbersPlayed);

                // VITTORIA!!! : se numero giocate === numero vittoria 
                if (userNumbersPlayed === victoryNumber) {
                    let loose = document.createElement('div')
                    loose.classList.add('loose')
                    document.querySelector('.container').append(loose)
                    document.querySelector('.container .loose').insertAdjacentHTML('beforeend', `<span>Hai Vinto! Mosse corette: ${userNumbersPlayed.length}</span>`)
                    endGameBooleanValue = true;
                }
                
                
                // Utente Seleziona una bomba e perde
            } else if(bombsNumber.includes(cellNumber) && userNumbersPlayed.indexOf(cellNumber)  === -1 ){
                cell.style.backgroundColor = 'red';
                userNumbersPlayed.push(cellNumber)

                let loose = document.createElement('div')
                loose.classList.add('loose')
                document.querySelector('.container').append(loose)
                document.querySelector('.container .loose').insertAdjacentHTML('beforeend', `<span>Hai Perso! Mosse corette: ${userNumbersPlayed.length}</span>`)
                endGameBooleanValue = true;

                
            } 


       

        })

        

    }
}

/* 
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe :bomba:.
I numeri nella lista delle bombe non possono essere duplicati.
*/

function bombsGenerator(cellNumber) {
    let bombs = [];

    while(bombs.length < 16){
        let randomNumbers = Math.floor(Math.random() * cellNumber) +1;
        
        if (bombs.indexOf(randomNumbers) === -1) {
            bombs.push(randomNumbers);
        }
    }

    return bombs;
}
