import { Component } from 'angular2/core';
import { NavigationTabItem } from './Interfaces/NavigationTabItem';

@Component({
    'inputs': ['tabs'],
    'selector': 'navigation-tab',
    'templateUrl': '/templates/UIComponents.NavigationTab.main'
})
export class NavigationTab {
    /**
     * Array with tab objects
     *
     * @type {number}
     */
    private tabs: NavigationTabItem[] = [];

    constructor () {}
}