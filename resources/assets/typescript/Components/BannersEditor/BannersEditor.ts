import { Component, Inject, Injectable } from 'angular2/core';
import { BannersEditorTemplate } from "./BannersEditorTemplate";
import { NavigationTab } from '../UI/NavigationTab/NavigationTab';
import { NavigationTabItem } from '../UI/NavigationTab/Interfaces/NavigationTabItem';
import { UploadedTemplate } from "../../Models/UploadedTemplate/UploadedTemplate";
import { UploadedTemplatesService } from "../../Services/UploadedTemplatesService/UploadedTemplatesService";

@Injectable()
@Component({
    'directives': [BannersEditorTemplate, NavigationTab],
    'selector': 'state-template',
    'templateUrl': '/templates/BannersEditor.main'
})
export class BannersEditor {
    /**
     * Array of static NavigationTabItem for NavigationTab component
     *
     * @type {Array}
     */
    navigationTabItemsStatic: NavigationTabItem[] = [
        {
            active: true,
            name: 'Обзор',
            selector: 'overview'
        },
        {
            name: 'Общие',
            selector: 'general'
        }
    ];

    /**
     * Array of dynamic NavigationTabItem for NavigationTab component
     *
     * @type {Array}
     */
    navigationTabItemsDynamic: NavigationTabItem[] = [];

    /**
     * Array of combined static and dynamic NavigationTabItem for NavigationTab component
     *
     * @type {Array}
     */
    navigationTabItems: NavigationTabItem[] = [];

    /**
     * @type UploadedTemplate[]
     */
    uploadedTemplates: UploadedTemplate[];

    /**
     * @param uploadedTemplatesService
     */
    constructor (uploadedTemplatesService: UploadedTemplatesService) {
        this.uploadedTemplates = uploadedTemplatesService.getUploadedTemplates();
        this.navigationTabItemsDynamic = this.getNavigationTabItems();
        this.navigationTabItems = this.navigationTabItemsStatic.concat(this.navigationTabItemsDynamic);
    }

    /**
     * Returns object with array of NavigationTabItem for NavigationTab component
     *
     * @returns {NavigationTabItem[]}
     */
    getNavigationTabItems (): NavigationTabItem[] {
        const NAVIGATION_TAB_PREFIX = 'main-navigation-tab';

        let items: NavigationTabItem[] = [];

        for (let i = 0, length = this.uploadedTemplates.length; i < length; i++) {
            items.push({
                name: this.uploadedTemplates[i].getName(),
                selector: `${NAVIGATION_TAB_PREFIX}-${i}`
            });
        }

        return items;
    }
}