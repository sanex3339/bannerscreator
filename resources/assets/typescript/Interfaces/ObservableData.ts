import { Observable } from 'rxjs/Observable';

export interface ObservableData {
    onDataAdd (): void;
    onDataCreate (): void;
    onDataUpdate (): void;
}