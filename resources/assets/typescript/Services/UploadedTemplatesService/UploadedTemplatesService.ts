import { Component, Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { ObservableData } from '../../Interfaces/ObservableData';
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';

@Injectable()
@Component({
    'providers': [UploadedTemplate]
})
export class UploadedTemplatesService implements ObservableData {
    /**
     * @type Observable<UploadedTemplate[]
     */
    private uploadedTemplates$: Observable<UploadedTemplate[]>;

    /**
     * @type {Array}
     */
    private uploadedTemplates: UploadedTemplate[] = [];

    private uploadedTemplatesObserver: any;


    constructor () {
        this.uploadedTemplates$ = new Observable((observer) => {
            this.uploadedTemplatesObserver = observer;
        });

        this.uploadedTemplates$.subscribe((result) => {
            this.uploadedTemplates = result;
        });
    }

    /**
     * @param template
     */
    public addTemplate (template: UploadedTemplate): void {
        this.uploadedTemplates.push(template);
        this.uploadedTemplatesObserver.next(this.uploadedTemplates);
    }

    /**
     * @returns {Observable<UploadedTemplate[]>}
     */
    public getObserver (): Observable<UploadedTemplate[]> {
        return this.uploadedTemplates$;
    }

    public getUploadedTemplates (): void {
        this.uploadedTemplatesObserver.next(this.uploadedTemplates);
    }
}