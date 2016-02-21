import { ObservableDataOperation } from "../../Interfaces/ObservableDataOperation";

export const DEFAULT_DATA_OPERATION: ObservableDataOperation<any> = <T>(dataItem: T) => {
    return (dataArray: T[]) => {
        return dataArray.concat(dataItem);
    }
};