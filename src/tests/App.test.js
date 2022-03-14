import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
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
test('test radio button to start with x is checked', () => {
  const component = render(<App />);
  const symbol = component.getByTestId("radio-x");
  expect(symbol).toBeChecked();
});
test('test radio button to start with o is checked', () => {
  const component = render(<App />);
  const symbol = component.getByTestId("radio-o");
  expect(symbol).not.toBeChecked();
});
test('check that div board has 9 images', () => {
  const component = render(<App />);
  const images = component.container.querySelectorAll('img');
  expect(images.length).toBe(9);
});
test('check all source images are empty after player start a game with default configuration', () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  fireEvent.click(button);
  const images = component.container.querySelectorAll('img[src=""]');
  expect(images.length).toBe(9);
});
test('radiobutton "o" is checked after user clicked', () => {
  const component = render(<App />);
  const symbol = component.getByTestId("radio-o");
  fireEvent.click(symbol);
  expect(symbol).toBeChecked();
});
test('radiobutton "x" is checked after user clicked "o" and then "x"', () => {
  const component = render(<App />);
  const symbol_o = component.getByTestId("radio-o");
  const symbol_x = component.getByTestId("radio-x");
  fireEvent.click(symbol_o);
  fireEvent.click(symbol_x);
  expect(symbol_x).toBeChecked();
});
test('check all source images expect one are empty after player start a game using x symbol', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  const symbol = component.getByTestId("radio-o");
  fireEvent.click(symbol);
  fireEvent.click(button);
  const images = await component.container.querySelectorAll('img[src=""]');
  setTimeout(() => {
    expect(images.length).toBe(8);
  }, 1000);
});