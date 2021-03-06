import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { FileUploadService } from '../../Services/FileUploadService/FileUploadService';
import { ProgressBar } from '../UI/ProgressBar/ProgressBar';
import { RedirectService } from '../../Services/RedirectService/RedirectService';
import { Stage } from '../../Enums/Stage';
import { SetStage } from '../../RouteHooks/SetStage';
import { StageCheck } from '../../RouteHooks/StageCheck';
import { UploadStage } from '../../Models/Stages/UploadStage';
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';
import { UploadedTemplatesService } from '../../Services/UploadedTemplatesService/UploadedTemplatesService';

@CanActivate(() => {
    SetStage(Stage.UploadStage, new UploadStage());

    return StageCheck();
})
@Component({
    'directives': [ProgressBar],
    'providers': [FileUploadService],
    'selector': 'state-template',
    'templateUrl': '/templates/PSDUploader.main'
})
export class PSDUploader {
    /**
     * @type FileUploadService
     */
    private fileUploadService: FileUploadService;

    /**
     * @type {boolean}
     */
    private isSubmitted: boolean = false;

    /**
     * @type RedirectService
     */
    private redirectService: RedirectService;

    /**
     * @type {string}
     */
    private redirectRoute: string = '/EditTemplates';

    /**
     * @type {Array}
     */
    private psdTemplates: File[] = [];

    /**
     * Upload progress for files
     *
     * @type {number}
     */
    private uploadProgress: number = 0;

    /**
     * ProgressBar Directive load condition
     *
     * @type {boolean}
     */
    private progressBarVisibility: boolean = false;

    /**
     * @type {string}
     */
    private uploadRoute: string = '/api/upload-file';

    /**
     * @type UploadedTemplatesService
     */
    private uploadedTemplatesService: UploadedTemplatesService;

    /**
     * @param fileUploadService
     * @param redirectService
     * @param uploadedTemplatesService
     */
    constructor (
        fileUploadService: FileUploadService,
        redirectService: RedirectService,
        uploadedTemplatesService: UploadedTemplatesService
    ) {
        this.fileUploadService = fileUploadService;
        this.redirectService = redirectService;
        this.uploadedTemplatesService = uploadedTemplatesService;
    }

    /**
     * @param fileInput
     */
    public psdTemplateSelectionHandler (fileInput: any){
        let FileList: FileList = fileInput.target.files;

        for (let i = 0, length = FileList.length; i < length; i++) {
            this.psdTemplates.push(FileList.item(i));
        }

        this.progressBarVisibility = true;
    }

    public async psdTemplateUploadHandler (): Promise<any> {
        let result: any;

        if (!this.psdTemplates.length) {
            return;
        }

        this.isSubmitted = true;

        this.fileUploadService.getObserver()
            .subscribe(progress => {
                this.uploadProgress = progress;
            });

        try {
            result = await this.fileUploadService.upload(this.uploadRoute, this.psdTemplates);
        } catch (error) {
            document.write(error)
        }

        if (!result['images']) {
            return;
        }

        this.saveUploadedTemplatesData(result['images']);
        this.redirectService.redirect(this.redirectRoute, 800);
    }

    /**
     * Save uploaded templates data into UploadedTemplatesService for
     * future use inside other components
     *
     * @param files
     */
    private saveUploadedTemplatesData (files: any[]): void {
        for (let file of files) {
            this.uploadedTemplatesService.set(
                new UploadedTemplate(
                    file['imageName'],
                    file['imagePath'],
                    file['imageExtension'],
                    file['hasLogo'],
                    file['imageSize']
                )
            );
        }
    }
}