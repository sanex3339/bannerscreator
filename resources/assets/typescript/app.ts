import { AppComponent } from './app.component';
import { AppInjector } from './AppInjector';
import { ApplicationStageService } from './Services/ApplicationStageService/ApplicationStageService';
import { bootstrap } from 'angular2/platform/browser';
import { ComponentRef, enableProdMode, provide } from 'angular2/core';
import { LocalStorageService } from './Services/LocalStorageService/LocalStorageService';
import { ObservableDataService } from "./Services/ObservableDataService/ObservableDataService";
import { UploadedTemplatesService } from "./Services/UploadedTemplatesService/UploadedTemplatesService";
import { ROUTER_PROVIDERS } from 'angular2/router';

//enableProdMode();

bootstrap(AppComponent, [
    ApplicationStageService,
    LocalStorageService,
    ROUTER_PROVIDERS,
    ObservableDataService,
    UploadedTemplatesService
]).then((appRef: ComponentRef) => {
    AppInjector(appRef.injector);
});

