import promisify from 'cypress-promise'
import game from './../../src/classes/Game';
/// <reference types="cypress" />

const get_all_img_src =  async()=>{
  const img_sources = [["","",""],["","",""],["","",""]]
  for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
      const img = await promisify(cy.get(`[data-testid="div-${i}-${j}"]`).find(`[data-testid="img-${i}-${j}"]`));
      const src = img.attr('src');
      img_sources[i][j] = src.match(/^\/static\/media\/x/) ? "x" : (src.match(/^\/static\/media\/o/) ? "o" : "")
    }
  }
  return img_sources;
}

it("show/hide 'choose level' section in mobile size", ()=>{
  cy.visit("http://localhost:3000/")
  cy.viewport(414, 736)
  cy.get('[data-testid="mobile-levels"] > :nth-child(1) > [data-testid="radio-easy"]').should('not.exist')
  cy.get('[data-testid="a-level-mobile"]').click()
  cy.get('[data-testid="mobile-levels"] > :nth-child(1) > [data-testid="radio-easy"]').should('exist')
})

it("show/hide 'choose symbol' section in mobile size", ()=>{
  cy.visit("http://localhost:3000/")
  cy.viewport(414, 736)
  cy.get('[data-testid="mobile-symbols"] > :nth-child(2) > [data-testid="radio-o"]').should('not.exist')
  cy.get('[data-testid="a-symbol-mobile"]').click()
  cy.get('[data-testid="mobile-symbols"] > :nth-child(2) > [data-testid="radio-o"]').should('exist')
})

it("with default config, click start and play one move, it should update the img", ()=>{
  cy.visit("http://localhost:3000/")
  cy.viewport(414, 736)
  cy.get('[data-testid="button-start"]').click()
  cy.get('[data-testid="div-1-1"]').click()
  cy.get('[data-testid="div-1-1"]').find('[data-testid="img-1-1"]').invoke('attr', 'src').should('match', /^\/static\/media\/x/)
})

it("playing with o symbol, click start and play one move, it should update the img", ()=>{
  cy.visit("http://localhost:3000/")
  cy.viewport(414, 736)
  cy.get('[data-testid="a-symbol-mobile"]').click()
  cy.get('[data-testid="mobile-symbols"] > :nth-child(2) > [data-testid="radio-o"]').click()
  cy.get('[data-testid="button-start"]').click()
  cy.wait(3000)
  cy.get('[data-testid="div-1-1"]').click()
  cy.get('[data-testid="div-1-2"]').click()
  cy.get('[data-testid="div-1-1"]').find('[data-testid="img-1-1"]').then((item) => {
    if(item.attr('src').match(/^\/static\/media\/o/)) expect(true).to.equal(true)
    else{
      cy.get('[data-testid="div-1-2"]').find('[data-testid="img-1-2"]').then((item2) => {
        if(item2.attr('src').match(/^\/static\/media\/o/)) expect(true).to.equal(true)
        else expect(false).to.equal(true)
    })
    }
})
})

it("with default config, shows playing only after click in start", ()=>{
  cy.visit("http://localhost:3000/")
  cy.viewport(414, 736)
  cy.get('h1').invoke('text').should('be.empty')
  cy.get('[data-testid="button-start"]').click()
  cy.get('h1').contains('playing') 
  cy.get('[data-testid="a-symbol-mobile"]').click()
  cy.get('[data-testid="mobile-symbols"] > :nth-child(2) > [data-testid="radio-o"]').click()
  cy.get('h1').invoke('text').should('be.empty')
  cy.get('[data-testid="button-start"]').click()
  cy.get('h1').contains('playing') 
})

it("with default config, if human plays perfect moves it draws", async ()=>{
  cy.visit("http://localhost:3000/")
  cy.viewport(414, 736)
  cy.get('[data-testid="button-start"]').click()
  const testGame = new game("x", "o");
  let cells = [["","",""],["","",""],["","",""]];
  for(let i=0; i<5; i++){
    cells = await get_all_img_src();
    let nextMove = testGame.select_move(cells);
    cy.get(`[data-testid="div-${nextMove["i"]}-${nextMove["j"]}"]`).click();
  }
  cy.get('h1').contains('draw');
})

it("playing with o symbol, if human plays perfect moves it draws", async ()=>{
  cy.visit("http://localhost:3000/")
  cy.viewport(414, 736)
  cy.get('[data-testid="a-symbol-mobile"]').click()
  cy.get('[data-testid="mobile-symbols"] > :nth-child(2) > [data-testid="radio-o"]').click()
  cy.get('[data-testid="button-start"]').click()
  const testGame = new game("o", "x");
  let cells = [["","",""],["","",""],["","",""]];
  for(let i=0; i<4; i++){
    cells = await get_all_img_src();
    let nextMove = testGame.select_move(cells);
    cy.get(`[data-testid="div-${nextMove["i"]}-${nextMove["j"]}"]`).click();
  }
  cy.get('h1').contains('draw');
})