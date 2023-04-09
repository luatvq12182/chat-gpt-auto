const Config = require("./config");
const express = require("express");
const cors = require("cors");
const sendChat = require("./api");

const app = express();
app.use(express.json());
app.use(express.static("public"));

if (Config.MODE === "development") {
    app.use(cors());
}

app.listen(Config.PORT, "0.0.0.0", () => {
    console.log("Server is running on port: ", Config.PORT);
});

let data = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/keywords", (req, res) => {
    const { keywords } = req.body;

    keywords.forEach((keyword) => {
        sendChat(keyword, ({ keyword, content }) => {
            data[keyword] = { keyword, content, isDone: true };
        });

        data[keyword] = {
            keyword,
            content: "",
            isDone: false,
        };
    });

    res.json(Object.values(data));
});

app.get("/api/getCurrentProgress", (req, res) => {
    return res.json(Object.values(data));
});

app.post("/api/stopCurrentProgress", (req, res) => {
    data = [];
    return res.json("OK");
});
