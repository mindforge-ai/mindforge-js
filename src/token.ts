export async function getMindforgeSessionToken(
  characterIds: string[],
  {
    baseUrl = "https://api.mindforge.ai",
    apiKey,
    conversationId,
    userId,
  }: {
    baseUrl?: string;
    apiKey?: string;
    conversationId?: string;
    userId?: string;
  }
): Promise<string> {
  const mindforgeApiKey = apiKey || process.env.MINDFORGE_API_KEY;

  if (!mindforgeApiKey) {
    throw new Error(
      "API key is required. Set MINDFORGE_API_KEY environment variable or pass apiKey parameter."
    );
  }

  const response = await fetch(`${baseUrl}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mindforgeApiKey}`,
    },
    body: JSON.stringify({ characterIds, conversationId, userId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { token } = await response.json();
  return token;
}
