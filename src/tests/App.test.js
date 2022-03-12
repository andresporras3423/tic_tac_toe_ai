import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('check if page has a start text', () => {
  const component = render(<App />);
  const linkElement = screen
  expect(component.getByText(/start/i)).toBeInTheDocument();
});
