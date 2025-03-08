import { useState } from "react";
import useTextToSpeech from "./useTextToSpeech";
import { enqueueSnackbar } from "notistack";
const OPEN_ROUTER_API_KEY = import.meta.env.VITE_OPEN_ROUTER_API_KEY;

/**
 * Custom hook for AI Chat interaction
 * @returns {Object} - { chatHistory, sendMessage, isLoading, error }
 */

type messageContent = {
  role: string;
  content: string;
};

const useAIChat = () => {
  const [chatHistory, setChatHistory] = useState<messageContent[]>([]); // Stores conversation history
  const [isLoading, setIsLoading] = useState(false); // isLoading state
  const [error, setError] = useState(""); // Error state

  const { speak } = useTextToSpeech();

  /**
   * Send a message to the AI and update the conversation history
   * @param {string} userMessage - The user's question or input.
   */

  const sendMessage = async (userMessage: string, excludeText = false) => {
    if (!userMessage.trim()) return;

    // Update local state with user message
    const updatedHistory: messageContent[] = [
      ...chatHistory,
      { role: "user", content: userMessage },
    ];
    if (!excludeText) {
      setChatHistory(() => updatedHistory);
    }
    setIsLoading(true);
    setError("");

    const turnOffLoaderCallBack = () => setIsLoading(false);

    try {
      // Bellow are from deepseek
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [{ role: "user", content: userMessage }],
            stream: true, // Enable streaming
          }),
        }
      );

      // Get the response body as a readable stream
      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break; // Stop when stream ends

        const chunk = decoder.decode(value, { stream: true });

        // Extract the content text from the streamed chunks
        const matches = chunk.match(/data: ({.*})/g);
        if (matches) {
          matches.forEach((match) => {
            try {
              const json = JSON.parse(match.slice(6)); // Remove "data: " prefix
              const content = json.choices[0]?.delta?.content || "";
              fullText += content; // Append content to fullText
              console.log(content); // Log real-time streamed text
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          });
        }
      }

      const updateChatHistoryCallBack = () => {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "ai", content: fullText },
        ]);
      };

      speak(fullText, updateChatHistoryCallBack, turnOffLoaderCallBack);
    } catch (err) {
      console.error("Error communicating with AI:", err);
      setError("Failed to fetch AI response");
      enqueueSnackbar((err as Error).message, { variant: "error" });
      turnOffLoaderCallBack();
    }
  };

  return {
    chatHistory,
    sendMessage,
    isLoading,
    error,
  };
};

export default useAIChat;
