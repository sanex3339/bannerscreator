import { ApplicationStage } from '../../Interfaces/ApplicationStage';
import { Component, Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Stage } from '../../Enums/Stage';

@Injectable()
export class StageService {
    /**
     * Active application stage
     */
    private activeStage: Stage;

    /**
     * Array with all application stages
     *
     * @type {Array}
     */
    private stages: ApplicationStage[] = [];

    constructor () {}

    /**
     * Get current application stage
     *
     * @returns {Observable<T>}
     */
    public getStage (): Observable<Stage> {
        return Observable.of(this.activeStage);
    }

    /**
     * Add new application stage into stage list
     * Set current application stage
     *
     * @param stageType
     * @param applicationStage
     */
    public setStage (stageType: Stage, applicationStage: ApplicationStage): void {
        if (!this.stages[stageType]) {
            this.stages[stageType] = applicationStage;
        }

        this.activeStage = stageType;
    }

    /**
     * Application stage condition
     *
     * @returns {Observable<T>}
     */
    public stageCondition (): Observable<boolean> {
        return Observable.of(this.stages[this.activeStage].stageCondition());
    }
}