===============
jQuery Collapse
===============
A plugin for enabling collapsible lists with cookie support. 

Usage
=====

Some sample markup::

    <div id="demo">
    <h2><a href="#">Fruits</a></h2>
        <ul>
            <li>Apple</li>
            <li>Pear</li>
            <li>Orange</li>
        </ul>
    <h2><a href="#">Vegetables</a></h2>
        <ul>
            <li>Carrot</li>
            <li>Tomato</li>
            <li>Squash</li>
        </ul> <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    </div>

Load the JavaScript (make sure DOM is loaded before you do)::

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script src="jquery.collapse.js"></script>
    <script src="jquery.cookie.js"></script>
    <script>
        $("#demo").collapse();
    </script>

License
=======

Unless otherwise specified within any of the plugins, you can assume the following license:

* Copyright (c) 2010 Daniel Stocks
* -------------------------------------------------------
* Dual licensed under the MIT and GPL licenses.
*    - http://www.opensource.org/licenses/mit-license.php
*    - http://www.gnu.org/copyleft/gpl.html

