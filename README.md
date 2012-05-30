# jQuery Collapse

A lightweight but flexible and powerful jQuery plugin that allows you to collapse content. A feature also
known as 'progressive disclosure'.

Dependencies:
- jQuery 1.7.2

Enjoy!


## Features

- [WAI ARIA](http://dev.opera.com/articles/view/introduction-to-wai-aria/) compliant
- Lightweight (~x bytes minified and Gzipped)
- Cross Browser compliant (Tested in >= IE6, Firefox, Safari, Chrome, Opera)
- **Accordion** behaviour can be enabled. 
- **Persistance** to remember open sections on page reload!


## Usage

Load jQuery and the jQuery Collapse plugin into your document:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="jquery.collapse.js"></script>
```

Here's some sample HTML markup:

```html
<div id="demo" data-collapse>
  <h2>Fruits</h2>
  <ul>
    <li>Apple</li>
    <li>Pear</li>
    <li>Orange</li>
  </ul>
  <h2>Info</h2>
  <div>
    <p>You can use any container you like (in this case a div element)</p>
  </div>
</div>
```

That's it! The *data-collapse* attribute will automatically trigger the script. 


## JavaScript usage

If you'd rather omit the 'data-collapse' attribute in the HTML and load the plugin via jQuery, you can:

```js
$("#demo").collapse({
  // options...
});
```

If you don't want to use the jQuery ($) wrapper, you can also access the
plugin with *vanilla* JavaScript:

```js
new jQueryCollapse($("#demo"), {
  // options...
});
```


## Accordion

To activate the accordion behaviour set 'accordion' as the value of the 'data-collapse' attribute:

```html
<div id="demo" data-collapse="accordion">
  ...
</div>
```


## Persistance

By default, if the user reloads the page all the sections will be closed. 
If you want previously collapsed sections to stay open you can add 'persist' to the data-collapse attribute:

```html
<div id="demo" data-collapse="persist">
  ...
</div>
```

jQuery Collapse uses HTML5 localStorage if available, otherwise it
will attempt to use cookies. If that also fails, it will degrade
to work but without any persistance.

You can combine the accordion an persistance options by adding
both values to the data-collapse attribute:

```html
<div id="demo" data-collapse="accordion persist">
  ...
</div>
```


## API Documentation

Here are the exposed options and events that you can play around with
using JavaScript. Enjoy.

### Options

These are options that you can pass when initializing
the plugin with JavaScript.

* **show** (function) : Custom function for showing content (default: function(){ this.show() })
* **hide** (function) : Custom function for hiding content (default: function(){ this.hide() })
* **accordion** (bool) : Enable accordion behaviour by setting this option to 'true'
* **persist** (bool) : Enable persistance between page loads by setting this option to 'true'

Example usage of options:
```js

// Initializing collapse plugin
// with custom show/hide methods,
// persistance plugin and accordion behaviour

$("#demo").collapse({
  show: function() {
    this.animate({
      opacity: 'toggle', 
      height: 'toggle'
    }, 300);
  },
  hide: function() {
    this.animate({
      height: 'toggle'
    }, 100);
  },
  accordion: true,
  persist: true
});
```

### Events

* **open** (event) : Event for section open 
* **close** (event) : Event for section close

The events can be triggered as follows:
```js

// Initializing plugin
$("#demo").collapse();

// Open event
$("#demo".bind("open", function(el) {
  console.log("Opening:", el);
});
$("#demo").trigger('open'); // Opening all sections
$("#demo h2").first().trigger('open'); // Opening the first section

// Close event
$("#demo").bind("close", function(el) {
  console.log("Closing:", el);
})
$("#demo").trigger('close');
$("#demo h2").last().trigger('open'); // Closing the last section
```


## Contributing

Did you find a bug? Do you want to introduce a feature? Here's what to do (in the following order)

* Find a bug, or invent a feature.
* Write a test case (located in ./spec/*_spec.coffee)
* Watch it fail (red light)
* Fix bug / introduce feature
* Watch it pass (green light)
* Refactor / Perfectionize!
* Do a pull request on Github
* Wait patiently...
* Rejoice!

Tests are written in CoffeeScript with a BDD flavour using the [Buster.js](http://busterjs.org/) test framework.

Thanks in advance
