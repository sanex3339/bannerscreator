import { AppInjector } from '../AppInjector';
import { ApplicationStageService } from '../Services/ApplicationStageService/ApplicationStageService';
import { Injector } from 'angular2/core';
import { RedirectService } from '../Services/RedirectService/RedirectService';

/**
 * @returns {Promise<T>}
 * @constructor
 */
export const StageCheck = () => {
    let injector: Injector = AppInjector(),
        redirectService: RedirectService = injector.get(RedirectService),
        applicationStageService: ApplicationStageService = injector.get(ApplicationStageService);

    return new Promise((resolve) => {
        applicationStageService.stageCondition()
            .subscribe((result) => {
                if (result) {
                    resolve(true);
                } else {
                    redirectService.redirect('Root');
                    resolve(false);
                }
            });
    });
};