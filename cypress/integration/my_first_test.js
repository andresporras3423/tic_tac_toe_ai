/// <reference types="cypress" />

it("google test", ()=>{
  cy.visit("https://www.google.com")
  cy.get(".gLFyf").type("hello world")
  cy.get('[jsmodel=" vWNDde "]').click()
  cy.wait(5000)
  cy.get(":nth-child(1) > .wQiwMc > .z9gcx > .wWOJcd > .r21Kzd").click()
})