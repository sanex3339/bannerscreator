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
<div class="row">
    <div class="form-group">
        <div class="col-xs-3">
            <label for="bannerBackground">Background</label>
            <input
                    type="text"
                    id="bannerBackground"
                    class="form-control"
                    style-changer
                    [style-changer-format]="format"
                    style-changer-class="banner"
                    style-changer-style="background"
            >
        </div>
        <div class="col-xs-3">
            <label for="bannerBorderColor">Border Color</label>
            <input
                    type="text"
                    id="bannerBorderColor"
                    class="form-control"
                    style-changer
                    [style-changer-format]="format"
                    style-changer-class="banner"
                    style-changer-style="borderColor"
            >
        </div>
    </div>
</div>