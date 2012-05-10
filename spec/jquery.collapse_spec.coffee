buster.spec.expose()

describe "jQuery Collapse", ->

  describe 'exposure', ->

    it "should expose constructor function", ->
      expect(jQueryCollapse).toBeFunction()

    it "should be exposed in jQuery API", ->
      expect($.fn.collapse).toBeDefined()

  describe "setup", ->

    it "should require a jQuery object", ->
      expect ->
        jQueryCollapse()
      .toThrow("TypeError")

    it "should require jQuery object to containt a DOM element", ->
      el = $()
      expect ->
        jQueryCollapse(el)
      .toThrow("TypeError")

    it "should assign an element", ->
      el = $(document.createElement('div'))
      expect(new jQueryCollapse(el).$el).toBe(el)

  describe 'initializing elements with data-collapse attribute', ->

    before ->
      ###:DOC+= <div data-collapse></div> ###
      ###:DOC+= <div data-collapse></div> ###
      ###:DOC+= <div id="test2"></div> ###
      @jq = @stub(window, "jQueryCollapse")

    it "should call the jQueryCollapse constructor twice", ->
      $.fn.collapse(true);
      expect(@jq).toHaveBeenCalledTwice()

    it "should call the jQuery Collapse constructor once", ->
      $("#test2").collapse();
      expect(@jq).toHaveBeenCalledOnce()

  describe 'sections', ->

    before ->
      ###:DOC+=<div id="test">
        <h1>Section 1</h1> <div>hello 1</div>
        <h2>Section 2</h2> <span>hello 2</span>
        <h3>Section 3</h3> <div>hello 3</div>
      </div>###
      @jq = new jQueryCollapse $("#test")

    it "should have a sections array", ->
      expect(@jq.sections).toBeObject []

    it "should create a section for every group of two child elements", ->
      expect(@jq.sections.length).toEqual 3

    describe 'the first section', ->

      before ->
        @summary = @jq.sections[0].$summary
        @details = @jq.sections[0].$details

      it "should be a h1 element", ->
        expect(@summary.get(0).tagName).toEqual "H1"

      it "should wrap the inner text with a <a> element", ->
        expect(@summary.get(0).innerHTML).toEqual '<a href="#">Section 1</a>'

      it "should have div as 'details' for the first section", ->
        expect(@details.get(0).tagName).toEqual "DIV"

      describe 'closed section', ->

        it "should hide the details", ->
          expect(@details.get(0).style.display).toEqual "none"

        it "should set aria-hidden to true on details", ->
          expect(@details.attr("aria-hidden")).toEqual "true"

        it "should have a 'closed' CSS class on summary", ->
          expect(@summary.hasClass('closed')).toBe true

        it "should not have a 'open' CSS class on summary", ->
          expect(@summary.hasClass('open')).toBe false

      describe 'open section', ->

        before ->
          @jq.sections[0].open();

        it "details should be visible", ->
          expect(@details.get(0).style.display).toEqual "block"

        it "details should have ARIA attribute hidden set to false", ->
          expect(@details.attr("aria-hidden")).toEqual "false"

        it "should have a 'open' CSS class on summary", ->
          expect(@summary.hasClass('open')).toBe true

        it "should not have a 'closed' CSS class on summary", ->
          expect(@summary.hasClass('closed')).toBe false

      describe 'user interaction', ->

        describe 'clicking a summary', ->

          it "should prevent default behaviour", ->
            event =
              preventDefault : @spy()
            @jq.sections[0].handleClick(event);
            expect(event.preventDefault).toHaveBeenCalledOnce()

          it "should open the corresponding section if it's closed", ->
            @jq.sections[0].close();
            stub = @stub(@jq.sections[0], "open")
            @summary.trigger("click")
            expect(stub).toHaveBeenCalledOnce()

          it "should close the corresponding section if it's open", ->
            @jq.sections[0].open();
            stub = @stub(@jq.sections[0], "close")
            @summary.trigger("click")
            expect(stub).toHaveBeenCalledOnce()



