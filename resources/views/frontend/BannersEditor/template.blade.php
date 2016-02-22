<table class="table table-bordered">
    <tr>
        <th class="col-xs-6">
            Шаблон
        </th>
        <th class="col-xs-6">
            Превью
        </th>
    </tr>
    <tr>
        <td class="col-xs-6">
            <img
                    class="img-responsive center-block"
                    [src]="templateData.getFullPath()"
                    [alt]="templateData.getName()"
            >
        </td>
        <td class="col-xs-6">
            <banners-previewer
                    class="center-block banner-previewer"
                    [style.max-width.px]="templateData.getWidth()"
                    [style.height.px]="templateData.getHeight()"
            ></banners-previewer>
        </td>
    </tr>
</table>