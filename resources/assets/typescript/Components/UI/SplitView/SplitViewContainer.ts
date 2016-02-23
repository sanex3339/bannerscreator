import { Component, ElementRef } from 'angular2/core';
import * as $ from 'jquery';

@Component({
    'inputs': ['title'],
    'selector': 'split-view-container',
    'templateUrl': '/templates/UIComponents.SplitView.container'
})
export class SplitViewContainer {
    private rootElement: HTMLElement;

    private title: string;

    constructor (refElement: ElementRef) {
        this.rootElement = refElement.nativeElement;

        this.bindEvents();
    }

    private bindEvents (): void {
        $(this.rootElement).hover(this.componentMouseEnterHandler, this.componentMouseLeaveHandler);
    }

    private componentMouseEnterHandler (): void {
        $('split-view-container').addClass('deselected');
        $('.split-view-container').each((index, element) => {
            $(element).css({
                'min-width': $(element).children().first().css('width')
            });
        });
        $(this).removeClass('deselected').addClass('selected');
    }

    private componentMouseLeaveHandler (): void {
        $('split-view-container').removeClass('selected deselected');
    }
}