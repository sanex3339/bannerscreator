import { BannerData } from "../../Models/BannerData/BannerData";
import { BannersDataService } from "../../Services/BannersDataService/BannersDataService";
import { Component, ElementRef, OnInit } from 'angular2/core';
import { Subject, Observable } from 'rxjs';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";
import * as $ from 'jquery';

@Component({
    'inputs': ['format'],
    'selector': 'banners-previewer',
    'templateUrl': '/templates/BannersEditor.banner'
})
export class BannersPreviewer implements OnInit {
    /**
     * @type BannerData
     */
    private bannerData: BannerData;

    /**
     * @type BannersDataService
     */
    private bannersDataService: BannersDataService;

    /**
     * @param HTMLElement
     */
    private element: HTMLElement;

    /**
     * @type format
     */
    private format: string;

    /**
     * @param elementRef
     * @param bannersDataService
     */
    constructor (elementRef: ElementRef, bannersDataService: BannersDataService) {
        this.element = elementRef.nativeElement;
        this.bannersDataService = bannersDataService;
    }

    public ngOnInit (): void {
        this.bannersDataService.getByFormat(this.format)
            .subscribe((bannersData: BannerData[]) => {
                this.bannerData = bannersData[0];

                Observable.merge(
                    this.bannerData.getGeneralStyles(),
                    this.bannerData.getSpecificStyles()
                ).subscribe((styles: Object) => {
                    this.applyStyles(styles)
                });
            });
    }

    /**
     * @param styles
     */
    private applyStyles (styles: any): void {
        if (!styles) {
            return;
        }

        for (let bannerClass in styles) {
            if (!styles.hasOwnProperty(bannerClass)) {
                continue;
            }

            $(this.element).find(`.${bannerClass}`).css(styles[bannerClass]);
        }
    }
}