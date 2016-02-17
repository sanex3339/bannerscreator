///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="Typings/underscore/underscore.d.ts"/>

import { AppComponent } from './app.component';
import { AppInjector } from './AppInjector';
import { ApplicationStageService } from './Services/ApplicationStageService/ApplicationStageService';
import { bootstrap } from 'angular2/platform/browser';
import { ComponentRef, enableProdMode } from 'angular2/core';
import { LocalStorageService } from './Services/LocalStorageService/LocalStorageService';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { UploadedTemplatesService } from './Services/UploadedTemplatesService/UploadedTemplatesService';

//enableProdMode();

bootstrap(AppComponent, [
    ApplicationStageService,
    LocalStorageService,
    ROUTER_PROVIDERS,
    UploadedTemplatesService
]).then((appRef: ComponentRef) => {
    AppInjector(appRef.injector);
});

