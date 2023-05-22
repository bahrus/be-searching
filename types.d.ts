import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    forText?: string,
    // forValueFrom?: IObserve,
    attribs?: {[key: string]: string},
    tag?: string,
    caseSensitive?: boolean,
    regex?: boolean,
    wholeWord?: boolean,
    beVigilant?: boolean,
}
export interface AllProps extends EndUserProps{}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];


export interface Actions{
    onSearchParams(self: this): PAP;
    //onForValueFrom(self: this): void;
    //intro(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
}

