import { AppInjector } from '../../AppInjector';
import { Injector } from 'angular2/core';
import { UploadedTemplatesService } from '../../Services/UploadedTemplatesService/UploadedTemplatesService';

export class EditStage {
    public static condition (): boolean {
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

        return false;
    }
}