import { BannersDataService } from "../../Services/BannersDataService/BannersDataService";
import { BannersPreviewer } from './BannersPreviewer';
import { Component } from 'angular2/core';
import { Subject } from 'rxjs';
import { SplitView } from "../UI/SplitView/SplitView";
import { SplitViewContainer } from "../UI/SplitView/SplitViewContainer";
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";

@Component({
    'inputs': ['templateData: template-data'],
    'directives': [
        BannersPreviewer,
        SplitView,
        SplitViewContainer
    ],
    'selector': 'banners-editor-template',
    'templateUrl': '/templates/BannersEditor.template'
})
export class BannersEditorTemplate {
    private bannersDataService: BannersDataService;

    private bannerStyles: any = {
        banner: {

        }
    };

    private templateData: UploadedTemplate;

    constructor (bannersDataService: BannersDataService) {
        this.bannersDataService = bannersDataService;
    }

    private onInputChange (event): void {
        this.bannersDataService
            .getStyles()
            .next(this.bannerStyles);
    }
}