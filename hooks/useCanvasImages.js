import { AudioMetaContext } from "pages";
import { useContext, useEffect, useState } from "react";

export const useCanvasImages = (canvasRef) => {
  const [images, setImages] = useState([]);
  const { setUrl } = useContext(AudioMetaContext);
  const [initialisedImages, setInitialisedImages] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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
        {
          src: "flying objects/box028-2.webp",
          url: "https://3voor12.vpro.nl/update~52ea8e37-5694-455b-89e2-761b5c2d581f~cb18-guy-van-nueten~.html",
        },
        {
          src: "flying objects/CC_JB_ill-2022.webp",
          url: "https://variety.com/2010/film/markets-festivals/pulsar-1117943358/",
        },
        {
          src: "flying objects/CC2_JB_ill-3023.webp",
          url: "https://www.dansendeberen.be/2019/06/30/gent-jazz-festivaldag-1-de-piano-in-de-spotlights/",
        },
        {
          src: "flying objects/Intonarumorus.webp",
          url: "https://houbi.com/belpop/groups/sands.htm",
        },
        {
          src: "flying objects/Synth.webp",
          url: "https://matrix-new-music.be/nl/publicaties/componistenfiches/van-nueten-guy/",
        },
      ];

      refs.forEach((ref) => {
        const img = new Image();
        img.src = ref.src;
        img.style.zIndex = "2";
        images.push({
          x: getRandomNumber(0, canvas.width - img.naturalWidth),
          y: getRandomNumber(0, canvas.height - img.naturalHeight),
          dx: (Math.random() < 0.5 ? 1 : -1) * getRandomNumber(0, 3),
          dy: (Math.random() < 0.5 ? 1 : -1) * getRandomNumber(0, 3),
          url: ref.url,
          element: img,
          frozen: false,
        });
      });

      return images;
    };

    setImages(initialImages());
    setInitialisedImages(true);

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const updateAllImages = () => {
      const updateImagePosition = (image) => {
        ctx.drawImage(image.element, image.x, image.y);
        !image.frozen && (image.x += image.dx);
        !image.frozen && (image.y += image.dy);
      };

      const handleBoundaryCollisions = (image) => {
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
      };

      const handleImageCollisions = (image, otherImages) => {
        for (const otherImage of otherImages) {
          if (image !== otherImage) {
            const dx = otherImage.x - image.x;
            const dy = otherImage.y - image.y;
            const offset = 10;

            const combinedHalfWidth =
              (image.element.width + otherImage.element.width) / 2;

            const combinedHalfHeight =
              (image.element.height + otherImage.element.height) / 2;

            const distanceX = Math.abs(dx) + offset;
            const distanceY = Math.abs(dy) + offset;

            if (
              distanceX < combinedHalfWidth &&
              distanceY < combinedHalfHeight
            ) {
              const tempDx = image.dx;
              const tempDy = image.dy;

              image.dx = otherImage.dx;
              image.dy = otherImage.dy;

              otherImage.dx = tempDx;
              otherImage.dy = tempDy;
            }
          }
        }
      };

      images.forEach((image) => {
        updateImagePosition(image);
        handleBoundaryCollisions(image);
        handleImageCollisions(image, images);
      });
    };

    const drawImages = () => {
      clearCanvas();
      updateAllImages();
    };

    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("click", (e) => {
      const clickX = e.clientX - canvas.getBoundingClientRect().left;
      const clickY = e.clientY - canvas.getBoundingClientRect().top;

      images.forEach((image) => {
        if (
          clickX >= image.x &&
          clickX <= image.x + image.element.width &&
          clickY >= image.y &&
          clickY <= image.y + image.element.height
        ) {
          window.open(image.url, "_blank");
        }
      });
    });

    canvas.addEventListener("mousemove", (e) => {
      const canvasX = e.clientX - canvas.getBoundingClientRect().left;
      const canvasY = e.clientY - canvas.getBoundingClientRect().top;
      canvas.style.cursor = "default";
      setUrl(null);
      images.forEach((image) => {
        image.frozen = false;
        if (
          canvasX >= image.x &&
          canvasX <= image.x + image.element.width &&
          canvasY >= image.y &&
          canvasY <= image.y + image.element.height
        ) {
          image.frozen = true;
          canvas.style.cursor = "pointer";
          setUrl(image.url);
        }
      });
    });

    const updateCanvas = () => {
      drawImages();
      requestAnimationFrame(updateCanvas);
    };

    requestAnimationFrame(updateCanvas);
  }, [initialisedImages]);
};
