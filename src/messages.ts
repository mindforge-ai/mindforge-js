export class NPCMessage {
  type: "server.npc.message" = "server.npc.message";
  constructor(public content: string) {}
}

export class NPCAction {
  type: "server.npc.action" = "server.npc.action";
  constructor(public toolName: string, public toolInput: any) {}
}

export class NPCLiveMessageChunk {
  type: "server.npc.live.message_chunk" = "server.npc.live.message_chunk";
  constructor(public content: string) {}
}

export class NPCLiveMessage {
  type: "server.npc.live.message" = "server.npc.live.message";
  constructor(public content: string) {}
}

export class PlayerTranscribedMessageChunk {
  type: "server.player.transcribed_message_chunk" =
    "server.player.transcribed_message_chunk";
  constructor(public content: string) {}
}

export class PlayerTranscribedMessage {
  type: "server.player.transcribed_message" =
    "server.player.transcribed_message";
  constructor(public content: string) {}
}

export type MindforgeServerMessage =
  | NPCMessage
  | NPCAction
  | NPCLiveMessageChunk
  | NPCLiveMessage
  | PlayerTranscribedMessageChunk
  | PlayerTranscribedMessage;
