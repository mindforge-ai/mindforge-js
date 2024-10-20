export type MindforgeNPCMessageEventMap = {
  [MindforgeNPCMessageType.Text]: NPCText;
  [MindforgeNPCMessageType.InputAudioTranscript]: NPCInputAudioTranscript;
  [MindforgeNPCMessageType.OutputAudioTranscript]: NPCOutputAudioTranscript;
  // [MindforgeNPCMessageType.ServerFunctionFire]: NPCServerFunctionFire;
  // [MindforgeNPCMessageType.ServerFunctionCall]: NPCServerFunctionCall;
  [MindforgeNPCMessageType.ClientFunctionFire]: NPCClientFunctionFire;
  // [MindforgeNPCMessageType.ClientFunctionCall]: NPCClientFunctionCall;
};

export enum MindforgeNPCMessageType {
  Text = "npc.text",
  InputAudioTranscript = "npc.input_audio_transcript",
  OutputAudioTranscript = "npc.output_audio_transcript",
  // ServerFunctionFire = "npc.server_function_fire",
  // ServerFunctionCall = "npc.server_function_call",
  ClientFunctionFire = "npc.client_function_fire",
  // ClientFunctionCall = "npc.client_function_call",
}

export enum MindforgeClientMessageType {
  ClientFunctionResult = "client.function_result",
}

export enum MindforgeServerMessageType {
  ServerFunctionResult = "server.function_result",
}

export enum MindforgePlayerMessageType {
  Text = "player.text",
  TriggerNPCMessage = "player.trigger_npc_message",
}

type NPCFunctionMessage = {
  type: MindforgeNPCMessageType.ClientFunctionFire; // Other types still in development.
  name: string;
  args: object;
};

type NPCContentMessgae = {
  type:
    | MindforgeNPCMessageType.Text
    | MindforgeNPCMessageType.InputAudioTranscript
    | MindforgeNPCMessageType.OutputAudioTranscript;
  content: string;
};

export type NPCMessage = NPCFunctionMessage | NPCContentMessgae;

export class NPCText implements NPCContentMessgae {
  type: MindforgeNPCMessageType.Text = MindforgeNPCMessageType.Text;
  constructor(public content: string) {}
}

export class NPCInputAudioTranscript implements NPCContentMessgae {
  type: MindforgeNPCMessageType.InputAudioTranscript =
    MindforgeNPCMessageType.InputAudioTranscript;
  constructor(public content: string) {}
}

export class NPCOutputAudioTranscript implements NPCContentMessgae {
  type: MindforgeNPCMessageType.OutputAudioTranscript =
    MindforgeNPCMessageType.OutputAudioTranscript;
  constructor(public content: string) {}
}

/* export class NPCServerFunctionFire implements NPCFunctionMessage {
  type: MindforgeNPCMessageType.ServerFunctionFire =
    MindforgeNPCMessageType.ServerFunctionFire;
  constructor(public name: string, public args: any[]) {}
}

export class NPCServerFunctionCall implements NPCFunctionMessage {
  type: MindforgeNPCMessageType.ServerFunctionCall =
    MindforgeNPCMessageType.ServerFunctionCall;
  constructor(public name: string, public args: any[]) {}
} */

export class NPCClientFunctionFire implements NPCFunctionMessage {
  type: MindforgeNPCMessageType.ClientFunctionFire =
    MindforgeNPCMessageType.ClientFunctionFire;
  constructor(public name: string, public args: object) {}
}

/* export class NPCClientFunctionCall implements NPCFunctionMessage {
  type: MindforgeNPCMessageType.ClientFunctionCall =
    MindforgeNPCMessageType.ClientFunctionCall;
  constructor(public name: string, public args: any[]) {}
} */

export type PlayerMessage = {
  type: MindforgePlayerMessageType;
  content: string;
};

export class PlayerText implements PlayerMessage {
  type: MindforgePlayerMessageType.Text = MindforgePlayerMessageType.Text;
  constructor(public content: string) {}
}

export class PlayerTriggerNPCMessage implements PlayerMessage {
  type: MindforgePlayerMessageType.TriggerNPCMessage =
    MindforgePlayerMessageType.TriggerNPCMessage;
  constructor(public content: string) {}
}
