
import style from "../../styles/Cause.module.css";

interface LoadingBarProps {
    progressBarWidth: number;
}

export default function LoadingBar({ progressBarWidth }: LoadingBarProps) {
    return (
        <div className={style.loading_bar}>
            <div className={style.loading_filler} style={{ width: `${progressBarWidth}%` }}></div>
        </div>
    );
}
