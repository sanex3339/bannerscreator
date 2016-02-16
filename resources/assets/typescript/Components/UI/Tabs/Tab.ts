import { Component } from 'angular2/core';
import { Tabs } from './Tabs';

@Component({
    'inputs': ['title:tab-title'],
    'selector': 'tab',
    'templateUrl': '/templates/UIComponents.Tabs.tab'
})
export class Tab {
    private active: boolean = false;
    private title: string;

    /**
     * @param tabs
     */
    constructor (tabs: Tabs) {
        tabs.addTab(this);
    }

    public getTitle (): string {
        return this.title;
    }

    public isActive (): boolean {
        return this.active;
    }

    /**
     * @param activeStatus
     */
    public setActiveStatus (activeStatus: boolean): void {
        this.active = activeStatus;
    }
}