
import { useRouter } from "next/router";
import Image from "next/image";
import arrow from "../../assets/left_arrow.svg";
import style from "./BackButton.module.css";

export default function BackButton() {
    const router = useRouter();

    return (
        <div className={style.back_btn} onClick={() => router.back()}>
            <Image src={arrow} alt="arrow" width={25} height={24}></Image>
        </div>
    );
}
