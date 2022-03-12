import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, within } from '@testing-library/react';
import App from '../components/App';

test('check if page has a start text', () => {
  const component = render(<App />);
  expect(component.getByText(/start/i)).toBeInTheDocument();
});
test('check if page has text "play with X"', () => {
  const component = render(<App />);
  expect(component.getByText("Play with X")).toBeInTheDocument();
});
test('check if page has text "play with O"', () => {
  const component = render(<App />);
  expect(component.getByText("Play with O")).toBeInTheDocument();
});
test('test radio button is checked', () => {
  const component = render(<App />);
  const piece = component.getByTestId("radio-x");
  expect(piece).toBeChecked();
});
test('test radio button is checked', () => {
  const component = render(<App />);
  const piece = component.getByTestId("radio-o");
  expect(piece).not.toBeChecked();
});
test('check that div board has 9 images', () => {
  const component = render(<App />);
  const images = component.container.querySelectorAll('img');
  expect(images.length).toBe(9);
});