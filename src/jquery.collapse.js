/**
 * Collapse plugin for jQuery
 * ---
 * @author Daniel Stocks (http://webcloud.se)
 * @version 0.2
 * @updated 30-JUN-2010
 * ---
 * Note: For cookie support you need to include
 * the cookie plugin from here: http://plugins.jquery.com/project/cookie
 * ---
 * Project Page & Documentation:
 * http://github.com/danielstocks/jQuery-Collapse/
 */
 
(function($) {
    
    function Collapse(obj) {

        this.obj = obj;
    }
    Collapse.prototype = {

        show : function() {

        },
        hide : function() {

        }
    }
    
    $.fn.extend({
        collapse: function(options) {
            
            var defaults = {
                open : false,
                inactive : "inactive",
                active : "active",
                head : "h3",
                group : "ul, div",
                speed : 100,
                cookieID : "collapse",
                disableCookie : false
            };
            
            var op = $.extend(defaults, options),
                cookie_counter = 0;
                cookieEnable = false;
            
            // Is cookie support available?    
            if($.cookie) {
                var cookieEnable = true;
            }
            // Or disabled by user?
            if(op.disableCookie) {
                cookieEnable = false;
            }
            
            // Reference to the object
            var obj = $(this);
            
            // Event for showing
            obj.bind("show", function(e, el) {
                $.each(el, function() {
                    $(this).show().prev().removeClass(op.inactive).addClass(op.active);
                });
            });
            
            // event method for hiding
            obj.bind("hide", function(e, el) {
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
                // Delegate click event to show/hide content
                obj.bind("click", function(e) {
                    e.preventDefault();
                    var t = $(e.target);
                    if(!t.is(op.head)) {
                        return false;
                    }
                    var num = sections.index(this),
                        cookieName = cookie + num,
                        cookieVal = num,
                        content = t.next(op.group);
                    // Hide
                    if(t.hasClass(op.active)) {
                        content.slideUp(op.speed, function() {
                            content.trigger('hide', [content]);
                        })
                        cookieVal += 'closed';
                        if(cookieEnable) {
                            $.cookie(cookieName, cookieVal, { path: '/', expires: 10 });
                        }
                        return;
                    }
                    // Show
                    content.slideDown(op.speed, function() {
                        content.trigger('show', [content]);
                    });
                    cookieVal += 'open';
                    if(cookieEnable) {
                        $.cookie(cookieName, cookieVal, { path: '/', expires: 10 });
                    }
                });
            });
        }
    });
})(jQuery);