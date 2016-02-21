import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable'
import { ObservableDataService } from "../ObservableDataService/ObservableDataService";
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';
import * as _ from 'underscore';

@Injectable()
export class UploadedTemplatesService extends ObservableDataService<UploadedTemplate> {
    constructor () {
        super();

        super.setDataOperation(
            (template: UploadedTemplate) => {
                return (templates: UploadedTemplate[]) => {
                    return _.uniq(
                        templates.concat(template),
                        (template:UploadedTemplate) => {
                            return template.getName()
                        }
                    )
                }
            }
        );
    }

    /**
     * @returns {Observable<T[]>}
     */
    public get (): Observable<UploadedTemplate[]> {
        return super.getData();
    }

    /**
     * @param template
     */
    public set (template: UploadedTemplate): void {
        super.setData(template);
    }
}