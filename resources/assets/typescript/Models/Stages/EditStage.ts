import { AppInjector } from '../../AppInjector';
import { ApplicationStage } from '../../Interfaces/ApplicationStage';
import { Injector } from 'angular2/core';
import { UploadedTemplatesService } from '../../Services/UploadedTemplatesService/UploadedTemplatesService';

export class EditStage implements ApplicationStage {
    public stageCondition (): boolean {
        let injector: Injector = AppInjector(),
            uploadedTemplatesService: UploadedTemplatesService = injector.get(UploadedTemplatesService);

        uploadedTemplatesService.getUploadedTemplates()
            .subscribe((result) => {
                if (result.length) {
                    return true;
                } else {
                    return false;
                }
            });

        return true;
    }
}