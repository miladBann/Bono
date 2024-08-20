import Head from "next/head";
import Image from "next/image";
import style from "../../styles/Register.module.css";
import BackButton from "../../components/back button/BackButton";
import divider from "../../assets/divider.svg";
import google_logo from "../../assets/google_logo.svg";
import Button from "@/components/button/Button";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleRegister = async () => {
        if (!name || !email) {
            alert("Please fill in all fields.");
            return;
        }

        const selectedCharityIds = JSON.parse(localStorage.getItem("selectedCharities") || "[]");
        if (selectedCharityIds.length !== 3) {
            alert("Please select exactly 3 causes before registering.");
            return;
        }

        try {
            const response = await axios.post("https://dev.api.bono.so/v1/auth/register/anonymous", {
                email,
                firstName: name,
                causes: selectedCharityIds,
            });
            console.log(response.data);
            alert("Registration successful!");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="og:description" content="Signup and register with Bono" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="og:title" content="Bono, Best place to donate and make an impact" />
                <title>Bono, Make a difference</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BackButton />

            <div className="row3">
                <div className={style.separater}>
                    <div>
                        <h1 className={style.h1}>Let’s save your portfolio</h1>

                        <h2 className={style.subtitle}>You’ll receive weekly impact reports from Bono. Your email is not shared with anyone!</h2>

                        <div className={style.inputs_cont}>
                            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <h4 className={style.h4}>You will receive a temporary password by email</h4>

                        <figure className={style.divider}>
                            <Image src={divider} alt="divider-line" ></Image>
                        </figure>

                        <button className={style.google_btn}>
                            <Image src={google_logo} alt="google logo"/>
                            <p>Continue with Google</p>
                        </button>
                    </div>
                    

                    <div className={style.register_page_bottom_div}>
                        <Button text="Save & continue" onClick={handleRegister}/>
                    </div>
                </div>
                
            </div>
        </>
    );
}