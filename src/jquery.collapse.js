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
    _this.options = options;
    _this.sections = [];
    _this.isAccordion = options.accordion || false;

    // For every pair of elements in given
    // element, create a section
    _this.$el.children(":odd").each(function() {
      _this.sections.push(new Section($(this), _this));
    });

    // Wrap in private scope to
    // to preserve 'sections' property
    (function(scope) {

      var scope = scope;
      _this.$el.on("click", "[data-collapse-summary]", $.proxy(_this.handleClick, scope));

    }(_this));
  }

  Collapse.prototype = {

    handleClick: function(e) {

      e.preventDefault();

      var sections = this.sections,
          parent = $(e.target).parent(),
          l = sections.length;
      while(l--) {
        if(sections[l].$summary.find("a").is(e.target)) {
          sections[l].toggle();
          break;
        }
      }
    },
    open : function(eq) {

      if(typeof eq == "number") {
        return this.sections[eq].open();
      }
      $.each(this.sections, function() {
        this.open();
      });
    },
    close: function(eq) {

      if(typeof eq == "number") {
        return this.sections[eq].close();
      }
      $.each(this.sections, function() {
        this.close();
      });
    }
  };

  // Section constructor
  function Section($el, parent) {

    var _this = this;
    $.extend(_this, {
      isOpen : false,
      $summary : $el
        .prev()
        .attr("data-collapse-summary", "")
        .wrapInner('<a href="#"/>'),
      $details : $el,
      firstRun : true,
      options: parent.options,
      parent: parent
    });
    _this.close();
  }

  Section.prototype = {
    toggle : function() {
      this.isOpen ? this.close() : this.open();
    },
    close: function() {
      if($.isFunction(this.options.hide) && !this.firstRun) {
        this.options.hide.apply(this.$details);
      } else {
        this.$details.hide();
      }
      this.$details.attr("aria-hidden", true);
      this.$summary.addClass("closed").removeClass("open");
      this.isOpen = false;
      this.firstRun = false;
      this.parent.$el.trigger("close", this);
    },
    open: function() {
      if(this.options.accordion) {
        $.each(this.parent.sections, function() {
          this.close();
        });
      }
      if($.isFunction(this.options.show)) {
        this.options.show.apply(this.$details)
      } else {
        this.$details.show();
      }
      this.$details.attr("aria-hidden", false);
      this.$summary.addClass("open").removeClass("closed");
      this.isOpen = true;
      this.parent.$el.trigger("open", this);
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
        var options = {
          accordion: $(this).attr("data-collapse") == "accordion" ? true : false
        }
        new jQueryCollapse($(this), options).$el;
      });
    }
  });

  //jQuery DOM Ready
  $(function() {
    $.fn.collapse(true)
  });

}(window.jQuery);
