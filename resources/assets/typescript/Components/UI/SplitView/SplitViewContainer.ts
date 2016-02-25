import { Component } from 'angular2/core';
import * as $ from 'jquery';

@Component({
    'inputs': ['title'],
    'selector': 'split-view-container',
    'templateUrl': '/templates/UIComponents.SplitView.container'
})
export class SplitViewContainer {
    private title: string;

    constructor () {}
}