import Page from './page';

const activeChartColumn: string = '.ant-tabs-tabpane-active div[class="g2-tooltip"]';
const activeChartCanvas: string = '.ant-tabs-tabpane-active canvas';
const totalPremiumTab: string = 'div[data-node-key="premium"] div';
const brandsDropdown: string = 'div[class*="Sales_brandSelect"]';
const brandDropdownOption = (brandName: string) => `div[class*="select-item-option"][title="${brandName}"]`;
const brandSelectedOption: string = 'div[class*="Sales_brandSelect"] span[class="ant-select-selection-item"]';
const yearsDropdown: string = 'div[class="ant-tabs-extra-content"] div[class*="ant-select ant-select-outlined"]:nth-of-type(2)';
const yearDropdownOption = (year: string) => `div[class*="select-item-option"][title="${year}"]`;
const yearSelectedOption: string = 'div[class="ant-tabs-extra-content"] div[class*="ant-select ant-select-outlined"]:nth-of-type(2) span[class="ant-select-selection-item"]';

class SalesPage extends Page {

    getActiveChart() {
        return super.getElement(activeChartCanvas);
    }

    getActiveChartDataUuid() {
        cy.wait(1_000);
        super.hoverElement(activeChartCanvas);
        return super.getElementAttribute(activeChartColumn, 'data-uuid');
    }

    getBrandSelectedOption() {
        return super.getElementAttribute(brandSelectedOption, 'title');
    }

    getYearSelectedOption() {
        return super.getElementAttribute(yearSelectedOption, 'title');
    }

    selectBrand(brandName: string) {
        super.clickElement(brandsDropdown);
        super.clickElement(brandDropdownOption(brandName));
    }

    selectYear(year: string) {
        super.clickElement(yearsDropdown);
        super.clickElement(yearDropdownOption(year));
    }

    reloadSalesPage() {
        super.reload();
        this.getActiveChart();
    }

    clickTotalPremiumTabBtn() {
        super.clickElement(totalPremiumTab);
        cy.wait(250);
    }
}

export const salesPage = new SalesPage();