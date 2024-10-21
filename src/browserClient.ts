import EventEmitter from "events";
import { DataPacket_Kind, Participant, Room, RoomEvent } from "livekit-client";
import {
  NPCMessage,
  MindforgeNPCMessageEventMap,
  MindforgeNPCMessageType,
  NPCClientFunctionFire,
  NPCInputAudioTranscript,
  NPCOutputAudioTranscript,
  NPCText,
  PlayerText,
  NPCInputAudioTranscriptChunk,
  NPCOutputAudioTranscriptChunk,
} from "./messages.js";

export class MindforgeBrowserClient extends EventEmitter {
  public room: Room | null = null;

  constructor() {
    super();
  }

  public on<K extends MindforgeNPCMessageType>(
    event: K,
    listener: (data: MindforgeNPCMessageEventMap[K]) => void
  ): this {
    return super.on(event, listener);
  }

  public emit<K extends MindforgeNPCMessageType>(
    event: K,
    data: MindforgeNPCMessageEventMap[K]
  ): boolean {
    return super.emit(event, data);
  }

  public async joinSession(
    token: string,
    websocketUrl?: string
  ): Promise<void> {
    if (!token) {
      throw new Error("Token is required");
    }
    this.room = new Room();
    const url = websocketUrl || "wss://mindforgeai-d4ssqx5a.livekit.cloud";
    await this.room.connect(url, token);
    console.log("Connected to room", this.room.name);

    await this.room.localParticipant.setMicrophoneEnabled(true);

    this.room.on("participantConnected", (participant) => {
      console.log("Participant connected:", participant.identity);
    });

    this.room.on("participantDisconnected", (participant) => {
      console.log("Participant disconnected:", participant.identity);
    });

    const decoder = new TextDecoder();
    this.room.on(
      RoomEvent.DataReceived,
      (
        payload: Uint8Array,
        participant?: Participant,
        kind?: DataPacket_Kind
      ) => {
        const strData = decoder.decode(payload);
        console.log("Data received from", participant?.identity, ":", strData);

        try {
          const data: NPCMessage = JSON.parse(strData);

          switch (data.type) {
            case MindforgeNPCMessageType.Text:
              this.emit(
                MindforgeNPCMessageType.Text,
                new NPCText(data.content)
              );
              break;
            case MindforgeNPCMessageType.InputAudioTranscriptChunk:
              this.emit(
                MindforgeNPCMessageType.InputAudioTranscriptChunk,
                new NPCInputAudioTranscriptChunk(
                  data.transcriptId,
                  data.content
                )
              );
              break;
            case MindforgeNPCMessageType.InputAudioTranscript:
              this.emit(
                MindforgeNPCMessageType.InputAudioTranscript,
                new NPCInputAudioTranscript(data.transcriptId, data.content)
              );
              break;
            case MindforgeNPCMessageType.OutputAudioTranscriptChunk:
              this.emit(
                MindforgeNPCMessageType.OutputAudioTranscriptChunk,
                new NPCOutputAudioTranscriptChunk(
                  data.transcriptId,
                  data.content
                )
              );
              break;
            case MindforgeNPCMessageType.OutputAudioTranscript:
              this.emit(
                MindforgeNPCMessageType.OutputAudioTranscript,
                new NPCOutputAudioTranscript(data.transcriptId, data.content)
              );
              break;
            case MindforgeNPCMessageType.ClientFunctionFire:
              this.emit(
                MindforgeNPCMessageType.ClientFunctionFire,
                new NPCClientFunctionFire(data.name, data.args)
              );
              break;
            default:
              return;
          }
        } catch (error) {
          console.error("Error parsing received data:", error);
        }
      }
    );
  }

  public muteMic(): void {
    if (this.room) {
      this.room.localParticipant.setMicrophoneEnabled(false);
      console.log("Microphone muted");
    } else {
      throw new Error("Room is not connected");
    }
  }

  public unmuteMic(): void {
    if (this.room) {
      this.room.localParticipant.setMicrophoneEnabled(true);
      console.log("Microphone unmuted");
    } else {
      throw new Error("Room is not connected");
    }
  }

  public sendText(
    content: string,
    {
      reliable = true,
      destinationIdentities,
    }: { reliable?: boolean; destinationIdentities?: string[] } = {}
  ): void {
    if (this.room) {
      const playerText = new PlayerText(content);
      const strData = JSON.stringify(playerText);
      const encoder = new TextEncoder();
      const data = encoder.encode(strData);

      this.room.localParticipant.publishData(data, {
        reliable,
        destinationIdentities,
      });
      console.log("Message sent:", content);
    } else {
      throw new Error("Room is not connected");
    }
  }

  public disconnect(): void {
    if (this.room) {
      this.room.disconnect();
    }
  }
}
