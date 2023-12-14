"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../structures/Event");
const index_1 = require("../index");
exports.default = new Event_1.Event("message", (channel, tags, message, self) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (self)
        return;
    channel = channel.replace("#", "");
    const prefixRegex = new RegExp(`${escapeRegex("!")}`);
    if (!prefixRegex.test(message))
        return;
    const args = message.slice(1).trim().split(/ +/).filter(Boolean);
    const cmd = args.length > 0 ? (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase() : null;
    if (!cmd || cmd.length === 0)
        return;
    const command = index_1.client.commands.find((c) => c.name === cmd);
    if (!command)
        return;
    try {
        yield command.run({ client: index_1.client, channel, tags, message, self, args });
    }
    catch (_b) {
        console.error("[ERROR] Couldn't run specific command!");
    }
}));
function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    }
    catch (e) {
        return console.log("ERR");
    }
}
