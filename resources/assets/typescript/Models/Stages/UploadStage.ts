import { ApplicationStage } from '../../Interfaces/ApplicationStage';

export class UploadStage implements ApplicationStage{
    public stageCondition (): boolean {
        return true;
    }
}