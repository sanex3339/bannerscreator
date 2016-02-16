import { Component } from 'angular2/core';
import { Tab } from './Tab';

@Component({
    'inputs': ['tabs'],
    'selector': 'tabs',
    'templateUrl': '/templates/UIComponents.Tabs.main'
})
export class Tabs {
    /**
     * Array with tab objects
     *
     * @type {number}
     */
    private tabs: Tab[] = [];

    /**
     * @param tab
     */
    public addTab (tab: Tab): void {
        if (this.tabs.length === 0) {
            tab.setActiveStatus(true);
        }

        this.tabs.push(tab);
    }

    /**
     * Tab component click handler
     *
     * @param tab
     */
    selectTab(tab: Tab) {
        this.tabs.forEach((tab) => {
            tab.setActiveStatus(false);
        });

        tab.setActiveStatus(true);
    }
}