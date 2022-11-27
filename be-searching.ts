import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {VirtualProps, Actions, Proxy, PP} from './types';
import {hookUp} from 'be-observant/hookUp.js';
import {register} from 'be-hive/register.js';

export class BeSearching implements Actions{
    #ifWantsToBe!: string;

    intro(proxy: Proxy, target: HTMLTemplateElement, beDecorProps: BeDecoratedProps){
        this.#ifWantsToBe = beDecorProps.ifWantsToBe;
    }

    onSearchParams({tag, proxy, forText, caseSensitive, attribs, self}: PP){
        
        const marks = self.querySelectorAll(`${tag}[data-from-${this.#ifWantsToBe}]`);
        marks.forEach(m => {
            let tc = m.textContent!;
            m.insertAdjacentText('afterend', tc);
            const parent = m.parentNode!;
            m.remove();
            parent.normalize();
        });
        if(!forText) return;
        const modifiedForText = caseSensitive ? forText : forText.toLowerCase();
        this.doSearch(self, modifiedForText, !!caseSensitive, tag!, attribs!);
    }

    doSearch(el: Element, forText: string, caseSensitive: boolean, tag: string, attribs: {[key: string]: string}){
        el.childNodes.forEach(child => {
            if(child.nodeType === Node.TEXT_NODE){
                const tc = caseSensitive ? child.textContent! : child.textContent!.toLowerCase();
                const iPos = tc.indexOf(forText);
                if(iPos !== -1){
                    const range = document.createRange();
                    range.setStart(child, iPos);
                    range.setEnd(child, iPos + forText!.length);
                    
                    const contents = range.extractContents();
                    const mark = document.createElement(tag);
                    mark.setAttribute(`data-from-${this.#ifWantsToBe}`, '');
                    if(attribs !== undefined){
                        for(const key in attribs){
                            mark.setAttribute(key, attribs[key]);
                        }
                    }
                    mark.textContent = contents.textContent!;
                    range.insertNode(mark);
                }
            }else if(child.nodeType === Node.ELEMENT_NODE){
                this.doSearch(child as Element, forText, caseSensitive, tag, attribs);
            }
        });
    }

    onForValueFrom({forValueFrom, proxy}: PP){
        hookUp(forValueFrom!, proxy, 'forText');
    }
}


const tagName = 'be-searching';

const ifWantsToBe = 'searching';

const upgrade = '*';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps: ['beVigilant', 'caseSensitive', 'attribs', 'forText', 'forValueFrom', 'regex', 'tag', 'wholeWord'],
            primaryProp: 'forText',
            intro: 'intro',
            proxyPropDefaults:{
                tag: 'mark',
            }
        },
        actions:{
            onSearchParams:{
                //ifAllOf: ['forText'],
                ifKeyIn: ['forText', 'attribs', 'tag', 'caseSensitive', 'regex', 'wholeWord'],
            },
            onForValueFrom:{
                ifAllOf: ['forValueFrom'],
            }
        }
    },
    complexPropDefaults:{
        controller: BeSearching,
    }
});
register(ifWantsToBe, upgrade, tagName);
