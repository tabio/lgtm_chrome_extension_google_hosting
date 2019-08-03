(function() {
  var atwhoOptions, previewUrl;
  var domain = 'https://hoge.com/';

  function get_images(target, callback) {
    var images = [];
    $.each(target, function(id, data) {
      var url = domain + data['url'];
      images.push({
        name: url,
        imageUrl: url,
        imagePreviewUrl: url,
        alt: 'LGTM'
      });
    });

    for (var i = images.length - 1; i >= 0; i--){
      var rand = Math.floor( Math.random() * ( i + 1 ) );
      [images[i], images[rand]] = [images[rand], images[i]]
    }

    return callback(images.sort(function() { Math.random() - .5; }).slice(0,5));
  }

  atwhoOptions = {
    at: "!",
    tpl: '<li class="lttm" data-value="![${alt}](${imageUrl})"><img src="${imagePreviewUrl}" /></li>',
    limit: 80,
    display_timeout: 1000,
    search_key: null,
    callbacks: {
      matcher: function(flag, subtext) {
        var match, regexp;
        regexp = new XRegExp("(\\s+|^)" + flag + "([\\p{L}_-]+)$", "gi");
        match = regexp.exec(subtext);
        if (!(match && match.length >= 2)) {
          return null;
        }
        return match[2];
      },
      remote_filter: function(query, callback) {
        var kind, task1, task2, task3, url;
        if (!query) {
          return;
        }
        kind = query[0].toLowerCase();
        query = query.slice(1);
        function logResult(json){
          console.log(json);
        }

        switch (false) {
          case kind !== 'w':
            return $.getJSON(chrome.extension.getURL('/config/women.json'), function(women) {
              get_images(women, callback)
            });
            break;
        }
      }
    }
  };

  previewUrl = function(url) {
    var hmac, shaObj;
    if (location.protocol === "http:") {
      return url;
    }
    if (url.indexOf('https:') === 0) {
      return url;
    }
    shaObj = new jsSHA("SHA-1", 'TEXT');
    shaObj.setHMACKey('lttmlttm', 'TEXT');
    shaObj.update(url);
    hmac = shaObj.getHMAC('HEX');
    return "https://lttmcamo.herokuapp.com/" + hmac + "?url=" + url;
  };

  $(document).on('focusin', function(ev) {
    var $this;
    $this = $(ev.target);
    if (!$this.is('textarea')) {
      return;
    }
    return $this.atwho(atwhoOptions);
  });

  $(document).on('keyup.atwhoInner', function(ev) {
    return setTimeout(function() {
      var $currentItem, $parent, offset;
      $currentItem = $('.atwho-view .cur');
      if ($currentItem.length === 0) {
        return;
      }
      $parent = $($currentItem.parents('.atwho-view')[0]);
      offset = Math.floor($currentItem.offset().top - $parent.offset().top) - 1;
      if ((offset < 0) || (offset > 250)) {
        return setTimeout(function() {
          var row;
          offset = Math.floor($currentItem.offset().top - $parent.offset().top) - 1;
          row = Math.floor(offset / 150);
          return $parent.scrollTop($parent.scrollTop() + row * 150 - 75);
        }, 100);
      }
    });
  });

}).call(this);
