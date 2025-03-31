import React, { useState } from "react";
import "./App.css";

function App() {
    const [url, setUrl] = useState("");
    const [proxyUrl, setProxyUrl] = useState("");
    const [error, setError] = useState("");

    const isValidURL = (input) => {
        try {
            new URL(input);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleProxy = () => {
        if (!url.trim()) {
            setError("Please enter a website URL.");
            return;
        }

        if (!isValidURL(url)) {
            setError("Invalid URL! Enter a valid website link.");
            return;
        }

        setError("");
        setProxyUrl(`http://localhost:3000/proxy?url=${encodeURIComponent(url)}`);
        // window.open(proxyUrl, "_blank");
    };

    return (
        <div className="container">
            <h1>Web Proxy</h1>
            <input
                type="text"
                placeholder="Enter website URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleProxy}>Browse</button>

            {error && <p className="error">{error}</p>}

            {proxyUrl && (
                <div className="iframe-container">
                    <iframe title="Proxy Browser" src={proxyUrl} />
                </div>
            )}
        </div>
    );
}

export default App;
