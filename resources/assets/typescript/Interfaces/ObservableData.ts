import { Observable, Subject } from 'rxjs';

export interface ObservableData {
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
     * @param updateSubject
     * @param observer
     */
    onDataUpdate <T>(updateSubject: Subject<T>, observer: Observable<any>): void;
}