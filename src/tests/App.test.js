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
  await new Promise((r) => setTimeout(r, 1000));
  const images = component.container.querySelectorAll('img[src=""]');
  expect(images.length).toBe(8);
}, 10000);
test('if computer start playing, after user makes its first move there are only 6 cells with no image', async () => {
  const component = render(<App />);
  const button = component.getByTestId("button-start");
  const symbol = component.getByTestId("radio-o");
  fireEvent.click(symbol);
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 1000));
  const images = component.container.querySelectorAll('.cell-properties img[src=""]');
  const image1 = images[Math.floor(Math.random()*images.length)];
  fireEvent.click(image1);
  await new Promise((r) => setTimeout(r, 1000));
  const n_images = component.container.querySelectorAll('img[src=""]');
  expect(n_images.length).toBe(6);
}, 10000);
test('after user click on start, content "playing" appear in the screen', async () => {
  const component = render(<App />);
  const button = component.getByTestId("button-start");
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 1000));
  expect(component.getByText("playing")).toBeInTheDocument();
}, 10000);
test('if human start playing, after user makes its first move there are only 7 cells with no image', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 1000));
  const divs = component.container.querySelectorAll('.cell-properties img[src=""]');
  const div1 = divs[Math.floor(Math.random()*divs.length)];
  fireEvent.click(div1);
  await new Promise((r) => setTimeout(r, 1000));
  const n_images = component.container.querySelectorAll('img[src=""]');
  expect(n_images.length).toBe(7)
}, 10000);
test('check there is only one image with scr=x.svg after user check o symbol and click start', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  const symbol = component.getByTestId("radio-o");
  fireEvent.click(symbol);
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 1000));
  const images = component.container.querySelectorAll('img[src="x.svg"]');
  expect(images.length).toBe(1);
}, 10000);
test('check there is only one image with scr=x.svg after game start and click one available cell', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 1000));
  const divs = component.container.querySelectorAll('.cell-properties img[src=""]');
  const div1 = divs[Math.floor(Math.random()*divs.length)];
  fireEvent.click(div1);
  await new Promise((r) => setTimeout(r, 1000));
  const x_images = component.container.querySelectorAll('img[src="x.svg"]');
  expect(x_images.length).toBe(1);
}, 10000);
test('check there are two images with  scr=x.svg after user chooses o symbol, game start and  user clicks one available cell', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  const symbol = component.getByTestId("radio-o");
  fireEvent.click(symbol);
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 1000));
  const divs = component.container.querySelectorAll('.cell-properties img[src=""]');
  const div1 = divs[Math.floor(Math.random()*divs.length)];
  fireEvent.click(div1);
  await new Promise((r) => setTimeout(r, 1000));
  const x_images = component.container.querySelectorAll('img[src="x.svg"]');
  expect(x_images.length).toBe(2);
}, 10000);
test('user play with default configuration and it clicks the four cells that are not corners neither the center, after that computer should have won', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  fireEvent.click(button);
  const items =["img-0-1","img-1-0","img-1-2","img-2-1"]
  for(let i=0; i<4; i++){
    const cell = component.getByTestId(items[i]);
    fireEvent.click(cell);
    await new Promise((r) => setTimeout(r, 1500));
  }
  expect(component.getByText("computer wins")).toBeInTheDocument();
}, 10000);
test('user click 0-radio  and it clicks the four cells that are not corners neither the center, after that computer should have won', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  const symbol = component.getByTestId("radio-o");
  fireEvent.click(symbol);
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 1500));
  const items =["img-0-1","img-1-0","img-1-2","img-2-1"]
  for(let i=0; i<4; i++){
    const cell = component.getByTestId(items[i]);
    fireEvent.click(cell);
    await new Promise((r) => setTimeout(r, 1500));
  }
  expect(component.getByText("computer wins")).toBeInTheDocument();
}, 10000);