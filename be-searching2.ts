import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';

export class BeSearching extends BE<AP, Actions> implements Actions{
    static  override get beConfig(){
        return {
            parse: true,
            primaryProp: 'forText'
        } as BEConfig
    }

    onSearchParams(self: this): PAP {
        const {tag, forText, caseSensitive, attribs, enhancedElement} = self;
        const marks = enhancedElement.querySelectorAll(`${tag}[data-from-be-searching]`);
        marks.forEach(m => {
            let tc = m.textContent!;
            m.insertAdjacentText('afterend', tc);
            const parent = m.parentNode!;
            m.remove();
            parent.normalize();
        });
        if(!forText) return {resolved: true};
        const modifiedForText = caseSensitive ? forText : forText.toLowerCase();
        this.doSearch(enhancedElement, modifiedForText, !!caseSensitive, tag!, attribs!);
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
                    mark.setAttribute(`data-from-be-searching`, '');
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
}

export interface BeSearching extends AllProps{}

const tagName = 'be-searching';
const ifWantsToBe = 'searching';
const upgrade = '*';

const xe = new XE<AP, Actions>({
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

register(ifWantsToBe, upgrade, tagName);