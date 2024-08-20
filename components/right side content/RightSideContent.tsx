
import Image from "next/image";
import checkBtn from "../../assets/check.svg";
import style from "../../styles/Cause.module.css";

interface RightSideContentProps {
    latestCheckedCharity: {
        title: string;
        description: string;
        icon: string;
    } | null;
}

export default function RightSideContent({ latestCheckedCharity }: RightSideContentProps) {
    return (
        <div className={style.right_side_content}>
            {latestCheckedCharity ? (
                <>
                    <div>
                        <div className={style.charity_tilte}>
                            <Image src={checkBtn} alt="check button" className={style.check_btn}/>
                            <h3>{latestCheckedCharity.title}</h3>
                        </div>
                        <div className={style.charity_description}>
                            {latestCheckedCharity.description}
                        </div>
                    </div>
                    <figure className={style.charity_pic}>
                        <Image className={style.charity_img} src={latestCheckedCharity.icon} alt={latestCheckedCharity.title} width={100} height={100} />
                    </figure>
                </>
            ) : (
                <p>Select a cause to see details here.</p>
            )}
        </div>
    );
}
