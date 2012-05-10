/*
 * Collapse plugin for jQuery
 * --
 * code: http://github.com/danielstocks/jQuery-Collapse/
 * docs: http://webcloud.se/code/jQuery-Collapse
 *
 * @author Daniel Stocks (http://webcloud.se)
 * Copyright 2012, Daniel Stocks
 * Released under the MIT, BSD, and GPL Licenses.
 */

!function($) {

  // Constructor
  function Collapse (el) {

    var _this = this,
        err;

    err = !(el instanceof $) ? "'el' argument must be a jQuery object" : null
    err = (el.length < 1) ? "'el' must contain a DOM element" : null
    if(err) throw new TypeError(err);

    _this.$el = el;
    _this.sections = [];

    // For every pair of elements in given
    // element, create a section
    _this.$el.children(":odd").each(function() {
      _this.sections.push(new Section($(this)));
    });
  }

  // Section constructor
  function Section($el) {

    var _this = this;
    $.extend(_this, {
      'isOpen' : false,
      '$summary' : $el
        .prev()
        .wrapInner('<a href="#"/>')
        .bind('click', $.proxy(_this.handleClick, _this)),
      '$details' : $el
    });
    _this.close();
  }

  Section.prototype = {
    handleClick : function(e) {
      e.preventDefault();
      this.isOpen ? this.close() : this.open();
    },
    close: function() {
      this.$details.hide().attr("aria-hidden", true);
      this.$summary.addClass("closed").removeClass("open");
      this.isOpen = false;
    },
    open: function() {
      this.$details.show().attr("aria-hidden", false);
      this.$summary.addClass("open").removeClass("closed");
      this.isOpen = true;
    }
  }

  // Expose constructor to
  // global namespace
  jQueryCollapse = Collapse

  // Add shortcut method
  // to jQuery API
  $.fn.extend({
    collapse: function(scan) {
      var nodes = (scan) ? $("body").find("[data-collapse]") : $(this);
      nodes.each(function() {
        jQueryCollapse($(this));
      });
    }
  });

  //jQuery DOM Ready
  $($.fn.collapse(true));

}(window.jQuery);
