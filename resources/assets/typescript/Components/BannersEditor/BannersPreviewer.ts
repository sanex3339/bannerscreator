import { BannerData } from "../../Models/BannerData/BannerData";
import { BannersDataService } from "../../Services/BannersDataService/BannersDataService";
import { Component, ElementRef, OnInit } from 'angular2/core';
import { Subject } from 'rxjs';
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
     * @type format
     */
    private format: string;

    /**
     * @param bannersDataService
     */
    constructor (bannersDataService: BannersDataService) {
        this.bannersDataService = bannersDataService;
    }

    public ngOnInit (): void {
        this.bannersDataService.getByFormat(this.format)
            .subscribe((bannersData: BannerData[]) => {
                this.bannerData = bannersData[0];

                this.bannerData.getGeneralStyles()
                    .subscribe((generalStyles: Object) => {
                        console.log(generalStyles);

                        this.applyStyles(generalStyles)
                    });

                this.bannerData.getSpecificStyles()
                    .subscribe((specificStyles: Object) => {
                        this.applyStyles(specificStyles)
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
            $(`.${bannerClass}`).css(styles[bannerClass]);
        }
    }
}