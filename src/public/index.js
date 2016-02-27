$(document).ready(function() {
  var $search = $('.search').val().toLowerCase();
  callWikipediaAPI($search);
  $('#debug').html($search);
});

// https://gist.github.com/steren/704540
var wikipediaHTMLResult = function(data) {
  var readData = $('<div>' + data.parse.text["*"]+'</div>');
  // handle redirects
  var redirect = readData.find('li:contains("REDIRECT") a').text();
  if (redirect != '') {
    callWikipediaAPI(redirect);
    return;
  }

  var box = readData.find('.infobox');

  var binomialName = box.find('.binomial').text();
  var fishName = box.find('th').first().text();
  var imageURL = null;
  // Check if page has images
  if (data.parse.images.length >= 1) {
    imageURL = box.find('img').first().attr('src');
  }

  $('.demo-card-image').append('<div><img src="' + imageURL + '"/>' + fishName + ' <i>(' + binomialName + ')</i></div>');
};

function callWikipediaAPI(pageName) {
  // http://www.mediawiki.org/wiki/API:Parsing_wikitext#parse
  $.getJSON("http://en.wikipedia.org/w/api.php?action=query&format=json&callback=?", {
    titles: pageName,
    prop: "images"
  }, wikipediaImageResult);
}
