describe(" Developer Login", ()=>{
    const adminBaseUrl = Cypress.env('baseUrl')
    beforeEach("Visit Url", ()=>{
        cy.visit(adminBaseUrl)
        })

    it.only("Login with valid credentials", ()=>{
        cy.fixture("Admin/adminLogin.json").then((el)=>{
            cy.get(el.Element.Email).type(el.TestData.AdminEmailValue)
            cy.get(el.Element.Password).type(el.TestData.PasswordValue)
            cy.get(el.Element.LoginBtn).click()

            // Validate that user successfully login
            cy.url()
            .should("include", "dashboard")
            cy.wait(3000)
            
        })    
    })

    it("Login with invalid email", ()=>{
        cy.fixture("Admin/adminLogin.json").then((el)=>{
            cy.get(el.Element.Email).type("minnie@")
            cy.get(el.Element.Password).type(el.TestData.PasswordValue)
            cy.get(el.Element.LoginBtn).click()

            //Validate invalid email
            cy.get('.text-red.text-center.login__error-message').should("have.text", "Please enter a valid email address")
        })

    })

    it("Login with valid email and wrong password", ()=>{
        cy.fixture("Admin/adminLogin.json").then((el)=>{
            cy.get(el.Element.Email).type(el.TestData.AdminEmailValue)
            cy.get(el.Element.Password).type("123fret")
            cy.get(el.Element.LoginBtn).click()

            //Validation
            cy.get(".text-red.text-center.login__error-message").contains("Invalid credentials")
        
        })
    })

    it("Login with Wrong email and Correct password", ()=>{
        cy.fixture("Admin/adminLogin.json").then((el)=>{
            cy.get(el.Element.Email).type("minnie@vomoto.com")
            cy.get(el.Element.Password).type(el.TestData.PasswordValue)
            cy.get(el.Element.LoginBtn).click()

            //Validation
            cy.get(".text-red.text-center.login__error-message").contains("Invalid credentials")
        })
    })

    it("Login with non-existing email ", ()=>{
        cy.fixture("Admin/adminLogin.json").then((el)=>{
            cy.get(el.Element.Email).type(el.TestData.NonExistingEmail)
            cy.get(el.Element.Password).type(el.TestData.PasswordValue)
            cy.get(el.Element.LoginBtn).click()

            //Validate
            cy.get(".text-red.text-center.login__error-message").contains("Invalid credentials")
        })
    })

    it("Login with empty fields(email)", ()=>{
        cy.fixture("Admin/adminLogin.json").then((el)=>{
            cy.get(el.Element.Email)
            cy.get(el.Element.Password).type(el.TestData.PasswordValue)
            cy.get(el.Element.LoginBtn).click()

            //Validate invalid email
            cy.get('.text-red.text-center.login__error-message').should("have.text", "Email field is Required")
        })
    })

    it("Login with empty fields(Password)", ()=>{
        cy.fixture("Admin/adminLogin.json").then((el)=>{
            cy.get(el.Element.Email).type(el.TestData.AdminEmailValue)
            cy.get(el.Element.Password)
            cy.get(el.Element.LoginBtn).click()

            //Validate invalid email
            cy.get('.text-red.text-center.login__error-message').should("have.text", "Password field is required")
        })
    })
})


