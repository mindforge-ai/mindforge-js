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
export type MindforgeServerMessage = NPCMessage | NPCAction;
