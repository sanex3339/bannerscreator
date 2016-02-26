///<reference path='../_declare/jquery.d.ts'/>

module ADVM.Teaser {
    export class StyleManager {
        private _patches:any = {};
        private _selectors:any;
        private _teaserObject:Teaser;
        private _teasersInRow:number;
        private _wrapperId:string;

        private static _defaultStyles:any = {
            wrapper: {
                'padding': '20px',
                'background': '#fff'
            },
            table: {
                'width': '100%',
                'overflow': 'hidden',
                'margin': '0px',
                'padding': '0px',
                'border-collapse': 'collapse',
                'border-spacing': '0'
            },
            tr: {
                'margin': '0px',
                'padding': '0px'
            },
            td: {
                'vertical-align': 'top',
                'margin': '0px',
                'padding': '0px'
            },
            posWrapper: {
                'display': 'inline-block',
                'width': '100%',
                'height': '100%',
                'text-align': 'center'
            },
            teaser: {
                'display': 'inline-block',
                'vertical-align': 'middle',
                'box-sizing': 'border-box',
                'width': '100%',
                'height': '100%',
                'margin': '0',
                'padding': '10px',
                'overflow': 'hidden'
            },
            teaserInner: {
                'width': 'auto',
                'height': '100%',
                'padding': '10px',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'border-width': '2px',
                'border-style': 'solid',
                'border-color': '#909090',
                'background': '#f0f0f0'
            },
            imageBlock: {
                'display': 'table-cell',
                'float': 'left',
                'width': '120px',
                'height': '120px',
                'padding': '0px',
                'overflow': 'hidden',
                'border-width': '2px',
                'border-style': 'solid',
                'border-color': 'blue',
                'border-radius': '5px'
            },
            image: {
                'width': '100%',
                'height': '100%',
                'border-style': 'none',
                'display': 'block'
            },
            text: {
                'display': 'table-cell',
                'box-sizing': 'border-box',
                'padding': '10px',
                'text-align': 'left',
                'vertical-align': 'middle'
            },
            textLink: {
                'font-size': '16px',
                'color': '#4a80ff',
                'font-weight': 'bold'
            }
        };

        /**
         * @param teaserObject
         */
        constructor(teaserObject:Teaser) {
            this._teaserObject = teaserObject;
            this._selectors = this._teaserObject.getSelectors();
            this._wrapperId = this._teaserObject.getWrapperId();
        }

        /**
         * Получаем ajax'ом объект со стилями и патчами стилей и аппендим все это дело к разметке группы тизеров.
         */
        appendAjaxStyles():void {
            /* метод для теста */
            this._teasersInRow = this._getTeasersInRowCount();

            this._getAjaxStyles((stylesObject) => {
                this.appendStyles($.extend(true, StyleManager._defaultStyles, stylesObject.styles));
                this.appendPatches(stylesObject.patches);
            });
        }

        /**
         * @param stylesObject
         */
        appendStyles(stylesObject:any):void {
            let elem:string,
                hoverStyles:any,
                styles:any;

            for (let element in stylesObject) {
                styles = stylesObject[element];
                hoverStyles = {};

                elem = this._selectors[element];

                for (let style in styles) {
                    if (typeof styles[style] !== 'object') {
                        $(elem).css(style, styles[style]);
                        continue;
                    }

                    switch (style) {
                        case 'hover':
                            hoverStyles = styles[style];
                            this._appendHoverStyles(elem, hoverStyles);

                            break;

                        default:
                            break;
                    }
                }
            }
        }

        /**
         * Возможность применять к стилям тизеров т.н. патчи - отдельные объекты,
         * в которых сгруппированы по смыслу стили для нескольких элементов.
         *
         * @param patch
         */
        appendPatch(patchName:string, patch:any):void {
            let patchedStyles:any;

            this._patches[patchName] = {
                defaultStyles: {},
                patchedStyles: patch
            };

            for (let element in patch) {
                patchedStyles = patch[element];
                this._patches[patchName]['defaultStyles'][element] = {};

                for (let style in patchedStyles) {
                    this._patches[patchName]['defaultStyles'][element][style] = $(this._selectors[element]).css(style);
                }
            }

            this.appendStyles(patch);
        }

