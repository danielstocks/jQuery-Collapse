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

Options
-------

* **inactive** CSS class for inactive header (default: "inactive")
* **active** : CSS class for active header (default: "active")
* **head** : Elements for clickable headings (default: "h3")
* **group** : Elements for collapsable group (default: "ul")
* **speed** : Animation speed (default: 100)
* **cookie** : Cookie name, needs to be unique if used in different't contexts (default: "collapse")


Browser Support
---------------
Tested in: Safari,Chrome,IE6+,Firefox3+



