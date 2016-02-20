import { Injectable } from 'angular2/core';
import { Collection } from '../../Interfaces/Collection';
import { ObservableToStorage } from '../../Decorators/ObservableToStorage';
import { Observable } from 'rxjs/Observable'
import { ObservableDataService } from "../ObservableDataService/ObservableDataService";
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';
import * as _ from 'underscore';

@Injectable()
export class UploadedTemplatesService implements Collection {
    /**
     * @type ObservableDataService<UploadedTemplate>
     */
    private observableDataService: ObservableDataService<UploadedTemplate>;

    /**
     * @type {Observable<UploadedTemplate[]>}
     */
    @ObservableToStorage(
        'uploaded-templates',
        (templates: UploadedTemplate[]): UploadedTemplate[] => {
            return templates.map((template: UploadedTemplate): UploadedTemplate => {
                if (template instanceof UploadedTemplate) {
                    return template;
                }

                return new UploadedTemplate(
                    template['name'],
                    template['path'],
                    template['extension'],
                    template['logo']
                );
            })
        }
    )
    private uploadedTemplates: Observable<UploadedTemplate[]> = Observable.of([]);

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
        this.uploadedTemplates = this.observableDataService.getData();
    }

    /**
     * @returns {Observable<T[]>}
     */
    public get (): Observable<UploadedTemplate[]> {
        return this.uploadedTemplates;
    }
}