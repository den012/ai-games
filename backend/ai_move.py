from flask import Blueprint, jsonify, request
from flask_cors import CORS
import random

ai_move_bp = Blueprint('ai_move_bp', __name__)

@ai_move_bp.route('/make_move', methods=['POST'])

def make_move():
    data = request.get_json()
    currBoard = data['currentBoard']
    aiMove = get_ai_move(currBoard)
    return jsonify({'ai_move': aiMove})

def checkWinner(board):
    winner = None
    # check rows
    for i in range(0, 9, 3):
        if board[i] == board[i + 1] == board[i + 2] and board[i]:
            winner = board[i]
            return winner

    # check columns
    for i in range(3):
        if board[i] == board[i + 3] == board[i + 6] and board[i]:
            winner = board[i]
            return winner

    # check diagonals
    if board[0] == board[4] == board[8] and board[0]:
        winner = board[0]
        return winner

    if board[2] == board[4] == board[6] and board[2]:
        winner = board[2]
        return winner

    # check tie
    if None not in board:
        winner = 'tie'
        return winner

    return winner

def get_ai_move(currBoard):
    # AI LOGIC
    #min max algorithm
    bestScore = float('-inf')
    bestMove = None

    for i in range(len(currBoard)):
        if not currBoard[i]:
            currBoard[i] = 'O'
            score = minimax(currBoard, 0, False)
            currBoard[i] = None

            if score > bestScore:
                bestScore = score
                bestMove = i
    
    print(f"Ai move: {bestMove}")
    return bestMove

def minimax(board, depth, isMaximizing):
    scores = {
        'X': -1,
        'O': 1,
        'tie': 0
    }

    winner = checkWinner(board)
    if winner is not None:
        return scores[winner]
    
    if isMaximizing:
        maxEval = float('-inf')
        for i in range(len(board)):
            if not board[i]:
                board[i] = 'O'
                eval = minimax(board, depth + 1, False)
                board[i] = None
                maxEval = max(maxEval, eval)
        return maxEval
    else:
        minEval = float('inf')
        for i in range(len(board)):
            if not board[i]:
                board[i] = 'X'
                eval = minimax(board, depth + 1, True)
                board[i] = None
                minEval = min(minEval, eval)
        return minEval
