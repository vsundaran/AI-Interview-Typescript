import { useState } from 'react';
import { HfInference } from "@huggingface/inference";
import useTextToSpeech from './useTextToSpeech';
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

// console.log(HUGGING_FACE_API_KEY, 'HUGGING_FACE_API_KEY')
const client = new HfInference(HUGGING_FACE_API_KEY);


/**
 * Custom hook for AI Chat interaction
 * @returns {Object} - { chatHistory, sendMessage, isLoading, error }
 */

type messageContent = {
    role:string,
    content:string
}

const useAIChat = () => {
    const [chatHistory, setChatHistory] = useState<messageContent[]>([]); // Stores conversation history
    const [isLoading, setIsLoading] = useState(false); // isLoading state
    const [error, setError] = useState(""); // Error state
    // const { startSpeaking } = useSpeech();

    const { speak } = useTextToSpeech();

    /**
     * Send a message to the AI and update the conversation history
     * @param {string} userMessage - The user's question or input.
     */
    const sendMessage = async (userMessage:string, excludeText = false) => {
        if (!userMessage.trim()) return;

        // Update local state with user message
        const updatedHistory:messageContent[] = [
            ...chatHistory,
            { role: 'user', content: userMessage }
        ];
        if (!excludeText) {
            setChatHistory(() => updatedHistory);
        }
        setIsLoading(true);
        setError("");

        try {
            const chatCompletion = await client.chatCompletion({
                model: "deepseek-ai/DeepSeek-R1",
                messages: [{ role: 'user', content: userMessage }],
                provider: "together",
	            max_tokens: 500
            });

            // Get AI response
            const aiResponse:string|{ content?: string } = chatCompletion.choices[0]?.message?.content || 'No response from AI';

            let parsedContent;

            try {
                // If the response is valid JSON
                parsedContent = JSON.parse(aiResponse);
                parsedContent = parsedContent.content || parsedContent; // Fallback
            } catch {
                // If it's plain text
                parsedContent = aiResponse;
                // parsedContent = aiResponse.content || aiResponse;
            }

            // Remove "Question: " and surrounding quotes
            parsedContent = parsedContent.replace(/^Question:\s*/, '').replace(/^"|"$/g, '');

            // Play audio and update chat history after audio starts
            speak(parsedContent, () => {
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { role: 'ai', content: parsedContent }
                ]);
                setIsLoading(false);
            });
        } catch (err) {
            console.error('Error communicating with AI:', err);
            setError('Failed to fetch AI response');
        }
    };

    return {
        chatHistory,
        sendMessage,
        isLoading,
        error
    };
};

export default useAIChat;
