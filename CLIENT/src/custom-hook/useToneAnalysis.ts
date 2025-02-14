import { useState } from 'react';
// const HUGGING_FACE_API_KEY = import.meta.env.REACT_APP_HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

const useToneAnalysis = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [toneResult, setToneResult] = useState(null);
    const [error, setError] = useState("");

    const analyzeTone = async (userMessage = "") => {
        if (!userMessage) return null;

        setIsLoading(true);
        setError("");
        try {
            const response = await fetch(
                'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ inputs: userMessage }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to analyze tone');
            }

            const data = await response.json();
            setToneResult(data);
        } catch (err) {
            console.error(err);
            if(err instanceof Error){
                setError(err.message);
            }else{
                 setError('An unknown error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { analyzeTone, toneResult, isLoading, error };
};

export default useToneAnalysis;
