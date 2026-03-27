import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

test("render login page", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );

  expect(screen.getByText("ProjectManagement")).toBeInTheDocument();
});
