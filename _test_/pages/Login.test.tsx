import { render, screen } from "@testing-library/react";
import Login from "../../src/pages/Login";
import { UserAuthContextProvider } from "../../src/context/authenticationContext";
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
