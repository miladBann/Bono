import styles from "./Button.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import arrow from "../../assets/right_arrow.svg";
import Link from "next/link";
import { useRouter } from "next/router";

interface ButtonProps {
    text: string;
    goto?: string;
    onClick?: () => Promise<void> | void;
}

export default function Button({ text, goto, onClick }: ButtonProps) {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();

    // Track navigation changes to handle the button state
    useEffect(() => {
        const handleRouteChange = () => setClicked(true);
        const handleRouteComplete = () => setClicked(false);

        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteComplete);
        router.events.on('routeChangeError', handleRouteComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeComplete', handleRouteComplete);
            router.events.off('routeChangeError', handleRouteComplete);
        };
    }, [router.events]);

    const handleClick = async () => {
        if (onClick) {
            setClicked(true); 
            await onClick();    
            setClicked(false);  
        }
    };

    return (
        <div className={`${styles.button_handler} ${clicked ? styles.clicked : ''}`}>
            {goto ? (
                <Link href={`/${goto}`} passHref>
                    <button 
                        className={styles.main_page_btn} 
                        onClick={(e) => {
                            if (clicked) {
                                e.preventDefault(); 
                            } else {
                                handleClick(); 
                            }
                        }}
                        disabled={clicked} 
                    >
                        {clicked ? "loading..." : text} <Image src={arrow} alt="arrow" width={25} height={24} />
                    </button>
                </Link>
            ) : (
                <button 
                    className={styles.main_page_btn} 
                    onClick={handleClick} 
                    disabled={clicked} 
                >
                    {clicked ? "loading..." : text} <Image src={arrow} alt="arrow" width={25} height={24} />
                </button>
            )}
            <div className={styles.shade_div}></div>
        </div>
    );
}
