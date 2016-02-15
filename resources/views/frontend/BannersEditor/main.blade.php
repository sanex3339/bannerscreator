<h2>Редактирование шаблонов:</h2>
<navigation-tab [tabs]="navigationTabItems"></navigation-tab>
<div class="tab-content">
    <banners-editor-overview id="overview" class="tab-pane fade active in">Просмотр</banners-editor-overview>
    <banners-editor-general id="general" class="tab-pane fade">Общие настройки</banners-editor-general>
    <banners-editor-template
        class="tab-pane fade"
        *ngFor="#tab of navigationTabItemsDynamic; #i = index"
        [id]="tab.selector"
        [templateData]="uploadedTemplates[i]"
    ></banners-editor-template>
</div>