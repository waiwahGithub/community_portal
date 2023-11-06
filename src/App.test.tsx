import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App Component", () => {
  it("should render without errors", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it("should render the Home page by default", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const homePageElement = screen.getByText("My Car List");
    expect(homePageElement).toBeInTheDocument();
  });
});
