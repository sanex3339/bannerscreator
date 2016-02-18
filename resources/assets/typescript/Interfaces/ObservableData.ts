import { Observable, Subject } from 'rxjs';

export interface ObservableData <T> {
    /**
     * @param addSubject
     * @param createSubject
     */
    onDataAdded <T>(addSubject: Subject<T>, createSubject: Subject<T>): void;

    /**
     * @param createSubject
     * @param updateSubject
     */
    onDataCreated <T>(createSubject: Subject<T>, updateSubject: Subject<T>): void;

    /**
     * @param updateSubject
     * @param observer
     */
    onDataUpdated <T>(updateSubject: Subject<T>, observer: Observable<any>): void;

    /**
     * @param operation
     */
    setDataOperation (operation: ObservableDataOperation<T>): void;
}

export interface ObservableDataOperation <T> extends Function {
    (dataItem: T): (dataArray: T[]) => T[];
}
