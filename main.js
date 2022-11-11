let row = 0
let column = 0
let num_player = 0

let board = document.createElement("table");
board.setAttribute("id",'gB')
let tbody = document.createElement("tbody");
let innerBoard;

let Player1
let Player2
let Player3
let maxScore;


class player {
    constructor(name,score,color,turn) {
        this.name = name;
        this.score = score;
        this.color = color;
        this.turn = turn;
    }
}

function getPlayer(){
    if(Player1.turn){
        return Player1;
    }
    else if(Player2.turn){
        return Player2;
    }
    else if(Player3.turn){
        return Player3;
    }
}

function setNextPlayerForThree(){
    if(Player1.turn){
        Player1.turn = ! Player1.turn;
        Player2.turn = true;
    }
    else if(Player2.turn){
        Player2.turn = ! Player2.turn;
        Player3.turn = true;
    }
    else if(Player3.turn){
        Player3.turn = ! Player3.turn;
        Player1.turn = true;
    }
}

function setNextPlayerForTwo(){
    if(Player1.turn){
        Player1.turn = ! Player1.turn;
        Player2.turn = true;
    }
    else if(Player2.turn){
        Player2.turn = ! Player2.turn;
        Player1.turn = true;
    }
}


function generateInnerBoard(row,column){
    innerBoard = new Array(Number(row));
    for (var i = 0; i < innerBoard.length; i++) {
        innerBoard[i] = new Array(Number(column)).fill(0);
    }
    // console.log("generateInnerBoard"+"row:  "+row+"column:  "+column);
    // console.log(innerBoard.join());
}

function createDot(i,j){
    let img = document.createElement('img');
    // cannot be img.addEventListener('click', mouseClick()) ?
    // img.addEventListener('click', mouseClick);
    img.src = 'images/dot.png';
    img.style.width='auto';
    img.style.height='16px';
    img.id = "img"+i+j;
    return img;
}

function createDashHLine(i,j){
    let img = document.createElement('img');
    let f1 = function(){
        toTempSolid(img)
    };
    let f2 = function(){
        toDashH(img)
    };
    
    img.addEventListener('mouseover', f1)
    img.addEventListener('mouseleave', f2)
    img.addEventListener('click', function(){
        toSolid(img);
        img.removeEventListener('mouseover',f1);
        img.removeEventListener('mouseleave',f2);
        img.removeEventListener('click',arguments.callee)
    });
    img.src = 'images/dashHLine.png';
    img.style.width='80px';
    img.style.height='16px';
    img.id = "img"+i+j;
    img.setAttribute("row",i);
    img.setAttribute("column",j);
    return img;

}

function createDashVLine(i,j){
    let img = document.createElement('img');
    let f1 = function(){
        toTempSolid(img)
    };
    let f2 = function(){
        toDashV(img)
    };
    img.addEventListener('mouseover', f1)
    img.addEventListener('mouseleave', f2)
    img.addEventListener('click', function(){
        toSolid(img);
        img.removeEventListener('mouseover',f1);
        img.removeEventListener('mouseleave',f2);
        img.removeEventListener('click',arguments.callee)
    });
    img.src = 'images/dashVLine.png'
    img.style.width='16px';
    img.style.height='80px';
    img.id = "img"+i+j;
    img.setAttribute("row",i);
    img.setAttribute("column",j);
    return img;
}


function createBlank(i,j){
    let img = document.createElement('img');
    img.src = 'images/aliceBlue.jpg';
    img.style.width='80px';
    img.style.height='80px';
    img.id = "img"+i+j;
    return img;
}

function getNumberOfPlayer(){
    do{
        num_player=prompt("Please enter the number of player: (2 or 3)");
    }while(num_player!=2 && num_player!=3)

}

function getRow(){
    do{
        row=prompt("Please enter the number of row: (2 to 12)");
    }while(row<2 && row>12)
}

function getColumn(){
    do{
        column=prompt("Please enter the number of column: (2 to 12)");
    }while(column<2 && column>12)
}


function generateScoreBoard(){
    let scoreBoard = document.createElement("table");
    let tbody = document.createElement("tbody");
    let cell;
    let text;
    for(let i = 0 ;i < num_player;i++){

        let row = document.createElement("tr");

        cell = document.createElement("td");

        text = document.createTextNode("Player"+(i+1)+":    ");

        cell.appendChild(text);
        cell.id = "player"+(i+1)
        row.appendChild(cell);
        
        cell = document.createElement("td");
        cell.id = "player"+(i+1)+"Score";
        text = document.createTextNode("0");

        cell.appendChild(text);
        row.appendChild(cell);     

        tbody.appendChild(row);
                  
    }
    scoreBoard.appendChild(tbody);
    document.getElementById("scoreBoard").appendChild(scoreBoard);
}


