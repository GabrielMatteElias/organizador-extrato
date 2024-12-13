"use client";
import style from "./index.module.css";
import logo from "../../../assets/logo.png";
import Image from "next/image";
//icones
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAvatar from "../avatar";

const bordaLateral = { borderRight: "4px solid #8eafc2", marginRight: "1px", transition: ".1s ease-in-out", backgroundColor: "#4A9DCD", };

export function MenuLateral() {
  const nomePagina = usePathname();

  return (
    <nav className={style.menu} style={{ display: nomePagina === '/login' ? 'none' : '' }}>
      <div>
        <Link href="/" className={style.logo}>
          <Image src={logo} alt="logo-hoepers" className={style.img} width={30} height={'auto'} priority />
        </Link>
        <ul>
          <li
            style={nomePagina === "/extrato" ? bordaLateral : null}
          >
            <Link className={style.listItem} href="/extrato">
              <RequestQuoteIcon className={style.icon} />
            </Link>
          </li>
          <li
            style={nomePagina === "/metas" ? bordaLateral : null}
          >
            <Link className={style.listItem} href="/metas">
              <TaskAltIcon className={style.icon} />
            </Link>
          </li>
        </ul>
      </div>
      <footer className={style.footer}>
        <UserAvatar userName='Gabriel Matte Elias'/>
      </footer>
    </nav>
  );
}