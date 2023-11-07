import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.css";

export default function Canvas() {
  const [images, setImages] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageWidth = 20;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const getRandomNumber = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const initialImages = () => {
      const images = [];

      const refs = [
        { src: "box028-2.png", url: "https://www.youtube.com/user/GuyVN" },
        {
          src: "CC_JB_ill-2022.png",
          url: "https://www.facebook.com/guyvannueten/",
        },
        { src: "CC2_JB_ill-3023.png", url: "http://rockoco.be" },
        { src: "Intonarumorus.png", url: "https://sonyclassical.com" },
        {
          src: "Synth.png",
          url: "https://open.spotify.com/artist/6LQRyga459hm5w9HCzARFu?si=5EZBv86GTnuViiYJsEQyvQ",
        },
      ];

      refs.forEach((ref) => {
        const img = new Image();
        img.src = ref.src;
        images.push({
          x: getRandomNumber(0, canvas.width - img.naturalWidth),
          y: getRandomNumber(0, canvas.height - img.naturalHeight),
          dx: (Math.random() < 0.5 ? 1 : -1) * getRandomNumber(0, 3),
          dy: (Math.random() < 0.5 ? 1 : -1) * getRandomNumber(0, 3),
          url: ref.url,
          element: img,
        });
      });

      return images;
    };

    setImages(initialImages());

    const drawImages = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      images.forEach((image, index) => {
        ctx.drawImage(image.element, image.x, image.y);
        image.x += image.dx;
        image.y += image.dy;
        if (
          image.x + image.dx > canvas.width - image.element.naturalWidth ||
          image.x + image.dx < 0
        ) {
          image.dx = -image.dx;
        }
        if (
          image.y + image.dy > canvas.height - image.element.naturalHeight ||
          image.y + image.dy < 0
        ) {
          image.dy = -image.dy;
        }

        for (let i = index + 1; i < images.length; i++) {
          const otherImage = images[i];
          const dx = otherImage.x - image.x;
          const dy = otherImage.y - image.y;
          const offset = 5;

          const combinedHalfWidth =
            (image.element.width + otherImage.element.width) / 2;

          const combinedHalfHeight =
            (image.element.height + otherImage.element.height) / 2;

          const distanceX = Math.abs(dx) + offset;
          const distanceY = Math.abs(dy) + offset;

          if (distanceX < combinedHalfWidth && distanceY < combinedHalfHeight) {
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
