(function() {

  buster.spec.expose();

  describe('jQuery Collapse Storage', function() {
    before(function() {
      this.storage = new jQueryCollapseStorage("xyz");
      return this.storage.db = {
        setItem: this.stub(),
        getItem: function() {}
      };
    });
    it("should set an id", function() {
      return expect(this.storage.id).toBe("xyz");
    });
    it("should have an array data property", function() {
      return expect(this.storage.data).toBeArray();
    });
    it('should set the data array to five zero-values', function() {
      this.storage.write(4, false);
      return expect(this.storage.data).toEqual([0, 0, 0, 0, 0]);
    });
    it('should set the 3:rd value in array to 1', function() {
      this.storage.write(2, true);
      return expect(this.storage.data).toEqual([0, 0, 1]);
    });
    it('should write stringified array to storage backend', function() {
      var arg;
      this.storage.write(4, true);
      arg = JSON.stringify({
        "xyz": [0, 0, 0, 0, 1]
      });
      return expect(this.storage.db.setItem).toHaveBeenCalledWith("jQuery-Collapse", arg);
    });
    it('should re-save previously written items from storage', function() {
      var obj;
      this.stub(this.storage.db, 'getItem').returns('{ "abc" : [1] }');
      this.storage.write(1, false);
      obj = {
        "abc": [1],
        "xyz": [0, 0]
      };
      return expect(this.storage.db.setItem).toHaveBeenCalledWith("jQuery-Collapse", JSON.stringify(obj));
    });
    return it('should return stored data', function() {
      this.stub(this.storage.db, 'getItem').returns('{ "xyz" : [1,0,1] }');
      return expect(this.storage.read()).toEqual([1, 0, 1]);
    });
  });

}).call(this);
