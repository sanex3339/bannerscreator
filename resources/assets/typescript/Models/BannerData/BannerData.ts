import { Component } from 'angular2/core'
import { Observable } from 'rxjs';
import { StylesService } from "../../Services/StylesService/StylesService";
import { Subject } from 'rxjs';

export class BannerData {
    /**
     * @type {string}
     */
    private format: string;

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
     * @param format
     */
    constructor (format: string) {
        this.format = format;

        this.generalStyles.setStyles({
            banner: {
                border: '3px solid blue'
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

    /**
     * @returns {StylesService}
     */
    public getGeneralStyles (): Observable<any> {
        return this.generalStyles.getStyles();
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

    public setKey (key: string): void {
        this.key = key;
    }

    /**
     * @param title
     */
    public setTitle (title: string): void {
        this.title = title;
    }
}