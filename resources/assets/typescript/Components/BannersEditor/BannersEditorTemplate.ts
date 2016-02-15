import { Component, Injectable, OnInit } from 'angular2/core';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";

@Injectable()
@Component({
    'inputs': ['templateData'],
    'selector': 'banners-editor-template',
    'templateUrl': '/templates/BannersEditor.template'
})
export class BannersEditorTemplate implements OnInit {
    private templateData: UploadedTemplate;

    ngOnInit (): void {
        console.log(this.templateData);
    }
}