===============
jQuery Collapse
===============
A plugin for enabling collapsible lists with cookie support. 

Usage
=====

HTML::

    &lt;div id=&quot;demo&quot;&gt;
    &lt;h2&gt;&lt;a href=&quot;#&quot;&gt;Fruits&lt;/a&gt;&lt;/h2&gt;
        &lt;ul&gt;
            &lt;li&gt;Apple&lt;/li&gt;
            &lt;li&gt;Pear&lt;/li&gt;
            &lt;li&gt;Orange&lt;/li&gt;
        &lt;/ul&gt;
    &lt;h2&gt;&lt;a href=&quot;#&quot;&gt;Vegetables&lt;/a&gt;&lt;/h2&gt;
        &lt;ul&gt;
            &lt;li&gt;Carrot&lt;/li&gt;
            &lt;li&gt;Tomato&lt;/li&gt;
            &lt;li&gt;Squash&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;

JavaScript::

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

