import { Subject } from 'rxjs';
import { ObservableDataService } from "../ObservableDataService/ObservableDataService";

export class BannersDataService {
    /**
     * @type {string}
     */
    private key: string = 'test_key';

    /**
     * @type {Subject<any>}
     */
    private styles: Subject<any> = new Subject<any>();

    /**
     * @type {string}
     */
    private title: string = 'test_title';

    constructor () {}

    /**
     * @returns {string}
     */
    public getKey (): string {
        return this.key;
    }

    /**
     * @returns {Subject<any>}
     */
    public getStyles (): Subject<any> {
        return this.styles;
    }

    /**
     * @returns {string}
     */
    public getTitle (): string {
        return this.title;
    }
}