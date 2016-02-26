import { AppComponent } from './app.component';
import { AppInjector } from './AppInjector';
import { ApplicationStageService } from './Services/ApplicationStageService/ApplicationStageService';
import { BannersDataService } from "./Services/BannersDataService/BannersDataService";
import { bootstrap } from 'angular2/platform/browser';
import { ComponentRef, enableProdMode } from 'angular2/core';
import { LocalStorageService } from './Services/LocalStorageService/LocalStorageService';
import { RedirectService } from "./Services/RedirectService/RedirectService";
import { ROUTER_PROVIDERS } from 'angular2/router';
import { UploadedTemplatesService } from "./Services/UploadedTemplatesService/UploadedTemplatesService";

//enableProdMode();

bootstrap(AppComponent, [
    ApplicationStageService,
    BannersDataService,
    LocalStorageService,
    RedirectService,
    ROUTER_PROVIDERS,
    UploadedTemplatesService
]).then((appRef: ComponentRef) => {
    AppInjector(appRef.injector);
});

