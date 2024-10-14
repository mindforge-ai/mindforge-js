export enum MindforgeServerEventType {
  NPCMessage = "server.npc.message",
  NPCAction = "server.npc.action",
  NPCLiveMessageChunk = "server.npc.live.message_chunk",
  NPCLiveMessage = "server.npc.live.message",
  NPCAudioData = "server.npc.audio_data",
  PlayerTranscribedMessageChunk = "server.player.transcribed_message_chunk",
  PlayerTranscribedMessage = "server.player.transcribed_message",
  ServerError = "server.error",
  Close = "close",
}

export enum MindforgeClientEventType {
  PlayerMessage = "client.player.message",
  PlayerAudioData = "client.player.audio_data",
}

export type MindforgeServerEvent = {
  type: MindforgeServerEventType;
  content?: string;
};

export type MindforgeClientEvent = {
  type: MindforgeClientEventType;
  content?: string;
};

export class NPCMessage implements MindforgeServerEvent {
  type: MindforgeServerEventType.NPCMessage =
    MindforgeServerEventType.NPCMessage;
  constructor(public content: string) {}
}

export class NPCAction implements MindforgeServerEvent {
  type: MindforgeServerEventType.NPCAction = MindforgeServerEventType.NPCAction;
  constructor(public content: string) {}
}

export class NPCLiveMessageChunk implements MindforgeServerEvent {
  type: MindforgeServerEventType.NPCLiveMessageChunk =
    MindforgeServerEventType.NPCLiveMessageChunk;
  constructor(public content: string) {}
}

export class NPCLiveMessage implements MindforgeServerEvent {
  type: MindforgeServerEventType.NPCLiveMessage =
    MindforgeServerEventType.NPCLiveMessage;
  constructor(public content: string) {}
}

export class NPCAudioData implements MindforgeServerEvent {
  type: MindforgeServerEventType.NPCAudioData =
    MindforgeServerEventType.NPCAudioData;
  constructor(public content: string) {}
}

export class PlayerTranscribedMessageChunk implements MindforgeServerEvent {
  type: MindforgeServerEventType.PlayerTranscribedMessageChunk =
    MindforgeServerEventType.PlayerTranscribedMessageChunk;
  constructor(public content: string) {}
}

export class PlayerTranscribedMessage implements MindforgeServerEvent {
  type: MindforgeServerEventType.PlayerTranscribedMessage =
    MindforgeServerEventType.PlayerTranscribedMessage;
  constructor(public content: string) {}
}

export class PlayerMessage implements MindforgeClientEvent {
  type: MindforgeClientEventType.PlayerMessage =
    MindforgeClientEventType.PlayerMessage;
  constructor(public content: string) {}
}

export class PlayerAudioData implements MindforgeClientEvent {
  type: MindforgeClientEventType.PlayerAudioData =
    MindforgeClientEventType.PlayerAudioData;
  constructor(public content: string) {}
}

export class ServerError implements MindforgeServerEvent {
  type: MindforgeServerEventType.ServerError =
    MindforgeServerEventType.ServerError;
  constructor(public content: string) {}
}

export class Close implements MindforgeServerEvent {
  type: MindforgeServerEventType.Close = MindforgeServerEventType.Close;
  constructor() {}
}
