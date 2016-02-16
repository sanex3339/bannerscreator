import { AppInjector } from '../AppInjector';
import { Injector } from 'angular2/core';
import { Router, ComponentInstruction } from 'angular2/router';
import { StageService } from '../Services/StageService/StageService';
import { UploadedTemplatesService } from '../Services/UploadedTemplatesService/UploadedTemplatesService';

export const StageCheck = (next: ComponentInstruction, previous: ComponentInstruction) => {
    let injector: Injector = AppInjector(),
        router: Router = injector.get(Router),
        stageService: StageService = injector.get(StageService);

    return new Promise((resolve) => {
        stageService.stageCondition()
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