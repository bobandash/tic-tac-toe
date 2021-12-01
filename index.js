"use strict"

//this just displays the board
let displayController = (() => {
    let allTiles = Array.from(document.querySelectorAll('button'));
    
    let displayBoard = () => {        
        allTiles.forEach((element, index) => allTiles[index].innerText = Gameboard.gameboardArray[index]);
    }

    return {displayBoard};
})();

//player can only make move
const Player = (name, type) => {
    const playerName = name;
    const playerType = type;
    let makeMove = (index, type) => {
        if(Gameboard.gameboardArray[index] == '')
        {
            Gameboard.setgameboardArray(index, type);
            displayController.displayBoard();
            Gameboard.addMove();
            return 1;
        }
        return 0;
    }

    return {playerName, playerType, makeMove};
}

let Gameboard = (() => {
    const player1 = Player('Steve', 'O');
    const player2 = Player('Bob', 'X');
    let gameboardArray = Array(9).fill('');
    let setgameboardArray = (index, type) => {
        gameboardArray[index] = type;
    }
    let round = 0;
    let allTiles = document.querySelectorAll('button');

    let addMove = () => {
        for (let i = 0; i < allTiles.length; i++) 
        {
            allTiles[i].addEventListener('click', function() {
                if (round % 2 == 0) {
                    if(player1.makeMove(i, player1.playerType) == 1)
                    {
                        round++;
                        console.log(checkGameStatus());
                    }
                }
                else{
                    if(player2.makeMove(i, player2.playerType))
                    {
                        round++;
                        console.log(checkGameStatus());
                    }
                }   
            })
        }
    }

    let checkGameStatus = () => {
        if(round >= 5)
        {
            let allOIndices = [];
            let allXIndices = [];
            for(let i = 0; i < allTiles.length; i++){
                if(allTiles[i].innerText == 'O')
                    allOIndices.push(i);
                else if(allTiles[i].innerText == 'X')
                    allXIndices.push(i);
            }
            //check if there's a winner
            if(allWinningConditions(allOIndices))
                return `${player1.playerName} wins`;
            else if (allWinningConditions(allXIndices))
                return `${player2.playerName} wins`;
            else if (round == 9)
                return 'Tie Game';
            else
                return '';

        }
    }

    function allWinningConditions (movesArray) {
        const poss1 = [0,1,2];
        const poss2 = [3,4,5];
        const poss3 = [6,7,8];
        const poss4 = [0,3,6];
        const poss5 = [1,4,7];
        const poss6 = [2,5,8];
        const poss7 = [0,4,8];
        const poss8 = [8,4,2];

        let checker = (arr, target) => target.every(v => arr.includes(v));

        if(checker(movesArray, poss1) ||
            checker(movesArray, poss2) || 
            checker(movesArray, poss3) ||
            checker(movesArray, poss4) ||
            checker(movesArray, poss5) || 
            checker(movesArray, poss6) ||
            checker(movesArray, poss7) ||
            checker(movesArray, poss8))
        {
            return true;
        }
        return false;
    }

    return {gameboardArray, setgameboardArray, addMove, checkGameStatus};
})();


displayController.displayBoard();
Gameboard.addMove();


