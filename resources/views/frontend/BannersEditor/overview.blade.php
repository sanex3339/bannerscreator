<div
        class="panel panel-default"
        *ngFor="#template of uploadedTemplates"
>
    <div class="panel-heading">
        @{{ template.getName() }}
    </div>
    <table class="table table-bordered">
        <tr *ngIf="template.hasLogo()">
            <td>
                <img
                        class="img-responsive center-block"
                        [src]="template.getLogoPath()"
                        [alt]="template.getName()"
                >
            </td>
        </tr>
        <tr>
            <td>
                <img
                        class="img-responsive center-block"
                        [src]="template.getFullPath()"
                        [alt]="template.getName()"
                >
            </td>
        </tr>
    </table>
</div>