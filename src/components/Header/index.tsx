import React from "react";
import Logo from "../../assets/logo.jpg";
import "./styles.css";

type HeaderProps = {
  text: string;
};

export function Header({ text }: HeaderProps) {
  return (
    <header className="headerContainer">
      <img className="logo" src={Logo} alt="ELOGROUP" />
      <h1>{text}</h1>
    </header>
  );
}
