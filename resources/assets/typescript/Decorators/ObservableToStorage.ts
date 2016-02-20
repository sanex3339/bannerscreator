import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ObservableDataService } from "../Services/ObservableDataService/ObservableDataService";
import * as _ from 'underscore';
import get = Reflect.get;
import {UploadedTemplate} from "../Models/UploadedTemplate/UploadedTemplate";

/**
 * @param storageKey
 * @param fromObjectHandler
 * @returns {function(Object, string=): void}
 * @constructor
 */
export function ObservableToStorage (
    storageKey: string,
    fromObjectHandler: (data: any) => any = data => data
) {
    return function decoratorFactory (target: Object, decoratedPropertyName?: string): void {
        let key: string = storageKey || decoratedPropertyName,
            tempProperty: string = `_${decoratedPropertyName}`,
            setter: Subject<any> = new BehaviorSubject(target[decoratedPropertyName]);

        setter.subscribe((observable: Observable<any>) => {
            if (!(observable instanceof Observable)) {
                return;
            }

            observable.subscribe((data) => {
                if (!data || !data.length) {
                    return
                }

                localStorage.setItem(key, JSON.stringify(data));
            });
        });

        createTempProperty(target, tempProperty);

        Object.defineProperty(target, decoratedPropertyName, {
            get: (): any => {
                try {
                    let localStorageData: string = JSON.parse(localStorage.getItem(key)),
                        returnObservable = Observable.of(localStorageData)
                            .filter((data: any): any => data)
                            .map(fromObjectHandler);

                    target[tempProperty] = returnObservable;

                    return returnObservable;
                } catch (e) {}

                return target[tempProperty];
            },
            set: (value: any): void => {
                target[tempProperty] = value;
                setter.next(value);
            }
        });
    };

    /**
     * @param target
     * @param propertyName
     */
    function createTempProperty (target: any, propertyName: string): void {
        Object.defineProperty(target, propertyName, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: false
        });

    }
}