import { loginPage } from '../pages/login.page';
import { salesPage } from '../pages/sales.page';
import * as data from "../../fixtures/salesData.json";

const salesData = JSON.parse(JSON.stringify(data));
const loginData = {
    email: Cypress.env('USER_EMAIL'),
    password: Cypress.env('USER_PASSWORD')
};

describe("Check the functionality of the sales tab", () => {
    beforeEach(() => {
        loginPage.open();
        loginPage.login(loginData.email, loginData.password);
        salesPage.getActiveChart();
    });

    for (const tab of salesData.tabs) {

        it(`Check data changes when filters are changed at the ${tab} tab`, () => {
            salesPage.clickTab(tab);
            let initialChartDataUuid = salesPage.getActiveChartDataUuid();

            for (const brand of salesData.brandFilterOptions) {
                salesPage.selectBrand(brand);
                for (const year of salesData.yearFilterOptions) {
                    salesPage.selectYear(year);
                    let updatedChartDataUuid = salesPage.getActiveChartDataUuid();

                    expect(updatedChartDataUuid).not.to.equal(initialChartDataUuid);
                    initialChartDataUuid = updatedChartDataUuid;
                }
            }
        })

        it(`Check if query parameters change correctly after filter selection ${tab} tab`, () => {
            salesPage.clickTab(tab);
            for (const brandFilterOption of salesData.brandFilterOptions) {
                salesPage.selectBrand(brandFilterOption);
                salesPage.getQueryParam('brand').should('eq', salesData.brandQueryParams[brandFilterOption]);
            }

            for (const yearFilterOption of salesData.yearFilterOptions) {
                salesPage.selectYear(yearFilterOption);
                salesPage.getQueryParam('year').should('eq', yearFilterOption);
            }
        })


        it(`Check the responses from the backend after brand filter selection ${tab} tab`, () => {
            salesPage.clickTab(tab);
            cy.intercept('POST', 'admin/insurance/monthly-sales-counts').as('monthlySalesCounts');

            for (const brandFilterOption of salesData.brandFilterOptions) {
                salesPage.selectBrand(brandFilterOption);
                cy.wait('@monthlySalesCounts').then(interception => {
                    const response = interception.response;

                    expect(response?.statusCode).to.eq(200);
                    expect(response?.body).to.have.property('monthlySalesCounts').that.is.an('object');
                    expect(response?.body.monthlySalesCounts).to.have.keys('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
                });
            }
        });

        it(`Check the responses from the backend after year filter selection ${tab} tab`, () => {
            salesPage.clickTab(tab);
            cy.intercept('POST', 'admin/insurance/monthly-sales-counts').as('monthlySalesCounts');
            for (const yearFilterOption of salesData.yearFilterOptions) {
                salesPage.selectYear(yearFilterOption);
                cy.wait('@monthlySalesCounts').then(interception => {
                    const response = interception.response;

                    expect(response?.statusCode).to.eq(200);
                    expect(response?.body).to.have.property('monthlySalesCounts').that.is.an('object');
                    expect(response?.body.monthlySalesCounts).to.have.keys('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
                });
            }
        });
    }


    it("check if filters with query params are applied after page reload", () => {
        cy.wait(1000);

        const brandQueryParamBeforeReload = salesPage.getQueryParam('brand');
        const yearQueryParamBeforeReload = salesPage.getQueryParam('year');
        const brandSelectedOptionBeforeReload = salesPage.getBrandSelectedOption();
        const yearSelectedOptionBeforeReload = salesPage.getYearSelectedOption();

        salesPage.reloadSalesPage();

        salesPage.getQueryParam('brand').then((brandParam) => {
            brandQueryParamBeforeReload.should('eq', brandParam);
        });
        salesPage.getQueryParam('year').then((yearParam) => {
            yearQueryParamBeforeReload.should('eq', yearParam);
        });
        salesPage.getBrandSelectedOption().then((brandParam) => {
            brandSelectedOptionBeforeReload.should('eq', brandParam);
        });
        salesPage.getYearSelectedOption().then((yearParam) => {
            yearSelectedOptionBeforeReload.should('eq', yearParam);
        });
    })
});
