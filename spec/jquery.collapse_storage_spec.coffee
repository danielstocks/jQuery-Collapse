buster.spec.expose()

describe 'jQuery Collapse Storage', ->

  before ->
    @storage = new jQueryCollapseStorage("xyz")
    @storage.db =
      setItem : @stub()
      getItem : ->

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
