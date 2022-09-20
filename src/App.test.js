import { render, screen } from '@testing-library/react';
import App from './App';

test("Check for elements and props", () => {
  render(<App />);
  expect(screen.getByRole("heading")).toHaveTextContent(/Meet the team/);
  expect(screen.getAllByRole("button").filter(b => b.hasAttribute('alt'))).toHaveLength(screen.getAllByRole("button").length);
})