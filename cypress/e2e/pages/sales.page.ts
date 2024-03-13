import Page from './page';

const brandsDropdown: string = 'div[class*="Sales_brandSelect"]';
const brandDropdownOption = (brandName: string) => `div[class*="select-item-option"][title="${brandName}"]`;
const yearsDropdown: string = 'div[class="ant-tabs-extra-content"] div[class*="ant-select ant-select-outlined"]:nth-of-type(2)';
const yearDropdownOption = (year: string) => `div[class*="select-item-option"][title="${year}"]`;
const salesСhart: string = 'div[class="g2-tooltip"]';
const salesChartCanvas: string = 'canvas';

class SalesPage extends Page {

    getSalesChart() {
        return super.getElement(salesChartCanvas);
    }

    getSalesChartDataUuid() {
        super.hoverElement(salesChartCanvas);
        return super.getElementAttribute(salesСhart, 'data-uuid');
    }

    selectBrand(brandName: string) {
        super.clickElement(brandsDropdown);
        super.clickElement(brandDropdownOption(brandName));
    }

    selectYear(year: string) {
        super.clickElement(yearsDropdown);
        super.clickElement(yearDropdownOption(year));
    }
}

export const salesPage = new SalesPage();