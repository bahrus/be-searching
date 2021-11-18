import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeSearchingController {
    #ifWantsToBe;
    intro(proxy, target, beDecorProps) {
        this.#ifWantsToBe = beDecorProps.ifWantsToBe;
    }
    onSearchParams({ tag, proxy, forText }) {
        console.log(tag);
        //first remove all non-matching mark tags 
        const rn = proxy.getRootNode();
        const marks = rn.querySelectorAll(`${tag}[data-from-${this.#ifWantsToBe}]`);
        marks.forEach(m => {
            const tc = m.textContent;
            if (tc.indexOf(forText) === -1) {
                m.insertAdjacentText('afterend', tc);
                m.remove();
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
                    mark.textContent = contents.textContent;
                    range.insertNode(mark);
                }
            }
        });
    }
    onForValueFrom({}) {
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
            virtualProps: ['beVigilant', 'caseSensitive', 'class', 'forText', 'forValueFrom', 'regex', 'tag', 'wholeWord'],
            primaryProp: 'forText',
            intro: 'intro',
            proxyPropDefaults: {
                tag: 'mark',
                class: 'highlight'
            }
        },
        actions: {
            onSearchParams: {
                ifAllOf: ['forText'],
                ifKeyIn: ['class', 'tag', 'caseSensitive', 'regex', 'wholeWord'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeSearchingController,
    }
});
register(ifWantsToBe, upgrade, tagName);
