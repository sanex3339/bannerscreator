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

    private dataOperation: ObservableDataOperation<T>;

    /**
     * @type {Subject<T[]>}
     */
    private dataProviderSubject: Subject<T[]> = new Subject<T[]>();

    /**
     * @type {Subject<any>}
     */
    private dataUpdateSubject: Subject<T> = new Subject<T>();

    /**
     * @type {Array}
     */
    private data: Observable<T[]>;

    constructor () {
        this.data = Observable.of([]);

        this.onDataAdd(this.dataAddSubject, this.dataCreateSubject);
        this.onDataCreate(this.dataCreateSubject, this.dataUpdateSubject);
        this.onDataUpdate(this.dataUpdateSubject, this.data);
        this.onDataProcessed();
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

    public setDataOperation (operation: ObservableDataOperation<T>) {
        this.dataOperation = operation;
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
            .map((data: T): any => {
                return this.dataOperation(data);
            })
            .subscribe(updateSubject);
    }

    /**
     */
    public onDataProcessed (): void {
        this.dataProviderSubject
            .subscribe((result) => {
                this.data = Observable.of(result);
            });
    };

    /**
     * @param updateSubject
     * @param observer
     */
    public onDataUpdate (updateSubject: Subject<T>, observer: Observable<T[]>): void {
        updateSubject
            .scan((data: T[], operation: any) => {
                return operation(data);
            }, [])
            .publishReplay(1)
            .refCount()
            .subscribe(this.dataProviderSubject);
    }
}