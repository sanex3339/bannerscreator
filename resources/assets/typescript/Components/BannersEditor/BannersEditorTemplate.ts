import { BannerData } from '../../Models/BannerData/BannerData';
import { BannersDataService } from '../../Services/BannersDataService/BannersDataService';
import { BannersPreviewer } from './BannersPreviewer';
import { Component, OnInit } from 'angular2/core';
import { FormatStylizationService } from "../../Services/FormatStylizationService/FormatStylizationService";
import { Subject } from 'rxjs';
import { SplitView } from '../UI/SplitView/SplitView';
import { SplitViewContainer } from '../UI/SplitView/SplitViewContainer';
import { StyleChangerDirective } from '../../Directives/StyleChangerDirective/StyleChangerDirective';
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';

@Component({
    'inputs': ['templateData: template-data'],
    'directives': [
        BannersPreviewer,
        SplitView,
        SplitViewContainer,
        StyleChangerDirective
    ],
    'selector': 'banners-editor-template',
    'templateUrl': '/templates/BannersEditor.template'
})
export class BannersEditorTemplate implements OnInit {
    /**
     * @type BannerDataService
     */
    private bannersDataService: BannersDataService;

    /**
     * @type BannerData
     */
    private bannerData: BannerData;

    /**
     * @type string
     */
    private format: string;

    /**
     * @type {StylesService}
     */
    private formatStylizationService: FormatStylizationService;

    /**
     * @type UploadedTemplate
     */
    private templateData: UploadedTemplate;

    constructor (bannersDataService: BannersDataService) {
        this.bannersDataService = bannersDataService;
    }

    public ngOnInit (): void {
        this.format = `${this.templateData.getWidth()}x${this.templateData.getHeight()}`;

        this.bannersDataService.set(
            new BannerData(this.format)
        );

        this.bannersDataService.getByFormat(this.format)
            .subscribe((bannersData: BannerData[]) => {
                this.bannerData = bannersData[0];
                this.formatStylizationService = new FormatStylizationService(this.bannerData);
                this.formatStylizationService.applyFormatStyles();
            })
    }
}