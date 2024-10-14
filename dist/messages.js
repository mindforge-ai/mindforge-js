"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTranscribedMessage = exports.PlayerTranscribedMessageChunk = exports.NPCLiveMessage = exports.NPCLiveMessageChunk = exports.NPCAction = exports.NPCMessage = void 0;
class NPCMessage {
    constructor(content) {
        this.content = content;
        this.type = "server.npc.message";
    }
}
exports.NPCMessage = NPCMessage;
class NPCAction {
    constructor(toolName, toolInput) {
        this.toolName = toolName;
        this.toolInput = toolInput;
        this.type = "server.npc.action";
    }
}
exports.NPCAction = NPCAction;
class NPCLiveMessageChunk {
    constructor(content) {
        this.content = content;
        this.type = "server.npc.live.message_chunk";
    }
}
exports.NPCLiveMessageChunk = NPCLiveMessageChunk;
class NPCLiveMessage {
    constructor(content) {
        this.content = content;
        this.type = "server.npc.live.message";
    }
}
exports.NPCLiveMessage = NPCLiveMessage;
class PlayerTranscribedMessageChunk {
    constructor(content) {
        this.content = content;
        this.type = "server.player.transcribed_message_chunk";
    }
}
exports.PlayerTranscribedMessageChunk = PlayerTranscribedMessageChunk;
class PlayerTranscribedMessage {
    constructor(content) {
        this.content = content;
        this.type = "server.player.transcribed_message";
    }
}
exports.PlayerTranscribedMessage = PlayerTranscribedMessage;
