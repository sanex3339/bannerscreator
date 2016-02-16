import { Component, Injectable } from 'angular2/core';
import { UploadStage } from '../../Models/Stages/UploadStage';
import { EditStage } from '../../Models/Stages/EditStage';
import { Observable } from 'rxjs/Observable';
import { Stage } from '../../Enums/Stage';

@Injectable()
export class StageService {
    private stage: Stage;

    constructor () {}

    /**
     * Get current application stage
     *
     * @returns {Observable<T>}
     */
    public getStage (): Observable<Stage> {
        return Observable.of(this.stage);
    }

    /**
     * Set current application stage
     *
     * @param stage
     */
    public setStage (stage: Stage): void {
        this.stage = stage;
    }

    /**
     * Application stage condition
     *
     * @returns {Observable<T>}
     */
    public stageCondition (): Observable<boolean> {
        switch (this.stage) {
            case Stage.UploadStage:
                return Observable.of(UploadStage.condition());
            case Stage.EditStage:
                return Observable.of(EditStage.condition());
            default:
                return Observable.of(true);
        }
    }
}