import { by, element, ElementFinder, browser, ExpectedConditions } from 'protractor';

export abstract class BasePage {

    // timeout
    private maxTime: number = 1000;

    // StringFormat built-in function
    private StringFormat = (str: string, ...args: string[]) =>
        str.replace(/{(\d+)}/g, (match, index) => args[index] || '');

    // gets element by Css
    getElementByCss(locator: string): ElementFinder {
        browser.wait(ExpectedConditions.presenceOf(element(by.css(locator))), this.maxTime);
        return element(by.css(locator));
    }

    // gets element by Xpath
    getElementByXpath(locator: string): ElementFinder {
        browser.wait(ExpectedConditions.presenceOf(element(by.xpath(locator))), this.maxTime);
        return element(by.xpath(locator));
    }

    // gets element by custom Xpath
    getElementByCustomXpath(locator: string, partialText: string) {
        const updateLocator = this.StringFormat(locator, partialText);
        browser.wait(ExpectedConditions.presenceOf(element(by.xpath(updateLocator))), this.maxTime);
        return element(by.xpath(updateLocator));
    }

    // gets element text
    getElementText(locator: string) {
        browser.wait(ExpectedConditions.presenceOf(element(by.css(locator))), this.maxTime);
        element(by.css(locator)).getText().then(function (text) {
            return text;
        });
    }

    // inputs text to element
    inputTextElement(locator: string, text: string) {
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.css(locator))), this.maxTime);
        element(by.css(locator)).sendKeys(text);
    }

    // clears element text
    clearTextElement(locator: string) {
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.css(locator))), this.maxTime);
        element(by.css(locator)).clear();
    }

    isElementExistedByCss(locator: string) {
        return expect(element(by.css(locator)).isPresent()).toBe(false);
    }

    isElementExistedByXpath(locator: string) {
        return expect(element(by.xpath(locator)).isPresent()).toBe(false);
    }

    // clicks on element by Css
    clickOnElementByCss(locator: string) {
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.css(locator))), this.maxTime);
        element(by.css(locator)).click();
    }

    // clicks on element by Xpath
    clickOnElementByXpath(locator: string) {
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.xpath(locator))), this.maxTime);
        element(by.xpath(locator)).click();
    }

    // clicks on element by custom Xpath
    clickOnElementByCustomXpath(locator: string, partialText: string) {
        const updateLocator = this.StringFormat(locator, partialText);
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.xpath(updateLocator))), this.maxTime);
        element(by.xpath(updateLocator)).click();
    }

    isElementExistedByCustomeXpath(locator: string, partialText: string) {
        const updateLocator = this.StringFormat(locator, partialText);
        return expect(element(by.xpath(locator)).isPresent()).toBe(false);
    }
}