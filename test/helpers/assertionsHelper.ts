import { expect } from "@wdio/globals";
import { Strings } from "../constants/strings";
import { ElementActions } from "./elementActions";

export class AssertionsHelper {
    static async assertIfElementTextViewsContain(element: string, elementName: string, expectedText: string) {
        const isContaining = await ElementActions.isElementsTextViewsContains(element, expectedText);
        if (!isContaining) {
            throw new Error(`Expected ${elementName} to contain text "${expectedText}", but it did not.`);
        }
        expect(isContaining).toBe(true);
    }

    static async assertIfElementIsDisplayed(element: string, elementName: string) {

        expect(ElementActions.isElementDisplayed(element)).toBe(true, `${elementName} is not displayed`)
    }
}