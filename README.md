# jQuery Collapse

A lightweight and flexible jQuery plugin that allows you to collapse content. A feature also known as 'progressive disclosure'.

jQuery Collapse is tested against the latest version of jQuery but requires at least jQuery 1.7.0.

[![Build Status](https://travis-ci.org/danielstocks/jQuery-Collapse.png?branch=master)](https://travis-ci.org/danielstocks/jQuery-Collapse)
[![Code Climate](https://codeclimate.com/github/danielstocks/jQuery-Collapse.png)](https://codeclimate.com/github/danielstocks/jQuery-Collapse)
[![Coveralls](https://img.shields.io/coveralls/danielstocks/jQuery-Collapse/master.svg)](https://coveralls.io/github/danielstocks/jQuery-Collapse?branch=master)

## Features

- [WAI ARIA](http://dev.opera.com/articles/view/introduction-to-wai-aria/) compliant
- Lightweight (~1.2kb minified and gzipped)
- Cross Browser compliant (Tested in >= IE6, Firefox, Safari, Chrome, Opera)
- **Accordion** behaviour can be enabled.
- **Persistence** to remember open sections on page reload!


### Demo

A demo showcasing all the features of the plugin can be found at 'demo/demo.html' in this repository.

## Usage

Load jQuery and the jQuery Collapse plugin into your document:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script src="jquery.collapse.js"></script>
```

Here's some sample HTML markup:

```html
<div data-collapse>
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

### Open/Collapse section by default

The standard behaviour is to collapse all the sections on page load.
If you want to show a section to the user on page load you can
achieve this by adding an 'open' class to the section heading

```html
<div data-collapse>
  <h2 class="open">I'm open by default</h2>
  <p>Yay</p>
</div>
```

### Open all sections

You can open or close sections by utilizing events. Assume you have the following markup:

```html
<div id="test" data-collapse>
  <h2>Section 1</h2>
  <p>I'm first</p>
  <h2>Section 2</h2>
  <p>I'm second/p>
</div>
```
You can now trigger events on the elements you want to affect. For instance:

```js
$("#test").trigger("open") // Open all sections
$("#test").trigger("close") // Close all sections
$("#test h2 a").first().trigger("open") // Open first section
```

For further information, please refer to the [events](#events) documentation.

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

### Using custom markup

By default the plugin will look for groups of two elements.
In real life™ your markup may vary and you'll need to customize how the
plugin interprets it. For example

```html
<div id="demo">
  <div>
    <h2>Summary</h2>
    <div>details...</div>
  </div>
  <div>
    <h2>Summary</h2>
    <div>details...</div>
  </div>
</div>
```

In order for the plugin to understand the above markup, we can pass a 'query'
option specifying where to find the header/summary element of a section:

```js
new jQueryCollapse($("#demo"), {
  query: 'div h2'
});
```

#### External markup example

You can also just use an arbitrary link on a page to collapse\expand a section:

```html
<a id="toggle" href="#demo">Toggle section</a>
<div id="demo" data-collapse>
  <div>
    <h2>Summary</h2>
    <div>details...</div>
  </div>
</div>
```

Then attach an event handler to your link and make use of jQuery Collapse events to toggle the section:

```js
$("#toggle").click(function() {
  $(this.hash).trigger("toggle");
});
```

#### Custom click query

Sometimes you want to customize what element inside the collapse summary that should trigger the open/close action. Consider the following markup:

```html
<div id="custom-click-query">
  <div class="test">
    <a href="http://www.google.com">Google.com</a> <span class="toggle">info</span>
  </div>
  <div>
    <p>Find stuff on google</p>
  </div>
  <div class="test">
    <a href="http://www.twitter.com">Twitter.com</a> <span class="toggle">info</span>
  </div>
  <div>
    <p>Tweet stuff on twitter</p>
  </div>
</div>
```

Now use the clickQuery option to trigger the action only when the span is clicked

```js
$("#custom-click-query").collapse({
  clickQuery: "span.toggle"
});
```


## Accordion

To activate the accordion behaviour set 'accordion' as the value of the 'data-collapse' attribute:

```html
<div data-collapse="accordion">
  ...
</div>
```


## Persistence

By default, if the user reloads the page all the sections will be closed.
If you want previously collapsed sections to stay open you can add 'persist' to the data-collapse attribute:

```html
<div id="demo" data-collapse="persist">
  ...
</div>
```
And include the storage module in your document *after* the other
scripts.

```html
<script src="jquery.collapse_storage.js"></script>
```

As in the example above, the target element (#demo) **will require an ID** in order for the
persistence to work.

You can combine the accordion and persistence options by adding
both values to the data-collapse attribute:

```html
<div id="demo" data-collapse="accordion persist">
  ...
</div>
```

jQuery Collapse uses HTML5 localStorage if available, otherwise it
will attempt to use cookies (read about IE support below). If that also fails, it will degrade
to work but without any persistence.

### Internet Explorer =< 7 Support

For IE 6-7 you'll need to include the cookie storage and JSON2 libraries
for the cookie storage support to work properly:

```html
<!--[if lt IE 8]>
  <script src="jquery.collapse_cookie_storage.js"></script>
  <script src="json2.js"></script>
<![endif]-->
```

## API Documentation

Here are the exposed options and events that you can play around with
using JavaScript. Enjoy.

### Options

You can pass the following options when initializing
the plugin with JavaScript.

* **open** (function) : Custom function for opening section (default: function(){ this.show() })
* **close** (function) : Custom function for collapsing section (default: function(){ this.hide() })
* **accordion** (bool) : Enable accordion behaviour by setting this option to 'true'
* **persist** (bool) : Enable persistence between page loads by setting this option to 'true'
* **query** (string) : Please refer to to [using custom markup](#using-custom-markup)
* **clickQuery** (string): Please refer to [custom click query](#custom-click-query)

Example usage of options:

```js
// Initializing collapse plugin
// with custom open/close methods,
// persistence plugin and accordion behaviour
$("#demo").collapse({
  open: function() {
    // The context of 'this' is applied to
    // the collapsed details in a jQuery wrapper
    this.slideDown(100);
  },
  close: function() {
    this.slideUp(100);
  },
  accordion: true,
  persist: true
});
```

### Events

#### Binding events

You can listen for the **opened** and **closed** events on a collapsed collection.

```js

$("#demo").bind("opened", function(e, section) {
  console.log(section, " was opened");
});

$("#demo").bind("closed", function(e, section) {
  console.log(section, " was closed");
});
```

#### Triggering events

You can manually trigger an **open**, **close** or **toggle** event to change the state of a section:

```js
$("#demo").trigger("open") // open all sections
$("#demo").trigger("close") // close all sections
$("#demo h2 a").last().trigger("toggle") // toggle last section
```

When a section changes state, it will trigger either an "opened" or "closed" event in return, depending on it's new state.

### API methods

If you're using vanilla JavaScript to instantiate the plugin, you'll get
direct access to the **open**, **close** and **toggle** methods.

```js
var demo = new jQueryCollapse($("#demo")); // Initializing plugin
demo.open(); // Open all sections
demo.close(); // Close all sections
demo.open(0); // Open first section
demo.open(1); // Open second section
demo.close(0); // Close first section
demo.toggle(1); // Toggle second section
```

## Contributing

Did you find a bug? Do you want to introduce a feature? Here's what to do (in the following order)

* Clone this repository, and run `npm install`
* Write a test case
* Watch it fail (red light)
* Fix bug / introduce feature
* Watch it pass (green light)
* Refactor / Perfectionize!
* Submit a pull request on Github and wait patiently...
* Rejoice!

### A note about testing

To run the tests simply type "npm test". The [Karma](http://karma-runner.github.io/) test runner will open Chrome and Firefox and run the tests.

The tests are written in a BDD fashion using CoffeeScript and can be found in the test directory.

The test suite uses [Mocha](http://visionmedia.github.io/mocha/) (test framework), [Chai](http://chaijs.com/) (exceptions) and [Sinon](http://sinonjs.org/) (stubs and mocks).
