import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SEO({ title, description, image, url }) {
  const location = useLocation();
  const siteUrl = "https://auqab-tools.vercel.app";
  const currentUrl = url || `${siteUrl}${location.pathname}`;
  const ogImage = image || `${siteUrl}/og-image.png`; // يمكنك إضافة صورة 1200x630 لاحقاً
  const defaultTitle = "AUQAB Tools - Free Online Tools for Everyone";
  const defaultDesc = "70+ free online tools. QR, PDF, AI, Security, Media, Developer, and more.";

  useEffect(() => {
    document.title = title || defaultTitle;
    
    // تعيين أو تحديث وسوم meta
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description || defaultDesc);
    setMeta("og:title", title || defaultTitle, true);
    setMeta("og:description", description || defaultDesc, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:url", currentUrl, true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title || defaultTitle);
    setMeta("twitter:description", description || defaultDesc);
    setMeta("twitter:image", ogImage);
  }, [title, description, image, currentUrl, ogImage]);

  return null;
}

export default SEO;
