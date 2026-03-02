import { describe, it, expect } from "vitest";

const add = (a: number, b: number) => a + b;

describe("Проверка окружения Vitest", () => {
  it("Математика работает (Unit)", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("JSDOM работает (Render)", () => {
    document.body.innerHTML = '<button id="test-btn">Нажми меня</button>';
    const btn = document.getElementById("test-btn");

    expect(btn).not.toBeNull();
    expect(btn?.textContent).toBe("Нажми меня");
  });
});
