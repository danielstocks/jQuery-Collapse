(function($) {
    $.fn.extend({
        collapse: function() {
            
            var obj = $(this);
            var inactive = "inactive"
            var active = "active"

            var sections = obj.find("h2").addClass(inactive),
                panel = obj.find("ul").hide(),
                l = sections.length;
            for (c=0;c<=l;c++) {
                var cvalue = $.cookie('panel' + c);
                if ( cvalue == 'open' + c ) {
                    panel.eq(c).css({display:"block"});
                    panel.eq(c).prev().removeClass(inactive).addClass(active);
                };
            };
            sections.toggle(function() {
                var num = sections.index(this);
                var cookieName = 'panel' + num;
                var ul = $(this).next("ul");
                if($(this).hasClass(active)) {
                    ul.slideUp("fast");
                    $(this).removeClass(active).addClass(inactive);
                    $.cookie(cookieName, null, { path: '/', expires: 10 });
                    return
                }
                ul.slideDown("fast");
                $(this).addClass(active).removeClass(inactive);
                var cookieValue = 'open' + num;
                $.cookie(cookieName, cookieValue, { path: '/', expires: 10 });
            }, function() {
                var num = sections.index(this);
                var cookieName = 'panel' + num;
                var ul = $(this).next("ul");
                if($(this).hasClass(inactive)) {
                    ul.slideDown("fast");
                    $(this).addClass(active).removeClass(inactive); 
                    var cookieValue = 'open' + num;
                    $.cookie(cookieName, cookieValue, { path: '/', expires: 10 });
                    return
                }
                ul.slideUp("fast");
                $(this).removeClass(active).addClass(inactive);;
                $.cookie(cookieName, null, { path: '/', expires: 10 });
            });   
        }
    });
})(jQuery);