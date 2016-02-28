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
<input
        type="text"
        [value]="bannerData.getSpecificStyle('banner', 'background')"
        (keyup)="bannerData.setSpecificStyle('banner', 'background', $event.target.value)"
>
<br>
<input
        type="text"
        [value]="bannerData.getSpecificStyle('banner', 'borderColor')"
        (keyup)="bannerData.setSpecificStyle('banner', 'borderColor', $event.target.value)"
>