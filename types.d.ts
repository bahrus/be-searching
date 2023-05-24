import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';


export interface EndUserProps{
    forText?: string,
    // forValueFrom?: IObserve,
    attribs?: {[key: string]: string},
    tag?: string,
    caseSensitive?: boolean,
    regex?: boolean,
    wholeWord?: boolean,
    beVigilant?: boolean,
}

export type keys = `${keyof EndUserProps}`;

// export interface keyLookup  {
//     [key: keys]: string,
// }

type keyLookup = {
    [Property in keys]?: string;
};

export interface AllProps extends EndUserProps, IBE{}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];


export interface Actions{
    onSearchParams(self: this): PAP;
    //onForValueFrom(self: this): void;
    //intro(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
}

