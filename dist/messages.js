"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPCAction = exports.NPCMessage = void 0;
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
