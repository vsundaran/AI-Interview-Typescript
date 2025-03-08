import { useState, useCallback } from "react";
import { HfInference } from "@huggingface/inference";
import { useDispatch } from "react-redux";
import { updateLoading } from "../redux/slice/loading";
import { enqueueSnackbar } from "notistack";
// const HUGGING_FACE_API_KEY = import.meta.env.REACT_APP_HUGGING_FACE_API_KEY;
// const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;
// const HUGGING_FACE_API_KEY = "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"
// const HUGGING_FACE_API_KEY = "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"
const HUGGING_FACE_API_KEY = "";

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

const useTextToSpeech = (model = "facebook/fastspeech2-en-ljspeech") => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const DISPATCH = useDispatch();

  const speak = useCallback(
    async (
      text: string,
      onAudioStart: () => void,
      loadingCallBack: () => void
    ) => {
      if (!text.trim()) {
        setError("Text input cannot be empty.");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const hf = new HfInference(HUGGING_FACE_API_KEY);
        const audioBuffer = await hf.textToSpeech({ model, inputs: text });

        const audioBlob = new Blob([audioBuffer], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);

        // Preload audio before playing
        audio.addEventListener("canplaythrough", () => {
          setIsLoading(false);
          audio.play();
          if (onAudioStart) {
            loadingCallBack();
            onAudioStart();
          }
        });

        audio.addEventListener("ended", () => {
          DISPATCH(updateLoading({ loadingState: true, key: "candidate" }));
        });
        audio.play();
      } catch (err) {
        setError("Failed to generate speech. Please try again.");
        enqueueSnackbar((err as Error).message, { variant: "error" });
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

// import { useState, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateLoading } from '../redux/slice/loading';
// import { enqueueSnackbar } from 'notistack';

// const COQUI_TTS_API_URL = "https://api.coqui.ai/tts";
// const COQUI_API_KEY = "YOUR_COQUI_API_KEY"; // Replace with your API key

// const useTextToSpeech = (voice = "en_US/cmu-arctic_low") => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     const dispatch = useDispatch();

//     const speak = useCallback(
//         async (text: string, onAudioStart?: () => void) => {
//             if (!text.trim()) {
//                 setError("Text input cannot be empty.");
//                 return;
//             }

//             setIsLoading(true);
//             setError("");

//             try {
//                 const response = await fetch(COQUI_TTS_API_URL, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${COQUI_API_KEY}`
//                     },
//                     body: JSON.stringify({
//                         text,
//                         speaker_id: voice, // Voice selection
//                         speed: 1.0 // Adjust speed if needed
//                     })
//                 });

//                 if (!response.ok) {
//                     throw new Error("Failed to generate speech.");
//                 }

//                 const audioBlob = await response.blob();
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 const audio = new Audio(audioUrl);

//                 audio.addEventListener("canplaythrough", () => {
//                     setIsLoading(false);
//                     audio.play();
//                     onAudioStart?.();
//                 });

//                 audio.addEventListener("ended", () => {
//                     dispatch(updateLoading({ loadingState: true, key: "candidate" }));
//                 });

//                 audio.play();
//             } catch (err) {
//                 setError("Failed to generate speech. Please try again.");
//                 enqueueSnackbar((err as Error).message, { variant: "error" });
//                 console.error(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         },
//         [voice]
//     );

//     return { speak, isLoading, error };
// };

// export default useTextToSpeech;
