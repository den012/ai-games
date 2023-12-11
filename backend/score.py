from flask import Blueprint, jsonify, request
import json

score_bp = Blueprint('score_bp', __name__)

SCORES_FILE = 'scores.json'

try:
    with open(SCORES_FILE, 'r') as file:
        scores = json.load(file)
except FileNotFoundError:
    scores = {"playerWinCount" : 0, "aiWinCount" : 0}

@score_bp.route('/get_score', methods=['GET'])

def get_score():
    return jsonify({"scores": scores})

@score_bp.route('/update_score', methods=['POST'])
def update_score():
    data = request.json
    scores["playerWinCount"] = data.get("playerWinCount", 0)
    scores["aiWinCount"] = data.get("aiWinCount", 0)

    with open(SCORES_FILE, 'w') as file:
        json.dump(scores, file, indent=4)

    return jsonify({"message": "Score updated successfully"})

