import { Component, Injectable } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { FileUploadService } from '../../Services/FileUploadService/FileUploadService';
import { RedirectService } from '../../Services/RedirectService/RedirectService';
import { ProgressBar } from '../UI/ProgressBar/ProgressBar';
import { Stage } from '../../Enums/Stage';
import { SetStage } from '../../RouteHooks/SetStage';
import { StageCheck } from '../../RouteHooks/StageCheck';
import { UploadStage } from '../../Models/Stages/UploadStage';
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';
import { UploadedTemplatesService } from '../../Services/UploadedTemplatesService/UploadedTemplatesService';

@Injectable()
@CanActivate(() => {
    SetStage(Stage.UploadStage, new UploadStage());

    return StageCheck();
})
@Component({
    'directives': [ProgressBar],
    'providers': [FileUploadService, RedirectService, UploadedTemplate],
    'selector': 'state-template',
    'templateUrl': '/templates/PSDTemplateUploadService.main'
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
     * @type UploadedTemplatesService
     */
    private uploadedTemplatesService: UploadedTemplatesService<UploadedTemplate>;

    /**
     * @type {string}
     */
    private uploadRoute: string = '/api/upload-file';

    /**
     * @param fileUploadService
     * @param redirectService
     * @param uploadedTemplatesService
     */
    constructor (
        fileUploadService: FileUploadService,
        redirectService: RedirectService,
        uploadedTemplatesService: UploadedTemplatesService<UploadedTemplate>
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

    public psdTemplateUploadHandler () {
        if (!this.psdTemplates.length) {
            return;
        }

        this.isSubmitted = true;

        this.fileUploadService.getObserver()
            .subscribe(progress => {
                this.uploadProgress = progress;
            });

        this.fileUploadService.upload(this.uploadRoute, this.psdTemplates).then(
            (result) => {
                if (!result['images']) {
                    return;
                }

                this.saveUploadedTemplatesData(result['images']);
                this.redirectService.redirect(this.redirectRoute)
            },
            (error) => {
                document.write(error);
            }
        );
    }

    /**
     * Save uploaded templates data into UploadedTemplatesService for
     * future use inside other components
     *
     * @param files
     */
    private saveUploadedTemplatesData (files: any[]): void {
        for (let file of files) {
            this.uploadedTemplatesService.addTemplate(
                new UploadedTemplate(
                    file['imageName'],
                    file['imagePath'],
                    file['imageExtension'],
                    file['hasLogo']
                )
            );
        }
    }
}