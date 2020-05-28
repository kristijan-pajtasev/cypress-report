/// <reference types="cypress" />

describe('test', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  // https://on.cypress.io/interacting-with-elements

  it(' will pass', () => {
    // https://on.cypress.io/type
    expect("Jane").to.equal('Jane')
  })

  it(' will fail', () => {
    // https://on.cypress.io/type
    expect("name").to.equal('Jane')
    cy.get("willFail")
  })

  describe("sub", () => {

    it(' will pass', () => {
      // https://on.cypress.io/type
      expect("Jane").to.equal('Jane')
    })
  })

})