function generateGameBoard(){
    generateInnerBoard(row*2-1,column*2-1);
    for(let i = 0 ;i < (row*2-1);i++){
        let row = document.createElement("tr");
        row.setAttribute('id',i)
        if(i%2==0){
            let Dot = true;
            for(let j=0; j<(column*2-1); j++){
                let cell = document.createElement("td");
                cell.setAttribute('id',''+i+j)
                if(Dot){
                    cell.appendChild(createDot(i,j));
                }
                else {
                    cell.appendChild(createDashHLine(i,j));
                }
                row.appendChild(cell);
                Dot = !Dot;
            }
        }
        else{
            let Line = true;
            for(let j=0; j<(column*2-1); j++){
                let cell = document.createElement("td");
                cell.setAttribute('id',''+i+j)
                if(Line){
                    cell.appendChild(createDashVLine(i,j));
                }
                else {
                    cell.appendChild(createBlank(i,j));
                }
                row.appendChild(cell);
                Line = !Line;
            }
        }
        tbody.appendChild(row);
    }
    board.appendChild(tbody);
    document.getElementById("gameBoard").appendChild(board);
}


function toTempSolid(img){
    if(getPlayer().color == "red"){
        img.src = 'images/red.png';
    }
    else if (getPlayer().color == "yellow"){
        img.src = 'images/yellow.png';
    }
    else if (getPlayer().color == "green"){
        img.src = 'images/green.png';
    }
}


function toSolid(img){
    if(getPlayer().color == "red"){
        img.src = 'images/red.png';
        // console.log("id:    "+img.id);
        // console.log(img.getAttribute("row"))
        innerBoard[Number(img.getAttribute("row"))][Number(img.getAttribute("column"))] = 1;
        check(Number(img.getAttribute("row")),Number(img.getAttribute("column")))
    }
    else if (getPlayer().color == "yellow"){
        img.src = 'images/yellow.png';
        // console.log("id:    "+img.id);
        innerBoard[Number(img.getAttribute("row"))][Number(img.getAttribute("column"))] = 1;
        check(Number(img.getAttribute("row")),Number(img.getAttribute("column")))
    }
    else if (getPlayer().color == "green"){
        img.src = 'images/green.png';
        // console.log("id:    "+img.id);
        innerBoard[Number(img.getAttribute("row"))][Number(img.getAttribute("column"))] = 1;
        check(Number(img.getAttribute("row")),Number(img.getAttribute("column")))
    }
}


function toDashH(img){
    img.src = 'images/dashHLine.png';
}


function toDashV(img){
    img.src = 'images/dashVLine.png';
}

function checkHorizontalScore(currRow,currColumn){
    let scored = false;
    if(currRow == 0){
        // lower rectangle
        if(innerBoard[currRow+1][currColumn-1] 
            && innerBoard[currRow+1][currColumn+1] 
            && innerBoard[currRow+2][currColumn]){
            innerBoard[currRow+1][currColumn]= 2
            updateBoard(currRow+1,currColumn);
            updateScore();
            scored = true;
        }
    }
    else if (currRow == row*2-1-1){
        // upper rectangle
        if(innerBoard[currRow-1][currColumn-1] 
            && innerBoard[currRow-1][currColumn+1] 
            && innerBoard[currRow-2][currColumn]){
            innerBoard[currRow-1][currColumn]= 2;
            updateBoard(currRow-1,currColumn);
            updateScore();
            scored = true;
        }
    }
    else {
        // upper
        if(innerBoard[currRow-1][currColumn-1] 
            && innerBoard[currRow-1][currColumn+1] 
            && innerBoard[currRow-2][currColumn]){
            innerBoard[currRow-1][currColumn]= 2
            updateBoard(currRow-1,currColumn);
            updateScore();
            scored = true;
        }
        // lower
        if(innerBoard[currRow+1][currColumn-1] 
            && innerBoard[currRow+1][currColumn+1] 
            && innerBoard[currRow+2][currColumn]){
            innerBoard[currRow+1][currColumn]=2
            updateBoard(currRow+1,currColumn)
            updateScore();
            scored = true;
        }
    }
    if(scored == false){
        if(num_player==2) {
            setNextPlayerForTwo()
        }
        else if(num_player==3){
            setNextPlayerForThree()
        }   
        else{
            console.log("fail to set next player")
        }
    }
}

