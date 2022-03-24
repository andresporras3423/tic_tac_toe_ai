/// <reference types="cypress" />

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
  cy.wait(3000)
  cy.get('[data-testid="div-1-1"]').find('[data-testid="img-1-1"]').should('have.attr', 'src', '/static/media/x.48c6da0235bf47101db54418ea68a4a8.svg')
})