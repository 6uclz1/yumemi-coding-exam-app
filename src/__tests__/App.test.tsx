import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("renders App component", () => {
    window.ResizeObserver =
      window.ResizeObserver ||
      jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
      }));

    render(<App />);
    const linkElement =
      screen.getByText(/表示したい都道府県を選択してください。/i);
    expect(linkElement).toBeInTheDocument();
  });
});
