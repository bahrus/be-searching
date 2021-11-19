import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeSearchingVirtualProps, BeSearchingActions, BeSearchingProps} from './types';
import {hookUp} from 'be-observant/hookUp.js';
import {register} from 'be-hive/register.js';

export class BeSearchingController implements BeSearchingActions{
    #ifWantsToBe!: string;

    intro(proxy: HTMLTemplateElement & BeSearchingVirtualProps, target: HTMLTemplateElement, beDecorProps: BeDecoratedProps){
        this.#ifWantsToBe = beDecorProps.ifWantsToBe;
    }

    onSearchParams({tag, proxy, forText, caseSensitive, attribs}: this){
        
        //first remove all non-matching mark tags 
        const rn = proxy.getRootNode() as DocumentFragment;
        const marks = rn.querySelectorAll(`${tag}[data-from-${this.#ifWantsToBe}]`);
        const forTextModified = caseSensitive ? forText : forText.toLowerCase();
        marks.forEach(m => {
            let tc = m.textContent!;
            if(!caseSensitive){
                tc = tc.toLowerCase();
            }
            if(tc.indexOf(forTextModified) === -1){
                m.insertAdjacentText('afterend', tc);
                m.remove();
            }
        });
        proxy.childNodes.forEach(child => {
            if(child.nodeType === Node.TEXT_NODE){
                const tc = child.textContent!;
                const iPos = tc.indexOf(forText);
                if(iPos !== -1){
                    const range = document.createRange();
                    range.setStart(child, iPos);
                    range.setEnd(child, iPos + forText.length);
                    
                    const contents = range.extractContents();
                    const mark = document.createElement(tag);
                    if(attribs !== undefined){
                        for(const key in attribs){
                            mark.setAttribute(key, attribs[key]);
                        }
                    }
                    mark.textContent = contents.textContent!;
                    range.insertNode(mark);
                }
            }
        });
    }

    onForValueFrom({forValueFrom, proxy}: this){
        hookUp(forValueFrom, proxy, 'forText');
    }
}

export interface BeSearchingController extends BeSearchingProps{}

const tagName = 'be-searching';

const ifWantsToBe = 'searching';

const upgrade = '*';

define<BeSearchingProps & BeDecoratedProps<BeSearchingProps, BeSearchingActions>, BeSearchingActions>({
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
        controller: BeSearchingController,
    }
});
register(ifWantsToBe, upgrade, tagName);
