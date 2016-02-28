import { Observable, Subject } from 'rxjs';

export class StylesService {
    /**
     * @type {Subject<Object>}
     */
    private stylesSubject: Subject<Object> = new Subject<Object>();

    /**
     * @type {Observable<Object>}
     */
    private styles: Observable<Object> = new Observable<Object>();

    /**
     * @type {{}}
     */
    private _styles: Object = {};

    constructor () {
        this.styles = this.onDataUpdated(this.stylesSubject);
        this.styles.subscribe();
    }

    /**
     * @returns {Observable<Object>}
     */
    public getStyles (): Observable<Object> {
        return this.styles;
    }

    /**
     * @param clazz
     * @param styles
     */
    public setClassStyles (clazz: string, styles: Object): void {
        this._styles[clazz] = styles;

        this.stylesSubject.next(this._styles);
    }

    /**
     * @param clazz
     * @param styleName
     * @param styleValue
     */
    public setStyle (clazz: string, styleName: string, styleValue: string): void {
        if (!this._styles[clazz]) {
            this._styles[clazz] = {};
        }

        this._styles[clazz][styleName] = styleValue;

        this.stylesSubject.next(this._styles);
    }

    /**
     * @param styles
     */
    public setStyles (styles: Object): void {
        this._styles = styles;

        this.stylesSubject.next(this._styles);
    }

    /**
     * @param stylesSubject
     * @returns {Observable<Object>}
     */
    private onDataUpdated (stylesSubject: Subject<Object>): Observable<Object> {
        return stylesSubject
            .asObservable()
            .publishReplay(1)
            .refCount();
    }
}