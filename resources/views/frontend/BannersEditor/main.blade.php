<h2>Редактирование шаблонов:</h2>
<div *ngFor="#template of uploadedTemplates">
    <h4>@{{ template.getName() }}</h4>
    <img
            [src]="template.getFullPath()"
            [alt]="template.getName()"
    >
</div>