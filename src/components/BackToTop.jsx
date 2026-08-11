import { useState, useEffect } from "react";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          background: "rgba(56, 189, 248, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          color: "#38bdf8",
          borderRadius: "50%",
          width: 45,
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 20,
          zIndex: 999,
          transition: "0.3s",
        }}
        title="Back to top"
      >
        ↑
      </button>
    )
  );
}

export default BackToTop;
