import { Component, Injectable } from 'angular2/core';
import { Observable, Subject } from 'rxjs';
import { ObservableData, ObservableDataOperation } from '../../Interfaces/ObservableData'
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';
import * as _ from 'underscore';

@Injectable()
export class UploadedTemplatesService <T extends UploadedTemplate> implements ObservableData {
    /**
     * @type {Subject<UploadedTemplate>}
     */
    private dataAddSubject: Subject<T> = new Subject<T>();

    /**
     * @type {Subject<UploadedTemplate>}
     */
    private dataCreateSubject: Subject<T> = new Subject<T>();

    /**
     * @type {Subject<UploadedTemplate>}
     */
    private dataProviderSubject: Subject<T[]> = new Subject<T[]>();

    /**
     * @type {Subject<any>}
     */
    private dataUpdateSubject: Subject<T> = new Subject<T>();

    /**
     * @type {Array}
     */
    private uploadedTemplates: Observable<T[]>;

    constructor () {
        this.uploadedTemplates = Observable.of([]);

        this.onDataAdd(this.dataAddSubject, this.dataCreateSubject);
        this.onDataCreate(this.dataCreateSubject, this.dataUpdateSubject);
        this.onDataUpdate(this.dataUpdateSubject, this.uploadedTemplates);
        this.onDataProcessed();
    }

    /**
     * @param template
     */
    public addTemplate (template: T): void {
        this.dataAddSubject.next(template);
    }

    /**
     * @returns {Observable<T[]>}
     */
    public getUploadedTemplates (): Observable<T[]> {
        return this.uploadedTemplates;
    }

    /**
     * @param addSubject
     * @param createSubject
     */
    public onDataAdd (addSubject: Subject<T>, createSubject: Subject<T>): void {
        addSubject.subscribe(createSubject);
    }

    /**
     * @param createSubject
     * @param updateSubject
     */
    public onDataCreate (createSubject: Subject<T>, updateSubject: Subject<T>): void {
        createSubject
            .map((template: T): any => {
                return (templates: T[]) => {
                    return _.uniq(
                        templates.concat(template),
                        (template: T) => {
                            return template.getName()
                        }
                    );
                };
            })
            .subscribe(updateSubject);
    }

    /**
     */
    public onDataProcessed (): void {
        this.dataProviderSubject
            .subscribe((result) => {
                this.uploadedTemplates = Observable.of(result);
            });
    };

    /**
     * @param updateSubject
     * @param observer
     */
    public onDataUpdate (updateSubject: Subject<T>, observer: Observable<T[]>): void {
        updateSubject
            .scan((templates: T[], operation: any) => {
                return operation(templates);
            }, [])
            .publishReplay(1)
            .refCount()
            .subscribe(this.dataProviderSubject);
    }
}