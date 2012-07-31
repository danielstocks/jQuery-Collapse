buster.spec.expose()

describe 'Cookie Storage', ->

  before ->
    @cookieStorage = $.fn.collapse.cookieStorage

  it 'should have setItem method', ->
    expect(@cookieStorage.setItem).toBeFunction()

  it 'should have a getItem method', ->
    expect(@cookieStorage.getItem).toBeFunction()

  it 'should set a cookie', ->
    @cookieStorage.cookies = ""
    @cookieStorage.setItem("test", "holla")
    expect(@cookieStorage.cookies).toEqual "test=holla; expires=" + @cookieStorage.expires + "; path=/"

  it 'should get a cookie value', ->
    @cookieStorage.cookies = "blah=bleh; test=holla;"
    expect(@cookieStorage.getItem('test')).toEqual 'holla'
