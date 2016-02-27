<split-view>
    <split-view-container title="Изображение шаблона">
        <img
                class="img-responsive center-block"
                [src]="templateData.getFullPath()"
                [alt]="templateData.getName()"
                [style.max-width.px]="templateData.getWidth()"
                [style.height.px]="templateData.getHeight()"
        >
    </split-view-container>
    <split-view-container title="Превью шаблона">
        <banners-previewer
                class="center-block banner-previewer"
                [style.max-width.px]="templateData.getWidth()"
                [style.height.px]="templateData.getHeight()"
                [format]="format"
        ></banners-previewer>
    </split-view-container>
</split-view>
test
<input type="text" [(ngModel)]="bannerSpecificStyles.banner.background" (keyup)="onInputChange($event)">
<br>
<input type="text" [(ngModel)]="bannerSpecificStyles.banner.opacity" (keyup)="onInputChange($event)">