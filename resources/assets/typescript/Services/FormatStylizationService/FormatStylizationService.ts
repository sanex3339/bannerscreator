import { BannerData } from '../../Models/BannerData/BannerData';

export class FormatStylizationService {
    private bannerData: BannerData;

    constructor (bannerData: BannerData) {
        this.bannerData = bannerData;
    }

    public applyFormatStyles (): void {
        this.applyDimensions();
    }

    /**
     * Apply width and height styles which depends on banner border width
     */
    private applyDimensions (): void {
        this.bannerData.setSpecificStyle('banner', 'width', this.bannerData.getWidth().toString());
        this.bannerData.setSpecificStyle('banner', 'height', this.bannerData.getHeight().toString());
    }
}