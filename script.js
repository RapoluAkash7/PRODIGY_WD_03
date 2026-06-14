const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const pvpBtn = document.getElementById("pvp");
const aiBtn = document.getElementById("ai");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;
let vsAI = false;

let xScore = 0;
let oScore = 0;

const winningConditions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

pvpBtn.addEventListener("click",()=>{
vsAI=false;
restartGame();
});

aiBtn.addEventListener("click",()=>{
vsAI=true;
restartGame();
});

function handleCellClick(){

const index = this.dataset.index;

if(board[index] !== "" || !gameActive){
return;
}

makeMove(index,currentPlayer);

if(vsAI && currentPlayer==="O" && gameActive){
setTimeout(aiMove,500);
}
}

function makeMove(index,player){

board[index] = player;

cells[index].textContent = player;

if(player==="X"){
cells[index].classList.add("x");
}else{
cells[index].classList.add("o");
}

checkResult();

if(gameActive){
currentPlayer = player==="X" ? "O" : "X";
statusText.textContent =
`Player ${currentPlayer}'s Turn`;
}
}

function aiMove(){

let emptyCells=[];

board.forEach((cell,index)=>{
if(cell===""){
emptyCells.push(index);
}
});

if(emptyCells.length===0){
return;
}

const randomIndex =
emptyCells[Math.floor(Math.random()*emptyCells.length)];

makeMove(randomIndex,"O");
}

function checkResult(){

let roundWon = false;
let winningCombo = [];

for(let condition of winningConditions){

const a = board[condition[0]];
const b = board[condition[1]];
const c = board[condition[2]];

if(a==="" || b==="" || c===""){
continue;
}

if(a===b && b===c){
roundWon=true;
winningCombo=condition;
break;
}
}

if(roundWon){

winningCombo.forEach(index=>{
cells[index].classList.add(
"winner",
"celebrate"
);
});

statusText.textContent =
`🎉 Player ${currentPlayer} Wins!`;

if(currentPlayer==="X"){
xScore++;
xScoreEl.textContent=xScore;
}else{
oScore++;
oScoreEl.textContent=oScore;
}

if(vsAI && currentPlayer==="O"){

document.querySelector(".container")
.classList.add("lose");

setTimeout(()=>{
document.querySelector(".container")
.classList.remove("lose");
},600);

}

gameActive=false;
return;
}

if(!board.includes("")){
statusText.textContent="🤝 It's a Draw!";
gameActive=false;
}
}

function restartGame(){

board=["","","","","","","","",""];

currentPlayer="X";
gameActive=true;

statusText.textContent=
"Player X's Turn";

cells.forEach(cell=>{

cell.textContent="";

cell.classList.remove(
"winner",
"x",
"o",
"celebrate"
);

});
}

cells.forEach(cell=>{
cell.addEventListener(
"click",
handleCellClick
);
});

restartBtn.addEventListener(
"click",
restartGame
);