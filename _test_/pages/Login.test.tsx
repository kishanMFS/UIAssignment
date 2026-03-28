import { render, screen, fireEvent } from "@testing-library/react";
import { UserAuthContextProvider } from "../../src/context/authenticationContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Login from "../../src/pages/Login";
import Projects from "../../src/pages/Projects";

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

// Mock loginUserService
jest.mock("../../src/services/loginAPI", () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      access_token: "fake-token",
      statusCode: 200,
      message: "OK",
    }),
  ),
}));

// Mock useAuth hook
jest.mock("../../src/hooks/useAuth", () => {
  return () => ({
    loginUser: jest.fn(), // called with jwttoken
    isLoggedIn: true, // force logged in so navigate runs
  });
});

test("navigates to /projects after login button click", async () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </UserAuthContextProvider>
    </MemoryRouter>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "john@mail.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "changeme" },
  });

  // Click the login button
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(
    await screen.findByRole("heading", { name: /projects page/i }),
  ).toBeInTheDocument();
});
