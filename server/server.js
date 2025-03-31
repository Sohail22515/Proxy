const express = require("express");
const httpProxy = require("http-proxy");
const cors = require("cors");
const url = require("url");

const app = express();
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

app.use(cors());

app.use("/proxy", (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: "Missing 'url' query parameter" });
    }

    try {
        const parsedUrl = new URL(targetUrl); // Validate URL
        console.log(`Proxying request to: ${parsedUrl.href}`);

        proxy.web(req, res, { target: parsedUrl.origin, secure: false }, (err) => {
            console.error("Proxy error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    } catch (error) {
        res.status(400).json({ error: "Invalid URL" });
    }
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));
