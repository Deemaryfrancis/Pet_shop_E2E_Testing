describe('Login to an Admin Account Test', ()=>{
    it('Login with Valid Credential Test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.request({
            method: "POST",
            url: adminBaseUrl + "/api/v1/admin/login",
            form: true,
            body: {
                email: "admin@buckhill.co.uk",
                password: "admin"
            }
        })
        .then((response)=>{
            const token = response.body.data.token;
            cy.log(response.body.data.token)
            cy.saveAdminTokenToFixture(token);
            expect(response.status).to.equal(200)
            expect(response.body.success).to.equal(1)
        })
    })

    it('Login with incorrect Credential Test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: adminBaseUrl + "/api/v1/admin/login",
            form: true,
            body: {
                email: "admin@buckhill.co.uk",
                password: "admin2"
            }
        })
        .then((response)=>{
            expect(response.status).to.equal(422)
            expect(response.statusText).to.include("Unprocessable")
            expect(response.body.success).to.equal(0)
            expect(response.body.error).to.equal("Failed to authenticate user")
        })
    })

    it('Login with invalid email', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: adminBaseUrl + "/api/v1/admin/login",
            form: true,
            body: {
                email: "admin@buckhill.",
                password: "admin2"
            }
        })
        .then((response)=>{
            expect(response.status).to.equal(422)
            expect(response.statusText).to.include("Unprocessable")
            expect(response.body.success).to.equal(0)
            expect(response.body.error).to.equal("Failed to authenticate user")
        })
    })
})