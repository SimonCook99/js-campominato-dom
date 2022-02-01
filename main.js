//contenitore della griglia
let gridContainer = document.getElementById("grid");

//contenitore del selettore difficoltà
let difficultySelection = document.getElementById("difficoltà");

//bottone che conferma la difficoltà scelta
let gridSizeButton = document.getElementById("confirm");

//numero dei box da mettere nella griglia
let boxNumbers = 0;


gridSizeButton.addEventListener("click", function(){

    //Prima di tutto rimuovo la griglia precedente
    gridContainer.innerHTML = "";



    //valore della variabile diverso in base alla difficoltà
    if(difficultySelection.value == "Easy"){
        boxNumbers = 100;
    }else if(difficultySelection.value == "Normal"){
        boxNumbers = 81;
    }else{
        boxNumbers = 49;
    }

    //creazione della griglia che prende come parametri il numero dei quadrati, e la stringa della difficoltà
    let node = createGrid(gridContainer, boxNumbers, difficultySelection.value);


});



//la funzione di creazione griglia prende come parametri la griglia, il numero di quadrati e la stringa della dificoltà
function createGrid(grid, number, difficulty){

    //array che contiene il posto di tutte le bombe
    const BOMBS = 16;
    let arrayBombs = bombsGenerator(BOMBS, boxNumbers);
    console.log(arrayBombs);
    

    for(let i = 1; i <= number; i++){

        //creo il singolo quadrato e ci do il numero specifico
        node = document.createElement("div");
        node.classList.add("box");
        node.innerText = i;

        //modifico le dimensioni dei quadrati (tramite classi apposite) in base alla difficoltà
        if(difficulty == "Easy"){
            node.classList.add("easy"); 
        }else if(difficulty == "Normal"){
            node.classList.add("normal"); 
        }else{
            node.classList.add("hard"); 
        }




        node.addEventListener("click", checkBomb);

        grid.appendChild(node);

    }

    return node;

}


//funzione che genera la lista random di bombe, assicurandosi che siano tutte in celle diverse
function bombsGenerator(NumBombs, boxNumbers){

    let bombsList = [];

    while(bombsList.length < NumBombs){

        let bomb = randomRange(1, boxNumbers);

        if(bombsList.includes(bomb) == false){
            bombsList.push(bomb);
        }
    }

    return bombsList;
}


//funzione che torna un numero random di un range predefinito
function randomRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function checkBomb(){
    console.log(this);
    
    this.removeEventListener("click", checkBomb);

    if(arrayBombs.includes(this.innerText)){
        this.classList.add("exploded");
    }else{
        this.classList.add("clicked");
    }

}


