describe 'Storage', ->

  before ->
    @id = 'hello'
    @storage = new jQueryCollapseStorage(@id)

  describe 'Constructor', ->

    it 'should set an id', ->
      expect(@storage.id).to.eq @id

    it 'should set db to local storage', ->
      expect(@storage.db).to.eql window.localStorage

    it 'should set data to empty array', ->
      expect(@storage.data).to.eql []

  describe 'write', ->

    before ->
      @storage.write(2, true)

    it 'should update storage data', ->
      expect(@storage.data).to.eql [0,0,1]

    it 'should set item on db', ->
      expect(@storage.db.getItem("jQuery-Collapse")).to.eq '{"hello":[0,0,1]}'

  describe 'read', ->

    it 'should read from db', ->
      value = @storage.read()
      expect(value).to.eql [0,0,1]





