import logo from "../../assets/logo.svg";
import Image from "next/image";
import LoginBtn from "../login button/LoginBtn";
import style from "./NavBar.module.css";

export default function NavBar() {
    return (
        <nav className={style.nav}>
            <Image src={logo} alt="logo-svg" className={style.logo}></Image>
            <LoginBtn />
        </nav>
    )
}