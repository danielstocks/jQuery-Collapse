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
  function Collapse (el, options) {

    var _this = this,
        options = options || {},
        err;

    err = !(el instanceof $) ? "'el' argument must be a jQuery object" : null // not working properly?
    err = (el.length < 1) ? "'el' must contain a DOM element" : null
    if(err) throw new TypeError(err);

    _this.$el = el;
    _this.sections = [];
    _this.isAccordion = options.accordion || false;

    // For every pair of elements in given
    // element, create a section
    _this.$el.children(":odd").each(function() {
      _this.sections.push(new Section($(this)));
    });

    // Wrap in private scope to
    // to preserve 'sections' property
    (function(_this) { 

      var _this = _this;
      _this.$el.on("click", $.proxy(_this.handleClick, _this));
      _this.$el.bind("open", $.proxy(_this.open, _this));
      _this.$el.bind("close", $.proxy(_this.close, _this));

    }(_this));
  }

  Collapse.prototype = {

    handleClick: function(e) {

      e.preventDefault();

      var sections = this.sections,
          p = $(e.target).parent();

      // Allow for closing an open accordion option
      if($(p).hasClass("open") && this.isAccordion) return p.trigger("close");

      // If accordion close all sections
      if(this.isAccordion) this.$el.trigger("close");

      var l = sections.length;
      while(l--) {
        if(sections[l].$summary.find("a").is(e.target)) {
          sections[l].toggle();
          break;
        }
      }
    },
    open : function(e, eq) {
      if(typeof eq == "number") {
        if(this.isAccordion) this.$el.trigger("close");
        return this.sections[eq].open();
      }
      if(this.isAccordion) return this.$el.trigger("close");
      $.each(this.sections, function() {
        this.open();
      });
    },
    close: function(e, eq) {
      if(typeof eq == "number") {
        return this.sections[eq].close();
      }
      $.each(this.sections, function() {
        this.close();
      });
    }
  };

  // Section constructor
  function Section($el) {

    var _this = this;
    $.extend(_this, {
      'isOpen' : false,
      '$summary' : $el
        .prev()
        .wrapInner('<a href="#"/>'),
      '$details' : $el
    });
    _this.close();
  }

  Section.prototype = {
    toggle : function() {
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
      return nodes.each(function() {
        new jQueryCollapse($(this)).$el;
      });
    }
  });

  //jQuery DOM Ready
  $($.fn.collapse(true));

}(window.jQuery);
