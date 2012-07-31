/*
 * Collapse plugin for jQuery
 * --
 * source: http://github.com/danielstocks/jQuery-Collapse/
 * site: http://webcloud.se/code/jQuery-Collapse
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
      query = options.query || "> :even",
      err;

    err = !(el instanceof $) ? 
      "'el' argument must be a jQuery object" : null;
    err = (el.length < 1) ?
      "'el' must contain a DOM element" : null;
    if(err) throw new TypeError(err);

    _this.$el = el;
    _this.options = options;
    _this.sections = [];
    _this.isAccordion = options.accordion || false;
    _this.db = options.persist ? new jQueryCollapseStorage(el[0].id) : false;
    _this.states = _this.db ? _this.db.read() : [];

    // For every pair of elements in given
    // element, create a section
    _this.$el.find(query).each(function() {

      var section = new Section($(this), _this);
      _this.sections.push(section);
      _this.states[section._index()] || $(this).hasClass("open") ?
        section.open(true) : section.close(true);
    });

    // Wrap in private scope to
    // to preserve 'sections' property
    (function(scope) {

      var scope = scope;
      _this.$el.on("click", "[data-collapse-summary]", 
        $.proxy(_this.handleClick, scope));

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

    $.extend(this, {
      isOpen : false,
      $summary : $el
        .attr("data-collapse-summary", "")
        .wrapInner('<a href="#"/>'),
      $details : $el.next(),
      options: parent.options,
      parent: parent
    });
  }

  Section.prototype = {
    toggle : function() {
      this.isOpen ? this.close() : this.open();
    },
    close: function(bypass) {
      var _this = this;
      if($.isFunction(_this.options.hide) && !bypass) {
        _this.options.hide.apply(_this.$details);
      } else {
        _this.$details.hide();
      }
      _this.$details.attr("aria-hidden", true);
      _this.$summary.addClass("closed").removeClass("open");
      _this.isOpen = false;
      _this.parent.$el.trigger("close", _this);
      if(_this.parent.db) {
        _this.parent.db.write(_this._index(),0);
      }
    },
    open: function(bypass) {

      var _this = this;
      if(_this.options.accordion && !bypass) {
        $.each(_this.parent.sections, function() {
          this.close();
        });
      }
      if($.isFunction(_this.options.show) && !bypass) {
        _this.options.show.apply(_this.$details)
      } else {
        _this.$details.show();
      }
      _this.$details.attr("aria-hidden", false);
      _this.$summary.addClass("open").removeClass("closed");
      _this.isOpen = true
      _this.parent.$el.trigger("open", _this);
      if(_this.parent.db) {
        _this.parent.db.write(_this._index(),1);
      }
    },
    _index: function() {
      return this.parent.sections.indexOf(this);
    }
  }

  // Add shortcut method
  // to jQuery API
  $.fn.extend({
    collapse: function(options, scan) {
      var nodes = (scan) ? $("body").find("[data-collapse]") : $(this);
      return nodes.each(function() {
        var settings = (scan) ? {} : options,
          values = $(this).attr("data-collapse") || "";
        $.each(values.split(" "), function(i,v) {
          if(v) settings[v] = true;
        });
        new jQueryCollapse($(this), settings).$el;
      });
    }
  });

  //jQuery DOM Ready
  $(function() {
    $.fn.collapse(false, true)
  });

  // Expose constructor to
  // global namespace
  jQueryCollapse = Collapse;

}(window.jQuery);
