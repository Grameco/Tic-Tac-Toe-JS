const p = document.querySelector("[status-tab]");
const boxes = document.querySelectorAll(".box");
const btn = document.querySelector("[btn]");

let currentPlayer;
let gridFill;

const winPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

initialize();

function initialize() {
    currentPlayer = "X";                                     //initialise current player as 'X'
    p.innerHTML = `Current player - ${currentPlayer}`;       //Update UI for paragraph tag
    boxes.forEach((box, i) => {                              //run a loop for each box
        box.innerHTML = "";                                  //make the boxes empty
        boxes[i].style.pointerEvents = "all";                //enable cursor to pointer 
        box.classList = `box box${i + 1}`;                   //remove green background if someone wins by adding initial classes to each box
    })
    gridFill = ["", "", "", "", "", "", "", "", ""];         //initialise empty values to this variable
    btn.classList.remove("active");                          //remobe the button display
}


boxes.forEach((box, i) => {                                  //run a loop for each box
    box.addEventListener("click", () => {                    //add event listener to each box on click
        handleClick(i);                                      //run handelClick function
    })
});


function handleClick(i) {
    if (gridFill[i]) return alert('Box already filled');     //if same box is clicked twice then return an alert function
    else {
        boxes[i].innerHTML = `${currentPlayer}`;             //update UI
        boxes[i].style.pointerEvents = "none";               //cursor will not show pointer once value is filled
        gridFill[i] = currentPlayer;                         //update gridFill index value for JS operations
        swapTurn();                                          //swap current player
        checkGameOver();                                     //check if game is over
    }
}


function swapTurn() {
    if (currentPlayer === "X") currentPlayer = "O"
    else currentPlayer = "X";
    p.innerHTML = `Current player - ${currentPlayer}`;
}


function checkGameOver() {
    let flag;
    winPositions.forEach((position) => {                    //run a loop to check each winning position

        if ((gridFill[position[0]] !== "" || gridFill[position[1]] !== "" || gridFill[position[2]] !== "")                    //each position should be non empty
            && (gridFill[position[0]] === gridFill[position[1]]) && (gridFill[position[1]] === gridFill[position[2]])) {      //each position should have same value

            boxes[position[0]].classList.add("win");        //change the background color of the winning boxes 
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";           //once you got a win, disable cursor pointer
            });

            flag = 1;
        }
    })

    if (flag === 1) {                                       //if we got a winner
        btn.classList.add("active");                        //activate the button
        swapTurn();
        p.innerHTML = `Winner is - ${currentPlayer}`;       //update winner in p tag
        return;
    }


    //if we do not return then check for Tie Case
    let boxesFilled = 0;
    gridFill.forEach((box) => {
        if (box !== "") boxesFilled++;
    })

    //if board is filled and still no win
    if (boxesFilled === 9) {
        btn.classList.add("active");                        //make the button visible for new game
        p.innerHTML = "Game Tie!";                           //update message in p tag
    }
}

btn.addEventListener("click", initialize);                  //add event listener to button
