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
     * @type any
     */
    private generalStyles: any = {
        banner: {
            'border': '3px solid blue'
        }
    };

    /**
     * Styles specific to banner
     *
     * @type any
     */
    private specificStyles: any;

    /**
     * @type {string}
     */
    private title: string = '';

    /**
     * @param format
     */
    constructor (format: string) {
        this.format = format;
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
     * @returns any
     */
    public getGeneralStyles (): any {
        return this.generalStyles;
    }

    /**
     * @returns any
     */
    public getSpecificStyles (): any {
        return this.specificStyles;
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
     * @param generalStyles
     */
    public setGeneralStyles (generalStyles: any): void {
        this.generalStyles = generalStyles;
    }

    /**
     * @param specificStyles
     */
    public setSpecificStyles (specificStyles: any): void {
        this.specificStyles = specificStyles;
    }

    /**
     * @param title
     */
    public setTitle (title: string): void {
        this.title = title;
    }
}