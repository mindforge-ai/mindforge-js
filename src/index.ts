import EventEmitter from "events";
import {
  MindforgeClientEvent,
  MindforgeServerEvent,
  MindforgeServerEventType,
  PlayerAudioData,
  PlayerMessage,
  ServerError,
} from "./messages";

export function sendWebSocketMessage(
  ws: WebSocket,
  event: MindforgeClientEvent
) {
  const payload: { type: string; content?: string } = { type: event.type };
  if ("content" in event && event.content) {
    payload.content = event.content;
  }
  ws.send(JSON.stringify(payload));
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

    this.ws.onopen = () => {
      console.log("Connected to Mindforge server");
    };

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const serverEvent: MindforgeServerEvent = JSON.parse(event.data);
        this.emit(serverEvent.type, serverEvent.content);
      } catch (error) {
        this.emit(
          MindforgeServerEventType.ServerError,
          "Failed to parse server event"
        );
      }
    };

    this.ws.onerror = (event: Event) => {
      this.emit(
        MindforgeServerEventType.ServerError,
        "WebSocket error occurred"
      );
    };

    this.ws.onclose = () => {
      this.emit(MindforgeServerEventType.Close);
    };
  }

  public sendMessage(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      sendWebSocketMessage(this.ws, new PlayerMessage(message));
    } else {
      throw new Error("WebSocket is not connected");
    }
  }

  public sendAudioData(audioData: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      sendWebSocketMessage(this.ws, new PlayerAudioData(audioData));
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
