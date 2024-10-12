"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindforgeClient = exports.MindforgeServerEvent = void 0;
const ws_1 = __importDefault(require("ws"));
const events_1 = __importDefault(require("events"));
var MindforgeServerEvent;
(function (MindforgeServerEvent) {
    MindforgeServerEvent["AudioData"] = "audioData";
    MindforgeServerEvent["TextData"] = "textData";
    MindforgeServerEvent["Error"] = "error";
    MindforgeServerEvent["Close"] = "close";
})(MindforgeServerEvent || (exports.MindforgeServerEvent = MindforgeServerEvent = {}));
class MindforgeClient extends events_1.default {
    constructor(apiKey, baseUrl = "https://api.mindforge.ai") {
        super();
        this.ws = null;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    connect(characterId, conversationId) {
        const url = `${this.baseUrl}/characters/${characterId}/perform/stream?token=${this.apiKey}${conversationId ? `&_conversation_id=${conversationId}` : ""}`;
        this.ws = new ws_1.default(url);
        this.ws.on("open", () => {
            console.log("Connected to Mindforge server");
        });
        this.ws.on("message", (data) => {
            try {
                const parsedData = JSON.parse(data.toString());
                if (parsedData.type === "audio") {
                    this.emit(MindforgeServerEvent.AudioData, parsedData.data);
                }
                else if (parsedData.type === "text") {
                    this.emit(MindforgeServerEvent.TextData, parsedData.data);
                }
            }
            catch (error) {
                this.emit(MindforgeServerEvent.Error, "Failed to parse server message");
            }
        });
        this.ws.on("error", (error) => {
            this.emit(MindforgeServerEvent.Error, error);
        });
        this.ws.on("close", () => {
            this.emit(MindforgeServerEvent.Close);
        });
    }
    sendMessage(message) {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            this.ws.send(JSON.stringify({ type: "userMessage", content: message }));
        }
        else {
            throw new Error("WebSocket is not connected");
        }
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}
exports.MindforgeClient = MindforgeClient;
