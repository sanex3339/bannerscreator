///<reference path='../_declare/jquery.d.ts'/>

module ADVM.Teaser {
    export class Teaser {
        private _id:string;
        private _wrapperId:string;
        private _prefix:string;
        private _selectors:any;

        /**
         * @param id
         * @param prefix
         */
        constructor(id:string = '1', prefix:string = 'amts') {
            this._id = id;
            this._prefix = prefix;
            this._wrapperId = `#${this._prefix}-${id}`;
            this._selectors = {
                wrapper: `${this._wrapperId}.${this._prefix}`,
                table: `${this._wrapperId} .ts-table`,
                tr: `${this._wrapperId} .ts-tr`,
                td: `${this._wrapperId} .ts-td`,
                posWrapper: `${this._wrapperId} .ts-pos-wrapper`,
                teaser: `${this._wrapperId} .ts-teaser`,
                teaserInner: `${this._wrapperId} .ts-teaser-inner`,
                imageBlock: `${this._wrapperId} .ts-img-b`,
                image: `${this._wrapperId} .ts-img`,
                text: `${this._wrapperId} .ts-text`,
                textLink: `${this._wrapperId} .ts-text a`
            };
        }

        /**
         * @returns {string}
         */
        getId():string {
            return this._id;
        }

        /**
         * @returns {string}
         */
        getPrefix():string {
            return this._prefix;
        }

        /**
         * @returns {any}
         */
        getSelectors():any {
            return this._selectors;
        }

        /**
         * @returns {string}
         */
        getWrapperId():string {
            return this._wrapperId;
        }

        showTeaser():void {
            $(this._wrapperId).css('display', 'block');
        }

        /**
         * Аппендим jQuery, если она не используется на сайте.
         *
         * @param callback
         */
        static appendJQuery(callback:() => void):void {
            let head:any,
                script:any;

            if (!(<JQueryWindow>window).jQuery) {
                head = document.getElementsByTagName('head')[0];
                script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js';

                script.onreadystatechange = function () {
                    if (this.readyState === 'complete') {
                        callback();
                    }
                };

                script.onload = function () {
                    callback();
                };

                head.appendChild(script);
            } else {
                jQuery(document).ready(() => {
                    callback();
                });
            }
        }
    }
}