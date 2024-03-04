import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
export class BeSearching extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'forText'
        };
    }
    onSearchParams(self) {
        const { tag, forText, caseSensitive, attribs, enhancedElement } = self;
        const marks = enhancedElement.querySelectorAll(`${tag}[data-from-be-searching]`);
        marks.forEach(m => {
            let tc = m.textContent;
            m.insertAdjacentText('afterend', tc);
            const parent = m.parentNode;
            m.remove();
            parent.normalize();
        });
        if (!forText)
            return { resolved: true };
        const modifiedForText = caseSensitive ? forText : forText.toLowerCase();
        this.doSearch(enhancedElement, modifiedForText, !!caseSensitive, tag, attribs);
        return {
            resolved: true
        };
    }
    doSearch(el, forText, caseSensitive, tag, attribs) {
        el.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const tc = caseSensitive ? child.textContent : child.textContent.toLowerCase();
                const iPos = tc.indexOf(forText);
                if (iPos !== -1) {
                    const range = document.createRange();
                    range.setStart(child, iPos);
                    range.setEnd(child, iPos + forText.length);
                    const contents = range.extractContents();
                    const mark = document.createElement(tag);
                    mark.setAttribute(`data-from-be-searching`, '');
                    if (attribs !== undefined) {
                        for (const key in attribs) {
                            mark.setAttribute(key, attribs[key]);
                        }
                    }
                    mark.textContent = contents.textContent;
                    range.insertNode(mark);
                }
            }
            else if (child.nodeType === Node.ELEMENT_NODE) {
                this.doSearch(child, forText, caseSensitive, tag, attribs);
            }
        });
    }
}
export const tagName = 'be-searching';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
            tag: 'mark',
            beVigilant: false,
            caseSensitive: false,
            attribs: {},
            forText: '',
            wholeWord: false,
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            onSearchParams: {
                ifKeyIn: [
                    'forText', 'attribs', 'tag', 'caseSensitive',
                    'regex', 'wholeWord'
                ]
            }
        }
    },
    superclass: BeSearching
});
