(function($){
    
    $(function(){
        $('body').append('<div id="ok-bg"></div>');
        $('#ok-bg').css({
            width : '100%',
            height : '100%',
            background : 'scroll 150% 150% repeat',
            zIndex : -1,
            position : 'fixed',
            top : 0,
            left : 0
        });
    });
    
    $.okhover = function(el, options){
        var base = this;       
        base.$el = $(el);
        base.el = el;        
        base.$el.data("okhover", base);
        
        base.init = function(){            
            base.options = $.extend({}, $.okhover.options, options);
            base.build();
        };
        
        base.build = function(){
            if ($('#ok-bg').length == 0) {
                throw new Error('Failed to attach the ok-bg div to the DOM');
            } else {
                base.start();
            }
        };
        
        base.start = function () {
            var background = $("#ok-bg");
            
            if (base.options.fadeIn) background.hide();
            if (base.options.zIndex) background.css('zIndex', base.options.zIndex);

            base.$el.bind({
                mouseover: function(){                    
                    $(this).mousemove(function(e){
                        background.css('backgroundPosition', e.pageX + 'px ' + e.pageY + 'px');
                    });

                    background.css('backgroundImage', 'url(' + $(this).attr('data-okimage') + ')');

                    if (base.options.fadeIn) background.stop().fadeTo(base.options.fadeInDuration, 1);
                },
                mouseout: function(){
                    if (base.options.fadeOut) background.stop().fadeTo(base.options.fadeOutDuration, 0, function() { $(this).css('backgroundImage', '').hide() });
                    else background.css('backgroundImage', '').hide();
                }
            });
        };
            
        base.init();
    };
    
    $.okhover.options = { 
        fadeIn: false,
        fadeOut: false,
        fadeInDuration: 400,
        fadeOutDuration: 400,
        zIndex: null
    };
    
    $.fn.okhover = function(options){
        return this.each(function(){
            (new $.okhover(this, options));            
        });
    };
    
})(jQuery);