import { Component } from 'angular2/core'
import { Observable, Subject } from 'rxjs';
import { StylesService } from "../../Services/StylesService/StylesService";

export class BannerData {
    /**
     * @type {string}
     */
    private format: string;

    /**
     * @type number
     */
    private height: number;

    /**
     * @type {string}
     */
    private key: string = '';

    /**
     * Styles common to all banners
     *
     * @type Object
     */
    private generalStyles: StylesService = new StylesService();

    /**
     * Styles specific to banner
     *
     * @type Object
     */
    private specificStyles: StylesService = new StylesService();

    /**
     * @param StylesService
     */
    private stylesService: StylesService;

    /**
     * @type {string}
     */
    private title: string = '';

    /**
     * @type number
     */
    private width: number;

    /**
     * @param format
     */
    constructor (format: string) {
        this.format = format;
        [
            this.width,
            this.height
        ] = this.format.split('x').map((dimension: string) => parseInt(dimension));

        this.specificStyles.setStyles({
            banner: {
                background: 'red',
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: 'blue'
            }
        });
    }

    /**
     * @returns {string}
     */
    public getKey (): string {
        return this.key;
    }

    /**
     * @returns {string}
     */
    public getFormat (): string {
        return this.format;
    }

    public getHeight (): number {
        return this.height;
    }

    /**
     * @param clazz
     * @param styleName
     * @returns {string}
     */
    public getGeneralStyle (clazz: string, styleName: string): string {
        return this.getStyle(this.generalStyles.getStyles(), clazz, styleName);
    }

    /**
     * @returns {StylesService}
     */
    public getGeneralStyles (): Observable<any> {
        return this.generalStyles.getStyles();
    }

    /**
     * @param clazz
     * @param styleName
     * @returns {string}
     */
    public getSpecificStyle (clazz: string, styleName: string): string {
        return this.getStyle(this.specificStyles.getStyles(), clazz, styleName);
    }

    /**
     * @returns {StylesService}
     */
    public getSpecificStyles (): Observable<any> {
        return this.specificStyles.getStyles();
    }

    /**
     * @returns {string}
     */
    public getTitle (): string {
        return this.title;
    }

    /**
     * @returns {number}
     */
    public getWidth (): number {
        return this.width;
    }

    /**
     * @param clazz
     * @param styleName
     * @param styleValue
     */
    public setGeneralStyle (clazz: string, styleName: string, styleValue: string): void {
        return this.generalStyles.setStyle(clazz, styleName, styleValue);
    }

    /**
     * @param clazz
     * @param styleName
     * @param styleValue
     */
    public setSpecificStyle (clazz: string, styleName: string, styleValue: string): void {
        return this.specificStyles.setStyle(clazz, styleName, styleValue);
    }

    /**
     * @param styles
     */
    public setGeneralStyles (styles: Object): void {
        return this.generalStyles.setStyles(styles);
    }

    /**
     * @param styles
     */
    public setSpecificStyles (styles: Object): void {
        return this.specificStyles.setStyles(styles);
    }

    public setKey (key: string): void {
        this.key = key;
    }

    /**
     * @param title
     */
    public setTitle (title: string): void {
        this.title = title;
    }

    /**
     * @param styles
     * @param clazz
     * @param styleName
     * @returns {string}
     */
    private getStyle (styles: Observable<Object>, clazz: string, styleName: string): string {
        let result: string = '';

        styles.subscribe((styles: Observable<Object>) => {
            result = styles[clazz][styleName];
        });

        return result;
    }
}