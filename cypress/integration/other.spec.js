/// <reference types="cypress" />

describe('other test', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  // https://on.cypress.io/interacting-with-elements

  it(' will pass other', () => {
    // https://on.cypress.io/type
    expect("Jane").to.equal('Jane')
  })


})
