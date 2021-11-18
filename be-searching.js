import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeSearchingController {
    onSearchParams({ tag }) {
        console.log(tag);
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
            virtualProps: ['beVigilant', 'caseSensitive', 'class', 'for', 'forValueFrom', 'regex', 'tag', 'wholeWord'],
            primaryProp: 'for',
            proxyPropDefaults: {
                tag: 'mark',
                class: 'highlight'
            }
        },
        actions: {
            onSearchParams: {
                ifAllOf: ['for'],
                ifKeyIn: ['class', 'tag', 'caseSensitive', 'regex', 'wholeWord'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeSearchingController,
    }
});
register(ifWantsToBe, upgrade, tagName);
