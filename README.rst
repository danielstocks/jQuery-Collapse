============
jQuery Collapse
============

A lightweight plugin for enabling expandable/collapsible content.

- Packaged with cookie support (yum!)
- Lightweight (655 bytes minified and gzipped)
- ARIA compliant

Enjoy!

Usage
-----

HTML::

    <div id="demo">
        <h3>Fruits</h3>
        <ul>
            <li>Apple</li>
            <li>Pear</li>
            <li>Orange</li>
        </ul>
        <h3>Info</h3>
        <div>
            <p>You can use any container you like (in this case a div)</p>
        </p>
    </div>

JavaScript::

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script src="jquery.collapse.js"></script>
    <!-- If you want cookie support -->
    <script src="jquery.cookie.js"></script>
    <script>
    $(function() {
        $("#demo").collapse();
    });
    </script>

*Note*: If you're using the plugin on different pages on the same domain, you'll have to have a unique cookie name for each instance to avoid conflict. Use the "cookie" option to set a unique cookie name.

Options
-------

* **open** (bool) : Defines if content is initially visible or hidden (default: false)
* **head** (string) : Elements for clickable headings (default: "h3")
* **group** (string): Elements containing the collapsable content (default: "ul, div")
* **show** (function) : Custom function for showing content (default: function(){ this.show() })
* **hide** (function) : Custom function for hiding content (default: function(){ this.hide() })
* **cookieName** (string) : Name of cookie used in the plugin. (default: "collapse")

Browser Support
---------------
Probably works in most modern browsers, but only tested in: Safari, Chrome, IE6+, Firefox3+, Opera10+

*Google Chrome* does not work with cookies if run locally (i.e file://) 
For more details: http://code.google.com/p/chromium/issues/detail?id=535