/*!
  * @license MIT (https://github.com/geotrev/spider-ui/blob/master/LICENSE)
  * @spider-ui/tooltip v0.1.0 (https://github.com/geotrev/spider-ui/tree/master/packages/utils#readme)
  * Copyright 2020 George Treviranus <hello@geotrev.com>
  */
import { register, UpgradedElement } from 'upgraded-element';

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
      this.removeOpenListeners();
      this.removeCloseListeners();

      if (this.isVisible) {
        this.removeCloseCancelListeners();
      } else {
        this.removeOpenCancelListeners();
      }
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
    key: "removeOpenListeners",
    value: function removeOpenListeners() {
      this.sleep("focus", this.trigger, this.handleOpen);
      this.sleep("focus", this.content, this.handleOpen);
      this.sleep("mouseover", this.trigger, this.handleOpen);
      this.sleep("mouseover", this.content, this.handleOpen);
    }
  }, {
    key: "removeCloseListeners",
    value: function removeCloseListeners() {
      this.sleep("blur", this.trigger, this.handleClose);
      this.sleep("blur", this.content, this.handleClose);
      this.sleep("mouseout", this.trigger, this.handleClose);
      this.sleep("mouseout", this.content, this.handleClose);
      this.sleep("keydown", window, this.handleKeydown);
    }
  }, {
    key: "removeOpenCancelListeners",
    value: function removeOpenCancelListeners() {
      this.sleep("mouseout", this.trigger, this.removeTimeout);
      this.sleep("blur", this.trigger, this.removeTimeout);
      this.sleep("mouseout", this.content, this.removeTimeout);
    }
  }, {
    key: "removeCloseCancelListeners",
    value: function removeCloseCancelListeners() {
      this.sleep("mouseover", this.trigger, this.removeTimeout);
      this.sleep("focus", this.trigger, this.removeTimeout);
      this.sleep("mouseover", this.content, this.removeTimeout);
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

register("spider-tooltip", SpiderTooltip);
//# sourceMappingURL=index.es.js.map
