const Config = require("./config");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const sendChat = require("./api");

const app = express();
app.use(express.json());
app.use(express.static("dist"));

if (Config.MODE === "development") {
    app.use(cors());
}

app.listen(Config.PORT, "0.0.0.0", () => {
    console.log("Server is running on port: ", Config.PORT);
});

let data = {};

app.get("/", (_req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/keywords", (req, res) => {
    const { keywords } = req.body;

    const randomId = uuidv4();
    data[randomId] = {};

    keywords.forEach((keyword) => {
        sendChat(keyword, ({ keyword, content }) => {
            data[randomId][keyword] = { keyword, content, isDone: true };
        });

        data[randomId][keyword] = {
            keyword,
            content: "",
            isDone: false,
        };
    });

    res.json({
        data: Object.values(data[randomId]),
        id: randomId,
    });
});

app.get("/api/getProgress/:id", (req, res) => {
    return res.json(Object.values(data[req.params.id]) || []);
});

app.get("/api/stopProgress/:id", (req, res) => {
    data[req.params.id] = [];
    return res.json("OK");
});
