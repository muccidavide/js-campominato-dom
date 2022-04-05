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

    generateGrid(cellsElement, 'div', 'cell', cellNumber)
    activateCell('.cell')
   
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

function activateCell(class_name) {
    const cells = document.querySelectorAll(class_name)
    //console.log(cells);
  
    for (let index = 0; index < cells.length; index++) {
      const cell = cells[index];
      cell.addEventListener('click', function () {
        cell.style.backgroundColor = 'cornflowerblue';
        cell.style.color = 'white';

      })
    }
}

/* 
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe :bomba:.
I numeri nella lista delle bombe non possono essere duplicati.
*/

function bombsGenerator() {
    let bombs = [];

    while(bombs.length < 16){
        let randomNumbers = Math.floor(Math.random() * 16) +1;
        
        if (bombs.indexOf(randomNumbers) === -1) {
            bombs.push(randomNumbers);
        }
    }
    //console.log(bombs);

}
