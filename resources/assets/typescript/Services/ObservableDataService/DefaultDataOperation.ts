import { ObservableDataOperation } from "../../Interfaces/ObservableData";

export const DEFAULT_DATA_OPERATION: ObservableDataOperation<any> = <T>(dataItem: T) => {
    return (dataArray: T[]) => {
        return dataArray.concat(dataItem);
    }
};