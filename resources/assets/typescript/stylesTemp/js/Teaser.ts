///<reference path='_declare/jquery.d.ts'/>
///<reference path='_classes/Teaser.ts'/>
///<reference path='_classes/StyleManager.ts'/>

module ADVM.Teaser {
    Teaser.appendJQuery(() => {
        var settings:any = {
            prefix: 'amts',
        };

        $(`.${settings.prefix}`).each(function() {
            let id:string = $(this).attr('id').split('-')[1],
                teaserStyleManager:StyleManager,
                teaser:Teaser;

            teaser = new Teaser(id, settings.prefix);
            teaserStyleManager = new StyleManager(teaser);
            teaserStyleManager.appendAjaxStyles();
            teaser.showTeaser();
        });
    });
}