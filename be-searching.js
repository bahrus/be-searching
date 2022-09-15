import { define } from 'be-decorated/be-decorated.js';
import { hookUp } from 'be-observant/hookUp.js';
import { register } from 'be-hive/register.js';
export class BeSearching {
    #ifWantsToBe;
    intro(proxy, target, beDecorProps) {
        this.#ifWantsToBe = beDecorProps.ifWantsToBe;
    }
    onSearchParams({ tag, proxy, forText, caseSensitive, attribs }) {
        //first remove all non-matching mark tags 
        const rn = proxy.getRootNode();
        const marks = rn.querySelectorAll(`${tag}[data-from-${this.#ifWantsToBe}]`);
        const forTextModified = caseSensitive ? forText : forText.toLowerCase();
        marks.forEach(m => {
            let tc = m.textContent;
            if (!caseSensitive) {
                tc = tc.toLowerCase();
            }
            if (tc.indexOf(forTextModified) === -1) {
                m.insertAdjacentText('afterend', tc);
                const parent = m.parentNode;
                m.remove();
                parent.normalize();
            }
        });
        proxy.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const tc = child.textContent;
                const iPos = tc.indexOf(forText);
                if (iPos !== -1) {
                    const range = document.createRange();
                    range.setStart(child, iPos);
                    range.setEnd(child, iPos + forText.length);
                    const contents = range.extractContents();
                    const mark = document.createElement(tag);
                    mark.setAttribute(`data-from-${this.#ifWantsToBe}`, '');
                    if (attribs !== undefined) {
                        for (const key in attribs) {
                            mark.setAttribute(key, attribs[key]);
                        }
                    }
                    mark.textContent = contents.textContent;
                    range.insertNode(mark);
                }
            }
        });
    }
    onForValueFrom({ forValueFrom, proxy }) {
        hookUp(forValueFrom, proxy, 'forText');
    }
}
const tagName = 'be-searching';
const ifWantsToBe = 'searching';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            virtualProps: ['beVigilant', 'caseSensitive', 'attribs', 'forText', 'forValueFrom', 'regex', 'tag', 'wholeWord'],
            primaryProp: 'forText',
            intro: 'intro',
            proxyPropDefaults: {
                tag: 'mark',
            }
        },
        actions: {
            onSearchParams: {
                ifAllOf: ['forText'],
                ifKeyIn: ['attribs', 'tag', 'caseSensitive', 'regex', 'wholeWord'],
            },
            onForValueFrom: {
                ifAllOf: ['forValueFrom'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeSearching,
    }
});
register(ifWantsToBe, upgrade, tagName);
