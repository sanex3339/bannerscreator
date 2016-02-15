<table class="table table-bordered">
    <tr *ngIf="templateData.hasLogo()">
        <td>
            <img
                    class="img-responsive centered"
                    [src]="templateData.getLogoPath()"
                    [alt]="templateData.getName()"
            >
        </td>
    </tr>
    <tr>
        <td>
            <img
                    class="img-responsive centered"
                    [src]="templateData.getFullPath()"
                    [alt]="templateData.getName()"
            >
        </td>
    </tr>
</table>