import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {IObserve} from 'be-observant/types';

export interface EndUserProps{
    forText?: string,
    forValueFrom?: IObserve,
    attribs?: {[key: string]: string},
    tag?: string,
    caseSensitive?: boolean,
    regex?: boolean,
    wholeWord?: boolean,
    beVigilant?: boolean,
}
export interface VirtualProps extends EndUserProps, MinimalProxy{

}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface Actions{
    onSearchParams(pp: PP): void;
    onForValueFrom(pp: PP): void;
    intro(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
}

