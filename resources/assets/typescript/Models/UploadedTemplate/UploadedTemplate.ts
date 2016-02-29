import { Component, Injectable } from 'angular2/core';
import { ImageDimension } from '../../Interfaces/ImageDimension';

@Injectable()
export class UploadedTemplate {
    /**
     * Template logo file name
     *
     * @type {string}
     */
    private static LOGO_NAME: string = 'logo';

    private name: string;
    private path: string;
    private extension: string;
    private logo: boolean;

    private width: number;
    private height: number;

    /**
     * @param name
     * @param path
     * @param extension
     * @param logo
     * @param imageSize
     */
    constructor (name: string, path: string, extension: string, logo: boolean, imageSize: ImageDimension) {
        this.name = name;
        this.path = path;
        this.extension = extension;
        this.logo = logo;

        this.width = imageSize['width'];
        this.height = imageSize['height'];
    }

    /**
     * @returns {boolean}
     */
    public hasLogo (): boolean {
        return this.logo;
    }

    /**
     * @returns {string}
     */
    public getName (): string {
        return this.name;
    }

    /**
     * @returns {string}
     */
    public getPath (): string {
        return this.path;
    }

    /**
     * @returns {string}
     */
    public getExtension (): string {
        return this.extension;
    }

    /**
     * @returns {string}
     */
    public getFullPath (): string {
        return `${this.path}/${this.name}.${this.extension}`;
    }

    /**
     * @returns {number}
     */
    public getHeight (): number {
        return this.height;
    }

    /**
     * @returns {string}
     */
    public getLogoPath (): string {
        return `${this.path}/${UploadedTemplate.LOGO_NAME}.${this.extension}`;
    }

    /**
     * @returns {number}
     */
    public getWidth (): number {
        return this.width;
    }
}