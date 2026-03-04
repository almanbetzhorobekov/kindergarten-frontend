// import { describe, it, expect } from "vitest";

import { Box, Typography } from "@mui/material";
import { render } from "@testing-library/react";
import App from "App";
import HomePage from "pages/home/HomePage";
import { JSX } from "react";

// const add = (a: number, b: number) => a + b;

// describe("Проверка окружения Vitest", () => {
//   it("Математика работает (Unit)", () => {
//     expect(add(2, 3)).toBe(7);
//   });

//   it("JSDOM работает (Render)", () => {
//     document.body.innerHTML = '<button id="test-btn">Нажми меня</button>';
//     const btn = document.getElementById("test-btn");

//     expect(btn).not.toBeNull();
//     expect(btn?.textContent).toBe("");
//   });

function SuT(): JSX.Element {
  return <HomePage />;
}

describe("React", () => {
  test("render Button", () => {
    const { debug, getByRole } = render(<SuT />);
    expect(getByRole("main")).toBeInTheDocument();
  });
});
