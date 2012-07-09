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

    err = !(el instanceof $) ? "'el' argument must be a jQuery object" : null
    err = (el.length < 1) ? "'el' must contain a DOM element" : null
    if(err) throw new TypeError(err);

    _this.$el = el;
    _this.options = options;
    _this.sections = [];
    _this.isAccordion = options.accordion || false;
    _this.db = options.persist ? new _Storage(el[0].id) : false;
    _this.states = _this.db ? _this.db.read() : [];

    // For every pair of elements in given
    // element, create a section
    _this.$el.children(":odd").each(function() {

      var section = new Section($(this), _this);
      _this.sections.push(section);
      _this.states[section._index()] ? section.open(true) : section.close(true);
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

    $.extend(this, {
      isOpen : false,
      $summary : $el
        .prev()
        .attr("data-collapse-summary", "")
        .wrapInner('<a href="#"/>'),
      $details : $el,
      options: parent.options,
      parent: parent
    });
  }

  Section.prototype = {
    toggle : function() {
      this.isOpen ? this.close() : this.open();
    },
    close: function(bypass) {
      if($.isFunction(this.options.hide) && !bypass) {
        this.options.hide.apply(this.$details);
      } else {
        this.$details.hide();
      }
      this.$details.attr("aria-hidden", true);
      this.$summary.addClass("closed").removeClass("open");
      this.isOpen = false;
      this.parent.$el.trigger("close", this);
      if(this.parent.db) {
        this.parent.db.write(this._index(),0);
      }
    },
    open: function(bypass) {

      if(this.options.accordion && !bypass) {
        $.each(this.parent.sections, function() {
          this.close();
        });
      }
      if($.isFunction(this.options.show) && !bypass) {
        this.options.show.apply(this.$details)
      } else {
        this.$details.show();
      }
      this.$details.attr("aria-hidden", false);
      this.$summary.addClass("open").removeClass("closed");
      this.isOpen = true
      this.parent.$el.trigger("open", this);
      if(this.parent.db) {
        this.parent.db.write(this._index(),1);
      }
    },
    _index: function() {
      return this.parent.sections.indexOf(this);
    }
  }

  var STORAGE_KEY = "jQuery-Collapse";

  function _Storage(id) {
    this.id = id;
    this.db = window.localStorage;
    this.data = [];
  }
  _Storage.prototype = {
    write: function(position, state) {
      var _this = this;
      _this.data[position] = state;
      // Pad out data array with zero values
      $.each(_this.data, function(i) {
        if(typeof _this.data[i] == 'undefined') {
          _this.data[i] = 0;
        }
      });
      var obj = this.getDataObject();
      obj[this.id] = this.data;
      this.db.setItem(STORAGE_KEY, JSON.stringify(obj));
    },
    read: function() {
      var obj = this.getDataObject();
      return obj[this.id] || [];
    },
    getDataObject: function() {
      var string = this.db.getItem(STORAGE_KEY);
      return string ? JSON.parse(string) : {}
    }
  }

  // Expose constructor to
  // global namespace
  jQueryCollapse = Collapse;
  jQueryCollapseStorage = _Storage;

  // Add shortcut method
  // to jQuery API
  $.fn.extend({
    collapse: function(scan) {
      var nodes = (scan) ? $("body").find("[data-collapse]") : $(this);
      return nodes.each(function() {
        var
          options = {},
          values = $(this).attr("data-collapse") || "";
        $.each(values.split(" "), function(i,v) {
          options[v] = true;
        });
        new jQueryCollapse($(this), options).$el;
      });
    }
  });

  //jQuery DOM Ready
  $(function() {
    $.fn.collapse(true)
  });

}(window.jQuery);