function checkVerticalScore(currRow,currColumn){
    let scored = false;
    if(currColumn == 0){
        // right
        if(innerBoard[currRow-1][currColumn+1] 
            && innerBoard[currRow+1][currColumn+1] 
            && innerBoard[currRow][currColumn+2]){
            innerBoard[currRow][currColumn+1]=2
            updateBoard(currRow,currColumn+1)
            updateScore();
            scored = true;
        }
    }
    else if (currColumn == row*2-1-1){
        // left
        if(innerBoard[currRow-1][currColumn-1] 
            && innerBoard[currRow+1][currColumn-1] 
            && innerBoard[currRow][currColumn-2]){
            innerBoard[currRow][currColumn-1]=2;
            updateBoard(currRow,currColumn-1);
            updateScore();
            scored = true;
        }
    }
    else {
        // left
        if(innerBoard[currRow-1][currColumn-1] 
            && innerBoard[currRow+1][currColumn-1] 
            && innerBoard[currRow][currColumn-2]){
            innerBoard[currRow][currColumn-1]=2;
            updateBoard(currRow,currColumn-1);
            updateScore();
            scored = true;
        }
        // right
        if(innerBoard[currRow-1][currColumn+1] 
            && innerBoard[currRow+1][currColumn+1] 
            && innerBoard[currRow][currColumn+2]){
            innerBoard[currRow][currColumn+1]=2
            updateBoard(currRow,currColumn+1)
            updateScore();
            scored = true;
        }
    }
    if(scored == false){
        if(num_player==2) {
            setNextPlayerForTwo()
        }
        else if(num_player==3){
            setNextPlayerForThree()
        }   
        else{
            console.log("fail to set next player")
        }
    }
}


function check(currRow,currColumn){
    if(isHLine(currRow)){
        checkHorizontalScore(currRow,currColumn)
    }
    else{
        checkVerticalScore(currRow,currColumn)
    }
    if(end()){
        getWinner()
    }
}

function getWinner(){
    if(num_player==2){
        let winMeg = ""
        let winScore= Math.max(Player1.score,Player2.score)
        if(Player1.score==winScore) {
            winMeg+="Player1    "
        }
        if(Player2.score==winScore) {
            winMeg+="Player2    "
        }
        winMeg+= "WINS!!!!!"
        setTimeout(alert,300,"Game Over    "+ winMeg)    }
    if(num_player==3){
        let winMeg = ""
        let winScore= Math.max(Player1.score,Player2.score,Player3.score)
        if(Player1.score==winScore) {
            winMeg+="Player "
        }
        if(Player2.score==winScore) {
            winMeg+="Player2    "
        }
        if(Player3.score==winScore) {
            winMeg+="Player3    "   
        }
        winMeg+= "WINS!!!!!"
        
        setTimeout(alert,300,"Game Over.    "+winMeg)    
    }
}




function updateScore(){
    if(Player1.turn){
        Player1.score+=1;
        document.getElementById("player1Score").innerText = Player1.score;

    }
    else if(Player2.turn){
        Player2.score+=1;
        document.getElementById("player2Score").innerText = Player2.score;
    }
    else{
        Player3.score+=1;
        document.getElementById("player3Score").innerText = Player3.score;
    }
}

function isHLine(row){
    if (row%2 == 0){
        return true;
    }
    return false;
}

function updateBoard(row,column){
    innerBoard[Number (row)][Number (column)] = 2;
    if(Player1.turn){
        document.getElementById("img"+row+column).setAttribute('src','images/red.png')
    }
    else if (Player2.turn){
        document.getElementById("img"+row+column).setAttribute('src','images/yellow.png')
    }
    else if (Player3.turn){
        document.getElementById("img"+row+column).setAttribute('src','images/green.png')
    }
}


function end(){
    if(num_player==2){
        if((Player1.score+Player2.score) != maxScore) {
            return false;
        }
        else{
            return true;
        }
    }
    else if(num_player==3){
        if((Player1.score+Player2.score+Player3.score) != maxScore) {
            return false;
        }
        else{
            return true;
        }
    }
    else{
        console.log("fail to check end")
    }
}


function play(){
    if(num_player == 3){
        Player1 = new player("Player1",0,"red",true);
        Player2 = new player("Player2",0,"yellow",false);
        Player3 = new player("Player3",0,"green",false);
    }
    else{
        Player1 = new player("Player1",0,"red",true);
        Player2 = new player("Player2",0,"yellow",false);
    }
    maxScore = ((row-1)*(column-1))
}


