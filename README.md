# Mindforge Client

[mindforge.ai](https://mindforge.ai)

This is a TypeScript client for interacting with the Mindforge API. It provides a simple interface to connect to the Mindforge server, send messages, and receive various types of events.

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

## Usage

Create a MindforgeClient:

```typescript
import { MindforgeClient, MindforgeServerEventType } from "mindforge-client";
const apiKey = "your-api-key";
const client = new MindforgeClient(apiKey);
```

To use this client, you'll need a Mindforge API key. You can create keys in the dashboard.

### Open a websocket connection

To connect to the Mindforge server:

```typescript
const npcId = "your-npc-id";
const conversationId = "optional-conversation-id";
client.connect(npcId, conversationId);
```

### Sending messages and audio data

To send a text message to the server:

```typescript
client.sendMessage("Hello, Mindforge!");
```

To send audio data to the server:

```typescript
client.sendAudioData("base64-encoded-audio-data");
```

### Receiving data

You can listen for various events emitted by the client:

```typescript
client.on(MindforgeServerEventType.NPCMessage, (content) => {
  console.log("Received NPC message:", content);
});

client.on(MindforgeServerEventType.NPCAction, (content) => {
  console.log("Received NPC action:", content);
});

client.on(MindforgeServerEventType.NPCLiveMessageChunk, (content) => {
  console.log("Received NPC live message chunk:", content);
});

client.on(MindforgeServerEventType.NPCLiveMessage, (content) => {
  console.log("Received complete NPC live message:", content);
});

client.on(MindforgeServerEventType.NPCAudioData, (content) => {
  console.log("Received NPC audio data:", content);
});

client.on(MindforgeServerEventType.PlayerTranscribedMessageChunk, (content) => {
  console.log("Received player transcribed message chunk:", content);
});

client.on(MindforgeServerEventType.PlayerTranscribedMessage, (content) => {
  console.log("Received complete player transcribed message:", content);
});

client.on(MindforgeServerEventType.ServerError, (content) => {
  console.error("Server error:", content);
});

client.on(MindforgeServerEventType.Close, () => {
  console.log("Connection closed");
});
```

### Disconnecting

To disconnect from the server:

```typescript
client.disconnect();
```

## Event Types

The client uses the following event types:

### Server Event Types

`NPCMessage`: Received when the NPC sends a complete message.

`NPCAction`: Received when the NPC performs an action.

`NPCLiveMessageChunk`: Received when a chunk of the NPC's live message is available.

`NPCLiveMessage`: Received when the NPC's complete live message is available.

`NPCAudioData`: Received when audio data from the NPC is available.

`PlayerTranscribedMessageChunk`: Received when a chunk of the player's transcribed message is available.

`PlayerTranscribedMessage`: Received when the player's complete transcribed message is available.

`ServerError`: Received when an error occurs on the server.

`Close`: Received when the WebSocket connection is closed.

### Client Event Types

`PlayerMessage`: Used to send a text message from the player to the server.

`PlayerAudioData`: Used to send audio data from the player to the server.

## Support

If you need any help or have any questions, please open a GitHub issue or contact us at `team@mindforge.ai`.
