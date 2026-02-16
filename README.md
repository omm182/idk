Demo Flask receiver for credential collection

Files added:
- `server.py` : simple Flask app with `/collect` POST endpoint that appends received credentials to `received_creds.txt` (DEMO only — stores plaintext).
- `requirements.txt` : Python dependencies.

Run locally (Windows PowerShell):

```powershell
cd "C:\Users\omdes\OneDrive\Desktop\phishing demo"
python -m venv venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1    # or use .\venv\Scripts\activate
pip install -r requirements.txt
python server.py
```

Serve the demo page (in a separate shell) so fetch runs from http origin:

```powershell
cd "C:\Users\omdes\OneDrive\Desktop\phishing demo"
python -m http.server 8000
# open http://localhost:8000/index.html in your browser
```

Client configuration
- In `script.js` set `SERVER_URL` to the receiver you are running:
	- `http://localhost:5000/collect` (same machine)
	- `http://<your.ip.address>:5000/collect` (LAN device)

Verification
- Submit the form from the served page. The UI will show whether the POST reached the server.
- Confirm by opening `received_creds.txt` in the project folder — entries are appended as `email\tpassword`.

Security notes
- This demo stores plaintext credentials and is for educational/demo use only. Do NOT use with real accounts.
- For production use HTTPS, server-side hashing (bcrypt/argon2), and do not store raw passwords.
