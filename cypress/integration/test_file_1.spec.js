/// <reference types="cypress" />

describe('spec file 1', () => {

  for(let i = 0; i < 20; i++)
    it(` will pass other ${i}`, () => {
      // https://on.cypress.io/type
      expect("Jane").to.equal('Jane')
    })


})
