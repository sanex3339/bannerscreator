import { Injector } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

export function LocalStorage (storageKey?: string) {
    return function decoratorFactory (target: Object, decoratedPropertyName?: string): void {
        /*let key: string = storageKey || decoratedPropertyName;

        let observer: Observable<any> = target[decoratedPropertyName];

        observer.subscribe((data: any) => {
            localStorage.setItem(key, JSON.stringify(data));
        })*/
    }
}