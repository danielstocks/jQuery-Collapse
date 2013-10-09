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
        el = $(document.createElement('div'))
        @stub = sinon.stub(window, "jQueryCollapseStorage")
        @options =
          query: "div h2"
          accordion: true
          persist: true
        @collapse = new jQueryCollapse el, @options

      it 'is an accordion', ->
        expect(@collapse.isAccordion).to.eq @options.accordion

      it 'is persistant', ->
        expect(@stub.calledOnce).to.be.ok

