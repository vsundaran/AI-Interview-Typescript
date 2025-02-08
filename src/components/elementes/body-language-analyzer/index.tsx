import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

type Point = {
  x: number;
  y: number;
  z?: number; // Optional if the object may have 3D coordinates
};

type Landmarks = {
  getNose: () => Point[];
  getLeftEye: () => Point[];
  getRightEye: () => Point[];
};

type Expressions = {
  [key: string]: number;
};

const BodyLanguageAnalyzer: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Path to face-api.js models
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        console.log("Models loaded successfully");
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();

    const interval = setInterval(() => {
      console.log("analyzeFace trigger");
      analyzeFace();
    }, 10000);

    setTimer(interval);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const analyzeFace = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const displaySize = { width: 640, height: 480 };

      if (canvasRef.current) {
        canvasRef.current.width = displaySize.width;
        canvasRef.current.height = displaySize.height;
      }

      const ctx = canvasRef.current?.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, 0, 0, displaySize.width, displaySize.height);
      }

      const imageUrl = canvasRef.current?.toDataURL("image/jpeg");

      if (imageUrl) {
        const image = await faceapi.fetchImage(imageUrl);
        const detections = await faceapi
          .detectAllFaces(image)
          .withFaceLandmarks()
          .withFaceExpressions();

        console.log("detections", detections);

        if (ctx && canvasRef.current) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          faceapi.draw.drawDetections(canvasRef.current, detections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, detections);
        }

        const firstDetection = detections[0];
        if (firstDetection) {
          const expressions = firstDetection.expressions;
          const landmarks = firstDetection.landmarks as unknown as Landmarks;

          if (expressions) {
            console.log("Facial Expressions:", expressions);
          }

          if (landmarks) {
            const headPositionScore = calculateHeadPosition(landmarks);
            const eyeContactScore = calculateEyeContact(landmarks);
            const expressionScore = calculateExpressionScore(expressions);

            console.log("Head Position Score:", headPositionScore);
            console.log("Eye Contact Score:", eyeContactScore);
            console.log("Expression Score:", expressionScore);

            const bodyLanguageScore =
              (headPositionScore + eyeContactScore + expressionScore) / 3;
            console.log("Overall Body Language Score:", bodyLanguageScore);
          }
        }
      }
    }
  };

  const calculateHeadPosition = (landmarks: Landmarks): number => {
    const nose = landmarks.getNose();
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();

    const nosePosition = nose[3]; // Tip of the nose
    const leftEyePosition = leftEye[3];
    const rightEyePosition = rightEye[3];

    const tiltThreshold = 10;
    const tiltAmount =
      Math.abs(nosePosition.y - leftEyePosition.y) +
      Math.abs(nosePosition.y - rightEyePosition.y);

    return tiltAmount < tiltThreshold ? 1 : 0;
  };

  const calculateEyeContact = (landmarks: Landmarks): number => {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();

    const leftEyeCenter = leftEye
      .map((point) => new faceapi.Point(point.x, point.y))
      .reduce((acc, point) => acc.add(point), new faceapi.Point(0, 0))
      .div(leftEye.length);

    const rightEyeCenter = rightEye
      .map((point) => new faceapi.Point(point.x, point.y))
      .reduce((acc, point) => acc.add(point), new faceapi.Point(0, 0))
      .div(rightEye.length);

    const angle = Math.abs(leftEyeCenter.x - rightEyeCenter.x);
    const eyeContactThreshold = 15;
    return angle < eyeContactThreshold ? 1 : 0;
  };

  const calculateExpressionScore = (expressions: Expressions): number => {
    const positiveExpressions = ["happy", "surprised", "neutral"];
    const negativeExpressions = ["angry", "sad", "disgusted", "fearful"];

    let score = 0;

    positiveExpressions.forEach((expr) => {
      if (expressions[expr] > 0.5) score += 0.5;
    });

    negativeExpressions.forEach((expr) => {
      if (expressions[expr] > 0.5) score -= 0.5;
    });

    return score;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          borderRadius: "50%",
          overflow: "hidden",
          height: "150px",
          width: "150px",
        }}
      >
        <Webcam
          ref={webcamRef}
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
};

export default BodyLanguageAnalyzer;
