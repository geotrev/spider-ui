
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /*!
    * @license MIT (https://github.com/geotrev/upgraded-element/blob/master/LICENSE)
    * upgraded-element v0.2.1 (https://github.com/geotrev/upgraded-element)
    * Copyright 2020 George Treviranus
    */
  var e = ["checked", "selected", "value"],
      t = function t(e, _t) {
    _t.forEach(function (t) {
      return e.style[t.name] = "";
    });
  },
      n = function n(e, _n2) {
    _n2.forEach(function (n) {
      "class" === n.name ? e.className = n.value : "style" === n.name ? function (e, n) {
        var r = function (e) {
          return e.split(";").map(function (e) {
            var t = e.trim();

            if (t.indexOf(":") > 0) {
              var _t$split = t.split(":"),
                  _t$split2 = _slicedToArray(_t$split, 2),
                  _e = _t$split2[0],
                  _n = _t$split2[1];

              return {
                name: _e ? _e.trim() : "",
                value: _n ? _n.trim() : ""
              };
            }
          });
        }(n),
            i = Array.prototype.filter.call(e.style, function (t) {
          return void 0 === r.find(function (n) {
            return n.name === t && n.value === e.style[t];
          });
        });

        t(e, i), function (e, t) {
          t.forEach(function (t) {
            return e.style[t.name] = t.value;
          });
        }(e, r);
      }(e, n.value) : (n.name in e && (e[n.name] = n.value || n.name), e.setAttribute(n.name, n.value || ""));
    });
  },
      r = function r(e) {
    var t;
    return t = "text" === e.type ? document.createTextNode(e.content) : "comment" === e.type ? document.createComment(e.content) : e.isSVG ? document.createElementNS("http://www.w3.org/2000/svg", e.type) : document.createElement(e.type), n(t, e.attributes), e.children.length > 0 ? e.children.forEach(function (e) {
      t.appendChild(r(e));
    }) : "text" !== e.type && (t.textContent = e.content), t;
  },
      i = function i(e, t) {
    return {
      name: e,
      value: t
    };
  },
      o = function o(t) {
    var n = (r = t, Array.prototype.reduce.call(r.attributes, function (t, n) {
      return e.indexOf(n.name) < 0 && t.push(i(n.name, n.value)), t;
    }, []));
    var r;
    return function (t, n) {
      e.forEach(function (e) {
        t[e] && n.push(i(e, t[e]));
      });
    }(t, n), n;
  },
      s = function s(r, i) {
    var o = i.attributes.filter(function (e) {
      return null === r.attributes.find(function (t) {
        return e.name === t.name;
      });
    }),
        s = r.attributes.filter(function (t) {
      if (e.indexOf(t.name) > -1) return !1;
      var n = find(i.attributes, function (e) {
        return t.name === e.name;
      });
      return null === n || n.value !== t.value;
    });
    var l;
    n(i.node, s), l = i.node, o.forEach(function (e) {
      "class" === e.name ? l.className = "" : "style" === e.name ? t(l, Array.prototype.slice.call(l.style)) : (e.name in l && (l[e.name] = ""), l.removeAttribute(e.name));
    });
  },
      l = function l(e, t, n) {
    var i = t.length - e.length;
    if (i > 0) for (; i > 0; i--) {
      var _e2 = t[t.length - i];

      _e2.node.parentNode.removeChild(_e2.node);
    }
    e.forEach(function (i, o) {
      var a = t[o],
          c = e[o];
      if (!a) return n.appendChild(r(c));
      if (c.type !== a.type) return a.node.parentNode.replaceChild(r(c), a.node);
      if (s(c, a), c.content && c.content !== a.content && (a.node.textContent = c.content), a.children.length > 0 && i.children.length < 1) return a.node.innerHTML = "";

      if (a.children.length < 1 && i.children.length > 0) {
        var _e3 = document.createDocumentFragment();

        return l(i.children, a.children, _e3), n.appendChild(_e3);
      }

      i.children.length > 0 && l(i.children, a.children, a.node);
    });
  },
      a = function a(e, t) {
    return Array.prototype.map.call(e.childNodes, function (e) {
      var n = 3 === e.nodeType ? "text" : 8 === e.nodeType ? "comment" : e.tagName.toLowerCase(),
          r = 1 === e.nodeType ? o(e) : [],
          i = {
        node: e,
        content: e.childNodes && e.childNodes.length > 0 ? null : e.textContent,
        attributes: r,
        type: n
      };
      return i.isSVG = t || "svg" === i.type, i.children = a(e, i.isSVG), i;
    });
  },
      c = function c(e) {
    return e && e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (e) {
      return e.toLowerCase();
    }).join("-");
  },
      h = function h(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  },
      d = function d(e) {
    return !function (e) {
      return "object" === h(e);
    }(e) || !Object.keys(e).length;
  },
      m = function m(e) {
    return "function" === h(e);
  },
      u = function u(e) {
    return "string" === h(e);
  };

  function p() {
    var e = window.requestAnimationFrame,
        t = window.cancelAnimationFrame,
        n = window.setTimeout,
        r = window.clearTimeout;
    var i = null;

    function o(e, t, n, r) {
      i && (i = n(i)), i = t(function () {
        e(), i = null;
      }, r);
    }

    return function (i) {
      return function (i) {
        m(e) ? o(i, e, t) : m(n) && o(i, n, r, 1e3 / 60);
      }(i);
    };
  }

  var y = Symbol("#elementId"),
      b = Symbol("#shadowRoot"),
      f = Symbol("#vDOM"),
      g = Symbol("#getDOMString"),
      S = Symbol("#getVDOM"),
      v = Symbol("#isFirstRender"),
      C = Symbol("#schedule"),
      w = Symbol("#initialize"),
      E = Symbol("#runLifecycle"),
      A = Symbol("#performUpgrade"),
      x = Symbol("#upgradeProperty"),
      O = Symbol("#renderStyles"),
      N = Symbol("#getInitialRenderState"),
      M = Symbol("#getNextRenderState"),
      T = Symbol("#renderDOM");

  var UpgradedElement = /*#__PURE__*/function (_HTMLElement) {
    _inherits(UpgradedElement, _HTMLElement);

    var _super = _createSuper(UpgradedElement);

    function UpgradedElement() {
      var _this;

      _classCallCheck(this, UpgradedElement);

      _this = _super.call(this), _this[w]();
      return _this;
    }

    _createClass(UpgradedElement, [{
      key: "adoptedCallback",
      value: function adoptedCallback() {}
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(e, t, n) {
        t !== n && this[E]("elementAttributeChanged", e, t, n);
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.isConnected && (this[E]("elementDidConnect"), this[O](), this.requestRender());
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this[E]("elementWillUnmount"), this[f] = null;
      }
    }, {
      key: "requestRender",
      value: function requestRender() {
        this[C](this[T]);
      }
    }, {
      key: "validateType",
      value: function validateType(e, t, n) {
        var r = h(t);
        void 0 !== n && r !== n && console.warn("Property '".concat(e, "' is invalid type of '").concat(r, "'. Expected '").concat(n, "'. Check ").concat(this.constructor.name, "."));
      }
    }, {
      key: E,
      value: function value(e) {
        for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          t[_key - 1] = arguments[_key];
        }

        m(this[e]) && this[e].apply(this, t);
      }
    }, {
      key: w,
      value: function value() {
        this[C] = p(), this[T] = this[T].bind(this), this[v] = !0, this[f] = [], this[b] = this.attachShadow({
          mode: "open"
        }), this[y] = function () {
          var e = Number.MAX_SAFE_INTEGER;
          return Math.floor(Math.random() * e).toString(36) + Math.abs(Date.now()).toString(36);
        }(), this.setAttribute("element-id", this.elementId), this[A]();
      }
    }, {
      key: A,
      value: function value() {
        var _this2 = this;

        var e = this.constructor.properties;
        d(e) || Object.keys(e).forEach(function (t) {
          _this2[x](t, e[t]);
        });
      }
    }, {
      key: x,
      value: function value(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), e)) return;
        var n = "symbol" === h(e) ? Symbol() : "__private_".concat(e, "__");
        var r = t.default,
            i = t.type,
            _t$reflected = t.reflected,
            o = _t$reflected === void 0 ? !1 : _t$reflected;
        var s = m(r) ? r(this) : r;
        (function (e) {
          return "undefined" === h(e);
        })(s) || (i && this.validateType(e, s, i), this[n] = s), Object.defineProperty(this, e, {
          configurable: !0,
          enumerable: !0,

          get() {
            return this[n];
          },

          set(t) {
            if (t === this[n]) return;
            i && this.validateType(e, t, i);
            var r = c(e),
                s = this[n];
            t ? (this[n] = t, this[E]("elementPropertyChanged", e, s, t), o && this.setAttribute(r, t)) : (this[n] = void 0, this[E]("elementPropertyChanged", e, s, t), o && this.removeAttribute(r)), this.requestRender();
          }

        });
      }
    }, {
      key: g,
      value: function value() {
        var e;
        if (!m(this.render)) throw new Error("You must include a render method in component: '".concat(this.constructor.name, "'"));
        if (e = this.render(), !u(e)) throw new Error("You attempted to render a non-string template in component: '".concat(this.constructor.name, "'."));
        return e;
      }
    }, {
      key: S,
      value: function value() {
        return a(function (e) {
          var t = e.trim().replace(/\s+</g, "<").replace(/>\s+/g, ">");
          return new DOMParser().parseFromString(t, "text/html").body;
        }(this[g]()));
      }
    }, {
      key: O,
      value: function value() {
        if (!u(this.constructor.styles)) return;
        var e = this.constructor.styles,
            t = document.createElement("style");
        t.type = "text/css", t.textContent = e, this[b].appendChild(t);
      }
    }, {
      key: N,
      value: function value() {
        this[f] = this[S](), function (e, t) {
          e.forEach(function (e) {
            return t.appendChild(e.node);
          });
        }(this[f], this[b]), this[E]("elementDidMount"), this[v] = !1;
      }
    }, {
      key: M,
      value: function value() {
        var e = this[S]();
        l(e, this[f], this[b]), e = null, this[E]("elementDidUpdate");
      }
    }, {
      key: T,
      value: function value() {
        if (this[v]) return this[N]();
        this[M]();
      }
    }, {
      key: "elementId",
      get: function get() {
        return this[y];
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        var _this3 = this;

        var e = [];
        return d(this.properties) || Object.keys(this.properties).forEach(function (t) {
          _this3.properties[t].reflected && e.push(c(t));
        }), e;
      }
    }]);

    return UpgradedElement;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  var D = function D(e, t) {
    customElements.get(e) || customElements.define(e, t);
  };

  var styles = "/*! minireset.css v0.0.5 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0;text-align:start}:host{display:inline-block}:host[hidden]{display:none}.tooltip{position:relative;display:inline-block}::slotted([slot=content]){font-size:14px;padding:4px 8px;border-radius:4px;position:absolute;display:block;transition:opacity cubic-bezier(0.12, 0.72, 0.58, 1.03) 100ms;word-wrap:break-word;white-space:nowrap;text-align:center;z-index:1999}.light ::slotted([slot=content]){border:1px solid #dedede;background:#fff;color:#111}.dark ::slotted([slot=content]){border:1px solid #111;background:#111;color:#fff}.hidden ::slotted([slot=content]){pointer-events:none;opacity:0}.visible ::slotted([slot=content]){pointer-events:auto;opacity:1}.block-start ::slotted([slot=content]){left:0;bottom:100%;margin:0 0 7px 0}.inline-end ::slotted([slot=content]){left:100%;margin-left:7px;margin-top:0;margin-bottom:0;bottom:auto;top:0}.inline-start ::slotted([slot=content]){right:100%;left:auto;margin-right:7px;margin-top:0;margin-bottom:0;bottom:auto;top:0}.block-end ::slotted([slot=content]){left:0;top:100%;margin:7px 0 0 0;bottom:auto}.dark.block-start.arrow ::slotted([slot=content])::after{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;left:calc(50% - 7px);right:auto;bottom:-12.5px;top:auto;border-top:7px solid #111}.dark.block-start.arrow ::slotted([slot=content])::before{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;left:calc(50% - 7px);right:auto;bottom:-14px;top:auto;border-top:7px solid #111}.dark.inline-end.arrow ::slotted([slot=content])::after{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;border-right:7px solid #111;left:-12.5px;right:auto;top:calc(50% - 7px);bottom:auto}.dark.inline-end.arrow ::slotted([slot=content])::before{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;border-right:7px solid #111;left:-14px;right:auto;top:calc(50% - 7px);bottom:auto}.dark.inline-start.arrow ::slotted([slot=content])::after{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;border-left:7px solid #111;right:-12.5px;left:auto;top:calc(50% - 7px);bottom:auto}.dark.inline-start.arrow ::slotted([slot=content])::before{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;border-left:7px solid #111;right:-14px;left:auto;top:calc(50% - 7px);bottom:auto}.dark.block-end.arrow ::slotted([slot=content])::after{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;left:calc(50% - 7px);right:auto;top:-12.5px;bottom:auto;border-bottom:7px solid #111}.dark.block-end.arrow ::slotted([slot=content])::before{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;left:calc(50% - 7px);right:auto;top:-14px;bottom:auto;border-bottom:7px solid #111}.light.block-start.arrow ::slotted([slot=content])::after{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;left:calc(50% - 7px);right:auto;bottom:-12.5px;top:auto;border-top:7px solid #fff}.light.block-start.arrow ::slotted([slot=content])::before{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;left:calc(50% - 7px);right:auto;bottom:-14px;top:auto;border-top:7px solid #dedede}.light.inline-end.arrow ::slotted([slot=content])::after{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;border-right:7px solid #fff;left:-12.5px;right:auto;top:calc(50% - 7px);bottom:auto}.light.inline-end.arrow ::slotted([slot=content])::before{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;border-right:7px solid #dedede;left:-14px;right:auto;top:calc(50% - 7px);bottom:auto}.light.inline-start.arrow ::slotted([slot=content])::after{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;border-left:7px solid #fff;right:-12.5px;left:auto;top:calc(50% - 7px);bottom:auto}.light.inline-start.arrow ::slotted([slot=content])::before{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;border-left:7px solid #dedede;right:-14px;left:auto;top:calc(50% - 7px);bottom:auto}.light.block-end.arrow ::slotted([slot=content])::after{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;left:calc(50% - 7px);right:auto;top:-12.5px;bottom:auto;border-bottom:7px solid #fff}.light.block-end.arrow ::slotted([slot=content])::before{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent;border-top:7px solid transparent;content:\"\";position:absolute;left:calc(50% - 7px);right:auto;top:-14px;bottom:auto;border-bottom:7px solid #dedede}";

  var Attributes = {
    POSITION: "position",
    MODE: "mode",
    SHOW_ARROW: "show-arrow"
  };
  var Positions = {
    BLOCK_START: "block-start",
    BLOCK_END: "block-end",
    INLINE_START: "inline-start",
    INLINE_END: "inline-end"
  };
  var Modes = {
    DARK: "dark",
    LIGHT: "light"
  };
  var ClassNames = {
    ARROW: "arrow",
    VISIBLE: "visible",
    HIDDEN: "hidden"
  };
  var TIMEOUT_DELAY = 300;

  var SpiderTooltip = /*#__PURE__*/function (_UpgradedElement) {
    _inherits(SpiderTooltip, _UpgradedElement);

    var _super = _createSuper(SpiderTooltip);

    _createClass(SpiderTooltip, [{
      key: "classNames",
      get: function get() {
        var showArrow = this.hasAttribute(Attributes.SHOW_ARROW);
        var positionValue = this.getAttribute(Attributes.POSITION);
        var modeValue = this.getAttribute(Attributes.MODE);
        var position = Object.values(Positions).includes(positionValue) ? positionValue : Positions.BLOCK_START;
        var mode = Object.values(Modes).includes(modeValue) ? modeValue : Modes.DARK;
        var hasArrow = showArrow ? ClassNames.ARROW : "";
        var isVisible = this.isVisible ? ClassNames.VISIBLE : ClassNames.HIDDEN;
        return {
          position,
          mode,
          hasArrow,
          isVisible
        };
      }
    }], [{
      key: "properties",
      get: function get() {
        return {
          isVisible: {
            type: "boolean",
            default: false
          }
        };
      }
    }, {
      key: "styles",
      get: function get() {
        return styles;
      }
    }]);

    function SpiderTooltip() {
      var _this;

      _classCallCheck(this, SpiderTooltip);

      _this = _super.call(this);
      _this.trigger = null;
      _this.content = null;
      _this.timeout = null;
      _this.handleOpen = _this.handleOpen.bind(_assertThisInitialized(_this));
      _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
      _this.handleKeydown = _this.handleKeydown.bind(_assertThisInitialized(_this));
      _this.removeTimeout = _this.removeTimeout.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(SpiderTooltip, [{
      key: "elementDidMount",
      value: function elementDidMount() {
        // set nodes
        this.trigger = this.querySelector("[slot='trigger']");
        this.content = this.querySelector("[slot='content']"); // set attributes

        this.trigger.setAttribute("aria-describedby", this.elementId);
        this.content.id = this.elementId;
        this.content.setAttribute("role", "tooltip");
        this.addOpenListeners();
        this.addCloseListeners();
      }
    }, {
      key: "elementWillUnmount",
      value: function elementWillUnmount() {
        this.trigger = null;
        this.content = null;
      }
    }, {
      key: "elementDidUpdate",
      value: function elementDidUpdate() {
        if (this.isVisible) {
          if (this.isInlineTooltip()) {
            this.alignTooltip("height");
          } else {
            this.alignTooltip("width");
          }
        }
      }
    }, {
      key: "listen",
      value: function listen(type, target, handler) {
        target.addEventListener(type, handler);
      }
    }, {
      key: "sleep",
      value: function sleep(type, target, handler) {
        target.removeEventListener(type, handler);
      }
    }, {
      key: "addOpenListeners",
      value: function addOpenListeners() {
        this.listen("focus", this.trigger, this.handleOpen);
        this.listen("focus", this.content, this.handleOpen);
        this.listen("mouseover", this.trigger, this.handleOpen);
        this.listen("mouseover", this.content, this.handleOpen);
      }
    }, {
      key: "addCloseListeners",
      value: function addCloseListeners() {
        this.listen("blur", this.trigger, this.handleClose);
        this.listen("blur", this.content, this.handleClose);
        this.listen("mouseout", this.trigger, this.handleClose);
        this.listen("mouseout", this.content, this.handleClose);
        this.listen("keydown", window, this.handleKeydown);
      }
    }, {
      key: "addOpenCancelListeners",
      value: function addOpenCancelListeners() {
        this.listen("mouseout", this.trigger, this.removeTimeout);
        this.listen("blur", this.trigger, this.removeTimeout);
        this.listen("mouseout", this.content, this.removeTimeout);
      }
    }, {
      key: "addCloseCancelListeners",
      value: function addCloseCancelListeners() {
        this.listen("mouseover", this.trigger, this.removeTimeout);
        this.listen("focus", this.trigger, this.removeTimeout);
        this.listen("mouseover", this.content, this.removeTimeout);
      }
    }, {
      key: "handleKeydown",
      value: function handleKeydown(event) {
        if (this.isVisible && event.key === "Escape") {
          this.removeTimeout();
          this.isVisible = false;
        }
      }
    }, {
      key: "removeTimeout",
      value: function removeTimeout() {
        if (this.timeout) clearTimeout(this.timeout);
      }
    }, {
      key: "handleOpen",
      value: function handleOpen() {
        var _this2 = this;

        if (this.isVisible) return;
        this.timeout = setTimeout(function () {
          _this2.removeOpenCancelListeners();

          _this2.timeout = null;
          _this2.isVisible = true;
        }, TIMEOUT_DELAY);
        this.addOpenCancelListeners();
      }
    }, {
      key: "handleClose",
      value: function handleClose() {
        var _this3 = this;

        if (!this.isVisible) return;
        this.timeout = setTimeout(function () {
          _this3.removeCloseCancelListeners();

          _this3.timeout = null;
          _this3.isVisible = false;
        }, TIMEOUT_DELAY);
        this.addCloseCancelListeners();
      }
    }, {
      key: "alignTooltip",
      value: function alignTooltip(dimension) {
        var triggerSize = this.getSize(this.trigger, dimension);
        var tooltipSize = this.getSize(this.content, dimension);
        var triggerIsBigger = triggerSize > tooltipSize;
        var offset = triggerIsBigger ? (triggerSize - tooltipSize) / 2 : (tooltipSize - triggerSize) / -2;

        if (dimension === "height") {
          this.content.style.top = "".concat(offset, "px");
        } else {
          this.content.style.left = "".concat(offset, "px");
        }
      }
    }, {
      key: "getSize",
      value: function getSize(element, property) {
        return Math.floor(element.getBoundingClientRect()[property]);
      }
    }, {
      key: "isInlineTooltip",
      value: function isInlineTooltip() {
        var position = this.getAttribute(Attributes.POSITION);
        return [Positions.INLINE_START, Positions.INLINE_END].includes(position);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$classNames = this.classNames,
            position = _this$classNames.position,
            mode = _this$classNames.mode,
            hasArrow = _this$classNames.hasArrow,
            isVisible = _this$classNames.isVisible;
        return "\n      <div class=\"tooltip ".concat(isVisible, " ").concat(position, " ").concat(mode, " ").concat(hasArrow, "\">\n        <slot name=\"trigger\"></slot>\n        <slot name=\"content\"></slot>\n      </div>\n    ");
      }
    }]);

    return SpiderTooltip;
  }(UpgradedElement);

  D("spider-tooltip", SpiderTooltip);

}());
