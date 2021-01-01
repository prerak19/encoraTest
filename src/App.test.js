import { render, screen } from '@testing-library/react';
import Login from './components/Login';

test('renders login page', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Sign In to your account/i);
  expect(linkElement).toBeInTheDocument();
});
