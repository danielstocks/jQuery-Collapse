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

