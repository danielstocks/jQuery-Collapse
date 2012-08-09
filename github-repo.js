var script = document.createElement('script');
script.src = "https://api.github.com/repos/danielstocks/jQuery-Collapse?callback=parse"
document.getElementsByTagName("head")[0].appendChild(script);

function parse(res) {

  var data = res.data;
  $(".gh-star-count a").text(res.data.watchers);
}

