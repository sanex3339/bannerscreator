import { Component } from 'angular2/core';
import { BannersEditorOverview } from './BannersEditorOverview';
import { BannersEditorTemplate } from './BannersEditorTemplate';
import { CanActivate } from 'angular2/router';
import { EditStage } from '../../Models/Stages/EditStage';
import { Stage } from '../../Enums/Stage';
import { SetStage } from '../../RouteHooks/SetStage';
import { StageCheck } from '../../RouteHooks/StageCheck';
import { Tabs } from '../UI/Tabs/Tabs';
import { Tab } from '../UI/Tabs/Tab';
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';
import { UploadedTemplatesService } from '../../Services/UploadedTemplatesService/UploadedTemplatesService';

@CanActivate(() => {
    SetStage(Stage.EditStage, new EditStage());

    return StageCheck();
})
@Component({
    'directives': [
        BannersEditorOverview,
        BannersEditorTemplate,
        Tabs,
        Tab
    ],
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
    constructor (
        uploadedTemplatesService: UploadedTemplatesService
    ) {
        uploadedTemplatesService.get()
            .subscribe((result) => {
                this.uploadedTemplates = result;
            });
    }
}