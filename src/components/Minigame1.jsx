import React from 'react';
import { useState } from 'react';
import { json } from 'react-router-dom';
import { useEffect } from 'react';

const Minigame1 = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turnMessage, setTurnMessage] = useState("Your turn");
    const [winnerStatus, setWinnerStatus] = useState(null);
    const [drawStatus, setDrawStatus] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [aiWinCount, setAiWinCount] = useState(0);
    const [playerWinCount, setPlayerWinCount] = useState(0);

    const handleClick = async (index) => {
        if(!isPlayerTurn || winnerStatus || board[index]){
            return;
        }

        setIsPlayerTurn(false);

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);

        const winner = checkWinner(newBoard);
        if(winner){
            setWinnerStatus(`${winner}`);
            setPlayerWinCount(playerWinCount + 1);
            setTurnMessage("Game Over");
            setIsPlayerTurn(false);
            return;
        }

        if(newBoard.every(square => square)){
            setDrawStatus('Draw!');
            setTurnMessage("Game Over");
            setIsPlayerTurn(false);
            return;
        }

        setTurnMessage("AI's turn");

        //request to server
        try{
            const response = await fetch('http://localhost:5001/make_move',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentBoard: newBoard }),
            });

            const data = await response.json();
            //console.log(data);
            
            const aiMove = data.ai_move;
            //console.log(aiMove);

            if(aiMove != undefined){
                handleAiMove(aiMove, newBoard);
            }

            //console.log(`${index} clicked`);
        }catch(error){
            console.log(error);
        }
    }

    const handleAiMove = (aiMove, currentBoard) => {
        if(aiMove != null && !currentBoard[aiMove]){

            setTimeout(() => {
                const newBoardCopy = [...currentBoard];
                newBoardCopy[aiMove] = 'O';
                setBoard(newBoardCopy);

                const aiWinner = checkWinner(newBoardCopy);
                if(aiWinner){
                    setWinnerStatus(`${aiWinner}`);
                    setAiWinCount(aiWinCount + 1);
                    setTurnMessage("Game Over");
                    setIsPlayerTurn(false);
                    return;
                }

                if(newBoardCopy.every(square => square)){
                    setDrawStatus('Draw!');
                    setTurnMessage("Game Over");
                    setIsPlayerTurn(false);
                    return;
                }

                setTurnMessage("Your turn");
                setIsPlayerTurn(true);
            }, 1000);

        }
    }

    const renderSquare = (index) => {
        return (
            <button 
                onClick={() => handleClick(index)}
                className="customSquare"
            >{board[index]}</button>
        );
    }

    const winCombo = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row

        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column

        [0, 4, 8], // left diagonal
        [2, 4, 6]  // right diagonal
    ];

    const checkWinner = (board) => {
        for(const combo of winCombo){
            const [x, y, z] = combo;
            if(board[x] && board[x] === board[y] && board[x] === board[z]){
                return board[x];
            }
        }
        return null;
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        //setTurn('X');
        setWinnerStatus(null);
        setDrawStatus(null);
        setIsPlayerTurn(true);
    }

    const status = ` ${turnMessage}`;

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="font-primary text-3xl font-semibold text-gray-400 mb-4">Ai {aiWinCount} : {playerWinCount} Player</h1>
            <button 
                className="font-primary font-bold text-xl text-gray-500 mb-4 bg-blue-200 p-3 rounded-xl"
                onClick={() => handleReset()}
                >Reset</button>
            <div className="customBoard">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}

                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div className="font-primary text-3xl text-gray-400 mt-10">{status}</div>
            <div className="font-primary text-3xl mt-10">
                {winnerStatus ? (
                    <span>
                        {winnerStatus}
                        <span className="text-green-300"> wins!</span>
                    </span>
                ) : (
                    <span className="text-yellow-300">{drawStatus}</span>
                )}
            </div>
        </div>
    );
}

export default Minigame1;