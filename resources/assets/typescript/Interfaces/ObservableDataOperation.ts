export interface ObservableDataOperation <T> extends Function {
    (dataItem: T): (dataArray: T[]) => T[];
}