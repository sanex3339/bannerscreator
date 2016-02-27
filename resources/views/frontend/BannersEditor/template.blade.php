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
<input type="text" (keyup)="bannerData.setSpecificStyle('banner', 'background', $event.target.value)">
<br>
<input type="text" (keyup)="bannerData.setSpecificStyle('banner', 'opacity', $event.target.value)">