        /**
         * Применяет несколько патчей, сгруппированных в один объект.
         *
         * @param patches
         */
        appendPatches(patches:any):void {
            for (let patch in patches) {
                this.appendPatch(patch, patches[patch]);
            }
        }

        /**
         * Удаляет стили патча, возвращая предшествующие патчу стили.
         *
         * @param patchName
         */
        removePatch(patchName):void {
            this.appendStyles(this._patches[patchName].defaultStyles);
        }

        /**
         * @param elem
         * @param hoverStyles
         */
        private _appendHoverStyles(elem, hoverStyles:any):void {
            let hoverResetStyles:any = {};

            for (let hoverStyle in hoverStyles) {
                hoverResetStyles[hoverStyle] = $(elem).css(hoverStyle);
            }

            $(elem).hover(
                function(hoverStyles) {
                    return function () {
                        $(this).css(hoverStyles)
                    };
                }(hoverStyles),
                function(hoverResetStyles) {
                    return function () {
                        $(this).css(hoverResetStyles)
                    };
                }(hoverResetStyles)
            );
        }

        /**
         * Тестовый метод
         *
         * @param count
         * @returns {number}
         */
        private _getCellWidth(count:number):number {
            return Math.round(100 / count);
        }

        /**
         * Получаем объект со стилями с сервера.
         * Заглушка.
         * TODO: сделать полную реализацию метода.
         *
         * @param callback
         */
        private _getAjaxStyles(callback:(styles:any) => void):any {
            let stylesObject:any = {
                styles: {
                    wrapper: {
                        'padding': '20px',
                        'background': '#fff'
                    },
                    table: {
                        'width': '100%',
                    },
                    td: {
                        'width': `${this._getCellWidth(this._teasersInRow)}%`,
                        'vertical-align': 'top',
                        'padding': '0px'
                    },
                    posWrapper: {
                        'width': '100%'
                    },
                    teaser: {
                        'padding': '10px'
                    },
                    teaserInner: {
                        'padding': '10px',
                        'border-width': '2px',
                        'border-style': 'solid',
                        'border-color': '#909090',
                        hover: {
                            'background': '#7efff5'
                        }
                    },
                    imageBlock: {
                        'float': 'left',
                        'width': '120px',
                        'height': '120px',
                        'margin': '0px',
                        'padding': '0px',
                        'border-width': '2px',
                        'border-style': 'solid',
                        'border-color': 'blue',
                        'border-radius': '5px',
                        hover: {
                            'border-color': 'yellow',
                            'transform': 'scale(1.05)'
                        }
                    },
                    text: {
                        'padding': '10px',
                        'text-align': 'left'
                    },
                    textLink: {
                        'font-size': '16px',
                        'color': '#4a80ff',
                        'font-weight': 'bold'
                    }
                },
                patches: {
                    /* Патч на картинку справа
                     positionPatch: {
                     imageBlock: {
                     'float': 'right'
                     }
                     }
                     */
                    /* Патч на картинку над текстом
                     positionPatch: {
                     imageBlock: {
                     'display': 'block',
                     'float': 'none',
                     'margin-left': 'auto',
                     'margin-right': 'auto'
                     },
                     text: {
                     'display': 'block',
                     'float': 'none',
                     'width': '100%',
                     'margin-left': 'auto',
                     'margin-right': 'auto',
                     'text-align': 'center'
                     },
                     }
                     */
                }
            };

            callback(stylesObject);
        }

        /**
         * Тестовый метод
         *
         * @returns {any}
         */
        private _getTeasersInRowCount():number {
            return $(`${this._wrapperId} tr`).first().children().length;
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