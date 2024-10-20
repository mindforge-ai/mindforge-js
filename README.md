# `mindforge-ts`

[mindforge.ai](https://mindforge.ai)

This package contains TypeScript clients and utilties for interacting with the Mindforge API. Specifically, there's a `MindforgeServerClient` for interactions with our REST API (e.g. creating an NPC, deleting a capability), and a `MindforgeBrowserClient` for joining live sessions in your client-side code.

## Installation

To install the Mindforge client, use your preferred package manager:

```bash
# NPM
npm install mindforge

# Yarn
yarn add mindforge

# PNPM
pnpm add mindforge

# Bun
bun add mindforge
```

### Server-side Usage

Create a `MindforgeServerClient`:

```typescript
import { MindforgeServerClient } from "mindforge";

const client = new MindforgeServerClient({
  baseURL: "https://api.mindforge.ai", // Optional
  apiKey: "your-api-key",
});
```

To use this client, you'll need a Mindforge API key. You can create keys in the dashboard.

#### Performing NPC interactions

To trigger an NPC interaction:

```typescript
const npcId = "your-npc-id"; // get from dashboard
const history = [
  { role: "player", content: "Hello, NPC!" },
  { role: "npc", content: "Greetings! How can I assist you today?" },
];

try {
  const result = await client.perform.trigger(npcId, history);
  result.forEach((message) => {
    switch (message.constructor) {
      case NPCText:
        console.log("NPC Text:", message.content);
        break;
      case NPCClientFunctionFire:
        console.log("NPC Function:", message.name, message.args);
        break;
    }
  });
} catch (error) {
  console.error("Error performing NPC interaction:", error);
}
```

### Browser-side Usage

Create a `MindforgeBrowserClient`:

```typescript
import { MindforgeBrowserClient, MindforgeNPCMessageType } from "mindforge";

const client = new MindforgeBrowserClient();
```

#### Joining a session

To join a live session:

```typescript
const token = "your-session-token"; // `getMindforgeSessionToken from token.ts`

try {
  await client.joinSession(token);
  console.log("Joined session successfully");
} catch (error) {
  console.error("Error joining session:", error);
}
```

#### Receiving messages

You can listen for various events emitted by the client:

```typescript
client.on(MindforgeNPCMessageType.Text, (message) => {
  console.log("Received NPC text:", message.content);
});

client.on(MindforgeNPCMessageType.InputAudioTranscript, (message) => {
  console.log("Received input audio transcript:", message.content);
});

client.on(MindforgeNPCMessageType.OutputAudioTranscript, (message) => {
  console.log("Received output audio transcript:", message.content);
});

client.on(MindforgeNPCMessageType.ClientFunctionFire, (message) => {
  console.log("NPC triggered client function:", message.name, message.args);
});
```

#### Disconnecting

To disconnect from the session:

```typescript
client.disconnect();
```

## Event Types

The client uses the following event types:

### Server Event Types

| Event Type                 | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `NPCText`                  | Received when the NPC sends a text message.             |
| `NPCInputAudioTranscript`  | Received when the input audio transcript is available.  |
| `NPCOutputAudioTranscript` | Received when the output audio transcript is available. |
| `NPCClientFunctionFire`    | Received when the NPC triggers a client-side function.  |

### Client Event Types

| Event Type                | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| `PlayerText`              | Used to send a text message from the player to the server. |
| `PlayerTriggerNPCMessage` | Used to trigger an NPC message from the player.            |

## Support

If you need any help or have any questions, please open a GitHub issue or contact us at `team@mindforge.ai`.
