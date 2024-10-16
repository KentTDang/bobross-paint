// import DetectHands from "./components/DetectHands";
// import Media from "./components/Media";
import { useRef, useEffect } from "react";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorRef = useRef<handPoseDetection.HandDetector | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });

        videoRef.current!.srcObject = stream;
        detectHands();
      } catch (e) {
        console.error("Error fetching media: ", e);
      }
    };
    fetchMedia();
  });

  const detectHands = async () => {
    console.log("Hit 1 detect hands");

    try {
      console.log("Hit inside the try");
      // This detector detects hands
      detectorRef.current = await handPoseDetection.createDetector(model, {
        runtime: "mediapipe", // or 'tfjs'
        modelType: "full",
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
      });

      console.log(detectorRef.current);

      if (videoRef.current) {
        const hands = await detectorRef.current.estimateHands(videoRef.current);
        console.log(hands);
      }
    } catch (e) {
      console.error("Error Detecting Hands: ", e);
    }

    console.log("Hit 2 detect hands");
    // detectHands();
  };

  return (
    <>
      <video ref={videoRef} autoPlay />
    </>
  );
}

export default App;
