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
                open : false,
                inactive : "inactive",
                active : "active",
                head : "h3",
                group : "ul",
                speed : 100,
                cookie : "collapse"
            };
            
            // Set a cookie counter so we dont get cookie name collisions
            var op = $.extend(defaults, options);
                cookie_counter = 0;
                
            // Internal method for showing 
            var _show = function(el) {
                $.each(el, function() {
                    $(this).show().prev().removeClass(op.inactive).addClass(op.active);
                });
            }
            
            // Internal method for hiding
            var _hide = function(el) {
                $.each(el, function() {
                    $(this).hide().prev().removeClass(op.active).addClass(op.inactive);
                }); 
            }
                
            return this.each(function() {
                
                // Increment cookie name counter
                cookie_counter++;

                var obj = $(this),
                    sections = obj.find(op.head).addClass(op.inactive),
                    panel = obj.find(op.group).hide(),
                    l = sections.length,
                    cookie = op.cookie + "_" + cookie_counter;

                // Open by default
                if(op.open) {
                    _show(panel);
                }
                
                // Look for existing cookies
                for (c=0;c<=l;c++) {
                    var val = $.cookie(cookie + c);
                    if ( val == c + "open" ) {
                        _show(panel.eq(c));
                    } else if ( val == c + "closed") {
                        _hide(panel.eq(c))
                    }
                };
                sections.click(function(e) {
                    e.preventDefault();
                    var num = sections.index(this),
                        cookieName = cookie + num,
                        cookieVal = num,
                        ul = $(this).next(op.group);
                    // Hide
                    if($(this).hasClass(op.active)) {
                        _hide(ul.slideUp(op.speed));
                        cookieVal += 'closed'
                        $.cookie(cookieName, cookieVal, { path: '/', expires: 10 });
                        return;
                    }
                    // Show
                    _show(ul.slideDown(op.speed));
                    cookieVal += 'open';
                    $.cookie(cookieName, cookieVal, { path: '/', expires: 10 });
                });
            });
        }
    });
})(jQuery);