/*!
 * Collapse plugin for jQuery
 * http://github.com/danielstocks/jQuery-Collapse/
 *
 * @author Daniel Stocks (http://webcloud.se)
 * @version 0.3
 * @updated 3-JULY-2010 
 * 
 * Copyright 2010, Daniel Stocks
 * Released under the MIT, BSD, and GPL Licenses.
 */
 
(function($) {
    
    // Use a cookie counter to allow multiple instances of the plugin
    var cookieCounter = 0;
    
    $.fn.extend({
        collapse: function(options) {
            
            var defaults = {
                open : false,
                head : "h3",
                group : "div, ul",
                cookieName : "collapse",
                // Default function for showing content
                show: function() { 
                    this.show();
                },
                // Default function for hiding content
                hide: function() { 
                    this.hide();
                }
            };
            var op = $.extend(defaults, options);
            
            return this.each(function() {
                
                // Increment coookie counter to ensure cookie name integrity
                cookieCounter++;
                var obj = $(this),
                    // Default CSS classes
                    active = "active",
                    inactive = "inactive",
                    // Find all headers and wrap them in <a> for accessibility.
                    sections = obj.find(op.head).addClass(inactive).wrapInner('<a href="#">'),
                    l = sections.length,
                    cookie = op.cookieName + "_" + cookieCounter;
                    // Locate all panels directly following a header
                    var panel = obj.find(op.head).map(function() {
                        return $(this).next(op.group).hide()[0];
                    });
    
                // Bind event for showing content
                obj.bind("show", function(e, bypass) {
                    var obj = $(e.target);
                    // ARIA attribute for accessability 
                    obj.attr('aria-hidden',false)
                        .prev()
                        .find("a")
                        .removeClass(inactive)
                        .addClass(active);
                    // Sometimes we want to bypass the custom show function
                    // and just show the content right away.
                    if(bypass) {
                        obj.show();
                    } else {
                        op.show.call(obj);
                    }
                });

                // Bind event for hiding content
                obj.bind("hide", function(e, bypass) {
                    var obj = $(e.target);
                    obj.attr('aria-hidden',true)
                        .prev()
                        .find("a")
                        .removeClass(active)
                        .addClass(inactive);
                    if(bypass) {
                        obj.hide();
                    } else {
                        op.hide.call(obj);
                    }
                });

                // Content that is expanded by default
                if(op.open) {
                    panel.trigger('show',[true]);
                }
                
                // Look for existing cookies
                if(cookieSupport) {
                    for (var c=0;c<=l;c++) {
                        var val = $.cookie(cookie + c);
                        // Show content if associating cookie is found
                        if ( val == c + "open" ) {
                            panel.eq(c).trigger('show',[true]);
                        // Hide content
                        } else if ( val == c + "closed") {
                            panel.eq(c).trigger('hide',[true])
                        }
                    }
                }
                
                // Delegate click event to show/hide content
                obj.bind("click", function(e) {
                    e.preventDefault();
                    var t = $(e.target);
                    // Make sure header anchor is clicked else do nothing
                    if(!t.is("h3 a")) {
                        return false;
                    }
                    // Figure out what position the clicked header has.
                    var num = sections.index(t.parent()),
                        cookieName = cookie + num,
                        cookieVal = num,
                        content = t.parent().next(op.group);
                    // If content is already active, hide it.
                    if(t.hasClass(active)) {
                        content.trigger('hide');
                        cookieVal += 'closed';
                        if(cookieSupport) {
                            $.cookie(cookieName, cookieVal, { path: '/', expires: 10 });
                        }
                        return;
                    }
                    // Else show it.
                    content.trigger('show');
                    cookieVal += 'open';
                    if(cookieSupport) {
                        $.cookie(cookieName, cookieVal, { path: '/', expires: 10 });
                    }
                });
            });
        }
    });

    // Make sure can we eat cookies without getting into trouble.
    var cookie = true;
    $(function() {
        try {
            $.cookie('test', 'testVal', { path: '/', expires: 10 });
        }
        catch(e) {
            cookie = false;
            $.cookie('test', null);
        }
    });
    var cookieSupport = $.fn.collapse.cookieSupport = cookie;

})(jQuery);