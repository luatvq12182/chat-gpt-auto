require("dotenv").config();

const Config = {
    PORT: process.env.PORT,
    MODE: process.env.MODE,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

module.exports = Config;
