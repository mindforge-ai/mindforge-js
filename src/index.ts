import WebSocket from "ws";
import EventEmitter from "events";

export enum MindforgeServerEvent {
  AudioData = "audioData",
  TextData = "textData",
  Error = "error",
  Close = "close",
}

export class MindforgeClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = "https://api.mindforge.ai") {
    super();
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public connect(characterId: string, conversationId?: string): void {
    const url = `${
      this.baseUrl
    }/characters/${characterId}/perform/stream?token=${this.apiKey}${
      conversationId ? `&_conversation_id=${conversationId}` : ""
    }`;
    this.ws = new WebSocket(url);

    this.ws.on("open", () => {
      console.log("Connected to Mindforge server");
    });

    this.ws.on("message", (data: WebSocket.Data) => {
      try {
        const parsedData = JSON.parse(data.toString());
        if (parsedData.type === "audio") {
          this.emit(MindforgeServerEvent.AudioData, parsedData.data);
        } else if (parsedData.type === "text") {
          this.emit(MindforgeServerEvent.TextData, parsedData.data);
        }
      } catch (error) {
        this.emit(MindforgeServerEvent.Error, "Failed to parse server message");
      }
    });

    this.ws.on("error", (error) => {
      this.emit(MindforgeServerEvent.Error, error);
    });

    this.ws.on("close", () => {
      this.emit(MindforgeServerEvent.Close);
    });
  }

  public sendMessage(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "userMessage", content: message }));
    } else {
      throw new Error("WebSocket is not connected");
    }
  }

  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}
