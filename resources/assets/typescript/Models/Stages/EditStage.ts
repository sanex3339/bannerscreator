import { AppInjector } from '../../AppInjector';
import { ApplicationStage } from '../../Interfaces/ApplicationStage';
import { Injector } from 'angular2/core';
import { UploadedTemplatesService } from '../../Services/UploadedTemplatesService/UploadedTemplatesService';

export class EditStage implements ApplicationStage {
    /**
     * Condition for EditStage checks UploadedTenplate's count inside UploadedTemplatesService
     * Service will not load, if cound us zero.
     *
     * @returns {boolean}
     */
    public stageCondition (): boolean {
        let injector: Injector = AppInjector(),
            uploadedTemplatesService: UploadedTemplatesService = injector.get(UploadedTemplatesService),
            result: boolean = false;

        uploadedTemplatesService.getObserver()
            .subscribe((templates) => {
                result = !!templates.length;
            });

        uploadedTemplatesService.getUploadedTemplates();

        return result;
    }
}