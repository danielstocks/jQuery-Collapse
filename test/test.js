$(document).ready(function() {
    
    // Some sample Markup
    var el = $("#main .test").collapse({disableCookie : true});
    var headings = el.find("h3");
    var lists = el.find("ul");
    var first_list = $(lists[0]);
    
    // Simple Test
    module("Collapse");
    test("basic", function() {
        
        // Make sure lists are hidden per default
        equals(headings.filter(".inactive").length, 3, "Three inactive headings");
        equals(el.find("ul:hidden").length, 3, "Three hidden lists");
        
        // Trigger show
        el.trigger('show', [first_list]);
        ok(first_list.is(":visible"), "First list is visible");
        equals(el.find("ul:hidden").length, 2, "Two lists are left hidden");
        
    });
});