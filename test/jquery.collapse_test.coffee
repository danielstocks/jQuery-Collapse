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

      it 'is an accordion', ->
        expect(@collapse.isAccordion).to.eq @options.accordion

      it 'is persistant', ->
        expect(@storageStub.calledOnce).to.be.ok

      it 'attempts to read db', ->
        expect(@dbMock.read).to.be.ok

      it 'creates a section for every query match', ->
        expect(@sectionStub.calledTwice).to.be.ok

      it 'captures ALL the clicks', ->
        expect(@el.on.calledWith('click', '[data-collapse-summary]')).to.be.ok


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
      expect(@collapse.sections[1].close.calledOnce).to.be.ok

    it 'closes all the sections', ->
      @collapse.close()
      expect(@collapse.sections[0].close.calledOnce).to.be.ok
      expect(@collapse.sections[1].close.calledOnce).to.be.ok

describe 'Section', ->

  describe 'constructor', ->

    describe 'defaults', ->

      it 'is not open'
      it 'sets summary attribute on el'
      it 'injects a link inside el'
      it 'finds and sets details'
      it 'applies a parent'
      it 'applies parent options'
      it 'pushes to parent sections'

    describe 'open section',->
      it 'applies an open CSS class'
      it 'opens with a bypass'

    describe 'closed section', ->
      it 'applies a closed CSS class'
      it 'closes with a bypass'
