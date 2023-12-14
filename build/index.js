"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv/config");
const Client_1 = require("./structures/Client");
exports.client = new Client_1.ExtendedClient({
    options: { debug: true },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH,
    },
    channels: ["pgamingjr"], //LOAD IN FROM DB?
});
exports.client.start();
