let turn = "";
let isGameOver = false;
let winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
let player1Score = 0;
let player2Score = 0;
let tieScore = 0;
let boxes = document.querySelectorAll('.box');

const headStart = () => {
    let random = Math.random();
    if (random < 0.5) {
        turn = "X";
    }
    else {
        turn = "O";
    }
}

boxes.forEach(element => {
    element.addEventListener('click', () => {
        if (!isGameOver && element.innerHTML == ""){
            element.innerHTML = turn;
            checkDraw()
            checkWin()
            if(!isGameOver){
                changeTurn()
            } 
        }
    })
})

const changeTurn = () => {
    if(turn == "X"){
        turn = "O"
        document.querySelector('.bg').style.left = "95px";
    }
    else{
        turn = "X"
        document.querySelector('.bg').style.left = "0";
    }
}

const checkDraw = () => {
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(element => {
            if(element.innerHTML === "") {
                isDraw = false;
            }
        })
        setTimeout(() => {
            if(isDraw){
                isGameOver = true;
                tieScore++;
                document.querySelector('#tieScore').textContent = tieScore;
                document.querySelector('#showResult').innerHTML = "Tie";
                document.querySelector('main').classList.add('main');
                document.querySelector('.result').style.display = "block"
            }
        },1000)
    } 
}

let resetGame = () =>{
    isGameOver = false;
    document.querySelector('main').classList.remove('main');
    document.querySelector('.result').style.display = "none"
    boxes.forEach(element =>{
        element.innerHTML = "";
        element.style.backgroundColor = "";
        element.style.color = "";
    })
    headStart();
    changeTurn();
}
document.querySelector('.playAgain').addEventListener('click',resetGame)
document.querySelector('.reset').addEventListener('click',() => {
    resetGame();
    player1Score = 0;
    player2Score = 0;
    tieScore = 0;
    document.querySelector('#player1Score').innerHTML = player1Score;
    document.querySelector('#player2Score').innerHTML = player2Score;
    document.querySelector('#tieScore').textContent = tieScore;
})

let checkWin = () => {
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                boxes[winConditions[i][j]].style.color = "#000"
            }
            setTimeout(() => {
                if(turn === "X"){
                    player1Score++;
                    document.querySelector('#player1Score').innerHTML = player1Score;
                    document.querySelector('#showResult').innerHTML = "Player-1 (X) Won";
                    document.querySelector('main').classList.add('main');
                    document.querySelector('.result').style.display = "block"
                }
                else{
                    player2Score++;
                    document.querySelector('#player2Score').innerHTML = player2Score;
                    document.querySelector('#showResult').innerHTML = "Player-2 (O) Won";
                    document.querySelector('main').classList.add('main');
                    document.querySelector('.result').style.display = "block"
                } 
            },1000)
        }
    }
}

(
    function(){
        headStart();
        if(turn === "O"){
            document.querySelector('.bg').style.left = "95px";
        }
    }
)()