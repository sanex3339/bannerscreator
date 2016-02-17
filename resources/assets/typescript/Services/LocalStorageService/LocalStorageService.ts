import { Component, Injectable } from 'angular2/core';

@Injectable()
export class LocalStorageService {
    constructor () {
        console.log('LocalStorage service initialization');
    }

    /**
     * @param key
     * @returns {any}
     */
    public getItem (key: string): any {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }

    /**
     * @param key
     * @param value
     */
    public setItem (key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}