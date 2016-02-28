import { AffectStyleDirective } from '../../Directives/AffectStyleDirective/AffectStyleDirective';
import { BannerData } from '../../Models/BannerData/BannerData';
import { BannersDataService } from '../../Services/BannersDataService/BannersDataService';
import { BannersPreviewer } from './BannersPreviewer';
import { Component, OnInit } from 'angular2/core';
import { Subject } from 'rxjs';
import { SplitView } from '../UI/SplitView/SplitView';
import { SplitViewContainer } from '../UI/SplitView/SplitViewContainer';
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';

@Component({
    'inputs': ['templateData: template-data'],
    'directives': [
        AffectStyleDirective,
        BannersPreviewer,
        SplitView,
        SplitViewContainer
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
            })
    }
}