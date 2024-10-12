import EventEmitter from "events";
export declare enum MindforgeServerEvent {
    AudioData = "audioData",
    TextData = "textData",
    Error = "error",
    Close = "close"
}
export declare class MindforgeClient extends EventEmitter {
    private ws;
    private apiKey;
    private baseUrl;
    constructor(apiKey: string, baseUrl?: string);
    connect(characterId: string, conversationId?: string): void;
    sendMessage(message: string): void;
    disconnect(): void;
}
