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
                
                // User hits the dashboard.
                cy.contains("h2", "Account")
                    .should('be.visible')
            });
        })
    })

    describe('clicking the create an account button', () => {
        it('opens a modal', () => {

            // Loads the page and clicks the create button
            cy.visit("https://lil-bugga.netlify.app/")
            cy.contains("button", "Create an Account!")
                .click()

            // Fill in the form and click create.
            cy.contains("div", "Create Account").should('be.visible')
            cy.get("input").eq(2)
                .type("Test User")
            cy.get("input").eq(3)
                .type("test@user.com")
            cy.get("input").eq(4)
                .type("password")
            cy.get("input").eq(5)
                .type("password")
                
            // Should be filled out and ready to submit.
            cy.get("input").eq(2)
                .should("have.value", "Test User")
            cy.get("input").eq(3)
                .should("have.value", "test@user.com")
            cy.get("input").eq(4)
                .should("have.value", "password")
            cy.get("input").eq(5)
                .should("have.value", "password")
        });
    })

    describe('filling in the login form', () => {
        it('should upon clicking the login button, redirect to the dashboard.', () => {
            
            // Go back to the landing.
            cy.visit("https://lil-bugga.netlify.app/")

            // Fill in login and click login
            cy.get("input").eq(0)
                .type("sample@sample.com")
            cy.get("input").eq(1)
                .type("password")
            cy.contains("button", "Login")
                .click()

            // Check you are on the dashboard page
            cy.contains("h2", "Account")
                .should('be.visible')

            // Sign out
            cy.get("a").eq(3)
                .click()

        });
    })
    
    
})