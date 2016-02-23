import { BannersPreviewer } from './BannersPreviewer';
import { Component, OnInit } from 'angular2/core';
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
export class BannersEditorTemplate implements OnInit {
    private templateData: UploadedTemplate;

    ngOnInit (): void {
        console.log(this.templateData);
    }
}