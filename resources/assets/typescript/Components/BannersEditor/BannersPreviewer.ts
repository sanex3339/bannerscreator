import { BannersDataService } from "../../Services/BannersDataService/BannersDataService";
import { Component, ElementRef } from 'angular2/core';
import { Subject } from 'rxjs';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";
import * as $ from 'jquery';

@Component({
    'selector': 'banners-previewer',
    'templateUrl': '/templates/BannersEditor.banner'
})
export class BannersPreviewer {
    private banner: HTMLElement;

    private bannersDataService: BannersDataService;

    constructor (elementRef: ElementRef, bannersDataService: BannersDataService) {
        this.banner = elementRef.nativeElement;
        this.bannersDataService = bannersDataService;

        bannersDataService
            .getStyles()
            .subscribe((styles: any) => {
                this.applyStyles(styles);
            })
    }

    /**
     * @param styles
     */
    private applyStyles (styles: any): void {
        console.log(styles);

        for (let bannerClass in styles) {
            $(`.${bannerClass}`).css(styles[bannerClass]);
        }
    }
}