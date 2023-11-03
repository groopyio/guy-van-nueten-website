import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.css";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Initial canvas setup and resize
    resizeCanvas();

    const ballRadius = 20;
    const initialBalls = [
      {
        x: 100,
        y: 100,
        dx: 2,
        dy: 2,
        color: "red",
        url: "https://www.google.com",
      },
      {
        x: 200,
        y: 200,
        dx: -2,
        dy: -2,
        color: "blue",
        url: "https://www.facebook.com",
      },
      {
        x: 300,
        y: 300,
        dx: 1,
        dy: -1,
        color: "green",
        url: "https://www.instagram.com",
      },
    ];

    setBalls(initialBalls);

    function drawBall(ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    }

    function updateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball, index) => {
        drawBall(ball);
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (
          ball.x + ball.dx > canvas.width - ballRadius ||
          ball.x + ball.dx < ballRadius
        ) {
          ball.dx = -ball.dx;
        }
        if (
          ball.y + ball.dy > canvas.height - ballRadius ||
          ball.y + ball.dy < ballRadius
        ) {
          ball.dy = -ball.dy;
        }

        for (let i = index + 1; i < balls.length; i++) {
          const otherBall = balls[i];
          const dx = otherBall.x - ball.x;
          const dy = otherBall.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 2 * ballRadius) {
            const tempDx = ball.dx;
            const tempDy = ball.dy;

            ball.dx = otherBall.dx;
            ball.dy = otherBall.dy;

            otherBall.dx = tempDx;
            otherBall.dy = tempDy;
          }
        }

        canvas.addEventListener("click", (event) => {
          const rect = canvas.getBoundingClientRect();
          const clickX = event.clientX - rect.left;
          const clickY = event.clientY - rect.top;

          if (
            clickX > ball.x - ballRadius &&
            clickX < ball.x + ballRadius &&
            clickY > ball.y - ballRadius &&
            clickY < ball.y + ballRadius
          ) {
            window.open(ball.url, "_blank");
          }
        });
      });

      requestAnimationFrame(updateCanvas);
    }

    window.addEventListener("resize", resizeCanvas);

    updateCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas className={styles["canvas"]} ref={canvasRef} />;
}
