import adminLoginUtils from '../../../support/Utils/API/adminLoginUtils.js'

describe('Create an Admin Account Test', ()=>{
    const token = 0
    it('Create an admin account with Valid details Test', ()=>{
        const adminBaseUrl = Cypress.env('adminBaseUrl')
        cy.fixture("Admin/CreateAdmin.json").then((el) => {
            const uuid = "fea5ecd1-358c-44e2-9ec6-84ab03842487"
            const email = 'admin@buckhill.co.uk';
            const password = 'admin';

            adminLoginUtils.adminLogin(email, password).then((response) => {
            const token = response.body.data.token;
            cy.log(response.body.data.token)

                cy.request({
                    method: "DELETE",
                    url: adminBaseUrl + "/api/v1/admin/user-delete/"+'${uuid}',
                    form: true,
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then((response)=>{
                    expect(response.status).to.equal(200)
                    expect(response.body.success).to.equal(1)
                })
            })
            
        })
        
    })
})
