(function (window) {
  var svgSprite = '<svg><symbol id="icon-yonghu" viewBox="0 0 1024 1024"><path d="M793.2928 828.0576c-5.504-85.0176-46.0544-164.1216-111.2576-217.0368l-3.8912-2.7904-0.0512 0.0768a22.7328 22.7328 0 0 0-12.288-3.6352c-14.9248 0-23.8592 7.4752-23.8592 19.968 0 7.296 3.2512 14.1312 8.704 18.7648l-0.0512 0.128 3.456 2.56c54.6816 40.4992 85.4528 101.9136 91.4944 182.6048l0.0512 0.896a26.368 26.368 0 0 0-0.0768 2.048c0 13.6192 10.6496 24.6784 23.8336 24.6784 12.6976 0 23.0912-10.3168 23.7824-23.3216H793.6l-0.3072-4.9408zM716.544 414.5664c0-122.7264-97.5104-222.5664-217.344-222.5664-119.8848 0-217.3952 99.84-217.3952 222.5664a223.5392 223.5392 0 0 0 77.696 170.3168c-88.8064 49.1008-147.7376 142.7712-154.368 246.1696l-0.2816 4.3008-0.0256 0.2816-0.0256 0.4096v0.6144c0 11.5712 9.0624 20.9408 20.1984 20.9408s20.1984-9.3696 20.1984-20.9152l-0.0256-0.6144h0.4352l0.3328-4.3008c7.3216-98.2784 67.4304-184.32 153.3184-219.776 25.6512 12.3136 64.7936 25.1904 99.8912 25.1904 32.5376 0 64.1792-7.424 94.2592-22.2464l22.0416-13.2864 17.9968-12.2368a223.4112 223.4112 0 0 0 83.0976-174.848zM499.2 592.384c-95.7952 0-173.696-79.7696-173.696-177.8176 0-97.9968 77.9008-177.7408 173.696-177.7408s173.696 79.744 173.696 177.7408c0 98.0224-77.9008 177.8176-173.696 177.8176z" fill="#eee"></path></symbol><symbol id="icon-mima" viewBox="0 0 1024 1024"><path d="M765.946 371.964v-70.080c-1.469-139.498-116.362-252.991-256.086-252.991-140.225 0-255.055 113.82-256.153 253.921v69.409c-63.951 4.994-114.444 59.148-114.444 125.108v329.739c0 69.203 55.713 125.491 124.112 125.491h496.994c68.481 0 124.112-56.292 124.112-125.491v-329.739c0-67.299-52.685-122.465-118.541-125.356zM296.846 303.060c0.911-112.507 98.308-208.369 211.286-208.369 112.618 0 213.486 95.628 214.659 207.739v68.219h-425.949v-67.586zM846.142 827.031c0 41.52-44.732 84.111-85.778 84.111h-496.994c-41.050 0-84.036-42.582-84.036-84.111v-329.715c0-41.52 33.406-87.837 74.482-87.837h496.976c41.070 0 95.359 46.309 95.359 87.837v329.715zM509.855 499.076c-56.833 0.006-102.896 46.074-102.954 102.896 0 32.309 15.381 62.423 40.938 81.757v104.658c0 13.895 11.094 25.055 24.775 25.055h74.325c13.695 0 24.831-11.162 24.831-25.055v-104.658c24.915-18.911 40.847-48.526 40.891-81.863-0.042-56.709-46.046-102.721-102.803-102.794zM547.602 655.040c-9.717 5.283-15.75 15.559-15.75 26.685v95.422h-42.133v-95.422c0-11.094-6.052-21.372-15.75-26.685-20.623-11.231-27.693-32.508-27.693-55.483 0-35.062 28.785-63.525 64.158-63.525 35.399 0 64.208 28.465 64.208 63.525-0.085 22.972-6.412 44.258-27.046 55.483z" fill="#eee"></path></symbol></svg>';
  var script = function () {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1]
  }();
  var shouldInjectCss = script.getAttribute("data-injectcss");
  var ready = function (fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function () {
          document.removeEventListener("DOMContentLoaded", loadFn, false);
          fn()
        };
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        init = function () {
          if (!done) {
            done = true;
            fn()
          }
        };
      var polling = function () {
        try {
          d.documentElement.doScroll("left")
        } catch (e) {
          setTimeout(polling, 50);
          return
        }
        init()
      };
      polling();
      d.onreadystatechange = function () {
        if (d.readyState == "complete") {
          d.onreadystatechange = null;
          init()
        }
      }
    }
  };
  var before = function (el, target) {
    target.parentNode.insertBefore(el, target)
  };
  var prepend = function (el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  };

  function appendSvg() {
    var div, svg;
    div = document.createElement("div");
    div.innerHTML = svgSprite;
    svgSprite = null;
    svg = div.getElementsByTagName("svg")[0];
    if (svg) {
      svg.setAttribute("aria-hidden", "true");
      svg.style.position = "absolute";
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = "hidden";
      prepend(svg, document.body)
    }
  }
  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
    } catch (e) {
      console && console.log(e)
    }
  }
  ready(appendSvg)
})(window)
