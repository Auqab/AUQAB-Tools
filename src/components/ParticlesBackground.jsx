import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let bubbles = [];

    const colors = [
      "rgba(56, 189, 248, 0.15)",   // أزرق فاتح
      "rgba(129, 140, 248, 0.15)",  // بنفسجي
      "rgba(34, 197, 94, 0.1)",     // أخضر
      "rgba(245, 158, 11, 0.1)",    // برتقالي
      "rgba(236, 72, 153, 0.1)",    // وردي
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createBubbles = () => {
      bubbles = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 25000); // كثافة منخفضة للسرعة
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 80 + 20;
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // رسم الدوائر
      for (let b of bubbles) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color.replace("0.15", b.opacity.toString()).replace("0.1", b.opacity.toString());
        ctx.fill();

        // حدود زجاجية رقيقة
        ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // تحريك الدوائر ببطء
        b.x += b.speedX;
        b.y += b.speedY;

        // إعادة الدائرة إلى الجانب الآخر إذا خرجت
        if (b.x > canvas.width + b.radius) b.x = -b.radius;
        if (b.x < -b.radius) b.x = canvas.width + b.radius;
        if (b.y > canvas.height + b.radius) b.y = -b.radius;
        if (b.y < -b.radius) b.y = canvas.height + b.radius;
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createBubbles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createBubbles();
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
        zIndex: -2,
        background: "#020617", // الخلفية الأساسية (سيتم تغطيتها بالتدرج من CSS)
      }}
    />
  );
};

export default ParticlesBackground;
