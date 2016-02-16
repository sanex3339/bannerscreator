<h2>Редактирование шаблонов:</h2>
<tabs>
    <tab tab-title="Просмотр">
        <banners-editor-overview>Просмотр</banners-editor-overview>
    </tab>
    <tab tab-title="Общие настройки">
        <banners-editor-general>Общие настройки</banners-editor-general>
    </tab>
    <tab
            *ngFor="#template of uploadedTemplates"
            [tab-title]="template.getName()"
    >
        <banners-editor-template [templateData]="template"></banners-editor-template>
    </tab>
</tabs>