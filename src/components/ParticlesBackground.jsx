import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor(window.innerWidth / 8); // كثافة أعلى
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 60 + 20,
          speed: Math.random() * 1.2 + 0.6,
          opacity: Math.random() * 0.6 + 0.2,
          hue: 195 + Math.random() * 30, // لون أزرق-سماوي
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);

        // تأثير توهج
        ctx.strokeStyle = `hsla(${p.hue}, 90%, 70%, ${p.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.stroke();

        p.y += p.speed;
        if (p.y > canvas.height + p.length) {
          p.y = -p.length;
          p.x = Math.random() * canvas.width;
        }
      }

      // إعادة تعيين shadowBlur بعد الرسم حتى لا يؤثر على عناصر أخرى
      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

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
        background: "#020617",
      }}
    />
  );
};

export default ParticlesBackground;
