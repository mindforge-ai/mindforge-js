import EventEmitter from "events";
import {
  NPCMessage,
  MindforgeNPCMessageType,
  NPCClientFunctionFire,
  NPCText,
} from "./messages";

export class MindforgeServerClient extends EventEmitter {
  private baseURL: string;
  private apiKey: string | null;

  constructor({
    baseURL = "https://api.mindforge.ai",
    apiKey = process.env.MINDFORGE_API_KEY || null,
  }: {
    baseURL?: string;
    apiKey?: string | null;
  } = {}) {
    super();
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    if (!apiKey) {
      throw new Error("[Mindforge] API key missing");
    }
  }

  public perform = {
    trigger: async (
      npcId: string,
      history: Array<{ role: "user" | "assistant"; content: string }>
    ) => {
      try {
        const response = await fetch(`${this.baseURL}/perform`, {
          method: "POST",
          body: JSON.stringify({
            npcId,
            history,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        });

        const result: NPCMessage[] = await response.json();

        return result.map((message) => {
          switch (message.type) {
            case MindforgeNPCMessageType.Text:
              return new NPCText(message.content);
            case MindforgeNPCMessageType.ClientFunctionFire:
              return new NPCClientFunctionFire(message.name, message.args);
            default:
              throw new Error("Unknown message type");
          }
        });
      } catch (error) {
        console.error("Error calling perform API:", error);
        throw new Error("Failed to perform NPC interaction");
      }
    },
  };
}
