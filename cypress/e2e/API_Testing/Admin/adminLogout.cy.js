describe('Logout from an Admin Account Test', ()=>{
    const token = 0
    it('Logout with Valid Auth_token Test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/logout",
                headers: {
                    Authorization: "Bearer" + token
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.success).to.equal(1)
            })
        })
    })
})