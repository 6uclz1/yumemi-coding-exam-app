import "./App.css";
import React from "react";

import PrefCheckbox from "./components/PrefCheckbox";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <div className="App">
        <div className="App-container">
          <div className="description">
            RESAS(地域経済分析システム)に掲載されている、人口構成のデータをグラフに表示します。
          </div>
          <PrefCheckbox />
        </div>
      </div>
      <Footer />
    </>
  );
}
