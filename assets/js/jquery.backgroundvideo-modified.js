/*
* Modified version of jQuery Background video plugin for jQuery
* so it works on any container
* ---
* Copyright 2011, Victor Coulon (http://victorcoulon.fr)
* Released under the MIT, BSD, and GPL Licenses.
* based on jQuery Plugin Boilerplate 1.3
*/

(function($) {

  $.backgroundVideo = function(el, options) {

    var defaults = {
      videoid: "video_background"
    }

    var plugin = this;

    plugin.settings = {}

    var init = function() {
      plugin.settings = $.extend({}, defaults, options);
      plugin.el = el;

      buildVideo();
    }

    var buildVideo = function () {
      
      //alert(plugin.settings.responsiveWidth);
      if ($(window).width() <= plugin.settings.responsiveWidth) {
        var html ='<div class="videoPoster" style="position:absolute; z-index:-10; width:100%; height:500px; background:transparent url('+plugin.settings.path+plugin.settings.poster+') no-repeat center center; background-size:contains;"></div>';
        plugin.el.prepend(html);
      } else {
        var html = '';
        html += '<video id="'+plugin.settings.videoid+'" muted preload="auto" autoplay="autoplay" loop="loop"';

        if (plugin.settings.poster) {
          html += ' poster="' + plugin.settings.path+plugin.settings.poster + '" ';
        }

        html += 'style="display:none;position:absolute;top:0;left:0;bottom:0;right:0;z-index:-100;width:100%;height:100%;">';
        for(var i=0; i < plugin.settings.types.length; i++) {
          html += '<source src="'+plugin.settings.path+plugin.settings.filename+'.'+plugin.settings.types[i]+'" type="video/'+plugin.settings.types[i]+'" />';
        }
        html += 'bgvideo</video>';
        plugin.el.prepend(html);
        plugin.videoEl = document.getElementById(plugin.settings.videoid);
        plugin.$videoEl = $(plugin.videoEl);
        plugin.$videoEl.fadeIn(2000);
        setProportion();
      }
    }

    var setProportion = function () {
      var proportion = getProportion();
      plugin.$videoEl.width(proportion*plugin.settings.width);
      plugin.$videoEl.height(proportion*plugin.settings.height);

      if (typeof plugin.settings.align !== 'undefined') {
        centerVideo();
      }
    }

    var getProportion = function () {
      var windowWidth = el.width();
      var windowHeight = el.height();
      var windowProportion = windowWidth / windowHeight;
      var origProportion = plugin.settings.width / plugin.settings.height;
      var proportion = windowHeight / plugin.settings.height;

      if (windowProportion >= origProportion) {
        proportion = windowWidth / plugin.settings.width;
      }

      return proportion;
    }

    var centerVideo = function() {
      var centerX = ((el.width() >> 1) - (plugin.$videoEl.width() >> 1)) | 0;
      var centerY = ((el.height() >> 1) - (plugin.$videoEl.height() >> 1)) | 0;

      if (plugin.settings.align == 'centerXY') {
        plugin.$videoEl.css({ 'left': centerX, 'top': centerY });
        return;
      }

      if (plugin.settings.align == 'centerX') {
        plugin.$videoEl.css('left', centerX);
        return;
      }

      if (plugin.settings.align == 'centerY') {
        plugin.$videoEl.css('top', centerY);
        return;
      }
    }

    init();

    $(window).resize(function() { setProportion(); });
    plugin.$videoEl.bind('ended', function(){ this.play(); });
  }
})(jQuery);
