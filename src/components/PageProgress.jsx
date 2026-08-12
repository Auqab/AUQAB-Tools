import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// تخصيص شكل الشريط
NProgress.configure({
  showSpinner: false,
  speed: 400,
  minimum: 0.2,
});

function PageProgress() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return null;
}

export default PageProgress;
