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

        this.onDataAdd<UploadedTemplate>(this.dataAddSubject, this.dataCreateSubject);
        this.onDataCreate<UploadedTemplate>(this.dataCreateSubject, this.dataUpdateSubject);
        this.onDataUpdate<UploadedTemplate>(this.dataUpdateSubject, this.uploadedTemplates);
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

    /**
     * @param addSubject
     * @param createSubject
     */
    public onDataAdd <T>(addSubject: Subject<T>, createSubject: Subject<T>): void {
        addSubject.subscribe(createSubject);
    }

    /**
     * @param createSubject
     * @param updateSubject
     */
    public onDataCreate <T>(createSubject: Subject<T>, updateSubject: Subject<T>): void {
       createSubject
            .map((template: T) => {
                return (templates: T[]) => {
                    return templates.concat(template);
                };
            })
            .subscribe(updateSubject);
    }

    /**
     * @param updateSubject
     * @param observer
     */
    public onDataUpdate <T>(updateSubject: Subject<T>, observer: Observable<any>): void {
        updateSubject
            .scan((templates: T[], operation) => {
                return operation(templates);
            }, [])
            .publishReplay(1)
            .refCount()
            .subscribe((result) => {
                observer = Observable.of(result);
            });
    }
}