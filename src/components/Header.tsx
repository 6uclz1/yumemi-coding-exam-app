import React from "react";
import logo from "../logo.svg";
import { headerLogoStyle, headerStyle } from "../style/Style";

export default function Header() {
  return (
    <div style={headerStyle}>
      <img style={headerLogoStyle} src={logo} alt="Logo" />
    </div>
  );
}
