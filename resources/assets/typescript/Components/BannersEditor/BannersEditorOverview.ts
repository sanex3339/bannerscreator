import { Component } from 'angular2/core';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";

@Component({
    'inputs': ['uploadedTemplates: uploaded-templates'],
    'selector': 'banners-editor-overview',
    'templateUrl': '/templates/BannersEditor.overview'
})
export class BannersEditorOverview {
    private uploadedTemplates: UploadedTemplate[];
}