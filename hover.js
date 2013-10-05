;(function($) {

  var initialized = false;
  var overlayHtml = '<div class="overlay">';

  var shadowSvg =
    '<svg class="hoverize-helper" width="0" height="0">' +
      '<filter id="hoverize-shadow">' +
        '<feGaussianBlur in="SourceAlpha" stdDeviation="5"/>' +
        '<feOffset dx="0" dy="0" result="offsetblur"/>' +
        '<feMerge> ' +
          '<feMergeNode/>' +
          '<feMergeNode in="SourceGraphic"/>' +
        '</feMerge>' +
      '</filter>' +
    '</svg>';

  function itemSvg(o) {
    return (
      '<svg class="item" width="'+o.width+'" height="'+o.height+'" style="left:'+o.x+'px;top:'+o.y+'px">' +
        '<defs>' +
          '<pattern id="hoverize-'+o.id+'" width="'+o.width+'" height="'+o.height+'" patternTransform="translate('+o.x+' '+o.y+')" patternUnits="userSpaceOnUse">' +
            '<image x="-'+o.x+'" y="-'+o.y+'" width="'+o.imageWidth+'" height="'+o.imageHeight+'" xlink:href="'+o.imageHref+'"/>' +
          '</pattern>' +
        '</defs>' +
        '<path transform="translate(-'+o.x+' -'+o.y+')" d="'+o.d+'" style="fill:url(#hoverize-'+o.id+');filter:url(#hoverize-shadow)"/>' +
      '</svg>'
    );
  }

  $.fn.hoverize = function() {
    var $el = this, $img = $el.find('img');

    if (!initialized) {
      $('body').append(shadowSvg);
      initialized = true;
    }

    $el.addClass('hoverized').append(overlayHtml);;

    // FIXME and if already loaded?
    $img.on('load', function() {
      // XXX each <li>
      $el.prepend(itemSvg({
        id: 'lala',
        d: $el.find('li').eq(0).data('path'),
        x: 663,
        y: 58,
        width: 120,
        height: 120,
        imageHref: $img.attr('src'),
        imageWidth: $img.width(),
        imageHeight: $img.height()
      }));
    });
  };

}(jQuery));
