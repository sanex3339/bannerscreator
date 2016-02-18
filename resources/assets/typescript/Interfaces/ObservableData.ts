import { Observable, Subject } from 'rxjs';

export interface ObservableData <T> {
    /**
     * @param addSubject
     * @param createSubject
     */
    onDataAdd <T>(addSubject: Subject<T>, createSubject: Subject<T>): void;

    /**
     * @param createSubject
     * @param updateSubject
     */
    onDataCreate <T>(createSubject: Subject<T>, updateSubject: Subject<T>): void;

    /**
     */
    onDataProcessed <T>(): void;

    /**
     * @param updateSubject
     * @param observer
     */
    onDataUpdate <T>(updateSubject: Subject<T>, observer: Observable<any>): void;

    /**
     * @param operation
     */
    setDataOperation (operation: ObservableDataOperation<T>): void;
}

export interface ObservableDataOperation <T> extends Function {
    (dataItem: T): (dataArray: T[]) => T[];
}
