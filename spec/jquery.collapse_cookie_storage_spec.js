(function() {

  buster.spec.expose();

  describe('Cookie Storage', function() {
    before(function() {
      return this.cookieStorage = $.fn.collapse.cookieStorage;
    });
    it('should have setItem method', function() {
      return expect(this.cookieStorage.setItem).toBeFunction();
    });
    it('should have a getItem method', function() {
      return expect(this.cookieStorage.getItem).toBeFunction();
    });
    it('should set a cookie', function() {
      this.cookieStorage.cookies = "";
      this.cookieStorage.setItem("test", "holla");
      return expect(this.cookieStorage.cookies).toEqual("test=holla; expires=" + this.cookieStorage.expires + "; path=/");
    });
    return it('should get a cookie value', function() {
      this.cookieStorage.cookies = "blah=bleh; test=holla;";
      return expect(this.cookieStorage.getItem('test')).toEqual('holla');
    });
  });

}).call(this);
