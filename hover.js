;(function($) {

  var initialized = false;
  var idCounter = 0;

  var shadowSvg =
    '<svg width="0" height="0">' +
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
      '<svg class="item" width="'+o.width+'" height="'+o.height+'">' +
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

    $el.addClass('hoverized');

    // FIXME and if already loaded?
    $img.on('load', function() {
      $el.find('li').each(function() {
        var id = 'hoverize-' + idCounter++, $li = $(this);

        // FIXME this is nasty
        var $svg = $(itemSvg({
          id: id,
          d: $li.data('path'),
          x: 0,
          y: 0,
          width: 9999,
          height: 9999,
          imageHref: $img.attr('src'),
          imageWidth: $img.width(),
          imageHeight: $img.height()
        }));
        $('body').append($svg);

        var box = $svg.find('path')[0].getBBox();
        $svg.remove();

        $svg = $(itemSvg({
          id: id,
          d: $li.data('path'),
          x: Math.round(box.x) - 5,
          y: Math.round(box.y) - 5,
          width: Math.round(box.width) + 10,
          height: Math.round(box.height) + 10,
          imageHref: $img.attr('src'),
          imageWidth: $img.width(),
          imageHeight: $img.height()
        })).on('mouseover', function() {
          $el.addClass('dimmed');
          $li.addClass('active');
        });

        $li.prepend($svg).on('mouseleave', function() {
          $el.removeClass('dimmed');
          $li.removeClass('active');
        }).css({
          left: Math.round(box.x) - 5,
          top: Math.round(box.y) - 5
        });

        var $div = $li.find('div');
        $div.css('margin-left', ($svg.width() - $div.outerWidth()) / 2);
      });
    });
  };

}(jQuery));
