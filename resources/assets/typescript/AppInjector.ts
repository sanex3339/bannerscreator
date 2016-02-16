import { Injector } from 'angular2/core';

let appInjectorRef: Injector;

export const AppInjector = (injector?: Injector): Injector => {
    if (injector) {
        appInjectorRef = injector;
    }

    return appInjectorRef;
};