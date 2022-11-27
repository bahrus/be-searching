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
        
        //first remove all non-matching mark tags 
        //const rn = proxy.getRootNode() as DocumentFragment;
        const marks = self.querySelectorAll(`${tag}[data-from-${this.#ifWantsToBe}]`);
        const forTextModified = caseSensitive ? forText! : forText!.toLowerCase();
        marks.forEach(m => {
            let tc = m.textContent!;
            // if(!caseSensitive){
            //     tc = tc.toLowerCase();
            // }
            //if(tc.indexOf(forTextModified) === -1){
                m.insertAdjacentText('afterend', tc);
                const parent = m.parentNode!;
                m.remove();
                parent.normalize();
            //}
        });
        this.doSearch(self, forText!, tag!, attribs!);
    }

    doSearch(el: Element, forText: string, tag: string, attribs: {[key: string]: string}){
        el.childNodes.forEach(child => {
            if(child.nodeType === Node.TEXT_NODE){
                const tc = child.textContent!;
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
                this.doSearch(child as Element, forText, tag, attribs);
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
                ifAllOf: ['forText'],
                ifKeyIn: ['attribs', 'tag', 'caseSensitive', 'regex', 'wholeWord'],
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
