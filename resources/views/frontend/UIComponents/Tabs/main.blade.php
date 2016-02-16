<ul class="nav nav-tabs bottom-space">
    <li
            *ngFor="#tab of tabs"
            [class.active]="tab.isActive()"
            (click)="selectTab(tab)"
    >
        <a
                data-toggle="tab"
                aria-expanded="false"
        >
            @{{ tab.getTitle() }}
        </a>
    </li>
</ul>
<div class="tab-content">
    <ng-content></ng-content>
</div>