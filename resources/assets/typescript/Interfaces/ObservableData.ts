import { Observable } from 'rxjs/Observable';

export interface ObservableData {
    getObserver (): Observable<any>;
}