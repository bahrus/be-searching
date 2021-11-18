import {BeDecoratedProps} from 'be-decorated/types';
import {IObserve} from 'be-observant/types';

export interface BeSearchingVirtualProps{
    for: string,
    forValueFrom: IObserve,
    class: string,
    tag: string,
    caseSensitive: boolean,
    regex: boolean,
    wholeWord: boolean,
    beVigilant: boolean,
}

export interface BeSearchingProps extends BeSearchingVirtualProps{
    proxy: HTMLElement & BeSearchingVirtualProps;
}

export interface BeSearchingActions{
    onSearchParams(self: this): void;
    onForValueFrom(self: this): void;
}

