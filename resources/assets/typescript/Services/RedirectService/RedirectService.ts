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
    public async redirect (link: string, delay: number = 800): Promise<any> {
        await this.delay(delay);
        this.router.navigate([link]);
    }

    /**
     * Timeout delay
     *
     * @param delay
     */
    private delay (delay: number): Promise<any> {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
}