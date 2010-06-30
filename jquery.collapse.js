/**
 * Collapse plugin for jQuery
 * ---
 * @author Daniel Stocks (http://webcloud.se)
 * @version 0.1
 * @updated 28-JUN-2010
 * ---
 * Note: For cookie support you need to include
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
                cookieID : "collapse",
                disableCookie : false
            };
            
            var op = $.extend(defaults, options),
                cookie_counter = 0;
                cookieEnable = false;
                
            if($.cookie) {
                var cookieEnable = true;
            }
            if(op.disableCookie) {
                cookieEnable = false;
            }
            
            // Event for showing
            $(this).bind("show", function(e, el) {
                $.each(el, function() {
                    $(this).show().prev().removeClass(op.inactive).addClass(op.active);
                });
            });
            
            // event method for hiding
            $(this).bind("hide", function(e, el) {
                $.each(el, function() {
                    $(this).hide().prev().removeClass(op.active).addClass(op.inactive);
                }); 
            });
                
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
                    $(this).trigger('show', [panel]);
                }
                
                // Look for existing cookies
                if(cookieEnable) {
                    for (c=0;c<=l;c++) {
                        var val = $.cookie(cookie + c);
                        if ( val == c + "open" ) {
                             $(this).trigger('show', [panel.eq(c)]);
                        } else if ( val == c + "closed") {
                            $(this).trigger('hide', [panel.eq(c)])
                        }
                    }
                }
                sections.bind("click", function(e) {
                    e.preventDefault();
                    var num = sections.index(this),
                        cookieName = cookie + num,
                        cookieVal = num,
                        ul = $(this).next(op.group);
                    // Hide
                    if($(this).hasClass(op.active)) {
                        ul.slideUp(op.speed, function() {
                            $(this).trigger('hide', [$(this)]);
                        })
                        cookieVal += 'closed';
                        if(cookieEnable)
                            $.cookie(cookieName, cookieVal, { path: '/', expires: 10 });
                        return;
                    }
                    // Show
                    ul.slideDown(op.speed, function() {
                        $(this).trigger('show', [$(this)]);
                    });
                    cookieVal += 'open';
                    if(cookieEnable)
                        $.cookie(cookieName, cookieVal, { path: '/', expires: 10 });
                });
            });
        }
    });
})(jQuery);