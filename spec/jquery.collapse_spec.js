(function() {

  buster.spec.expose();

  describe("jQuery Collapse", function() {
    describe('exposure', function() {
      it("should expose constructor function", function() {
        return expect(jQueryCollapse).toBeFunction();
      });
      return it("should be exposed in jQuery API", function() {
        return expect($.fn.collapse).toBeDefined();
      });
    });
    describe("setup", function() {
      before(function() {
        this.el = $(document.createElement('div'));
        return this.jq = new jQueryCollapse(this.el);
      });
      it("should assign an element", function() {
        return expect(this.jq.$el).toBe(this.el);
      });
      it("should not have an accordion", function() {
        return expect(this.jq.isAccordion).toBe(false);
      });
      it("should not have a db", function() {
        return expect(this.jq.db).toBe(false);
      });
      it("should have a 'sections' property", function() {
        return expect(this.jq.sections).toEqual([]);
      });
      return it("should have a 'states' property", function() {
        return expect(this.jq.states).toEqual([]);
      });
    });
    describe('initializing elements with data-collapse attribute', function() {
      before(function() {
        /*:DOC+= <div data-collapse></div>
        */

        /*:DOC+= <div data-collapse></div>
        */

        /*:DOC+= <div id="test2"></div>
        */
        return this.jq = this.stub(window, "jQueryCollapse");
      });
      it("should call the jQueryCollapse constructor twice", function() {
        $.fn.collapse(false, true);
        return expect(this.jq).toHaveBeenCalledTwice();
      });
      return it("should call the jQuery Collapse constructor once", function() {
        $("#test2").collapse();
        return expect(this.jq).toHaveBeenCalledOnce();
      });
    });
    describe('initializing plugin with data-collapse accordion', function() {
      before(function() {
        /*:DOC+= <div data-collapse="accordion"></div>
        */
        return this.jq = this.stub(window, "jQueryCollapse");
      });
      return it("should call the constructor with accordion option set to true", function() {
        var obj;
        obj = $("div").get(0);
        $.fn.collapse(false, true);
        return expect(this.jq).toHaveBeenCalledWith($(obj), {
          accordion: true
        });
      });
    });
    describe('initializing plugin with data-collapse persist', function() {
      before(function() {
        /*:DOC+= <div data-collapse="persist"></div>
        */
        return this.jq = this.stub(window, "jQueryCollapse");
      });
      return it("should call the constructor with persist option set to true", function() {
        var obj;
        obj = $("div").get(0);
        $.fn.collapse(false, true);
        return expect(this.jq).toHaveBeenCalledWith($(obj), {
          persist: true
        });
      });
    });
    describe('sections', function() {
      before(function() {
        /*:DOC+=<div id="test">
          <h1>Section 1</h1> <div>hello 1</div>
          <h2>Section 2</h2> <span>hello 2</span>
          <h3 class="open">Section 3</h3> <div>hello 3</div>
        </div>
        */
        return this.jq = new jQueryCollapse($("#test"));
      });
      it("should create a section for every group of two child elements", function() {
        return expect(this.jq.sections.length).toEqual(3);
      });
      it("the last section should be opened by default", function() {
        return expect(this.jq.sections[2].isOpen).toBe(true);
      });
      return describe('the first section', function() {
        before(function() {
          this.summary = this.jq.sections[0].$summary;
          return this.details = this.jq.sections[0].$details;
        });
        it("should be a h1 element", function() {
          return expect(this.summary.get(0).tagName).toEqual("H1");
        });
        it("should wrap the inner text with a <a> element", function() {
          return expect(this.summary.get(0).innerHTML).toEqual('<a href="#">Section 1</a>');
        });
        it("should add data-collap-summary attribute to details", function() {
          return expect(this.summary.attr("data-collapse-summary")).toBeDefined();
        });
        it("should have div as 'details' for the first section", function() {
          return expect(this.details.get(0).tagName).toEqual("DIV");
        });
        describe('closed section', function() {
          it("should hide the details", function() {
            return expect(this.details.get(0).style.display).toEqual("none");
          });
          it("should set aria-hidden to true on details", function() {
            return expect(this.details.attr("aria-hidden")).toEqual("true");
          });
          it("should have a 'close' CSS class on summary", function() {
            return expect(this.summary.hasClass('close')).toBe(true);
          });
          return it("should not have a 'open' CSS class on summary", function() {
            return expect(this.summary.hasClass('open')).toBe(false);
          });
        });
        describe('open section', function() {
          before(function() {
            return this.jq.sections[0].open();
          });
          it("details should be visible", function() {
            return expect(this.details.get(0).style.display).toEqual("block");
          });
          it("details should have ARIA attribute hidden set to false", function() {
            return expect(this.details.attr("aria-hidden")).toEqual("false");
          });
          it("should have a 'open' CSS class on summary", function() {
            return expect(this.summary.hasClass('open')).toBe(true);
          });
          return it("should not have a 'close' CSS class on summary", function() {
            return expect(this.summary.hasClass('close')).toBe(false);
          });
        });
        return describe('user interaction', function() {
          return describe('clicking a summary', function() {
            it("should prevent default behaviour", function() {
              var event;
              event = {
                preventDefault: this.spy()
              };
              this.jq.handleClick(event);
              return expect(event.preventDefault).toHaveBeenCalledOnce();
            });
            it("should open the corresponding section if it's closed", function() {
              var stub;
              this.jq.sections[0].close();
              stub = this.stub(this.jq.sections[0], "open");
              this.summary.find("a").trigger("click");
              return expect(stub).toHaveBeenCalledOnce();
            });
            it("should close the corresponding section if it's open", function() {
              var stub;
              this.jq.sections[0].open();
              stub = this.stub(this.jq.sections[0], "close");
              this.summary.find("a").trigger("click");
              return expect(stub).toHaveBeenCalledOnce();
            });
            return it("should not fire handleClick on links inside collapsed content", function() {
              /*:DOC+=<div id="test-click">
                <h3>Section 3</h3>
                <div>
                  hello 3 <a id="test-link" href="#test-link">test link</a>
                </div>
              </div>
              */

              var stub;
              stub = this.stub(jQueryCollapse.prototype, "handleClick");
              this.jq2 = new jQueryCollapse($("#test-click"));
              $("#test-link").trigger("click");
              return expect(stub).not.toHaveBeenCalledOnce();
            });
          });
        });
      });
    });
    describe('Custom options', function() {
      before(function() {
        /*:DOC+=<div id="test-options">
          <h1>Section 1</h1> <div>hello 1</div>
        </div>
        */
        this.close = this.spy();
        this.open = this.spy();
        return this.jq = new jQueryCollapse($("#test-options"), {
          close: this.close,
          open: this.open
        });
      });
      it('should fire the custom open function once', function() {
        this.jq.open();
        return expect(this.open).toHaveBeenCalledOnce();
      });
      return it('should fire the custom close function once', function() {
        this.jq.open();
        this.jq.close();
        return expect(this.close).toHaveBeenCalledOnce();
      });
    });
    describe('Custom query', function() {
      before(function() {
        /*:DOC+=<div class="test" id="test-custom-query">
          <div><h1>Section 1</h1> <div>hello 1</div></div>
          <div><h2>Section 2</h2> <span>hello 2</span></div>
          <div><h3>Section 3</h3> <div>hello 3</div></div>
        </div>
        */
        return this.jq = new jQueryCollapse($("#test-custom-query"), {
          query: 'div > :header'
        });
      });
      return it("should use custom query to interpret markup", function() {
        expect(this.jq.sections[0].$summary.text()).toBe("Section 1");
        return expect(this.jq.sections[0].$details.text()).toBe("hello 1");
      });
    });
    describe('Events', function() {
      before(function() {
        /*:DOC+=<div class="test" id="test4">
          <h1>Section 1</h1> <div>hello 1</div>
          <h2>Section 2</h2> <span>hello 2</span>
          <h3>Section 3</h3> <div>hello 3</div>
        </div>
        */
        return this.jq = new jQueryCollapse($("#test4"));
      });
      it("should fire the callback when opening", function() {
        var spy;
        spy = this.spy();
        this.jq.$el.bind("open", spy);
        this.jq.open(1);
        return expect(spy).toHaveBeenCalledOnce();
      });
      return it("should fire the callback when closing", function() {
        var spy;
        spy = this.spy();
        this.jq.$el.bind("close", spy);
        this.jq.open(1);
        this.jq.close(1);
        return expect(spy).toHaveBeenCalledOnce();
      });
    });
    describe('API', function() {
      before(function() {
        /*:DOC+=<div class="test" id="test2">
          <h1>Section 1</h1> <div>hello 1</div>
          <h2>Section 2</h2> <span>hello 2</span>
          <h3>Section 3</h3> <div>hello 3</div>
        </div>
        */
        return this.jq = new jQueryCollapse($("#test2"));
      });
      describe('open method', function() {
        it("should open all sections", function() {
          this.jq.open();
          return expect(this.jq.$el.find(".open").length).toBe(3);
        });
        return describe('targeted section', function() {
          before(function() {
            return this.jq.open(1);
          });
          it("should be open", function() {
            return expect(this.jq.$el.find(".open").length).toBe(1);
          });
          return it("should be a H2 element", function() {
            return expect(this.jq.$el.find(".open")[0].tagName).toBe("H2");
          });
        });
      });
      return describe('close method', function() {
        it("should close all sections", function() {
          this.jq.close();
          return expect(this.jq.$el.find(".close").length).toBe(3);
        });
        return describe('targeted section', function() {
          before(function() {
            this.jq.open();
            return this.jq.close(1);
          });
          it("should be closed", function() {
            return expect(this.jq.$el.find(".close").length).toBe(1);
          });
          return it("should be a H2 element", function() {
            return expect(this.jq.$el.find(".close").get(0).tagName).toBe("H2");
          });
        });
      });
    });
    describe('accordion', function() {
      before(function() {
        /*:DOC+=<div class="test" id="test4">
          <h1>Section 1</h1> <div>hello 1</div>
          <h2>Section 2</h2> <span>hello 2</span>
          <h3>Section 3</h3> <div>hello 3</div>
        </div>
        */
        return this.jq = new jQueryCollapse($("#test4"), {
          accordion: true
        });
      });
      it("should be an accordion", function() {
        return expect(this.jq.isAccordion).toBe(true);
      });
      it("should close any open sections when opening a new one", function() {
        this.jq.open(0);
        this.jq.open(1);
        return expect(this.jq.$el.find(".open").length).toBe(1);
      });
      return it("should be able to close the open section by clicking", function() {
        this.jq.open(0);
        this.jq.$el.find("h1").find("a").trigger("click");
        return expect(this.jq.$el.find(".open").length).toBe(0);
      });
    });
    return describe('persistence', function() {
      before(function() {
        /*:DOC+=<div class="test" id="test4">
          <h1>Section 1</h1> <div>hello 1</div>
          <h2>Section 2</h2> <span>hello 2</span>
          <h3>Section 3</h3> <div>hello 3</div>
        </div>
        */
        this.stub(jQueryCollapseStorage.prototype, 'read').returns([0, 0, 1]);
        this.jq = new jQueryCollapse($("#test4"), {
          persist: true
        });
        return this.stub(this.jq.db, 'write');
      });
      it("should instantiate a storage object", function() {
        return expect(this.jq.db.id).toBe(this.jq.$el[0].id);
      });
      it("should read from db and set states accordingly", function() {
        return expect(this.jq.states).toEqual([0, 0, 1]);
      });
      it("should write to storage that the third item was opened", function() {
        this.jq.open(2);
        return expect(this.jq.db.write).toHaveBeenCalledWith(2, true);
      });
      return it("should write to storage that the third item was closed", function() {
        this.jq.close(2);
        return expect(this.jq.db.write).toHaveBeenCalledWith(2, false);
      });
    });
  });

}).call(this);
