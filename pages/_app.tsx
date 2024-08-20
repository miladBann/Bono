import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/Nav bar/NavBar";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isMobile && <NavBar />}
      <Component {...pageProps} />
    </>
  );
}
