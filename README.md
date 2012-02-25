# jQuery Collapse

A lightweight plugin for enabling expandable/collapsible content.

Enjoy!

## Features

- [WAI ARIA](http://dev.opera.com/articles/view/introduction-to-wai-aria/) compliant
- Lightweight (655 bytes minified and Gzipped)
- Cross Browser compliant (Tested on IE6 +, Firefox, Safari, Chrome, Opera)
- Optional: **Accordion** plugin
- Optional: **Storage** plugin

## Usage

Add the JavaScripts to your document:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="jquery.collapse.js"></script>
```

Here's some sample HTML markup:

```html
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
```

That's it! The *data-collapse* attribute will automatically trigger the script. 

If you'd rather load the plugin with jQuery, you can:


```js
$(function() {
    $("#demo").collapse();
});
```

If you don't want to use the jQuery ($) wrapper, you can also access the
plugin with vanilla JavaScript:


```js
new Collapse(document.getElementById("demo"), {
  // options...
});
```

### Accordion plugin

If you want to enable "accordion" functionality load the accordion plugin *after* you load jquery.collapse.js

```html
<script src="jquery.collapse.accordion.js"></script>
```

Remember, you won't be able to show several sections at once with the
accordion, because it'll automagically close any open sections before
trying to open a new one.

### Storage plugin

By default, if the user reloads the page all the sections will be closed. If you want previously collapsed sections to stay open, you can use
the storage plugin. Load it *after* you load jquery.collapse.js

```html
<script src="jquery.collapse.storage.js"></script>
```

The storage plugin uses HTML5 localStorage if available. Otherwise it
will attempt to use browser cookies, if that also fails, it will simply
work, but without any storage.

## API Documentation

### Options

* **show** (function) : Custom function for showing content (default: function(){ this.show() })
* **hide** (function) : Custom function for hiding content (default: function(){ this.hide() })
* **accordion** (bool) : If you've loaded the accordion plugin you can disable it by setting this option to 'false'
* **storage** (bool) : If you've loaded the storage plugin you can disable it by setting this option to 'false'

### Events

* **open** (event) : Trigger this event to open a section
* **close** (event) : Trigger this event to close a section


## Contributing

Did you find a bug? Do you want to introduce a feature? Here's what to do.

* Write a test case (located in ./test/*_test.coffee)
* Watch it fail (red light)
* Fix bug / introduce feature
* Watch it pass (green light)
* Refactor / Perfectionize!
* Do a pull request on Github
* Wait patiently...

Tests are written in CoffeScript in a BDD fashion and run 
using the [Mocha.js](http://visionmedia.github.com/mocha/) test framework

Thanks in advance
