describe('When logged in', () => {
    // Logs in before each test
    beforeEach(() => {
        cy.visit("https://lil-bugga.netlify.app/")
        cy.contains("button", "Log in Sample User")
            .click()
        cy.contains("a", "Log in Client")
            .click()
        cy.wait(5000)
    })

    // Logs out after each test
    afterEach(() => {
        cy.visit("https://lil-bugga.netlify.app/")
        cy.wait(2000)
        cy.get("a").eq(3)
                .click()
    })

    describe('when you try to create a project', () => {
        it("creates a project", () => {
            // Create the project
            cy.get('#DashboardProjects > .rounded-0')
                .click()
            cy.wait(1000)
            cy.get(':nth-child(1) > .form-control')
                .type("Test Project")
    
            cy.get(':nth-child(2) > .form-control')
            .type("It's a project created to test the system.")
            cy.get('.p-2 > .btn')
            .click()
            cy.wait(5000)

            // Assert that the project exists on the main
            cy.visit("https://lil-bugga.netlify.app/")
            cy.wait(3000)
            cy.contains("Test Project")
                .should("exist")

            // Delete Project
            cy.contains("Test Project")
                .should("exist")
                .parent("tr")
                .contains("View")
                .click()
                .wait(5000)

            cy.get('.page > :nth-child(1) > :nth-child(7)')
                .click()
            cy.wait(1000)

            cy.get('.btn-danger')
                .click()
                .wait(2000)
        })
    })
})