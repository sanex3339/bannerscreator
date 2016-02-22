import { Component } from 'angular2/core';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";

@Component({
    'inputs': ['bannersStyles: banners-styles'],
    'selector': 'banners-previewer',
    'template': '<div style="background: red; width: 1000px; height: 1000px;"></div>'
})
export class BannersPreviewer {
    private bannersStyles: any = {};

    constructor () {
        console.log('BannersPreviewer init');
    }
}