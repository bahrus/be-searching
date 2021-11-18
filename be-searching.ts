import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeSearchingVirtualProps, BeSearchingActions, BeSearchingProps} from './types';
import {hookUp} from 'be-observant/hookUp.js';
import {register} from 'be-hive/register.js';

export class BeSearchingController implements BeSearchingActions{
    onSearchParams({}: this){

    }

    onForValueFrom({}: this){
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
            virtualProps: ['beVigilant', 'caseSensitive', 'class', 'for', 'forValueFrom', 'regex', 'tag', 'wholeWord'],
            primaryProp: 'for',
        },
        actions:{
            onSearchParams:{
                ifAllOf: ['for'],
                ifKeyIn: ['class', 'tag', 'caseSensitive', 'regex', 'wholeWord'],
            }
        }
    }
});
