export declare class NPCMessage {
    content: string;
    type: "server.npc.message";
    constructor(content: string);
}
export declare class NPCAction {
    toolName: string;
    toolInput: any;
    type: "server.npc.action";
    constructor(toolName: string, toolInput: any);
}
export declare class NPCLiveMessageChunk {
    content: string;
    type: "server.npc.live.message_chunk";
    constructor(content: string);
}
export declare class NPCLiveMessage {
    content: string;
    type: "server.npc.live.message";
    constructor(content: string);
}
export declare class PlayerTranscribedMessageChunk {
    content: string;
    type: "server.player.transcribed_message_chunk";
    constructor(content: string);
}
export declare class PlayerTranscribedMessage {
    content: string;
    type: "server.player.transcribed_message";
    constructor(content: string);
}
export type MindforgeServerMessage = NPCMessage | NPCAction | NPCLiveMessageChunk | NPCLiveMessage | PlayerTranscribedMessageChunk | PlayerTranscribedMessage;
