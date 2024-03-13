import { loginPage } from '../pages/login.page';
import { salesPage } from '../pages/sales.page';
import * as data from "../../fixtures/filtersData.json";

const filtersData = JSON.parse(JSON.stringify(data));
const loginData = {
    email: Cypress.env('USER_EMAIL'),
    password: Cypress.env('USER_PASSWORD')
};

describe("Check the functionality of the sales tab", () => {
    beforeEach(() => {
        loginPage.open();
        loginPage.login(loginData.email, loginData.password);
        salesPage.getSalesChart();
    });

    it("Check data changes when filters are changed", () => {
        let initialChartDataUuid = salesPage.getSalesChartDataUuid();

        for (const brandFilterOption of filtersData.brandFilterOptions) {
            salesPage.selectBrand(brandFilterOption);
            let updatedChartDataUuid = salesPage.getSalesChartDataUuid();

            expect(updatedChartDataUuid).not.to.equal(initialChartDataUuid);
            initialChartDataUuid = updatedChartDataUuid;
        }

        for (const yearFilterOption of filtersData.yearFilterOptions) {
            salesPage.selectYear(yearFilterOption);
            let updatedChartDataUuid = salesPage.getSalesChartDataUuid();

            expect(updatedChartDataUuid).not.to.equal(initialChartDataUuid);
            initialChartDataUuid = updatedChartDataUuid;
        }
    })

    it("Check if query parameters change correctly after filter selection", () => {
        for (const brandFilterOption of filtersData.brandFilterOptions) {
            salesPage.selectBrand(brandFilterOption);
            salesPage.getQueryParam('brand').should('eq', filtersData.brandQueryParams[brandFilterOption]);
        }

        for (const yearFilterOption of filtersData.yearFilterOptions) {
            salesPage.selectYear(yearFilterOption);
            salesPage.getQueryParam('year').should('eq', yearFilterOption);
        }
    })


    it("Check the responses from the backend after brand filter selection", () => {
        cy.intercept('POST', 'admin/insurance/monthly-sales-counts').as('monthlySalesCounts');

        for (const brandFilterOption of filtersData.brandFilterOptions) {
            salesPage.selectBrand(brandFilterOption);
            cy.wait('@monthlySalesCounts').then(interception => {
                const response = interception.response;

                expect(response?.statusCode).to.eq(200);
                expect(response?.body).to.have.property('monthlySalesCounts').that.is.an('object');
                expect(response?.body.monthlySalesCounts).to.have.keys('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
            });
        }
    });

    it("Check the responses from the backend after year filter selection", () => {
        cy.intercept('POST', 'admin/insurance/monthly-sales-counts').as('monthlySalesCounts');
        for (const yearFilterOption of filtersData.yearFilterOptions) {
            salesPage.selectYear(yearFilterOption);
            cy.wait('@monthlySalesCounts').then(interception => {
                const response = interception.response;

                expect(response?.statusCode).to.eq(200);
                expect(response?.body).to.have.property('monthlySalesCounts').that.is.an('object');
                expect(response?.body.monthlySalesCounts).to.have.keys('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
            });
        }
    });


    it("check if filters with query params are applied after page reload", () => {

    })
});
