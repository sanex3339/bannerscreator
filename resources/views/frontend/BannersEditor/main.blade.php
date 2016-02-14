<h2>Редактирование шаблонов:</h2>
<div *ngFor="#template of uploadedTemplates">
    <h4>@{{ template.getName() }}</h4>
    <img
            class="img-responsive centered"
            [src]="template.getFullPath()"
            [alt]="template.getName()"
    >
</div>