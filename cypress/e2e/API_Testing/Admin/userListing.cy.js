describe('Get User Listing Test', ()=>{
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

    it('Get all User Listing', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                expect(response.body.data).to.have.length(10)
            })
        })
    })
    it('Filter user by page number and limit test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
                qs: {
                    page: '1',
                    limit: '5'
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                expect(response.body.data).to.have.length(5)
            })
        })
    })

    it('Filter user by First Name Test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
                qs: {
                    first_name: 'Darion',
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                expect(response.body.data[0].first_name).to.equal("Darion")
            })
        })
    })

    it('Filter users by Email', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
                qs: {
                    email: 'Mckenna9@yahoo.com',
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                expect(response.body.data[0].email).to.equal("Mckenna9@yahoo.com")
            })
        })
    })

    it('Filter user by Phone Number test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
                qs: {
                    phone: '+876 92 065 2235',
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                expect(response.body.data[0].phone_number).to.equal("+876 92 065 2235")
            })
        })
    })

    it('Filter user by Address test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
                qs: {
                    address: '8163 Heathcote Plain Suite 660 Timor-Leste',
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                expect(response.body.data[0].address).to.include("8163 Heathcote Plain Suite 660 Timor-Leste")
            })
        })
    })

    it('Filter user by Is Marketing test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
                qs: {
                    marketing: '1',
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                const JsonData = response.body.data;
                JsonData.forEach(item => {
                    expect(item.is_marketing).to.equal(1)
                });
                
            })
        })
    })
    it('Filter user by Is not Marketing test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
                qs: {
                    marketing: '0',
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                const JsonData = response.body.data;
                JsonData.forEach(item => {
                    expect(item.is_marketing).to.equal(0)
                });
            })
        })
    })

    it('Filter user by Created Date test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/Login.json").then((el) => {
            const token = el.adminAuthToken;
            cy.request({
                method: "GET",
                url: adminBaseUrl + "/api/v1/admin/user-listing",
                headers: {
                    Authorization: "Bearer " + token
                },
                qs: {
                    created_at: '2023-07-12',
                }
            })
            .then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.body.current_page).to.equal(1)
                const JsonData = response.body.data;
                JsonData.forEach(item =>{
                    expect(item.created_at).to.include("2023-07-12")
                })
            })
        })
    })
})
