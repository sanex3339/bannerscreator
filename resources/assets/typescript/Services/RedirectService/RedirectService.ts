import { Component, Injectable } from 'angular2/core';
import { Observable } from "rxjs/Observable";
import { Router } from 'angular2/router';
import 'rxjs/Rx';

@Injectable()
export class RedirectService {
    /**
     * @type Router
     */
    private router: Router;

    constructor (router: Router) {
        this.router = router;
    }

    /**
     * Redirect on given link route
     *
     * @param link
     * @param delay
     */
    public redirect (link: string, delay: number = 800): void {
        Observable
            .of(true)
            .delay(delay)
            .subscribe((success) => {
                this.navigate([link]);
            });
    }

    /**
     * Navigate to given route
     *
     * @param linkParams
     * @returns {Promise<any>}
     */
    private navigate (linkParams: any[]): Promise<any> {
        return this.router.navigate(linkParams);
    }
}