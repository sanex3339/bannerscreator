import { AppInjector } from '../../AppInjector';
import { Component, Inject, Injectable, Injector } from 'angular2/core';
import { BannersEditorTemplate } from './BannersEditorTemplate';
import { CanActivate, ComponentInstruction } from 'angular2/router';
import { EditStage } from '../../Models/Stages/EditStage';
import { Stage } from '../../Enums/Stage';
import { StageCheck } from '../../RouteHooks/StageCheck';
import { StageService } from '../../Services/StageService/StageService';
import { Tabs } from '../UI/Tabs/Tabs';
import { Tab } from '../UI/Tabs/Tab';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";
import { UploadedTemplatesService } from "../../Services/UploadedTemplatesService/UploadedTemplatesService";

@Injectable()
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    let injector: Injector = AppInjector(),
        stageService = injector.get(StageService);

    stageService.setStage(Stage.EditStage, new EditStage());

    return StageCheck();
})
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
     * @param stageService
     * @param uploadedTemplatesService
     */
    constructor (
        uploadedTemplatesService: UploadedTemplatesService
    ) {
        uploadedTemplatesService.getUploadedTemplates()
            .subscribe((result) => {
                this.uploadedTemplates = result;
            });
    }
}