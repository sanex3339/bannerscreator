import { ApplicationStage } from '../../Interfaces/ApplicationStage';

export class UploadStage implements ApplicationStage{
    /**
     * @returns {boolean}
     */
    public stageCondition (): boolean {
        return true;
    }
}