import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
it("renders info message.", () => {
  render(<App />);
  const linkElement =
    screen.getByText(/表示したい都道府県を選択してください。/i);
  expect(linkElement).toBeInTheDocument();
});

it("wrong test.", () => {
  render(<App />);
  const linkElement = screen.getByText(/wrong test./i);
  expect(linkElement).toBeInTheDocument();
});
