<h2>Редактирование шаблонов:</h2>
<navigation-tab [tabs]="navigationTabItems"></navigation-tab>
<div id="myTabContent" class="tab-content">
    <div class="tab-pane fade active in" id="overview">
        <banners-editor-overview></banners-editor-overview>
    </div>
    <div class="tab-pane fade" id="general">
        <banners-editor-general-settings></banners-editor-general-settings>
    </div>
    <div
            class="tab-pane fade"
            *ngFor="#template of uploadedTemplates; #i = index"
            [id]="'main-navigation-tab-' + i"
    >
        <div class="panel panel-default">
            <table class="table table-bordered">
                <tr *ngIf="template.hasLogo()">
                    <td>
                        <img
                                class="img-responsive centered"
                                [src]="template.getLogoPath()"
                                [alt]="template.getName()"
                        >
                    </td>
                </tr>
                <tr>
                    <td>
                        <img
                                class="img-responsive centered"
                                [src]="template.getFullPath()"
                                [alt]="template.getName()"
                        >
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>