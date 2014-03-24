expect = chai.expect

describe 'Collapse', ->

  describe 'Constructor', ->

    describe 'without options', ->

      before ->
        @el = $(document.createElement('div'))
        @collapse = new jQueryCollapse @el

      it 'sets an empty options object', ->
        expect(@collapse.options).to.eql {}

      it 'sets an given element', ->
        expect(@collapse.$el).to.eq @el

      it 'has no sections', ->
        expect(@collapse.sections).to.eql []

      it 'is not an accordion', ->
        expect(@collapse.isAccordion).to.eq false

      it 'is not persistant', ->
        expect(@collapse.db).to.eq false

      it 'has no states', ->
        expect(@collapse.states).to.eql []

    describe 'with options', ->

      before ->
        @el =
          find : sinon.stub().returns($("<div>").add("<div>"))
          get : sinon.stub().returns(true)
          on : sinon.stub().returns(true)
          bind : sinon.stub().returns(true)

        @sectionStub = sinon.stub(window, 'jQueryCollapseSection')

        @dbMock =
          read: sinon.spy

        @storageStub = sinon.stub(window, 'jQueryCollapseStorage')
          .returns(@dbMock)

        @options =
          query: "div h2"
          accordion: true
          persist: true
        @collapse = new jQueryCollapse @el, @options

      after ->
        jQueryCollapseSection.restore()
        jQueryCollapseStorage.restore()

      it 'is an accordion', ->
        expect(@collapse.isAccordion).to.eq @options.accordion

      it 'is persistant', ->
        expect(@storageStub.calledOnce).to.be.ok

      it 'attempts to read db', ->
        expect(@dbMock.read).to.be.ok

      it 'creates a section for every query match', ->
        expect(@sectionStub.calledTwice).to.be.ok

      it 'captures ALL the clicks', ->
        expect(@el.on.calledWith('click', '[data-collapse-summary] ')).to.be.ok


  describe 'handleClick method', ->

    beforeEach ->

      summary = $("<div>")
      @collapse = new jQueryCollapse($(document.createElement('div')))
      @collapse.sections = [
        {toggle: sinon.spy(), $summary: $('<div>').append(summary)}
      ]
      @e =
        target : summary.get(0)
        preventDefault: sinon.spy()
      @collapse.handleClick(@e)

    it 'prevents default event behaviour', ->
      expect(@e.preventDefault.calledOnce).to.be.ok

    it 'toggles section if a summary was clicked', ->
      expect(@collapse.sections[0].toggle.calledOnce).to.be.ok


  describe 'open method', ->

    beforeEach ->
      @el = $(document.createElement('div'))
      @collapse = new jQueryCollapse @el
      @collapse.sections = [
        {open: sinon.spy()}
        {open: sinon.spy()}
      ]

    it 'opens given section', ->
      @collapse.open(1)
      expect(@collapse.sections[0].open.called).not.to.be.ok
      expect(@collapse.sections[1].open.calledOnce).to.be.ok

    it 'opens all the sections', ->
      @collapse.open()
      expect(@collapse.sections[0].open.calledOnce).to.be.ok
      expect(@collapse.sections[1].open.calledOnce).to.be.ok

  describe 'close method', ->

    beforeEach ->
      @el = $(document.createElement('div'))
      @collapse = new jQueryCollapse @el
      @collapse.sections = [
        {close: sinon.spy()}
        {close: sinon.spy()}
      ]

    it 'closes given section', ->
      @collapse.close(1)
      expect(@collapse.sections[0].close.called).not.to.be.ok
      expect(@collapse.sections[1].close.calledOnce).to.be.ok

    it 'closes all the sections', ->
      @collapse.close()
      expect(@collapse.sections[0].close.calledOnce).to.be.ok
      expect(@collapse.sections[1].close.calledOnce).to.be.ok

describe 'Section', ->

  describe 'constructor', ->

    before ->
      @summary = $("<div>").addClass("summary")
      @details = $("<div>").addClass("details")
      @rootEl = $("<div>").append(@summary, @details)

      @parent =
        sections : []
        states: [0,1,0]
        options: {}
        $el: @rootEl

      @section = new jQueryCollapseSection(@summary, @parent)

    describe 'defaults', ->

      it 'is not open', ->
        expect(@section.isOpen).to.eql false

      it 'sets a summary', ->
        expect(@section.$summary.is(@summary)).to.eql true

      it 'sets a data-collapse summary attribute on summry', ->
        expect(@section.$summary.data()).to.eql { collapseSummary: '' }

      it 'injects a link inside el', ->
        expect(@section.$summary.find("a").length).to.eql 1

      it 'finds and sets details', ->
        expect(@section.$details.get(0)).to.eql @details.get(0)

      it 'applies a parent', ->
        expect(@section.parent).to.eql @parent

      it 'applies parent options', ->
        expect(@section.options).to.eql @parent.options

      it 'pushes to parent sections', ->
        expect(@parent.sections[0]).to.eql @section

    describe 'state is 1', ->

      before ->
        sinon.stub(jQueryCollapseSection.prototype, '_index').returns(1)
        @open = sinon.stub(jQueryCollapseSection.prototype, 'open')
        @section = new jQueryCollapseSection(@summary, @parent)

      after ->
        jQueryCollapseSection.prototype._index.restore()
        jQueryCollapseSection.prototype.open.restore()

      it 'opens with a bypass', ->
        expect(@open.calledWith(true)).to.be.ok

    describe 'state is 0', ->

      before ->
        sinon.stub(jQueryCollapseSection.prototype, '_index').returns(0)
        @close = sinon.stub(jQueryCollapseSection.prototype, 'close')
        @section = new jQueryCollapseSection(@summary, @parent)

      after ->
        jQueryCollapseSection.prototype._index.restore()
        jQueryCollapseSection.prototype.close.restore()

      it 'closes with a bypass', ->
        expect(@close.calledWith(true)).to.be.ok

    describe 'section summary has .open class', ->

      before ->
        sinon.stub($.fn, 'is').withArgs('.open').returns(true)
        @open = sinon.stub(jQueryCollapseSection.prototype, 'open')
        new jQueryCollapseSection(@summary, @parent)

      after ->
        $.fn.is.restore()
        jQueryCollapseSection.prototype.open.restore()

      it 'opens with a bypass', ->
        expect(@open.calledWith(true)).to.be.ok
