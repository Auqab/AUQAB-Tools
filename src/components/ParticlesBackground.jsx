import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let circles = [];

    const colorsDark = ["#38bdf8", "#818cf8", "#ec4899", "#22c55e", "#f59e0b", "#06b6d4"];
    const colorsLight = ["#1e40af", "#7c3aed", "#be185d", "#15803d", "#b45309", "#0e7490"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createCircles = () => {
      circles = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 40000);
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 120 + 30; // 30 - 150px
        const colors = theme === "dark" ? colorsDark : colorsLight;
        circles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.3 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let c of circles) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.strokeStyle = c.color;
        ctx.globalAlpha = c.opacity;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // حركة عائمة خفيفة
        c.x += c.speedX;
        c.y += c.speedY;

        // إعادة الدخول من الجانب الآخر
        if (c.x > canvas.width + c.radius) c.x = -c.radius;
        if (c.x < -c.radius) c.x = canvas.width + c.radius;
        if (c.y > canvas.height + c.radius) c.y = -c.radius;
        if (c.y < -c.radius) c.y = canvas.height + c.radius;
      }
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createCircles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createCircles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: theme === "dark" ? "#020617" : "#f8fafc",
      }}
    />
  );
};

export default ParticlesBackground;
