import { loginPage } from '../pages/login.page';
import { salesPage } from '../pages/sales.page';

const charts = ['Number of Sales', 'Total Premium'];
const filters = { brands: ['Stone Island', 'Pi'], years: ['2023', '2024'] };
const brandQueryParams = {
    "Stone Island": "064936f5-1241-4008-b47a-62fc687d818c",
    "Pi": "01ec8698-b0ae-4cb1-aced-15497c5e6a27"
}
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

    for (const chart of charts) {
        it(`Check data changes when filters are changed in the ${chart} chart`, () => {
            if (chart === 'Total Premium') salesPage.clickTotalPremiumTabBtn();

            let initialChartDataUuid = salesPage.getActiveChartDataUuid();

            for (const brand of filters.brands) {
                salesPage.selectBrand(brand);
                for (const year of filters.years) {
                    salesPage.selectYear(year);
                    let updatedChartDataUuid = salesPage.getActiveChartDataUuid();

                    expect(updatedChartDataUuid).not.to.equal(initialChartDataUuid);
                    initialChartDataUuid = updatedChartDataUuid;
                }
            }
        });

        it(`Check if query parameters change correctly after filter selection in the ${chart} chart`, () => {
            let selectedTab = 'sales';
            if (chart === 'Total Premium') {
                salesPage.clickTotalPremiumTabBtn();
                selectedTab = 'premium';
            } 

            for (const brandFilterOption in brandQueryParams) {
                salesPage.selectBrand(brandFilterOption);
                const option = brandFilterOption as keyof typeof brandQueryParams;
                salesPage.getQueryParam('brand').should('eq', brandQueryParams[option]);
            }

            for (const yearFilterOption of filters.years) {
                salesPage.selectYear(yearFilterOption);
                salesPage.getQueryParam('year').should('eq', yearFilterOption);
            }

            salesPage.getQueryParam('tab').should('eq', selectedTab);
        })

        it(`Check the responses from the backend after filter selection in the ${chart} chart`, () => {
            let url: string = 'admin/insurance/monthly-sales-counts';
            let objectProperty: string = 'monthlySalesCounts';
            if (chart === 'Total Premium') {
                url = 'admin/insurance/monthly-total-premiums';
                objectProperty = 'monthlyTotalPremiums';
            }

            cy.intercept('POST', url).as('monthlyCounts');
            if (chart === 'Total Premium') salesPage.clickTotalPremiumTabBtn();

            for (const brand of filters.brands) {
                salesPage.selectBrand(brand);
                for (const year of filters.years) {
                    salesPage.selectYear(year);
                    cy.wait('@monthlyCounts').then((interception) => {
                        const response = interception.response;

                        expect(response?.statusCode).to.eq(200);
                        expect(response?.body).to.have.property(objectProperty).that.is.an('object');
                        expect(response?.body[objectProperty]).to.have.keys('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
                    });
                }
            }
        });

        it(`Сheck if filters with query params are applied after page reload in the ${chart} chart`, () => {
            if (chart === 'Total Premium') salesPage.clickTotalPremiumTabBtn();
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
    }
});