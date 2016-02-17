import { Injector } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

export function LocalStorage (storageKey?: string) {
    return function decoratorFactory (target: Object, decoratedPropertyName?: string): void {
        let key: string = storageKey || decoratedPropertyName,
            mappedKey: string = `_${decoratedPropertyName}_ls`,
            prevValue: any,
            observer: any,
            observer$: Observable<any> = new Observable(obs => observer = obs);

        Object.defineProperty(target, mappedKey, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: false
        });

        observer$.subscribe((result) => {
            target[mappedKey] = result;
            localStorage.setItem(key, JSON.stringify(target[mappedKey]));
        });

        Object.defineProperty(target, decoratedPropertyName, {
            get: () => {
                let value: any;

                if (!_.isEqual(target[mappedKey], prevValue)) {
                    return target[mappedKey];
                }

                try {
                    value = target[mappedKey];
                } catch (e) {
                    value = target[mappedKey];
                }

                return value;
            },
            set: (value: any) => {
                if (target[mappedKey] && !_.isEqual(target[mappedKey], prevValue)) {
                    prevValue = value;
                    target[decoratedPropertyName] = value;
                }

                target[mappedKey] = value;
                localStorage.setItem(key, JSON.stringify(target[mappedKey]));

                observer.next(value);
            }
        });
    }
}