import { Component, Inject, Injectable } from 'angular2/core';
import { BannersEditorTemplate } from './BannersEditorTemplate';
import { Tabs } from '../UI/Tabs/Tabs';
import { Tab } from '../UI/Tabs/Tab';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";
import { UploadedTemplatesService } from "../../Services/UploadedTemplatesService/UploadedTemplatesService";

@Injectable()
@Component({
    'directives': [BannersEditorTemplate, Tabs, Tab],
    'selector': 'state-template',
    'templateUrl': '/templates/BannersEditor.main'
})
export class BannersEditor {
    /**
     * @type UploadedTemplate[]
     */
    uploadedTemplates: UploadedTemplate[];

    /**
     * @param uploadedTemplatesService
     */
    constructor (uploadedTemplatesService: UploadedTemplatesService) {
        this.uploadedTemplates = uploadedTemplatesService.getUploadedTemplates();
    }
}