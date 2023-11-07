import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.css";

export default function Canvas() {
  const [images, setImages] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const imageWidth = 20;
    const initialImages = [
      {
        x: Math.random() * (canvas.width - imageWidth),
        y: Math.random() * (canvas.height - imageWidth),
        dx: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        dy: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        src: "box028-2.png",
        url: "https://www.google.com",
      },
      {
        x: Math.random() * (canvas.width - imageWidth),
        y: Math.random() * (canvas.height - imageWidth),
        dx: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        dy: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        src: "CC_JB_ill-2022.png",
        url: "https://www.facebook.com",
      },
      {
        x: Math.random() * (canvas.width - imageWidth),
        y: Math.random() * (canvas.height - imageWidth),
        dx: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        dy: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        src: "CC2_JB_ill-3023.png",
        url: "https://www.instagram.com",
      },
      {
        x: Math.random() * (canvas.width - imageWidth),
        y: Math.random() * (canvas.height - imageWidth),
        dx: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        dy: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        src: "Intonarumorus.png",
        url: "https://www.instagram.com",
      },
      {
        x: Math.random() * (canvas.width - imageWidth),
        y: Math.random() * (canvas.height - imageWidth),
        dx: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        dy: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3),
        src: "Synth.png",
        url: "https://www.instagram.com",
      },
    ];

    setImages(initialImages);

    const drawImages = () => {
      images.forEach((image, index) => {
        const img = new Image();
        img.onload = () => {
          index === 0 && ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, image.x, image.y);
        };
        img.src = image.src;
        image.x += image.dx;
        image.y += image.dy;
        if (
          image.x + image.dx > canvas.width - img.naturalWidth ||
          image.x + image.dx < 0
        ) {
          image.dx = -image.dx;
        }
        if (
          image.y + image.dy > canvas.height - img.naturalHeight ||
          image.y + image.dy < 0
        ) {
          image.dy = -image.dy;
        }

        for (let i = index + 1; i < images.length; i++) {
          const otherImage = images[i];
          const dx = otherImage.x - image.x;
          const dy = otherImage.y - image.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 2 * imageWidth) {
            const tempDx = image.dx;
            const tempDy = image.dy;

            image.dx = otherImage.dx;
            image.dy = otherImage.dy;

            otherImage.dx = tempDx;
            otherImage.dy = tempDy;
          }
        }
      });
    };

    const updateCanvas = () => {
      drawImages();
      requestAnimationFrame(updateCanvas);
    };
    requestAnimationFrame(updateCanvas);
  }, []);

  return <canvas className={styles["canvas"]} ref={canvasRef} />;
}
