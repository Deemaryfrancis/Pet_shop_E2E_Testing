describe('Create an Admin Account Test', ()=>{
    var token
    beforeEach('Login with Valid Credential Test', ()=>{
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
        })
    })

    it('Create an admin account with Valid details Test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/CreateAdmin.json").then((el) => {
            cy.request({
                method: "POST",
                url: adminBaseUrl + "/api/v1/admin/create",
                form: true,
                headers: {
                    Authorization: "Bearer" + token
                },
                body: {
                    first_name: el.first_name,
                    last_name: el.last_name,
                    email : el.email,
                    password : el.password,
                    password_confirmation : el.password_confirmation,
                    avatar : el.avatar,
                    address : el.address,
                    phone_number : el.phone_number,
                    marketing : el.marketing
                }
            })
            .then((response)=>{
                // const token = response.body.data.token;
                // cy.log(response.body.data.token)
                // cy.saveAdminTokenToFixture(token);
                expect(response.status).to.equal(200)
                expect(response.body.success).to.equal(1)
            })
        })
        
    })

    it('Create an admin account with invalid email Test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/CreateAdmin.json").then((el) => {
            cy.request({
                failOnStatusCode: false,
                method: "POST",
                url: adminBaseUrl + "/api/v1/admin/create",
                form: true,
                headers: {
                    Authorization: "Bearer" + token
                },
                body: {
                    first_name: el.first_name,
                    last_name: el.last_name,
                    email : "",
                    password : el.password,
                    password_confirmation : el.password_confirmation,
                    avatar : el.avatar,
                    address : el.address,
                    phone_number : el.phone_number,
                    marketing : el.marketing
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(422)
                expect(response.body.error).to.equal("Failed Validation")
                expect(response.body.errors.email[0]).to.equal("The email field is required.")
            })
        })
        
    })

    it('Create an admin account with empty field email Test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/CreateAdmin.json").then((el) => {
            cy.request({
                failOnStatusCode: false,
                method: "POST",
                url: adminBaseUrl + "/api/v1/admin/create",
                form: true,
                headers: {
                    Authorization: "Bearer" + token
                },
                body: {
                    first_name: el.first_name,
                    last_name: el.last_name,
                    email : "email@",
                    password : el.password,
                    password_confirmation : el.password_confirmation,
                    avatar : el.avatar,
                    address : el.address,
                    phone_number : el.phone_number,
                    marketing : el.marketing
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(422)
                expect(response.body.error).to.equal("Failed Validation")
                expect(response.body.errors.email[0]).to.equal("The email must be a valid email address.")
            })
        })
        
    })
})