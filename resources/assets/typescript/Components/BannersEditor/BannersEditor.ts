import { Component, Inject, Injectable } from 'angular2/core';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";
import { UploadedTemplatesService } from "../../Services/UploadedTemplatesService/UploadedTemplatesService";

@Injectable()
@Component({
    'selector': 'state-template',
    'templateUrl': '/templates/BannersEditor.main'
})
export class BannersEditor {
    /**
     * @type UploadedTemplate[]
     */
    uploadedTemplates: UploadedTemplate[];

    /**
     * @type UploadedTemplatesService
     */
    uploadedTemplatesService: UploadedTemplatesService;

    /**
     * @param uploadedTemplatesService
     */
    constructor (uploadedTemplatesService: UploadedTemplatesService) {
        this.uploadedTemplatesService = uploadedTemplatesService;
        this.uploadedTemplates = this.uploadedTemplatesService.getUploadedTemplates();
    }
}