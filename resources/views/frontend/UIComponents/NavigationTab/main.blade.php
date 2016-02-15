<ul class="nav nav-tabs bottom-space">
    <li *ngFor="#tab of tabs" [class]="tab.active ? 'active' : ''">
        <a
                data-toggle="tab"
                aria-expanded="false"
                [href]="'#' + tab.selector"
        >
            @{{ tab.name }}
        </a>
    </li>
</ul>