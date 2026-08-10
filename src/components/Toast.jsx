import { useEffect, useState } from "react";

// سنستخدم سياق بسيط للتوست
let toastFn = null;

export function showToast(message, type = "success") {
  if (toastFn) toastFn(message, type);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    toastFn = (msg, type) => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 3000);
    };
    return () => (toastFn = null);
  }, []);

  return (
    <>
      {children}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 80,
            right: 20,
            background: toast.type === "error" ? "#ef4444" : "#22c55e",
            color: "white",
            padding: "12px 24px",
            borderRadius: 12,
            zIndex: 1000,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            animation: "fadeUp 0.3s ease",
          }}
        >
          {toast.msg}
        </div>
      )}
    </>
  );
}
