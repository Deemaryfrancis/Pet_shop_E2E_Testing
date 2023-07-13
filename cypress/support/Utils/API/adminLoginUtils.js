const adminLogin = (email, password) => {
  const adminBaseUrl = Cypress.env('adminBaseUrl')
    return cy.request({
      method: "POST",
      url: adminBaseUrl + "/api/v1/admin/login",
      form: true,
      body: {
        email,
        password,
      }
    })
  };
  
  export default {
    adminLogin,
  };
  