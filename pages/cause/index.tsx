
import Head from "next/head";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/button/Button";
import BackButton from "../../components/back button/BackButton";
import CauseCard from "../../components/cause card/CauseCard";
import LoadingBar from "../../components/loading bar/LoadingBar";
import RightSideContent from "../../components/right side content/RightSideContent";
import style from "../../styles/Cause.module.css";


interface Cause {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    icon: string;
    tagline: string;
    active: boolean;
    order: number;
    impactHeader: null;
    impactBody: null;
    impactBackground: string;
    impactImage: string;
}

interface CausePageProps {
    causes: Cause[];
}

export default function CausePage({ causes }: CausePageProps) {
    const [checkedCards, setCheckedCards] = useState<Set<string>>(new Set());
    const [counter, setCounter] = useState<number>(0);
    const router = useRouter();

    const toggleCard = (id: string) => {
        setCheckedCards(prev => {
            const newCheckedCards = new Set(prev);
            let newCounter = counter;

            if (newCheckedCards.has(id)) {
                newCheckedCards.delete(id);
                newCounter -= 1;
            } else {
                if (counter < 3) {
                    newCheckedCards.add(id);
                    newCounter += 1;
                } else {
                    alert('You can only select up to 3 causes.');
                    return prev;
                }
            }
            setCounter(newCounter);
            return newCheckedCards;
        });
    };

    const handleContinue = () => {
        if (counter === 3) {
            const selectedCharityIds = Array.from(checkedCards);
            localStorage.setItem('selectedCharities', JSON.stringify(selectedCharityIds));
            
            router.push('/register');
        } else {
            alert('You must select exactly 3 causes before continuing.');
        }
    };

    const progressBarWidth = (counter / 3) * 100;

    // Find the latest checked charity to display
    const latestCheckedId = Array.from(checkedCards).pop();
    const latestCheckedCharity = causes.find(cause => cause.id === latestCheckedId) || null;

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="og:description" content="Choose how you want to help, set up a monthly giving plan, and let us handle the rest. Visit to learn more." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="og:title" content="Bono, Best place to donate and make an impact" />
                <title>Bono, Make a difference</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BackButton />

            <div className="row2">
                <h1 className={style.h1}>What do you care deeply about?</h1>

                <h3 className={style.h3}>Pick the 3 causes that you mostly care about:</h3>

                <div className={style.separater}>
                    <div className={style.container}>
                        
                        <div className={style.causes_cont}>
                            {causes?.map((cause, index) => (
                                <CauseCard 
                                    key={index} 
                                    id={cause.id} 
                                    title={cause.title} 
                                    backgroundColor={cause.impactBackground}
                                    isChecked={checkedCards.has(cause.id)}
                                    toggleCard={toggleCard}
                                />
                            ))}
                        </div>

                        <div className={style.divider}></div> 
                        
                        <div className={style.rs}>
                            <RightSideContent latestCheckedCharity={latestCheckedCharity} />
                        </div>
                    
                    </div>

                    <div className={style.loading}>
                        <h4 className={style.h4}>{counter}/3 causes added</h4>

                        <LoadingBar progressBarWidth={progressBarWidth} />

                        <div className={style.cause_page_bottom_div}>
                            <Button text="continue" goto="" onClick={handleContinue} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await axios.get("https://dev.api.bono.so/v1/charity/causes");
        const causes = response.data.data || [];
        return { props: { causes } };
    } catch (error) {
        return { props: { causes: [] } };
    }
};
