============
jQuery Collapse
============

A plugin for enabling collapsible lists with cookie support.

*Note*: For cookie support you need the cookie plugin: http://plugins.jquery.com/project/cookie

Usage
=====

Some sample markup::

    <div id="demo">
        <h3><a href="#">Fruits</a></h3>
        <ul>
            <li>Apple</li>
            <li>Pear</li>
            <li>Orange</li>
        </ul>
        <h3><a href="#">Vegetables</a></h3>
        <ul>
            <li>Carrot</li>
            <li>Tomato</li>
            <li>Squash</li>
        </ul>
    </div>

Load the JavaScript (make sure DOM is loaded before you do)::

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script src="jquery.collapse.js"></script>
    <script src="jquery.cookie.js"></script>
    <script>
        $("#demo").collapse();
    </script>

*Note*: If you're using the plugin on different't pages on the same domain, you'll have to have unique cookie names to avoid conflict. Use the "cookie" option
to set a unique name. 

Options
-------

All options are optional.

* **open** (bool) : Defines wether lists are initially open or closed (default: false)
* **inactive** (string) CSS class for inactive header (default: "inactive")
* **active** (string) : CSS class for active header (default: "active")
* **head** (string) : Elements for clickable headings (default: "h3")
* **group** (string): Elements for collapsable group (default: "ul")
* **speed** (number) : Animation speed (default: 100)
* **cookie** (string) : Name of cookie used in the plugin.


Browser Support
---------------
Probably works in most modern browsers, but only tested in: Safari, Chrome, IE6+, Firefox3+, Opera10+

