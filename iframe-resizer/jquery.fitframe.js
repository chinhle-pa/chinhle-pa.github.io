/*!
 * jQuery fitframe plugin
 * Further changes, comments: @benfosterdev
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {
 
    var pluginName = 'fitframe',
        defaults = {
            fitHeight: false
        },
        ratioKey = 'fitframe-ratio';
  
    function Fitframe(container, options) {
      this.container = $(container);
      this.options = $.extend({}, defaults, options);
  
      this._defaults = defaults;
      this._name = pluginName;
  
      this.init();
    }
  
    Fitframe.prototype.resize = function() {
  
      var containerWidth = this.container.width(),
          containerHeight = this.container.height(),
          fitHeight = this.options.fitHeight;
  
      this.container.find('iframe').each(function() {
        var $e = $(this),
            ratio = $e.data(ratioKey),
            newHeight = containerWidth * ratio;
  
        if (fitHeight && (newHeight > containerHeight)) {
          // the height overlaps the container so scale the width instead
          $e.height(containerHeight)
            .width(containerHeight / ratio);
        } else {
          // scale the height
          $e.height(containerWidth * ratio)
            .width('100%');
        }
      });
    };  
  
    Fitframe.prototype.init = function() {
  
      this.container.find('iframe').each(function() {
        var $e = $(this);
        $e.data(ratioKey, ($e.attr('height') / $e.attr('width')).toPrecision(4));
      });
  
      var self = this, t;
      // debounced resizing
      window.onresize = function () {
          clearTimeout(t);
          t = setTimeout(function () {
              self.resize();
          }, 100);
      };
  
      this.resize();
    };
  
    // A really lightweight plugin wrapper around the constructor
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Fitframe(this, options));
        }
      });
    }
   
  }( jQuery, window, document ));