expect = chai.expect

describe 'Cookie Storage', ->

  before ->
    @cookieStorage = $.fn.collapse.cookieStorage
    @cookieStorage.setItem("test","holla")
    @cookieStorage.setItem("lol","ok")

  describe 'setItem', ->

    it 'sets a cookie', ->
      expect(document.cookie).to.eq "test=holla; lol=ok"

  describe 'getItem', ->

    before ->

    it 'gets the lol cookie', ->
      expect(@cookieStorage.getItem("lol")).to.eql "ok"

    it 'gets the test cookie', ->
      expect(@cookieStorage.getItem("test")).to.eql "holla"

