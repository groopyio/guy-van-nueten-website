import { useEffect } from "react";

export const useCanvasInteraction = (canvasRef, images, setUrl) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const canvasX = e.clientX - canvas.getBoundingClientRect().left;
      const canvasY = e.clientY - canvas.getBoundingClientRect().top;
      canvas.style.cursor = "default";
      setUrl(null);
      console.log(images);
      images?.forEach((image) => {
        image.frozen = false;
        if (
          canvasX >= image.x &&
          canvasX <= image.x + image.element?.width &&
          canvasY >= image.y &&
          canvasY <= image.y + image.element?.height
        ) {
          image.frozen = true;
          canvas.style.cursor = "pointer";
          setUrl(image.url);
        }
      });
    };

    const handleClick = (e) => {
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
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [images]);
};
