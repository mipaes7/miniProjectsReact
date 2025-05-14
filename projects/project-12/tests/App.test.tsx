import { describe, test, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../src/App";


describe("<App />", () => {
    afterEach(() => {
      cleanup();
    });

  test("should work", () => {
    render(<App />);
    // screen.debug();

    const title = screen.getByText("Prueba técnica");

    expect(title).toBeTruthy();
  });

  test("should add new item and remove it", async () => {
    render(<App />)


    const input = screen.getByPlaceholderText("Juegos");
    expect(input).toBeDefined()
    const addBtn = screen.getByText('Añadir elemento')
    expect(addBtn).toBeDefined()
    await userEvent.type(input, "new test element")
    await userEvent.click(addBtn)
    expect(screen.getByText('new test element')).toBeDefined()
    expect(screen.getAllByRole('listitem').length).toBe(5)
    const newItem = screen.getByText('new test element')
    const removeBtn = newItem.querySelector('button')
    await userEvent.click(removeBtn!)
    expect(screen.getAllByRole('listitem').length).toBe(4)
  });
});
