import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
// reverted extra pages

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const isMobile = /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;
    if (isMobile) {
      document.body.classList.add("reduce-animations");
    }
    const t = setTimeout(() => setShowSplash(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showSplash && (
        <div className="intro-splash">
          <div className="intro-brand">NexGen Point</div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}
