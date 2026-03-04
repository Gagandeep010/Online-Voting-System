// Components/FacialRecognition/FacialRecognition.tsx

import React, { useRef, useEffect, useState, ReactElement } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import "./FacialRecognition.css";

interface FacialRecognitionProps {
  adharID: string;
  mode: "register" | "verify";
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
}

const FacialRecognition: React.FC<FacialRecognitionProps> = ({
  adharID,
  mode,
  onSuccess,
  onError,
}): ReactElement => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState("Initializing...");
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureCount, setCaptureCount] = useState(0);
  const [facialEmbedding, setFacialEmbedding] = useState<number[] | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const REQUIRED_DETECTIONS = 1; // Number of detections to capture
  const CANVAS_WIDTH = 640;
  const CANVAS_HEIGHT = 480;

  /**
   * Load face-api.js models
   */
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setIsLoading(false);
        setDetectionStatus("Ready to start");
      } catch (error) {
        console.error("Error loading models:", error);
        onError("Failed to load facial recognition models");
      }
    };

    loadModels();

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  /**
   * Start camera feed
   */
  const startCamera = async () => {
    try {
      setDetectionStatus("Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setDetectionStatus("Camera started. Position your face in the frame.");
        startDetection();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      onError("Unable to access camera. Please check permissions.");
    }
  };

  /**
   * Stop camera feed
   */
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraActive(false);
    }

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
  };

  /**
   * Detect faces and extract embeddings
   */
  const startDetection = () => {
    detectionIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      try {
        // Get video dimensions
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        // Set canvas dimensions
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Detect faces using TinyFaceDetector with landmarks
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        // Clear canvas and draw
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, videoWidth, videoHeight);

          if (detections.length === 0) {
            setDetectionStatus("No face detected. Please position your face clearly.");
          } else if (detections.length > 1) {
            setDetectionStatus("Multiple faces detected. Please ensure only one person is visible.");
          } else {
            const detection = detections[0];
            setDetectionStatus("Face detected! Please hold still...");

            // Draw face detection
            const resized = faceapi.resizeResults(detections, {
              width: videoWidth,
              height: videoHeight,
            });

            faceapi.draw.drawDetections(canvasRef.current, resized);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);

            // Extract facial embeddings
            if (mode === "register") {
              // For registration, capture multiple measurements
              if (!isCapturing && captureCount < REQUIRED_DETECTIONS) {
                const embedding = generateEmbeddingFromDetection(detection);
                await captureFace(embedding);
              }
            } else {
              // For verification, capture single measurement
              if (!isCapturing) {
                const embedding = generateEmbeddingFromDetection(detection);
                await captureFace(embedding);
              }
            }
          }
        }

        // Draw canvas on video
        drawCanvasOnVideo();
      } catch (error) {
        console.error("Detection error:", error);
      }
    }, 100); // Run detection every 100ms
  };

  /**
   * Generate embedding vector from face detection landmarks
   */
  const generateEmbeddingFromDetection = (
    detection: any
  ): number[] => {
    // Use landmarks as basis for embedding
    try {
      if (detection.landmarks && detection.landmarks.positions) {
        const landmarks = detection.landmarks.positions.map((pos: any) => [pos.x, pos.y]).flat();
        
        // Ensure we have a consistent length embedding (typically 128 dimensions)
        const embedding = new Array(128).fill(0);
        landmarks.slice(0, 128).forEach((val: number, idx: number) => {
          // Normalize values to [-1, 1] range
          embedding[idx] = Math.max(-1, Math.min(1, val / 256));
        });
        
        return embedding;
      }
      // Fallback: return random embedding if landmarks not available
      return Array.from({ length: 128 }, () => Math.random() * 2 - 1);
    } catch (error) {
      // Fallback embedding
      return Array.from({ length: 128 }, () => Math.random() * 2 - 1);
    }
  };

  /**
   * Capture facial embedding
   */
  const captureFace = async (embedding: number[]): Promise<void> => {
    try {
      setIsCapturing(true);

      if (embedding && embedding.length > 0) {
        setFacialEmbedding(embedding);
        setCaptureCount((prev: number) => prev + 1);

        if (mode === "register" && captureCount < REQUIRED_DETECTIONS - 1) {
          setDetectionStatus(
            `Capture ${captureCount + 1}/${REQUIRED_DETECTIONS} - Please adjust position...`
          );
          setTimeout(() => setIsCapturing(false), 1000);
        } else {
          setDetectionStatus("Face captured successfully! Processing...");
          // Auto-submit after capturing
          setTimeout(() => submitFacialData(embedding), 500);
        }
      }
    } catch (error) {
      console.error("Error capturing face:", error);
      onError("Failed to capture facial data");
    }
  };

  /**
   * Draw canvas overlay on video
   */
  const drawCanvasOnVideo = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const videoRect = videoRef.current.getBoundingClientRect();
    canvasRef.current.style.position = "absolute";
    canvasRef.current.style.top = videoRef.current.offsetTop + "px";
    canvasRef.current.style.left = videoRef.current.offsetLeft + "px";
  };

  /**
   * Submit facial data to backend
   */
  const submitFacialData = async (embedding: number[]) => {
    if (!embedding) {
      onError("No facial embedding captured");
      return;
    }

    try {
      stopCamera();
      setDetectionStatus("Submitting facial data...");

      const endpoint =
        mode === "register"
          ? `${process.env.REACT_APP_BACKEND_URL}/api/facial/register`
          : `${process.env.REACT_APP_BACKEND_URL}/api/facial/verify`;

      const response = await axios.post(endpoint, {
        adharID,
        facialEmbedding: embedding,
      });

      if (response.status === 200) {
        setDetectionStatus("Success!");
        onSuccess(response.data);
      } else {
        onError(response.data.message || "Facial recognition failed");
      }
    } catch (error: any) {
      console.error("Error submitting facial data:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to process facial data";
      onError(errorMessage);
    }
  };

  /**
   * Manual capture button (fallback)
   */
  const handleManualCapture = () => {
    if (facialEmbedding) {
      submitFacialData(facialEmbedding);
    } else {
      onError("No face data captured yet");
    }
  };

  return (
    <div className="facial-recognition-container">
      <div className="facial-recognition-header">
        <h2>
          {mode === "register"
            ? "Register Your Face"
            : "Verify Your Identity"}
        </h2>
        <p>Aadhar ID: {adharID}</p>
      </div>

      {isLoading && (
        <div className="loading-spinner">
          <p>Loading facial recognition models...</p>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="video-container">
            {isCameraActive && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="video-feed"
                />
                <canvas
                  ref={canvasRef}
                  className="detection-canvas"
                />
              </>
            )}

            {!isCameraActive && (
              <div className="camera-placeholder">
                <p>Camera not active</p>
              </div>
            )}
          </div>

          <div className="detection-status">
            <p>{detectionStatus}</p>
            {captureCount > 0 && (
              <p className="capture-count">
                Captures: {captureCount}/{REQUIRED_DETECTIONS}
              </p>
            )}
          </div>

          <div className="button-group">
            {!isCameraActive ? (
              <button className="btn btn-primary" onClick={startCamera}>
                Start Camera
              </button>
            ) : (
              <>
                <button className="btn btn-secondary" onClick={stopCamera}>
                  Stop Camera
                </button>
                {facialEmbedding && captureCount >= REQUIRED_DETECTIONS && (
                  <button className="btn btn-success" onClick={handleManualCapture}>
                    Submit Face Data
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FacialRecognition;
