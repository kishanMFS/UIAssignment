import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { UserAuthContextProvider } from "../context/authenticationContext";
import { MemoryRouter } from "react-router-dom";

test("render login page", () => {
  render(
    <MemoryRouter>
      <UserAuthContextProvider>
        <Login />
      </UserAuthContextProvider>
    </MemoryRouter>,
  );

  expect(screen.getByText("Project Management")).toBeInTheDocument();
});
