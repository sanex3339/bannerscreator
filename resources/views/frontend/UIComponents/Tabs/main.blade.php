<ul class="nav nav-tabs bottom-space">
    <li
            *ngFor="#tab of tabs"
            [class.active]="tab.isActive()"
            (click)="selectTab(tab)"
    >
        <a href="#" (click)="false">
            @{{ tab.getTitle() }}
        </a>
    </li>
</ul>
<div class="tab-content">
    <ng-content></ng-content>
</div>