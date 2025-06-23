import { expect } from "@wdio/globals";
import { Strings } from "../constants/strings";
import { ElementActions } from "./elementActions";

export class AssertionsHelper {
    static async assertIfElementTextViewsContain(element: WebdriverIO.Element, elementName: string, expectedText: string) {
        const isContaining = await ElementActions.isElementsTextViewsContains(element, expectedText);
        expect(await isContaining).toBe(true), `${elementName} ${Strings.assertions.shouldContainText} "${expectedText}"`;
    }
    static async assertIfElementIsDisplayed(element: WebdriverIO.Element, elementName: string) {
        expect(ElementActions.isElementDisplayed(element)).toBe(true, `${elementName} is not displayed`)
    }
}