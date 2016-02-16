import { AppInjector } from '../AppInjector';
import { ApplicationStageService } from '../Services/ApplicationStageService/ApplicationStageService';
import { Injector } from 'angular2/core';
import { Router } from 'angular2/router';

export const StageCheck = () => {
    let injector: Injector = AppInjector(),
        router: Router = injector.get(Router),
        applicationStageService: ApplicationStageService = injector.get(ApplicationStageService);

    return new Promise((resolve) => {
        applicationStageService.stageCondition()
            .subscribe((result) => {
                if (result) {
                    resolve(true);
                } else {
                    router.navigate(['Root']);
                    resolve(false);
                }
            });
    });
};