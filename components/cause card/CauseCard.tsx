
import Image from "next/image";
import plus_btn from "../../assets/plus_btn.svg";
import checkBtn from "../../assets/check.svg";
import style from "../../styles/Cause.module.css";

interface CauseCardProps {
    id: string;
    title: string;
    backgroundColor: string;
    isChecked: boolean;
    toggleCard: (id: string) => void;
}

export default function CauseCard({ id, title, backgroundColor, isChecked, toggleCard }: CauseCardProps) {
    return (
        <div className={style.card_handler}>
            <div className={style.cause_card} style={{ backgroundColor }} onClick={() => toggleCard(id)}>
                <p className={style.p}>{title}</p>
                <div className={style.check_btn}>
                    <Image src={isChecked ? checkBtn : plus_btn} alt="check button" className={isChecked ? style.check_btn : style.plus_btn}/>
                </div>
            </div>
            <div className={style.shade_card}></div>
        </div>
    );
}
