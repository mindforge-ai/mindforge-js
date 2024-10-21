export type MindforgeNPCMessageEventMap = {
  [MindforgeNPCMessageType.Text]: NPCText;
  [MindforgeNPCMessageType.InputAudioTranscriptChunk]: NPCInputAudioTranscriptChunk;
  [MindforgeNPCMessageType.InputAudioTranscript]: NPCInputAudioTranscript;
  [MindforgeNPCMessageType.OutputAudioTranscriptChunk]: NPCOutputAudioTranscriptChunk;
  [MindforgeNPCMessageType.OutputAudioTranscript]: NPCOutputAudioTranscript;
  // [MindforgeNPCMessageType.ServerFunctionFire]: NPCServerFunctionFire;
  // [MindforgeNPCMessageType.ServerFunctionCall]: NPCServerFunctionCall;
  [MindforgeNPCMessageType.ClientFunctionFire]: NPCClientFunctionFire;
  // [MindforgeNPCMessageType.ClientFunctionCall]: NPCClientFunctionCall;
};

export enum MindforgeNPCMessageType {
  Text = "npc.text",
  InputAudioTranscriptChunk = "npc.input_audio_transcript.chunk",
  InputAudioTranscript = "npc.input_audio_transcript",
  OutputAudioTranscriptChunk = "npc.output_audio_transcript.chunk",
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

type NPCContentMessage = {
  type: MindforgeNPCMessageType.Text;
  content: string;
};

type NPCTranscriptMessage = {
  type:
    | MindforgeNPCMessageType.InputAudioTranscriptChunk
    | MindforgeNPCMessageType.InputAudioTranscript
    | MindforgeNPCMessageType.OutputAudioTranscriptChunk
    | MindforgeNPCMessageType.OutputAudioTranscript;
  transcriptId: string;
  content: string;
};

export type NPCMessage =
  | NPCFunctionMessage
  | NPCContentMessage
  | NPCTranscriptMessage;

export class NPCText implements NPCContentMessage {
  type: MindforgeNPCMessageType.Text = MindforgeNPCMessageType.Text;
  constructor(public content: string) {}
}

export class NPCInputAudioTranscriptChunk implements NPCTranscriptMessage {
  type: MindforgeNPCMessageType.InputAudioTranscriptChunk =
    MindforgeNPCMessageType.InputAudioTranscriptChunk;
  constructor(public transcriptId: string, public content: string) {}
}

export class NPCInputAudioTranscript implements NPCTranscriptMessage {
  type: MindforgeNPCMessageType.InputAudioTranscript =
    MindforgeNPCMessageType.InputAudioTranscript;
  constructor(public transcriptId: string, public content: string) {}
}

export class NPCOutputAudioTranscriptChunk implements NPCTranscriptMessage {
  type: MindforgeNPCMessageType.OutputAudioTranscriptChunk =
    MindforgeNPCMessageType.OutputAudioTranscriptChunk;
  constructor(public transcriptId: string, public content: string) {}
}

export class NPCOutputAudioTranscript implements NPCTranscriptMessage {
  type: MindforgeNPCMessageType.OutputAudioTranscript =
    MindforgeNPCMessageType.OutputAudioTranscript;
  constructor(public transcriptId: string, public content: string) {}
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
