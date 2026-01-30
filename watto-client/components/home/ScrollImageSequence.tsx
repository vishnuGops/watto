"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const frameCount = 80;
const frames = Array.from(
  { length: frameCount },
  (_, i) => `/Animation Frames/frame_${i.toString().padStart(3, "0")}.jpg`,
);

export default function ScrollImageSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Text Opacity based on scroll
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.225, 0.35], [0, 1, 0]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.375, 0.5, 0.625],
    [0, 1, 0],
  );
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.775, 0.9], [0, 1, 0]);

  const y1 = useTransform(scrollYProgress, [0.1, 0.35], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0.45, 0.7], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0.75, 0.9], [50, 0]);

  // Mobile specific Y transforms (Fade in from bottom, fade out below)
  const mobileY1 = useTransform(
    scrollYProgress,
    [0.1, 0.225, 0.35],
    [50, -100, -300],
  );
  const mobileY2 = useTransform(
    scrollYProgress,
    [0.375, 0.5, 0.625],
    [50, -100, -300],
  );
  const mobileY3 = useTransform(
    scrollYProgress,
    [0.65, 0.775, 0.9],
    [50, -100, -300],
  );

  useEffect(() => {
    // Initialize images array
    imagesRef.current = new Array(frameCount).fill(null);
    let loadedCount = 0;

    frames.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));

        if (loadedCount === frameCount) {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setIsLoading(false);
        }
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (index: number) => {
      const safeIndex = Math.max(
        0,
        Math.min(Math.round(index), frameCount - 1),
      );

      // Try to find the nearest loaded image if current one isn't loaded yet
      let img = imagesRef.current[safeIndex];

      // Fallback: look backwards for a loaded frame
      if (!img) {
        for (let i = safeIndex - 1; i >= 0; i--) {
          if (imagesRef.current[i]) {
            img = imagesRef.current[i];
            break;
          }
        }
      }

      // If still no image (and we have future images?), look forward?
      // Usually backward is safer for continuity, but let's just stick to what we have.
      // If absolutely nothing is loaded (img is null), we can't draw.

      if (img) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calculate scale based on device width
        let scale =
          Math.max(canvas.width / img.width, canvas.height / img.height) * 0.85;
        let yOffset = 0;

        if (canvas.width < 1168) {
          scale = Math.max(
            canvas.width / img.width,
            (canvas.height / img.height) * 0.65,
          );
          yOffset = canvas.height * 0.08;
        }
        if (canvas.width < 768) {
          scale = Math.max(
            canvas.width / img.width,
            (canvas.height / img.height) * 0.55,
          );
          yOffset = canvas.height * 0.08;
        }

        const w = img.width * scale;
        const h = img.height * scale;
        const x = canvas.width / 2 - w / 2;
        const y = canvas.height / 2 - h / 2 - yOffset;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, w, h);
      }
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      requestAnimationFrame(() => render(latest));
    });

    // Initial draw loop to catch frames as they load if user hasn't scrolled
    // or just trigger once.
    // Since images load asynchronously, we might want to attempt a re-render when they load.
    // But adding 'loadProgress' to dependency array might be too heavy?
    // Let's just rely on the fact that if the user scrolls, it will update.
    // But for the initial frame (0), we want it to appear ASAP.

    const initialRenderInterval = setInterval(() => {
      if (imagesRef.current[0]) {
        render(frameIndex.get());
        clearInterval(initialRenderInterval);
      }
    }, 100);

    // Handle resize
    const handleResize = () => render(frameIndex.get());
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      clearInterval(initialRenderInterval);
    };
  }, [frameIndex]); // Removed images/loaded dependencies to avoid re-binding loop

  return (
    <div ref={ref} className="relative h-[400vh] md:h-[250vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        {/* Loading State */}
        {isLoading && loadProgress < 100 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 bg-black z-20">
            <div className="mb-2">Loading Experience... {loadProgress}%</div>
            <div className="w-48 h-1 bg-gray-800 rounded overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Overlay Text - Desktop */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-start z-10 px-4 md:px-20"
        >
          <h1 className="text-4xl md:text-6xl font-normal text-white drop-shadow-2xl">
            The Un-Skippable
            <br />
            <span className="text-blue-500">Ad</span>
          </h1>
        </motion.div>

        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-end z-10 px-4 md:px-20"
        >
          <h2 className="text-4xl md:text-6xl font-normal text-right text-white drop-shadow-2xl">
            Prime <br />
            <span className="text-blue-500">Real Estate</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-start z-10 px-4 md:px-20"
        >
          <h2 className="text-4xl md:text-6xl font-normal text-white drop-shadow-2xl">
            Data in every <br />
            <span className="text-blue-500">Drop</span>
          </h2>
        </motion.div>

        {/* Overlay Text - Mobile (Fade in from bottom, fade out below) */}
        <motion.div
          style={{ opacity: opacity1, y: mobileY1 }}
          className="pointer-events-none absolute inset-0 flex md:hidden items-end justify-center z-10 pb-20 text-center"
        >
          <h1 className="text-4xl font-normal text-white drop-shadow-2xl">
            The Un-Skippable
            <br />
            <span className="text-blue-500">Ad</span>
          </h1>
        </motion.div>

        <motion.div
          style={{ opacity: opacity2, y: mobileY2 }}
          className="pointer-events-none absolute inset-0 flex md:hidden items-end justify-center z-10 pb-20 text-center"
        >
          <h2 className="text-4xl font-normal text-white drop-shadow-2xl">
            Prime <br />
            <span className="text-blue-500">Real Estate</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: opacity3, y: mobileY3 }}
          className="pointer-events-none absolute inset-0 flex md:hidden items-end justify-center z-10 pb-20 text-center"
        >
          <h2 className="text-4xl font-normal text-white drop-shadow-2xl">
            Data in every <br />
            <span className="text-blue-500">Drop</span>
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
