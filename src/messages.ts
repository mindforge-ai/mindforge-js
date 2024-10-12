export class NPCMessage {
  type: "server.npc.message" = "server.npc.message";
  constructor(public content: string) {}
}

export class NPCAction {
  type: "server.npc.action" = "server.npc.action";
  constructor(public toolName: string, public toolInput: any) {}
}

export type MindforgeServerMessage = NPCMessage | NPCAction;
