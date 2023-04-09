const axios = require("axios");
const Config = require("./config");

const openAIService = (keyword) => {
    return axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: keyword }],
            temperature: 0.7,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
            },
        }
    );
};

const sendChat = async (keyword, cb) => {
    try {
        const res = await openAIService(keyword);

        cb({
            keyword,
            content: res.data.choices[0].message.content,
        });
    } catch (error) {
        console.log(error);

        sendChat(keyword, cb);
    }
};

module.exports = sendChat;
