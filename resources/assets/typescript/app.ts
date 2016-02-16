///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="Typings/underscore/underscore.d.ts"/>

import { AppComponent } from './app.component';
import { AppInjector } from './AppInjector';
import { bootstrap } from 'angular2/platform/browser';
import { ComponentRef, enableProdMode, Injector } from 'angular2/core';
import { LocalStorageService } from './Services/LocalStorageService/LocalStorageService';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { StageService } from './Services/StageService/StageService';
import { UploadedTemplatesService } from './Services/UploadedTemplatesService/UploadedTemplatesService';

//enableProdMode();

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    StageService,
    LocalStorageService,
    UploadedTemplatesService
]).then((appRef: ComponentRef) => {
    AppInjector(appRef.injector);
});