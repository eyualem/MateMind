// src/screens/Affirmation.jsx

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./context/AppContext";

// Icons from react-icons/fi
import { FiMic, FiX, FiSend } from "react-icons/fi";

function Affirmation() {
  // Local UI state
  const [affirmation, setAffirmation] = useState("");   // The transcribed text
  const [isRecording, setIsRecording] = useState(false); // Are we actively recording?
  const [isProcessing, setIsProcessing] = useState(false); // Did we stop recording & waiting for transcript?

  const navigate = useNavigate();
  const { selectedTutor } = useAppContext();

  // Refs are used instead of globals, so they persist across renders but don't cause re-renders
  const wsRef = useRef(null);              // Holds the WebSocket instance
  const mediaRecorderRef = useRef(null);   // Holds the MediaRecorder instance

  /**
   * Helper function to stop recording and close socket gracefully.
   * Called on cancel, unmount, or error.
   */
  const stopRecordingAndCloseWs = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }
  };

  /**
   * Starts recording from the microphone and streaming audio to the WebSocket server.
   */
  const startRecording = async () => {
    try {
      // Create WebSocket connection to local server
      wsRef.current = new WebSocket("ws://localhost:3002");

      // --- Handle WebSocket events ---
      wsRef.current.onopen = () => {
        console.log("WebSocket connection established.");
        setIsRecording(true);
        setIsProcessing(false);
        setAffirmation(""); // Clear any old transcript
      };

      wsRef.current.onmessage = (event) => {
        console.log("Raw server message:", event.data);
        try {
          const received = JSON.parse(event.data); // Expect JSON
          const transcript = received.transcript;

          if (transcript) {
            if (received.is_final) {
              // Final transcript received → stop processing and close socket
              setAffirmation(transcript);
              setIsProcessing(false);
              setIsRecording(false);
              wsRef.current?.close();
            } else {
              // Interim (non-final) result → show live transcript
              setAffirmation(transcript);
            }
          }
        } catch (e) {
          // Handle bad or non-JSON messages safely
          console.error("Failed to parse server message:", e);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
        stopRecordingAndCloseWs();
        setIsRecording(false);
        setIsProcessing(false);
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      // --- Microphone setup ---
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Choose MIME type (depends on browser support)
      let mimeType = "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        console.warn(`MIME type ${mimeType} is not supported. Trying fallback.`);
        mimeType = "audio/webm";
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          console.warn(`MIME type ${mimeType} is also not supported. Using browser default.`);
          mimeType = ""; // Browser will pick best option
        }
      }
      console.log(`Using MIME type: ${mimeType || "browser default"}`);

      // Create a MediaRecorder to capture audio
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000,
      });

      // When a chunk of audio is available, send it to the server
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(event.data); // Send Blob directly
          console.log(`Sent data chunk of size: ${event.data.size}`);
        }
      };

      // Start recording with ~1 second chunks (instead of 250ms, less overhead)
      mediaRecorderRef.current.start(1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setAffirmation(
        "Microphone access denied. Please enable it in your browser settings."
      );
      setIsRecording(false);
      setIsProcessing(false);
    }
  };

  /**
   * Cancel button → stops recording and closes WebSocket.
   */
  const handleCancel = () => {
    stopRecordingAndCloseWs();
    setAffirmation("Recording canceled.");
    setIsRecording(false);
    setIsProcessing(false);
  };

  /**
   * Submit button → stop recording, keep waiting for transcript.
   * Includes a timeout fallback in case server never sends `is_final`.
   */
  const handleSubmit = () => {
    setIsProcessing(true);
    setIsRecording(false);

    // Stop capturing audio
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    console.log("Affirmation submitted:", affirmation);

    // Fallback: if no final transcript arrives in 5s, close socket manually
    setTimeout(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        console.warn("Closing socket due to timeout (no final transcript).");
        wsRef.current.close();
        setIsProcessing(false);
      }
    }, 5000);
  };

  /**
   * Cleanup on unmount → close streams and sockets if component is destroyed.
   */
  useEffect(() => {
    return () => {
      stopRecordingAndCloseWs();
    };
  }, []);

  // Button styling for mic
  const micButtonClasses = `
    w-16 h-16 rounded-full shadow-lg transition-all duration-200
    ${
      isRecording
        ? "bg-red-500 text-white animate-pulse"
        : "bg-blue-600 text-white hover:scale-110 active:scale-95"
    }
  `;

  // --- JSX ---
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-xl max-w-sm mx-auto my-12 shadow-xl">
      <div className="flex gap-4 items-center">
        {isRecording ? (
          // While recording → show cancel + submit buttons
          <>
            <button
              onClick={handleCancel}
              type="button"
              className="p-3 rounded-full bg-gray-300 text-gray-800 transition-transform hover:scale-110 active:scale-95"
              title="Cancel"
            >
              <FiX size={20} />
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="p-3 rounded-full bg-green-500 text-white transition-transform hover:scale-110 active:scale-95"
              title="Submit"
            >
              <FiSend size={20} />
            </button>
          </>
        ) : isProcessing ? (
          // While waiting for transcript → only show cancel
          <button
            onClick={handleCancel}
            type="button"
            className="p-3 rounded-full bg-gray-300 text-gray-800 transition-transform hover:scale-110 active:scale-95"
            title="Cancel"
          >
            <FiX size={20} />
          </button>
        ) : (
          // Default state → show mic button to start recording
          <button
            onClick={startRecording}
            type="button"
            className={micButtonClasses}
            title="Start Recording"
          >
            <FiMic size={32} className="mx-auto" />
          </button>
        )}
      </div>

      {/* Transcript or status message */}
      <p className="mt-6 text-center text-lg font-medium text-gray-700 min-h-[2.5rem]">
        {isRecording
          ? "Listening..."
          : isProcessing
          ? "Processing..."
          : affirmation || "Press the mic to start."}
      </p>
    </div>
  );
}

export default Affirmation;
