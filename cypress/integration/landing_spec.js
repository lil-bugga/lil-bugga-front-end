describe("On the Landing page", () => {
    describe("clicking the sample user login button", () => {
        it("opens the sample user login modal", () => {
            cy.visit("https://lil-bugga.netlify.app/")
            cy.contains("button", "Log in Sample User")
                .click()
                
            cy.contains("div.modal-header", "Select Sample User").should('be.visible')
        })

        describe('with open modal', () => {
            it('clicking the client log in button', () => {
                cy.visit("https://lil-bugga.netlify.app/")
                cy.contains("button", "Log in Sample User")
                    .click()

                // Client Login Button exists.
                cy.contains("a", "Log in Client").should('be.visible')

                // Logs the user in.
                cy.contains("a", "Log in Client")
                    .click()
            });
        })
        
    })
})