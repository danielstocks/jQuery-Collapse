/**
 * Collapse plugin for jQuery
 * ---
 * @author Daniel Stocks (http://webcloud.se)
 * @version 0.1
 * @updated 28-APR-2010
 * ---
 * Note: For cookie support you need 
 * the cookie plugin from here: http://plugins.jquery.com/project/cookie
 * ---
 */
 
 (function($) {
    $.fn.extend({
        collapse: function(options) {
            
            var defaults = {
                inactive : "inactive",
                active : "active",
                head : "h3",
                group : "ul",
                speed : 100,
                cookie : "collapse"
            };
            
            // Set a cookie counter so we dont get name collisions
            var op = $.extend(defaults, options);
                cookie_counter = 0;
                
            return this.each(function() {
                
                // Increment cookie name counter
                cookie_counter++;

                var obj = $(this),
                    sections = obj.find(op.head).addClass(op.inactive),
                    panel = obj.find(op.group).hide(),
                    l = sections.length,
                    cookie = op.cookie + "_" + cookie_counter;
                
                // Look for existing cookies
                for (c=0;c<=l;c++) {
                    var cvalue = $.cookie(cookie + c);
                    if ( cvalue == 'open' + c ) {
                        panel.eq(c).show();
                        panel.eq(c).prev().removeClass(op.inactive).addClass(op.active);
                    };
                };
                sections.click(function(e) {
                    e.preventDefault();
                    var num = sections.index(this);
                    var cookieName = cookie + num;
                    var ul = $(this).next(op.group);
                    // If item is open, slide up 
                    if($(this).hasClass(op.active)) {
                        ul.slideUp(op.speed);
                        $(this).removeClass(op.active).addClass(op.inactive);
                        $.cookie(cookieName, null, { path: '/', expires: 10 });
                        return
                    }
                    // Else slide down
                    ul.slideDown(op.speed);
                    $(this).addClass(op.active).removeClass(op.inactive);
                    var cookieValue = 'open' + num;
                    $.cookie(cookieName, cookieValue, { path: '/', expires: 10 });
                });
            });
        }
    });
})(jQuery);