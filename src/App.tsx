import "./App.css";
import React from "react";

import PrefCheckbox from "./components/PrefCheckbox";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <div className="App">
        <div className="App-container">
          <PrefCheckbox />
        </div>
      </div>
    </>
  );
}
