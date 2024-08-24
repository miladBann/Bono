import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Button from "@/components/button/Button";
import { useState, useEffect } from "react";
import bigLogo from "../assets/big_logo.svg";
import Image from "next/image";


export default function Home() { 
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
      <Head>
        <title>Create Next App</title>
        <meta name="og:description" content="Get to know us and choose how you want to help, set up a monthly giving plan, and let us handle the rest. Visit to learn more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:title" content="Bono, Best place to donate and make an impact" />
        <title>Bono</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.uniter}>
          {
            isMobile ? <>
              <div className={styles.logo_cont}>
                <Image src={bigLogo} alt="logo pic"/> 
              </div>
            </> : null
          }

          <div className={styles.row}>
              <h1 className={styles.h1}>Let's build your nonprofit portfolio</h1>

              <h2 className={styles.h2}>Join the movement and help fix the October 7th aftermath</h2>

              <ul className={styles.ul}>
                <li className={styles.li}><div className={styles.bullet_point}>1</div> choose causes</li>
                <li className={styles.li}><div className={styles.bullet_point}>2</div> Save your portfolio</li>
                <li className={styles.li}><div className={styles.bullet_point}>3</div> Subscribe to make an impact</li>
                <li className={styles.li}><div className={styles.bullet_point}>4</div> Receive weekly impact updates</li>
              </ul>

              <div className={styles.main_page_bottom_div}>
                <Button text="Let's start" goto="/cause"/>

                <p className={styles.p}>By continuing you agree to our <a href="https://www.bono.so/tc">Terms and Conditions</a> and <a href="https://www.bono.so/privacy-policy">Privacy Policy</a></p>
              </div>

              
          </div>
      </div>
      
    </>
  );
}
