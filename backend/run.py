from flask import Flask
from flask_cors import CORS
from score import score_bp
from ai_move import ai_move_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(score_bp)
app.register_blueprint(ai_move_bp)

if __name__ == '__main__':
    app.run(port=5001, debug=True)