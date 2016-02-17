import { Component, Injectable } from 'angular2/core';
import { Observable, Subject } from 'rxjs';
import { ObservableData } from '../../Interfaces/ObservableData'
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';

@Injectable()
@Component({
    'providers': [UploadedTemplate]
})
export class UploadedTemplatesService implements ObservableData {
    /**
     * @type {Subject<UploadedTemplate>}
     */
    private dataAddSubject: Subject<UploadedTemplate> = new Subject<UploadedTemplate>();

    /**
     * @type {Subject<UploadedTemplate>}
     */
    private dataCreateSubject: Subject<UploadedTemplate> = new Subject<UploadedTemplate>();

    /**
     * @type {Subject<any>}
     */
    private dataUpdateSubject: Subject<any> = new Subject<any>();

    /**
     * @type {Array}
     */
    private uploadedTemplates: Observable<UploadedTemplate[]>;

    constructor () {
        this.uploadedTemplates = Observable.of([]);

        this.onDataAdd();
        this.onDataCreate();
        this.onDataUpdate();
    }

    /**
     * @param template
     */
    public addTemplate (template: UploadedTemplate): void {
        this.dataAddSubject.next(template);
    }

    /**
     * @returns {Observable<UploadedTemplate[]>}
     */
    public getUploadedTemplates (): Observable<UploadedTemplate[]> {
        return this.uploadedTemplates;
    }

    public onDataAdd (): void {
        this.dataAddSubject
            .subscribe(this.dataCreateSubject);
    }

    public onDataCreate (): void {
       this.dataCreateSubject
            .map((template: UploadedTemplate) => {
                return (templates: UploadedTemplate[]) => {
                    return templates.concat(template);
                };
            })
            .subscribe(this.dataUpdateSubject);
    }

    public onDataUpdate (): void {
        this.dataUpdateSubject
            .scan((templates: UploadedTemplate[], operation) => {
                return operation(templates);
            }, [])
            .publishReplay(1)
            .refCount()
            .subscribe((result) => {
                this.uploadedTemplates = Observable.of(result);
            });
    }
}