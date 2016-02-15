import { Component } from 'angular2/core';

@Component({
    'inputs': ['progress'],
    'selector': 'progress-bar',
    'templateUrl': '/templates/UIComponents.ProgressBar.main'
})
export class ProgressBar {
    /**
     * @type {number}
     */
    private progress: number = 0;
}