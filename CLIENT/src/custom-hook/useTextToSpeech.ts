import { useState, useCallback } from 'react';
import { HfInference } from '@huggingface/inference';
import { useDispatch } from 'react-redux';
import { updateLoading } from '../redux/slice/loading';
// const HUGGING_FACE_API_KEY = import.meta.env.REACT_APP_HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

/**
 * Custom hook for Text-to-Speech functionality using Hugging Face API.
 * @param {string} apiKey - Your Hugging Face API key.
 * @param {string} model - The Hugging Face model to use for TTS (default: 'facebook/fastspeech2-en-ljspeech').
 * @returns {{
 *   speak: (text: string) => Promise<void>,
 *   isLoading: boolean,
 *   error: string | null
 * }}
 */


const useTextToSpeech = (model = 'facebook/fastspeech2-en-ljspeech') => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const DISPATCH = useDispatch();

    const speak = useCallback(
        async (text:string, onAudioStart:()=>void) => {
            if (!text.trim()) {
                setError('Text input cannot be empty.');
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                const hf = new HfInference(HUGGING_FACE_API_KEY);
                const audioBuffer = await hf.textToSpeech({ model, inputs: text });

                const audioBlob = new Blob([audioBuffer], { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);

                const audio = new Audio(audioUrl);

                // Preload audio before playing
                audio.addEventListener('canplaythrough', () => {
                    setIsLoading(false);
                    audio.play();
                    if (onAudioStart) {
                        onAudioStart();
                    }
                });

                audio.addEventListener('ended', () => {
                    DISPATCH(updateLoading({ loadingState: true, key: "candidate" }));
                });
                audio.play();

            } catch (err) {
                setError('Failed to generate speech. Please try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        },
        //eslint-disable-next-line
        [model]
    );

    return { speak, isLoading, error };
};

export default useTextToSpeech;
