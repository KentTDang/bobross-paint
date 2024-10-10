import { useRef, useEffect } from "react";

export default function Media() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });

        videoRef.current!.srcObject = stream;
      } catch (e) {
        console.error("Error fetching media: ", e);
      }
    };
    fetchMedia();
  });

  return <video ref={videoRef} autoPlay />
}
