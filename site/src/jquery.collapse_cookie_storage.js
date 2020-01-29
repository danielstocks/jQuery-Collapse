/*
 * Cookie Storage for jQuery Collapse
 * --
 * source: http://github.com/danielstocks/jQuery-Collapse/
 * site: http://webcloud.se/jQuery-Collapse
 *
 * @author Daniel Stocks (http://webcloud.se)
 * Copyright 2013, Daniel Stocks
 * Released under the MIT, BSD, and GPL Licenses.
 */

(function($) {

  var cookieStorage = {
    expires: function() {
      var now = new Date();
      return now.setDate(now.getDate() + 1);
    }(),
    setItem: function(key, value) {
      document.cookie = key + '=' + value + '; expires=' + this.expires +'; path=/';
    },
    getItem: function(key) {
      key+= "=";
      var item = "";
      $.each(document.cookie.split(';'), function(i, cookie) {
        while (cookie.charAt(0)==' ') cookie = cookie.substring(1,cookie.length);
        if(cookie.indexOf(key) === 0) {
          item = cookie.substring(key.length,cookie.length);
        }
      });
      return item;
    }
  };

  $.fn.collapse.cookieStorage = cookieStorage;

})(jQuery);
