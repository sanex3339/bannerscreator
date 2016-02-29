import { BannerData } from "../../Models/BannerData/BannerData";
import { BannersDataService } from "../../Services/BannersDataService/BannersDataService";
import { Directive, ElementRef, OnInit } from 'angular2/core';

@Directive({
    inputs: [
        'affectedFormat: style-changer-format',
        'affectedClass: style-changer-class',
        'affectedStyle: style-changer-style'
    ],
    host: {
        '(keyup)': 'setSpecificStyle()'
    },
    selector: '[style-changer-class]'
})
export class StyleChangerDirective implements OnInit {
    /**
     * @param string
     */
    private affectedClass: string;

    /**
     * @param string
     */
    private affectedFormat: string;

    /**
     * @param string
     */
    private affectedStyle: string;

    /**
     * @param BannerData
     */
    private bannerData: BannerData;

    /**
     * @param BannersDataService
     */
    private bannersDataService: BannersDataService;

    /**
     * @param HTMLInputElement
     */
    private element: HTMLInputElement;

    /**
     * @param elementRef
     * @param bannersDataService
     */
    constructor (elementRef: ElementRef, bannersDataService: BannersDataService) {
        this.element = elementRef.nativeElement;
        this.bannersDataService = bannersDataService;
    }

    public ngOnInit (): void {
        this.bannersDataService.getByFormat(this.affectedFormat)
            .subscribe((bannersData: BannerData[]) => {
                this.bannerData = bannersData[0];
            });

        this.element.value = this.getSpecificStyle();
    }

    /**
     * @returns {string}
     */
    private getSpecificStyle (): string {
        return this.bannerData.getSpecificStyle(this.affectedClass, this.affectedStyle);
    }

    private setSpecificStyle (): void {
        this.bannerData.setSpecificStyle(this.affectedClass, this.affectedStyle, this.element.value);
    }
}