import { AppInjector } from '../AppInjector';
import { ApplicationStage } from '../Interfaces/ApplicationStage';
import { ApplicationStageService } from '../Services/ApplicationStageService/ApplicationStageService';
import { Injector } from 'angular2/core';
import { Stage } from '../Enums/Stage';

/**
 * @param stageType
 * @param applicationStage
 * @constructor
 */
export const SetStage = (stageType: Stage, applicationStage: ApplicationStage) => {
    let injector: Injector = AppInjector(),
        applicationStageService: ApplicationStageService = injector.get(ApplicationStageService);

    applicationStageService.setStage(stageType, applicationStage);
};