jQuery Collapse
===============

A lightweight plugin for enabling expandable/collapsible content.

- Lightweight (655 bytes minified and Gzipped)
- [WAI ARIA](http://dev.opera.com/articles/view/introduction-to-wai-aria/) compliant.
- Cross Browser compliant (Tested on IE6 +, Firefox, Safari, Chrome, Opera)
- Remembers open and closed states (uses HTML5 localStorage but gracefully degrades to cookies for older browsers). (*new!*)
- Accordion mode (plugin) (*new!*)

Enjoy!

Usage
-----

###Basic

JavaScript::

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script src="jquery.collapse.js"></script>

HTML::

    <div id="demo" data-collapse="true">
        <h3>Fruits</h3>
        <ul>
            <li>Apple</li>
            <li>Pear</li>
            <li>Orange</li>
        </ul>
        <h3>Info</h3>
        <div>
            <p>You can use any container you like (in this case a div element)</p>
        </div>
    </div>

The *data-collapse* attribute will automatically trigger the script. 

If you'd rather load the plugin with vanilla JavaScript, you can:

JavaScript::

    $(function() {
        $("#demo").collapse();
    });


###Saving states

By default, if the user reloads the page all the sections will be closed. If you want previously collapsed sections to stay open, you can use
the storage plugin. Load it *after* you load jquery.collapse.js

HTML::

    <script src="jquery.collapse.storage.js"></script>

###Accordion

If you want to enable "accordion" functionality load the accordion plugin *after* you load jquery.collapse.js

HTML::

    <script src="jquery.collapse.accordion.js"></script>

API DOCS
--------

### Options

* **show** (function) : Custom function for showing content (default: function(){ this.show() })
* **hide** (function) : Custom function for hiding content (default: function(){ this.hide() })
* **accordion** (bool) : If you've loaded the accordion plugin you can disable it by setting this option to 'false'
* **storage** (bool) : If you've loaded the storage plugin you can disable it by setting this option to 'false'

### Events

* **open** (event) : Trigger this event to open a section
* **close** (event) : Trigger this event to close a section


