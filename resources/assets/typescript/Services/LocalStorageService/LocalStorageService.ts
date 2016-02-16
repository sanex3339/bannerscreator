import { Component, Injectable } from 'angular2/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class LocalStorageService {
    constructor () {
        console.log(1);
    }

    public static getItem (key: string) {
        localStorage.getItem(key);
    }

    public static setItem (key: string, value: any): void {
        localStorage.setItem(key, value);
    }
}