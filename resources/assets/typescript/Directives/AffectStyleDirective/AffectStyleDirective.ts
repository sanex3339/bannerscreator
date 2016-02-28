import { BannerData } from "../../Models/BannerData/BannerData";
import { Directive, ElementRef, OnInit } from 'angular2/core';

@Directive({
    inputs: ['affectStyle: affect-style', 'bannerData: banner-data'],
    host: {
        '(keyup)': 'setSpecificStyle()'
    },
    selector: '[affect-style]'
})
export class AffectStyleDirective implements OnInit {
    /**
     * @param string
     */
    private affectedClass: string;

    /**
     * @param string
     */
    private affectedStyle: string;

    /**
     * String of the form: `elementClass:affectedStyle`
     *
     * @param string
     */
    private affectStyle: string;

    /**
     * @param BannerData
     */
    private bannerData: BannerData;

    /**
     * @param HTMLInputElement
     */
    private element: HTMLInputElement;

    /**
     * @param elementRef
     */
    constructor (elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    public ngOnInit (): void {
        [
            this.affectedClass,
            this.affectedStyle
        ] = this.affectStyle.split(':');

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