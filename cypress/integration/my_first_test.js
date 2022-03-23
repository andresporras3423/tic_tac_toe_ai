/// <reference types="cypress" />

it("google test", ()=>{
  cy.visit("https://www.google.com")
  cy.get(".gLFyf").type("hello world")
  cy.get('[jsmodel=" vWNDde "]').click()
  cy.get(".FPdoLc > center > .gNO89b").click()
})