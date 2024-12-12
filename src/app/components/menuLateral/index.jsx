"use client";
import React, { useCallback, useEffect, useState } from "react";
import style from "./index.module.css";
import logo from "../../../assets/logo.png";
import Image from "next/image";
//icones
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Link from "next/link";
import { usePathname } from "next/navigation";

const bordaLateral = { borderRight: "4px solid #8eafc2", marginRight: "1px", transition: ".1s ease-in-out", backgroundColor: "#4A9DCD", };

export function MenuLateral() {
  const [collapsed, setCollapsed] = useState(true);
  const nomePagina = usePathname();

  const handleCliqueMenu = (texto) => {
    setCollapsed(true)
  }

  const alterarEstadoMenuLateral = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);


  return (
    <div className={style.bodyPrincipal} style={{ display: nomePagina === '/login' ? 'none' : '' }}>
      <nav className={collapsed === false ? style.menu : style.menuEncolhido}>
        <Link href="/" className={style.menuLogo}>
          <Image src={logo} alt="logo-hoepers" className={style.menuLogoImg} width={30} height={'auto'} priority />
        </Link>
        <ul className={style.menuItens}>
          <li
            style={nomePagina === "/extrato" ? bordaLateral : null}
            onClick={(e) => handleCliqueMenu(e.target.innerText)}
          >
            <Link className={style.menuItensItem} href="/extrato">
              <RequestQuoteIcon className={style.menuItensItemIcon} />
              <p className={style.menuItensItemTexto}>Extrato</p>
            </Link>
          </li>
          <li
            style={nomePagina === "/metas" ? bordaLateral : null}
            onClick={(e) => handleCliqueMenu(e.target.innerText)}
          >
            <Link className={style.menuItensItem} href="/metas">
              <TaskAltIcon className={style.menuItensItemIcon} />
              <p className={style.menuItensItemTexto}>Metas</p>
            </Link>
          </li>
        </ul>
        <footer className={style.menuItensIconSidebar}>
          {collapsed ? (
            <KeyboardArrowRightIcon className={style.menuItensItemIconClose} onClick={alterarEstadoMenuLateral} />
          ) : (
            <KeyboardArrowLeftIcon onClick={alterarEstadoMenuLateral} className={style.menuItensItemIconClose} />
          )}
        </footer>
      </nav>
    </div>
  );
}