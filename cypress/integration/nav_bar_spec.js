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
        cy.get("a").eq(3)
                .click()
    })

    describe('loads the navigation bar', () => {
        it('has the title and 3 links loaded', () => {
            cy.get("a")
                .should("have.length.of.at.least", 4)
        });
    })

    describe('upon clicking the projects link', () => {
        it('navigates to the projects page.', () => {
            cy.get("a").eq(2)
                .click()
            cy.wait(5000)
            
            cy.url().should("include", "/projects")
        });
    })
})
