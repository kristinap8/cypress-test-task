class Page {

    open(url?: string) {
        cy.visit(url == undefined ? '/' : url);
    }

    getElement(locator: string, timeout: number=60000) {
        return cy.get(locator, {timeout: timeout});
    }

    getElementAttribute(locator: string, attribute: string) {
        return this.getElement(locator).invoke('attr', attribute);
    }

    getQueryParam(paramName: string) {
        return cy.location('search').then((s) => new URLSearchParams(s)).invoke('get', paramName);
    }

    clickElement(selector: string) {
        this.getElement(selector).click();
    }

    type(locator: string, text: string) {
        this.getElement(locator).type(text);
    }

    hoverElement(locator: string) {
        this.getElement(locator).realHover({ position: 'center' });
        this.getElement(locator).realHover({ position: 'left'});
    }

    reload() {
        cy.reload();
    }
}

export default Page;