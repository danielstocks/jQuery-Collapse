============
jQuery Collapse
============

A plugin for enabling multiple collapsible lists with cookie support.

*Note*: For cookie support you need the cookie plugin: http://plugins.jquery.com/project/cookie. The plugin will automatically detect if cookie support is available.

*Google Chrome* does not work with cookies if run locally (i.e file://) 
For more details: http://code.google.com/p/chromium/issues/detail?id=535

Tested with jQuery 1.4.2.

Demo
=====
A working demo can be found here -> http://webcloud.se/article/jQuery_Collapse_Plugin/


Usage
=====

Some sample markup::

    <div id="demo">
        <h3>Fruits</h3>
        <ul>
            <li>Apple</li>
            <li>Pear</li>
            <li>Orange</li>
        </ul>
        <h3>Vegetables</h3>
        <ul>
            <li>Carrot</li>
            <li>Tomato</li>
            <li>Squash</li>
        </ul>
        <h3>Drinks</h3>
        <div>
            <p>PG TIPS!!!</p>
        </div>
    </div>

Load the JavaScript (make sure DOM is loaded before you do)::

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script src="jquery.collapse.js"></script>
    <!-- If you want cookie support -->
    <script src="jquery.cookie.js"></script> 
    <script>
        $("#demo").collapse();
    </script>

*Note*: If you're using the plugin on different pages on the same domain, you'll have to have a unique cookie name for each instance to avoid conflict. Use the "cookie" option to set a unique cookie name.

Options
-------

All options are optional.

* **open** (bool) : Defines wether lists are initially open or closed (default: false)
* **inactive** (string) CSS class for inactive header (default: "inactive")
* **active** (string) : CSS class for active header (default: "active")
* **head** (string) : Elements for clickable headings (default: "h3")
* **group** (string): Elements containing the collapsable content (default: "ul, div")
* **speed** (number) : Animation speed (default: 100)
* **cookie** (string) : Name of cookie used in the plugin.
* **disableCookie** (string) : Disable cookies (if you have jquery.cookie plugin present but don't want cookies anyway)

Browser Support
---------------
Probably works in most modern browsers, but only tested in: Safari, Chrome, IE6+, Firefox3+, Opera10+

