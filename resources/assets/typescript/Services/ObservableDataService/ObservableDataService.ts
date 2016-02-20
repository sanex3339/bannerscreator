import { DEFAULT_DATA_OPERATION } from "./DefaultDataOperation";
import { Injectable } from 'angular2/core';
import { Observable, Subject } from 'rxjs';
import { ObservableData, ObservableDataOperation } from '../../Interfaces/ObservableData'

@Injectable()
export class ObservableDataService <T> implements ObservableData <T> {
    /**
     * @type {Subject<T>}
     */
    private dataAddSubject: Subject<T> = new Subject<T>();

    /**
     * @type {Subject<T>}
     */
    private dataCreateSubject: Subject<T> = new Subject<T>();

    /**
     * @type {ObservableDataOperation<T>}
     */
    private dataOperation: ObservableDataOperation<T> = DEFAULT_DATA_OPERATION;

    /**
     * @type {Subject<any>}
     */
    private dataUpdateSubject: Subject<T> = new Subject<T>();

    /**
     * @type {Array}
     */
    private data: Observable<T[]> = Observable.of([]);

    constructor () {
        this.onDataAdded(this.dataAddSubject, this.dataCreateSubject);
        this.onDataCreated(this.dataCreateSubject, this.dataUpdateSubject);
        this.data = this.onDataUpdated(this.dataUpdateSubject);
        this.data.subscribe();
    }

    /**
     * @param data
     */
    public setData (data: T): void {
        this.dataAddSubject.next(data);
    }

    /**
     * @returns {Observable<T[]>}
     */
    public getData (): Observable<T[]> {
        return this.data;
    }

    /**
     * @param addSubject
     * @param createSubject
     */
    public onDataAdded (addSubject: Subject<T>, createSubject: Subject<T>): void {
        addSubject.subscribe(createSubject);
    }

    /**
     * @param createSubject
     * @param updateSubject
     */
    public onDataCreated (createSubject: Subject<T>, updateSubject: Subject<T>): void {
        createSubject
            .map((data: T): any => {
                return this.dataOperation(data);
            })
            .subscribe(updateSubject);
    }

    /**
     * @param updateSubject
     */
    public onDataUpdated (updateSubject: Subject<T>): Observable<T[]> {
        return updateSubject
            .scan((data: T[], operation: any) => {
                return operation(data);
            }, [])
            .publishReplay(1)
            .refCount();
    }

    /**
     * @param operation
     */
    public setDataOperation (operation: ObservableDataOperation<T>) {
        this.dataOperation = operation;
    }
}