import "./Header.css";
import React from "react";
import logo from "../logo.svg";

export default function Header() {
  return (
    <div className="Header">
      <img className="Header__logo" src={logo} alt="Logo" />
    </div>
  );
}
