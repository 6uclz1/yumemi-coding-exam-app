import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../../components/ErrorBoundary";
import "@testing-library/jest-dom";
import React from "react";
describe("Error Boundary", () => {
  test("Error Boundary", () => {
    const ThrowError = () => {
      throw new Error("Exception Error.");
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    const linkElement = screen.getByText(/Sorry.. there was an error/i);
    expect(linkElement).toBeInTheDocument();
    // expect(screen.getByTestId("errorboundary")).toBeVisible();
  });
});
