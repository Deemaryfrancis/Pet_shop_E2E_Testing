describe("Shipment location page Test", ()=>{
    const adminBaseUrl = Cypress.env('baseUrl')
    beforeEach("Visit Url", ()=>{
        cy.visit(adminBaseUrl)
        cy.fixture("Admin/adminLogin.json").then((el)=>{
            cy.get(el.Element.Email).type(el.TestData.AdminEmailValue)
            cy.get(el.Element.Password).type(el.TestData.PasswordValue)
            cy.get(el.Element.LoginBtn).click()

            // Validate that user successfully login
            cy.url()
            .should("include", "dashboard")
            cy.wait(3000)
            // Click on the Shipment location menu
            cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > nav:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)")
            .click()
            
        }) 
    })
    it("View Sales Table", ()=>{
        
        //1. Validate that the number of rows is 1
        cy.get("[class='v-table__wrapper']>table>tbody>tr:first-child")
        .should("have.length", 1)
        //2. Validate that the number of columns is 5
        cy.get("[class='v-table__wrapper']>table>thead>tr>th")
        .should("have.length", 5)
        cy.wait(5000) 
        // 3. Validate each cell headings
        cy.get("[class='v-table__wrapper']>table>thead>tr>th:nth-child(1)")
        .should("have.text", "Order UUID")
        cy.get("[class='v-table__wrapper']>table>thead>tr>th:nth-child(2)")
        .should("have.text", "Customer")
        cy.get("[class='v-table__wrapper']>table>thead>tr>th:nth-child(3)")
        .should("have.text", "Amount")
        cy.get("[class='v-table__wrapper']>table>thead>tr>th:nth-child(4)")
        .should("have.text", "Shipped at")
        cy.get("[class='v-table__wrapper']>table>thead>tr>th:nth-child(5)")
        .should("have.text", "Download")
        cy.wait(5000) 

        //4. Read Data from the table
        cy.get("[class='v-table__wrapper']>table>thead>tr:first-child()")
        .each(($row, index, $rows)=>{
            cy.wrap($row).within(()=>{
                cy.get("td").each(($col, index, $cols)=>{
                cy.log($col.text())
            })
        })
    })
    })
})