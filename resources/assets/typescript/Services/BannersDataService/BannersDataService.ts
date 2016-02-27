import { Observable } from 'rxjs';
import { BannerData } from "../../Models/BannerData/BannerData";
import { ObservableDataService } from "../ObservableDataService/ObservableDataService";
import * as _ from 'underscore';

export class BannersDataService extends ObservableDataService<BannerData> {
    constructor () {
        super();

        super.setDataOperation(
            (bannerData: BannerData) => {
                return (bannersData: BannerData[]) => {
                    return _.uniq(
                        bannersData.concat(bannerData),
                        (bannerData: BannerData) => {
                            return bannerData.getFormat
                        }
                    )
                }
            }
        );
    }

    /**
     * @returns {Observable<T[]>}
     */
    public get (): Observable<BannerData[]> {
        return super.getData();
    }

    /**
     * Returns Observable<BannerData[]> with one item, associated with given format.
     *
     * @param format
     * @returns {Observable<T[]>}
     */
    public getByFormat (format: string): Observable<BannerData[]> {
        return super.getData()
            .map((bannersData: BannerData[]) => {
                return bannersData.filter((bannerData: BannerData) => {
                    return bannerData.getFormat() === format;
                });
            });
    }

    /**
     * @param bannerData
     */
    public set (bannerData: BannerData): void {
        super.setData(bannerData);
    }
}