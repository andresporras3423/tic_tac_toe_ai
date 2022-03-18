import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import App from '../components/App';
const check_valid_solution = (images, image_name)=>{
  console.log(`image 0: ${images["0"].getAttribute('data-testid')}`);
  console.log(`image 1: ${images["1"].getAttribute('data-testid')}`);
  console.log(`image 2: ${images["2"].getAttribute('data-testid')}`);
  console.log(`image_name: ${image_name}`);
  if(image_name==="x_diagonal1" || image_name==="o_diagonal1"){
    if(images["0"].getAttribute('data-testid')==="img-0-0" && images["1"].getAttribute('data-testid')==="img-1-1" && images["2"].getAttribute('data-testid')==="img-2-2") return true;
    return false;
  }
  if(image_name==="x_diagonal2" || image_name==="o_diagonal2"){
    if(images["0"].getAttribute('data-testid')==="img-0-2" && images["1"].getAttribute('data-testid')==="img-1-1" && images["2"].getAttribute('data-testid')==="img-2-0") return true;
    return false;
  }
  if(image_name==="x_row" || image_name==="o_row"){
    if(images["0"].getAttribute('data-testid')==="img-0-0" && images["1"].getAttribute('data-testid')==="img-0-1" && images["2"].getAttribute('data-testid')==="img-0-2") return true;
    if(images["0"].getAttribute('data-testid')==="img-1-0" && images["1"].getAttribute('data-testid')==="img-1-1" && images["2"].getAttribute('data-testid')==="img-1-2") return true;
    if(images["0"].getAttribute('data-testid')==="img-2-0" && images["1"].getAttribute('data-testid')==="img-2-1" && images["2"].getAttribute('data-testid')==="img-2-2") return true;
    return false;
  }
  if(image_name==="x_column" || image_name==="o_column"){
    if(images["0"].getAttribute('data-testid')==="img-0-0" && images["1"].getAttribute('data-testid')==="img-1-0" && images["2"].getAttribute('data-testid')==="img-2-0") return true;
    if(images["0"].getAttribute('data-testid')==="img-0-1" && images["1"].getAttribute('data-testid')==="img-1-1" && images["2"].getAttribute('data-testid')==="img-2-1") return true;
    if(images["0"].getAttribute('data-testid')==="img-0-2" && images["1"].getAttribute('data-testid')==="img-1-2" && images["2"].getAttribute('data-testid')==="img-2-2") return true;
    return false;
  }
  return false;
};
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
  await new Promise((r) => setTimeout(r, 2000));
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
  const items =["div-0-1","div-1-0","div-1-2","div-2-1"]
  for(let i=0; i<4; i++){
    const cell = component.getByTestId(items[i]);
    fireEvent.click(cell);
    await new Promise((r) => setTimeout(r, 2000 - (i*500)));
  }
  expect(component.getByText("computer wins")).toBeInTheDocument();
}, 10000);
test('user click 0-radio  and it clicks the four cells that are not corners neither the center, after that computer should have won', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  const symbol = component.getByTestId("radio-o");
  fireEvent.click(symbol);
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 2000));
  const items =["div-0-1","div-1-0","div-1-2","div-2-1"]
  for(let i=0; i<4; i++){
    const cell = component.getByTestId(items[i]);
    fireEvent.click(cell);
    await new Promise((r) => setTimeout(r,2000 - (i*500)));
  }
  expect(component.getByText("computer wins")).toBeInTheDocument();
}, 10000);
// test('user play with default configuration and it plays in a way computer wins, this tests check the boards shows one of the possible solutions', async () => {
//   const component = render(<App />);
//   const button = component.getByText(/start/i);
//   fireEvent.click(button);
//   const items =["div-0-1","div-1-0","div-1-2","div-2-1"]
//   for(let i=0; i<4; i++){
//     const cell = component.getByTestId(items[i]);
//     fireEvent.click(cell);
//     await new Promise((r) => setTimeout(r, 2000 - (i*500)));
//   };
//   const solutions=["o_diagonal1","o_diagonal2","o_row","o_column"].map(image_name=>{
//     const images = component.container.querySelectorAll(`img[src="${image_name}.svg"]`);
//     console.log(`length: ${images.length}`);
//     if(images.length===3) return check_valid_solution(images, image_name);
//     return false;
//   });
//   expect(solutions.some(any=>any)).toBe(true);
// }, 10000);
test('user select o symbol to play and it plays in a way computer wins, this tests check the boards shows one of the possible solutions', async () => {
  const component = render(<App />);
  const button = component.getByText(/start/i);
  const symbol = component.getByTestId("radio-o");
  fireEvent.click(symbol);
  fireEvent.click(button);
  await new Promise((r) => setTimeout(r, 2000));
  const items =["div-0-1","div-1-0","div-1-2","div-2-1"]
  for(let i=0; i<4; i++){
    const cell = component.getByTestId(items[i]);
    fireEvent.click(cell);
    await new Promise((r) => setTimeout(r, 2000 - (i*500)));
  };
  const solutions=["x_diagonal1","x_diagonal2","x_row","x_column"].map(image_name=>{
    const images = component.container.querySelectorAll(`img[src="${image_name}.svg"]`);
    if(images.length===3) return check_valid_solution(images, image_name);
    return false;
  });
  expect(solutions.some(any=>any)).toBe(true);
}, 10000);