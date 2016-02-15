import { Component, OnInit } from 'angular2/core';
import { NavigationTabItem } from './Interfaces/NavigationTabItem';

@Component({
    'inputs': ['tabs'],
    'selector': 'navigation-tab',
    'templateUrl': '/templates/UIComponents.NavigationTab.main'
})
export class NavigationTab implements OnInit {
    /**
     * Array with tab objects
     *
     * @type {number}
     */
    private tabs: NavigationTabItem[] = [];

    ngOnInit (): void {
        this.applyActiveTabsLimit();
    }

    /**
     * If array of NavigationTabItem has more than one NavigationTabItem with `active = true` property -
     * set to false all that properties, except first one.
     */
    private applyActiveTabsLimit (): void {
        let firstActiveFlag: boolean = false;

        for (let tab of this.tabs) {
            if (!tab.active) {
                continue;
            }

            if (!firstActiveFlag) {
                firstActiveFlag = true;

                continue;
            }

            tab.active = false;
        }
    }
}