import { Component, Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { UploadedTemplate } from '../../Models/UploadedTemplate/UploadedTemplate';

@Injectable()
@Component({
    'providers': [UploadedTemplate]
})
export class UploadedTemplatesService {
    private uploadedTemplates: UploadedTemplate[] = [];

    constructor () {}

    public addTemplate (template: UploadedTemplate): void {
        this.uploadedTemplates.push(template);
    }

    public getUploadedTemplates (): Observable<UploadedTemplate[]> {
        return Observable.of(this.uploadedTemplates);
    }
}