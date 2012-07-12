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

    describe 'default assignment', ->

      before ->
        @el = $(document.createElement('div'))
        @jq = new jQueryCollapse(@el)

      it "should assign an element", ->
        expect(@jq.$el).toBe(@el)

      it "should not have an accordion", ->
        expect(@jq.isAccordion).toBe false

      it "should not have a db", ->
        expect(@jq.db).toBe false

      it "should have a 'sections' property",->
        expect(@jq.sections).toEqual []

      it "should have a 'states' property",->
        expect(@jq.states).toEqual []


  describe 'initializing elements with data-collapse attribute', ->

    before ->
      ###:DOC+= <div data-collapse></div> ###
      ###:DOC+= <div data-collapse></div> ###
      ###:DOC+= <div id="test2"></div> ###
      @jq = @stub(window, "jQueryCollapse")

    it "should call the jQueryCollapse constructor twice", ->
      $.fn.collapse(false, true);
      expect(@jq).toHaveBeenCalledTwice()

    it "should call the jQuery Collapse constructor once", ->
      $("#test2").collapse();
      expect(@jq).toHaveBeenCalledOnce()

  describe 'initializing plugin with data-collapse accordion', ->

    before ->
      ###:DOC+= <div data-collapse="accordion"></div> ###
      @jq = @stub(window, "jQueryCollapse")

    it "should call the constructor with accordion option set to true",->
      obj = $("div").get(0)
      $.fn.collapse(false, true);
      expect(@jq).toHaveBeenCalledWith($(obj),
        accordion: true
      )

  describe 'initializing plugin with data-collapse persist', ->

    before ->
      ###:DOC+= <div data-collapse="persist"></div> ###
      @jq = @stub(window, "jQueryCollapse")

    it "should call the constructor with persist option set to true",->
      obj = $("div").get(0)
      $.fn.collapse(false, true);
      expect(@jq).toHaveBeenCalledWith($(obj),
        persist: true
      )

  describe 'sections', ->

    before ->
      ###:DOC+=<div id="test">
        <h1>Section 1</h1> <div>hello 1</div>
        <h2>Section 2</h2> <span>hello 2</span>
        <h3 class="open">Section 3</h3> <div>hello 3</div>
      </div>###
      @jq = new jQueryCollapse $("#test")

    it "should have a sections array", ->
      expect(@jq.sections).toBeObject []

    it "should create a section for every group of two child elements", ->
      expect(@jq.sections.length).toEqual 3

    it "the last section should be opened by default", ->
      expect(@jq.sections[2].isOpen).toBe true

    describe 'the first section', ->

      before ->
        @summary = @jq.sections[0].$summary
        @details = @jq.sections[0].$details

      it "should be a h1 element", ->
        expect(@summary.get(0).tagName).toEqual "H1"

      it "should wrap the inner text with a <a> element", ->
        expect(@summary.get(0).innerHTML).toEqual '<a href="#">Section 1</a>'

      it "should add data-collap-summary attribute to details", ->
        expect(@summary.attr("data-collapse-summary")).toBeDefined()

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
            @jq.handleClick(event);
            expect(event.preventDefault).toHaveBeenCalledOnce()

          it "should open the corresponding section if it's closed", ->
            @jq.sections[0].close();
            stub = @stub(@jq.sections[0], "open")
            @summary.find("a").trigger("click")
            expect(stub).toHaveBeenCalledOnce()

          it "should close the corresponding section if it's open", ->
            @jq.sections[0].open();
            stub = @stub(@jq.sections[0], "close")
            @summary.find("a").trigger("click")
            expect(stub).toHaveBeenCalledOnce()

          it "should not fire handleClick on links inside collapsed content", ->
            ###:DOC+=<div id="test-click">
              <h3>Section 3</h3>
              <div>
                hello 3 <a id="test-link" href="#test-link">test link</a>
              </div>
            </div>###

            stub = @stub(jQueryCollapse.prototype, "handleClick")
            @jq2 = new jQueryCollapse $("#test-click")
            $("#test-link").trigger("click")
            expect(stub).not.toHaveBeenCalledOnce()

  describe 'Custom options', ->

    before ->
      ###:DOC+=<div id="test-options">
        <h1>Section 1</h1> <div>hello 1</div>
      </div>###
      @hide = @spy()
      @show = @spy()
      @jq = new jQueryCollapse($("#test-options"), {
        hide: @hide
        show: @show
      })

    it 'should fire the custom show function once', ->
      @jq.open()
      expect(@show).toHaveBeenCalledOnce()

    it 'should fire the custom hide function once', ->
      @jq.open()
      @jq.close()
      expect(@hide).toHaveBeenCalledOnce()

  describe 'Events', ->

    before ->
      ###:DOC+=<div class="test" id="test4">
        <h1>Section 1</h1> <div>hello 1</div>
        <h2>Section 2</h2> <span>hello 2</span>
        <h3>Section 3</h3> <div>hello 3</div>
      </div>###
      @jq = new jQueryCollapse $("#test4")

    it "should fire the callback when opening", ->
      spy = @spy()
      @jq.$el.bind("open", spy)
      @jq.open(1)
      expect(spy).toHaveBeenCalledOnce()

    it "should fire the callback when closing", ->
      spy = @spy()
      @jq.$el.bind("close", spy)
      @jq.open(1)
      @jq.close(1)
      expect(spy).toHaveBeenCalledOnce()

  describe 'API', ->

    before ->
      ###:DOC+=<div class="test" id="test2">
        <h1>Section 1</h1> <div>hello 1</div>
        <h2>Section 2</h2> <span>hello 2</span>
        <h3>Section 3</h3> <div>hello 3</div>
      </div>###
      @jq = new jQueryCollapse $("#test2")

    describe 'open method', ->

      it "should open all sections", ->
        @jq.open()
        expect(@jq.$el.find(".open").length).toBe 3

      describe 'targeted section', ->

        before ->
          @jq.open(1);

        it "should be open", ->
          expect(@jq.$el.find(".open").length).toBe 1

        it "should be a H2 element", ->
          expect(@jq.$el.find(".open")[0].tagName).toBe "H2"

    describe 'close method', ->

      it "should close all sections", ->
        @jq.close()
        expect(@jq.$el.find(".closed").length).toBe 3

      describe 'targeted section', ->

        before ->
          @jq.open()
          @jq.close(1)

        it "should be closed", ->
          expect(@jq.$el.find(".closed").length).toBe 1

        it "should be a H2 element", ->
          expect(@jq.$el.find(".closed").get(0).tagName).toBe "H2"


  describe 'accordion', ->

    before ->
      ###:DOC+=<div class="test" id="test4">
        <h1>Section 1</h1> <div>hello 1</div>
        <h2>Section 2</h2> <span>hello 2</span>
        <h3>Section 3</h3> <div>hello 3</div>
      </div>###

      @jq = new jQueryCollapse($("#test4"), {
        accordion: true
      })

    it "should be an accordion", ->
      expect(@jq.isAccordion).toBe true

    it "should close any open sections when opening a new one", ->
      @jq.open(0)
      @jq.open(1)
      expect(@jq.$el.find(".open").length).toBe 1

    it "should be able to close the open section by clicking", ->
      @jq.open(0)
      @jq.$el.find("h1").find("a").trigger("click")
      expect(@jq.$el.find(".open").length).toBe 0

  describe 'persistence', ->

    before ->
      ###:DOC+=<div class="test" id="test4">
        <h1>Section 1</h1> <div>hello 1</div>
        <h2>Section 2</h2> <span>hello 2</span>
        <h3>Section 3</h3> <div>hello 3</div>
      </div>###

      @stub(jQueryCollapseStorage.prototype, 'read').returns [0,0,1]
      @jq = new jQueryCollapse($("#test4"), {
        persist: true
      })
      @stub(@jq.db, 'write')

    it "should instantiate a storage object", ->
      expect(@jq.db.id).toBe @jq.$el[0].id

    it "should read from db and set states accordingly", ->
      expect(@jq.states).toEqual [0,0,1]

    it "should write to storage that the third item was opened", ->
      @jq.open(2)
      expect(@jq.db.write).toHaveBeenCalledWith(2,1)

    it "should write to storage that the third item was closed", ->
      @jq.close(2)
      expect(@jq.db.write).toHaveBeenCalledWith(2,0)

  describe 'storage', ->

    before ->
      @storage = new jQueryCollapseStorage("xyz")
      @storage.db =
        setItem : @stub()
        getItem : ->

    it "should define a storage object", ->
      expect(jQueryCollapseStorage).toBeFunction()

    it "should set an id", ->
      expect(@storage.id).toBe "xyz"

    it "should have an array data property", ->
      expect(@storage.data).toBeArray()

    it 'should set the data array to five zero-values', ->
      @storage.write(4,0)
      expect(@storage.data).toEqual [0,0,0,0,0]

    it 'should set the 3:rd value in array to 1', ->
      @storage.write(2,1)
      expect(@storage.data).toEqual [0,0,1]

    it 'should write stringified array to storage backend', ->
      @storage.write(4,1)
      arg = JSON.stringify("xyz" : [0,0,0,0,1])
      expect(@storage.db.setItem).toHaveBeenCalledWith("jQuery-Collapse", arg)

    it 'should re-save previously written items from storage', ->
      @stub(@storage.db, 'getItem').returns('{ "abc" : [1] }')
      @storage.write(1,0)
      obj =
        "abc": [1]
        "xyz": [0,0]
      expect(@storage.db.setItem)
        .toHaveBeenCalledWith("jQuery-Collapse", JSON.stringify(obj))

    it 'should return stored data', ->
      @stub(@storage.db, 'getItem').returns('{ "xyz" : [1,0,1] }')
      expect(@storage.read()).toEqual [1,0,1]
