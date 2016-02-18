import { Component, Injectable } from 'angular2/core';
import { Collection } from '../../Interfaces/Collection';
import { Observable } from 'rxjs/Observable'
import { ObservableDataService } from "../ObservableDataService/ObservableDataService";
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';
import * as _ from 'underscore';

@Injectable()
@Component({
    'providers': [ObservableDataService]
})
export class UploadedTemplatesService implements Collection {
    private observableDataService: ObservableDataService<UploadedTemplate>;

    constructor (
        observableDataService: ObservableDataService<UploadedTemplate>
    ) {
        this.observableDataService = observableDataService;
        this.observableDataService.setDataOperation(
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
     * @param template
     */
    public set (template: UploadedTemplate): void {
        this.observableDataService.setData(template);
    }

    /**
     * @returns {Observable<T[]>}
     */
    public get (): Observable<UploadedTemplate[]> {
        return this.observableDataService.getData();
    }
}