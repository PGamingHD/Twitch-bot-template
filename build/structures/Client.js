"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const tmi_js_1 = require("tmi.js");
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const glob_1 = __importDefault(require("glob"));
const globPromise = (0, util_1.promisify)(glob_1.default);
class ExtendedClient extends tmi_js_1.Client {
    constructor() {
        super(...arguments);
        this.commands = [];
    }
    start() {
        this.RegisterModules();
        this.connect();
    }
    importFile(filePath) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield Promise.resolve(`${filePath}`).then(s => __importStar(require(s))))) === null || _a === void 0 ? void 0 : _a.default;
        });
    }
    RegisterCommands(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            this.commands = commands;
        });
    }
    RegisterModules() {
        return __awaiter(this, void 0, void 0, function* () {
            const availableCommands = [];
            const root = path_1.default.join(__dirname, "..");
            const commandFiles = yield globPromise("/commands/*/*{.ts,.js}", {
                root,
            });
            for (const file of commandFiles) {
                const command = yield this.importFile(file);
                if (!command.name)
                    return;
                availableCommands.push(command);
                console.log(`[CMD] Added command '${command.name}' to the list!`);
                //REGISTER COMMAND HERE!
            }
            this.on("connected", () => {
                this.RegisterCommands(availableCommands);
                console.log("[DEBUG] Connected to Twitch");
            });
            const eventFiles = yield globPromise("/events/*{.ts,.js}", {
                root,
            });
            for (const file of eventFiles) {
                const event = yield this.importFile(file);
                this.on(event.event, event.run);
            }
        });
    }
}
exports.ExtendedClient = ExtendedClient;
