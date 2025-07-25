typeof navigator !== "undefined" &&
  (function (root, factory) {
    if (typeof define === "function" && define.amd) {
      define(function () {
        return factory(root);
      });
    } else if (typeof module === "object" && module.exports) {
      module.exports = factory(root);
    } else {
      root.lottie = factory(root);
      root.particalLine = root.lottie;
    }
  })(window || {}, function (window) {
    "use strict";
    var svgNS = "http://www.w3.org/2000/svg",
      locationHref = "",
      initialDefaultFrame = -999999,
      subframeEnabled = !0,
      expressionsPlugin,
      isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      cachedColors = {},
      bm_rounder = Math.round,
      bm_rnd,
      bm_pow = Math.pow,
      bm_sqrt = Math.sqrt,
      bm_abs = Math.abs,
      bm_floor = Math.floor,
      bm_max = Math.max,
      bm_min = Math.min,
      blitter = 10,
      BMMath = {};
    function ProjectInterface() {
      return {};
    }
    !(function () {
      var t,
        e = [
          "abs",
          "acos",
          "acosh",
          "asin",
          "asinh",
          "atan",
          "atanh",
          "atan2",
          "ceil",
          "cbrt",
          "expm1",
          "clz32",
          "cos",
          "cosh",
          "exp",
          "floor",
          "fround",
          "hypot",
          "imul",
          "log",
          "log1p",
          "log2",
          "log10",
          "max",
          "min",
          "pow",
          "random",
          "round",
          "sign",
          "sin",
          "sinh",
          "sqrt",
          "tan",
          "tanh",
          "trunc",
          "E",
          "LN10",
          "LN2",
          "LOG10E",
          "LOG2E",
          "PI",
          "SQRT1_2",
          "SQRT2"
        ],
        i = e.length;
      for (t = 0; t < i; t += 1) BMMath[e[t]] = Math[e[t]];
    })(),
      (BMMath.random = Math.random),
      (BMMath.abs = function (t) {
        if ("object" === typeof t && t.length) {
          var e,
            i = createSizedArray(t.length),
            r = t.length;
          for (e = 0; e < r; e += 1) i[e] = Math.abs(t[e]);
          return i;
        }
        return Math.abs(t);
      });
    var defaultCurveSegments = 150,
      degToRads = Math.PI / 180,
      roundCorner = 0.5519;
    function roundValues(t) {
      bm_rnd = t
        ? Math.round
        : function (t) {
            return t;
          };
    }
    function styleDiv(t) {
      (t.style.position = "absolute"),
        (t.style.top = 0),
        (t.style.left = 0),
        (t.style.display = "block"),
        (t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0"),
        (t.style.backfaceVisibility = t.style.webkitBackfaceVisibility =
          "visible"),
        (t.style.transformStyle =
          t.style.webkitTransformStyle =
          t.style.mozTransformStyle =
            "preserve-3d");
    }
    function BMEnterFrameEvent(t, e, i, r) {
      (this.type = t),
        (this.currentTime = e),
        (this.totalTime = i),
        (this.direction = r < 0 ? -1 : 1);
    }
    function BMCompleteEvent(t, e) {
      (this.type = t), (this.direction = e < 0 ? -1 : 1);
    }
    function BMCompleteLoopEvent(t, e, i, r) {
      (this.type = t),
        (this.currentLoop = i),
        (this.totalLoops = e),
        (this.direction = r < 0 ? -1 : 1);
    }
    function BMSegmentStartEvent(t, e, i) {
      (this.type = t), (this.firstFrame = e), (this.totalFrames = i);
    }
    function BMDestroyEvent(t, e) {
      (this.type = t), (this.target = e);
    }
    function BMRenderFrameErrorEvent(t, e) {
      (this.type = "renderFrameError"),
        (this.nativeError = t),
        (this.currentTime = e);
    }
    function BMConfigErrorEvent(t) {
      (this.type = "configError"), (this.nativeError = t);
    }
    function BMAnimationConfigErrorEvent(t, e) {
      (this.type = t), (this.nativeError = e), (this.currentTime = currentTime);
    }
    roundValues(!1);
    var createElementID =
        ((G = 0),
        function () {
          return "__particalLine__lottie_element_" + ++G;
        }),
      G;
    function HSVtoRGB(t, e, i) {
      var r, s, a, n, o, h, l, p;
      switch (
        ((h = i * (1 - e)),
        (l = i * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e)),
        (p = i * (1 - (1 - o) * e)),
        n % 6)
      ) {
        case 0:
          (r = i), (s = p), (a = h);
          break;
        case 1:
          (r = l), (s = i), (a = h);
          break;
        case 2:
          (r = h), (s = i), (a = p);
          break;
        case 3:
          (r = h), (s = l), (a = i);
          break;
        case 4:
          (r = p), (s = h), (a = i);
          break;
        case 5:
          (r = i), (s = h), (a = l);
      }
      return [r, s, a];
    }
    function RGBtoHSV(t, e, i) {
      var r,
        s = Math.max(t, e, i),
        a = Math.min(t, e, i),
        n = s - a,
        o = 0 === s ? 0 : n / s,
        h = s / 255;
      switch (s) {
        case a:
          r = 0;
          break;
        case t:
          (r = e - i + n * (e < i ? 6 : 0)), (r /= 6 * n);
          break;
        case e:
          (r = i - t + 2 * n), (r /= 6 * n);
          break;
        case i:
          (r = t - e + 4 * n), (r /= 6 * n);
      }
      return [r, o, h];
    }
    function addSaturationToRGB(t, e) {
      var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (
        (i[1] += e),
        1 < i[1] ? (i[1] = 1) : i[1] <= 0 && (i[1] = 0),
        HSVtoRGB(i[0], i[1], i[2])
      );
    }
    function addBrightnessToRGB(t, e) {
      var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (
        (i[2] += e),
        1 < i[2] ? (i[2] = 1) : i[2] < 0 && (i[2] = 0),
        HSVtoRGB(i[0], i[1], i[2])
      );
    }
    function addHueToRGB(t, e) {
      var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (
        (i[0] += e / 360),
        1 < i[0] ? (i[0] -= 1) : i[0] < 0 && (i[0] += 1),
        HSVtoRGB(i[0], i[1], i[2])
      );
    }
    var rgbToHex = (function () {
      var t,
        e,
        r = [];
      for (t = 0; t < 256; t += 1)
        (e = t.toString(16)), (r[t] = 1 == e.length ? "0" + e : e);
      return function (t, e, i) {
        return (
          t < 0 && (t = 0),
          e < 0 && (e = 0),
          i < 0 && (i = 0),
          "#" + r[t] + r[e] + r[i]
        );
      };
    })();
    function BaseEvent() {}
    BaseEvent.prototype = {
      triggerEvent: function (t, e) {
        if (this._cbs[t])
          for (var i = this._cbs[t].length, r = 0; r < i; r++)
            this._cbs[t][r](e);
      },
      addEventListener: function (t, e) {
        return (
          this._cbs[t] || (this._cbs[t] = []),
          this._cbs[t].push(e),
          function () {
            this.removeEventListener(t, e);
          }.bind(this)
        );
      },
      removeEventListener: function (t, e) {
        if (e) {
          if (this._cbs[t]) {
            for (var i = 0, r = this._cbs[t].length; i < r; )
              this._cbs[t][i] === e &&
                (this._cbs[t].splice(i, 1), (i -= 1), (r -= 1)),
                (i += 1);
            this._cbs[t].length || (this._cbs[t] = null);
          }
        } else this._cbs[t] = null;
      }
    };
    var createTypedArray =
      "function" == typeof Uint8ClampedArray &&
      "function" == typeof Float32Array
        ? function (t, e) {
            return "float32" === t
              ? new Float32Array(e)
              : "int16" === t
              ? new Int16Array(e)
              : "uint8c" === t
              ? new Uint8ClampedArray(e)
              : void 0;
          }
        : function (t, e) {
            var i,
              r = 0,
              s = [];
            switch (t) {
              case "int16":
              case "uint8c":
                i = 1;
                break;
              default:
                i = 1.1;
            }
            for (r = 0; r < e; r += 1) s.push(i);
            return s;
          };
    function createSizedArray(t) {
      return Array.apply(null, { length: t });
    }
    function createNS(t) {
      return document.createElementNS(svgNS, t);
    }
    function createTag(t) {
      return document.createElement(t);
    }
    function DynamicPropertyContainer() {}
    DynamicPropertyContainer.prototype = {
      addDynamicProperty: function (t) {
        -1 === this.dynamicProperties.indexOf(t) &&
          (this.dynamicProperties.push(t),
          this.container.addDynamicProperty(this),
          (this._isAnimated = !0));
      },
      iterateDynamicProperties: function () {
        this._mdf = !1;
        var t,
          e = this.dynamicProperties.length;
        for (t = 0; t < e; t += 1)
          this.dynamicProperties[t].getValue(),
            this.dynamicProperties[t]._mdf && (this._mdf = !0);
      },
      initDynamicPropertyContainer: function (t) {
        (this.container = t),
          (this.dynamicProperties = []),
          (this._mdf = !1),
          (this._isAnimated = !1);
      }
    };
    var getBlendMode =
        ((Pa = {
          0: "source-over",
          1: "multiply",
          2: "screen",
          3: "overlay",
          4: "darken",
          5: "lighten",
          6: "color-dodge",
          7: "color-burn",
          8: "hard-light",
          9: "soft-light",
          10: "difference",
          11: "exclusion",
          12: "hue",
          13: "saturation",
          14: "color",
          15: "luminosity"
        }),
        function (t) {
          return Pa[t] || "";
        }),
      Pa,
      Matrix = (function () {
        var s = Math.cos,
          a = Math.sin,
          n = Math.tan,
          r = Math.round;
        function t() {
          return (
            (this.props[0] = 1),
            (this.props[1] = 0),
            (this.props[2] = 0),
            (this.props[3] = 0),
            (this.props[4] = 0),
            (this.props[5] = 1),
            (this.props[6] = 0),
            (this.props[7] = 0),
            (this.props[8] = 0),
            (this.props[9] = 0),
            (this.props[10] = 1),
            (this.props[11] = 0),
            (this.props[12] = 0),
            (this.props[13] = 0),
            (this.props[14] = 0),
            (this.props[15] = 1),
            this
          );
        }
        function e(t) {
          if (0 === t) return this;
          var e = s(t),
            i = a(t);
          return this._t(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function i(t) {
          if (0 === t) return this;
          var e = s(t),
            i = a(t);
          return this._t(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1);
        }
        function o(t) {
          if (0 === t) return this;
          var e = s(t),
            i = a(t);
          return this._t(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1);
        }
        function h(t) {
          if (0 === t) return this;
          var e = s(t),
            i = a(t);
          return this._t(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function l(t, e) {
          return this._t(1, e, t, 1, 0, 0);
        }
        function p(t, e) {
          return this.shear(n(t), n(e));
        }
        function m(t, e) {
          var i = s(e),
            r = a(e);
          return this._t(i, r, 0, 0, -r, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            ._t(1, 0, 0, 0, n(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            ._t(i, -r, 0, 0, r, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function f(t, e, i) {
          return (
            i || 0 === i || (i = 1),
            1 === t && 1 === e && 1 === i
              ? this
              : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1)
          );
        }
        function c(t, e, i, r, s, a, n, o, h, l, p, m, f, c, d, u) {
          return (
            (this.props[0] = t),
            (this.props[1] = e),
            (this.props[2] = i),
            (this.props[3] = r),
            (this.props[4] = s),
            (this.props[5] = a),
            (this.props[6] = n),
            (this.props[7] = o),
            (this.props[8] = h),
            (this.props[9] = l),
            (this.props[10] = p),
            (this.props[11] = m),
            (this.props[12] = f),
            (this.props[13] = c),
            (this.props[14] = d),
            (this.props[15] = u),
            this
          );
        }
        function d(t, e, i) {
          return (
            (i = i || 0),
            0 !== t || 0 !== e || 0 !== i
              ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, i, 1)
              : this
          );
        }
        function u(t, e, i, r, s, a, n, o, h, l, p, m, f, c, d, u) {
          var y = this.props;
          if (
            1 === t &&
            0 === e &&
            0 === i &&
            0 === r &&
            0 === s &&
            1 === a &&
            0 === n &&
            0 === o &&
            0 === h &&
            0 === l &&
            1 === p &&
            0 === m
          )
            return (
              (y[12] = y[12] * t + y[15] * f),
              (y[13] = y[13] * a + y[15] * c),
              (y[14] = y[14] * p + y[15] * d),
              (y[15] = y[15] * u),
              (this._identityCalculated = !1),
              this
            );
          var g = y[0],
            v = y[1],
            b = y[2],
            E = y[3],
            x = y[4],
            S = y[5],
            P = y[6],
            _ = y[7],
            C = y[8],
            A = y[9],
            T = y[10],
            k = y[11],
            M = y[12],
            D = y[13],
            w = y[14],
            F = y[15];
          return (
            (y[0] = g * t + v * s + b * h + E * f),
            (y[1] = g * e + v * a + b * l + E * c),
            (y[2] = g * i + v * n + b * p + E * d),
            (y[3] = g * r + v * o + b * m + E * u),
            (y[4] = x * t + S * s + P * h + _ * f),
            (y[5] = x * e + S * a + P * l + _ * c),
            (y[6] = x * i + S * n + P * p + _ * d),
            (y[7] = x * r + S * o + P * m + _ * u),
            (y[8] = C * t + A * s + T * h + k * f),
            (y[9] = C * e + A * a + T * l + k * c),
            (y[10] = C * i + A * n + T * p + k * d),
            (y[11] = C * r + A * o + T * m + k * u),
            (y[12] = M * t + D * s + w * h + F * f),
            (y[13] = M * e + D * a + w * l + F * c),
            (y[14] = M * i + D * n + w * p + F * d),
            (y[15] = M * r + D * o + w * m + F * u),
            (this._identityCalculated = !1),
            this
          );
        }
        function y() {
          return (
            this._identityCalculated ||
              ((this._identity = !(
                1 !== this.props[0] ||
                0 !== this.props[1] ||
                0 !== this.props[2] ||
                0 !== this.props[3] ||
                0 !== this.props[4] ||
                1 !== this.props[5] ||
                0 !== this.props[6] ||
                0 !== this.props[7] ||
                0 !== this.props[8] ||
                0 !== this.props[9] ||
                1 !== this.props[10] ||
                0 !== this.props[11] ||
                0 !== this.props[12] ||
                0 !== this.props[13] ||
                0 !== this.props[14] ||
                1 !== this.props[15]
              )),
              (this._identityCalculated = !0)),
            this._identity
          );
        }
        function g(t) {
          for (var e = 0; e < 16; ) {
            if (t.props[e] !== this.props[e]) return !1;
            e += 1;
          }
          return !0;
        }
        function v(t) {
          var e;
          for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
        }
        function b(t) {
          var e;
          for (e = 0; e < 16; e += 1) this.props[e] = t[e];
        }
        function E(t, e, i) {
          return {
            x:
              t * this.props[0] +
              e * this.props[4] +
              i * this.props[8] +
              this.props[12],
            y:
              t * this.props[1] +
              e * this.props[5] +
              i * this.props[9] +
              this.props[13],
            z:
              t * this.props[2] +
              e * this.props[6] +
              i * this.props[10] +
              this.props[14]
          };
        }
        function x(t, e, i) {
          return (
            t * this.props[0] +
            e * this.props[4] +
            i * this.props[8] +
            this.props[12]
          );
        }
        function S(t, e, i) {
          return (
            t * this.props[1] +
            e * this.props[5] +
            i * this.props[9] +
            this.props[13]
          );
        }
        function P(t, e, i) {
          return (
            t * this.props[2] +
            e * this.props[6] +
            i * this.props[10] +
            this.props[14]
          );
        }
        function _() {
          var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
            e = this.props[5] / t,
            i = -this.props[1] / t,
            r = -this.props[4] / t,
            s = this.props[0] / t,
            a =
              (this.props[4] * this.props[13] -
                this.props[5] * this.props[12]) /
              t,
            n =
              -(
                this.props[0] * this.props[13] -
                this.props[1] * this.props[12]
              ) / t,
            o = new Matrix();
          return (
            (o.props[0] = e),
            (o.props[1] = i),
            (o.props[4] = r),
            (o.props[5] = s),
            (o.props[12] = a),
            (o.props[13] = n),
            o
          );
        }
        function C(t) {
          return this.getInverseMatrix().applyToPointArray(
            t[0],
            t[1],
            t[2] || 0
          );
        }
        function A(t) {
          var e,
            i = t.length,
            r = [];
          for (e = 0; e < i; e += 1) r[e] = C(t[e]);
          return r;
        }
        function T(t, e, i) {
          var r = createTypedArray("float32", 6);
          if (this.isIdentity())
            (r[0] = t[0]),
              (r[1] = t[1]),
              (r[2] = e[0]),
              (r[3] = e[1]),
              (r[4] = i[0]),
              (r[5] = i[1]);
          else {
            var s = this.props[0],
              a = this.props[1],
              n = this.props[4],
              o = this.props[5],
              h = this.props[12],
              l = this.props[13];
            (r[0] = t[0] * s + t[1] * n + h),
              (r[1] = t[0] * a + t[1] * o + l),
              (r[2] = e[0] * s + e[1] * n + h),
              (r[3] = e[0] * a + e[1] * o + l),
              (r[4] = i[0] * s + i[1] * n + h),
              (r[5] = i[0] * a + i[1] * o + l);
          }
          return r;
        }
        function k(t, e, i) {
          return this.isIdentity()
            ? [t, e, i]
            : [
                t * this.props[0] +
                  e * this.props[4] +
                  i * this.props[8] +
                  this.props[12],
                t * this.props[1] +
                  e * this.props[5] +
                  i * this.props[9] +
                  this.props[13],
                t * this.props[2] +
                  e * this.props[6] +
                  i * this.props[10] +
                  this.props[14]
              ];
        }
        function M(t, e) {
          if (this.isIdentity()) return t + "," + e;
          var i = this.props;
          return (
            Math.round(100 * (t * i[0] + e * i[4] + i[12])) / 100 +
            "," +
            Math.round(100 * (t * i[1] + e * i[5] + i[13])) / 100
          );
        }
        function D() {
          for (var t = 0, e = this.props, i = "matrix3d("; t < 16; )
            (i += r(1e4 * e[t]) / 1e4), (i += 15 === t ? ")" : ","), (t += 1);
          return i;
        }
        function w(t) {
          return (t < 1e-6 && 0 < t) || (-1e-6 < t && t < 0)
            ? r(1e4 * t) / 1e4
            : t;
        }
        function F() {
          var t = this.props;
          return (
            "matrix(" +
            w(t[0]) +
            "," +
            w(t[1]) +
            "," +
            w(t[4]) +
            "," +
            w(t[5]) +
            "," +
            w(t[12]) +
            "," +
            w(t[13]) +
            ")"
          );
        }
        return function () {
          (this.reset = t),
            (this.rotate = e),
            (this.rotateX = i),
            (this.rotateY = o),
            (this.rotateZ = h),
            (this.skew = p),
            (this.skewFromAxis = m),
            (this.shear = l),
            (this.scale = f),
            (this.setTransform = c),
            (this.translate = d),
            (this.transform = u),
            (this.applyToPoint = E),
            (this.applyToX = x),
            (this.applyToY = S),
            (this.applyToZ = P),
            (this.applyToPointArray = k),
            (this.applyToTriplePoints = T),
            (this.applyToPointStringified = M),
            (this.toCSS = D),
            (this.to2dCSS = F),
            (this.clone = v),
            (this.cloneFromProps = b),
            (this.equals = g),
            (this.inversePoints = A),
            (this.inversePoint = C),
            (this.getInverseMatrix = _),
            (this._t = this.transform),
            (this.isIdentity = y),
            (this._identity = !0),
            (this._identityCalculated = !1),
            (this.props = createTypedArray("float32", 16)),
            this.reset();
        };
      })();
    !(function (o, h) {
      var l,
        p = this,
        m = 256,
        f = 6,
        c = "random",
        d = h.pow(m, f),
        u = h.pow(2, 52),
        y = 2 * u,
        g = m - 1;
      function v(t) {
        var e,
          i = t.length,
          n = this,
          r = 0,
          s = (n.i = n.j = 0),
          a = (n.S = []);
        for (i || (t = [i++]); r < m; ) a[r] = r++;
        for (r = 0; r < m; r++)
          (a[r] = a[(s = g & (s + t[r % i] + (e = a[r])))]), (a[s] = e);
        n.g = function (t) {
          for (var e, i = 0, r = n.i, s = n.j, a = n.S; t--; )
            (e = a[(r = g & (r + 1))]),
              (i = i * m + a[g & ((a[r] = a[(s = g & (s + e))]) + (a[s] = e))]);
          return (n.i = r), (n.j = s), i;
        };
      }
      function b(t, e) {
        return (e.i = t.i), (e.j = t.j), (e.S = t.S.slice()), e;
      }
      function E(t, e) {
        for (var i, r = t + "", s = 0; s < r.length; )
          e[g & s] = g & ((i ^= 19 * e[g & s]) + r.charCodeAt(s++));
        return x(e);
      }
      function x(t) {
        return String.fromCharCode.apply(0, t);
      }
      (h["seed" + c] = function (t, e, i) {
        var r = [],
          s = E(
            (function t(e, i) {
              var r,
                s = [],
                a = typeof e;
              if (i && "object" == a)
                for (r in e)
                  try {
                    s.push(t(e[r], i - 1));
                  } catch (t) {}
              return s.length ? s : "string" == a ? e : e + "\0";
            })(
              (e = !0 === e ? { entropy: !0 } : e || {}).entropy
                ? [t, x(o)]
                : null === t
                ? (function () {
                    try {
                      if (l) return x(l.randomBytes(m));
                      var t = new Uint8Array(m);
                      return (p.crypto || p.msCrypto).getRandomValues(t), x(t);
                    } catch (t) {
                      var e = p.navigator,
                        i = e && e.plugins;
                      return [+new Date(), p, i, p.screen, x(o)];
                    }
                  })()
                : t,
              3
            ),
            r
          ),
          a = new v(r),
          n = function () {
            for (var t = a.g(f), e = d, i = 0; t < u; )
              (t = (t + i) * m), (e *= m), (i = a.g(1));
            for (; y <= t; ) (t /= 2), (e /= 2), (i >>>= 1);
            return (t + i) / e;
          };
        return (
          (n.int32 = function () {
            return 0 | a.g(4);
          }),
          (n.quick = function () {
            return a.g(4) / 4294967296;
          }),
          (n.double = n),
          E(x(a.S), o),
          (
            e.pass ||
            i ||
            function (t, e, i, r) {
              return (
                r &&
                  (r.S && b(r, a),
                  (t.state = function () {
                    return b(a, {});
                  })),
                i ? ((h[c] = t), e) : t
              );
            }
          )(n, s, "global" in e ? e.global : this == h, e.state)
        );
      }),
        E(h.random(), o);
    })([], BMMath);
    var BezierFactory = (function () {
      var t = {
          getBezierEasing: function (t, e, i, r, s) {
            var a =
              s ||
              ("bez_" + t + "_" + e + "_" + i + "_" + r).replace(/\./g, "p");
            if (o[a]) return o[a];
            var n = new h([t, e, i, r]);
            return (o[a] = n);
          }
        },
        o = {};
      var l = 11,
        p = 1 / (l - 1),
        e = "function" == typeof Float32Array;
      function r(t, e) {
        return 1 - 3 * e + 3 * t;
      }
      function s(t, e) {
        return 3 * e - 6 * t;
      }
      function a(t) {
        return 3 * t;
      }
      function m(t, e, i) {
        return ((r(e, i) * t + s(e, i)) * t + a(e)) * t;
      }
      function f(t, e, i) {
        return 3 * r(e, i) * t * t + 2 * s(e, i) * t + a(e);
      }
      function h(t) {
        (this._p = t),
          (this._mSampleValues = e ? new Float32Array(l) : new Array(l)),
          (this._precomputed = !1),
          (this.get = this.get.bind(this));
      }
      return (
        (h.prototype = {
          get: function (t) {
            var e = this._p[0],
              i = this._p[1],
              r = this._p[2],
              s = this._p[3];
            return (
              this._precomputed || this._precompute(),
              e === i && r === s
                ? t
                : 0 === t
                ? 0
                : 1 === t
                ? 1
                : m(this._getTForX(t), i, s)
            );
          },
          _precompute: function () {
            var t = this._p[0],
              e = this._p[1],
              i = this._p[2],
              r = this._p[3];
            (this._precomputed = !0),
              (t === e && i === r) || this._calcSampleValues();
          },
          _calcSampleValues: function () {
            for (var t = this._p[0], e = this._p[2], i = 0; i < l; ++i)
              this._mSampleValues[i] = m(i * p, t, e);
          },
          _getTForX: function (t) {
            for (
              var e = this._p[0],
                i = this._p[2],
                r = this._mSampleValues,
                s = 0,
                a = 1,
                n = l - 1;
              a !== n && r[a] <= t;
              ++a
            )
              s += p;
            var o = s + ((t - r[--a]) / (r[a + 1] - r[a])) * p,
              h = f(o, e, i);
            return 0.001 <= h
              ? (function (t, e, i, r) {
                  for (var s = 0; s < 4; ++s) {
                    var a = f(e, i, r);
                    if (0 === a) return e;
                    e -= (m(e, i, r) - t) / a;
                  }
                  return e;
                })(t, o, e, i)
              : 0 === h
              ? o
              : (function (t, e, i, r, s) {
                  for (
                    var a, n, o = 0;
                    0 < (a = m((n = e + (i - e) / 2), r, s) - t)
                      ? (i = n)
                      : (e = n),
                      1e-7 < Math.abs(a) && ++o < 10;

                  );
                  return n;
                })(t, s, s + p, e, i);
          }
        }),
        t
      );
    })();
    function extendPrototype(t, e) {
      var i,
        r,
        s = t.length;
      for (i = 0; i < s; i += 1)
        for (var a in (r = t[i].prototype))
          r.hasOwnProperty(a) && (e.prototype[a] = r[a]);
    }
    function getDescriptor(t, e) {
      return Object.getOwnPropertyDescriptor(t, e);
    }
    function createProxyFunction(t) {
      function e() {}
      return (e.prototype = t), e;
    }
    function bezFunction() {
      Math;
      function y(t, e, i, r, s, a) {
        var n = t * r + e * s + i * a - s * r - a * t - i * e;
        return -0.001 < n && n < 0.001;
      }
      var p = function (t, e, i, r) {
        var s,
          a,
          n,
          o,
          h,
          l,
          p = defaultCurveSegments,
          m = 0,
          f = [],
          c = [],
          d = bezier_length_pool.newElement();
        for (n = i.length, s = 0; s < p; s += 1) {
          for (h = s / (p - 1), a = l = 0; a < n; a += 1)
            (o =
              bm_pow(1 - h, 3) * t[a] +
              3 * bm_pow(1 - h, 2) * h * i[a] +
              3 * (1 - h) * bm_pow(h, 2) * r[a] +
              bm_pow(h, 3) * e[a]),
              (f[a] = o),
              null !== c[a] && (l += bm_pow(f[a] - c[a], 2)),
              (c[a] = f[a]);
          l && (m += l = bm_sqrt(l)), (d.percents[s] = h), (d.lengths[s] = m);
        }
        return (d.addedLength = m), d;
      };
      function g(t) {
        (this.segmentLength = 0), (this.points = new Array(t));
      }
      function v(t, e) {
        (this.partialLength = t), (this.point = e);
      }
      var b,
        t =
          ((b = {}),
          function (t, e, i, r) {
            var s = (
              t[0] +
              "_" +
              t[1] +
              "_" +
              e[0] +
              "_" +
              e[1] +
              "_" +
              i[0] +
              "_" +
              i[1] +
              "_" +
              r[0] +
              "_" +
              r[1]
            ).replace(/\./g, "p");
            if (!b[s]) {
              var a,
                n,
                o,
                h,
                l,
                p,
                m,
                f = defaultCurveSegments,
                c = 0,
                d = null;
              2 === t.length &&
                (t[0] != e[0] || t[1] != e[1]) &&
                y(t[0], t[1], e[0], e[1], t[0] + i[0], t[1] + i[1]) &&
                y(t[0], t[1], e[0], e[1], e[0] + r[0], e[1] + r[1]) &&
                (f = 2);
              var u = new g(f);
              for (o = i.length, a = 0; a < f; a += 1) {
                for (
                  m = createSizedArray(o), l = a / (f - 1), n = p = 0;
                  n < o;
                  n += 1
                )
                  (h =
                    bm_pow(1 - l, 3) * t[n] +
                    3 * bm_pow(1 - l, 2) * l * (t[n] + i[n]) +
                    3 * (1 - l) * bm_pow(l, 2) * (e[n] + r[n]) +
                    bm_pow(l, 3) * e[n]),
                    (m[n] = h),
                    null !== d && (p += bm_pow(m[n] - d[n], 2));
                (c += p = bm_sqrt(p)), (u.points[a] = new v(p, m)), (d = m);
              }
              (u.segmentLength = c), (b[s] = u);
            }
            return b[s];
          });
      function M(t, e) {
        var i = e.percents,
          r = e.lengths,
          s = i.length,
          a = bm_floor((s - 1) * t),
          n = t * e.addedLength,
          o = 0;
        if (a === s - 1 || 0 === a || n === r[a]) return i[a];
        for (var h = r[a] > n ? -1 : 1, l = !0; l; )
          if (
            (r[a] <= n && r[a + 1] > n
              ? ((o = (n - r[a]) / (r[a + 1] - r[a])), (l = !1))
              : (a += h),
            a < 0 || s - 1 <= a)
          ) {
            if (a === s - 1) return i[a];
            l = !1;
          }
        return i[a] + (i[a + 1] - i[a]) * o;
      }
      var D = createTypedArray("float32", 8);
      return {
        getSegmentsLength: function (t) {
          var e,
            i = segments_length_pool.newElement(),
            r = t.c,
            s = t.v,
            a = t.o,
            n = t.i,
            o = t._length,
            h = i.lengths,
            l = 0;
          for (e = 0; e < o - 1; e += 1)
            (h[e] = p(s[e], s[e + 1], a[e], n[e + 1])), (l += h[e].addedLength);
          return (
            r &&
              o &&
              ((h[e] = p(s[e], s[0], a[e], n[0])), (l += h[e].addedLength)),
            (i.totalLength = l),
            i
          );
        },
        getNewSegment: function (t, e, i, r, s, a, n) {
          var o,
            h = M((s = s < 0 ? 0 : 1 < s ? 1 : s), n),
            l = M((a = 1 < a ? 1 : a), n),
            p = t.length,
            m = 1 - h,
            f = 1 - l,
            c = m * m * m,
            d = h * m * m * 3,
            u = h * h * m * 3,
            y = h * h * h,
            g = m * m * f,
            v = h * m * f + m * h * f + m * m * l,
            b = h * h * f + m * h * l + h * m * l,
            E = h * h * l,
            x = m * f * f,
            S = h * f * f + m * l * f + m * f * l,
            P = h * l * f + m * l * l + h * f * l,
            _ = h * l * l,
            C = f * f * f,
            A = l * f * f + f * l * f + f * f * l,
            T = l * l * f + f * l * l + l * f * l,
            k = l * l * l;
          for (o = 0; o < p; o += 1)
            (D[4 * o] =
              Math.round(1e3 * (c * t[o] + d * i[o] + u * r[o] + y * e[o])) /
              1e3),
              (D[4 * o + 1] =
                Math.round(1e3 * (g * t[o] + v * i[o] + b * r[o] + E * e[o])) /
                1e3),
              (D[4 * o + 2] =
                Math.round(1e3 * (x * t[o] + S * i[o] + P * r[o] + _ * e[o])) /
                1e3),
              (D[4 * o + 3] =
                Math.round(1e3 * (C * t[o] + A * i[o] + T * r[o] + k * e[o])) /
                1e3);
          return D;
        },
        getPointInSegment: function (t, e, i, r, s, a) {
          var n = M(s, a),
            o = 1 - n;
          return [
            Math.round(
              1e3 *
                (o * o * o * t[0] +
                  (n * o * o + o * n * o + o * o * n) * i[0] +
                  (n * n * o + o * n * n + n * o * n) * r[0] +
                  n * n * n * e[0])
            ) / 1e3,
            Math.round(
              1e3 *
                (o * o * o * t[1] +
                  (n * o * o + o * n * o + o * o * n) * i[1] +
                  (n * n * o + o * n * n + n * o * n) * r[1] +
                  n * n * n * e[1])
            ) / 1e3
          ];
        },
        buildBezierData: t,
        pointOnLine2D: y,
        pointOnLine3D: function (t, e, i, r, s, a, n, o, h) {
          if (0 === i && 0 === a && 0 === h) return y(t, e, r, s, n, o);
          var l,
            p = Math.sqrt(
              Math.pow(r - t, 2) + Math.pow(s - e, 2) + Math.pow(a - i, 2)
            ),
            m = Math.sqrt(
              Math.pow(n - t, 2) + Math.pow(o - e, 2) + Math.pow(h - i, 2)
            ),
            f = Math.sqrt(
              Math.pow(n - r, 2) + Math.pow(o - s, 2) + Math.pow(h - a, 2)
            );
          return (
            -1e-4 <
              (l =
                m < p
                  ? f < p
                    ? p - m - f
                    : f - m - p
                  : m < f
                  ? f - m - p
                  : m - p - f) && l < 1e-4
          );
        }
      };
    }
    !(function () {
      for (
        var a = 0, t = ["ms", "moz", "webkit", "o"], e = 0;
        e < t.length && !window.requestAnimationFrame;
        ++e
      )
        (window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"]),
          (window.cancelAnimationFrame =
            window[t[e] + "CancelAnimationFrame"] ||
            window[t[e] + "CancelRequestAnimationFrame"]);
      window.requestAnimationFrame ||
        (window.requestAnimationFrame = function (t, e) {
          var i = new Date().getTime(),
            r = Math.max(0, 16 - (i - a)),
            s = setTimeout(function () {
              t(i + r);
            }, r);
          return (a = i + r), s;
        }),
        window.cancelAnimationFrame ||
          (window.cancelAnimationFrame = function (t) {
            clearTimeout(t);
          });
    })();
    var bez = bezFunction();
    function dataFunctionManager() {
      function m(t, e, i) {
        var r,
          s,
          a,
          n,
          o,
          h,
          l = t.length;
        for (s = 0; s < l; s += 1)
          if ("ks" in (r = t[s]) && !r.completed) {
            if (
              ((r.completed = !0),
              r.tt && (t[s - 1].td = r.tt),
              [],
              -1,
              r.hasMask)
            ) {
              var p = r.masksProperties;
              for (n = p.length, a = 0; a < n; a += 1)
                if (p[a].pt.k.i) d(p[a].pt.k);
                else
                  for (h = p[a].pt.k.length, o = 0; o < h; o += 1)
                    p[a].pt.k[o].s && d(p[a].pt.k[o].s[0]),
                      p[a].pt.k[o].e && d(p[a].pt.k[o].e[0]);
            }
            0 === r.ty
              ? ((r.layers = f(r.refId, e)), m(r.layers, e, i))
              : 4 === r.ty
              ? c(r.shapes)
              : 5 == r.ty && u(r, i);
          }
      }
      function f(t, e) {
        for (var i = 0, r = e.length; i < r; ) {
          if (e[i].id === t)
            return e[i].layers.__used
              ? JSON.parse(JSON.stringify(e[i].layers))
              : ((e[i].layers.__used = !0), e[i].layers);
          i += 1;
        }
      }
      function c(t) {
        var e, i, r;
        for (e = t.length - 1; 0 <= e; e -= 1)
          if ("sh" == t[e].ty) {
            if (t[e].ks.k.i) d(t[e].ks.k);
            else
              for (r = t[e].ks.k.length, i = 0; i < r; i += 1)
                t[e].ks.k[i].s && d(t[e].ks.k[i].s[0]),
                  t[e].ks.k[i].e && d(t[e].ks.k[i].e[0]);
            !0;
          } else "gr" == t[e].ty && c(t[e].it);
      }
      function d(t) {
        var e,
          i = t.i.length;
        for (e = 0; e < i; e += 1)
          (t.i[e][0] += t.v[e][0]),
            (t.i[e][1] += t.v[e][1]),
            (t.o[e][0] += t.v[e][0]),
            (t.o[e][1] += t.v[e][1]);
      }
      function o(t, e) {
        var i = e ? e.split(".") : [100, 100, 100];
        return (
          t[0] > i[0] ||
          (!(i[0] > t[0]) &&
            (t[1] > i[1] ||
              (!(i[1] > t[1]) && (t[2] > i[2] || (!(i[2] > t[2]) && void 0)))))
        );
      }
      var h,
        i = (function () {
          var r = [4, 4, 14];
          function s(t) {
            var e,
              i,
              r,
              s = t.length;
            for (e = 0; e < s; e += 1)
              5 === t[e].ty &&
                ((i = t[e]),
                void 0,
                (r = i.t.d),
                (i.t.d = { k: [{ s: r, t: 0 }] }));
          }
          return function (t) {
            if (o(r, t.v) && (s(t.layers), t.assets)) {
              var e,
                i = t.assets.length;
              for (e = 0; e < i; e += 1)
                t.assets[e].layers && s(t.assets[e].layers);
            }
          };
        })(),
        r =
          ((h = [4, 7, 99]),
          function (t) {
            if (t.chars && !o(h, t.v)) {
              var e,
                i,
                r,
                s,
                a,
                n = t.chars.length;
              for (e = 0; e < n; e += 1)
                if (t.chars[e].data && t.chars[e].data.shapes)
                  for (
                    r = (a = t.chars[e].data.shapes[0].it).length, i = 0;
                    i < r;
                    i += 1
                  )
                    (s = a[i].ks.k).__converted ||
                      (d(a[i].ks.k), (s.__converted = !0));
            }
          }),
        s = (function () {
          var r = [4, 1, 9];
          function a(t) {
            var e,
              i,
              r,
              s = t.length;
            for (e = 0; e < s; e += 1)
              if ("gr" === t[e].ty) a(t[e].it);
              else if ("fl" === t[e].ty || "st" === t[e].ty)
                if (t[e].c.k && t[e].c.k[0].i)
                  for (r = t[e].c.k.length, i = 0; i < r; i += 1)
                    t[e].c.k[i].s &&
                      ((t[e].c.k[i].s[0] /= 255),
                      (t[e].c.k[i].s[1] /= 255),
                      (t[e].c.k[i].s[2] /= 255),
                      (t[e].c.k[i].s[3] /= 255)),
                      t[e].c.k[i].e &&
                        ((t[e].c.k[i].e[0] /= 255),
                        (t[e].c.k[i].e[1] /= 255),
                        (t[e].c.k[i].e[2] /= 255),
                        (t[e].c.k[i].e[3] /= 255));
                else
                  (t[e].c.k[0] /= 255),
                    (t[e].c.k[1] /= 255),
                    (t[e].c.k[2] /= 255),
                    (t[e].c.k[3] /= 255);
          }
          function s(t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1) 4 === t[e].ty && a(t[e].shapes);
          }
          return function (t) {
            if (o(r, t.v) && (s(t.layers), t.assets)) {
              var e,
                i = t.assets.length;
              for (e = 0; e < i; e += 1)
                t.assets[e].layers && s(t.assets[e].layers);
            }
          };
        })(),
        a = (function () {
          var r = [4, 4, 18];
          function l(t) {
            var e, i, r;
            for (e = t.length - 1; 0 <= e; e -= 1)
              if ("sh" == t[e].ty) {
                if (t[e].ks.k.i) t[e].ks.k.c = t[e].closed;
                else
                  for (r = t[e].ks.k.length, i = 0; i < r; i += 1)
                    t[e].ks.k[i].s && (t[e].ks.k[i].s[0].c = t[e].closed),
                      t[e].ks.k[i].e && (t[e].ks.k[i].e[0].c = t[e].closed);
                !0;
              } else "gr" == t[e].ty && l(t[e].it);
          }
          function s(t) {
            var e,
              i,
              r,
              s,
              a,
              n,
              o = t.length;
            for (i = 0; i < o; i += 1) {
              if ((e = t[i]).hasMask) {
                var h = e.masksProperties;
                for (s = h.length, r = 0; r < s; r += 1)
                  if (h[r].pt.k.i) h[r].pt.k.c = h[r].cl;
                  else
                    for (n = h[r].pt.k.length, a = 0; a < n; a += 1)
                      h[r].pt.k[a].s && (h[r].pt.k[a].s[0].c = h[r].cl),
                        h[r].pt.k[a].e && (h[r].pt.k[a].e[0].c = h[r].cl);
              }
              4 === e.ty && l(e.shapes);
            }
          }
          return function (t) {
            if (o(r, t.v) && (s(t.layers), t.assets)) {
              var e,
                i = t.assets.length;
              for (e = 0; e < i; e += 1)
                t.assets[e].layers && s(t.assets[e].layers);
            }
          };
        })();
      function u(t, e) {
        0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0);
      }
      var t = {
        completeData: function (t, e) {
          t.__complete ||
            (s(t),
            i(t),
            r(t),
            a(t),
            m(t.layers, t.assets, e),
            (t.__complete = !0));
        }
      };
      return (
        (t.checkColors = s),
        (t.checkChars = r),
        (t.checkShapes = a),
        (t.completeLayers = m),
        t
      );
    }
    var dataManager = dataFunctionManager(),
      FontManager = (function () {
        var a = { w: 0, size: 0, shapes: [] },
          t = [];
        function u(t, e) {
          var i = createTag("span");
          i.style.fontFamily = e;
          var r = createTag("span");
          (r.innerHTML = "giItT1WQy@!-/#"),
            (i.style.position = "absolute"),
            (i.style.left = "-10000px"),
            (i.style.top = "-10000px"),
            (i.style.fontSize = "300px"),
            (i.style.fontVariant = "normal"),
            (i.style.fontStyle = "normal"),
            (i.style.fontWeight = "normal"),
            (i.style.letterSpacing = "0"),
            i.appendChild(r),
            document.body.appendChild(i);
          var s = r.offsetWidth;
          return (
            (r.style.fontFamily =
              (function (t) {
                var e,
                  i = t.split(","),
                  r = i.length,
                  s = [];
                for (e = 0; e < r; e += 1)
                  "sans-serif" !== i[e] && "monospace" !== i[e] && s.push(i[e]);
                return s.join(",");
              })(t) +
              ", " +
              e),
            { node: r, w: s, parent: i }
          );
        }
        t = t.concat([
          2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368,
          2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379,
          2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403
        ]);
        var e = function () {
          (this.fonts = []),
            (this.chars = null),
            (this.typekitLoaded = 0),
            (this.isLoaded = !1),
            (this.initTime = Date.now()),
            (this.setIsLoadedBinded = this.setIsLoaded.bind(this)),
            (this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this));
        };
        return (
          (e.getCombinedCharacterCodes = function () {
            return t;
          }),
          (e.prototype = {
            addChars: function (t) {
              if (t) {
                this.chars || (this.chars = []);
                var e,
                  i,
                  r,
                  s = t.length,
                  a = this.chars.length;
                for (e = 0; e < s; e += 1) {
                  for (i = 0, r = !1; i < a; )
                    this.chars[i].style === t[e].style &&
                      this.chars[i].fFamily === t[e].fFamily &&
                      this.chars[i].ch === t[e].ch &&
                      (r = !0),
                      (i += 1);
                  r || (this.chars.push(t[e]), (a += 1));
                }
              }
            },
            addFonts: function (t, e) {
              if (t) {
                if (this.chars)
                  return (this.isLoaded = !0), void (this.fonts = t.list);
                var i,
                  r,
                  s,
                  a,
                  n = t.list,
                  o = n.length,
                  h = o;
                for (i = 0; i < o; i += 1) {
                  var l,
                    p,
                    m = !0;
                  if (
                    ((n[i].loaded = !1),
                    (n[i].monoCase = u(n[i].fFamily, "monospace")),
                    (n[i].sansCase = u(n[i].fFamily, "sans-serif")),
                    n[i].fPath)
                  ) {
                    if ("p" === n[i].fOrigin || 3 === n[i].origin) {
                      if (
                        (0 <
                          (l = document.querySelectorAll(
                            'style[f-forigin="p"][f-family="' +
                              n[i].fFamily +
                              '"], style[f-origin="3"][f-family="' +
                              n[i].fFamily +
                              '"]'
                          )).length && (m = !1),
                        m)
                      ) {
                        var f = createTag("style");
                        f.setAttribute("f-forigin", n[i].fOrigin),
                          f.setAttribute("f-origin", n[i].origin),
                          f.setAttribute("f-family", n[i].fFamily),
                          (f.type = "text/css"),
                          (f.innerHTML =
                            "@font-face {font-family: " +
                            n[i].fFamily +
                            "; font-style: normal; src: url('" +
                            n[i].fPath +
                            "');}"),
                          e.appendChild(f);
                      }
                    } else if ("g" === n[i].fOrigin || 1 === n[i].origin) {
                      for (
                        l = document.querySelectorAll(
                          'link[f-forigin="g"], link[f-origin="1"]'
                        ),
                          p = 0;
                        p < l.length;
                        p++
                      )
                        -1 !== l[p].href.indexOf(n[i].fPath) && (m = !1);
                      if (m) {
                        var c = createTag("link");
                        c.setAttribute("f-forigin", n[i].fOrigin),
                          c.setAttribute("f-origin", n[i].origin),
                          (c.type = "text/css"),
                          (c.rel = "stylesheet"),
                          (c.href = n[i].fPath),
                          document.body.appendChild(c);
                      }
                    } else if ("t" === n[i].fOrigin || 2 === n[i].origin) {
                      for (
                        l = document.querySelectorAll(
                          'script[f-forigin="t"], script[f-origin="2"]'
                        ),
                          p = 0;
                        p < l.length;
                        p++
                      )
                        n[i].fPath === l[p].src && (m = !1);
                      if (m) {
                        var d = createTag("link");
                        d.setAttribute("f-forigin", n[i].fOrigin),
                          d.setAttribute("f-origin", n[i].origin),
                          d.setAttribute("rel", "stylesheet"),
                          d.setAttribute("href", n[i].fPath),
                          e.appendChild(d);
                      }
                    }
                  } else (n[i].loaded = !0), (h -= 1);
                  (n[i].helper =
                    ((r = e),
                    (s = n[i]),
                    (a = void 0),
                    ((a = createNS("text")).style.fontSize = "100px"),
                    a.setAttribute("font-family", s.fFamily),
                    a.setAttribute("font-style", s.fStyle),
                    a.setAttribute("font-weight", s.fWeight),
                    (a.textContent = "1"),
                    s.fClass
                      ? ((a.style.fontFamily = "inherit"),
                        a.setAttribute("class", s.fClass))
                      : (a.style.fontFamily = s.fFamily),
                    r.appendChild(a),
                    (createTag("canvas").getContext("2d").font =
                      s.fWeight + " " + s.fStyle + " 100px " + s.fFamily),
                    a)),
                    (n[i].cache = {}),
                    this.fonts.push(n[i]);
                }
                0 === h
                  ? (this.isLoaded = !0)
                  : setTimeout(this.checkLoadedFonts.bind(this), 100);
              } else this.isLoaded = !0;
            },
            getCharData: function (t, e, i) {
              for (var r = 0, s = this.chars.length; r < s; ) {
                if (
                  this.chars[r].ch === t &&
                  this.chars[r].style === e &&
                  this.chars[r].fFamily === i
                )
                  return this.chars[r];
                r += 1;
              }
              return (
                (("string" == typeof t && 13 !== t.charCodeAt(0)) || !t) &&
                  console &&
                  console.warn &&
                  console.warn(
                    "Missing character from exported characters list: ",
                    t,
                    e,
                    i
                  ),
                a
              );
            },
            getFontByName: function (t) {
              for (var e = 0, i = this.fonts.length; e < i; ) {
                if (this.fonts[e].fName === t) return this.fonts[e];
                e += 1;
              }
              return this.fonts[0];
            },
            measureText: function (t, e, i) {
              var r = this.getFontByName(e),
                s = t.charCodeAt(0);
              if (!r.cache[s + 1]) {
                var a = r.helper;
                if (" " === t) {
                  a.textContent = "|" + t + "|";
                  var n = a.getComputedTextLength();
                  a.textContent = "||";
                  var o = a.getComputedTextLength();
                  r.cache[s + 1] = (n - o) / 100;
                } else
                  (a.textContent = t),
                    (r.cache[s + 1] = a.getComputedTextLength() / 100);
              }
              return r.cache[s + 1] * i;
            },
            checkLoadedFonts: function () {
              var t,
                e,
                i,
                r = this.fonts.length,
                s = r;
              for (t = 0; t < r; t += 1)
                this.fonts[t].loaded
                  ? (s -= 1)
                  : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin
                  ? (this.fonts[t].loaded = !0)
                  : ((e = this.fonts[t].monoCase.node),
                    (i = this.fonts[t].monoCase.w),
                    e.offsetWidth !== i
                      ? ((s -= 1), (this.fonts[t].loaded = !0))
                      : ((e = this.fonts[t].sansCase.node),
                        (i = this.fonts[t].sansCase.w),
                        e.offsetWidth !== i &&
                          ((s -= 1), (this.fonts[t].loaded = !0))),
                    this.fonts[t].loaded &&
                      (this.fonts[t].sansCase.parent.parentNode.removeChild(
                        this.fonts[t].sansCase.parent
                      ),
                      this.fonts[t].monoCase.parent.parentNode.removeChild(
                        this.fonts[t].monoCase.parent
                      )));
              0 !== s && Date.now() - this.initTime < 5e3
                ? setTimeout(this.checkLoadedFontsBinded, 20)
                : setTimeout(this.setIsLoadedBinded, 10);
            },
            setIsLoaded: function () {
              this.isLoaded = !0;
            }
          }),
          e
        );
      })(),
      PropertyFactory = (function () {
        var m = initialDefaultFrame,
          s = Math.abs;
        function f(t, e) {
          var i,
            r = this.offsetTime;
          "multidimensional" === this.propType &&
            (i = createTypedArray("float32", this.pv.length));
          for (
            var s,
              a,
              n,
              o,
              h,
              l,
              p,
              m,
              f = e.lastIndex,
              c = f,
              d = this.keyframes.length - 1,
              u = !0;
            u;

          ) {
            if (
              ((s = this.keyframes[c]),
              (a = this.keyframes[c + 1]),
              c === d - 1 && t >= a.t - r)
            ) {
              s.h && (s = a), (f = 0);
              break;
            }
            if (a.t - r > t) {
              f = c;
              break;
            }
            c < d - 1 ? (c += 1) : ((f = 0), (u = !1));
          }
          var y,
            g,
            v,
            b,
            E,
            x,
            S,
            P,
            _,
            C,
            A = a.t - r,
            T = s.t - r;
          if (s.to) {
            s.bezierData ||
              (s.bezierData = bez.buildBezierData(s.s, a.s || s.e, s.to, s.ti));
            var k = s.bezierData;
            if (A <= t || t < T) {
              var M = A <= t ? k.points.length - 1 : 0;
              for (o = k.points[M].point.length, n = 0; n < o; n += 1)
                i[n] = k.points[M].point[n];
            } else {
              s.__fnct
                ? (m = s.__fnct)
                : ((m = BezierFactory.getBezierEasing(
                    s.o.x,
                    s.o.y,
                    s.i.x,
                    s.i.y,
                    s.n
                  ).get),
                  (s.__fnct = m)),
                (h = m((t - T) / (A - T)));
              var D,
                w = k.segmentLength * h,
                F =
                  e.lastFrame < t && e._lastKeyframeIndex === c
                    ? e._lastAddedLength
                    : 0;
              for (
                p =
                  e.lastFrame < t && e._lastKeyframeIndex === c
                    ? e._lastPoint
                    : 0,
                  u = !0,
                  l = k.points.length;
                u;

              ) {
                if (
                  ((F += k.points[p].partialLength),
                  0 === w || 0 === h || p === k.points.length - 1)
                ) {
                  for (o = k.points[p].point.length, n = 0; n < o; n += 1)
                    i[n] = k.points[p].point[n];
                  break;
                }
                if (F <= w && w < F + k.points[p + 1].partialLength) {
                  for (
                    D = (w - F) / k.points[p + 1].partialLength,
                      o = k.points[p].point.length,
                      n = 0;
                    n < o;
                    n += 1
                  )
                    i[n] =
                      k.points[p].point[n] +
                      (k.points[p + 1].point[n] - k.points[p].point[n]) * D;
                  break;
                }
                p < l - 1 ? (p += 1) : (u = !1);
              }
              (e._lastPoint = p),
                (e._lastAddedLength = F - k.points[p].partialLength),
                (e._lastKeyframeIndex = c);
            }
          } else {
            var I, V, B, R, L;
            if (((d = s.s.length), (y = a.s || s.e), this.sh && 1 !== s.h))
              if (A <= t) (i[0] = y[0]), (i[1] = y[1]), (i[2] = y[2]);
              else if (t <= T)
                (i[0] = s.s[0]), (i[1] = s.s[1]), (i[2] = s.s[2]);
              else {
                var G = N(s.s),
                  z = N(y);
                (g = i),
                  (v = (function (t, e, i) {
                    var r,
                      s,
                      a,
                      n,
                      o,
                      h = [],
                      l = t[0],
                      p = t[1],
                      m = t[2],
                      f = t[3],
                      c = e[0],
                      d = e[1],
                      u = e[2],
                      y = e[3];
                    (s = l * c + p * d + m * u + f * y) < 0 &&
                      ((s = -s), (c = -c), (d = -d), (u = -u), (y = -y));
                    o =
                      1e-6 < 1 - s
                        ? ((r = Math.acos(s)),
                          (a = Math.sin(r)),
                          (n = Math.sin((1 - i) * r) / a),
                          Math.sin(i * r) / a)
                        : ((n = 1 - i), i);
                    return (
                      (h[0] = n * l + o * c),
                      (h[1] = n * p + o * d),
                      (h[2] = n * m + o * u),
                      (h[3] = n * f + o * y),
                      h
                    );
                  })(G, z, (t - T) / (A - T))),
                  (b = v[0]),
                  (E = v[1]),
                  (x = v[2]),
                  (S = v[3]),
                  (P = Math.atan2(
                    2 * E * S - 2 * b * x,
                    1 - 2 * E * E - 2 * x * x
                  )),
                  (_ = Math.asin(2 * b * E + 2 * x * S)),
                  (C = Math.atan2(
                    2 * b * S - 2 * E * x,
                    1 - 2 * b * b - 2 * x * x
                  )),
                  (g[0] = P / degToRads),
                  (g[1] = _ / degToRads),
                  (g[2] = C / degToRads);
              }
            else
              for (c = 0; c < d; c += 1)
                1 !== s.h &&
                  (h =
                    A <= t
                      ? 1
                      : t < T
                      ? 0
                      : (s.o.x.constructor === Array
                          ? (s.__fnct || (s.__fnct = []),
                            s.__fnct[c]
                              ? (m = s.__fnct[c])
                              : ((I =
                                  void 0 === s.o.x[c] ? s.o.x[0] : s.o.x[c]),
                                (V = void 0 === s.o.y[c] ? s.o.y[0] : s.o.y[c]),
                                (B = void 0 === s.i.x[c] ? s.i.x[0] : s.i.x[c]),
                                (R = void 0 === s.i.y[c] ? s.i.y[0] : s.i.y[c]),
                                (m = BezierFactory.getBezierEasing(
                                  I,
                                  V,
                                  B,
                                  R
                                ).get),
                                (s.__fnct[c] = m)))
                          : s.__fnct
                          ? (m = s.__fnct)
                          : ((I = s.o.x),
                            (V = s.o.y),
                            (B = s.i.x),
                            (R = s.i.y),
                            (m = BezierFactory.getBezierEasing(I, V, B, R).get),
                            (s.__fnct = m)),
                        m((t - T) / (A - T)))),
                  (y = a.s || s.e),
                  (L = 1 === s.h ? s.s[c] : s.s[c] + (y[c] - s.s[c]) * h),
                  "multidimensional" === this.propType ? (i[c] = L) : (i = L);
          }
          return (e.lastIndex = f), i;
        }
        function N(t) {
          var e = t[0] * degToRads,
            i = t[1] * degToRads,
            r = t[2] * degToRads,
            s = Math.cos(e / 2),
            a = Math.cos(i / 2),
            n = Math.cos(r / 2),
            o = Math.sin(e / 2),
            h = Math.sin(i / 2),
            l = Math.sin(r / 2);
          return [
            o * h * n + s * a * l,
            o * a * n + s * h * l,
            s * h * n - o * a * l,
            s * a * n - o * h * l
          ];
        }
        function c() {
          var t = this.comp.renderedFrame - this.offsetTime,
            e = this.keyframes[0].t - this.offsetTime,
            i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
          if (
            !(
              t === this._caching.lastFrame ||
              (this._caching.lastFrame !== m &&
                ((this._caching.lastFrame >= i && i <= t) ||
                  (this._caching.lastFrame < e && t < e)))
            )
          ) {
            this._caching.lastFrame >= t &&
              ((this._caching._lastKeyframeIndex = -1),
              (this._caching.lastIndex = 0));
            var r = this.interpolateValue(t, this._caching);
            this.pv = r;
          }
          return (this._caching.lastFrame = t), this.pv;
        }
        function d(t) {
          var e;
          if ("unidimensional" === this.propType)
            (e = t * this.mult),
              1e-5 < s(this.v - e) && ((this.v = e), (this._mdf = !0));
          else
            for (var i = 0, r = this.v.length; i < r; )
              (e = t[i] * this.mult),
                1e-5 < s(this.v[i] - e) && ((this.v[i] = e), (this._mdf = !0)),
                (i += 1);
        }
        function u() {
          if (
            this.elem.globalData.frameId !== this.frameId &&
            this.effectsSequence.length
          )
            if (this.lock) this.setVValue(this.pv);
            else {
              (this.lock = !0), (this._mdf = this._isFirstFrame);
              var t,
                e = this.effectsSequence.length,
                i = this.kf ? this.pv : this.data.k;
              for (t = 0; t < e; t += 1) i = this.effectsSequence[t](i);
              this.setVValue(i),
                (this._isFirstFrame = !1),
                (this.lock = !1),
                (this.frameId = this.elem.globalData.frameId);
            }
        }
        function y(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }
        function n(t, e, i, r) {
          (this.propType = "unidimensional"),
            (this.mult = i || 1),
            (this.data = e),
            (this.v = i ? e.k * i : e.k),
            (this.pv = e.k),
            (this._mdf = !1),
            (this.elem = t),
            (this.container = r),
            (this.comp = t.comp),
            (this.k = !1),
            (this.kf = !1),
            (this.vel = 0),
            (this.effectsSequence = []),
            (this._isFirstFrame = !0),
            (this.getValue = u),
            (this.setVValue = d),
            (this.addEffect = y);
        }
        function o(t, e, i, r) {
          (this.propType = "multidimensional"),
            (this.mult = i || 1),
            (this.data = e),
            (this._mdf = !1),
            (this.elem = t),
            (this.container = r),
            (this.comp = t.comp),
            (this.k = !1),
            (this.kf = !1),
            (this.frameId = -1);
          var s,
            a = e.k.length;
          (this.v = createTypedArray("float32", a)),
            (this.pv = createTypedArray("float32", a));
          createTypedArray("float32", a);
          for (this.vel = createTypedArray("float32", a), s = 0; s < a; s += 1)
            (this.v[s] = e.k[s] * this.mult), (this.pv[s] = e.k[s]);
          (this._isFirstFrame = !0),
            (this.effectsSequence = []),
            (this.getValue = u),
            (this.setVValue = d),
            (this.addEffect = y);
        }
        function h(t, e, i, r) {
          (this.propType = "unidimensional"),
            (this.keyframes = e.k),
            (this.offsetTime = t.data.st),
            (this.frameId = -1),
            (this._caching = {
              lastFrame: m,
              lastIndex: 0,
              value: 0,
              _lastKeyframeIndex: -1
            }),
            (this.k = !0),
            (this.kf = !0),
            (this.data = e),
            (this.mult = i || 1),
            (this.elem = t),
            (this.container = r),
            (this.comp = t.comp),
            (this.v = m),
            (this.pv = m),
            (this._isFirstFrame = !0),
            (this.getValue = u),
            (this.setVValue = d),
            (this.interpolateValue = f),
            (this.effectsSequence = [c.bind(this)]),
            (this.addEffect = y);
        }
        function l(t, e, i, r) {
          this.propType = "multidimensional";
          var s,
            a,
            n,
            o,
            h,
            l = e.k.length;
          for (s = 0; s < l - 1; s += 1)
            e.k[s].to &&
              e.k[s].s &&
              e.k[s + 1] &&
              e.k[s + 1].s &&
              ((a = e.k[s].s),
              (n = e.k[s + 1].s),
              (o = e.k[s].to),
              (h = e.k[s].ti),
              ((2 === a.length &&
                (a[0] !== n[0] || a[1] !== n[1]) &&
                bez.pointOnLine2D(
                  a[0],
                  a[1],
                  n[0],
                  n[1],
                  a[0] + o[0],
                  a[1] + o[1]
                ) &&
                bez.pointOnLine2D(
                  a[0],
                  a[1],
                  n[0],
                  n[1],
                  n[0] + h[0],
                  n[1] + h[1]
                )) ||
                (3 === a.length &&
                  (a[0] !== n[0] || a[1] !== n[1] || a[2] !== n[2]) &&
                  bez.pointOnLine3D(
                    a[0],
                    a[1],
                    a[2],
                    n[0],
                    n[1],
                    n[2],
                    a[0] + o[0],
                    a[1] + o[1],
                    a[2] + o[2]
                  ) &&
                  bez.pointOnLine3D(
                    a[0],
                    a[1],
                    a[2],
                    n[0],
                    n[1],
                    n[2],
                    n[0] + h[0],
                    n[1] + h[1],
                    n[2] + h[2]
                  ))) &&
                ((e.k[s].to = null), (e.k[s].ti = null)),
              a[0] === n[0] &&
                a[1] === n[1] &&
                0 === o[0] &&
                0 === o[1] &&
                0 === h[0] &&
                0 === h[1] &&
                (2 === a.length ||
                  (a[2] === n[2] && 0 === o[2] && 0 === h[2])) &&
                ((e.k[s].to = null), (e.k[s].ti = null)));
          (this.effectsSequence = [c.bind(this)]),
            (this.keyframes = e.k),
            (this.offsetTime = t.data.st),
            (this.k = !0),
            (this.kf = !0),
            (this._isFirstFrame = !0),
            (this.mult = i || 1),
            (this.elem = t),
            (this.container = r),
            (this.comp = t.comp),
            (this.getValue = u),
            (this.setVValue = d),
            (this.interpolateValue = f),
            (this.frameId = -1);
          var p = e.k[0].s.length;
          for (
            this.v = createTypedArray("float32", p),
              this.pv = createTypedArray("float32", p),
              s = 0;
            s < p;
            s += 1
          )
            (this.v[s] = m), (this.pv[s] = m);
          (this._caching = {
            lastFrame: m,
            lastIndex: 0,
            value: createTypedArray("float32", p)
          }),
            (this.addEffect = y);
        }
        return {
          getProp: function (t, e, i, r, s) {
            var a;
            if (e.k.length)
              if ("number" == typeof e.k[0]) a = new o(t, e, r, s);
              else
                switch (i) {
                  case 0:
                    a = new h(t, e, r, s);
                    break;
                  case 1:
                    a = new l(t, e, r, s);
                }
            else a = new n(t, e, r, s);
            return a.effectsSequence.length && s.addDynamicProperty(a), a;
          }
        };
      })(),
      TransformPropertyFactory = (function () {
        var n = [0, 0];
        function r(t, e, i) {
          if (
            ((this.elem = t),
            (this.frameId = -1),
            (this.propType = "transform"),
            (this.data = e),
            (this.v = new Matrix()),
            (this.pre = new Matrix()),
            (this.appliedTransformations = 0),
            this.initDynamicPropertyContainer(i || t),
            e.p && e.p.s
              ? ((this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this)),
                (this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this)),
                e.p.z &&
                  (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this)))
              : (this.p = PropertyFactory.getProp(
                  t,
                  e.p || { k: [0, 0, 0] },
                  1,
                  0,
                  this
                )),
            e.rx)
          ) {
            if (
              ((this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this)),
              (this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this)),
              (this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this)),
              e.or.k[0].ti)
            ) {
              var r,
                s = e.or.k.length;
              for (r = 0; r < s; r += 1) e.or.k[r].to = e.or.k[r].ti = null;
            }
            (this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this)),
              (this.or.sh = !0);
          } else
            this.r = PropertyFactory.getProp(
              t,
              e.r || { k: 0 },
              0,
              degToRads,
              this
            );
          e.sk &&
            ((this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this)),
            (this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this))),
            (this.a = PropertyFactory.getProp(
              t,
              e.a || { k: [0, 0, 0] },
              1,
              0,
              this
            )),
            (this.s = PropertyFactory.getProp(
              t,
              e.s || { k: [100, 100, 100] },
              1,
              0.01,
              this
            )),
            e.o
              ? (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, t))
              : (this.o = { _mdf: !1, v: 1 }),
            (this._isDirty = !0),
            this.dynamicProperties.length || this.getValue(!0);
        }
        return (
          (r.prototype = {
            applyToMatrix: function (t) {
              var e = this._mdf;
              this.iterateDynamicProperties(),
                (this._mdf = this._mdf || e),
                this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                this.sk && t.skewFromAxis(-this.sk.v, this.sa.v),
                this.r
                  ? t.rotate(-this.r.v)
                  : t
                      .rotateZ(-this.rz.v)
                      .rotateY(this.ry.v)
                      .rotateX(this.rx.v)
                      .rotateZ(-this.or.v[2])
                      .rotateY(this.or.v[1])
                      .rotateX(this.or.v[0]),
                this.data.p.s
                  ? this.data.p.z
                    ? t.translate(this.px.v, this.py.v, -this.pz.v)
                    : t.translate(this.px.v, this.py.v, 0)
                  : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
            },
            getValue: function (t) {
              if (this.elem.globalData.frameId !== this.frameId) {
                if (
                  (this._isDirty &&
                    (this.precalculateMatrix(), (this._isDirty = !1)),
                  this.iterateDynamicProperties(),
                  this._mdf || t)
                ) {
                  if (
                    (this.v.cloneFromProps(this.pre.props),
                    this.appliedTransformations < 1 &&
                      this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                    this.appliedTransformations < 2 &&
                      this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                    this.sk &&
                      this.appliedTransformations < 3 &&
                      this.v.skewFromAxis(-this.sk.v, this.sa.v),
                    this.r && this.appliedTransformations < 4
                      ? this.v.rotate(-this.r.v)
                      : !this.r &&
                        this.appliedTransformations < 4 &&
                        this.v
                          .rotateZ(-this.rz.v)
                          .rotateY(this.ry.v)
                          .rotateX(this.rx.v)
                          .rotateZ(-this.or.v[2])
                          .rotateY(this.or.v[1])
                          .rotateX(this.or.v[0]),
                    this.autoOriented)
                  ) {
                    var e,
                      i,
                      r = this.elem.globalData.frameRate;
                    if (this.p && this.p.keyframes && this.p.getValueAtTime)
                      i =
                        this.p._caching.lastFrame + this.p.offsetTime <=
                        this.p.keyframes[0].t
                          ? ((e = this.p.getValueAtTime(
                              (this.p.keyframes[0].t + 0.01) / r,
                              0
                            )),
                            this.p.getValueAtTime(this.p.keyframes[0].t / r, 0))
                          : this.p._caching.lastFrame + this.p.offsetTime >=
                            this.p.keyframes[this.p.keyframes.length - 1].t
                          ? ((e = this.p.getValueAtTime(
                              this.p.keyframes[this.p.keyframes.length - 1].t /
                                r,
                              0
                            )),
                            this.p.getValueAtTime(
                              (this.p.keyframes[this.p.keyframes.length - 1].t -
                                0.05) /
                                r,
                              0
                            ))
                          : ((e = this.p.pv),
                            this.p.getValueAtTime(
                              (this.p._caching.lastFrame +
                                this.p.offsetTime -
                                0.01) /
                                r,
                              this.p.offsetTime
                            ));
                    else if (
                      this.px &&
                      this.px.keyframes &&
                      this.py.keyframes &&
                      this.px.getValueAtTime &&
                      this.py.getValueAtTime
                    ) {
                      (e = []), (i = []);
                      var s = this.px,
                        a = this.py;
                      s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t
                        ? ((e[0] = s.getValueAtTime(
                            (s.keyframes[0].t + 0.01) / r,
                            0
                          )),
                          (e[1] = a.getValueAtTime(
                            (a.keyframes[0].t + 0.01) / r,
                            0
                          )),
                          (i[0] = s.getValueAtTime(s.keyframes[0].t / r, 0)),
                          (i[1] = a.getValueAtTime(a.keyframes[0].t / r, 0)))
                        : s._caching.lastFrame + s.offsetTime >=
                          s.keyframes[s.keyframes.length - 1].t
                        ? ((e[0] = s.getValueAtTime(
                            s.keyframes[s.keyframes.length - 1].t / r,
                            0
                          )),
                          (e[1] = a.getValueAtTime(
                            a.keyframes[a.keyframes.length - 1].t / r,
                            0
                          )),
                          (i[0] = s.getValueAtTime(
                            (s.keyframes[s.keyframes.length - 1].t - 0.01) / r,
                            0
                          )),
                          (i[1] = a.getValueAtTime(
                            (a.keyframes[a.keyframes.length - 1].t - 0.01) / r,
                            0
                          )))
                        : ((e = [s.pv, a.pv]),
                          (i[0] = s.getValueAtTime(
                            (s._caching.lastFrame + s.offsetTime - 0.01) / r,
                            s.offsetTime
                          )),
                          (i[1] = a.getValueAtTime(
                            (a._caching.lastFrame + a.offsetTime - 0.01) / r,
                            a.offsetTime
                          )));
                    } else e = i = n;
                    this.v.rotate(-Math.atan2(e[1] - i[1], e[0] - i[0]));
                  }
                  this.data.p && this.data.p.s
                    ? this.data.p.z
                      ? this.v.translate(this.px.v, this.py.v, -this.pz.v)
                      : this.v.translate(this.px.v, this.py.v, 0)
                    : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
                }
                this.frameId = this.elem.globalData.frameId;
              }
            },
            precalculateMatrix: function () {
              if (
                !this.a.k &&
                (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                (this.appliedTransformations = 1),
                !this.s.effectsSequence.length)
              ) {
                if (
                  (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                  (this.appliedTransformations = 2),
                  this.sk)
                ) {
                  if (
                    this.sk.effectsSequence.length ||
                    this.sa.effectsSequence.length
                  )
                    return;
                  this.pre.skewFromAxis(-this.sk.v, this.sa.v),
                    (this.appliedTransformations = 3);
                }
                if (this.r) {
                  if (this.r.effectsSequence.length) return;
                  this.pre.rotate(-this.r.v), (this.appliedTransformations = 4);
                } else
                  this.rz.effectsSequence.length ||
                    this.ry.effectsSequence.length ||
                    this.rx.effectsSequence.length ||
                    this.or.effectsSequence.length ||
                    (this.pre
                      .rotateZ(-this.rz.v)
                      .rotateY(this.ry.v)
                      .rotateX(this.rx.v)
                      .rotateZ(-this.or.v[2])
                      .rotateY(this.or.v[1])
                      .rotateX(this.or.v[0]),
                    (this.appliedTransformations = 4));
              }
            },
            autoOrient: function () {}
          }),
          extendPrototype([DynamicPropertyContainer], r),
          (r.prototype.addDynamicProperty = function (t) {
            this._addDynamicProperty(t),
              this.elem.addDynamicProperty(t),
              (this._isDirty = !0);
          }),
          (r.prototype._addDynamicProperty =
            DynamicPropertyContainer.prototype.addDynamicProperty),
          {
            getTransformProperty: function (t, e, i) {
              return new r(t, e, i);
            }
          }
        );
      })();
    function ShapePath() {
      (this.c = !1),
        (this._length = 0),
        (this._maxLength = 8),
        (this.v = createSizedArray(this._maxLength)),
        (this.o = createSizedArray(this._maxLength)),
        (this.i = createSizedArray(this._maxLength));
    }
    (ShapePath.prototype.setPathData = function (t, e) {
      (this.c = t), this.setLength(e);
      for (var i = 0; i < e; )
        (this.v[i] = point_pool.newElement()),
          (this.o[i] = point_pool.newElement()),
          (this.i[i] = point_pool.newElement()),
          (i += 1);
    }),
      (ShapePath.prototype.setLength = function (t) {
        for (; this._maxLength < t; ) this.doubleArrayLength();
        this._length = t;
      }),
      (ShapePath.prototype.doubleArrayLength = function () {
        (this.v = this.v.concat(createSizedArray(this._maxLength))),
          (this.i = this.i.concat(createSizedArray(this._maxLength))),
          (this.o = this.o.concat(createSizedArray(this._maxLength))),
          (this._maxLength *= 2);
      }),
      (ShapePath.prototype.setXYAt = function (t, e, i, r, s) {
        var a;
        switch (
          ((this._length = Math.max(this._length, r + 1)),
          this._length >= this._maxLength && this.doubleArrayLength(),
          i)
        ) {
          case "v":
            a = this.v;
            break;
          case "i":
            a = this.i;
            break;
          case "o":
            a = this.o;
        }
        (!a[r] || (a[r] && !s)) && (a[r] = point_pool.newElement()),
          (a[r][0] = t),
          (a[r][1] = e);
      }),
      (ShapePath.prototype.setTripleAt = function (t, e, i, r, s, a, n, o) {
        this.setXYAt(t, e, "v", n, o),
          this.setXYAt(i, r, "o", n, o),
          this.setXYAt(s, a, "i", n, o);
      }),
      (ShapePath.prototype.reverse = function () {
        var t = new ShapePath();
        t.setPathData(this.c, this._length);
        var e = this.v,
          i = this.o,
          r = this.i,
          s = 0;
        this.c &&
          (t.setTripleAt(
            e[0][0],
            e[0][1],
            r[0][0],
            r[0][1],
            i[0][0],
            i[0][1],
            0,
            !1
          ),
          (s = 1));
        var a,
          n = this._length - 1,
          o = this._length;
        for (a = s; a < o; a += 1)
          t.setTripleAt(
            e[n][0],
            e[n][1],
            r[n][0],
            r[n][1],
            i[n][0],
            i[n][1],
            a,
            !1
          ),
            (n -= 1);
        return t;
      });
    var ShapePropertyFactory = (function () {
        var s = -999999;
        function t(t, e, i) {
          var r,
            s,
            a,
            n,
            o,
            h,
            l,
            p,
            m,
            f = i.lastIndex,
            c = this.keyframes;
          if (t < c[0].t - this.offsetTime) (r = c[0].s[0]), (a = !0), (f = 0);
          else if (t >= c[c.length - 1].t - this.offsetTime)
            (r = c[c.length - 1].s
              ? c[c.length - 1].s[0]
              : c[c.length - 2].e[0]),
              (a = !0);
          else {
            for (
              var d, u, y = f, g = c.length - 1, v = !0;
              v && ((d = c[y]), !((u = c[y + 1]).t - this.offsetTime > t));

            )
              y < g - 1 ? (y += 1) : (v = !1);
            if (((f = y), !(a = 1 === d.h))) {
              if (t >= u.t - this.offsetTime) p = 1;
              else if (t < d.t - this.offsetTime) p = 0;
              else {
                var b;
                d.__fnct
                  ? (b = d.__fnct)
                  : ((b = BezierFactory.getBezierEasing(
                      d.o.x,
                      d.o.y,
                      d.i.x,
                      d.i.y
                    ).get),
                    (d.__fnct = b)),
                  (p = b(
                    (t - (d.t - this.offsetTime)) /
                      (u.t - this.offsetTime - (d.t - this.offsetTime))
                  ));
              }
              s = u.s ? u.s[0] : d.e[0];
            }
            r = d.s[0];
          }
          for (
            h = e._length, l = r.i[0].length, i.lastIndex = f, n = 0;
            n < h;
            n += 1
          )
            for (o = 0; o < l; o += 1)
              (m = a ? r.i[n][o] : r.i[n][o] + (s.i[n][o] - r.i[n][o]) * p),
                (e.i[n][o] = m),
                (m = a ? r.o[n][o] : r.o[n][o] + (s.o[n][o] - r.o[n][o]) * p),
                (e.o[n][o] = m),
                (m = a ? r.v[n][o] : r.v[n][o] + (s.v[n][o] - r.v[n][o]) * p),
                (e.v[n][o] = m);
        }
        function a() {
          this.paths = this.localShapeCollection;
        }
        function e(t) {
          (function (t, e) {
            if (t._length !== e._length || t.c !== e.c) return !1;
            var i,
              r = t._length;
            for (i = 0; i < r; i += 1)
              if (
                t.v[i][0] !== e.v[i][0] ||
                t.v[i][1] !== e.v[i][1] ||
                t.o[i][0] !== e.o[i][0] ||
                t.o[i][1] !== e.o[i][1] ||
                t.i[i][0] !== e.i[i][0] ||
                t.i[i][1] !== e.i[i][1]
              )
                return !1;
            return !0;
          })(this.v, t) ||
            ((this.v = shape_pool.clone(t)),
            this.localShapeCollection.releaseShapes(),
            this.localShapeCollection.addShape(this.v),
            (this._mdf = !0),
            (this.paths = this.localShapeCollection));
        }
        function i() {
          if (this.elem.globalData.frameId !== this.frameId)
            if (this.effectsSequence.length)
              if (this.lock) this.setVValue(this.pv);
              else {
                (this.lock = !0), (this._mdf = !1);
                var t,
                  e = this.kf
                    ? this.pv
                    : this.data.ks
                    ? this.data.ks.k
                    : this.data.pt.k,
                  i = this.effectsSequence.length;
                for (t = 0; t < i; t += 1) e = this.effectsSequence[t](e);
                this.setVValue(e),
                  (this.lock = !1),
                  (this.frameId = this.elem.globalData.frameId);
              }
            else this._mdf = !1;
        }
        function n(t, e, i) {
          (this.propType = "shape"),
            (this.comp = t.comp),
            (this.container = t),
            (this.elem = t),
            (this.data = e),
            (this.k = !1),
            (this.kf = !1),
            (this._mdf = !1);
          var r = 3 === i ? e.pt.k : e.ks.k;
          (this.v = shape_pool.clone(r)),
            (this.pv = shape_pool.clone(this.v)),
            (this.localShapeCollection =
              shapeCollection_pool.newShapeCollection()),
            (this.paths = this.localShapeCollection),
            this.paths.addShape(this.v),
            (this.reset = a),
            (this.effectsSequence = []);
        }
        function r(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }
        function o(t, e, i) {
          (this.propType = "shape"),
            (this.comp = t.comp),
            (this.elem = t),
            (this.container = t),
            (this.offsetTime = t.data.st),
            (this.keyframes = 3 === i ? e.pt.k : e.ks.k),
            (this.k = !0),
            (this.kf = !0);
          var r = this.keyframes[0].s[0].i.length;
          this.keyframes[0].s[0].i[0].length;
          (this.v = shape_pool.newElement()),
            this.v.setPathData(this.keyframes[0].s[0].c, r),
            (this.pv = shape_pool.clone(this.v)),
            (this.localShapeCollection =
              shapeCollection_pool.newShapeCollection()),
            (this.paths = this.localShapeCollection),
            this.paths.addShape(this.v),
            (this.lastFrame = s),
            (this.reset = a),
            (this._caching = { lastFrame: s, lastIndex: 0 }),
            (this.effectsSequence = [
              function () {
                var t = this.comp.renderedFrame - this.offsetTime,
                  e = this.keyframes[0].t - this.offsetTime,
                  i =
                    this.keyframes[this.keyframes.length - 1].t -
                    this.offsetTime,
                  r = this._caching.lastFrame;
                return (
                  (r !== s && ((r < e && t < e) || (i < r && i < t))) ||
                    ((this._caching.lastIndex =
                      r < t ? this._caching.lastIndex : 0),
                    this.interpolateShape(t, this.pv, this._caching)),
                  (this._caching.lastFrame = t),
                  this.pv
                );
              }.bind(this)
            ]);
        }
        (n.prototype.interpolateShape = t),
          (n.prototype.getValue = i),
          (n.prototype.setVValue = e),
          (n.prototype.addEffect = r),
          (o.prototype.getValue = i),
          (o.prototype.interpolateShape = t),
          (o.prototype.setVValue = e),
          (o.prototype.addEffect = r);
        var h = (function () {
            var n = roundCorner;
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                this.v.setPathData(!0, 4),
                (this.localShapeCollection =
                  shapeCollection_pool.newShapeCollection()),
                (this.paths = this.localShapeCollection),
                this.localShapeCollection.addShape(this.v),
                (this.d = e.d),
                (this.elem = t),
                (this.comp = t.comp),
                (this.frameId = -1),
                this.initDynamicPropertyContainer(t),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                this.dynamicProperties.length
                  ? (this.k = !0)
                  : ((this.k = !1), this.convertEllToPath());
            }
            return (
              (t.prototype = {
                reset: a,
                getValue: function () {
                  this.elem.globalData.frameId !== this.frameId &&
                    ((this.frameId = this.elem.globalData.frameId),
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertEllToPath());
                },
                convertEllToPath: function () {
                  var t = this.p.v[0],
                    e = this.p.v[1],
                    i = this.s.v[0] / 2,
                    r = this.s.v[1] / 2,
                    s = 3 !== this.d,
                    a = this.v;
                  (a.v[0][0] = t),
                    (a.v[0][1] = e - r),
                    (a.v[1][0] = s ? t + i : t - i),
                    (a.v[1][1] = e),
                    (a.v[2][0] = t),
                    (a.v[2][1] = e + r),
                    (a.v[3][0] = s ? t - i : t + i),
                    (a.v[3][1] = e),
                    (a.i[0][0] = s ? t - i * n : t + i * n),
                    (a.i[0][1] = e - r),
                    (a.i[1][0] = s ? t + i : t - i),
                    (a.i[1][1] = e - r * n),
                    (a.i[2][0] = s ? t + i * n : t - i * n),
                    (a.i[2][1] = e + r),
                    (a.i[3][0] = s ? t - i : t + i),
                    (a.i[3][1] = e + r * n),
                    (a.o[0][0] = s ? t + i * n : t - i * n),
                    (a.o[0][1] = e - r),
                    (a.o[1][0] = s ? t + i : t - i),
                    (a.o[1][1] = e + r * n),
                    (a.o[2][0] = s ? t - i * n : t + i * n),
                    (a.o[2][1] = e + r),
                    (a.o[3][0] = s ? t - i : t + i),
                    (a.o[3][1] = e - r * n);
                }
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })(),
          l = (function () {
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                this.v.setPathData(!0, 0),
                (this.elem = t),
                (this.comp = t.comp),
                (this.data = e),
                (this.frameId = -1),
                (this.d = e.d),
                this.initDynamicPropertyContainer(t),
                1 === e.sy
                  ? ((this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this)),
                    (this.is = PropertyFactory.getProp(t, e.is, 0, 0.01, this)),
                    (this.convertToPath = this.convertStarToPath))
                  : (this.convertToPath = this.convertPolygonToPath),
                (this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this)),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this)),
                (this.or = PropertyFactory.getProp(t, e.or, 0, 0, this)),
                (this.os = PropertyFactory.getProp(t, e.os, 0, 0.01, this)),
                (this.localShapeCollection =
                  shapeCollection_pool.newShapeCollection()),
                this.localShapeCollection.addShape(this.v),
                (this.paths = this.localShapeCollection),
                this.dynamicProperties.length
                  ? (this.k = !0)
                  : ((this.k = !1), this.convertToPath());
            }
            return (
              (t.prototype = {
                reset: a,
                getValue: function () {
                  this.elem.globalData.frameId !== this.frameId &&
                    ((this.frameId = this.elem.globalData.frameId),
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertToPath());
                },
                convertStarToPath: function () {
                  var t,
                    e,
                    i,
                    r,
                    s = 2 * Math.floor(this.pt.v),
                    a = (2 * Math.PI) / s,
                    n = !0,
                    o = this.or.v,
                    h = this.ir.v,
                    l = this.os.v,
                    p = this.is.v,
                    m = (2 * Math.PI * o) / (2 * s),
                    f = (2 * Math.PI * h) / (2 * s),
                    c = -Math.PI / 2;
                  c += this.r.v;
                  var d = 3 === this.data.d ? -1 : 1;
                  for (t = this.v._length = 0; t < s; t += 1) {
                    (i = n ? l : p), (r = n ? m : f);
                    var u = (e = n ? o : h) * Math.cos(c),
                      y = e * Math.sin(c),
                      g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                      v =
                        0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                    (u += +this.p.v[0]),
                      (y += +this.p.v[1]),
                      this.v.setTripleAt(
                        u,
                        y,
                        u - g * r * i * d,
                        y - v * r * i * d,
                        u + g * r * i * d,
                        y + v * r * i * d,
                        t,
                        !0
                      ),
                      (n = !n),
                      (c += a * d);
                  }
                },
                convertPolygonToPath: function () {
                  var t,
                    e = Math.floor(this.pt.v),
                    i = (2 * Math.PI) / e,
                    r = this.or.v,
                    s = this.os.v,
                    a = (2 * Math.PI * r) / (4 * e),
                    n = -Math.PI / 2,
                    o = 3 === this.data.d ? -1 : 1;
                  for (n += this.r.v, t = this.v._length = 0; t < e; t += 1) {
                    var h = r * Math.cos(n),
                      l = r * Math.sin(n),
                      p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                      m =
                        0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                    (h += +this.p.v[0]),
                      (l += +this.p.v[1]),
                      this.v.setTripleAt(
                        h,
                        l,
                        h - p * a * s * o,
                        l - m * a * s * o,
                        h + p * a * s * o,
                        l + m * a * s * o,
                        t,
                        !0
                      ),
                      (n += i * o);
                  }
                  (this.paths.length = 0), (this.paths[0] = this.v);
                }
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })(),
          p = (function () {
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                (this.v.c = !0),
                (this.localShapeCollection =
                  shapeCollection_pool.newShapeCollection()),
                this.localShapeCollection.addShape(this.v),
                (this.paths = this.localShapeCollection),
                (this.elem = t),
                (this.comp = t.comp),
                (this.frameId = -1),
                (this.d = e.d),
                this.initDynamicPropertyContainer(t),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                (this.r = PropertyFactory.getProp(t, e.r, 0, 0, this)),
                this.dynamicProperties.length
                  ? (this.k = !0)
                  : ((this.k = !1), this.convertRectToPath());
            }
            return (
              (t.prototype = {
                convertRectToPath: function () {
                  var t = this.p.v[0],
                    e = this.p.v[1],
                    i = this.s.v[0] / 2,
                    r = this.s.v[1] / 2,
                    s = bm_min(i, r, this.r.v),
                    a = s * (1 - roundCorner);
                  (this.v._length = 0),
                    2 === this.d || 1 === this.d
                      ? (this.v.setTripleAt(
                          t + i,
                          e - r + s,
                          t + i,
                          e - r + s,
                          t + i,
                          e - r + a,
                          0,
                          !0
                        ),
                        this.v.setTripleAt(
                          t + i,
                          e + r - s,
                          t + i,
                          e + r - a,
                          t + i,
                          e + r - s,
                          1,
                          !0
                        ),
                        0 !== s
                          ? (this.v.setTripleAt(
                              t + i - s,
                              e + r,
                              t + i - s,
                              e + r,
                              t + i - a,
                              e + r,
                              2,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i + s,
                              e + r,
                              t - i + a,
                              e + r,
                              t - i + s,
                              e + r,
                              3,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i,
                              e + r - s,
                              t - i,
                              e + r - s,
                              t - i,
                              e + r - a,
                              4,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i,
                              e - r + s,
                              t - i,
                              e - r + a,
                              t - i,
                              e - r + s,
                              5,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i + s,
                              e - r,
                              t - i + s,
                              e - r,
                              t - i + a,
                              e - r,
                              6,
                              !0
                            ),
                            this.v.setTripleAt(
                              t + i - s,
                              e - r,
                              t + i - a,
                              e - r,
                              t + i - s,
                              e - r,
                              7,
                              !0
                            ))
                          : (this.v.setTripleAt(
                              t - i,
                              e + r,
                              t - i + a,
                              e + r,
                              t - i,
                              e + r,
                              2
                            ),
                            this.v.setTripleAt(
                              t - i,
                              e - r,
                              t - i,
                              e - r + a,
                              t - i,
                              e - r,
                              3
                            )))
                      : (this.v.setTripleAt(
                          t + i,
                          e - r + s,
                          t + i,
                          e - r + a,
                          t + i,
                          e - r + s,
                          0,
                          !0
                        ),
                        0 !== s
                          ? (this.v.setTripleAt(
                              t + i - s,
                              e - r,
                              t + i - s,
                              e - r,
                              t + i - a,
                              e - r,
                              1,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i + s,
                              e - r,
                              t - i + a,
                              e - r,
                              t - i + s,
                              e - r,
                              2,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i,
                              e - r + s,
                              t - i,
                              e - r + s,
                              t - i,
                              e - r + a,
                              3,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i,
                              e + r - s,
                              t - i,
                              e + r - a,
                              t - i,
                              e + r - s,
                              4,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i + s,
                              e + r,
                              t - i + s,
                              e + r,
                              t - i + a,
                              e + r,
                              5,
                              !0
                            ),
                            this.v.setTripleAt(
                              t + i - s,
                              e + r,
                              t + i - a,
                              e + r,
                              t + i - s,
                              e + r,
                              6,
                              !0
                            ),
                            this.v.setTripleAt(
                              t + i,
                              e + r - s,
                              t + i,
                              e + r - s,
                              t + i,
                              e + r - a,
                              7,
                              !0
                            ))
                          : (this.v.setTripleAt(
                              t - i,
                              e - r,
                              t - i + a,
                              e - r,
                              t - i,
                              e - r,
                              1,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - i,
                              e + r,
                              t - i,
                              e + r - a,
                              t - i,
                              e + r,
                              2,
                              !0
                            ),
                            this.v.setTripleAt(
                              t + i,
                              e + r,
                              t + i - a,
                              e + r,
                              t + i,
                              e + r,
                              3,
                              !0
                            )));
                },
                getValue: function (t) {
                  this.elem.globalData.frameId !== this.frameId &&
                    ((this.frameId = this.elem.globalData.frameId),
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertRectToPath());
                },
                reset: a
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })();
        var m = {
          getShapeProp: function (t, e, i) {
            var r;
            return (
              3 === i || 4 === i
                ? (r = (3 === i ? e.pt : e.ks).k.length
                    ? new o(t, e, i)
                    : new n(t, e, i))
                : 5 === i
                ? (r = new p(t, e))
                : 6 === i
                ? (r = new h(t, e))
                : 7 === i && (r = new l(t, e)),
              r.k && t.addDynamicProperty(r),
              r
            );
          },
          getConstructorFunction: function () {
            return n;
          },
          getKeyframedConstructorFunction: function () {
            return o;
          }
        };
        return m;
      })(),
      ShapeModifiers =
        ((fs = {}),
        (gs = {}),
        (fs.registerModifier = function (t, e) {
          gs[t] || (gs[t] = e);
        }),
        (fs.getModifier = function (t, e, i) {
          return new gs[t](e, i);
        }),
        fs),
      fs,
      gs;
    function ShapeModifier() {}
    function TrimModifier() {}
    function RoundCornersModifier() {}
    function RepeaterModifier() {}
    function ShapeCollection() {
      (this._length = 0),
        (this._maxLength = 4),
        (this.shapes = createSizedArray(this._maxLength));
    }
    function DashProperty(t, e, i, r) {
      (this.elem = t),
        (this.frameId = -1),
        (this.dataProps = createSizedArray(e.length)),
        (this.renderer = i),
        (this.k = !1),
        (this.dashStr = ""),
        (this.dashArray = createTypedArray(
          "float32",
          e.length ? e.length - 1 : 0
        )),
        (this.dashoffset = createTypedArray("float32", 1)),
        this.initDynamicPropertyContainer(r);
      var s,
        a,
        n = e.length || 0;
      for (s = 0; s < n; s += 1)
        (a = PropertyFactory.getProp(t, e[s].v, 0, 0, this)),
          (this.k = a.k || this.k),
          (this.dataProps[s] = { n: e[s].n, p: a });
      this.k || this.getValue(!0), (this._isAnimated = this.k);
    }
    function GradientProperty(t, e, i) {
      (this.data = e), (this.c = createTypedArray("uint8c", 4 * e.p));
      var r = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
      (this.o = createTypedArray("float32", r)),
        (this._cmdf = !1),
        (this._omdf = !1),
        (this._collapsable = this.checkCollapsable()),
        (this._hasOpacity = r),
        this.initDynamicPropertyContainer(i),
        (this.prop = PropertyFactory.getProp(t, e.k, 1, null, this)),
        (this.k = this.prop.k),
        this.getValue(!0);
    }
    (ShapeModifier.prototype.initModifierProperties = function () {}),
      (ShapeModifier.prototype.addShapeToModifier = function () {}),
      (ShapeModifier.prototype.addShape = function (t) {
        if (!this.closed) {
          t.sh.container.addDynamicProperty(t.sh);
          var e = {
            shape: t.sh,
            data: t,
            localShapeCollection: shapeCollection_pool.newShapeCollection()
          };
          this.shapes.push(e),
            this.addShapeToModifier(e),
            this._isAnimated && t.setAsAnimated();
        }
      }),
      (ShapeModifier.prototype.init = function (t, e) {
        (this.shapes = []),
          (this.elem = t),
          this.initDynamicPropertyContainer(t),
          this.initModifierProperties(t, e),
          (this.frameId = initialDefaultFrame),
          (this.closed = !1),
          (this.k = !1),
          this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
      }),
      (ShapeModifier.prototype.processKeys = function () {
        this.elem.globalData.frameId !== this.frameId &&
          ((this.frameId = this.elem.globalData.frameId),
          this.iterateDynamicProperties());
      }),
      extendPrototype([DynamicPropertyContainer], ShapeModifier),
      extendPrototype([ShapeModifier], TrimModifier),
      (TrimModifier.prototype.initModifierProperties = function (t, e) {
        (this.s = PropertyFactory.getProp(t, e.s, 0, 0.01, this)),
          (this.e = PropertyFactory.getProp(t, e.e, 0, 0.01, this)),
          (this.o = PropertyFactory.getProp(t, e.o, 0, 0, this)),
          (this.sValue = 0),
          (this.eValue = 0),
          (this.getValue = this.processKeys),
          (this.m = e.m),
          (this._isAnimated =
            !!this.s.effectsSequence.length ||
            !!this.e.effectsSequence.length ||
            !!this.o.effectsSequence.length);
      }),
      (TrimModifier.prototype.addShapeToModifier = function (t) {
        t.pathsData = [];
      }),
      (TrimModifier.prototype.calculateShapeEdges = function (t, e, i, r, s) {
        var a = [];
        e <= 1
          ? a.push({ s: t, e: e })
          : 1 <= t
          ? a.push({ s: t - 1, e: e - 1 })
          : (a.push({ s: t, e: 1 }), a.push({ s: 0, e: e - 1 }));
        var n,
          o,
          h = [],
          l = a.length;
        for (n = 0; n < l; n += 1) {
          var p, m;
          if ((o = a[n]).e * s < r || o.s * s > r + i);
          else
            (p = o.s * s <= r ? 0 : (o.s * s - r) / i),
              (m = o.e * s >= r + i ? 1 : (o.e * s - r) / i),
              h.push([p, m]);
        }
        return h.length || h.push([0, 0]), h;
      }),
      (TrimModifier.prototype.releasePathsData = function (t) {
        var e,
          i = t.length;
        for (e = 0; e < i; e += 1) segments_length_pool.release(t[e]);
        return (t.length = 0), t;
      }),
      (TrimModifier.prototype.processShapes = function (t) {
        var e, i, r;
        if (this._mdf || t) {
          var s = (this.o.v % 360) / 360;
          if (
            (s < 0 && (s += 1),
            (e = (1 < this.s.v ? 1 : this.s.v < 0 ? 0 : this.s.v) + s),
            (i = (1 < this.e.v ? 1 : this.e.v < 0 ? 0 : this.e.v) + s) < e)
          ) {
            var a = e;
            (e = i), (i = a);
          }
          (e = 1e-4 * Math.round(1e4 * e)),
            (i = 1e-4 * Math.round(1e4 * i)),
            (this.sValue = e),
            (this.eValue = i);
        } else (e = this.sValue), (i = this.eValue);
        var n,
          o,
          h,
          l,
          p,
          m,
          f = this.shapes.length,
          c = 0;
        if (i === e)
          for (n = 0; n < f; n += 1)
            this.shapes[n].localShapeCollection.releaseShapes(),
              (this.shapes[n].shape._mdf = !0),
              (this.shapes[n].shape.paths =
                this.shapes[n].localShapeCollection);
        else if ((1 === i && 0 === e) || (0 === i && 1 === e)) {
          if (this._mdf)
            for (n = 0; n < f; n += 1)
              (this.shapes[n].pathsData.length = 0),
                (this.shapes[n].shape._mdf = !0);
        } else {
          var d,
            u,
            y = [];
          for (n = 0; n < f; n += 1)
            if (
              (d = this.shapes[n]).shape._mdf ||
              this._mdf ||
              t ||
              2 === this.m
            ) {
              if (
                ((h = (r = d.shape.paths)._length),
                (m = 0),
                !d.shape._mdf && d.pathsData.length)
              )
                m = d.totalShapeLength;
              else {
                for (
                  l = this.releasePathsData(d.pathsData), o = 0;
                  o < h;
                  o += 1
                )
                  (p = bez.getSegmentsLength(r.shapes[o])),
                    l.push(p),
                    (m += p.totalLength);
                (d.totalShapeLength = m), (d.pathsData = l);
              }
              (c += m), (d.shape._mdf = !0);
            } else d.shape.paths = d.localShapeCollection;
          var g,
            v = e,
            b = i,
            E = 0;
          for (n = f - 1; 0 <= n; n -= 1)
            if ((d = this.shapes[n]).shape._mdf) {
              for (
                (u = d.localShapeCollection).releaseShapes(),
                  2 === this.m && 1 < f
                    ? ((g = this.calculateShapeEdges(
                        e,
                        i,
                        d.totalShapeLength,
                        E,
                        c
                      )),
                      (E += d.totalShapeLength))
                    : (g = [[v, b]]),
                  h = g.length,
                  o = 0;
                o < h;
                o += 1
              ) {
                (v = g[o][0]),
                  (b = g[o][1]),
                  (y.length = 0),
                  b <= 1
                    ? y.push({
                        s: d.totalShapeLength * v,
                        e: d.totalShapeLength * b
                      })
                    : 1 <= v
                    ? y.push({
                        s: d.totalShapeLength * (v - 1),
                        e: d.totalShapeLength * (b - 1)
                      })
                    : (y.push({
                        s: d.totalShapeLength * v,
                        e: d.totalShapeLength
                      }),
                      y.push({ s: 0, e: d.totalShapeLength * (b - 1) }));
                var x = this.addShapes(d, y[0]);
                if (y[0].s !== y[0].e) {
                  if (1 < y.length)
                    if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                      var S = x.pop();
                      this.addPaths(x, u), (x = this.addShapes(d, y[1], S));
                    } else this.addPaths(x, u), (x = this.addShapes(d, y[1]));
                  this.addPaths(x, u);
                }
              }
              d.shape.paths = u;
            }
        }
      }),
      (TrimModifier.prototype.addPaths = function (t, e) {
        var i,
          r = t.length;
        for (i = 0; i < r; i += 1) e.addShape(t[i]);
      }),
      (TrimModifier.prototype.addSegment = function (t, e, i, r, s, a, n) {
        s.setXYAt(e[0], e[1], "o", a),
          s.setXYAt(i[0], i[1], "i", a + 1),
          n && s.setXYAt(t[0], t[1], "v", a),
          s.setXYAt(r[0], r[1], "v", a + 1);
      }),
      (TrimModifier.prototype.addSegmentFromArray = function (t, e, i, r) {
        e.setXYAt(t[1], t[5], "o", i),
          e.setXYAt(t[2], t[6], "i", i + 1),
          r && e.setXYAt(t[0], t[4], "v", i),
          e.setXYAt(t[3], t[7], "v", i + 1);
      }),
      (TrimModifier.prototype.addShapes = function (t, e, i) {
        var r,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          m = t.pathsData,
          f = t.shape.paths.shapes,
          c = t.shape.paths._length,
          d = 0,
          u = [],
          y = !0;
        for (
          p = i
            ? ((o = i._length), i._length)
            : ((i = shape_pool.newElement()), (o = 0)),
            u.push(i),
            r = 0;
          r < c;
          r += 1
        ) {
          for (
            h = m[r].lengths,
              i.c = f[r].c,
              a = f[r].c ? h.length : h.length + 1,
              s = 1;
            s < a;
            s += 1
          )
            if (d + (n = h[s - 1]).addedLength < e.s)
              (d += n.addedLength), (i.c = !1);
            else {
              if (d > e.e) {
                i.c = !1;
                break;
              }
              e.s <= d && e.e >= d + n.addedLength
                ? (this.addSegment(
                    f[r].v[s - 1],
                    f[r].o[s - 1],
                    f[r].i[s],
                    f[r].v[s],
                    i,
                    o,
                    y
                  ),
                  (y = !1))
                : ((l = bez.getNewSegment(
                    f[r].v[s - 1],
                    f[r].v[s],
                    f[r].o[s - 1],
                    f[r].i[s],
                    (e.s - d) / n.addedLength,
                    (e.e - d) / n.addedLength,
                    h[s - 1]
                  )),
                  this.addSegmentFromArray(l, i, o, y),
                  (y = !1),
                  (i.c = !1)),
                (d += n.addedLength),
                (o += 1);
            }
          if (f[r].c && h.length) {
            if (((n = h[s - 1]), d <= e.e)) {
              var g = h[s - 1].addedLength;
              e.s <= d && e.e >= d + g
                ? (this.addSegment(
                    f[r].v[s - 1],
                    f[r].o[s - 1],
                    f[r].i[0],
                    f[r].v[0],
                    i,
                    o,
                    y
                  ),
                  (y = !1))
                : ((l = bez.getNewSegment(
                    f[r].v[s - 1],
                    f[r].v[0],
                    f[r].o[s - 1],
                    f[r].i[0],
                    (e.s - d) / g,
                    (e.e - d) / g,
                    h[s - 1]
                  )),
                  this.addSegmentFromArray(l, i, o, y),
                  (y = !1),
                  (i.c = !1));
            } else i.c = !1;
            (d += n.addedLength), (o += 1);
          }
          if (
            (i._length &&
              (i.setXYAt(i.v[p][0], i.v[p][1], "i", p),
              i.setXYAt(
                i.v[i._length - 1][0],
                i.v[i._length - 1][1],
                "o",
                i._length - 1
              )),
            d > e.e)
          )
            break;
          r < c - 1 &&
            ((i = shape_pool.newElement()), (y = !0), u.push(i), (o = 0));
        }
        return u;
      }),
      ShapeModifiers.registerModifier("tm", TrimModifier),
      extendPrototype([ShapeModifier], RoundCornersModifier),
      (RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
        (this.getValue = this.processKeys),
          (this.rd = PropertyFactory.getProp(t, e.r, 0, null, this)),
          (this._isAnimated = !!this.rd.effectsSequence.length);
      }),
      (RoundCornersModifier.prototype.processPath = function (t, e) {
        var i = shape_pool.newElement();
        i.c = t.c;
        var r,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          m,
          f,
          c,
          d,
          u,
          y = t._length,
          g = 0;
        for (r = 0; r < y; r += 1)
          (s = t.v[r]),
            (n = t.o[r]),
            (a = t.i[r]),
            s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1]
              ? (0 !== r && r !== y - 1) || t.c
                ? ((o = 0 === r ? t.v[y - 1] : t.v[r - 1]),
                  (l = (h = Math.sqrt(
                    Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2)
                  ))
                    ? Math.min(h / 2, e) / h
                    : 0),
                  (p = d = s[0] + (o[0] - s[0]) * l),
                  (m = u = s[1] - (s[1] - o[1]) * l),
                  (f = p - (p - s[0]) * roundCorner),
                  (c = m - (m - s[1]) * roundCorner),
                  i.setTripleAt(p, m, f, c, d, u, g),
                  (g += 1),
                  (o = r === y - 1 ? t.v[0] : t.v[r + 1]),
                  (l = (h = Math.sqrt(
                    Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2)
                  ))
                    ? Math.min(h / 2, e) / h
                    : 0),
                  (p = f = s[0] + (o[0] - s[0]) * l),
                  (m = c = s[1] + (o[1] - s[1]) * l),
                  (d = p - (p - s[0]) * roundCorner),
                  (u = m - (m - s[1]) * roundCorner),
                  i.setTripleAt(p, m, f, c, d, u, g))
                : i.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g)
              : i.setTripleAt(
                  t.v[r][0],
                  t.v[r][1],
                  t.o[r][0],
                  t.o[r][1],
                  t.i[r][0],
                  t.i[r][1],
                  g
                ),
            (g += 1);
        return i;
      }),
      (RoundCornersModifier.prototype.processShapes = function (t) {
        var e,
          i,
          r,
          s,
          a,
          n,
          o = this.shapes.length,
          h = this.rd.v;
        if (0 !== h)
          for (i = 0; i < o; i += 1) {
            if (
              ((a = this.shapes[i]).shape.paths,
              (n = a.localShapeCollection),
              a.shape._mdf || this._mdf || t)
            )
              for (
                n.releaseShapes(),
                  a.shape._mdf = !0,
                  e = a.shape.paths.shapes,
                  s = a.shape.paths._length,
                  r = 0;
                r < s;
                r += 1
              )
                n.addShape(this.processPath(e[r], h));
            a.shape.paths = a.localShapeCollection;
          }
        this.dynamicProperties.length || (this._mdf = !1);
      }),
      ShapeModifiers.registerModifier("rd", RoundCornersModifier),
      extendPrototype([ShapeModifier], RepeaterModifier),
      (RepeaterModifier.prototype.initModifierProperties = function (t, e) {
        (this.getValue = this.processKeys),
          (this.c = PropertyFactory.getProp(t, e.c, 0, null, this)),
          (this.o = PropertyFactory.getProp(t, e.o, 0, null, this)),
          (this.tr = TransformPropertyFactory.getTransformProperty(
            t,
            e.tr,
            this
          )),
          (this.so = PropertyFactory.getProp(t, e.tr.so, 0, 0.01, this)),
          (this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, 0.01, this)),
          (this.data = e),
          this.dynamicProperties.length || this.getValue(!0),
          (this._isAnimated = !!this.dynamicProperties.length),
          (this.pMatrix = new Matrix()),
          (this.rMatrix = new Matrix()),
          (this.sMatrix = new Matrix()),
          (this.tMatrix = new Matrix()),
          (this.matrix = new Matrix());
      }),
      (RepeaterModifier.prototype.applyTransforms = function (
        t,
        e,
        i,
        r,
        s,
        a
      ) {
        var n = a ? -1 : 1,
          o = r.s.v[0] + (1 - r.s.v[0]) * (1 - s),
          h = r.s.v[1] + (1 - r.s.v[1]) * (1 - s);
        t.translate(r.p.v[0] * n * s, r.p.v[1] * n * s, r.p.v[2]),
          e.translate(-r.a.v[0], -r.a.v[1], r.a.v[2]),
          e.rotate(-r.r.v * n * s),
          e.translate(r.a.v[0], r.a.v[1], r.a.v[2]),
          i.translate(-r.a.v[0], -r.a.v[1], r.a.v[2]),
          i.scale(a ? 1 / o : o, a ? 1 / h : h),
          i.translate(r.a.v[0], r.a.v[1], r.a.v[2]);
      }),
      (RepeaterModifier.prototype.init = function (t, e, i, r) {
        (this.elem = t),
          (this.arr = e),
          (this.pos = i),
          (this.elemsData = r),
          (this._currentCopies = 0),
          (this._elements = []),
          (this._groups = []),
          (this.frameId = -1),
          this.initDynamicPropertyContainer(t),
          this.initModifierProperties(t, e[i]);
        for (; 0 < i; ) (i -= 1), this._elements.unshift(e[i]), 1;
        this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
      }),
      (RepeaterModifier.prototype.resetElements = function (t) {
        var e,
          i = t.length;
        for (e = 0; e < i; e += 1)
          (t[e]._processed = !1),
            "gr" === t[e].ty && this.resetElements(t[e].it);
      }),
      (RepeaterModifier.prototype.cloneElements = function (t) {
        t.length;
        var e = JSON.parse(JSON.stringify(t));
        return this.resetElements(e), e;
      }),
      (RepeaterModifier.prototype.changeGroupRender = function (t, e) {
        var i,
          r = t.length;
        for (i = 0; i < r; i += 1)
          (t[i]._render = e),
            "gr" === t[i].ty && this.changeGroupRender(t[i].it, e);
      }),
      (RepeaterModifier.prototype.processShapes = function (t) {
        var e, i, r, s, a;
        if (this._mdf || t) {
          var n,
            o = Math.ceil(this.c.v);
          if (this._groups.length < o) {
            for (; this._groups.length < o; ) {
              var h = { it: this.cloneElements(this._elements), ty: "gr" };
              h.it.push({
                a: { a: 0, ix: 1, k: [0, 0] },
                nm: "Transform",
                o: { a: 0, ix: 7, k: 100 },
                p: { a: 0, ix: 2, k: [0, 0] },
                r: {
                  a: 1,
                  ix: 6,
                  k: [
                    { s: 0, e: 0, t: 0 },
                    { s: 0, e: 0, t: 1 }
                  ]
                },
                s: { a: 0, ix: 3, k: [100, 100] },
                sa: { a: 0, ix: 5, k: 0 },
                sk: { a: 0, ix: 4, k: 0 },
                ty: "tr"
              }),
                this.arr.splice(0, 0, h),
                this._groups.splice(0, 0, h),
                (this._currentCopies += 1);
            }
            this.elem.reloadShapes();
          }
          for (r = a = 0; r <= this._groups.length - 1; r += 1)
            (n = a < o),
              (this._groups[r]._render = n),
              this.changeGroupRender(this._groups[r].it, n),
              (a += 1);
          this._currentCopies = o;
          var l = this.o.v,
            p = l % 1,
            m = 0 < l ? Math.floor(l) : Math.ceil(l),
            f = (this.tr.v.props, this.pMatrix.props),
            c = this.rMatrix.props,
            d = this.sMatrix.props;
          this.pMatrix.reset(),
            this.rMatrix.reset(),
            this.sMatrix.reset(),
            this.tMatrix.reset(),
            this.matrix.reset();
          var u,
            y,
            g = 0;
          if (0 < l) {
            for (; g < m; )
              this.applyTransforms(
                this.pMatrix,
                this.rMatrix,
                this.sMatrix,
                this.tr,
                1,
                !1
              ),
                (g += 1);
            p &&
              (this.applyTransforms(
                this.pMatrix,
                this.rMatrix,
                this.sMatrix,
                this.tr,
                p,
                !1
              ),
              (g += p));
          } else if (l < 0) {
            for (; m < g; )
              this.applyTransforms(
                this.pMatrix,
                this.rMatrix,
                this.sMatrix,
                this.tr,
                1,
                !0
              ),
                (g -= 1);
            p &&
              (this.applyTransforms(
                this.pMatrix,
                this.rMatrix,
                this.sMatrix,
                this.tr,
                -p,
                !0
              ),
              (g -= p));
          }
          for (
            r = 1 === this.data.m ? 0 : this._currentCopies - 1,
              s = 1 === this.data.m ? 1 : -1,
              a = this._currentCopies;
            a;

          ) {
            if (
              ((y = (i = (e = this.elemsData[r].it)[e.length - 1].transform
                .mProps.v.props).length),
              (e[e.length - 1].transform.mProps._mdf = !0),
              (e[e.length - 1].transform.op._mdf = !0),
              (e[e.length - 1].transform.op.v =
                this.so.v +
                (this.eo.v - this.so.v) * (r / (this._currentCopies - 1))),
              0 !== g)
            ) {
              for (
                ((0 !== r && 1 === s) ||
                  (r !== this._currentCopies - 1 && -1 === s)) &&
                  this.applyTransforms(
                    this.pMatrix,
                    this.rMatrix,
                    this.sMatrix,
                    this.tr,
                    1,
                    !1
                  ),
                  this.matrix.transform(
                    c[0],
                    c[1],
                    c[2],
                    c[3],
                    c[4],
                    c[5],
                    c[6],
                    c[7],
                    c[8],
                    c[9],
                    c[10],
                    c[11],
                    c[12],
                    c[13],
                    c[14],
                    c[15]
                  ),
                  this.matrix.transform(
                    d[0],
                    d[1],
                    d[2],
                    d[3],
                    d[4],
                    d[5],
                    d[6],
                    d[7],
                    d[8],
                    d[9],
                    d[10],
                    d[11],
                    d[12],
                    d[13],
                    d[14],
                    d[15]
                  ),
                  this.matrix.transform(
                    f[0],
                    f[1],
                    f[2],
                    f[3],
                    f[4],
                    f[5],
                    f[6],
                    f[7],
                    f[8],
                    f[9],
                    f[10],
                    f[11],
                    f[12],
                    f[13],
                    f[14],
                    f[15]
                  ),
                  u = 0;
                u < y;
                u += 1
              )
                i[u] = this.matrix.props[u];
              this.matrix.reset();
            } else
              for (this.matrix.reset(), u = 0; u < y; u += 1)
                i[u] = this.matrix.props[u];
            (g += 1), (a -= 1), (r += s);
          }
        } else
          for (a = this._currentCopies, r = 0, s = 1; a; )
            (i = (e = this.elemsData[r].it)[e.length - 1].transform.mProps.v
              .props),
              (e[e.length - 1].transform.mProps._mdf = !1),
              (e[e.length - 1].transform.op._mdf = !1),
              (a -= 1),
              (r += s);
      }),
      (RepeaterModifier.prototype.addShape = function () {}),
      ShapeModifiers.registerModifier("rp", RepeaterModifier),
      (ShapeCollection.prototype.addShape = function (t) {
        this._length === this._maxLength &&
          ((this.shapes = this.shapes.concat(
            createSizedArray(this._maxLength)
          )),
          (this._maxLength *= 2)),
          (this.shapes[this._length] = t),
          (this._length += 1);
      }),
      (ShapeCollection.prototype.releaseShapes = function () {
        var t;
        for (t = 0; t < this._length; t += 1)
          shape_pool.release(this.shapes[t]);
        this._length = 0;
      }),
      (DashProperty.prototype.getValue = function (t) {
        if (
          (this.elem.globalData.frameId !== this.frameId || t) &&
          ((this.frameId = this.elem.globalData.frameId),
          this.iterateDynamicProperties(),
          (this._mdf = this._mdf || t),
          this._mdf)
        ) {
          var e = 0,
            i = this.dataProps.length;
          for (
            "svg" === this.renderer && (this.dashStr = ""), e = 0;
            e < i;
            e += 1
          )
            "o" != this.dataProps[e].n
              ? "svg" === this.renderer
                ? (this.dashStr += " " + this.dataProps[e].p.v)
                : (this.dashArray[e] = this.dataProps[e].p.v)
              : (this.dashoffset[0] = this.dataProps[e].p.v);
        }
      }),
      extendPrototype([DynamicPropertyContainer], DashProperty),
      (GradientProperty.prototype.comparePoints = function (t, e) {
        for (var i = 0, r = this.o.length / 2; i < r; ) {
          if (0.01 < Math.abs(t[4 * i] - t[4 * e + 2 * i])) return !1;
          i += 1;
        }
        return !0;
      }),
      (GradientProperty.prototype.checkCollapsable = function () {
        if (this.o.length / 2 != this.c.length / 4) return !1;
        if (this.data.k.k[0].s)
          for (var t = 0, e = this.data.k.k.length; t < e; ) {
            if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
            t += 1;
          }
        else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
        return !0;
      }),
      (GradientProperty.prototype.getValue = function (t) {
        if (
          (this.prop.getValue(),
          (this._mdf = !1),
          (this._cmdf = !1),
          (this._omdf = !1),
          this.prop._mdf || t)
        ) {
          var e,
            i,
            r,
            s = 4 * this.data.p;
          for (e = 0; e < s; e += 1)
            (i = e % 4 == 0 ? 100 : 255),
              (r = Math.round(this.prop.v[e] * i)),
              this.c[e] !== r && ((this.c[e] = r), (this._cmdf = !t));
          if (this.o.length)
            for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1)
              (i = e % 2 == 0 ? 100 : 1),
                (r =
                  e % 2 == 0
                    ? Math.round(100 * this.prop.v[e])
                    : this.prop.v[e]),
                this.o[e - 4 * this.data.p] !== r &&
                  ((this.o[e - 4 * this.data.p] = r), (this._omdf = !t));
          this._mdf = !t;
        }
      }),
      extendPrototype([DynamicPropertyContainer], GradientProperty);
    var buildShapeString = function (t, e, i, r) {
        if (0 === e) return "";
        var s,
          a = t.o,
          n = t.i,
          o = t.v,
          h = " M" + r.applyToPointStringified(o[0][0], o[0][1]);
        for (s = 1; s < e; s += 1)
          h +=
            " C" +
            r.applyToPointStringified(a[s - 1][0], a[s - 1][1]) +
            " " +
            r.applyToPointStringified(n[s][0], n[s][1]) +
            " " +
            r.applyToPointStringified(o[s][0], o[s][1]);
        return (
          i &&
            e &&
            ((h +=
              " C" +
              r.applyToPointStringified(a[s - 1][0], a[s - 1][1]) +
              " " +
              r.applyToPointStringified(n[0][0], n[0][1]) +
              " " +
              r.applyToPointStringified(o[0][0], o[0][1])),
            (h += "z")),
          h
        );
      },
      ImagePreloader = (function () {
        var s = (function () {
          var t = createTag("canvas");
          (t.width = 1), (t.height = 1);
          var e = t.getContext("2d");
          return (e.fillStyle = "rgba(0,0,0,0)"), e.fillRect(0, 0, 1, 1), t;
        })();
        function e() {
          (this.loadedAssets += 1),
            this.loadedAssets === this.totalImages &&
              this.imagesLoadedCb &&
              this.imagesLoadedCb(null);
        }
        function a(t, e, i) {
          var r = "";
          if (t.e) r = t.p;
          else if (e) {
            var s = t.p;
            -1 !== s.indexOf("images/") && (s = s.split("/")[1]), (r = e + s);
          } else (r = i), (r += t.u ? t.u : ""), (r += t.p);
          return r;
        }
        function t(t) {
          (this._imageLoaded = e.bind(this)),
            (this.assetsPath = ""),
            (this.path = ""),
            (this.totalImages = 0),
            (this.loadedAssets = 0),
            (this.imagesLoadedCb = null),
            (this.images = []);
        }
        return (
          (t.prototype = {
            loadAssets: function (t, e) {
              this.imagesLoadedCb = e;
              var i,
                r = t.length;
              for (i = 0; i < r; i += 1)
                t[i].layers ||
                  ((this.totalImages += 1),
                  this.images.push(this._createImageData(t[i])));
            },
            setAssetsPath: function (t) {
              this.assetsPath = t || "";
            },
            setPath: function (t) {
              this.path = t || "";
            },
            loaded: function () {
              return this.totalImages === this.loadedAssets;
            },
            destroy: function () {
              (this.imagesLoadedCb = null), (this.images.length = 0);
            },
            getImage: function (t) {
              for (var e = 0, i = this.images.length; e < i; ) {
                if (this.images[e].assetData === t) return this.images[e].img;
                e += 1;
              }
            },
            createImgData: function (t) {
              var e = a(t, this.assetsPath, this.path),
                i = createTag("img");
              (i.crossOrigin = "anonymous"),
                i.addEventListener("load", this._imageLoaded, !1),
                i.addEventListener(
                  "error",
                  function () {
                    (r.img = s), this._imageLoaded();
                  }.bind(this),
                  !1
                ),
                (i.src = e);
              var r = { img: i, assetData: t };
              return r;
            },
            createImageData: function (t) {
              var e = a(t, this.assetsPath, this.path),
                i = createNS("image");
              i.addEventListener("load", this._imageLoaded, !1),
                i.addEventListener(
                  "error",
                  function () {
                    (r.img = s), this._imageLoaded();
                  }.bind(this),
                  !1
                ),
                i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e);
              var r = { img: i, assetData: t };
              return r;
            },
            imageLoaded: e,
            setCacheType: function (t) {
              this._createImageData =
                "svg" === t
                  ? this.createImageData.bind(this)
                  : this.createImgData.bind(this);
            }
          }),
          t
        );
      })(),
      featureSupport =
        ((Hw = { maskType: !0 }),
        (/MSIE 10/i.test(navigator.userAgent) ||
          /MSIE 9/i.test(navigator.userAgent) ||
          /rv:11.0/i.test(navigator.userAgent) ||
          /Edge\/\d./i.test(navigator.userAgent)) &&
          (Hw.maskType = !1),
        Hw),
      Hw,
      filtersFactory =
        ((Iw = {}),
        (Iw.createFilter = function (t) {
          var e = createNS("filter");
          return (
            e.setAttribute("id", t),
            e.setAttribute("filterUnits", "objectBoundingBox"),
            e.setAttribute("x", "0%"),
            e.setAttribute("y", "0%"),
            e.setAttribute("width", "100%"),
            e.setAttribute("height", "100%"),
            e
          );
        }),
        (Iw.createAlphaToLuminanceFilter = function () {
          var t = createNS("feColorMatrix");
          return (
            t.setAttribute("type", "matrix"),
            t.setAttribute("color-interpolation-filters", "sRGB"),
            t.setAttribute(
              "values",
              "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"
            ),
            t
          );
        }),
        Iw),
      Iw,
      assetLoader = (function () {
        function a(t) {
          return t.response && "object" == typeof t.response
            ? t.response
            : t.response && "string" == typeof t.response
            ? JSON.parse(t.response)
            : t.responseText
            ? JSON.parse(t.responseText)
            : void 0;
        }
        return {
          load: function (t, e, i) {
            var r,
              s = new XMLHttpRequest();
            s.open("GET", t, !0);
            try {
              s.responseType = "json";
            } catch (t) {}
            s.send(),
              (s.onreadystatechange = function () {
                if (4 == s.readyState)
                  if (200 == s.status) (r = a(s)), e(r);
                  else
                    try {
                      (r = a(s)), e(r);
                    } catch (t) {
                      i && i(t);
                    }
              });
          }
        };
      })();
    function TextAnimatorProperty(t, e, i) {
      (this._isFirstFrame = !0),
        (this._hasMaskedPath = !1),
        (this._frameId = -1),
        (this._textData = t),
        (this._renderType = e),
        (this._elem = i),
        (this._animatorsData = createSizedArray(this._textData.a.length)),
        (this._pathData = {}),
        (this._moreOptions = { alignment: {} }),
        (this.renderedLetters = []),
        (this.lettersChangedFlag = !1),
        this.initDynamicPropertyContainer(i);
    }
    function TextAnimatorDataProperty(t, e, i) {
      var r = { propType: !1 },
        s = PropertyFactory.getProp,
        a = e.a;
      (this.a = {
        r: a.r ? s(t, a.r, 0, degToRads, i) : r,
        rx: a.rx ? s(t, a.rx, 0, degToRads, i) : r,
        ry: a.ry ? s(t, a.ry, 0, degToRads, i) : r,
        sk: a.sk ? s(t, a.sk, 0, degToRads, i) : r,
        sa: a.sa ? s(t, a.sa, 0, degToRads, i) : r,
        s: a.s ? s(t, a.s, 1, 0.01, i) : r,
        a: a.a ? s(t, a.a, 1, 0, i) : r,
        o: a.o ? s(t, a.o, 0, 0.01, i) : r,
        p: a.p ? s(t, a.p, 1, 0, i) : r,
        sw: a.sw ? s(t, a.sw, 0, 0, i) : r,
        sc: a.sc ? s(t, a.sc, 1, 0, i) : r,
        fc: a.fc ? s(t, a.fc, 1, 0, i) : r,
        fh: a.fh ? s(t, a.fh, 0, 0, i) : r,
        fs: a.fs ? s(t, a.fs, 0, 0.01, i) : r,
        fb: a.fb ? s(t, a.fb, 0, 0.01, i) : r,
        t: a.t ? s(t, a.t, 0, 0, i) : r
      }),
        (this.s = TextSelectorProp.getTextSelectorProp(t, e.s, i)),
        (this.s.t = e.s.t);
    }
    function LetterProps(t, e, i, r, s, a) {
      (this.o = t),
        (this.sw = e),
        (this.sc = i),
        (this.fc = r),
        (this.m = s),
        (this.p = a),
        (this._mdf = { o: !0, sw: !!e, sc: !!i, fc: !!r, m: !0, p: !0 });
    }
    function TextProperty(t, e) {
      (this._frameId = initialDefaultFrame),
        (this.pv = ""),
        (this.v = ""),
        (this.kf = !1),
        (this._isFirstFrame = !0),
        (this._mdf = !1),
        (this.data = e),
        (this.elem = t),
        (this.comp = this.elem.comp),
        (this.keysIndex = 0),
        (this.canResize = !1),
        (this.minimumFontSize = 1),
        (this.effectsSequence = []),
        (this.currentData = {
          ascent: 0,
          boxWidth: this.defaultBoxWidth,
          f: "",
          fStyle: "",
          fWeight: "",
          fc: "",
          j: "",
          justifyOffset: "",
          l: [],
          lh: 0,
          lineWidths: [],
          ls: "",
          of: "",
          s: "",
          sc: "",
          sw: 0,
          t: 0,
          tr: 0,
          sz: 0,
          ps: null,
          fillColorAnim: !1,
          strokeColorAnim: !1,
          strokeWidthAnim: !1,
          yOffset: 0,
          finalSize: 0,
          finalText: [],
          finalLineHeight: 0,
          __complete: !1
        }),
        this.copyData(this.currentData, this.data.d.k[0].s),
        this.searchProperty() || this.completeTextData(this.currentData);
    }
    (TextAnimatorProperty.prototype.searchProperties = function () {
      var t,
        e,
        i = this._textData.a.length,
        r = PropertyFactory.getProp;
      for (t = 0; t < i; t += 1)
        (e = this._textData.a[t]),
          (this._animatorsData[t] = new TextAnimatorDataProperty(
            this._elem,
            e,
            this
          ));
      this._textData.p && "m" in this._textData.p
        ? ((this._pathData = {
            f: r(this._elem, this._textData.p.f, 0, 0, this),
            l: r(this._elem, this._textData.p.l, 0, 0, this),
            r: this._textData.p.r,
            m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
          }),
          (this._hasMaskedPath = !0))
        : (this._hasMaskedPath = !1),
        (this._moreOptions.alignment = r(
          this._elem,
          this._textData.m.a,
          1,
          0,
          this
        ));
    }),
      (TextAnimatorProperty.prototype.getMeasures = function (t, e) {
        if (
          ((this.lettersChangedFlag = e),
          this._mdf ||
            this._isFirstFrame ||
            e ||
            (this._hasMaskedPath && this._pathData.m._mdf))
        ) {
          this._isFirstFrame = !1;
          var i,
            r,
            s,
            a,
            n,
            o,
            h,
            l,
            p,
            m,
            f,
            c,
            d,
            u,
            y,
            g,
            v,
            b,
            E,
            x = this._moreOptions.alignment.v,
            S = this._animatorsData,
            P = this._textData,
            _ = this.mHelper,
            C = this._renderType,
            A = this.renderedLetters.length,
            T = (this.data, t.l);
          if (this._hasMaskedPath) {
            if (
              ((E = this._pathData.m), !this._pathData.n || this._pathData._mdf)
            ) {
              var k,
                M = E.v;
              for (
                this._pathData.r && (M = M.reverse()),
                  n = { tLength: 0, segments: [] },
                  a = M._length - 1,
                  s = g = 0;
                s < a;
                s += 1
              )
                (k = bez.buildBezierData(
                  M.v[s],
                  M.v[s + 1],
                  [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]],
                  [M.i[s + 1][0] - M.v[s + 1][0], M.i[s + 1][1] - M.v[s + 1][1]]
                )),
                  (n.tLength += k.segmentLength),
                  n.segments.push(k),
                  (g += k.segmentLength);
              (s = a),
                E.v.c &&
                  ((k = bez.buildBezierData(
                    M.v[s],
                    M.v[0],
                    [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]],
                    [M.i[0][0] - M.v[0][0], M.i[0][1] - M.v[0][1]]
                  )),
                  (n.tLength += k.segmentLength),
                  n.segments.push(k),
                  (g += k.segmentLength)),
                (this._pathData.pi = n);
            }
            if (
              ((n = this._pathData.pi),
              (o = this._pathData.f.v),
              (m = 1),
              (p = !(l = f = 0)),
              (u = n.segments),
              o < 0 && E.v.c)
            )
              for (
                n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength),
                  m = (d = u[(f = u.length - 1)].points).length - 1;
                o < 0;

              )
                (o += d[m].partialLength),
                  (m -= 1) < 0 && (m = (d = u[(f -= 1)].points).length - 1);
            (c = (d = u[f].points)[m - 1]), (y = (h = d[m]).partialLength);
          }
          (a = T.length), (r = i = 0);
          var D,
            w,
            F,
            I,
            V = 1.2 * t.finalSize * 0.714,
            B = !0;
          F = S.length;
          var R,
            L,
            G,
            z,
            N,
            O,
            H,
            j,
            q,
            W,
            Y,
            X,
            $,
            K = -1,
            Z = o,
            J = f,
            U = m,
            Q = -1,
            tt = "",
            et = this.defaultPropsArray;
          if (2 === t.j || 1 === t.j) {
            var it = 0,
              rt = 0,
              st = 2 === t.j ? -0.5 : -1,
              at = 0,
              nt = !0;
            for (s = 0; s < a; s += 1)
              if (T[s].n) {
                for (it && (it += rt); at < s; )
                  (T[at].animatorJustifyOffset = it), (at += 1);
                nt = !(it = 0);
              } else {
                for (w = 0; w < F; w += 1)
                  (D = S[w].a).t.propType &&
                    (nt && 2 === t.j && (rt += D.t.v * st),
                    (R = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars))
                      .length
                      ? (it += D.t.v * R[0] * st)
                      : (it += D.t.v * R * st));
                nt = !1;
              }
            for (it && (it += rt); at < s; )
              (T[at].animatorJustifyOffset = it), (at += 1);
          }
          for (s = 0; s < a; s += 1) {
            if ((_.reset(), (N = 1), T[s].n))
              (i = 0),
                (r += t.yOffset),
                (r += B ? 1 : 0),
                (o = Z),
                (B = !1),
                0,
                this._hasMaskedPath &&
                  ((m = U),
                  (c = (d = u[(f = J)].points)[m - 1]),
                  (y = (h = d[m]).partialLength),
                  (l = 0)),
                ($ = W = X = tt = ""),
                (et = this.defaultPropsArray);
            else {
              if (this._hasMaskedPath) {
                if (Q !== T[s].line) {
                  switch (t.j) {
                    case 1:
                      o += g - t.lineWidths[T[s].line];
                      break;
                    case 2:
                      o += (g - t.lineWidths[T[s].line]) / 2;
                  }
                  Q = T[s].line;
                }
                K !== T[s].ind &&
                  (T[K] && (o += T[K].extra),
                  (o += T[s].an / 2),
                  (K = T[s].ind)),
                  (o += (x[0] * T[s].an) / 200);
                var ot = 0;
                for (w = 0; w < F; w += 1)
                  (D = S[w].a).p.propType &&
                    ((R = S[w].s.getMult(
                      T[s].anIndexes[w],
                      P.a[w].s.totalChars
                    )).length
                      ? (ot += D.p.v[0] * R[0])
                      : (ot += D.p.v[0] * R)),
                    D.a.propType &&
                      ((R = S[w].s.getMult(
                        T[s].anIndexes[w],
                        P.a[w].s.totalChars
                      )).length
                        ? (ot += D.a.v[0] * R[0])
                        : (ot += D.a.v[0] * R));
                for (p = !0; p; )
                  o + ot <= l + y || !d
                    ? ((v = (o + ot - l) / h.partialLength),
                      (G = c.point[0] + (h.point[0] - c.point[0]) * v),
                      (z = c.point[1] + (h.point[1] - c.point[1]) * v),
                      _.translate((-x[0] * T[s].an) / 200, (-x[1] * V) / 100),
                      (p = !1))
                    : d &&
                      ((l += h.partialLength),
                      (m += 1) >= d.length &&
                        ((m = 0),
                        (d = u[(f += 1)]
                          ? u[f].points
                          : E.v.c
                          ? u[(f = m = 0)].points
                          : ((l -= h.partialLength), null))),
                      d && ((c = h), (y = (h = d[m]).partialLength)));
                (L = T[s].an / 2 - T[s].add), _.translate(-L, 0, 0);
              } else
                (L = T[s].an / 2 - T[s].add),
                  _.translate(-L, 0, 0),
                  _.translate((-x[0] * T[s].an) / 200, (-x[1] * V) / 100, 0);
              for (T[s].l / 2, w = 0; w < F; w += 1)
                (D = S[w].a).t.propType &&
                  ((R = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)),
                  (0 === i && 0 === t.j) ||
                    (this._hasMaskedPath
                      ? R.length
                        ? (o += D.t.v * R[0])
                        : (o += D.t.v * R)
                      : R.length
                      ? (i += D.t.v * R[0])
                      : (i += D.t.v * R)));
              for (
                T[s].l / 2,
                  t.strokeWidthAnim && (H = t.sw || 0),
                  t.strokeColorAnim &&
                    (O = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]),
                  t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]),
                  w = 0;
                w < F;
                w += 1
              )
                (D = S[w].a).a.propType &&
                  ((R = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars))
                    .length
                    ? _.translate(
                        -D.a.v[0] * R[0],
                        -D.a.v[1] * R[1],
                        D.a.v[2] * R[2]
                      )
                    : _.translate(-D.a.v[0] * R, -D.a.v[1] * R, D.a.v[2] * R));
              for (w = 0; w < F; w += 1)
                (D = S[w].a).s.propType &&
                  ((R = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars))
                    .length
                    ? _.scale(
                        1 + (D.s.v[0] - 1) * R[0],
                        1 + (D.s.v[1] - 1) * R[1],
                        1
                      )
                    : _.scale(
                        1 + (D.s.v[0] - 1) * R,
                        1 + (D.s.v[1] - 1) * R,
                        1
                      ));
              for (w = 0; w < F; w += 1) {
                if (
                  ((D = S[w].a),
                  (R = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)),
                  D.sk.propType &&
                    (R.length
                      ? _.skewFromAxis(-D.sk.v * R[0], D.sa.v * R[1])
                      : _.skewFromAxis(-D.sk.v * R, D.sa.v * R)),
                  D.r.propType &&
                    (R.length
                      ? _.rotateZ(-D.r.v * R[2])
                      : _.rotateZ(-D.r.v * R)),
                  D.ry.propType &&
                    (R.length
                      ? _.rotateY(D.ry.v * R[1])
                      : _.rotateY(D.ry.v * R)),
                  D.rx.propType &&
                    (R.length
                      ? _.rotateX(D.rx.v * R[0])
                      : _.rotateX(D.rx.v * R)),
                  D.o.propType &&
                    (R.length
                      ? (N += (D.o.v * R[0] - N) * R[0])
                      : (N += (D.o.v * R - N) * R)),
                  t.strokeWidthAnim &&
                    D.sw.propType &&
                    (R.length ? (H += D.sw.v * R[0]) : (H += D.sw.v * R)),
                  t.strokeColorAnim && D.sc.propType)
                )
                  for (q = 0; q < 3; q += 1)
                    R.length
                      ? (O[q] = O[q] + (D.sc.v[q] - O[q]) * R[0])
                      : (O[q] = O[q] + (D.sc.v[q] - O[q]) * R);
                if (t.fillColorAnim && t.fc) {
                  if (D.fc.propType)
                    for (q = 0; q < 3; q += 1)
                      R.length
                        ? (j[q] = j[q] + (D.fc.v[q] - j[q]) * R[0])
                        : (j[q] = j[q] + (D.fc.v[q] - j[q]) * R);
                  D.fh.propType &&
                    (j = R.length
                      ? addHueToRGB(j, D.fh.v * R[0])
                      : addHueToRGB(j, D.fh.v * R)),
                    D.fs.propType &&
                      (j = R.length
                        ? addSaturationToRGB(j, D.fs.v * R[0])
                        : addSaturationToRGB(j, D.fs.v * R)),
                    D.fb.propType &&
                      (j = R.length
                        ? addBrightnessToRGB(j, D.fb.v * R[0])
                        : addBrightnessToRGB(j, D.fb.v * R));
                }
              }
              for (w = 0; w < F; w += 1)
                (D = S[w].a).p.propType &&
                  ((R = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)),
                  this._hasMaskedPath
                    ? R.length
                      ? _.translate(0, D.p.v[1] * R[0], -D.p.v[2] * R[1])
                      : _.translate(0, D.p.v[1] * R, -D.p.v[2] * R)
                    : R.length
                    ? _.translate(
                        D.p.v[0] * R[0],
                        D.p.v[1] * R[1],
                        -D.p.v[2] * R[2]
                      )
                    : _.translate(D.p.v[0] * R, D.p.v[1] * R, -D.p.v[2] * R));
              if (
                (t.strokeWidthAnim && (W = H < 0 ? 0 : H),
                t.strokeColorAnim &&
                  (Y =
                    "rgb(" +
                    Math.round(255 * O[0]) +
                    "," +
                    Math.round(255 * O[1]) +
                    "," +
                    Math.round(255 * O[2]) +
                    ")"),
                t.fillColorAnim &&
                  t.fc &&
                  (X =
                    "rgb(" +
                    Math.round(255 * j[0]) +
                    "," +
                    Math.round(255 * j[1]) +
                    "," +
                    Math.round(255 * j[2]) +
                    ")"),
                this._hasMaskedPath)
              ) {
                if (
                  (_.translate(0, -t.ls),
                  _.translate(0, (x[1] * V) / 100 + r, 0),
                  P.p.p)
                ) {
                  b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
                  var ht = (180 * Math.atan(b)) / Math.PI;
                  h.point[0] < c.point[0] && (ht += 180),
                    _.rotate((-ht * Math.PI) / 180);
                }
                _.translate(G, z, 0),
                  (o -= (x[0] * T[s].an) / 200),
                  T[s + 1] &&
                    K !== T[s + 1].ind &&
                    ((o += T[s].an / 2), (o += (t.tr / 1e3) * t.finalSize));
              } else {
                switch (
                  (_.translate(i, r, 0),
                  t.ps && _.translate(t.ps[0], t.ps[1] + t.ascent, 0),
                  t.j)
                ) {
                  case 1:
                    _.translate(
                      T[s].animatorJustifyOffset +
                        t.justifyOffset +
                        (t.boxWidth - t.lineWidths[T[s].line]),
                      0,
                      0
                    );
                    break;
                  case 2:
                    _.translate(
                      T[s].animatorJustifyOffset +
                        t.justifyOffset +
                        (t.boxWidth - t.lineWidths[T[s].line]) / 2,
                      0,
                      0
                    );
                }
                _.translate(0, -t.ls),
                  _.translate(L, 0, 0),
                  _.translate((x[0] * T[s].an) / 200, (x[1] * V) / 100, 0),
                  (i += T[s].l + (t.tr / 1e3) * t.finalSize);
              }
              "html" === C
                ? (tt = _.toCSS())
                : "svg" === C
                ? (tt = _.to2dCSS())
                : (et = [
                    _.props[0],
                    _.props[1],
                    _.props[2],
                    _.props[3],
                    _.props[4],
                    _.props[5],
                    _.props[6],
                    _.props[7],
                    _.props[8],
                    _.props[9],
                    _.props[10],
                    _.props[11],
                    _.props[12],
                    _.props[13],
                    _.props[14],
                    _.props[15]
                  ]),
                ($ = N);
            }
            this.lettersChangedFlag =
              A <= s
                ? ((I = new LetterProps($, W, Y, X, tt, et)),
                  this.renderedLetters.push(I),
                  (A += 1),
                  !0)
                : (I = this.renderedLetters[s]).update($, W, Y, X, tt, et) ||
                  this.lettersChangedFlag;
          }
        }
      }),
      (TextAnimatorProperty.prototype.getValue = function () {
        this._elem.globalData.frameId !== this._frameId &&
          ((this._frameId = this._elem.globalData.frameId),
          this.iterateDynamicProperties());
      }),
      (TextAnimatorProperty.prototype.mHelper = new Matrix()),
      (TextAnimatorProperty.prototype.defaultPropsArray = []),
      extendPrototype([DynamicPropertyContainer], TextAnimatorProperty),
      (LetterProps.prototype.update = function (t, e, i, r, s, a) {
        (this._mdf.o = !1),
          (this._mdf.sw = !1),
          (this._mdf.sc = !1),
          (this._mdf.fc = !1),
          (this._mdf.m = !1);
        var n = (this._mdf.p = !1);
        return (
          this.o !== t && ((this.o = t), (n = this._mdf.o = !0)),
          this.sw !== e && ((this.sw = e), (n = this._mdf.sw = !0)),
          this.sc !== i && ((this.sc = i), (n = this._mdf.sc = !0)),
          this.fc !== r && ((this.fc = r), (n = this._mdf.fc = !0)),
          this.m !== s && ((this.m = s), (n = this._mdf.m = !0)),
          !a.length ||
            (this.p[0] === a[0] &&
              this.p[1] === a[1] &&
              this.p[4] === a[4] &&
              this.p[5] === a[5] &&
              this.p[12] === a[12] &&
              this.p[13] === a[13]) ||
            ((this.p = a), (n = this._mdf.p = !0)),
          n
        );
      }),
      (TextProperty.prototype.defaultBoxWidth = [0, 0]),
      (TextProperty.prototype.copyData = function (t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t;
      }),
      (TextProperty.prototype.setCurrentData = function (t) {
        t.__complete || this.completeTextData(t),
          (this.currentData = t),
          (this.currentData.boxWidth =
            this.currentData.boxWidth || this.defaultBoxWidth),
          (this._mdf = !0);
      }),
      (TextProperty.prototype.searchProperty = function () {
        return this.searchKeyframes();
      }),
      (TextProperty.prototype.searchKeyframes = function () {
        return (
          (this.kf = 1 < this.data.d.k.length),
          this.kf && this.addEffect(this.getKeyframeValue.bind(this)),
          this.kf
        );
      }),
      (TextProperty.prototype.addEffect = function (t) {
        this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.getValue = function (t) {
        if (
          (this.elem.globalData.frameId !== this.frameId &&
            this.effectsSequence.length) ||
          t
        ) {
          this.currentData.t = this.data.d.k[this.keysIndex].s.t;
          var e = this.currentData,
            i = this.keysIndex;
          if (this.lock) this.setCurrentData(this.currentData);
          else {
            (this.lock = !0), (this._mdf = !1);
            var r,
              s = this.effectsSequence.length,
              a = t || this.data.d.k[this.keysIndex].s;
            for (r = 0; r < s; r += 1)
              a =
                i !== this.keysIndex
                  ? this.effectsSequence[r](a, a.t)
                  : this.effectsSequence[r](this.currentData, a.t);
            e !== a && this.setCurrentData(a),
              (this.pv = this.v = this.currentData),
              (this.lock = !1),
              (this.frameId = this.elem.globalData.frameId);
          }
        }
      }),
      (TextProperty.prototype.getKeyframeValue = function () {
        for (
          var t = this.data.d.k,
            e = this.elem.comp.renderedFrame,
            i = 0,
            r = t.length;
          i <= r - 1 && (t[i].s, !(i === r - 1 || t[i + 1].t > e));

        )
          i += 1;
        return (
          this.keysIndex !== i && (this.keysIndex = i),
          this.data.d.k[this.keysIndex].s
        );
      }),
      (TextProperty.prototype.buildFinalText = function (t) {
        for (
          var e,
            i = FontManager.getCombinedCharacterCodes(),
            r = [],
            s = 0,
            a = t.length;
          s < a;

        )
          (e = t.charCodeAt(s)),
            -1 !== i.indexOf(e)
              ? (r[r.length - 1] += t.charAt(s))
              : 55296 <= e &&
                e <= 56319 &&
                56320 <= (e = t.charCodeAt(s + 1)) &&
                e <= 57343
              ? (r.push(t.substr(s, 2)), ++s)
              : r.push(t.charAt(s)),
            (s += 1);
        return r;
      }),
      (TextProperty.prototype.completeTextData = function (t) {
        t.__complete = !0;
        var e,
          i,
          r,
          s,
          a,
          n,
          o,
          h = this.elem.globalData.fontManager,
          l = this.data,
          p = [],
          m = 0,
          f = l.m.g,
          c = 0,
          d = 0,
          u = 0,
          y = [],
          g = 0,
          v = 0,
          b = h.getFontByName(t.f),
          E = 0,
          x = b.fStyle ? b.fStyle.split(" ") : [],
          S = "normal",
          P = "normal";
        for (i = x.length, e = 0; e < i; e += 1)
          switch (x[e].toLowerCase()) {
            case "italic":
              P = "italic";
              break;
            case "bold":
              S = "700";
              break;
            case "black":
              S = "900";
              break;
            case "medium":
              S = "500";
              break;
            case "regular":
            case "normal":
              S = "400";
              break;
            case "light":
            case "thin":
              S = "200";
          }
        (t.fWeight = b.fWeight || S),
          (t.fStyle = P),
          (t.finalSize = t.s),
          (t.finalText = this.buildFinalText(t.t)),
          (i = t.finalText.length),
          (t.finalLineHeight = t.lh);
        var _,
          C = (t.tr / 1e3) * t.finalSize;
        if (t.sz)
          for (var A, T, k = !0, M = t.sz[0], D = t.sz[1]; k; ) {
            (g = A = 0),
              (i = (T = this.buildFinalText(t.t)).length),
              (C = (t.tr / 1e3) * t.finalSize);
            var w = -1;
            for (e = 0; e < i; e += 1)
              (_ = T[e].charCodeAt(0)),
                (r = !1),
                " " === T[e]
                  ? (w = e)
                  : (13 !== _ && 3 !== _) ||
                    ((r = !(g = 0)),
                    (A += t.finalLineHeight || 1.2 * t.finalSize)),
                M <
                  g +
                    (E = h.chars
                      ? ((o = h.getCharData(T[e], b.fStyle, b.fFamily)),
                        r ? 0 : (o.w * t.finalSize) / 100)
                      : h.measureText(T[e], t.f, t.finalSize)) && " " !== T[e]
                  ? (-1 === w ? (i += 1) : (e = w),
                    (A += t.finalLineHeight || 1.2 * t.finalSize),
                    T.splice(e, w === e ? 1 : 0, "\r"),
                    (w = -1),
                    (g = 0))
                  : ((g += E), (g += C));
            (A += (b.ascent * t.finalSize) / 100),
              this.canResize && t.finalSize > this.minimumFontSize && D < A
                ? ((t.finalSize -= 1),
                  (t.finalLineHeight = (t.finalSize * t.lh) / t.s))
                : ((t.finalText = T), (i = t.finalText.length), (k = !1));
          }
        g = -C;
        var F,
          I = (E = 0);
        for (e = 0; e < i; e += 1)
          if (
            ((r = !1),
            13 === (_ = (F = t.finalText[e]).charCodeAt(0)) || 3 === _
              ? ((I = 0),
                y.push(g),
                (v = v < g ? g : v),
                (g = -2 * C),
                (r = !(s = "")),
                (u += 1))
              : (s = F),
            (E = h.chars
              ? ((o = h.getCharData(F, b.fStyle, h.getFontByName(t.f).fFamily)),
                r ? 0 : (o.w * t.finalSize) / 100)
              : h.measureText(s, t.f, t.finalSize)),
            " " === F ? (I += E + C) : ((g += E + C + I), (I = 0)),
            p.push({
              l: E,
              an: E,
              add: c,
              n: r,
              anIndexes: [],
              val: s,
              line: u,
              animatorJustifyOffset: 0
            }),
            2 == f)
          ) {
            if (((c += E), "" === s || " " === s || e === i - 1)) {
              for (("" !== s && " " !== s) || (c -= E); d <= e; )
                (p[d].an = c), (p[d].ind = m), (p[d].extra = E), (d += 1);
              (m += 1), (c = 0);
            }
          } else if (3 == f) {
            if (((c += E), "" === s || e === i - 1)) {
              for ("" === s && (c -= E); d <= e; )
                (p[d].an = c), (p[d].ind = m), (p[d].extra = E), (d += 1);
              (c = 0), (m += 1);
            }
          } else (p[m].ind = m), (p[m].extra = 0), (m += 1);
        if (((t.l = p), (v = v < g ? g : v), y.push(g), t.sz))
          (t.boxWidth = t.sz[0]), (t.justifyOffset = 0);
        else
          switch (((t.boxWidth = v), t.j)) {
            case 1:
              t.justifyOffset = -t.boxWidth;
              break;
            case 2:
              t.justifyOffset = -t.boxWidth / 2;
              break;
            default:
              t.justifyOffset = 0;
          }
        t.lineWidths = y;
        var V,
          B,
          R = l.a;
        n = R.length;
        var L,
          G,
          z = [];
        for (a = 0; a < n; a += 1) {
          for (
            (V = R[a]).a.sc && (t.strokeColorAnim = !0),
              V.a.sw && (t.strokeWidthAnim = !0),
              (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0),
              G = 0,
              L = V.s.b,
              e = 0;
            e < i;
            e += 1
          )
            ((B = p[e]).anIndexes[a] = G),
              ((1 == L && "" !== B.val) ||
                (2 == L && "" !== B.val && " " !== B.val) ||
                (3 == L && (B.n || " " == B.val || e == i - 1)) ||
                (4 == L && (B.n || e == i - 1))) &&
                (1 === V.s.rn && z.push(G), (G += 1));
          l.a[a].s.totalChars = G;
          var N,
            O = -1;
          if (1 === V.s.rn)
            for (e = 0; e < i; e += 1)
              O != (B = p[e]).anIndexes[a] &&
                ((O = B.anIndexes[a]),
                (N = z.splice(Math.floor(Math.random() * z.length), 1)[0])),
                (B.anIndexes[a] = N);
        }
        (t.yOffset = t.finalLineHeight || 1.2 * t.finalSize),
          (t.ls = t.ls || 0),
          (t.ascent = (b.ascent * t.finalSize) / 100);
      }),
      (TextProperty.prototype.updateDocumentData = function (t, e) {
        e = void 0 === e ? this.keysIndex : e;
        var i = this.copyData({}, this.data.d.k[e].s);
        (i = this.copyData(i, t)),
          (this.data.d.k[e].s = i),
          this.recalculate(e),
          this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.recalculate = function (t) {
        var e = this.data.d.k[t].s;
        (e.__complete = !1),
          (this.keysIndex = 0),
          (this._isFirstFrame = !0),
          this.getValue(e);
      }),
      (TextProperty.prototype.canResizeFont = function (t) {
        (this.canResize = t),
          this.recalculate(this.keysIndex),
          this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.setMinimumFontSize = function (t) {
        (this.minimumFontSize = Math.floor(t) || 1),
          this.recalculate(this.keysIndex),
          this.elem.addDynamicProperty(this);
      });
    var TextSelectorProp = (function () {
        var c = Math.max,
          d = Math.min,
          u = Math.floor;
        function r(t, e) {
          (this._currentTextLength = -1),
            (this.k = !1),
            (this.data = e),
            (this.elem = t),
            (this.comp = t.comp),
            (this.finalS = 0),
            (this.finalE = 0),
            this.initDynamicPropertyContainer(t),
            (this.s = PropertyFactory.getProp(t, e.s || { k: 0 }, 0, 0, this)),
            (this.e =
              "e" in e
                ? PropertyFactory.getProp(t, e.e, 0, 0, this)
                : { v: 100 }),
            (this.o = PropertyFactory.getProp(t, e.o || { k: 0 }, 0, 0, this)),
            (this.xe = PropertyFactory.getProp(
              t,
              e.xe || { k: 0 },
              0,
              0,
              this
            )),
            (this.ne = PropertyFactory.getProp(
              t,
              e.ne || { k: 0 },
              0,
              0,
              this
            )),
            (this.a = PropertyFactory.getProp(t, e.a, 0, 0.01, this)),
            this.dynamicProperties.length || this.getValue();
        }
        return (
          (r.prototype = {
            getMult: function (t) {
              this._currentTextLength !==
                this.elem.textProperty.currentData.l.length && this.getValue();
              var e = 0,
                i = 0,
                r = 1,
                s = 1;
              0 < this.ne.v ? (e = this.ne.v / 100) : (i = -this.ne.v / 100),
                0 < this.xe.v
                  ? (r = 1 - this.xe.v / 100)
                  : (s = 1 + this.xe.v / 100);
              var a = BezierFactory.getBezierEasing(e, i, r, s).get,
                n = 0,
                o = this.finalS,
                h = this.finalE,
                l = this.data.sh;
              if (2 === l)
                n = a(
                  (n =
                    h === o
                      ? h <= t
                        ? 1
                        : 0
                      : c(0, d(0.5 / (h - o) + (t - o) / (h - o), 1)))
                );
              else if (3 === l)
                n = a(
                  (n =
                    h === o
                      ? h <= t
                        ? 0
                        : 1
                      : 1 - c(0, d(0.5 / (h - o) + (t - o) / (h - o), 1)))
                );
              else if (4 === l)
                h === o
                  ? (n = 0)
                  : (n = c(0, d(0.5 / (h - o) + (t - o) / (h - o), 1))) < 0.5
                  ? (n *= 2)
                  : (n = 1 - 2 * (n - 0.5)),
                  (n = a(n));
              else if (5 === l) {
                if (h === o) n = 0;
                else {
                  var p = h - o,
                    m = -p / 2 + (t = d(c(0, t + 0.5 - o), h - o)),
                    f = p / 2;
                  n = Math.sqrt(1 - (m * m) / (f * f));
                }
                n = a(n);
              } else
                n =
                  6 === l
                    ? a(
                        (n =
                          h === o
                            ? 0
                            : ((t = d(c(0, t + 0.5 - o), h - o)),
                              (1 +
                                Math.cos(
                                  Math.PI + (2 * Math.PI * t) / (h - o)
                                )) /
                                2))
                      )
                    : (t >= u(o) &&
                        (n = c(0, d(t - o < 0 ? d(h, 1) - (o - t) : h - t, 1))),
                      a(n));
              return n * this.a.v;
            },
            getValue: function (t) {
              this.iterateDynamicProperties(),
                (this._mdf = t || this._mdf),
                (this._currentTextLength =
                  this.elem.textProperty.currentData.l.length || 0),
                t && 2 === this.data.r && (this.e.v = this._currentTextLength);
              var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                i = this.o.v / e,
                r = this.s.v / e + i,
                s = this.e.v / e + i;
              if (s < r) {
                var a = r;
                (r = s), (s = a);
              }
              (this.finalS = r), (this.finalE = s);
            }
          }),
          extendPrototype([DynamicPropertyContainer], r),
          {
            getTextSelectorProp: function (t, e, i) {
              return new r(t, e, i);
            }
          }
        );
      })(),
      pool_factory = function (t, e, i, r) {
        var s = 0,
          a = t,
          n = createSizedArray(a);
        function o() {
          return s ? n[(s -= 1)] : e();
        }
        return {
          newElement: o,
          release: function (t) {
            s === a && ((n = pooling.double(n)), (a *= 2)),
              i && i(t),
              (n[s] = t),
              (s += 1);
          }
        };
      },
      pooling = {
        double: function (t) {
          return t.concat(createSizedArray(t.length));
        }
      },
      point_pool = pool_factory(8, function () {
        return createTypedArray("float32", 2);
      }),
      shape_pool =
        ((ZA = pool_factory(
          4,
          function () {
            return new ShapePath();
          },
          function (t) {
            var e,
              i = t._length;
            for (e = 0; e < i; e += 1)
              point_pool.release(t.v[e]),
                point_pool.release(t.i[e]),
                point_pool.release(t.o[e]),
                (t.v[e] = null),
                (t.i[e] = null),
                (t.o[e] = null);
            (t._length = 0), (t.c = !1);
          }
        )),
        (ZA.clone = function (t) {
          var e,
            i = ZA.newElement(),
            r = void 0 === t._length ? t.v.length : t._length;
          for (i.setLength(r), i.c = t.c, e = 0; e < r; e += 1)
            i.setTripleAt(
              t.v[e][0],
              t.v[e][1],
              t.o[e][0],
              t.o[e][1],
              t.i[e][0],
              t.i[e][1],
              e
            );
          return i;
        }),
        ZA),
      ZA,
      shapeCollection_pool =
        ((gB = {
          newShapeCollection: function () {
            var t;
            t = hB ? jB[(hB -= 1)] : new ShapeCollection();
            return t;
          },
          release: function (t) {
            var e,
              i = t._length;
            for (e = 0; e < i; e += 1) shape_pool.release(t.shapes[e]);
            (t._length = 0),
              hB === iB && ((jB = pooling.double(jB)), (iB *= 2));
            (jB[hB] = t), (hB += 1);
          }
        }),
        (hB = 0),
        (iB = 4),
        (jB = createSizedArray(iB)),
        gB),
      gB,
      hB,
      iB,
      jB,
      segments_length_pool = pool_factory(
        8,
        function () {
          return { lengths: [], totalLength: 0 };
        },
        function (t) {
          var e,
            i = t.lengths.length;
          for (e = 0; e < i; e += 1) bezier_length_pool.release(t.lengths[e]);
          t.lengths.length = 0;
        }
      ),
      bezier_length_pool = pool_factory(8, function () {
        return {
          addedLength: 0,
          percents: createTypedArray("float32", defaultCurveSegments),
          lengths: createTypedArray("float32", defaultCurveSegments)
        };
      });
    function BaseRenderer() {}
    function SVGRenderer(t, e) {
      (this.animationItem = t),
        (this.layers = null),
        (this.renderedFrame = -1),
        (this.svgElement = createNS("svg"));
      var i = "";
      if (e && e.title) {
        var r = createNS("title"),
          s = createElementID();
        r.setAttribute("id", s),
          (r.textContent = e.title),
          this.svgElement.appendChild(r),
          (i += s);
      }
      if (e && e.description) {
        var a = createNS("desc"),
          n = createElementID();
        a.setAttribute("id", n),
          (a.textContent = e.description),
          this.svgElement.appendChild(a),
          (i += " " + n);
      }
      i && this.svgElement.setAttribute("aria-labelledby", i);
      var o = createNS("defs");
      this.svgElement.appendChild(o);
      var h = createNS("g");
      this.svgElement.appendChild(h),
        (this.layerElement = h),
        (this.renderConfig = {
          preserveAspectRatio: (e && e.preserveAspectRatio) || "xMidYMid meet",
          imagePreserveAspectRatio:
            (e && e.imagePreserveAspectRatio) || "xMidYMid slice",
          progressiveLoad: (e && e.progressiveLoad) || !1,
          hideOnTransparent: !e || !1 !== e.hideOnTransparent,
          viewBoxOnly: (e && e.viewBoxOnly) || !1,
          viewBoxSize: (e && e.viewBoxSize) || !1,
          className: (e && e.className) || "",
          id: (e && e.id) || "",
          focusable: e && e.focusable,
          filterSize: {
            width: (e && e.filterSize && e.filterSize.width) || "100%",
            height: (e && e.filterSize && e.filterSize.height) || "100%",
            x: (e && e.filterSize && e.filterSize.x) || "0%",
            y: (e && e.filterSize && e.filterSize.y) || "0%"
          }
        }),
        (this.globalData = {
          _mdf: !1,
          frameNum: -1,
          defs: o,
          renderConfig: this.renderConfig
        }),
        (this.elements = []),
        (this.pendingElements = []),
        (this.destroyed = !1),
        (this.rendererType = "svg");
    }
    function CanvasRenderer(t, e) {
      (this.animationItem = t),
        (this.renderConfig = {
          clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
          context: (e && e.context) || null,
          progressiveLoad: (e && e.progressiveLoad) || !1,
          preserveAspectRatio: (e && e.preserveAspectRatio) || "xMidYMid meet",
          imagePreserveAspectRatio:
            (e && e.imagePreserveAspectRatio) || "xMidYMid slice",
          className: (e && e.className) || "",
          id: (e && e.id) || ""
        }),
        (this.renderConfig.dpr = (e && e.dpr) || 1),
        this.animationItem.wrapper &&
          (this.renderConfig.dpr =
            (e && e.dpr) || window.devicePixelRatio || 1),
        (this.renderedFrame = -1),
        (this.globalData = {
          frameNum: -1,
          _mdf: !1,
          renderConfig: this.renderConfig,
          currentGlobalAlpha: -1
        }),
        (this.contextData = new CVContextData()),
        (this.elements = []),
        (this.pendingElements = []),
        (this.transformMat = new Matrix()),
        (this.completeLayers = !1),
        (this.rendererType = "canvas");
    }
    function HybridRenderer(t, e) {
      (this.animationItem = t),
        (this.layers = null),
        (this.renderedFrame = -1),
        (this.renderConfig = {
          className: (e && e.className) || "",
          imagePreserveAspectRatio:
            (e && e.imagePreserveAspectRatio) || "xMidYMid slice",
          hideOnTransparent: !e || !1 !== e.hideOnTransparent,
          filterSize: {
            width: (e && e.filterSize && e.filterSize.width) || "400%",
            height: (e && e.filterSize && e.filterSize.height) || "400%",
            x: (e && e.filterSize && e.filterSize.x) || "-100%",
            y: (e && e.filterSize && e.filterSize.y) || "-100%"
          }
        }),
        (this.globalData = {
          _mdf: !1,
          frameNum: -1,
          renderConfig: this.renderConfig
        }),
        (this.pendingElements = []),
        (this.elements = []),
        (this.threeDElements = []),
        (this.destroyed = !1),
        (this.camera = null),
        (this.supports3d = !0),
        (this.rendererType = "html");
    }
    function MaskElement(t, e, i) {
      (this.data = t),
        (this.element = e),
        (this.globalData = i),
        (this.storedData = []),
        (this.masksProperties = this.data.masksProperties || []),
        (this.maskElement = null);
      var r,
        s = this.globalData.defs,
        a = this.masksProperties ? this.masksProperties.length : 0;
      (this.viewData = createSizedArray(a)), (this.solidPath = "");
      var n,
        o,
        h,
        l,
        p,
        m,
        f,
        c = this.masksProperties,
        d = 0,
        u = [],
        y = createElementID(),
        g = "clipPath",
        v = "clip-path";
      for (r = 0; r < a; r++)
        if (
          ((("a" !== c[r].mode && "n" !== c[r].mode) ||
            c[r].inv ||
            100 !== c[r].o.k ||
            c[r].o.x) &&
            (v = g = "mask"),
          ("s" != c[r].mode && "i" != c[r].mode) || 0 !== d
            ? (l = null)
            : ((l = createNS("rect")).setAttribute("fill", "#ffffff"),
              l.setAttribute("width", this.element.comp.data.w || 0),
              l.setAttribute("height", this.element.comp.data.h || 0),
              u.push(l)),
          (n = createNS("path")),
          "n" != c[r].mode)
        ) {
          var b;
          if (
            ((d += 1),
            n.setAttribute("fill", "s" === c[r].mode ? "#000000" : "#ffffff"),
            n.setAttribute("clip-rule", "nonzero"),
            0 !== c[r].x.k
              ? ((v = g = "mask"),
                (f = PropertyFactory.getProp(
                  this.element,
                  c[r].x,
                  0,
                  null,
                  this.element
                )),
                (b = createElementID()),
                (p = createNS("filter")).setAttribute("id", b),
                (m = createNS("feMorphology")).setAttribute(
                  "operator",
                  "erode"
                ),
                m.setAttribute("in", "SourceGraphic"),
                m.setAttribute("radius", "0"),
                p.appendChild(m),
                s.appendChild(p),
                n.setAttribute(
                  "stroke",
                  "s" === c[r].mode ? "#000000" : "#ffffff"
                ))
              : (f = m = null),
            (this.storedData[r] = {
              elem: n,
              x: f,
              expan: m,
              lastPath: "",
              lastOperator: "",
              filterId: b,
              lastRadius: 0
            }),
            "i" == c[r].mode)
          ) {
            h = u.length;
            var E = createNS("g");
            for (o = 0; o < h; o += 1) E.appendChild(u[o]);
            var x = createNS("mask");
            x.setAttribute("mask-type", "alpha"),
              x.setAttribute("id", y + "_" + d),
              x.appendChild(n),
              s.appendChild(x),
              E.setAttribute(
                "mask",
                "url(" + locationHref + "#" + y + "_" + d + ")"
              ),
              (u.length = 0),
              u.push(E);
          } else u.push(n);
          c[r].inv &&
            !this.solidPath &&
            (this.solidPath = this.createLayerSolidPath()),
            (this.viewData[r] = {
              elem: n,
              lastPath: "",
              op: PropertyFactory.getProp(
                this.element,
                c[r].o,
                0,
                0.01,
                this.element
              ),
              prop: ShapePropertyFactory.getShapeProp(this.element, c[r], 3),
              invRect: l
            }),
            this.viewData[r].prop.k ||
              this.drawPath(c[r], this.viewData[r].prop.v, this.viewData[r]);
        } else
          (this.viewData[r] = {
            op: PropertyFactory.getProp(
              this.element,
              c[r].o,
              0,
              0.01,
              this.element
            ),
            prop: ShapePropertyFactory.getShapeProp(this.element, c[r], 3),
            elem: n,
            lastPath: ""
          }),
            s.appendChild(n);
      for (this.maskElement = createNS(g), a = u.length, r = 0; r < a; r += 1)
        this.maskElement.appendChild(u[r]);
      0 < d &&
        (this.maskElement.setAttribute("id", y),
        this.element.maskedElement.setAttribute(
          v,
          "url(" + locationHref + "#" + y + ")"
        ),
        s.appendChild(this.maskElement)),
        this.viewData.length && this.element.addRenderableComponent(this);
    }
    function HierarchyElement() {}
    function FrameElement() {}
    function TransformElement() {}
    function RenderableElement() {}
    function RenderableDOMElement() {}
    function ProcessedElement(t, e) {
      (this.elem = t), (this.pos = e);
    }
    function SVGStyleData(t, e) {
      (this.data = t),
        (this.type = t.ty),
        (this.d = ""),
        (this.lvl = e),
        (this._mdf = !1),
        (this.closed = !0 === t.hd),
        (this.pElem = createNS("path")),
        (this.msElem = null);
    }
    function SVGShapeData(t, e, i) {
      (this.caches = []),
        (this.styles = []),
        (this.transformers = t),
        (this.lStr = ""),
        (this.sh = i),
        (this.lvl = e),
        (this._isAnimated = !!i.k);
      for (var r = 0, s = t.length; r < s; ) {
        if (t[r].mProps.dynamicProperties.length) {
          this._isAnimated = !0;
          break;
        }
        r += 1;
      }
    }
    function SVGTransformData(t, e, i) {
      (this.transform = { mProps: t, op: e, container: i }),
        (this.elements = []),
        (this._isAnimated =
          this.transform.mProps.dynamicProperties.length ||
          this.transform.op.effectsSequence.length);
    }
    function SVGStrokeStyleData(t, e, i) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
        (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
        (this.d = new DashProperty(t, e.d || {}, "svg", this)),
        (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)),
        (this.style = i),
        (this._isAnimated = !!this._isAnimated);
    }
    function SVGFillStyleData(t, e, i) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
        (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)),
        (this.style = i);
    }
    function SVGGradientFillStyleData(t, e, i) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        this.initGradientData(t, e, i);
    }
    function SVGGradientStrokeStyleData(t, e, i) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
        (this.d = new DashProperty(t, e.d || {}, "svg", this)),
        this.initGradientData(t, e, i),
        (this._isAnimated = !!this._isAnimated);
    }
    function ShapeGroupData() {
      (this.it = []), (this.prevViewData = []), (this.gr = createNS("g"));
    }
    (BaseRenderer.prototype.checkLayers = function (t) {
      var e,
        i,
        r = this.layers.length;
      for (this.completeLayers = !0, e = r - 1; 0 <= e; e--)
        this.elements[e] ||
          ((i = this.layers[e]).ip - i.st <= t - this.layers[e].st &&
            i.op - i.st > t - this.layers[e].st &&
            this.buildItem(e)),
          (this.completeLayers = !!this.elements[e] && this.completeLayers);
      this.checkPendingElements();
    }),
      (BaseRenderer.prototype.createItem = function (t) {
        switch (t.ty) {
          case 2:
            return this.createImage(t);
          case 0:
            return this.createComp(t);
          case 1:
            return this.createSolid(t);
          case 3:
            return this.createNull(t);
          case 4:
            return this.createShape(t);
          case 5:
            return this.createText(t);
          case 13:
            return this.createCamera(t);
        }
        return this.createNull(t);
      }),
      (BaseRenderer.prototype.createCamera = function () {
        throw new Error("You're using a 3d camera. Try the html renderer.");
      }),
      (BaseRenderer.prototype.buildAllItems = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1) this.buildItem(t);
        this.checkPendingElements();
      }),
      (BaseRenderer.prototype.includeLayers = function (t) {
        this.completeLayers = !1;
        var e,
          i,
          r = t.length,
          s = this.layers.length;
        for (e = 0; e < r; e += 1)
          for (i = 0; i < s; ) {
            if (this.layers[i].id == t[e].id) {
              this.layers[i] = t[e];
              break;
            }
            i += 1;
          }
      }),
      (BaseRenderer.prototype.setProjectInterface = function (t) {
        this.globalData.projectInterface = t;
      }),
      (BaseRenderer.prototype.initItems = function () {
        this.globalData.progressiveLoad || this.buildAllItems();
      }),
      (BaseRenderer.prototype.buildElementParenting = function (t, e, i) {
        for (
          var r = this.elements, s = this.layers, a = 0, n = s.length;
          a < n;

        )
          s[a].ind == e &&
            (r[a] && !0 !== r[a]
              ? (i.push(r[a]),
                r[a].setAsParent(),
                void 0 !== s[a].parent
                  ? this.buildElementParenting(t, s[a].parent, i)
                  : t.setHierarchy(i))
              : (this.buildItem(a), this.addPendingElement(t))),
            (a += 1);
      }),
      (BaseRenderer.prototype.addPendingElement = function (t) {
        this.pendingElements.push(t);
      }),
      (BaseRenderer.prototype.searchExtraCompositions = function (t) {
        var e,
          i = t.length;
        for (e = 0; e < i; e += 1)
          if (t[e].xt) {
            var r = this.createComp(t[e]);
            r.initExpressions(),
              this.globalData.projectInterface.registerComposition(r);
          }
      }),
      (BaseRenderer.prototype.setupGlobalData = function (t, e) {
        (this.globalData.fontManager = new FontManager()),
          this.globalData.fontManager.addChars(t.chars),
          this.globalData.fontManager.addFonts(t.fonts, e),
          (this.globalData.getAssetData = this.animationItem.getAssetData.bind(
            this.animationItem
          )),
          (this.globalData.getAssetsPath =
            this.animationItem.getAssetsPath.bind(this.animationItem)),
          (this.globalData.imageLoader = this.animationItem.imagePreloader),
          (this.globalData.frameId = 0),
          (this.globalData.frameRate = t.fr),
          (this.globalData.nm = t.nm),
          (this.globalData.compSize = { w: t.w, h: t.h });
      }),
      extendPrototype([BaseRenderer], SVGRenderer),
      (SVGRenderer.prototype.createNull = function (t) {
        return new NullElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createShape = function (t) {
        return new SVGShapeElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createText = function (t) {
        return new SVGTextElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createImage = function (t) {
        return new IImageElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createComp = function (t) {
        return new SVGCompElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createSolid = function (t) {
        return new ISolidElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.configAnimation = function (t) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
          this.renderConfig.viewBoxSize
            ? this.svgElement.setAttribute(
                "viewBox",
                this.renderConfig.viewBoxSize
              )
            : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h),
          this.renderConfig.viewBoxOnly ||
            (this.svgElement.setAttribute("width", t.w),
            this.svgElement.setAttribute("height", t.h),
            (this.svgElement.style.width = "100%"),
            (this.svgElement.style.height = "100%"),
            (this.svgElement.style.transform = "translate3d(0,0,0)")),
          this.renderConfig.className &&
            this.svgElement.setAttribute("class", this.renderConfig.className),
          this.renderConfig.id &&
            this.svgElement.setAttribute("id", this.renderConfig.id),
          void 0 !== this.renderConfig.focusable &&
            this.svgElement.setAttribute(
              "focusable",
              this.renderConfig.focusable
            ),
          this.svgElement.setAttribute(
            "preserveAspectRatio",
            this.renderConfig.preserveAspectRatio
          ),
          this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.setupGlobalData(t, e),
          (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad),
          (this.data = t);
        var i = createNS("clipPath"),
          r = createNS("rect");
        r.setAttribute("width", t.w),
          r.setAttribute("height", t.h),
          r.setAttribute("x", 0),
          r.setAttribute("y", 0);
        var s = createElementID();
        i.setAttribute("id", s),
          i.appendChild(r),
          this.layerElement.setAttribute(
            "clip-path",
            "url(" + locationHref + "#" + s + ")"
          ),
          e.appendChild(i),
          (this.layers = t.layers),
          (this.elements = createSizedArray(t.layers.length));
      }),
      (SVGRenderer.prototype.destroy = function () {
        (this.animationItem.wrapper.innerHTML = ""),
          (this.layerElement = null),
          (this.globalData.defs = null);
        var t,
          e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();
        (this.elements.length = 0),
          (this.destroyed = !0),
          (this.animationItem = null);
      }),
      (SVGRenderer.prototype.updateContainerSize = function () {}),
      (SVGRenderer.prototype.buildItem = function (t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
          e[t] = !0;
          var i = this.createItem(this.layers[t]);
          (e[t] = i),
            expressionsPlugin &&
              (0 === this.layers[t].ty &&
                this.globalData.projectInterface.registerComposition(i),
              i.initExpressions()),
            this.appendElementInPos(i, t),
            this.layers[t].tt &&
              (this.elements[t - 1] && !0 !== this.elements[t - 1]
                ? i.setMatte(e[t - 1].layerId)
                : (this.buildItem(t - 1), this.addPendingElement(i)));
        }
      }),
      (SVGRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length; ) {
          var t = this.pendingElements.pop();
          if ((t.checkParenting(), t.data.tt))
            for (var e = 0, i = this.elements.length; e < i; ) {
              if (this.elements[e] === t) {
                t.setMatte(this.elements[e - 1].layerId);
                break;
              }
              e += 1;
            }
        }
      }),
      (SVGRenderer.prototype.renderFrame = function (t) {
        if (this.renderedFrame !== t && !this.destroyed) {
          null === t ? (t = this.renderedFrame) : (this.renderedFrame = t),
            (this.globalData.frameNum = t),
            (this.globalData.frameId += 1),
            (this.globalData.projectInterface.currentFrame = t),
            (this.globalData._mdf = !1);
          var e,
            i = this.layers.length;
          for (
            this.completeLayers || this.checkLayers(t), e = i - 1;
            0 <= e;
            e--
          )
            (this.completeLayers || this.elements[e]) &&
              this.elements[e].prepareFrame(t - this.layers[e].st);
          if (this.globalData._mdf)
            for (e = 0; e < i; e += 1)
              (this.completeLayers || this.elements[e]) &&
                this.elements[e].renderFrame();
        }
      }),
      (SVGRenderer.prototype.appendElementInPos = function (t, e) {
        var i = t.getBaseElement();
        if (i) {
          for (var r, s = 0; s < e; )
            this.elements[s] &&
              !0 !== this.elements[s] &&
              this.elements[s].getBaseElement() &&
              (r = this.elements[s].getBaseElement()),
              (s += 1);
          r
            ? this.layerElement.insertBefore(i, r)
            : this.layerElement.appendChild(i);
        }
      }),
      (SVGRenderer.prototype.hide = function () {
        this.layerElement.style.display = "none";
      }),
      (SVGRenderer.prototype.show = function () {
        this.layerElement.style.display = "block";
      }),
      extendPrototype([BaseRenderer], CanvasRenderer),
      (CanvasRenderer.prototype.createShape = function (t) {
        return new CVShapeElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createText = function (t) {
        return new CVTextElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createImage = function (t) {
        return new CVImageElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createComp = function (t) {
        return new CVCompElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createSolid = function (t) {
        return new CVSolidElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull),
      (CanvasRenderer.prototype.ctxTransform = function (t) {
        if (
          1 !== t[0] ||
          0 !== t[1] ||
          0 !== t[4] ||
          1 !== t[5] ||
          0 !== t[12] ||
          0 !== t[13]
        )
          if (this.renderConfig.clearCanvas) {
            this.transformMat.cloneFromProps(t);
            var e = this.contextData.cTr.props;
            this.transformMat.transform(
              e[0],
              e[1],
              e[2],
              e[3],
              e[4],
              e[5],
              e[6],
              e[7],
              e[8],
              e[9],
              e[10],
              e[11],
              e[12],
              e[13],
              e[14],
              e[15]
            ),
              this.contextData.cTr.cloneFromProps(this.transformMat.props);
            var i = this.contextData.cTr.props;
            this.canvasContext.setTransform(
              i[0],
              i[1],
              i[4],
              i[5],
              i[12],
              i[13]
            );
          } else
            this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
      }),
      (CanvasRenderer.prototype.ctxOpacity = function (t) {
        if (!this.renderConfig.clearCanvas)
          return (
            (this.canvasContext.globalAlpha *= t < 0 ? 0 : t),
            void (this.globalData.currentGlobalAlpha = this.contextData.cO)
          );
        (this.contextData.cO *= t < 0 ? 0 : t),
          this.globalData.currentGlobalAlpha !== this.contextData.cO &&
            ((this.canvasContext.globalAlpha = this.contextData.cO),
            (this.globalData.currentGlobalAlpha = this.contextData.cO));
      }),
      (CanvasRenderer.prototype.reset = function () {
        this.renderConfig.clearCanvas
          ? this.contextData.reset()
          : this.canvasContext.restore();
      }),
      (CanvasRenderer.prototype.save = function (t) {
        if (this.renderConfig.clearCanvas) {
          t && this.canvasContext.save();
          var e = this.contextData.cTr.props;
          this.contextData._length <= this.contextData.cArrPos &&
            this.contextData.duplicate();
          var i,
            r = this.contextData.saved[this.contextData.cArrPos];
          for (i = 0; i < 16; i += 1) r[i] = e[i];
          (this.contextData.savedOp[this.contextData.cArrPos] =
            this.contextData.cO),
            (this.contextData.cArrPos += 1);
        } else this.canvasContext.save();
      }),
      (CanvasRenderer.prototype.restore = function (t) {
        if (this.renderConfig.clearCanvas) {
          t &&
            (this.canvasContext.restore(),
            (this.globalData.blendMode = "source-over")),
            (this.contextData.cArrPos -= 1);
          var e,
            i = this.contextData.saved[this.contextData.cArrPos],
            r = this.contextData.cTr.props;
          for (e = 0; e < 16; e += 1) r[e] = i[e];
          this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13]),
            (i = this.contextData.savedOp[this.contextData.cArrPos]),
            (this.contextData.cO = i),
            this.globalData.currentGlobalAlpha !== i &&
              ((this.canvasContext.globalAlpha = i),
              (this.globalData.currentGlobalAlpha = i));
        } else this.canvasContext.restore();
      }),
      (CanvasRenderer.prototype.configAnimation = function (t) {
        this.animationItem.wrapper
          ? ((this.animationItem.container = createTag("canvas")),
            (this.animationItem.container.style.width = "100%"),
            (this.animationItem.container.style.height = "100%"),
            (this.animationItem.container.style.transformOrigin =
              this.animationItem.container.style.mozTransformOrigin =
              this.animationItem.container.style.webkitTransformOrigin =
              this.animationItem.container.style["-webkit-transform"] =
                "0px 0px 0px"),
            this.animationItem.wrapper.appendChild(
              this.animationItem.container
            ),
            (this.canvasContext =
              this.animationItem.container.getContext("2d")),
            this.renderConfig.className &&
              this.animationItem.container.setAttribute(
                "class",
                this.renderConfig.className
              ),
            this.renderConfig.id &&
              this.animationItem.container.setAttribute(
                "id",
                this.renderConfig.id
              ))
          : (this.canvasContext = this.renderConfig.context),
          (this.data = t),
          (this.layers = t.layers),
          (this.transformCanvas = {
            w: t.w,
            h: t.h,
            sx: 0,
            sy: 0,
            tx: 0,
            ty: 0
          }),
          this.setupGlobalData(t, document.body),
          (this.globalData.canvasContext = this.canvasContext),
          ((this.globalData.renderer = this).globalData.isDashed = !1),
          (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad),
          (this.globalData.transformCanvas = this.transformCanvas),
          (this.elements = createSizedArray(t.layers.length)),
          this.updateContainerSize();
      }),
      (CanvasRenderer.prototype.updateContainerSize = function () {
        var t, e, i, r;
        if (
          (this.reset(),
          this.animationItem.wrapper && this.animationItem.container
            ? ((t = this.animationItem.wrapper.offsetWidth),
              (e = this.animationItem.wrapper.offsetHeight),
              this.animationItem.container.setAttribute(
                "width",
                t * this.renderConfig.dpr
              ),
              this.animationItem.container.setAttribute(
                "height",
                e * this.renderConfig.dpr
              ))
            : ((t = this.canvasContext.canvas.width * this.renderConfig.dpr),
              (e = this.canvasContext.canvas.height * this.renderConfig.dpr)),
          -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") ||
            -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice"))
        ) {
          var s = this.renderConfig.preserveAspectRatio.split(" "),
            a = s[1] || "meet",
            n = s[0] || "xMidYMid",
            o = n.substr(0, 4),
            h = n.substr(4);
          (i = t / e),
            (r = this.transformCanvas.w / this.transformCanvas.h),
            (this.transformCanvas.sy =
              (i < r && "meet" === a) || (r < i && "slice" === a)
                ? ((this.transformCanvas.sx =
                    t / (this.transformCanvas.w / this.renderConfig.dpr)),
                  t / (this.transformCanvas.w / this.renderConfig.dpr))
                : ((this.transformCanvas.sx =
                    e / (this.transformCanvas.h / this.renderConfig.dpr)),
                  e / (this.transformCanvas.h / this.renderConfig.dpr))),
            (this.transformCanvas.tx =
              "xMid" === o &&
              ((r < i && "meet" === a) || (i < r && "slice" === a))
                ? ((t - this.transformCanvas.w * (e / this.transformCanvas.h)) /
                    2) *
                  this.renderConfig.dpr
                : "xMax" === o &&
                  ((r < i && "meet" === a) || (i < r && "slice" === a))
                ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) *
                  this.renderConfig.dpr
                : 0),
            (this.transformCanvas.ty =
              "YMid" === h &&
              ((i < r && "meet" === a) || (r < i && "slice" === a))
                ? ((e - this.transformCanvas.h * (t / this.transformCanvas.w)) /
                    2) *
                  this.renderConfig.dpr
                : "YMax" === h &&
                  ((i < r && "meet" === a) || (r < i && "slice" === a))
                ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) *
                  this.renderConfig.dpr
                : 0);
        } else
          "none" == this.renderConfig.preserveAspectRatio
            ? ((this.transformCanvas.sx =
                t / (this.transformCanvas.w / this.renderConfig.dpr)),
              (this.transformCanvas.sy =
                e / (this.transformCanvas.h / this.renderConfig.dpr)))
            : ((this.transformCanvas.sx = this.renderConfig.dpr),
              (this.transformCanvas.sy = this.renderConfig.dpr)),
            (this.transformCanvas.tx = 0),
            (this.transformCanvas.ty = 0);
        (this.transformCanvas.props = [
          this.transformCanvas.sx,
          0,
          0,
          0,
          0,
          this.transformCanvas.sy,
          0,
          0,
          0,
          0,
          1,
          0,
          this.transformCanvas.tx,
          this.transformCanvas.ty,
          0,
          1
        ]),
          this.ctxTransform(this.transformCanvas.props),
          this.canvasContext.beginPath(),
          this.canvasContext.rect(
            0,
            0,
            this.transformCanvas.w,
            this.transformCanvas.h
          ),
          this.canvasContext.closePath(),
          this.canvasContext.clip(),
          this.renderFrame(this.renderedFrame, !0);
      }),
      (CanvasRenderer.prototype.destroy = function () {
        var t;
        for (
          this.renderConfig.clearCanvas &&
            (this.animationItem.wrapper.innerHTML = ""),
            t = (this.layers ? this.layers.length : 0) - 1;
          0 <= t;
          t -= 1
        )
          this.elements[t] && this.elements[t].destroy();
        (this.elements.length = 0),
          (this.globalData.canvasContext = null),
          (this.animationItem.container = null),
          (this.destroyed = !0);
      }),
      (CanvasRenderer.prototype.renderFrame = function (t, e) {
        if (
          (this.renderedFrame !== t ||
            !0 !== this.renderConfig.clearCanvas ||
            e) &&
          !this.destroyed &&
          -1 !== t
        ) {
          (this.renderedFrame = t),
            (this.globalData.frameNum = t - this.animationItem._isFirstFrame),
            (this.globalData.frameId += 1),
            (this.globalData._mdf = !this.renderConfig.clearCanvas || e),
            (this.globalData.projectInterface.currentFrame = t);
          var i,
            r = this.layers.length;
          for (this.completeLayers || this.checkLayers(t), i = 0; i < r; i++)
            (this.completeLayers || this.elements[i]) &&
              this.elements[i].prepareFrame(t - this.layers[i].st);
          if (this.globalData._mdf) {
            for (
              !0 === this.renderConfig.clearCanvas
                ? this.canvasContext.clearRect(
                    0,
                    0,
                    this.transformCanvas.w,
                    this.transformCanvas.h
                  )
                : this.save(),
                i = r - 1;
              0 <= i;
              i -= 1
            )
              (this.completeLayers || this.elements[i]) &&
                this.elements[i].renderFrame();
            !0 !== this.renderConfig.clearCanvas && this.restore();
          }
        }
      }),
      (CanvasRenderer.prototype.buildItem = function (t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
          var i = this.createItem(this.layers[t], this, this.globalData);
          (e[t] = i).initExpressions();
        }
      }),
      (CanvasRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length; ) {
          this.pendingElements.pop().checkParenting();
        }
      }),
      (CanvasRenderer.prototype.hide = function () {
        this.animationItem.container.style.display = "none";
      }),
      (CanvasRenderer.prototype.show = function () {
        this.animationItem.container.style.display = "block";
      }),
      extendPrototype([BaseRenderer], HybridRenderer),
      (HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem),
      (HybridRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length; ) {
          this.pendingElements.pop().checkParenting();
        }
      }),
      (HybridRenderer.prototype.appendElementInPos = function (t, e) {
        var i = t.getBaseElement();
        if (i) {
          var r = this.layers[e];
          if (r.ddd && this.supports3d) this.addTo3dContainer(i, e);
          else if (this.threeDElements) this.addTo3dContainer(i, e);
          else {
            for (var s, a, n = 0; n < e; )
              this.elements[n] &&
                !0 !== this.elements[n] &&
                this.elements[n].getBaseElement &&
                ((a = this.elements[n]),
                (s =
                  (this.layers[n].ddd
                    ? this.getThreeDContainerByPos(n)
                    : a.getBaseElement()) || s)),
                (n += 1);
            s
              ? (r.ddd && this.supports3d) ||
                this.layerElement.insertBefore(i, s)
              : (r.ddd && this.supports3d) || this.layerElement.appendChild(i);
          }
        }
      }),
      (HybridRenderer.prototype.createShape = function (t) {
        return this.supports3d
          ? new HShapeElement(t, this.globalData, this)
          : new SVGShapeElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createText = function (t) {
        return this.supports3d
          ? new HTextElement(t, this.globalData, this)
          : new SVGTextElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createCamera = function (t) {
        return (
          (this.camera = new HCameraElement(t, this.globalData, this)),
          this.camera
        );
      }),
      (HybridRenderer.prototype.createImage = function (t) {
        return this.supports3d
          ? new HImageElement(t, this.globalData, this)
          : new IImageElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createComp = function (t) {
        return this.supports3d
          ? new HCompElement(t, this.globalData, this)
          : new SVGCompElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createSolid = function (t) {
        return this.supports3d
          ? new HSolidElement(t, this.globalData, this)
          : new ISolidElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull),
      (HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
        for (var e = 0, i = this.threeDElements.length; e < i; ) {
          if (
            this.threeDElements[e].startPos <= t &&
            this.threeDElements[e].endPos >= t
          )
            return this.threeDElements[e].perspectiveElem;
          e += 1;
        }
      }),
      (HybridRenderer.prototype.createThreeDContainer = function (t, e) {
        var i = createTag("div");
        styleDiv(i);
        var r = createTag("div");
        styleDiv(r),
          "3d" === e &&
            ((i.style.width = this.globalData.compSize.w + "px"),
            (i.style.height = this.globalData.compSize.h + "px"),
            (i.style.transformOrigin =
              i.style.mozTransformOrigin =
              i.style.webkitTransformOrigin =
                "50% 50%"),
            (r.style.transform = r.style.webkitTransform =
              "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)")),
          i.appendChild(r);
        var s = {
          container: r,
          perspectiveElem: i,
          startPos: t,
          endPos: t,
          type: e
        };
        return this.threeDElements.push(s), s;
      }),
      (HybridRenderer.prototype.build3dContainers = function () {
        var t,
          e,
          i = this.layers.length,
          r = "";
        for (t = 0; t < i; t += 1)
          this.layers[t].ddd && 3 !== this.layers[t].ty
            ? "3d" !== r &&
              ((r = "3d"), (e = this.createThreeDContainer(t, "3d")))
            : "2d" !== r &&
              ((r = "2d"), (e = this.createThreeDContainer(t, "2d"))),
            (e.endPos = Math.max(e.endPos, t));
        for (t = (i = this.threeDElements.length) - 1; 0 <= t; t--)
          this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem);
      }),
      (HybridRenderer.prototype.addTo3dContainer = function (t, e) {
        for (var i = 0, r = this.threeDElements.length; i < r; ) {
          if (e <= this.threeDElements[i].endPos) {
            for (var s, a = this.threeDElements[i].startPos; a < e; )
              this.elements[a] &&
                this.elements[a].getBaseElement &&
                (s = this.elements[a].getBaseElement()),
                (a += 1);
            s
              ? this.threeDElements[i].container.insertBefore(t, s)
              : this.threeDElements[i].container.appendChild(t);
            break;
          }
          i += 1;
        }
      }),
      (HybridRenderer.prototype.configAnimation = function (t) {
        var e = createTag("div"),
          i = this.animationItem.wrapper;
        (e.style.width = t.w + "px"),
          (e.style.height = t.h + "px"),
          styleDiv((this.resizerElem = e)),
          (e.style.transformStyle =
            e.style.webkitTransformStyle =
            e.style.mozTransformStyle =
              "flat"),
          this.renderConfig.className &&
            e.setAttribute("class", this.renderConfig.className),
          i.appendChild(e),
          (e.style.overflow = "hidden");
        var r = createNS("svg");
        r.setAttribute("width", "1"),
          r.setAttribute("height", "1"),
          styleDiv(r),
          this.resizerElem.appendChild(r);
        var s = createNS("defs");
        r.appendChild(s),
          (this.data = t),
          this.setupGlobalData(t, r),
          (this.globalData.defs = s),
          (this.layers = t.layers),
          (this.layerElement = this.resizerElem),
          this.build3dContainers(),
          this.updateContainerSize();
      }),
      (HybridRenderer.prototype.destroy = function () {
        (this.animationItem.wrapper.innerHTML = ""),
          (this.animationItem.container = null),
          (this.globalData.defs = null);
        var t,
          e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t++) this.elements[t].destroy();
        (this.elements.length = 0),
          (this.destroyed = !0),
          (this.animationItem = null);
      }),
      (HybridRenderer.prototype.updateContainerSize = function () {
        var t,
          e,
          i,
          r,
          s = this.animationItem.wrapper.offsetWidth,
          a = this.animationItem.wrapper.offsetHeight;
        (r =
          s / a < this.globalData.compSize.w / this.globalData.compSize.h
            ? ((t = s / this.globalData.compSize.w),
              (e = s / this.globalData.compSize.w),
              (i = 0),
              (a -
                this.globalData.compSize.h * (s / this.globalData.compSize.w)) /
                2)
            : ((t = a / this.globalData.compSize.h),
              (e = a / this.globalData.compSize.h),
              (i =
                (s -
                  this.globalData.compSize.w *
                    (a / this.globalData.compSize.h)) /
                2),
              0)),
          (this.resizerElem.style.transform =
            this.resizerElem.style.webkitTransform =
              "matrix3d(" +
              t +
              ",0,0,0,0," +
              e +
              ",0,0,0,0,1,0," +
              i +
              "," +
              r +
              ",0,1)");
      }),
      (HybridRenderer.prototype.renderFrame =
        SVGRenderer.prototype.renderFrame),
      (HybridRenderer.prototype.hide = function () {
        this.resizerElem.style.display = "none";
      }),
      (HybridRenderer.prototype.show = function () {
        this.resizerElem.style.display = "block";
      }),
      (HybridRenderer.prototype.initItems = function () {
        if ((this.buildAllItems(), this.camera)) this.camera.setup();
        else {
          var t,
            e = this.globalData.compSize.w,
            i = this.globalData.compSize.h,
            r = this.threeDElements.length;
          for (t = 0; t < r; t += 1)
            this.threeDElements[t].perspectiveElem.style.perspective =
              this.threeDElements[t].perspectiveElem.style.webkitPerspective =
                Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2)) + "px";
        }
      }),
      (HybridRenderer.prototype.searchExtraCompositions = function (t) {
        var e,
          i = t.length,
          r = createTag("div");
        for (e = 0; e < i; e += 1)
          if (t[e].xt) {
            var s = this.createComp(t[e], r, this.globalData.comp, null);
            s.initExpressions(),
              this.globalData.projectInterface.registerComposition(s);
          }
      }),
      (MaskElement.prototype.getMaskProperty = function (t) {
        return this.viewData[t].prop;
      }),
      (MaskElement.prototype.renderFrame = function (t) {
        var e,
          i = this.element.finalTransform.mat,
          r = this.masksProperties.length;
        for (e = 0; e < r; e++)
          if (
            ((this.viewData[e].prop._mdf || t) &&
              this.drawPath(
                this.masksProperties[e],
                this.viewData[e].prop.v,
                this.viewData[e]
              ),
            (this.viewData[e].op._mdf || t) &&
              this.viewData[e].elem.setAttribute(
                "fill-opacity",
                this.viewData[e].op.v
              ),
            "n" !== this.masksProperties[e].mode &&
              (this.viewData[e].invRect &&
                (this.element.finalTransform.mProp._mdf || t) &&
                this.viewData[e].invRect.setAttribute(
                  "transform",
                  i.getInverseMatrix().to2dCSS()
                ),
              this.storedData[e].x && (this.storedData[e].x._mdf || t)))
          ) {
            var s = this.storedData[e].expan;
            this.storedData[e].x.v < 0
              ? ("erode" !== this.storedData[e].lastOperator &&
                  ((this.storedData[e].lastOperator = "erode"),
                  this.storedData[e].elem.setAttribute(
                    "filter",
                    "url(" +
                      locationHref +
                      "#" +
                      this.storedData[e].filterId +
                      ")"
                  )),
                s.setAttribute("radius", -this.storedData[e].x.v))
              : ("dilate" !== this.storedData[e].lastOperator &&
                  ((this.storedData[e].lastOperator = "dilate"),
                  this.storedData[e].elem.setAttribute("filter", null)),
                this.storedData[e].elem.setAttribute(
                  "stroke-width",
                  2 * this.storedData[e].x.v
                ));
          }
      }),
      (MaskElement.prototype.getMaskelement = function () {
        return this.maskElement;
      }),
      (MaskElement.prototype.createLayerSolidPath = function () {
        var t = "M0,0 ";
        return (
          (t += " h" + this.globalData.compSize.w),
          (t += " v" + this.globalData.compSize.h),
          (t += " h-" + this.globalData.compSize.w),
          (t += " v-" + this.globalData.compSize.h + " ")
        );
      }),
      (MaskElement.prototype.drawPath = function (t, e, i) {
        var r,
          s,
          a = " M" + e.v[0][0] + "," + e.v[0][1];
        for (s = e._length, r = 1; r < s; r += 1)
          a +=
            " C" +
            e.o[r - 1][0] +
            "," +
            e.o[r - 1][1] +
            " " +
            e.i[r][0] +
            "," +
            e.i[r][1] +
            " " +
            e.v[r][0] +
            "," +
            e.v[r][1];
        if (
          (e.c &&
            1 < s &&
            (a +=
              " C" +
              e.o[r - 1][0] +
              "," +
              e.o[r - 1][1] +
              " " +
              e.i[0][0] +
              "," +
              e.i[0][1] +
              " " +
              e.v[0][0] +
              "," +
              e.v[0][1]),
          i.lastPath !== a)
        ) {
          var n = "";
          i.elem &&
            (e.c && (n = t.inv ? this.solidPath + a : a),
            i.elem.setAttribute("d", n)),
            (i.lastPath = a);
        }
      }),
      (MaskElement.prototype.destroy = function () {
        (this.element = null),
          (this.globalData = null),
          (this.maskElement = null),
          (this.data = null),
          (this.masksProperties = null);
      }),
      (HierarchyElement.prototype = {
        initHierarchy: function () {
          (this.hierarchy = []), (this._isParent = !1), this.checkParenting();
        },
        setHierarchy: function (t) {
          this.hierarchy = t;
        },
        setAsParent: function () {
          this._isParent = !0;
        },
        checkParenting: function () {
          void 0 !== this.data.parent &&
            this.comp.buildElementParenting(this, this.data.parent, []);
        }
      }),
      (FrameElement.prototype = {
        initFrame: function () {
          (this._isFirstFrame = !1),
            (this.dynamicProperties = []),
            (this._mdf = !1);
        },
        prepareProperties: function (t, e) {
          var i,
            r = this.dynamicProperties.length;
          for (i = 0; i < r; i += 1)
            (e ||
              (this._isParent &&
                "transform" === this.dynamicProperties[i].propType)) &&
              (this.dynamicProperties[i].getValue(),
              this.dynamicProperties[i]._mdf &&
                ((this.globalData._mdf = !0), (this._mdf = !0)));
        },
        addDynamicProperty: function (t) {
          -1 === this.dynamicProperties.indexOf(t) &&
            this.dynamicProperties.push(t);
        }
      }),
      (TransformElement.prototype = {
        initTransform: function () {
          (this.finalTransform = {
            mProp: this.data.ks
              ? TransformPropertyFactory.getTransformProperty(
                  this,
                  this.data.ks,
                  this
                )
              : { o: 0 },
            _matMdf: !1,
            _opMdf: !1,
            mat: new Matrix()
          }),
            this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
            this.data.ty;
        },
        renderTransform: function () {
          if (
            ((this.finalTransform._opMdf =
              this.finalTransform.mProp.o._mdf || this._isFirstFrame),
            (this.finalTransform._matMdf =
              this.finalTransform.mProp._mdf || this._isFirstFrame),
            this.hierarchy)
          ) {
            var t,
              e = this.finalTransform.mat,
              i = 0,
              r = this.hierarchy.length;
            if (!this.finalTransform._matMdf)
              for (; i < r; ) {
                if (this.hierarchy[i].finalTransform.mProp._mdf) {
                  this.finalTransform._matMdf = !0;
                  break;
                }
                i += 1;
              }
            if (this.finalTransform._matMdf)
              for (
                t = this.finalTransform.mProp.v.props,
                  e.cloneFromProps(t),
                  i = 0;
                i < r;
                i += 1
              )
                (t = this.hierarchy[i].finalTransform.mProp.v.props),
                  e.transform(
                    t[0],
                    t[1],
                    t[2],
                    t[3],
                    t[4],
                    t[5],
                    t[6],
                    t[7],
                    t[8],
                    t[9],
                    t[10],
                    t[11],
                    t[12],
                    t[13],
                    t[14],
                    t[15]
                  );
          }
        },
        globalToLocal: function (t) {
          var e = [];
          e.push(this.finalTransform);
          for (var i = !0, r = this.comp; i; )
            r.finalTransform
              ? (r.data.hasMask && e.splice(0, 0, r.finalTransform),
                (r = r.comp))
              : (i = !1);
          var s,
            a,
            n = e.length;
          for (s = 0; s < n; s += 1)
            (a = e[s].mat.applyToPointArray(0, 0, 0)),
              (t = [t[0] - a[0], t[1] - a[1], 0]);
          return t;
        },
        mHelper: new Matrix()
      }),
      (RenderableElement.prototype = {
        initRenderable: function () {
          (this.isInRange = !1),
            (this.hidden = !1),
            (this.isTransparent = !1),
            (this.renderableComponents = []);
        },
        addRenderableComponent: function (t) {
          -1 === this.renderableComponents.indexOf(t) &&
            this.renderableComponents.push(t);
        },
        removeRenderableComponent: function (t) {
          -1 !== this.renderableComponents.indexOf(t) &&
            this.renderableComponents.splice(
              this.renderableComponents.indexOf(t),
              1
            );
        },
        prepareRenderableFrame: function (t) {
          this.checkLayerLimits(t);
        },
        checkTransparency: function () {
          this.finalTransform.mProp.o.v <= 0
            ? !this.isTransparent &&
              this.globalData.renderConfig.hideOnTransparent &&
              ((this.isTransparent = !0), this.hide())
            : this.isTransparent && ((this.isTransparent = !1), this.show());
        },
        checkLayerLimits: function (t) {
          this.data.ip - this.data.st <= t && this.data.op - this.data.st > t
            ? !0 !== this.isInRange &&
              ((this.globalData._mdf = !0),
              (this._mdf = !0),
              (this.isInRange = !0),
              this.show())
            : !1 !== this.isInRange &&
              ((this.globalData._mdf = !0), (this.isInRange = !1), this.hide());
        },
        renderRenderable: function () {
          var t,
            e = this.renderableComponents.length;
          for (t = 0; t < e; t += 1)
            this.renderableComponents[t].renderFrame(this._isFirstFrame);
        },
        sourceRectAtTime: function () {
          return { top: 0, left: 0, width: 100, height: 100 };
        },
        getLayerSize: function () {
          return 5 === this.data.ty
            ? { w: this.data.textData.width, h: this.data.textData.height }
            : { w: this.data.width, h: this.data.height };
        }
      }),
      extendPrototype(
        [
          RenderableElement,
          createProxyFunction({
            initElement: function (t, e, i) {
              this.initFrame(),
                this.initBaseData(t, e, i),
                this.initTransform(t, e, i),
                this.initHierarchy(),
                this.initRenderable(),
                this.initRendererElement(),
                this.createContainerElements(),
                this.createRenderableComponents(),
                this.createContent(),
                this.hide();
            },
            hide: function () {
              this.hidden ||
                (this.isInRange && !this.isTransparent) ||
                (((this.baseElement || this.layerElement).style.display =
                  "none"),
                (this.hidden = !0));
            },
            show: function () {
              this.isInRange &&
                !this.isTransparent &&
                (this.data.hd ||
                  ((this.baseElement || this.layerElement).style.display =
                    "block"),
                (this.hidden = !1),
                (this._isFirstFrame = !0));
            },
            renderFrame: function () {
              this.data.hd ||
                this.hidden ||
                (this.renderTransform(),
                this.renderRenderable(),
                this.renderElement(),
                this.renderInnerContent(),
                this._isFirstFrame && (this._isFirstFrame = !1));
            },
            renderInnerContent: function () {},
            prepareFrame: function (t) {
              (this._mdf = !1),
                this.prepareRenderableFrame(t),
                this.prepareProperties(t, this.isInRange),
                this.checkTransparency();
            },
            destroy: function () {
              (this.innerElem = null), this.destroyBaseElement();
            }
          })
        ],
        RenderableDOMElement
      ),
      (SVGStyleData.prototype.reset = function () {
        (this.d = ""), (this._mdf = !1);
      }),
      (SVGShapeData.prototype.setAsAnimated = function () {
        this._isAnimated = !0;
      }),
      extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData),
      extendPrototype([DynamicPropertyContainer], SVGFillStyleData),
      (SVGGradientFillStyleData.prototype.initGradientData = function (
        t,
        e,
        i
      ) {
        (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
          (this.s = PropertyFactory.getProp(t, e.s, 1, null, this)),
          (this.e = PropertyFactory.getProp(t, e.e, 1, null, this)),
          (this.h = PropertyFactory.getProp(t, e.h || { k: 0 }, 0, 0.01, this)),
          (this.a = PropertyFactory.getProp(
            t,
            e.a || { k: 0 },
            0,
            degToRads,
            this
          )),
          (this.g = new GradientProperty(t, e.g, this)),
          (this.style = i),
          (this.stops = []),
          this.setGradientData(i.pElem, e),
          this.setGradientOpacity(e, i),
          (this._isAnimated = !!this._isAnimated);
      }),
      (SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
        var i = createElementID(),
          r = createNS(1 === e.t ? "linearGradient" : "radialGradient");
        r.setAttribute("id", i),
          r.setAttribute("spreadMethod", "pad"),
          r.setAttribute("gradientUnits", "userSpaceOnUse");
        var s,
          a,
          n,
          o = [];
        for (n = 4 * e.g.p, a = 0; a < n; a += 4)
          (s = createNS("stop")), r.appendChild(s), o.push(s);
        t.setAttribute(
          "gf" === e.ty ? "fill" : "stroke",
          "url(" + locationHref + "#" + i + ")"
        ),
          (this.gf = r),
          (this.cst = o);
      }),
      (SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
          var i,
            r,
            s,
            a = createNS("mask"),
            n = createNS("path");
          a.appendChild(n);
          var o = createElementID(),
            h = createElementID();
          a.setAttribute("id", h);
          var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
          l.setAttribute("id", o),
            l.setAttribute("spreadMethod", "pad"),
            l.setAttribute("gradientUnits", "userSpaceOnUse"),
            (s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length);
          var p = this.stops;
          for (r = 4 * t.g.p; r < s; r += 2)
            (i = createNS("stop")).setAttribute(
              "stop-color",
              "rgb(255,255,255)"
            ),
              l.appendChild(i),
              p.push(i);
          n.setAttribute(
            "gf" === t.ty ? "fill" : "stroke",
            "url(" + locationHref + "#" + o + ")"
          ),
            (this.of = l),
            (this.ms = a),
            (this.ost = p),
            (this.maskId = h),
            (e.msElem = n);
        }
      }),
      extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData),
      extendPrototype(
        [SVGGradientFillStyleData, DynamicPropertyContainer],
        SVGGradientStrokeStyleData
      );
    var SVGElementsRenderer = (function () {
      var y = new Matrix(),
        g = new Matrix();
      function e(t, e, i) {
        (i || e.transform.op._mdf) &&
          e.transform.container.setAttribute("opacity", e.transform.op.v),
          (i || e.transform.mProps._mdf) &&
            e.transform.container.setAttribute(
              "transform",
              e.transform.mProps.v.to2dCSS()
            );
      }
      function i(t, e, i) {
        var r,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          m,
          f,
          c,
          d = e.styles.length,
          u = e.lvl;
        for (h = 0; h < d; h += 1) {
          if (((n = e.sh._mdf || i), e.styles[h].lvl < u)) {
            for (
              p = g.reset(),
                f = u - e.styles[h].lvl,
                c = e.transformers.length - 1;
              !n && 0 < f;

            )
              (n = e.transformers[c].mProps._mdf || n), f--, c--;
            if (n)
              for (
                f = u - e.styles[h].lvl, c = e.transformers.length - 1;
                0 < f;

              )
                (m = e.transformers[c].mProps.v.props),
                  p.transform(
                    m[0],
                    m[1],
                    m[2],
                    m[3],
                    m[4],
                    m[5],
                    m[6],
                    m[7],
                    m[8],
                    m[9],
                    m[10],
                    m[11],
                    m[12],
                    m[13],
                    m[14],
                    m[15]
                  ),
                  f--,
                  c--;
          } else p = y;
          if (((s = (l = e.sh.paths)._length), n)) {
            for (a = "", r = 0; r < s; r += 1)
              (o = l.shapes[r]) &&
                o._length &&
                (a += buildShapeString(o, o._length, o.c, p));
            e.caches[h] = a;
          } else a = e.caches[h];
          (e.styles[h].d += !0 === t.hd ? "" : a),
            (e.styles[h]._mdf = n || e.styles[h]._mdf);
        }
      }
      function r(t, e, i) {
        var r = e.style;
        (e.c._mdf || i) &&
          r.pElem.setAttribute(
            "fill",
            "rgb(" +
              bm_floor(e.c.v[0]) +
              "," +
              bm_floor(e.c.v[1]) +
              "," +
              bm_floor(e.c.v[2]) +
              ")"
          ),
          (e.o._mdf || i) && r.pElem.setAttribute("fill-opacity", e.o.v);
      }
      function s(t, e, i) {
        a(t, e, i), n(t, e, i);
      }
      function a(t, e, i) {
        var r,
          s,
          a,
          n,
          o,
          h = e.gf,
          l = e.g._hasOpacity,
          p = e.s.v,
          m = e.e.v;
        if (e.o._mdf || i) {
          var f = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
          e.style.pElem.setAttribute(f, e.o.v);
        }
        if (e.s._mdf || i) {
          var c = 1 === t.t ? "x1" : "cx",
            d = "x1" === c ? "y1" : "cy";
          h.setAttribute(c, p[0]),
            h.setAttribute(d, p[1]),
            l &&
              !e.g._collapsable &&
              (e.of.setAttribute(c, p[0]), e.of.setAttribute(d, p[1]));
        }
        if (e.g._cmdf || i) {
          r = e.cst;
          var u = e.g.c;
          for (a = r.length, s = 0; s < a; s += 1)
            (n = r[s]).setAttribute("offset", u[4 * s] + "%"),
              n.setAttribute(
                "stop-color",
                "rgb(" +
                  u[4 * s + 1] +
                  "," +
                  u[4 * s + 2] +
                  "," +
                  u[4 * s + 3] +
                  ")"
              );
        }
        if (l && (e.g._omdf || i)) {
          var y = e.g.o;
          for (
            a = (r = e.g._collapsable ? e.cst : e.ost).length, s = 0;
            s < a;
            s += 1
          )
            (n = r[s]),
              e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"),
              n.setAttribute("stop-opacity", y[2 * s + 1]);
        }
        if (1 === t.t)
          (e.e._mdf || i) &&
            (h.setAttribute("x2", m[0]),
            h.setAttribute("y2", m[1]),
            l &&
              !e.g._collapsable &&
              (e.of.setAttribute("x2", m[0]), e.of.setAttribute("y2", m[1])));
        else if (
          ((e.s._mdf || e.e._mdf || i) &&
            ((o = Math.sqrt(
              Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)
            )),
            h.setAttribute("r", o),
            l && !e.g._collapsable && e.of.setAttribute("r", o)),
          e.e._mdf || e.h._mdf || e.a._mdf || i)
        ) {
          o ||
            (o = Math.sqrt(
              Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)
            ));
          var g = Math.atan2(m[1] - p[1], m[0] - p[0]),
            v = o * (1 <= e.h.v ? 0.99 : e.h.v <= -1 ? -0.99 : e.h.v),
            b = Math.cos(g + e.a.v) * v + p[0],
            E = Math.sin(g + e.a.v) * v + p[1];
          h.setAttribute("fx", b),
            h.setAttribute("fy", E),
            l &&
              !e.g._collapsable &&
              (e.of.setAttribute("fx", b), e.of.setAttribute("fy", E));
        }
      }
      function n(t, e, i) {
        var r = e.style,
          s = e.d;
        s &&
          (s._mdf || i) &&
          s.dashStr &&
          (r.pElem.setAttribute("stroke-dasharray", s.dashStr),
          r.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])),
          e.c &&
            (e.c._mdf || i) &&
            r.pElem.setAttribute(
              "stroke",
              "rgb(" +
                bm_floor(e.c.v[0]) +
                "," +
                bm_floor(e.c.v[1]) +
                "," +
                bm_floor(e.c.v[2]) +
                ")"
            ),
          (e.o._mdf || i) && r.pElem.setAttribute("stroke-opacity", e.o.v),
          (e.w._mdf || i) &&
            (r.pElem.setAttribute("stroke-width", e.w.v),
            r.msElem && r.msElem.setAttribute("stroke-width", e.w.v));
      }
      return {
        createRenderFunction: function (t) {
          t.ty;
          switch (t.ty) {
            case "fl":
              return r;
            case "gf":
              return a;
            case "gs":
              return s;
            case "st":
              return n;
            case "sh":
            case "el":
            case "rc":
            case "sr":
              return i;
            case "tr":
              return e;
          }
        }
      };
    })();
    function ShapeTransformManager() {
      (this.sequences = {}),
        (this.sequenceList = []),
        (this.transform_key_count = 0);
    }
    function CVShapeData(t, e, i, r) {
      (this.styledShapes = []), (this.tr = [0, 0, 0, 0, 0, 0]);
      var s = 4;
      "rc" == e.ty ? (s = 5) : "el" == e.ty ? (s = 6) : "sr" == e.ty && (s = 7),
        (this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t));
      var a,
        n,
        o = i.length;
      for (a = 0; a < o; a += 1)
        i[a].closed ||
          ((n = {
            transforms: r.addTransformSequence(i[a].transforms),
            trNodes: []
          }),
          this.styledShapes.push(n),
          i[a].elements.push(n));
    }
    function BaseElement() {}
    function NullElement(t, e, i) {
      this.initFrame(),
        this.initBaseData(t, e, i),
        this.initFrame(),
        this.initTransform(t, e, i),
        this.initHierarchy();
    }
    function SVGBaseElement() {}
    function IShapeElement() {}
    function ITextElement() {}
    function ICompElement() {}
    function IImageElement(t, e, i) {
      (this.assetData = e.getAssetData(t.refId)),
        this.initElement(t, e, i),
        (this.sourceRect = {
          top: 0,
          left: 0,
          width: this.assetData.w,
          height: this.assetData.h
        });
    }
    function ISolidElement(t, e, i) {
      this.initElement(t, e, i);
    }
    function SVGCompElement(t, e, i) {
      (this.layers = t.layers),
        (this.supports3d = !0),
        (this.completeLayers = !1),
        (this.pendingElements = []),
        (this.elements = this.layers
          ? createSizedArray(this.layers.length)
          : []),
        this.initElement(t, e, i),
        (this.tm = t.tm
          ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this)
          : { _placeholder: !0 });
    }
    function SVGTextElement(t, e, i) {
      (this.textSpans = []),
        (this.renderType = "svg"),
        this.initElement(t, e, i);
    }
    function SVGShapeElement(t, e, i) {
      (this.shapes = []),
        (this.shapesData = t.shapes),
        (this.stylesList = []),
        (this.shapeModifiers = []),
        (this.itemsData = []),
        (this.processedElements = []),
        (this.animatedContents = []),
        this.initElement(t, e, i),
        (this.prevViewData = []);
    }
    function SVGTintFilter(t, e) {
      this.filterManager = e;
      var i = createNS("feColorMatrix");
      if (
        (i.setAttribute("type", "matrix"),
        i.setAttribute("color-interpolation-filters", "linearRGB"),
        i.setAttribute(
          "values",
          "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
        ),
        i.setAttribute("result", "f1"),
        t.appendChild(i),
        (i = createNS("feColorMatrix")).setAttribute("type", "matrix"),
        i.setAttribute("color-interpolation-filters", "sRGB"),
        i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
        i.setAttribute("result", "f2"),
        t.appendChild(i),
        (this.matrixFilter = i),
        100 !== e.effectElements[2].p.v || e.effectElements[2].p.k)
      ) {
        var r,
          s = createNS("feMerge");
        t.appendChild(s),
          (r = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"),
          s.appendChild(r),
          (r = createNS("feMergeNode")).setAttribute("in", "f2"),
          s.appendChild(r);
      }
    }
    function SVGFillFilter(t, e) {
      this.filterManager = e;
      var i = createNS("feColorMatrix");
      i.setAttribute("type", "matrix"),
        i.setAttribute("color-interpolation-filters", "sRGB"),
        i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
        t.appendChild(i),
        (this.matrixFilter = i);
    }
    function SVGGaussianBlurEffect(t, e) {
      t.setAttribute("x", "-100%"),
        t.setAttribute("y", "-100%"),
        t.setAttribute("width", "300%"),
        t.setAttribute("height", "300%"),
        (this.filterManager = e);
      var i = createNS("feGaussianBlur");
      t.appendChild(i), (this.feGaussianBlur = i);
    }
    function SVGStrokeEffect(t, e) {
      (this.initialized = !1),
        (this.filterManager = e),
        (this.elem = t),
        (this.paths = []);
    }
    function SVGTritoneFilter(t, e) {
      this.filterManager = e;
      var i = createNS("feColorMatrix");
      i.setAttribute("type", "matrix"),
        i.setAttribute("color-interpolation-filters", "linearRGB"),
        i.setAttribute(
          "values",
          "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
        ),
        i.setAttribute("result", "f1"),
        t.appendChild(i);
      var r = createNS("feComponentTransfer");
      r.setAttribute("color-interpolation-filters", "sRGB"),
        t.appendChild(r),
        (this.matrixFilter = r);
      var s = createNS("feFuncR");
      s.setAttribute("type", "table"), r.appendChild(s), (this.feFuncR = s);
      var a = createNS("feFuncG");
      a.setAttribute("type", "table"), r.appendChild(a), (this.feFuncG = a);
      var n = createNS("feFuncB");
      n.setAttribute("type", "table"), r.appendChild(n), (this.feFuncB = n);
    }
    function SVGProLevelsFilter(t, e) {
      this.filterManager = e;
      var i = this.filterManager.effectElements,
        r = createNS("feComponentTransfer");
      (i[10].p.k ||
        0 !== i[10].p.v ||
        i[11].p.k ||
        1 !== i[11].p.v ||
        i[12].p.k ||
        1 !== i[12].p.v ||
        i[13].p.k ||
        0 !== i[13].p.v ||
        i[14].p.k ||
        1 !== i[14].p.v) &&
        (this.feFuncR = this.createFeFunc("feFuncR", r)),
        (i[17].p.k ||
          0 !== i[17].p.v ||
          i[18].p.k ||
          1 !== i[18].p.v ||
          i[19].p.k ||
          1 !== i[19].p.v ||
          i[20].p.k ||
          0 !== i[20].p.v ||
          i[21].p.k ||
          1 !== i[21].p.v) &&
          (this.feFuncG = this.createFeFunc("feFuncG", r)),
        (i[24].p.k ||
          0 !== i[24].p.v ||
          i[25].p.k ||
          1 !== i[25].p.v ||
          i[26].p.k ||
          1 !== i[26].p.v ||
          i[27].p.k ||
          0 !== i[27].p.v ||
          i[28].p.k ||
          1 !== i[28].p.v) &&
          (this.feFuncB = this.createFeFunc("feFuncB", r)),
        (i[31].p.k ||
          0 !== i[31].p.v ||
          i[32].p.k ||
          1 !== i[32].p.v ||
          i[33].p.k ||
          1 !== i[33].p.v ||
          i[34].p.k ||
          0 !== i[34].p.v ||
          i[35].p.k ||
          1 !== i[35].p.v) &&
          (this.feFuncA = this.createFeFunc("feFuncA", r)),
        (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) &&
          (r.setAttribute("color-interpolation-filters", "sRGB"),
          t.appendChild(r),
          (r = createNS("feComponentTransfer"))),
        (i[3].p.k ||
          0 !== i[3].p.v ||
          i[4].p.k ||
          1 !== i[4].p.v ||
          i[5].p.k ||
          1 !== i[5].p.v ||
          i[6].p.k ||
          0 !== i[6].p.v ||
          i[7].p.k ||
          1 !== i[7].p.v) &&
          (r.setAttribute("color-interpolation-filters", "sRGB"),
          t.appendChild(r),
          (this.feFuncRComposed = this.createFeFunc("feFuncR", r)),
          (this.feFuncGComposed = this.createFeFunc("feFuncG", r)),
          (this.feFuncBComposed = this.createFeFunc("feFuncB", r)));
    }
    function SVGDropShadowEffect(t, e) {
      var i = e.container.globalData.renderConfig.filterSize;
      t.setAttribute("x", i.x),
        t.setAttribute("y", i.y),
        t.setAttribute("width", i.width),
        t.setAttribute("height", i.height),
        (this.filterManager = e);
      var r = createNS("feGaussianBlur");
      r.setAttribute("in", "SourceAlpha"),
        r.setAttribute("result", "drop_shadow_1"),
        r.setAttribute("stdDeviation", "0"),
        (this.feGaussianBlur = r),
        t.appendChild(r);
      var s = createNS("feOffset");
      s.setAttribute("dx", "25"),
        s.setAttribute("dy", "0"),
        s.setAttribute("in", "drop_shadow_1"),
        s.setAttribute("result", "drop_shadow_2"),
        (this.feOffset = s),
        t.appendChild(s);
      var a = createNS("feFlood");
      a.setAttribute("flood-color", "#00ff00"),
        a.setAttribute("flood-opacity", "1"),
        a.setAttribute("result", "drop_shadow_3"),
        (this.feFlood = a),
        t.appendChild(a);
      var n = createNS("feComposite");
      n.setAttribute("in", "drop_shadow_3"),
        n.setAttribute("in2", "drop_shadow_2"),
        n.setAttribute("operator", "in"),
        n.setAttribute("result", "drop_shadow_4"),
        t.appendChild(n);
      var o,
        h = createNS("feMerge");
      t.appendChild(h),
        (o = createNS("feMergeNode")),
        h.appendChild(o),
        (o = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"),
        (this.feMergeNode = o),
        (this.feMerge = h),
        (this.originalNodeAdded = !1),
        h.appendChild(o);
    }
    (ShapeTransformManager.prototype = {
      addTransformSequence: function (t) {
        var e,
          i = t.length,
          r = "_";
        for (e = 0; e < i; e += 1) r += t[e].transform.key + "_";
        var s = this.sequences[r];
        return (
          s ||
            ((s = {
              transforms: [].concat(t),
              finalTransform: new Matrix(),
              _mdf: !1
            }),
            (this.sequences[r] = s),
            this.sequenceList.push(s)),
          s
        );
      },
      processSequence: function (t, e) {
        for (var i, r = 0, s = t.transforms.length, a = e; r < s && !e; ) {
          if (t.transforms[r].transform.mProps._mdf) {
            a = !0;
            break;
          }
          r += 1;
        }
        if (a)
          for (t.finalTransform.reset(), r = s - 1; 0 <= r; r -= 1)
            (i = t.transforms[r].transform.mProps.v.props),
              t.finalTransform.transform(
                i[0],
                i[1],
                i[2],
                i[3],
                i[4],
                i[5],
                i[6],
                i[7],
                i[8],
                i[9],
                i[10],
                i[11],
                i[12],
                i[13],
                i[14],
                i[15]
              );
        t._mdf = a;
      },
      processSequences: function (t) {
        var e,
          i = this.sequenceList.length;
        for (e = 0; e < i; e += 1)
          this.processSequence(this.sequenceList[e], t);
      },
      getNewKey: function () {
        return "_" + this.transform_key_count++;
      }
    }),
      (CVShapeData.prototype.setAsAnimated =
        SVGShapeData.prototype.setAsAnimated),
      (BaseElement.prototype = {
        checkMasks: function () {
          if (!this.data.hasMask) return !1;
          for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
            if (
              "n" !== this.data.masksProperties[t].mode &&
              !1 !== this.data.masksProperties[t].cl
            )
              return !0;
            t += 1;
          }
          return !1;
        },
        initExpressions: function () {
          (this.layerInterface = LayerExpressionInterface(this)),
            this.data.hasMask &&
              this.maskManager &&
              this.layerInterface.registerMaskInterface(this.maskManager);
          var t = EffectsExpressionInterface.createEffectsInterface(
            this,
            this.layerInterface
          );
          this.layerInterface.registerEffectsInterface(t),
            0 === this.data.ty || this.data.xt
              ? (this.compInterface = CompExpressionInterface(this))
              : 4 === this.data.ty
              ? ((this.layerInterface.shapeInterface = ShapeExpressionInterface(
                  this.shapesData,
                  this.itemsData,
                  this.layerInterface
                )),
                (this.layerInterface.content =
                  this.layerInterface.shapeInterface))
              : 5 === this.data.ty &&
                ((this.layerInterface.textInterface =
                  TextExpressionInterface(this)),
                (this.layerInterface.text = this.layerInterface.textInterface));
        },
        setBlendMode: function () {
          var t = getBlendMode(this.data.bm);
          (this.baseElement || this.layerElement).style["mix-blend-mode"] = t;
        },
        initBaseData: function (t, e, i) {
          (this.globalData = e),
            (this.comp = i),
            (this.data = t),
            (this.layerId = createElementID()),
            this.data.sr || (this.data.sr = 1),
            (this.effectsManager = new EffectsManager(
              this.data,
              this,
              this.dynamicProperties
            ));
        },
        getType: function () {
          return this.type;
        },
        sourceRectAtTime: function () {}
      }),
      (NullElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }),
      (NullElement.prototype.renderFrame = function () {}),
      (NullElement.prototype.getBaseElement = function () {
        return null;
      }),
      (NullElement.prototype.destroy = function () {}),
      (NullElement.prototype.sourceRectAtTime = function () {}),
      (NullElement.prototype.hide = function () {}),
      extendPrototype(
        [BaseElement, TransformElement, HierarchyElement, FrameElement],
        NullElement
      ),
      (SVGBaseElement.prototype = {
        initRendererElement: function () {
          this.layerElement = createNS("g");
        },
        createContainerElements: function () {
          (this.matteElement = createNS("g")),
            (this.transformedElement = this.layerElement),
            (this.maskedElement = this.layerElement),
            (this._sizeChanged = !1);
          var t,
            e,
            i,
            r = null;
          if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
              var s = createNS("mask");
              s.setAttribute("id", this.layerId),
                s.setAttribute(
                  "mask-type",
                  3 == this.data.td ? "luminance" : "alpha"
                ),
                s.appendChild(this.layerElement),
                (r = s),
                this.globalData.defs.appendChild(s),
                featureSupport.maskType ||
                  1 != this.data.td ||
                  (s.setAttribute("mask-type", "luminance"),
                  (t = createElementID()),
                  (e = filtersFactory.createFilter(t)),
                  this.globalData.defs.appendChild(e),
                  e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                  (i = createNS("g")).appendChild(this.layerElement),
                  (r = i),
                  s.appendChild(i),
                  i.setAttribute(
                    "filter",
                    "url(" + locationHref + "#" + t + ")"
                  ));
            } else if (2 == this.data.td) {
              var a = createNS("mask");
              a.setAttribute("id", this.layerId),
                a.setAttribute("mask-type", "alpha");
              var n = createNS("g");
              a.appendChild(n),
                (t = createElementID()),
                (e = filtersFactory.createFilter(t));
              var o = createNS("feComponentTransfer");
              o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
              var h = createNS("feFuncA");
              h.setAttribute("type", "table"),
                h.setAttribute("tableValues", "1.0 0.0"),
                o.appendChild(h),
                this.globalData.defs.appendChild(e);
              var l = createNS("rect");
              l.setAttribute("width", this.comp.data.w),
                l.setAttribute("height", this.comp.data.h),
                l.setAttribute("x", "0"),
                l.setAttribute("y", "0"),
                l.setAttribute("fill", "#ffffff"),
                l.setAttribute("opacity", "0"),
                n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"),
                n.appendChild(l),
                n.appendChild(this.layerElement),
                (r = n),
                featureSupport.maskType ||
                  (a.setAttribute("mask-type", "luminance"),
                  e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                  (i = createNS("g")),
                  n.appendChild(l),
                  i.appendChild(this.layerElement),
                  (r = i),
                  n.appendChild(i)),
                this.globalData.defs.appendChild(a);
            }
          } else
            this.data.tt
              ? (this.matteElement.appendChild(this.layerElement),
                (r = this.matteElement),
                (this.baseElement = this.matteElement))
              : (this.baseElement = this.layerElement);
          if (
            (this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
            this.data.cl &&
              this.layerElement.setAttribute("class", this.data.cl),
            0 === this.data.ty && !this.data.hd)
          ) {
            var p = createNS("clipPath"),
              m = createNS("path");
            m.setAttribute(
              "d",
              "M0,0 L" +
                this.data.w +
                ",0 L" +
                this.data.w +
                "," +
                this.data.h +
                " L0," +
                this.data.h +
                "z"
            );
            var f = createElementID();
            if (
              (p.setAttribute("id", f),
              p.appendChild(m),
              this.globalData.defs.appendChild(p),
              this.checkMasks())
            ) {
              var c = createNS("g");
              c.setAttribute(
                "clip-path",
                "url(" + locationHref + "#" + f + ")"
              ),
                c.appendChild(this.layerElement),
                (this.transformedElement = c),
                r
                  ? r.appendChild(this.transformedElement)
                  : (this.baseElement = this.transformedElement);
            } else
              this.layerElement.setAttribute(
                "clip-path",
                "url(" + locationHref + "#" + f + ")"
              );
          }
          0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function () {
          this.finalTransform._matMdf &&
            this.transformedElement.setAttribute(
              "transform",
              this.finalTransform.mat.to2dCSS()
            ),
            this.finalTransform._opMdf &&
              this.transformedElement.setAttribute(
                "opacity",
                this.finalTransform.mProp.o.v
              );
        },
        destroyBaseElement: function () {
          (this.layerElement = null),
            (this.matteElement = null),
            this.maskManager.destroy();
        },
        getBaseElement: function () {
          return this.data.hd ? null : this.baseElement;
        },
        createRenderableComponents: function () {
          (this.maskManager = new MaskElement(
            this.data,
            this,
            this.globalData
          )),
            (this.renderableEffectsManager = new SVGEffects(this));
        },
        setMatte: function (t) {
          this.matteElement &&
            this.matteElement.setAttribute(
              "mask",
              "url(" + locationHref + "#" + t + ")"
            );
        }
      }),
      (IShapeElement.prototype = {
        addShapeToModifiers: function (t) {
          var e,
            i = this.shapeModifiers.length;
          for (e = 0; e < i; e += 1) this.shapeModifiers[e].addShape(t);
        },
        isShapeInAnimatedModifiers: function (t) {
          for (var e = this.shapeModifiers.length; 0 < e; )
            if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
          return !1;
        },
        renderModifiers: function () {
          if (this.shapeModifiers.length) {
            var t,
              e = this.shapes.length;
            for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
            for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1)
              this.shapeModifiers[t].processShapes(this._isFirstFrame);
          }
        },
        lcEnum: { 1: "butt", 2: "round", 3: "square" },
        ljEnum: { 1: "miter", 2: "round", 3: "bevel" },
        searchProcessedElement: function (t) {
          for (var e = this.processedElements, i = 0, r = e.length; i < r; ) {
            if (e[i].elem === t) return e[i].pos;
            i += 1;
          }
          return 0;
        },
        addProcessedElement: function (t, e) {
          for (var i = this.processedElements, r = i.length; r; )
            if (i[(r -= 1)].elem === t) return void (i[r].pos = e);
          i.push(new ProcessedElement(t, e));
        },
        prepareFrame: function (t) {
          this.prepareRenderableFrame(t),
            this.prepareProperties(t, this.isInRange);
        }
      }),
      (ITextElement.prototype.initElement = function (t, e, i) {
        (this.lettersChangedFlag = !0),
          this.initFrame(),
          this.initBaseData(t, e, i),
          (this.textProperty = new TextProperty(
            this,
            t.t,
            this.dynamicProperties
          )),
          (this.textAnimator = new TextAnimatorProperty(
            t.t,
            this.renderType,
            this
          )),
          this.initTransform(t, e, i),
          this.initHierarchy(),
          this.initRenderable(),
          this.initRendererElement(),
          this.createContainerElements(),
          this.createRenderableComponents(),
          this.createContent(),
          this.hide(),
          this.textAnimator.searchProperties(this.dynamicProperties);
      }),
      (ITextElement.prototype.prepareFrame = function (t) {
        (this._mdf = !1),
          this.prepareRenderableFrame(t),
          this.prepareProperties(t, this.isInRange),
          (this.textProperty._mdf || this.textProperty._isFirstFrame) &&
            (this.buildNewText(),
            (this.textProperty._isFirstFrame = !1),
            (this.textProperty._mdf = !1));
      }),
      (ITextElement.prototype.createPathShape = function (t, e) {
        var i,
          r,
          s = e.length,
          a = "";
        for (i = 0; i < s; i += 1)
          (r = e[i].ks.k), (a += buildShapeString(r, r.i.length, !0, t));
        return a;
      }),
      (ITextElement.prototype.updateDocumentData = function (t, e) {
        this.textProperty.updateDocumentData(t, e);
      }),
      (ITextElement.prototype.canResizeFont = function (t) {
        this.textProperty.canResizeFont(t);
      }),
      (ITextElement.prototype.setMinimumFontSize = function (t) {
        this.textProperty.setMinimumFontSize(t);
      }),
      (ITextElement.prototype.applyTextPropertiesToMatrix = function (
        t,
        e,
        i,
        r,
        s
      ) {
        switch (
          (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0),
          e.translate(0, -t.ls, 0),
          t.j)
        ) {
          case 1:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]), 0, 0);
            break;
          case 2:
            e.translate(
              t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2,
              0,
              0
            );
        }
        e.translate(r, s, 0);
      }),
      (ITextElement.prototype.buildColor = function (t) {
        return (
          "rgb(" +
          Math.round(255 * t[0]) +
          "," +
          Math.round(255 * t[1]) +
          "," +
          Math.round(255 * t[2]) +
          ")"
        );
      }),
      (ITextElement.prototype.emptyProp = new LetterProps()),
      (ITextElement.prototype.destroy = function () {}),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement
        ],
        ICompElement
      ),
      (ICompElement.prototype.initElement = function (t, e, i) {
        this.initFrame(),
          this.initBaseData(t, e, i),
          this.initTransform(t, e, i),
          this.initRenderable(),
          this.initHierarchy(),
          this.initRendererElement(),
          this.createContainerElements(),
          this.createRenderableComponents(),
          (!this.data.xt && e.progressiveLoad) || this.buildAllItems(),
          this.hide();
      }),
      (ICompElement.prototype.prepareFrame = function (t) {
        if (
          ((this._mdf = !1),
          this.prepareRenderableFrame(t),
          this.prepareProperties(t, this.isInRange),
          this.isInRange || this.data.xt)
        ) {
          if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
          else {
            var e = this.tm.v;
            e === this.data.op && (e = this.data.op - 1),
              (this.renderedFrame = e);
          }
          var i,
            r = this.elements.length;
          for (
            this.completeLayers || this.checkLayers(this.renderedFrame),
              i = r - 1;
            0 <= i;
            i -= 1
          )
            (this.completeLayers || this.elements[i]) &&
              (this.elements[i].prepareFrame(
                this.renderedFrame - this.layers[i].st
              ),
              this.elements[i]._mdf && (this._mdf = !0));
        }
      }),
      (ICompElement.prototype.renderInnerContent = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1)
          (this.completeLayers || this.elements[t]) &&
            this.elements[t].renderFrame();
      }),
      (ICompElement.prototype.setElements = function (t) {
        this.elements = t;
      }),
      (ICompElement.prototype.getElements = function () {
        return this.elements;
      }),
      (ICompElement.prototype.destroyElements = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1)
          this.elements[t] && this.elements[t].destroy();
      }),
      (ICompElement.prototype.destroy = function () {
        this.destroyElements(), this.destroyBaseElement();
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          SVGBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement
        ],
        IImageElement
      ),
      (IImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData);
        (this.innerElem = createNS("image")),
          this.innerElem.setAttribute("width", this.assetData.w + "px"),
          this.innerElem.setAttribute("height", this.assetData.h + "px"),
          this.innerElem.setAttribute(
            "preserveAspectRatio",
            this.assetData.pr ||
              this.globalData.renderConfig.imagePreserveAspectRatio
          ),
          this.innerElem.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "href",
            t
          ),
          this.layerElement.appendChild(this.innerElem);
      }),
      (IImageElement.prototype.sourceRectAtTime = function () {
        return this.sourceRect;
      }),
      extendPrototype([IImageElement], ISolidElement),
      (ISolidElement.prototype.createContent = function () {
        var t = createNS("rect");
        t.setAttribute("width", this.data.sw),
          t.setAttribute("height", this.data.sh),
          t.setAttribute("fill", this.data.sc),
          this.layerElement.appendChild(t);
      }),
      extendPrototype(
        [SVGRenderer, ICompElement, SVGBaseElement],
        SVGCompElement
      ),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          SVGBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement,
          ITextElement
        ],
        SVGTextElement
      ),
      (SVGTextElement.prototype.createContent = function () {
        this.data.singleShape &&
          !this.globalData.fontManager.chars &&
          (this.textContainer = createNS("text"));
      }),
      (SVGTextElement.prototype.buildTextContents = function (t) {
        for (var e = 0, i = t.length, r = [], s = ""; e < i; )
          t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3)
            ? (r.push(s), (s = ""))
            : (s += t[e]),
            (e += 1);
        return r.push(s), r;
      }),
      (SVGTextElement.prototype.buildNewText = function () {
        var t,
          e,
          i = this.textProperty.currentData;
        (this.renderedLetters = createSizedArray(i ? i.l.length : 0)),
          i.fc
            ? this.layerElement.setAttribute("fill", this.buildColor(i.fc))
            : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"),
          i.sc &&
            (this.layerElement.setAttribute("stroke", this.buildColor(i.sc)),
            this.layerElement.setAttribute("stroke-width", i.sw)),
          this.layerElement.setAttribute("font-size", i.finalSize);
        var r = this.globalData.fontManager.getFontByName(i.f);
        if (r.fClass) this.layerElement.setAttribute("class", r.fClass);
        else {
          this.layerElement.setAttribute("font-family", r.fFamily);
          var s = i.fWeight,
            a = i.fStyle;
          this.layerElement.setAttribute("font-style", a),
            this.layerElement.setAttribute("font-weight", s);
        }
        this.layerElement.setAttribute("aria-label", i.t);
        var n,
          o = i.l || [],
          h = !!this.globalData.fontManager.chars;
        e = o.length;
        var l,
          p = this.mHelper,
          m = "",
          f = this.data.singleShape,
          c = 0,
          d = 0,
          u = !0,
          y = (i.tr / 1e3) * i.finalSize;
        if (!f || h || i.sz) {
          var g,
            v,
            b = this.textSpans.length;
          for (t = 0; t < e; t += 1)
            (h && f && 0 !== t) ||
              ((n = t < b ? this.textSpans[t] : createNS(h ? "path" : "text")),
              b <= t &&
                (n.setAttribute("stroke-linecap", "butt"),
                n.setAttribute("stroke-linejoin", "round"),
                n.setAttribute("stroke-miterlimit", "4"),
                (this.textSpans[t] = n),
                this.layerElement.appendChild(n)),
              (n.style.display = "inherit")),
              p.reset(),
              p.scale(i.finalSize / 100, i.finalSize / 100),
              f &&
                (o[t].n &&
                  ((c = -y), (d += i.yOffset), (d += u ? 1 : 0), (u = !1)),
                this.applyTextPropertiesToMatrix(i, p, o[t].line, c, d),
                (c += o[t].l || 0),
                (c += y)),
              h
                ? ((l = (g =
                    ((v = this.globalData.fontManager.getCharData(
                      i.finalText[t],
                      r.fStyle,
                      this.globalData.fontManager.getFontByName(i.f).fFamily
                    )) &&
                      v.data) ||
                    {}).shapes
                    ? g.shapes[0].it
                    : []),
                  f
                    ? (m += this.createPathShape(p, l))
                    : n.setAttribute("d", this.createPathShape(p, l)))
                : (f &&
                    n.setAttribute(
                      "transform",
                      "translate(" + p.props[12] + "," + p.props[13] + ")"
                    ),
                  (n.textContent = o[t].val),
                  n.setAttributeNS(
                    "http://www.w3.org/XML/1998/namespace",
                    "xml:space",
                    "preserve"
                  ));
          f && n && n.setAttribute("d", m);
        } else {
          var E = this.textContainer,
            x = "start";
          switch (i.j) {
            case 1:
              x = "end";
              break;
            case 2:
              x = "middle";
          }
          E.setAttribute("text-anchor", x), E.setAttribute("letter-spacing", y);
          var S = this.buildTextContents(i.finalText);
          for (
            e = S.length, d = i.ps ? i.ps[1] + i.ascent : 0, t = 0;
            t < e;
            t += 1
          )
            ((n = this.textSpans[t] || createNS("tspan")).textContent = S[t]),
              n.setAttribute("x", 0),
              n.setAttribute("y", d),
              (n.style.display = "inherit"),
              E.appendChild(n),
              (this.textSpans[t] = n),
              (d += i.finalLineHeight);
          this.layerElement.appendChild(E);
        }
        for (; t < this.textSpans.length; )
          (this.textSpans[t].style.display = "none"), (t += 1);
        this._sizeChanged = !0;
      }),
      (SVGTextElement.prototype.sourceRectAtTime = function (t) {
        if (
          (this.prepareFrame(this.comp.renderedFrame - this.data.st),
          this.renderInnerContent(),
          this._sizeChanged)
        ) {
          this._sizeChanged = !1;
          var e = this.layerElement.getBBox();
          this.bbox = { top: e.y, left: e.x, width: e.width, height: e.height };
        }
        return this.bbox;
      }),
      (SVGTextElement.prototype.renderInnerContent = function () {
        if (
          !this.data.singleShape &&
          (this.textAnimator.getMeasures(
            this.textProperty.currentData,
            this.lettersChangedFlag
          ),
          this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)
        ) {
          var t, e;
          this._sizeChanged = !0;
          var i,
            r,
            s = this.textAnimator.renderedLetters,
            a = this.textProperty.currentData.l;
          for (e = a.length, t = 0; t < e; t += 1)
            a[t].n ||
              ((i = s[t]),
              (r = this.textSpans[t]),
              i._mdf.m && r.setAttribute("transform", i.m),
              i._mdf.o && r.setAttribute("opacity", i.o),
              i._mdf.sw && r.setAttribute("stroke-width", i.sw),
              i._mdf.sc && r.setAttribute("stroke", i.sc),
              i._mdf.fc && r.setAttribute("fill", i.fc));
        }
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          SVGBaseElement,
          IShapeElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement
        ],
        SVGShapeElement
      ),
      (SVGShapeElement.prototype.initSecondaryElement = function () {}),
      (SVGShapeElement.prototype.identityMatrix = new Matrix()),
      (SVGShapeElement.prototype.buildExpressionInterface = function () {}),
      (SVGShapeElement.prototype.createContent = function () {
        this.searchShapes(
          this.shapesData,
          this.itemsData,
          this.prevViewData,
          this.layerElement,
          0,
          [],
          !0
        ),
          this.filterUniqueShapes();
      }),
      (SVGShapeElement.prototype.filterUniqueShapes = function () {
        var t,
          e,
          i,
          r,
          s = this.shapes.length,
          a = this.stylesList.length,
          n = [],
          o = !1;
        for (i = 0; i < a; i += 1) {
          for (r = this.stylesList[i], o = !1, t = n.length = 0; t < s; t += 1)
            -1 !== (e = this.shapes[t]).styles.indexOf(r) &&
              (n.push(e), (o = e._isAnimated || o));
          1 < n.length && o && this.setShapesAsAnimated(n);
        }
      }),
      (SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
        var e,
          i = t.length;
        for (e = 0; e < i; e += 1) t[e].setAsAnimated();
      }),
      (SVGShapeElement.prototype.createStyleElement = function (t, e) {
        var i,
          r = new SVGStyleData(t, e),
          s = r.pElem;
        if ("st" === t.ty) i = new SVGStrokeStyleData(this, t, r);
        else if ("fl" === t.ty) i = new SVGFillStyleData(this, t, r);
        else if ("gf" === t.ty || "gs" === t.ty) {
          (i = new (
            "gf" === t.ty
              ? SVGGradientFillStyleData
              : SVGGradientStrokeStyleData
          )(this, t, r)),
            this.globalData.defs.appendChild(i.gf),
            i.maskId &&
              (this.globalData.defs.appendChild(i.ms),
              this.globalData.defs.appendChild(i.of),
              s.setAttribute(
                "mask",
                "url(" + locationHref + "#" + i.maskId + ")"
              ));
        }
        return (
          ("st" !== t.ty && "gs" !== t.ty) ||
            (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"),
            s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"),
            s.setAttribute("fill-opacity", "0"),
            1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)),
          2 === t.r && s.setAttribute("fill-rule", "evenodd"),
          t.ln && s.setAttribute("id", t.ln),
          t.cl && s.setAttribute("class", t.cl),
          t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)),
          this.stylesList.push(r),
          this.addToAnimatedContents(t, i),
          i
        );
      }),
      (SVGShapeElement.prototype.createGroupElement = function (t) {
        var e = new ShapeGroupData();
        return (
          t.ln && e.gr.setAttribute("id", t.ln),
          t.cl && e.gr.setAttribute("class", t.cl),
          t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)),
          e
        );
      }),
      (SVGShapeElement.prototype.createTransformElement = function (t, e) {
        var i = TransformPropertyFactory.getTransformProperty(this, t, this),
          r = new SVGTransformData(i, i.o, e);
        return this.addToAnimatedContents(t, r), r;
      }),
      (SVGShapeElement.prototype.createShapeElement = function (t, e, i) {
        var r = 4;
        "rc" === t.ty
          ? (r = 5)
          : "el" === t.ty
          ? (r = 6)
          : "sr" === t.ty && (r = 7);
        var s = new SVGShapeData(
          e,
          i,
          ShapePropertyFactory.getShapeProp(this, t, r, this)
        );
        return (
          this.shapes.push(s),
          this.addShapeToModifiers(s),
          this.addToAnimatedContents(t, s),
          s
        );
      }),
      (SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
        for (var i = 0, r = this.animatedContents.length; i < r; ) {
          if (this.animatedContents[i].element === e) return;
          i += 1;
        }
        this.animatedContents.push({
          fn: SVGElementsRenderer.createRenderFunction(t),
          element: e,
          data: t
        });
      }),
      (SVGShapeElement.prototype.setElementStyles = function (t) {
        var e,
          i = t.styles,
          r = this.stylesList.length;
        for (e = 0; e < r; e += 1)
          this.stylesList[e].closed || i.push(this.stylesList[e]);
      }),
      (SVGShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
          e = this.itemsData.length;
        for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
        for (
          this.searchShapes(
            this.shapesData,
            this.itemsData,
            this.prevViewData,
            this.layerElement,
            0,
            [],
            !0
          ),
            this.filterUniqueShapes(),
            e = this.dynamicProperties.length,
            t = 0;
          t < e;
          t += 1
        )
          this.dynamicProperties[t].getValue();
        this.renderModifiers();
      }),
      (SVGShapeElement.prototype.searchShapes = function (t, e, i, r, s, a, n) {
        var o,
          h,
          l,
          p,
          m,
          f,
          c = [].concat(a),
          d = t.length - 1,
          u = [],
          y = [];
        for (o = d; 0 <= o; o -= 1) {
          if (
            ((f = this.searchProcessedElement(t[o]))
              ? (e[o] = i[f - 1])
              : (t[o]._render = n),
            "fl" == t[o].ty ||
              "st" == t[o].ty ||
              "gf" == t[o].ty ||
              "gs" == t[o].ty)
          )
            f
              ? (e[o].style.closed = !1)
              : (e[o] = this.createStyleElement(t[o], s)),
              t[o]._render && r.appendChild(e[o].style.pElem),
              u.push(e[o].style);
          else if ("gr" == t[o].ty) {
            if (f)
              for (l = e[o].it.length, h = 0; h < l; h += 1)
                e[o].prevViewData[h] = e[o].it[h];
            else e[o] = this.createGroupElement(t[o]);
            this.searchShapes(
              t[o].it,
              e[o].it,
              e[o].prevViewData,
              e[o].gr,
              s + 1,
              c,
              n
            ),
              t[o]._render && r.appendChild(e[o].gr);
          } else
            "tr" == t[o].ty
              ? (f || (e[o] = this.createTransformElement(t[o], r)),
                (p = e[o].transform),
                c.push(p))
              : "sh" == t[o].ty ||
                "rc" == t[o].ty ||
                "el" == t[o].ty ||
                "sr" == t[o].ty
              ? (f || (e[o] = this.createShapeElement(t[o], c, s)),
                this.setElementStyles(e[o]))
              : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty
              ? (f
                  ? ((m = e[o]).closed = !1)
                  : ((m = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]),
                    (e[o] = m),
                    this.shapeModifiers.push(m)),
                y.push(m))
              : "rp" == t[o].ty &&
                (f
                  ? ((m = e[o]).closed = !0)
                  : ((m = ShapeModifiers.getModifier(t[o].ty)),
                    (e[o] = m).init(this, t, o, e),
                    this.shapeModifiers.push(m),
                    (n = !1)),
                y.push(m));
          this.addProcessedElement(t[o], o + 1);
        }
        for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;
        for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0;
      }),
      (SVGShapeElement.prototype.renderInnerContent = function () {
        this.renderModifiers();
        var t,
          e = this.stylesList.length;
        for (t = 0; t < e; t += 1) this.stylesList[t].reset();
        for (this.renderShape(), t = 0; t < e; t += 1)
          (this.stylesList[t]._mdf || this._isFirstFrame) &&
            (this.stylesList[t].msElem &&
              (this.stylesList[t].msElem.setAttribute(
                "d",
                this.stylesList[t].d
              ),
              (this.stylesList[t].d = "M0 0" + this.stylesList[t].d)),
            this.stylesList[t].pElem.setAttribute(
              "d",
              this.stylesList[t].d || "M0 0"
            ));
      }),
      (SVGShapeElement.prototype.renderShape = function () {
        var t,
          e,
          i = this.animatedContents.length;
        for (t = 0; t < i; t += 1)
          (e = this.animatedContents[t]),
            (this._isFirstFrame || e.element._isAnimated) &&
              !0 !== e.data &&
              e.fn(e.data, e.element, this._isFirstFrame);
      }),
      (SVGShapeElement.prototype.destroy = function () {
        this.destroyBaseElement(),
          (this.shapesData = null),
          (this.itemsData = null);
      }),
      (SVGTintFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
            i = this.filterManager.effectElements[1].p.v,
            r = this.filterManager.effectElements[2].p.v / 100;
          this.matrixFilter.setAttribute(
            "values",
            i[0] -
              e[0] +
              " 0 0 0 " +
              e[0] +
              " " +
              (i[1] - e[1]) +
              " 0 0 0 " +
              e[1] +
              " " +
              (i[2] - e[2]) +
              " 0 0 0 " +
              e[2] +
              " 0 0 0 " +
              r +
              " 0"
          );
        }
      }),
      (SVGFillFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[2].p.v,
            i = this.filterManager.effectElements[6].p.v;
          this.matrixFilter.setAttribute(
            "values",
            "0 0 0 0 " +
              e[0] +
              " 0 0 0 0 " +
              e[1] +
              " 0 0 0 0 " +
              e[2] +
              " 0 0 0 " +
              i +
              " 0"
          );
        }
      }),
      (SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = 0.3 * this.filterManager.effectElements[0].p.v,
            i = this.filterManager.effectElements[1].p.v,
            r = 3 == i ? 0 : e,
            s = 2 == i ? 0 : e;
          this.feGaussianBlur.setAttribute("stdDeviation", r + " " + s);
          var a =
            1 == this.filterManager.effectElements[2].p.v
              ? "wrap"
              : "duplicate";
          this.feGaussianBlur.setAttribute("edgeMode", a);
        }
      }),
      (SVGStrokeEffect.prototype.initialize = function () {
        var t,
          e,
          i,
          r,
          s =
            this.elem.layerElement.children ||
            this.elem.layerElement.childNodes;
        for (
          1 === this.filterManager.effectElements[1].p.v
            ? ((r = this.elem.maskManager.masksProperties.length), (i = 0))
            : (r = (i = this.filterManager.effectElements[0].p.v - 1) + 1),
            (e = createNS("g")).setAttribute("fill", "none"),
            e.setAttribute("stroke-linecap", "round"),
            e.setAttribute("stroke-dashoffset", 1);
          i < r;
          i += 1
        )
          (t = createNS("path")),
            e.appendChild(t),
            this.paths.push({ p: t, m: i });
        if (3 === this.filterManager.effectElements[10].p.v) {
          var a = createNS("mask"),
            n = createElementID();
          a.setAttribute("id", n),
            a.setAttribute("mask-type", "alpha"),
            a.appendChild(e),
            this.elem.globalData.defs.appendChild(a);
          var o = createNS("g");
          for (
            o.setAttribute("mask", "url(" + locationHref + "#" + n + ")");
            s[0];

          )
            o.appendChild(s[0]);
          this.elem.layerElement.appendChild(o),
            (this.masker = a),
            e.setAttribute("stroke", "#fff");
        } else if (
          1 === this.filterManager.effectElements[10].p.v ||
          2 === this.filterManager.effectElements[10].p.v
        ) {
          if (2 === this.filterManager.effectElements[10].p.v)
            for (
              s =
                this.elem.layerElement.children ||
                this.elem.layerElement.childNodes;
              s.length;

            )
              this.elem.layerElement.removeChild(s[0]);
          this.elem.layerElement.appendChild(e),
            this.elem.layerElement.removeAttribute("mask"),
            e.setAttribute("stroke", "#fff");
        }
        (this.initialized = !0), (this.pathMasker = e);
      }),
      (SVGStrokeEffect.prototype.renderFrame = function (t) {
        this.initialized || this.initialize();
        var e,
          i,
          r,
          s = this.paths.length;
        for (e = 0; e < s; e += 1)
          if (
            -1 !== this.paths[e].m &&
            ((i = this.elem.maskManager.viewData[this.paths[e].m]),
            (r = this.paths[e].p),
            (t || this.filterManager._mdf || i.prop._mdf) &&
              r.setAttribute("d", i.lastPath),
            t ||
              this.filterManager.effectElements[9].p._mdf ||
              this.filterManager.effectElements[4].p._mdf ||
              this.filterManager.effectElements[7].p._mdf ||
              this.filterManager.effectElements[8].p._mdf ||
              i.prop._mdf)
          ) {
            var a;
            if (
              0 !== this.filterManager.effectElements[7].p.v ||
              100 !== this.filterManager.effectElements[8].p.v
            ) {
              var n =
                  Math.min(
                    this.filterManager.effectElements[7].p.v,
                    this.filterManager.effectElements[8].p.v
                  ) / 100,
                o =
                  Math.max(
                    this.filterManager.effectElements[7].p.v,
                    this.filterManager.effectElements[8].p.v
                  ) / 100,
                h = r.getTotalLength();
              a = "0 0 0 " + h * n + " ";
              var l,
                p = h * (o - n),
                m =
                  1 +
                  (2 *
                    this.filterManager.effectElements[4].p.v *
                    this.filterManager.effectElements[9].p.v) /
                    100,
                f = Math.floor(p / m);
              for (l = 0; l < f; l += 1)
                a +=
                  "1 " +
                  (2 *
                    this.filterManager.effectElements[4].p.v *
                    this.filterManager.effectElements[9].p.v) /
                    100 +
                  " ";
              a += "0 " + 10 * h + " 0 0";
            } else
              a =
                "1 " +
                (2 *
                  this.filterManager.effectElements[4].p.v *
                  this.filterManager.effectElements[9].p.v) /
                  100;
            r.setAttribute("stroke-dasharray", a);
          }
        if (
          ((t || this.filterManager.effectElements[4].p._mdf) &&
            this.pathMasker.setAttribute(
              "stroke-width",
              2 * this.filterManager.effectElements[4].p.v
            ),
          (t || this.filterManager.effectElements[6].p._mdf) &&
            this.pathMasker.setAttribute(
              "opacity",
              this.filterManager.effectElements[6].p.v
            ),
          (1 === this.filterManager.effectElements[10].p.v ||
            2 === this.filterManager.effectElements[10].p.v) &&
            (t || this.filterManager.effectElements[3].p._mdf))
        ) {
          var c = this.filterManager.effectElements[3].p.v;
          this.pathMasker.setAttribute(
            "stroke",
            "rgb(" +
              bm_floor(255 * c[0]) +
              "," +
              bm_floor(255 * c[1]) +
              "," +
              bm_floor(255 * c[2]) +
              ")"
          );
        }
      }),
      (SVGTritoneFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
            i = this.filterManager.effectElements[1].p.v,
            r = this.filterManager.effectElements[2].p.v,
            s = r[0] + " " + i[0] + " " + e[0],
            a = r[1] + " " + i[1] + " " + e[1],
            n = r[2] + " " + i[2] + " " + e[2];
          this.feFuncR.setAttribute("tableValues", s),
            this.feFuncG.setAttribute("tableValues", a),
            this.feFuncB.setAttribute("tableValues", n);
        }
      }),
      (SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
        var i = createNS(t);
        return i.setAttribute("type", "table"), e.appendChild(i), i;
      }),
      (SVGProLevelsFilter.prototype.getTableValue = function (t, e, i, r, s) {
        for (
          var a,
            n,
            o = 0,
            h = Math.min(t, e),
            l = Math.max(t, e),
            p = Array.call(null, { length: 256 }),
            m = 0,
            f = s - r,
            c = e - t;
          o <= 256;

        )
          (n =
            (a = o / 256) <= h
              ? c < 0
                ? s
                : r
              : l <= a
              ? c < 0
                ? r
                : s
              : r + f * Math.pow((a - t) / c, 1 / i)),
            (p[m++] = n),
            (o += 256 / 255);
        return p.join(" ");
      }),
      (SVGProLevelsFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e,
            i = this.filterManager.effectElements;
          this.feFuncRComposed &&
            (t ||
              i[3].p._mdf ||
              i[4].p._mdf ||
              i[5].p._mdf ||
              i[6].p._mdf ||
              i[7].p._mdf) &&
            ((e = this.getTableValue(
              i[3].p.v,
              i[4].p.v,
              i[5].p.v,
              i[6].p.v,
              i[7].p.v
            )),
            this.feFuncRComposed.setAttribute("tableValues", e),
            this.feFuncGComposed.setAttribute("tableValues", e),
            this.feFuncBComposed.setAttribute("tableValues", e)),
            this.feFuncR &&
              (t ||
                i[10].p._mdf ||
                i[11].p._mdf ||
                i[12].p._mdf ||
                i[13].p._mdf ||
                i[14].p._mdf) &&
              ((e = this.getTableValue(
                i[10].p.v,
                i[11].p.v,
                i[12].p.v,
                i[13].p.v,
                i[14].p.v
              )),
              this.feFuncR.setAttribute("tableValues", e)),
            this.feFuncG &&
              (t ||
                i[17].p._mdf ||
                i[18].p._mdf ||
                i[19].p._mdf ||
                i[20].p._mdf ||
                i[21].p._mdf) &&
              ((e = this.getTableValue(
                i[17].p.v,
                i[18].p.v,
                i[19].p.v,
                i[20].p.v,
                i[21].p.v
              )),
              this.feFuncG.setAttribute("tableValues", e)),
            this.feFuncB &&
              (t ||
                i[24].p._mdf ||
                i[25].p._mdf ||
                i[26].p._mdf ||
                i[27].p._mdf ||
                i[28].p._mdf) &&
              ((e = this.getTableValue(
                i[24].p.v,
                i[25].p.v,
                i[26].p.v,
                i[27].p.v,
                i[28].p.v
              )),
              this.feFuncB.setAttribute("tableValues", e)),
            this.feFuncA &&
              (t ||
                i[31].p._mdf ||
                i[32].p._mdf ||
                i[33].p._mdf ||
                i[34].p._mdf ||
                i[35].p._mdf) &&
              ((e = this.getTableValue(
                i[31].p.v,
                i[32].p.v,
                i[33].p.v,
                i[34].p.v,
                i[35].p.v
              )),
              this.feFuncA.setAttribute("tableValues", e));
        }
      }),
      (SVGDropShadowEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          if (
            ((t || this.filterManager.effectElements[4].p._mdf) &&
              this.feGaussianBlur.setAttribute(
                "stdDeviation",
                this.filterManager.effectElements[4].p.v / 4
              ),
            t || this.filterManager.effectElements[0].p._mdf)
          ) {
            var e = this.filterManager.effectElements[0].p.v;
            this.feFlood.setAttribute(
              "flood-color",
              rgbToHex(
                Math.round(255 * e[0]),
                Math.round(255 * e[1]),
                Math.round(255 * e[2])
              )
            );
          }
          if (
            ((t || this.filterManager.effectElements[1].p._mdf) &&
              this.feFlood.setAttribute(
                "flood-opacity",
                this.filterManager.effectElements[1].p.v / 255
              ),
            t ||
              this.filterManager.effectElements[2].p._mdf ||
              this.filterManager.effectElements[3].p._mdf)
          ) {
            var i = this.filterManager.effectElements[3].p.v,
              r = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
              s = i * Math.cos(r),
              a = i * Math.sin(r);
            this.feOffset.setAttribute("dx", s),
              this.feOffset.setAttribute("dy", a);
          }
        }
      });
    var _svgMatteSymbols = [];
    function SVGMatte3Effect(t, e, i) {
      (this.initialized = !1),
        (this.filterManager = e),
        (this.filterElem = t),
        ((this.elem = i).matteElement = createNS("g")),
        i.matteElement.appendChild(i.layerElement),
        i.matteElement.appendChild(i.transformedElement),
        (i.baseElement = i.matteElement);
    }
    function SVGEffects(t) {
      var e,
        i,
        r = t.data.ef ? t.data.ef.length : 0,
        s = createElementID(),
        a = filtersFactory.createFilter(s),
        n = 0;
      for (this.filters = [], e = 0; e < r; e += 1)
        (i = null),
          20 === t.data.ef[e].ty
            ? ((n += 1),
              (i = new SVGTintFilter(a, t.effectsManager.effectElements[e])))
            : 21 === t.data.ef[e].ty
            ? ((n += 1),
              (i = new SVGFillFilter(a, t.effectsManager.effectElements[e])))
            : 22 === t.data.ef[e].ty
            ? (i = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]))
            : 23 === t.data.ef[e].ty
            ? ((n += 1),
              (i = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])))
            : 24 === t.data.ef[e].ty
            ? ((n += 1),
              (i = new SVGProLevelsFilter(
                a,
                t.effectsManager.effectElements[e]
              )))
            : 25 === t.data.ef[e].ty
            ? ((n += 1),
              (i = new SVGDropShadowEffect(
                a,
                t.effectsManager.effectElements[e]
              )))
            : 28 === t.data.ef[e].ty
            ? (i = new SVGMatte3Effect(
                a,
                t.effectsManager.effectElements[e],
                t
              ))
            : 29 === t.data.ef[e].ty &&
              ((n += 1),
              (i = new SVGGaussianBlurEffect(
                a,
                t.effectsManager.effectElements[e]
              ))),
          i && this.filters.push(i);
      n &&
        (t.globalData.defs.appendChild(a),
        t.layerElement.setAttribute(
          "filter",
          "url(" + locationHref + "#" + s + ")"
        )),
        this.filters.length && t.addRenderableComponent(this);
    }
    function CVContextData() {
      (this.saved = []),
        (this.cArrPos = 0),
        (this.cTr = new Matrix()),
        (this.cO = 1);
      var t;
      for (
        this.savedOp = createTypedArray("float32", 15), t = 0;
        t < 15;
        t += 1
      )
        this.saved[t] = createTypedArray("float32", 16);
      this._length = 15;
    }
    function CVBaseElement() {}
    function CVImageElement(t, e, i) {
      (this.assetData = e.getAssetData(t.refId)),
        (this.img = e.imageLoader.getImage(this.assetData)),
        this.initElement(t, e, i);
    }
    function CVCompElement(t, e, i) {
      (this.completeLayers = !1),
        (this.layers = t.layers),
        (this.pendingElements = []),
        (this.elements = createSizedArray(this.layers.length)),
        this.initElement(t, e, i),
        (this.tm = t.tm
          ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this)
          : { _placeholder: !0 });
    }
    function CVMaskElement(t, e) {
      (this.data = t),
        (this.element = e),
        (this.masksProperties = this.data.masksProperties || []),
        (this.viewData = createSizedArray(this.masksProperties.length));
      var i,
        r = this.masksProperties.length,
        s = !1;
      for (i = 0; i < r; i++)
        "n" !== this.masksProperties[i].mode && (s = !0),
          (this.viewData[i] = ShapePropertyFactory.getShapeProp(
            this.element,
            this.masksProperties[i],
            3
          ));
      (this.hasMasks = s) && this.element.addRenderableComponent(this);
    }
    function CVShapeElement(t, e, i) {
      (this.shapes = []),
        (this.shapesData = t.shapes),
        (this.stylesList = []),
        (this.itemsData = []),
        (this.prevViewData = []),
        (this.shapeModifiers = []),
        (this.processedElements = []),
        (this.transformsManager = new ShapeTransformManager()),
        this.initElement(t, e, i);
    }
    function CVSolidElement(t, e, i) {
      this.initElement(t, e, i);
    }
    function CVTextElement(t, e, i) {
      (this.textSpans = []),
        (this.yOffset = 0),
        (this.fillColorAnim = !1),
        (this.strokeColorAnim = !1),
        (this.strokeWidthAnim = !1),
        (this.stroke = !1),
        (this.fill = !1),
        (this.justifyOffset = 0),
        (this.currentRender = null),
        (this.renderType = "canvas"),
        (this.values = {
          fill: "rgba(0,0,0,0)",
          stroke: "rgba(0,0,0,0)",
          sWidth: 0,
          fValue: ""
        }),
        this.initElement(t, e, i);
    }
    function CVEffects() {}
    function HBaseElement(t, e, i) {}
    function HSolidElement(t, e, i) {
      this.initElement(t, e, i);
    }
    function HCompElement(t, e, i) {
      (this.layers = t.layers),
        (this.supports3d = !t.hasMask),
        (this.completeLayers = !1),
        (this.pendingElements = []),
        (this.elements = this.layers
          ? createSizedArray(this.layers.length)
          : []),
        this.initElement(t, e, i),
        (this.tm = t.tm
          ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this)
          : { _placeholder: !0 });
    }
    function HShapeElement(t, e, i) {
      (this.shapes = []),
        (this.shapesData = t.shapes),
        (this.stylesList = []),
        (this.shapeModifiers = []),
        (this.itemsData = []),
        (this.processedElements = []),
        (this.animatedContents = []),
        (this.shapesContainer = createNS("g")),
        this.initElement(t, e, i),
        (this.prevViewData = []),
        (this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 });
    }
    function HTextElement(t, e, i) {
      (this.textSpans = []),
        (this.textPaths = []),
        (this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 }),
        (this.renderType = "svg"),
        (this.isMasked = !1),
        this.initElement(t, e, i);
    }
    function HImageElement(t, e, i) {
      (this.assetData = e.getAssetData(t.refId)), this.initElement(t, e, i);
    }
    function HCameraElement(t, e, i) {
      this.initFrame(), this.initBaseData(t, e, i), this.initHierarchy();
      var r = PropertyFactory.getProp;
      if (
        ((this.pe = r(this, t.pe, 0, 0, this)),
        t.ks.p.s
          ? ((this.px = r(this, t.ks.p.x, 1, 0, this)),
            (this.py = r(this, t.ks.p.y, 1, 0, this)),
            (this.pz = r(this, t.ks.p.z, 1, 0, this)))
          : (this.p = r(this, t.ks.p, 1, 0, this)),
        t.ks.a && (this.a = r(this, t.ks.a, 1, 0, this)),
        t.ks.or.k.length && t.ks.or.k[0].to)
      ) {
        var s,
          a = t.ks.or.k.length;
        for (s = 0; s < a; s += 1)
          (t.ks.or.k[s].to = null), (t.ks.or.k[s].ti = null);
      }
      (this.or = r(this, t.ks.or, 1, degToRads, this)),
        (this.or.sh = !0),
        (this.rx = r(this, t.ks.rx, 0, degToRads, this)),
        (this.ry = r(this, t.ks.ry, 0, degToRads, this)),
        (this.rz = r(this, t.ks.rz, 0, degToRads, this)),
        (this.mat = new Matrix()),
        (this._prevMat = new Matrix()),
        (this._isFirstFrame = !0),
        (this.finalTransform = { mProp: this });
    }
    function HEffects() {}
    (SVGMatte3Effect.prototype.findSymbol = function (t) {
      for (var e = 0, i = _svgMatteSymbols.length; e < i; ) {
        if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
        e += 1;
      }
      return null;
    }),
      (SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
        var i = t.layerElement.parentNode;
        if (i) {
          for (
            var r, s = i.children, a = 0, n = s.length;
            a < n && s[a] !== t.layerElement;

          )
            a += 1;
          a <= n - 2 && (r = s[a + 1]);
          var o = createNS("use");
          o.setAttribute("href", "#" + e),
            r ? i.insertBefore(o, r) : i.appendChild(o);
        }
      }),
      (SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
        if (!this.findSymbol(e)) {
          var i = createElementID(),
            r = createNS("mask");
          r.setAttribute("id", e.layerId),
            r.setAttribute("mask-type", "alpha"),
            _svgMatteSymbols.push(e);
          var s = t.globalData.defs;
          s.appendChild(r);
          var a = createNS("symbol");
          a.setAttribute("id", i),
            this.replaceInParent(e, i),
            a.appendChild(e.layerElement),
            s.appendChild(a);
          var n = createNS("use");
          n.setAttribute("href", "#" + i),
            r.appendChild(n),
            (e.data.hd = !1),
            e.show();
        }
        t.setMatte(e.layerId);
      }),
      (SVGMatte3Effect.prototype.initialize = function () {
        for (
          var t = this.filterManager.effectElements[0].p.v,
            e = this.elem.comp.elements,
            i = 0,
            r = e.length;
          i < r;

        )
          e[i] && e[i].data.ind === t && this.setElementAsMask(this.elem, e[i]),
            (i += 1);
        this.initialized = !0;
      }),
      (SVGMatte3Effect.prototype.renderFrame = function () {
        this.initialized || this.initialize();
      }),
      (SVGEffects.prototype.renderFrame = function (t) {
        var e,
          i = this.filters.length;
        for (e = 0; e < i; e += 1) this.filters[e].renderFrame(t);
      }),
      (CVContextData.prototype.duplicate = function () {
        var t = 2 * this._length,
          e = this.savedOp;
        (this.savedOp = createTypedArray("float32", t)), this.savedOp.set(e);
        var i = 0;
        for (i = this._length; i < t; i += 1)
          this.saved[i] = createTypedArray("float32", 16);
        this._length = t;
      }),
      (CVContextData.prototype.reset = function () {
        (this.cArrPos = 0), this.cTr.reset(), (this.cO = 1);
      }),
      (CVBaseElement.prototype = {
        createElements: function () {},
        initRendererElement: function () {},
        createContainerElements: function () {
          (this.canvasContext = this.globalData.canvasContext),
            (this.renderableEffectsManager = new CVEffects(this));
        },
        createContent: function () {},
        setBlendMode: function () {
          var t = this.globalData;
          if (t.blendMode !== this.data.bm) {
            t.blendMode = this.data.bm;
            var e = getBlendMode(this.data.bm);
            t.canvasContext.globalCompositeOperation = e;
          }
        },
        createRenderableComponents: function () {
          this.maskManager = new CVMaskElement(this.data, this);
        },
        hideElement: function () {
          this.hidden ||
            (this.isInRange && !this.isTransparent) ||
            (this.hidden = !0);
        },
        showElement: function () {
          this.isInRange &&
            !this.isTransparent &&
            ((this.hidden = !1),
            (this._isFirstFrame = !0),
            (this.maskManager._isFirstFrame = !0));
        },
        renderFrame: function () {
          if (!this.hidden && !this.data.hd) {
            this.renderTransform(),
              this.renderRenderable(),
              this.setBlendMode();
            var t = 0 === this.data.ty;
            this.globalData.renderer.save(t),
              this.globalData.renderer.ctxTransform(
                this.finalTransform.mat.props
              ),
              this.globalData.renderer.ctxOpacity(
                this.finalTransform.mProp.o.v
              ),
              this.renderInnerContent(),
              this.globalData.renderer.restore(t),
              this.maskManager.hasMasks && this.globalData.renderer.restore(!0),
              this._isFirstFrame && (this._isFirstFrame = !1);
          }
        },
        destroy: function () {
          (this.canvasContext = null),
            (this.data = null),
            (this.globalData = null),
            this.maskManager.destroy();
        },
        mHelper: new Matrix()
      }),
      (CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement),
      (CVBaseElement.prototype.show = CVBaseElement.prototype.showElement),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          CVBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableElement
        ],
        CVImageElement
      ),
      (CVImageElement.prototype.initElement =
        SVGShapeElement.prototype.initElement),
      (CVImageElement.prototype.prepareFrame =
        IImageElement.prototype.prepareFrame),
      (CVImageElement.prototype.createContent = function () {
        if (
          this.img.width &&
          (this.assetData.w !== this.img.width ||
            this.assetData.h !== this.img.height)
        ) {
          var t = createTag("canvas");
          (t.width = this.assetData.w), (t.height = this.assetData.h);
          var e,
            i,
            r = t.getContext("2d"),
            s = this.img.width,
            a = this.img.height,
            n = s / a,
            o = this.assetData.w / this.assetData.h,
            h =
              this.assetData.pr ||
              this.globalData.renderConfig.imagePreserveAspectRatio;
          (o < n && "xMidYMid slice" === h) || (n < o && "xMidYMid slice" !== h)
            ? (e = (i = a) * o)
            : (i = (e = s) / o),
            r.drawImage(
              this.img,
              (s - e) / 2,
              (a - i) / 2,
              e,
              i,
              0,
              0,
              this.assetData.w,
              this.assetData.h
            ),
            (this.img = t);
        }
      }),
      (CVImageElement.prototype.renderInnerContent = function (t) {
        this.canvasContext.drawImage(this.img, 0, 0);
      }),
      (CVImageElement.prototype.destroy = function () {
        this.img = null;
      }),
      extendPrototype(
        [CanvasRenderer, ICompElement, CVBaseElement],
        CVCompElement
      ),
      (CVCompElement.prototype.renderInnerContent = function () {
        var t,
          e = this.canvasContext;
        for (
          e.beginPath(),
            e.moveTo(0, 0),
            e.lineTo(this.data.w, 0),
            e.lineTo(this.data.w, this.data.h),
            e.lineTo(0, this.data.h),
            e.lineTo(0, 0),
            e.clip(),
            t = this.layers.length - 1;
          0 <= t;
          t -= 1
        )
          (this.completeLayers || this.elements[t]) &&
            this.elements[t].renderFrame();
      }),
      (CVCompElement.prototype.destroy = function () {
        var t;
        for (t = this.layers.length - 1; 0 <= t; t -= 1)
          this.elements[t] && this.elements[t].destroy();
        (this.layers = null), (this.elements = null);
      }),
      (CVMaskElement.prototype.renderFrame = function () {
        if (this.hasMasks) {
          var t,
            e,
            i,
            r,
            s = this.element.finalTransform.mat,
            a = this.element.canvasContext,
            n = this.masksProperties.length;
          for (a.beginPath(), t = 0; t < n; t++)
            if ("n" !== this.masksProperties[t].mode) {
              this.masksProperties[t].inv &&
                (a.moveTo(0, 0),
                a.lineTo(this.element.globalData.compSize.w, 0),
                a.lineTo(
                  this.element.globalData.compSize.w,
                  this.element.globalData.compSize.h
                ),
                a.lineTo(0, this.element.globalData.compSize.h),
                a.lineTo(0, 0)),
                (r = this.viewData[t].v),
                (e = s.applyToPointArray(r.v[0][0], r.v[0][1], 0)),
                a.moveTo(e[0], e[1]);
              var o,
                h = r._length;
              for (o = 1; o < h; o++)
                (i = s.applyToTriplePoints(r.o[o - 1], r.i[o], r.v[o])),
                  a.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
              (i = s.applyToTriplePoints(r.o[o - 1], r.i[0], r.v[0])),
                a.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
            }
          this.element.globalData.renderer.save(!0), a.clip();
        }
      }),
      (CVMaskElement.prototype.getMaskProperty =
        MaskElement.prototype.getMaskProperty),
      (CVMaskElement.prototype.destroy = function () {
        this.element = null;
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          CVBaseElement,
          IShapeElement,
          HierarchyElement,
          FrameElement,
          RenderableElement
        ],
        CVShapeElement
      ),
      (CVShapeElement.prototype.initElement =
        RenderableDOMElement.prototype.initElement),
      (CVShapeElement.prototype.transformHelper = { opacity: 1, _opMdf: !1 }),
      (CVShapeElement.prototype.dashResetter = []),
      (CVShapeElement.prototype.createContent = function () {
        this.searchShapes(
          this.shapesData,
          this.itemsData,
          this.prevViewData,
          !0,
          []
        );
      }),
      (CVShapeElement.prototype.createStyleElement = function (t, e) {
        var i = {
            data: t,
            type: t.ty,
            preTransforms: this.transformsManager.addTransformSequence(e),
            transforms: [],
            elements: [],
            closed: !0 === t.hd
          },
          r = {};
        if (
          ("fl" == t.ty || "st" == t.ty
            ? ((r.c = PropertyFactory.getProp(this, t.c, 1, 255, this)),
              r.c.k ||
                (i.co =
                  "rgb(" +
                  bm_floor(r.c.v[0]) +
                  "," +
                  bm_floor(r.c.v[1]) +
                  "," +
                  bm_floor(r.c.v[2]) +
                  ")"))
            : ("gf" !== t.ty && "gs" !== t.ty) ||
              ((r.s = PropertyFactory.getProp(this, t.s, 1, null, this)),
              (r.e = PropertyFactory.getProp(this, t.e, 1, null, this)),
              (r.h = PropertyFactory.getProp(
                this,
                t.h || { k: 0 },
                0,
                0.01,
                this
              )),
              (r.a = PropertyFactory.getProp(
                this,
                t.a || { k: 0 },
                0,
                degToRads,
                this
              )),
              (r.g = new GradientProperty(this, t.g, this))),
          (r.o = PropertyFactory.getProp(this, t.o, 0, 0.01, this)),
          "st" == t.ty || "gs" == t.ty)
        ) {
          if (
            ((i.lc = this.lcEnum[t.lc] || "round"),
            (i.lj = this.ljEnum[t.lj] || "round"),
            1 == t.lj && (i.ml = t.ml),
            (r.w = PropertyFactory.getProp(this, t.w, 0, null, this)),
            r.w.k || (i.wi = r.w.v),
            t.d)
          ) {
            var s = new DashProperty(this, t.d, "canvas", this);
            (r.d = s),
              r.d.k || ((i.da = r.d.dashArray), (i.do = r.d.dashoffset[0]));
          }
        } else i.r = 2 === t.r ? "evenodd" : "nonzero";
        return this.stylesList.push(i), (r.style = i), r;
      }),
      (CVShapeElement.prototype.createGroupElement = function (t) {
        return { it: [], prevViewData: [] };
      }),
      (CVShapeElement.prototype.createTransformElement = function (t) {
        return {
          transform: {
            opacity: 1,
            _opMdf: !1,
            key: this.transformsManager.getNewKey(),
            op: PropertyFactory.getProp(this, t.o, 0, 0.01, this),
            mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
          }
        };
      }),
      (CVShapeElement.prototype.createShapeElement = function (t) {
        var e = new CVShapeData(
          this,
          t,
          this.stylesList,
          this.transformsManager
        );
        return this.shapes.push(e), this.addShapeToModifiers(e), e;
      }),
      (CVShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
          e = this.itemsData.length;
        for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
        for (
          this.searchShapes(
            this.shapesData,
            this.itemsData,
            this.prevViewData,
            !0,
            []
          ),
            e = this.dynamicProperties.length,
            t = 0;
          t < e;
          t += 1
        )
          this.dynamicProperties[t].getValue();
        this.renderModifiers(),
          this.transformsManager.processSequences(this._isFirstFrame);
      }),
      (CVShapeElement.prototype.addTransformToStyleList = function (t) {
        var e,
          i = this.stylesList.length;
        for (e = 0; e < i; e += 1)
          this.stylesList[e].closed || this.stylesList[e].transforms.push(t);
      }),
      (CVShapeElement.prototype.removeTransformFromStyleList = function () {
        var t,
          e = this.stylesList.length;
        for (t = 0; t < e; t += 1)
          this.stylesList[t].closed || this.stylesList[t].transforms.pop();
      }),
      (CVShapeElement.prototype.closeStyles = function (t) {
        var e,
          i = t.length;
        for (e = 0; e < i; e += 1) t[e].closed = !0;
      }),
      (CVShapeElement.prototype.searchShapes = function (t, e, i, r, s) {
        var a,
          n,
          o,
          h,
          l,
          p,
          m = t.length - 1,
          f = [],
          c = [],
          d = [].concat(s);
        for (a = m; 0 <= a; a -= 1) {
          if (
            ((h = this.searchProcessedElement(t[a]))
              ? (e[a] = i[h - 1])
              : (t[a]._shouldRender = r),
            "fl" == t[a].ty ||
              "st" == t[a].ty ||
              "gf" == t[a].ty ||
              "gs" == t[a].ty)
          )
            h
              ? (e[a].style.closed = !1)
              : (e[a] = this.createStyleElement(t[a], d)),
              f.push(e[a].style);
          else if ("gr" == t[a].ty) {
            if (h)
              for (o = e[a].it.length, n = 0; n < o; n += 1)
                e[a].prevViewData[n] = e[a].it[n];
            else e[a] = this.createGroupElement(t[a]);
            this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, r, d);
          } else
            "tr" == t[a].ty
              ? (h || ((p = this.createTransformElement(t[a])), (e[a] = p)),
                d.push(e[a]),
                this.addTransformToStyleList(e[a]))
              : "sh" == t[a].ty ||
                "rc" == t[a].ty ||
                "el" == t[a].ty ||
                "sr" == t[a].ty
              ? h || (e[a] = this.createShapeElement(t[a]))
              : "tm" == t[a].ty || "rd" == t[a].ty
              ? (h
                  ? ((l = e[a]).closed = !1)
                  : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]),
                    (e[a] = l),
                    this.shapeModifiers.push(l)),
                c.push(l))
              : "rp" == t[a].ty &&
                (h
                  ? ((l = e[a]).closed = !0)
                  : ((l = ShapeModifiers.getModifier(t[a].ty)),
                    (e[a] = l).init(this, t, a, e),
                    this.shapeModifiers.push(l),
                    (r = !1)),
                c.push(l));
          this.addProcessedElement(t[a], a + 1);
        }
        for (
          this.removeTransformFromStyleList(),
            this.closeStyles(f),
            m = c.length,
            a = 0;
          a < m;
          a += 1
        )
          c[a].closed = !0;
      }),
      (CVShapeElement.prototype.renderInnerContent = function () {
        (this.transformHelper.opacity = 1),
          (this.transformHelper._opMdf = !1),
          this.renderModifiers(),
          this.transformsManager.processSequences(this._isFirstFrame),
          this.renderShape(
            this.transformHelper,
            this.shapesData,
            this.itemsData,
            !0
          );
      }),
      (CVShapeElement.prototype.renderShapeTransform = function (t, e) {
        (t._opMdf || e.op._mdf || this._isFirstFrame) &&
          ((e.opacity = t.opacity), (e.opacity *= e.op.v), (e._opMdf = !0));
      }),
      (CVShapeElement.prototype.drawLayer = function () {
        var t,
          e,
          i,
          r,
          s,
          a,
          n,
          o,
          h,
          l = this.stylesList.length,
          p = this.globalData.renderer,
          m = this.globalData.canvasContext;
        for (t = 0; t < l; t += 1)
          if (
            (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o) ||
              0 !== h.wi) &&
            h.data._shouldRender &&
            0 !== h.coOp &&
            0 !== this.globalData.currentGlobalAlpha
          ) {
            for (
              p.save(),
                a = h.elements,
                "st" === o || "gs" === o
                  ? ((m.strokeStyle = "st" === o ? h.co : h.grd),
                    (m.lineWidth = h.wi),
                    (m.lineCap = h.lc),
                    (m.lineJoin = h.lj),
                    (m.miterLimit = h.ml || 0))
                  : (m.fillStyle = "fl" === o ? h.co : h.grd),
                p.ctxOpacity(h.coOp),
                "st" !== o && "gs" !== o && m.beginPath(),
                p.ctxTransform(h.preTransforms.finalTransform.props),
                i = a.length,
                e = 0;
              e < i;
              e += 1
            ) {
              for (
                ("st" !== o && "gs" !== o) ||
                  (m.beginPath(),
                  h.da && (m.setLineDash(h.da), (m.lineDashOffset = h.do))),
                  s = (n = a[e].trNodes).length,
                  r = 0;
                r < s;
                r += 1
              )
                "m" == n[r].t
                  ? m.moveTo(n[r].p[0], n[r].p[1])
                  : "c" == n[r].t
                  ? m.bezierCurveTo(
                      n[r].pts[0],
                      n[r].pts[1],
                      n[r].pts[2],
                      n[r].pts[3],
                      n[r].pts[4],
                      n[r].pts[5]
                    )
                  : m.closePath();
              ("st" !== o && "gs" !== o) ||
                (m.stroke(), h.da && m.setLineDash(this.dashResetter));
            }
            "st" !== o && "gs" !== o && m.fill(h.r), p.restore();
          }
      }),
      (CVShapeElement.prototype.renderShape = function (t, e, i, r) {
        var s, a;
        for (a = t, s = e.length - 1; 0 <= s; s -= 1)
          "tr" == e[s].ty
            ? ((a = i[s].transform), this.renderShapeTransform(t, a))
            : "sh" == e[s].ty ||
              "el" == e[s].ty ||
              "rc" == e[s].ty ||
              "sr" == e[s].ty
            ? this.renderPath(e[s], i[s])
            : "fl" == e[s].ty
            ? this.renderFill(e[s], i[s], a)
            : "st" == e[s].ty
            ? this.renderStroke(e[s], i[s], a)
            : "gf" == e[s].ty || "gs" == e[s].ty
            ? this.renderGradientFill(e[s], i[s], a)
            : "gr" == e[s].ty
            ? this.renderShape(a, e[s].it, i[s].it)
            : e[s].ty;
        r && this.drawLayer();
      }),
      (CVShapeElement.prototype.renderStyledShape = function (t, e) {
        if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
          var i,
            r,
            s,
            a = t.trNodes,
            n = e.paths,
            o = n._length;
          a.length = 0;
          var h = t.transforms.finalTransform;
          for (s = 0; s < o; s += 1) {
            var l = n.shapes[s];
            if (l && l.v) {
              for (r = l._length, i = 1; i < r; i += 1)
                1 === i &&
                  a.push({
                    t: "m",
                    p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                  }),
                  a.push({
                    t: "c",
                    pts: h.applyToTriplePoints(l.o[i - 1], l.i[i], l.v[i])
                  });
              1 === r &&
                a.push({
                  t: "m",
                  p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                }),
                l.c &&
                  r &&
                  (a.push({
                    t: "c",
                    pts: h.applyToTriplePoints(l.o[i - 1], l.i[0], l.v[0])
                  }),
                  a.push({ t: "z" }));
            }
          }
          t.trNodes = a;
        }
      }),
      (CVShapeElement.prototype.renderPath = function (t, e) {
        if (!0 !== t.hd && t._shouldRender) {
          var i,
            r = e.styledShapes.length;
          for (i = 0; i < r; i += 1)
            this.renderStyledShape(e.styledShapes[i], e.sh);
        }
      }),
      (CVShapeElement.prototype.renderFill = function (t, e, i) {
        var r = e.style;
        (e.c._mdf || this._isFirstFrame) &&
          (r.co =
            "rgb(" +
            bm_floor(e.c.v[0]) +
            "," +
            bm_floor(e.c.v[1]) +
            "," +
            bm_floor(e.c.v[2]) +
            ")"),
          (e.o._mdf || i._opMdf || this._isFirstFrame) &&
            (r.coOp = e.o.v * i.opacity);
      }),
      (CVShapeElement.prototype.renderGradientFill = function (t, e, i) {
        var r = e.style;
        if (
          !r.grd ||
          e.g._mdf ||
          e.s._mdf ||
          e.e._mdf ||
          (1 !== t.t && (e.h._mdf || e.a._mdf))
        ) {
          var s = this.globalData.canvasContext,
            a = e.s.v,
            n = e.e.v;
          if (1 === t.t) f = s.createLinearGradient(a[0], a[1], n[0], n[1]);
          else
            var o = Math.sqrt(
                Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2)
              ),
              h = Math.atan2(n[1] - a[1], n[0] - a[0]),
              l = o * (1 <= e.h.v ? 0.99 : e.h.v <= -1 ? -0.99 : e.h.v),
              p = Math.cos(h + e.a.v) * l + a[0],
              m = Math.sin(h + e.a.v) * l + a[1],
              f = s.createRadialGradient(p, m, 0, a[0], a[1], o);
          var c,
            d = t.g.p,
            u = e.g.c,
            y = 1;
          for (c = 0; c < d; c += 1)
            e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * c + 1]),
              f.addColorStop(
                u[4 * c] / 100,
                "rgba(" +
                  u[4 * c + 1] +
                  "," +
                  u[4 * c + 2] +
                  "," +
                  u[4 * c + 3] +
                  "," +
                  y +
                  ")"
              );
          r.grd = f;
        }
        r.coOp = e.o.v * i.opacity;
      }),
      (CVShapeElement.prototype.renderStroke = function (t, e, i) {
        var r = e.style,
          s = e.d;
        s &&
          (s._mdf || this._isFirstFrame) &&
          ((r.da = s.dashArray), (r.do = s.dashoffset[0])),
          (e.c._mdf || this._isFirstFrame) &&
            (r.co =
              "rgb(" +
              bm_floor(e.c.v[0]) +
              "," +
              bm_floor(e.c.v[1]) +
              "," +
              bm_floor(e.c.v[2]) +
              ")"),
          (e.o._mdf || i._opMdf || this._isFirstFrame) &&
            (r.coOp = e.o.v * i.opacity),
          (e.w._mdf || this._isFirstFrame) && (r.wi = e.w.v);
      }),
      (CVShapeElement.prototype.destroy = function () {
        (this.shapesData = null),
          (this.globalData = null),
          (this.canvasContext = null),
          (this.stylesList.length = 0),
          (this.itemsData.length = 0);
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          CVBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableElement
        ],
        CVSolidElement
      ),
      (CVSolidElement.prototype.initElement =
        SVGShapeElement.prototype.initElement),
      (CVSolidElement.prototype.prepareFrame =
        IImageElement.prototype.prepareFrame),
      (CVSolidElement.prototype.renderInnerContent = function () {
        var t = this.canvasContext;
        (t.fillStyle = this.data.sc),
          t.fillRect(0, 0, this.data.sw, this.data.sh);
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          CVBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableElement,
          ITextElement
        ],
        CVTextElement
      ),
      (CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d")),
      (CVTextElement.prototype.buildNewText = function () {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = !1;
        t.fc
          ? ((e = !0), (this.values.fill = this.buildColor(t.fc)))
          : (this.values.fill = "rgba(0,0,0,0)"),
          (this.fill = e);
        var i = !1;
        t.sc &&
          ((i = !0),
          (this.values.stroke = this.buildColor(t.sc)),
          (this.values.sWidth = t.sw));
        var r,
          s,
          a = this.globalData.fontManager.getFontByName(t.f),
          n = t.l,
          o = this.mHelper;
        (this.stroke = i),
          (this.values.fValue =
            t.finalSize +
            "px " +
            this.globalData.fontManager.getFontByName(t.f).fFamily),
          (s = t.finalText.length);
        var h,
          l,
          p,
          m,
          f,
          c,
          d,
          u,
          y,
          g,
          v = this.data.singleShape,
          b = (t.tr / 1e3) * t.finalSize,
          E = 0,
          x = 0,
          S = !0,
          P = 0;
        for (r = 0; r < s; r += 1) {
          for (
            l =
              ((h = this.globalData.fontManager.getCharData(
                t.finalText[r],
                a.fStyle,
                this.globalData.fontManager.getFontByName(t.f).fFamily
              )) &&
                h.data) ||
              {},
              o.reset(),
              v &&
                n[r].n &&
                ((E = -b), (x += t.yOffset), (x += S ? 1 : 0), (S = !1)),
              d = (f = l.shapes ? l.shapes[0].it : []).length,
              o.scale(t.finalSize / 100, t.finalSize / 100),
              v && this.applyTextPropertiesToMatrix(t, o, n[r].line, E, x),
              y = createSizedArray(d),
              c = 0;
            c < d;
            c += 1
          ) {
            for (
              m = f[c].ks.k.i.length, u = f[c].ks.k, g = [], p = 1;
              p < m;
              p += 1
            )
              1 == p &&
                g.push(
                  o.applyToX(u.v[0][0], u.v[0][1], 0),
                  o.applyToY(u.v[0][0], u.v[0][1], 0)
                ),
                g.push(
                  o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0),
                  o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0),
                  o.applyToX(u.i[p][0], u.i[p][1], 0),
                  o.applyToY(u.i[p][0], u.i[p][1], 0),
                  o.applyToX(u.v[p][0], u.v[p][1], 0),
                  o.applyToY(u.v[p][0], u.v[p][1], 0)
                );
            g.push(
              o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0),
              o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0),
              o.applyToX(u.i[0][0], u.i[0][1], 0),
              o.applyToY(u.i[0][0], u.i[0][1], 0),
              o.applyToX(u.v[0][0], u.v[0][1], 0),
              o.applyToY(u.v[0][0], u.v[0][1], 0)
            ),
              (y[c] = g);
          }
          v && ((E += n[r].l), (E += b)),
            this.textSpans[P]
              ? (this.textSpans[P].elem = y)
              : (this.textSpans[P] = { elem: y }),
            (P += 1);
        }
      }),
      (CVTextElement.prototype.renderInnerContent = function () {
        var t,
          e,
          i,
          r,
          s,
          a,
          n = this.canvasContext;
        this.finalTransform.mat.props;
        (n.font = this.values.fValue),
          (n.lineCap = "butt"),
          (n.lineJoin = "miter"),
          (n.miterLimit = 4),
          this.data.singleShape ||
            this.textAnimator.getMeasures(
              this.textProperty.currentData,
              this.lettersChangedFlag
            );
        var o,
          h = this.textAnimator.renderedLetters,
          l = this.textProperty.currentData.l;
        e = l.length;
        var p,
          m,
          f = null,
          c = null,
          d = null;
        for (t = 0; t < e; t += 1)
          if (!l[t].n) {
            if (
              ((o = h[t]) &&
                (this.globalData.renderer.save(),
                this.globalData.renderer.ctxTransform(o.p),
                this.globalData.renderer.ctxOpacity(o.o)),
              this.fill)
            ) {
              for (
                o && o.fc
                  ? f !== o.fc && ((f = o.fc), (n.fillStyle = o.fc))
                  : f !== this.values.fill &&
                    ((f = this.values.fill), (n.fillStyle = this.values.fill)),
                  r = (p = this.textSpans[t].elem).length,
                  this.globalData.canvasContext.beginPath(),
                  i = 0;
                i < r;
                i += 1
              )
                for (
                  a = (m = p[i]).length,
                    this.globalData.canvasContext.moveTo(m[0], m[1]),
                    s = 2;
                  s < a;
                  s += 6
                )
                  this.globalData.canvasContext.bezierCurveTo(
                    m[s],
                    m[s + 1],
                    m[s + 2],
                    m[s + 3],
                    m[s + 4],
                    m[s + 5]
                  );
              this.globalData.canvasContext.closePath(),
                this.globalData.canvasContext.fill();
            }
            if (this.stroke) {
              for (
                o && o.sw
                  ? d !== o.sw && ((d = o.sw), (n.lineWidth = o.sw))
                  : d !== this.values.sWidth &&
                    ((d = this.values.sWidth),
                    (n.lineWidth = this.values.sWidth)),
                  o && o.sc
                    ? c !== o.sc && ((c = o.sc), (n.strokeStyle = o.sc))
                    : c !== this.values.stroke &&
                      ((c = this.values.stroke),
                      (n.strokeStyle = this.values.stroke)),
                  r = (p = this.textSpans[t].elem).length,
                  this.globalData.canvasContext.beginPath(),
                  i = 0;
                i < r;
                i += 1
              )
                for (
                  a = (m = p[i]).length,
                    this.globalData.canvasContext.moveTo(m[0], m[1]),
                    s = 2;
                  s < a;
                  s += 6
                )
                  this.globalData.canvasContext.bezierCurveTo(
                    m[s],
                    m[s + 1],
                    m[s + 2],
                    m[s + 3],
                    m[s + 4],
                    m[s + 5]
                  );
              this.globalData.canvasContext.closePath(),
                this.globalData.canvasContext.stroke();
            }
            o && this.globalData.renderer.restore();
          }
      }),
      (CVEffects.prototype.renderFrame = function () {}),
      (HBaseElement.prototype = {
        checkBlendMode: function () {},
        initRendererElement: function () {
          (this.baseElement = createTag(this.data.tg || "div")),
            this.data.hasMask
              ? ((this.svgElement = createNS("svg")),
                (this.layerElement = createNS("g")),
                (this.maskedElement = this.layerElement),
                this.svgElement.appendChild(this.layerElement),
                this.baseElement.appendChild(this.svgElement))
              : (this.layerElement = this.baseElement),
            styleDiv(this.baseElement);
        },
        createContainerElements: function () {
          (this.renderableEffectsManager = new CVEffects(this)),
            (this.transformedElement = this.baseElement),
            (this.maskedElement = this.layerElement),
            this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
            this.data.cl &&
              this.layerElement.setAttribute("class", this.data.cl),
            0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function () {
          this.finalTransform._matMdf &&
            (this.transformedElement.style.transform =
              this.transformedElement.style.webkitTransform =
                this.finalTransform.mat.toCSS()),
            this.finalTransform._opMdf &&
              (this.transformedElement.style.opacity =
                this.finalTransform.mProp.o.v);
        },
        renderFrame: function () {
          this.data.hd ||
            this.hidden ||
            (this.renderTransform(),
            this.renderRenderable(),
            this.renderElement(),
            this.renderInnerContent(),
            this._isFirstFrame && (this._isFirstFrame = !1));
        },
        destroy: function () {
          (this.layerElement = null),
            (this.transformedElement = null),
            this.matteElement && (this.matteElement = null),
            this.maskManager &&
              (this.maskManager.destroy(), (this.maskManager = null));
        },
        createRenderableComponents: function () {
          this.maskManager = new MaskElement(this.data, this, this.globalData);
        },
        addEffects: function () {},
        setMatte: function () {}
      }),
      (HBaseElement.prototype.getBaseElement =
        SVGBaseElement.prototype.getBaseElement),
      (HBaseElement.prototype.destroyBaseElement =
        HBaseElement.prototype.destroy),
      (HBaseElement.prototype.buildElementParenting =
        HybridRenderer.prototype.buildElementParenting),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          HBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement
        ],
        HSolidElement
      ),
      (HSolidElement.prototype.createContent = function () {
        var t;
        this.data.hasMask
          ? ((t = createNS("rect")).setAttribute("width", this.data.sw),
            t.setAttribute("height", this.data.sh),
            t.setAttribute("fill", this.data.sc),
            this.svgElement.setAttribute("width", this.data.sw),
            this.svgElement.setAttribute("height", this.data.sh))
          : (((t = createTag("div")).style.width = this.data.sw + "px"),
            (t.style.height = this.data.sh + "px"),
            (t.style.backgroundColor = this.data.sc)),
          this.layerElement.appendChild(t);
      }),
      extendPrototype(
        [HybridRenderer, ICompElement, HBaseElement],
        HCompElement
      ),
      (HCompElement.prototype._createBaseContainerElements =
        HCompElement.prototype.createContainerElements),
      (HCompElement.prototype.createContainerElements = function () {
        this._createBaseContainerElements(),
          this.data.hasMask
            ? (this.svgElement.setAttribute("width", this.data.w),
              this.svgElement.setAttribute("height", this.data.h),
              (this.transformedElement = this.baseElement))
            : (this.transformedElement = this.layerElement);
      }),
      (HCompElement.prototype.addTo3dContainer = function (t, e) {
        for (var i, r = 0; r < e; )
          this.elements[r] &&
            this.elements[r].getBaseElement &&
            (i = this.elements[r].getBaseElement()),
            (r += 1);
        i
          ? this.layerElement.insertBefore(t, i)
          : this.layerElement.appendChild(t);
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          HSolidElement,
          SVGShapeElement,
          HBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableElement
        ],
        HShapeElement
      ),
      (HShapeElement.prototype._renderShapeFrame =
        HShapeElement.prototype.renderInnerContent),
      (HShapeElement.prototype.createContent = function () {
        var t;
        if (((this.baseElement.style.fontSize = 0), this.data.hasMask))
          this.layerElement.appendChild(this.shapesContainer),
            (t = this.svgElement);
        else {
          t = createNS("svg");
          var e = this.comp.data ? this.comp.data : this.globalData.compSize;
          t.setAttribute("width", e.w),
            t.setAttribute("height", e.h),
            t.appendChild(this.shapesContainer),
            this.layerElement.appendChild(t);
        }
        this.searchShapes(
          this.shapesData,
          this.itemsData,
          this.prevViewData,
          this.shapesContainer,
          0,
          [],
          !0
        ),
          this.filterUniqueShapes(),
          (this.shapeCont = t);
      }),
      (HShapeElement.prototype.getTransformedPoint = function (t, e) {
        var i,
          r = t.length;
        for (i = 0; i < r; i += 1)
          e = t[i].mProps.v.applyToPointArray(e[0], e[1], 0);
        return e;
      }),
      (HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
        var i,
          r,
          s,
          a,
          n,
          o = t.sh.v,
          h = t.transformers,
          l = o._length;
        if (!(l <= 1)) {
          for (i = 0; i < l - 1; i += 1)
            (r = this.getTransformedPoint(h, o.v[i])),
              (s = this.getTransformedPoint(h, o.o[i])),
              (a = this.getTransformedPoint(h, o.i[i + 1])),
              (n = this.getTransformedPoint(h, o.v[i + 1])),
              this.checkBounds(r, s, a, n, e);
          o.c &&
            ((r = this.getTransformedPoint(h, o.v[i])),
            (s = this.getTransformedPoint(h, o.o[i])),
            (a = this.getTransformedPoint(h, o.i[0])),
            (n = this.getTransformedPoint(h, o.v[0])),
            this.checkBounds(r, s, a, n, e));
        }
      }),
      (HShapeElement.prototype.checkBounds = function (t, e, i, r, s) {
        this.getBoundsOfCurve(t, e, i, r);
        var a = this.shapeBoundingBox;
        (s.x = bm_min(a.left, s.x)),
          (s.xMax = bm_max(a.right, s.xMax)),
          (s.y = bm_min(a.top, s.y)),
          (s.yMax = bm_max(a.bottom, s.yMax));
      }),
      (HShapeElement.prototype.shapeBoundingBox = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }),
      (HShapeElement.prototype.tempBoundingBox = {
        x: 0,
        xMax: 0,
        y: 0,
        yMax: 0,
        width: 0,
        height: 0
      }),
      (HShapeElement.prototype.getBoundsOfCurve = function (t, e, i, r) {
        for (
          var s,
            a,
            n,
            o,
            h,
            l,
            p,
            m = [
              [t[0], r[0]],
              [t[1], r[1]]
            ],
            f = 0;
          f < 2;
          ++f
        )
          if (
            ((a = 6 * t[f] - 12 * e[f] + 6 * i[f]),
            (s = -3 * t[f] + 9 * e[f] - 9 * i[f] + 3 * r[f]),
            (n = 3 * e[f] - 3 * t[f]),
            (a |= 0),
            (n |= 0),
            0 !== (s |= 0))
          )
            (h = a * a - 4 * n * s) < 0 ||
              (0 < (l = (-a + bm_sqrt(h)) / (2 * s)) &&
                l < 1 &&
                m[f].push(this.calculateF(l, t, e, i, r, f)),
              0 < (p = (-a - bm_sqrt(h)) / (2 * s)) &&
                p < 1 &&
                m[f].push(this.calculateF(p, t, e, i, r, f)));
          else {
            if (0 === a) continue;
            0 < (o = -n / a) &&
              o < 1 &&
              m[f].push(this.calculateF(o, t, e, i, r, f));
          }
        (this.shapeBoundingBox.left = bm_min.apply(null, m[0])),
          (this.shapeBoundingBox.top = bm_min.apply(null, m[1])),
          (this.shapeBoundingBox.right = bm_max.apply(null, m[0])),
          (this.shapeBoundingBox.bottom = bm_max.apply(null, m[1]));
      }),
      (HShapeElement.prototype.calculateF = function (t, e, i, r, s, a) {
        return (
          bm_pow(1 - t, 3) * e[a] +
          3 * bm_pow(1 - t, 2) * t * i[a] +
          3 * (1 - t) * bm_pow(t, 2) * r[a] +
          bm_pow(t, 3) * s[a]
        );
      }),
      (HShapeElement.prototype.calculateBoundingBox = function (t, e) {
        var i,
          r = t.length;
        for (i = 0; i < r; i += 1)
          t[i] && t[i].sh
            ? this.calculateShapeBoundingBox(t[i], e)
            : t[i] && t[i].it && this.calculateBoundingBox(t[i].it, e);
      }),
      (HShapeElement.prototype.currentBoxContains = function (t) {
        return (
          this.currentBBox.x <= t.x &&
          this.currentBBox.y <= t.y &&
          this.currentBBox.width + this.currentBBox.x >= t.x + t.width &&
          this.currentBBox.height + this.currentBBox.y >= t.y + t.height
        );
      }),
      (HShapeElement.prototype.renderInnerContent = function () {
        if (
          (this._renderShapeFrame(),
          !this.hidden && (this._isFirstFrame || this._mdf))
        ) {
          var t = this.tempBoundingBox,
            e = 999999;
          if (
            ((t.x = e),
            (t.xMax = -e),
            (t.y = e),
            (t.yMax = -e),
            this.calculateBoundingBox(this.itemsData, t),
            (t.width = t.xMax < t.x ? 0 : t.xMax - t.x),
            (t.height = t.yMax < t.y ? 0 : t.yMax - t.y),
            this.currentBoxContains(t))
          )
            return;
          var i = !1;
          this.currentBBox.w !== t.width &&
            ((this.currentBBox.w = t.width),
            this.shapeCont.setAttribute("width", t.width),
            (i = !0)),
            this.currentBBox.h !== t.height &&
              ((this.currentBBox.h = t.height),
              this.shapeCont.setAttribute("height", t.height),
              (i = !0)),
            (i || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) &&
              ((this.currentBBox.w = t.width),
              (this.currentBBox.h = t.height),
              (this.currentBBox.x = t.x),
              (this.currentBBox.y = t.y),
              this.shapeCont.setAttribute(
                "viewBox",
                this.currentBBox.x +
                  " " +
                  this.currentBBox.y +
                  " " +
                  this.currentBBox.w +
                  " " +
                  this.currentBBox.h
              ),
              (this.shapeCont.style.transform =
                this.shapeCont.style.webkitTransform =
                  "translate(" +
                  this.currentBBox.x +
                  "px," +
                  this.currentBBox.y +
                  "px)"));
        }
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          HBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement,
          ITextElement
        ],
        HTextElement
      ),
      (HTextElement.prototype.createContent = function () {
        if (((this.isMasked = this.checkMasks()), this.isMasked)) {
          (this.renderType = "svg"),
            (this.compW = this.comp.data.w),
            (this.compH = this.comp.data.h),
            this.svgElement.setAttribute("width", this.compW),
            this.svgElement.setAttribute("height", this.compH);
          var t = createNS("g");
          this.maskedElement.appendChild(t), (this.innerElem = t);
        } else (this.renderType = "html"), (this.innerElem = this.layerElement);
        this.checkParenting();
      }),
      (HTextElement.prototype.buildNewText = function () {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = this.innerElem.style;
        (e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)"),
          t.sc &&
            ((e.stroke = this.buildColor(t.sc)), (e.strokeWidth = t.sw + "px"));
        var i,
          r,
          s = this.globalData.fontManager.getFontByName(t.f);
        if (!this.globalData.fontManager.chars)
          if (
            ((e.fontSize = t.finalSize + "px"),
            (e.lineHeight = t.finalSize + "px"),
            s.fClass)
          )
            this.innerElem.className = s.fClass;
          else {
            e.fontFamily = s.fFamily;
            var a = t.fWeight,
              n = t.fStyle;
            (e.fontStyle = n), (e.fontWeight = a);
          }
        var o,
          h,
          l,
          p = t.l;
        r = p.length;
        var m,
          f = this.mHelper,
          c = "",
          d = 0;
        for (i = 0; i < r; i += 1) {
          if (
            (this.globalData.fontManager.chars
              ? (this.textPaths[d]
                  ? (o = this.textPaths[d])
                  : ((o = createNS("path")).setAttribute(
                      "stroke-linecap",
                      "butt"
                    ),
                    o.setAttribute("stroke-linejoin", "round"),
                    o.setAttribute("stroke-miterlimit", "4")),
                this.isMasked ||
                  (this.textSpans[d]
                    ? (l = (h = this.textSpans[d]).children[0])
                    : (((h = createTag("div")).style.lineHeight = 0),
                      (l = createNS("svg")).appendChild(o),
                      styleDiv(h))))
              : this.isMasked
              ? (o = this.textPaths[d] ? this.textPaths[d] : createNS("text"))
              : this.textSpans[d]
              ? ((h = this.textSpans[d]), (o = this.textPaths[d]))
              : (styleDiv((h = createTag("span"))),
                styleDiv((o = createTag("span"))),
                h.appendChild(o)),
            this.globalData.fontManager.chars)
          ) {
            var u,
              y = this.globalData.fontManager.getCharData(
                t.finalText[i],
                s.fStyle,
                this.globalData.fontManager.getFontByName(t.f).fFamily
              );
            if (
              ((u = y ? y.data : null),
              f.reset(),
              u &&
                u.shapes &&
                ((m = u.shapes[0].it),
                f.scale(t.finalSize / 100, t.finalSize / 100),
                (c = this.createPathShape(f, m)),
                o.setAttribute("d", c)),
              this.isMasked)
            )
              this.innerElem.appendChild(o);
            else {
              if ((this.innerElem.appendChild(h), u && u.shapes)) {
                document.body.appendChild(l);
                var g = l.getBBox();
                l.setAttribute("width", g.width + 2),
                  l.setAttribute("height", g.height + 2),
                  l.setAttribute(
                    "viewBox",
                    g.x -
                      1 +
                      " " +
                      (g.y - 1) +
                      " " +
                      (g.width + 2) +
                      " " +
                      (g.height + 2)
                  ),
                  (l.style.transform = l.style.webkitTransform =
                    "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)"),
                  (p[i].yOffset = g.y - 1);
              } else l.setAttribute("width", 1), l.setAttribute("height", 1);
              h.appendChild(l);
            }
          } else
            (o.textContent = p[i].val),
              o.setAttributeNS(
                "http://www.w3.org/XML/1998/namespace",
                "xml:space",
                "preserve"
              ),
              this.isMasked
                ? this.innerElem.appendChild(o)
                : (this.innerElem.appendChild(h),
                  (o.style.transform = o.style.webkitTransform =
                    "translate3d(0," + -t.finalSize / 1.2 + "px,0)"));
          this.isMasked ? (this.textSpans[d] = o) : (this.textSpans[d] = h),
            (this.textSpans[d].style.display = "block"),
            (this.textPaths[d] = o),
            (d += 1);
        }
        for (; d < this.textSpans.length; )
          (this.textSpans[d].style.display = "none"), (d += 1);
      }),
      (HTextElement.prototype.renderInnerContent = function () {
        if (this.data.singleShape) {
          if (!this._isFirstFrame && !this.lettersChangedFlag) return;
          this.isMasked &&
            this.finalTransform._matMdf &&
            (this.svgElement.setAttribute(
              "viewBox",
              -this.finalTransform.mProp.p.v[0] +
                " " +
                -this.finalTransform.mProp.p.v[1] +
                " " +
                this.compW +
                " " +
                this.compH
            ),
            (this.svgElement.style.transform =
              this.svgElement.style.webkitTransform =
                "translate(" +
                -this.finalTransform.mProp.p.v[0] +
                "px," +
                -this.finalTransform.mProp.p.v[1] +
                "px)"));
        }
        if (
          (this.textAnimator.getMeasures(
            this.textProperty.currentData,
            this.lettersChangedFlag
          ),
          this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)
        ) {
          var t,
            e,
            i,
            r,
            s,
            a = 0,
            n = this.textAnimator.renderedLetters,
            o = this.textProperty.currentData.l;
          for (e = o.length, t = 0; t < e; t += 1)
            o[t].n
              ? (a += 1)
              : ((r = this.textSpans[t]),
                (s = this.textPaths[t]),
                (i = n[a]),
                (a += 1),
                i._mdf.m &&
                  (this.isMasked
                    ? r.setAttribute("transform", i.m)
                    : (r.style.transform = r.style.webkitTransform = i.m)),
                (r.style.opacity = i.o),
                i.sw && i._mdf.sw && s.setAttribute("stroke-width", i.sw),
                i.sc && i._mdf.sc && s.setAttribute("stroke", i.sc),
                i.fc &&
                  i._mdf.fc &&
                  (s.setAttribute("fill", i.fc), (s.style.color = i.fc)));
          if (
            this.innerElem.getBBox &&
            !this.hidden &&
            (this._isFirstFrame || this._mdf)
          ) {
            var h = this.innerElem.getBBox();
            this.currentBBox.w !== h.width &&
              ((this.currentBBox.w = h.width),
              this.svgElement.setAttribute("width", h.width)),
              this.currentBBox.h !== h.height &&
                ((this.currentBBox.h = h.height),
                this.svgElement.setAttribute("height", h.height));
            (this.currentBBox.w === h.width + 2 &&
              this.currentBBox.h === h.height + 2 &&
              this.currentBBox.x === h.x - 1 &&
              this.currentBBox.y === h.y - 1) ||
              ((this.currentBBox.w = h.width + 2),
              (this.currentBBox.h = h.height + 2),
              (this.currentBBox.x = h.x - 1),
              (this.currentBBox.y = h.y - 1),
              this.svgElement.setAttribute(
                "viewBox",
                this.currentBBox.x +
                  " " +
                  this.currentBBox.y +
                  " " +
                  this.currentBBox.w +
                  " " +
                  this.currentBBox.h
              ),
              (this.svgElement.style.transform =
                this.svgElement.style.webkitTransform =
                  "translate(" +
                  this.currentBBox.x +
                  "px," +
                  this.currentBBox.y +
                  "px)"));
          }
        }
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          HBaseElement,
          HSolidElement,
          HierarchyElement,
          FrameElement,
          RenderableElement
        ],
        HImageElement
      ),
      (HImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData),
          e = new Image();
        this.data.hasMask
          ? ((this.imageElem = createNS("image")),
            this.imageElem.setAttribute("width", this.assetData.w + "px"),
            this.imageElem.setAttribute("height", this.assetData.h + "px"),
            this.imageElem.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "href",
              t
            ),
            this.layerElement.appendChild(this.imageElem),
            this.baseElement.setAttribute("width", this.assetData.w),
            this.baseElement.setAttribute("height", this.assetData.h))
          : this.layerElement.appendChild(e),
          (e.src = t),
          this.data.ln && this.baseElement.setAttribute("id", this.data.ln);
      }),
      extendPrototype(
        [BaseElement, FrameElement, HierarchyElement],
        HCameraElement
      ),
      (HCameraElement.prototype.setup = function () {
        var t,
          e,
          i = this.comp.threeDElements.length;
        for (t = 0; t < i; t += 1)
          "3d" === (e = this.comp.threeDElements[t]).type &&
            ((e.perspectiveElem.style.perspective =
              e.perspectiveElem.style.webkitPerspective =
                this.pe.v + "px"),
            (e.container.style.transformOrigin =
              e.container.style.mozTransformOrigin =
              e.container.style.webkitTransformOrigin =
                "0px 0px 0px"),
            (e.perspectiveElem.style.transform =
              e.perspectiveElem.style.webkitTransform =
                "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"));
      }),
      (HCameraElement.prototype.createElements = function () {}),
      (HCameraElement.prototype.hide = function () {}),
      (HCameraElement.prototype.renderFrame = function () {
        var t,
          e,
          i = this._isFirstFrame;
        if (this.hierarchy)
          for (e = this.hierarchy.length, t = 0; t < e; t += 1)
            i = this.hierarchy[t].finalTransform.mProp._mdf || i;
        if (
          i ||
          this.pe._mdf ||
          (this.p && this.p._mdf) ||
          (this.px && (this.px._mdf || this.py._mdf || this.pz._mdf)) ||
          this.rx._mdf ||
          this.ry._mdf ||
          this.rz._mdf ||
          this.or._mdf ||
          (this.a && this.a._mdf)
        ) {
          if ((this.mat.reset(), this.hierarchy))
            for (t = e = this.hierarchy.length - 1; 0 <= t; t -= 1) {
              var r = this.hierarchy[t].finalTransform.mProp;
              this.mat.translate(-r.p.v[0], -r.p.v[1], r.p.v[2]),
                this.mat
                  .rotateX(-r.or.v[0])
                  .rotateY(-r.or.v[1])
                  .rotateZ(r.or.v[2]),
                this.mat.rotateX(-r.rx.v).rotateY(-r.ry.v).rotateZ(r.rz.v),
                this.mat.scale(1 / r.s.v[0], 1 / r.s.v[1], 1 / r.s.v[2]),
                this.mat.translate(r.a.v[0], r.a.v[1], r.a.v[2]);
            }
          if (
            (this.p
              ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2])
              : this.mat.translate(-this.px.v, -this.py.v, this.pz.v),
            this.a)
          ) {
            var s;
            s = this.p
              ? [
                  this.p.v[0] - this.a.v[0],
                  this.p.v[1] - this.a.v[1],
                  this.p.v[2] - this.a.v[2]
                ]
              : [
                  this.px.v - this.a.v[0],
                  this.py.v - this.a.v[1],
                  this.pz.v - this.a.v[2]
                ];
            var a = Math.sqrt(
                Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)
              ),
              n = [s[0] / a, s[1] / a, s[2] / a],
              o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
              h = Math.atan2(n[1], o),
              l = Math.atan2(n[0], -n[2]);
            this.mat.rotateY(l).rotateX(-h);
          }
          this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v),
            this.mat
              .rotateX(-this.or.v[0])
              .rotateY(-this.or.v[1])
              .rotateZ(this.or.v[2]),
            this.mat.translate(
              this.globalData.compSize.w / 2,
              this.globalData.compSize.h / 2,
              0
            ),
            this.mat.translate(0, 0, this.pe.v);
          var p = !this._prevMat.equals(this.mat);
          if ((p || this.pe._mdf) && this.comp.threeDElements) {
            var m;
            for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1)
              "3d" === (m = this.comp.threeDElements[t]).type &&
                (p &&
                  (m.container.style.transform =
                    m.container.style.webkitTransform =
                      this.mat.toCSS()),
                this.pe._mdf &&
                  (m.perspectiveElem.style.perspective =
                    m.perspectiveElem.style.webkitPerspective =
                      this.pe.v + "px"));
            this.mat.clone(this._prevMat);
          }
        }
        this._isFirstFrame = !1;
      }),
      (HCameraElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }),
      (HCameraElement.prototype.destroy = function () {}),
      (HCameraElement.prototype.getBaseElement = function () {
        return null;
      }),
      (HEffects.prototype.renderFrame = function () {});
    var animationManager = (function () {
        var t = {},
          s = [],
          r = 0,
          a = 0,
          n = 0,
          o = !0,
          h = !1;
        function i(t) {
          for (var e = 0, i = t.target; e < a; )
            s[e].animation === i &&
              (s.splice(e, 1), (e -= 1), (a -= 1), i.isPaused || m()),
              (e += 1);
        }
        function l(t, e) {
          if (!t) return null;
          for (var i = 0; i < a; ) {
            if (s[i].elem == t && null !== s[i].elem) return s[i].animation;
            i += 1;
          }
          var r = new AnimationItem();
          return f(r, t), r.setData(t, e), r;
        }
        function p() {
          (n += 1), d();
        }
        function m() {
          n -= 1;
        }
        function f(t, e) {
          t.addEventListener("destroy", i),
            t.addEventListener("_active", p),
            t.addEventListener("_idle", m),
            s.push({ elem: e, animation: t }),
            (a += 1);
        }
        function c(t) {
          var e,
            i = t - r;
          for (e = 0; e < a; e += 1) s[e].animation.advanceTime(i);
          (r = t), n && !h ? window.requestAnimationFrame(c) : (o = !0);
        }
        function e(t) {
          (r = t), window.requestAnimationFrame(c);
        }
        function d() {
          !h && n && o && (window.requestAnimationFrame(e), (o = !1));
        }
        return (
          (t.registerAnimation = l),
          (t.loadAnimation = function (t) {
            var e = new AnimationItem();
            return f(e, null), e.setParams(t), e;
          }),
          (t.setSpeed = function (t, e) {
            var i;
            for (i = 0; i < a; i += 1) s[i].animation.setSpeed(t, e);
          }),
          (t.setDirection = function (t, e) {
            var i;
            for (i = 0; i < a; i += 1) s[i].animation.setDirection(t, e);
          }),
          (t.play = function (t) {
            var e;
            for (e = 0; e < a; e += 1) s[e].animation.play(t);
          }),
          (t.pause = function (t) {
            var e;
            for (e = 0; e < a; e += 1) s[e].animation.pause(t);
          }),
          (t.stop = function (t) {
            var e;
            for (e = 0; e < a; e += 1) s[e].animation.stop(t);
          }),
          (t.togglePause = function (t) {
            var e;
            for (e = 0; e < a; e += 1) s[e].animation.togglePause(t);
          }),
          (t.searchAnimations = function (t, e, i) {
            var r,
              s = [].concat(
                [].slice.call(document.getElementsByClassName("lottie")),
                [].slice.call(document.getElementsByClassName("bodymovin"))
              ),
              a = s.length;
            for (r = 0; r < a; r += 1)
              i && s[r].setAttribute("data-bm-type", i), l(s[r], t);
            if (e && 0 === a) {
              i || (i = "svg");
              var n = document.getElementsByTagName("body")[0];
              n.innerHTML = "";
              var o = createTag("div");
              (o.style.width = "100%"),
                (o.style.height = "100%"),
                o.setAttribute("data-bm-type", i),
                n.appendChild(o),
                l(o, t);
            }
          }),
          (t.resize = function () {
            var t;
            for (t = 0; t < a; t += 1) s[t].animation.resize();
          }),
          (t.goToAndStop = function (t, e, i) {
            var r;
            for (r = 0; r < a; r += 1) s[r].animation.goToAndStop(t, e, i);
          }),
          (t.destroy = function (t) {
            var e;
            for (e = a - 1; 0 <= e; e -= 1) s[e].animation.destroy(t);
          }),
          (t.freeze = function () {
            h = !0;
          }),
          (t.unfreeze = function () {
            (h = !1), d();
          }),
          (t.getRegisteredAnimations = function () {
            var t,
              e = s.length,
              i = [];
            for (t = 0; t < e; t += 1) i.push(s[t].animation);
            return i;
          }),
          t
        );
      })(),
      AnimationItem = function () {
        (this._cbs = []),
          (this.name = ""),
          (this.path = ""),
          (this.isLoaded = !1),
          (this.currentFrame = 0),
          (this.currentRawFrame = 0),
          (this.firstFrame = 0),
          (this.totalFrames = 0),
          (this.frameRate = 0),
          (this.frameMult = 0),
          (this.playSpeed = 1),
          (this.playDirection = 1),
          (this.playCount = 0),
          (this.animationData = {}),
          (this.assets = []),
          (this.isPaused = !0),
          (this.autoplay = !1),
          (this.loop = !0),
          (this.renderer = null),
          (this.animationID = createElementID()),
          (this.assetsPath = ""),
          (this.timeCompleted = 0),
          (this.segmentPos = 0),
          (this.isSubframeEnabled = subframeEnabled),
          (this.segments = []),
          (this._idle = !0),
          (this._completedLoop = !1),
          (this.projectInterface = ProjectInterface()),
          (this.imagePreloader = new ImagePreloader());
      };
    extendPrototype([BaseEvent], AnimationItem),
      (AnimationItem.prototype.setParams = function (t) {
        t.context && (this.context = t.context),
          (t.wrapper || t.container) &&
            (this.wrapper = t.wrapper || t.container);
        var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
        switch (e) {
          case "canvas":
            this.renderer = new CanvasRenderer(this, t.rendererSettings);
            break;
          case "svg":
            this.renderer = new SVGRenderer(this, t.rendererSettings);
            break;
          default:
            this.renderer = new HybridRenderer(this, t.rendererSettings);
        }
        this.imagePreloader.setCacheType(e),
          this.renderer.setProjectInterface(this.projectInterface),
          (this.animType = e),
          "" === t.loop || null === t.loop || void 0 === t.loop || !0 === t.loop
            ? (this.loop = !0)
            : !1 === t.loop
            ? (this.loop = !1)
            : (this.loop = parseInt(t.loop)),
          (this.autoplay = !("autoplay" in t) || t.autoplay),
          (this.name = t.name ? t.name : ""),
          (this.autoloadSegments =
            !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments),
          (this.assetsPath = t.assetsPath),
          (this.initialSegment = t.initialSegment),
          t.animationData
            ? this.configAnimation(t.animationData)
            : t.path &&
              (-1 !== t.path.lastIndexOf("\\")
                ? (this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1))
                : (this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1)),
              (this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1)),
              (this.fileName = this.fileName.substr(
                0,
                this.fileName.lastIndexOf(".json")
              )),
              assetLoader.load(
                t.path,
                this.configAnimation.bind(this),
                function () {
                  this.trigger("data_failed");
                }.bind(this)
              ));
      }),
      (AnimationItem.prototype.setData = function (t, e) {
        var i = {
            wrapper: t,
            animationData: e ? ("object" == typeof e ? e : JSON.parse(e)) : null
          },
          r = t.attributes;
        (i.path = r.getNamedItem("data-animation-path")
          ? r.getNamedItem("data-animation-path").value
          : r.getNamedItem("data-bm-path")
          ? r.getNamedItem("data-bm-path").value
          : r.getNamedItem("bm-path")
          ? r.getNamedItem("bm-path").value
          : ""),
          (i.animType = r.getNamedItem("data-anim-type")
            ? r.getNamedItem("data-anim-type").value
            : r.getNamedItem("data-bm-type")
            ? r.getNamedItem("data-bm-type").value
            : r.getNamedItem("bm-type")
            ? r.getNamedItem("bm-type").value
            : r.getNamedItem("data-bm-renderer")
            ? r.getNamedItem("data-bm-renderer").value
            : r.getNamedItem("bm-renderer")
            ? r.getNamedItem("bm-renderer").value
            : "canvas");
        var s = r.getNamedItem("data-anim-loop")
          ? r.getNamedItem("data-anim-loop").value
          : r.getNamedItem("data-bm-loop")
          ? r.getNamedItem("data-bm-loop").value
          : r.getNamedItem("bm-loop")
          ? r.getNamedItem("bm-loop").value
          : "";
        "" === s || (i.loop = "false" !== s && ("true" === s || parseInt(s)));
        var a = r.getNamedItem("data-anim-autoplay")
          ? r.getNamedItem("data-anim-autoplay").value
          : r.getNamedItem("data-bm-autoplay")
          ? r.getNamedItem("data-bm-autoplay").value
          : !r.getNamedItem("bm-autoplay") ||
            r.getNamedItem("bm-autoplay").value;
        (i.autoplay = "false" !== a),
          (i.name = r.getNamedItem("data-name")
            ? r.getNamedItem("data-name").value
            : r.getNamedItem("data-bm-name")
            ? r.getNamedItem("data-bm-name").value
            : r.getNamedItem("bm-name")
            ? r.getNamedItem("bm-name").value
            : ""),
          "false" ===
            (r.getNamedItem("data-anim-prerender")
              ? r.getNamedItem("data-anim-prerender").value
              : r.getNamedItem("data-bm-prerender")
              ? r.getNamedItem("data-bm-prerender").value
              : r.getNamedItem("bm-prerender")
              ? r.getNamedItem("bm-prerender").value
              : "") && (i.prerender = !1),
          this.setParams(i);
      }),
      (AnimationItem.prototype.includeLayers = function (t) {
        t.op > this.animationData.op &&
          ((this.animationData.op = t.op),
          (this.totalFrames = Math.floor(t.op - this.animationData.ip)));
        var e,
          i,
          r = this.animationData.layers,
          s = r.length,
          a = t.layers,
          n = a.length;
        for (i = 0; i < n; i += 1)
          for (e = 0; e < s; ) {
            if (r[e].id == a[i].id) {
              r[e] = a[i];
              break;
            }
            e += 1;
          }
        if (
          ((t.chars || t.fonts) &&
            (this.renderer.globalData.fontManager.addChars(t.chars),
            this.renderer.globalData.fontManager.addFonts(
              t.fonts,
              this.renderer.globalData.defs
            )),
          t.assets)
        )
          for (s = t.assets.length, e = 0; e < s; e += 1)
            this.animationData.assets.push(t.assets[e]);
        (this.animationData.__complete = !1),
          dataManager.completeData(
            this.animationData,
            this.renderer.globalData.fontManager
          ),
          this.renderer.includeLayers(t.layers),
          expressionsPlugin && expressionsPlugin.initExpressions(this),
          this.loadNextSegment();
      }),
      (AnimationItem.prototype.loadNextSegment = function () {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments)
          return (
            this.trigger("data_ready"),
            void (this.timeCompleted = this.totalFrames)
          );
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var i = this.path + this.fileName + "_" + this.segmentPos + ".json";
        (this.segmentPos += 1),
          assetLoader.load(
            i,
            this.includeLayers.bind(this),
            function () {
              this.trigger("data_failed");
            }.bind(this)
          );
      }),
      (AnimationItem.prototype.loadSegments = function () {
        this.animationData.segments || (this.timeCompleted = this.totalFrames),
          this.loadNextSegment();
      }),
      (AnimationItem.prototype.imagesLoaded = function () {
        this.trigger("loaded_images"), this.checkLoaded();
      }),
      (AnimationItem.prototype.preloadImages = function () {
        this.imagePreloader.setAssetsPath(this.assetsPath),
          this.imagePreloader.setPath(this.path),
          this.imagePreloader.loadAssets(
            this.animationData.assets,
            this.imagesLoaded.bind(this)
          );
      }),
      (AnimationItem.prototype.configAnimation = function (t) {
        if (this.renderer)
          try {
            (this.animationData = t),
              this.initialSegment
                ? ((this.totalFrames = Math.floor(
                    this.initialSegment[1] - this.initialSegment[0]
                  )),
                  (this.firstFrame = Math.round(this.initialSegment[0])))
                : ((this.totalFrames = Math.floor(
                    this.animationData.op - this.animationData.ip
                  )),
                  (this.firstFrame = Math.round(this.animationData.ip))),
              this.renderer.configAnimation(t),
              t.assets || (t.assets = []),
              (this.assets = this.animationData.assets),
              (this.frameRate = this.animationData.fr),
              (this.frameMult = this.animationData.fr / 1e3),
              this.renderer.searchExtraCompositions(t.assets),
              this.trigger("config_ready"),
              this.preloadImages(),
              this.loadSegments(),
              this.updaFrameModifier(),
              this.waitForFontsLoaded();
          } catch (t) {
            this.triggerConfigError(t);
          }
      }),
      (AnimationItem.prototype.waitForFontsLoaded = function () {
        this.renderer &&
          (this.renderer.globalData.fontManager.isLoaded
            ? this.checkLoaded()
            : setTimeout(this.waitForFontsLoaded.bind(this), 20));
      }),
      (AnimationItem.prototype.checkLoaded = function () {
        this.isLoaded ||
          !this.renderer.globalData.fontManager.isLoaded ||
          (!this.imagePreloader.loaded() &&
            "canvas" === this.renderer.rendererType) ||
          ((this.isLoaded = !0),
          dataManager.completeData(
            this.animationData,
            this.renderer.globalData.fontManager
          ),
          expressionsPlugin && expressionsPlugin.initExpressions(this),
          this.renderer.initItems(),
          setTimeout(
            function () {
              this.trigger("DOMLoaded");
            }.bind(this),
            0
          ),
          this.gotoFrame(),
          this.autoplay && this.play());
      }),
      (AnimationItem.prototype.resize = function () {
        this.renderer.updateContainerSize();
      }),
      (AnimationItem.prototype.setSubframe = function (t) {
        this.isSubframeEnabled = !!t;
      }),
      (AnimationItem.prototype.gotoFrame = function () {
        (this.currentFrame = this.isSubframeEnabled
          ? this.currentRawFrame
          : ~~this.currentRawFrame),
          this.timeCompleted !== this.totalFrames &&
            this.currentFrame > this.timeCompleted &&
            (this.currentFrame = this.timeCompleted),
          this.trigger("enterFrame"),
          this.renderFrame();
      }),
      (AnimationItem.prototype.renderFrame = function () {
        if (!1 !== this.isLoaded)
          try {
            this.renderer.renderFrame(this.currentFrame + this.firstFrame);
          } catch (t) {
            this.triggerRenderFrameError(t);
          }
      }),
      (AnimationItem.prototype.play = function (t) {
        (t && this.name != t) ||
          (!0 === this.isPaused &&
            ((this.isPaused = !1),
            this._idle && ((this._idle = !1), this.trigger("_active"))));
      }),
      (AnimationItem.prototype.pause = function (t) {
        (t && this.name != t) ||
          (!1 === this.isPaused &&
            ((this.isPaused = !0), (this._idle = !0), this.trigger("_idle")));
      }),
      (AnimationItem.prototype.togglePause = function (t) {
        (t && this.name != t) ||
          (!0 === this.isPaused ? this.play() : this.pause());
      }),
      (AnimationItem.prototype.stop = function (t) {
        (t && this.name != t) ||
          (this.pause(),
          (this.playCount = 0),
          (this._completedLoop = !1),
          this.setCurrentRawFrameValue(0));
      }),
      (AnimationItem.prototype.goToAndStop = function (t, e, i) {
        (i && this.name != i) ||
          (e
            ? this.setCurrentRawFrameValue(t)
            : this.setCurrentRawFrameValue(t * this.frameModifier),
          this.pause());
      }),
      (AnimationItem.prototype.goToAndPlay = function (t, e, i) {
        this.goToAndStop(t, e, i), this.play();
      }),
      (AnimationItem.prototype.advanceTime = function (t) {
        if (!0 !== this.isPaused && !1 !== this.isLoaded) {
          var e = this.currentRawFrame + t * this.frameModifier,
            i = !1;
          e >= this.totalFrames - 1 && 0 < this.frameModifier
            ? this.loop && this.playCount !== this.loop
              ? e >= this.totalFrames
                ? ((this.playCount += 1),
                  this.checkSegments(e % this.totalFrames) ||
                    (this.setCurrentRawFrameValue(e % this.totalFrames),
                    (this._completedLoop = !0),
                    this.trigger("loopComplete")))
                : this.setCurrentRawFrameValue(e)
              : this.checkSegments(
                  e > this.totalFrames ? e % this.totalFrames : 0
                ) || ((i = !0), (e = this.totalFrames - 1))
            : e < 0
            ? this.checkSegments(e % this.totalFrames) ||
              (!this.loop || (this.playCount-- <= 0 && !0 !== this.loop)
                ? ((i = !0), (e = 0))
                : (this.setCurrentRawFrameValue(
                    this.totalFrames + (e % this.totalFrames)
                  ),
                  this._completedLoop
                    ? this.trigger("loopComplete")
                    : (this._completedLoop = !0)))
            : this.setCurrentRawFrameValue(e),
            i &&
              (this.setCurrentRawFrameValue(e),
              this.pause(),
              this.trigger("complete"));
        }
      }),
      (AnimationItem.prototype.adjustSegment = function (t, e) {
        (this.playCount = 0),
          t[1] < t[0]
            ? (0 < this.frameModifier &&
                (this.playSpeed < 0
                  ? this.setSpeed(-this.playSpeed)
                  : this.setDirection(-1)),
              (this.timeCompleted = this.totalFrames = t[0] - t[1]),
              (this.firstFrame = t[1]),
              this.setCurrentRawFrameValue(this.totalFrames - 0.001 - e))
            : t[1] > t[0] &&
              (this.frameModifier < 0 &&
                (this.playSpeed < 0
                  ? this.setSpeed(-this.playSpeed)
                  : this.setDirection(1)),
              (this.timeCompleted = this.totalFrames = t[1] - t[0]),
              (this.firstFrame = t[0]),
              this.setCurrentRawFrameValue(0.001 + e)),
          this.trigger("segmentStart");
      }),
      (AnimationItem.prototype.setSegment = function (t, e) {
        var i = -1;
        this.isPaused &&
          (this.currentRawFrame + this.firstFrame < t
            ? (i = t)
            : this.currentRawFrame + this.firstFrame > e && (i = e - t)),
          (this.firstFrame = t),
          (this.timeCompleted = this.totalFrames = e - t),
          -1 !== i && this.goToAndStop(i, !0);
      }),
      (AnimationItem.prototype.playSegments = function (t, e) {
        if ((e && (this.segments.length = 0), "object" == typeof t[0])) {
          var i,
            r = t.length;
          for (i = 0; i < r; i += 1) this.segments.push(t[i]);
        } else this.segments.push(t);
        this.segments.length &&
          e &&
          this.adjustSegment(this.segments.shift(), 0),
          this.isPaused && this.play();
      }),
      (AnimationItem.prototype.resetSegments = function (t) {
        (this.segments.length = 0),
          this.segments.push([this.animationData.ip, this.animationData.op]),
          t && this.checkSegments(0);
      }),
      (AnimationItem.prototype.checkSegments = function (t) {
        return (
          !!this.segments.length &&
          (this.adjustSegment(this.segments.shift(), t), !0)
        );
      }),
      (AnimationItem.prototype.destroy = function (t) {
        (t && this.name != t) ||
          !this.renderer ||
          (this.renderer.destroy(),
          this.imagePreloader.destroy(),
          this.trigger("destroy"),
          (this._cbs = null),
          (this.onEnterFrame =
            this.onLoopComplete =
            this.onComplete =
            this.onSegmentStart =
            this.onDestroy =
              null),
          (this.renderer = null));
      }),
      (AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
        (this.currentRawFrame = t), this.gotoFrame();
      }),
      (AnimationItem.prototype.setSpeed = function (t) {
        (this.playSpeed = t), this.updaFrameModifier();
      }),
      (AnimationItem.prototype.setDirection = function (t) {
        (this.playDirection = t < 0 ? -1 : 1), this.updaFrameModifier();
      }),
      (AnimationItem.prototype.updaFrameModifier = function () {
        this.frameModifier =
          this.frameMult * this.playSpeed * this.playDirection;
      }),
      (AnimationItem.prototype.getPath = function () {
        return this.path;
      }),
      (AnimationItem.prototype.getAssetsPath = function (t) {
        var e = "";
        if (t.e) e = t.p;
        else if (this.assetsPath) {
          var i = t.p;
          -1 !== i.indexOf("images/") && (i = i.split("/")[1]),
            (e = this.assetsPath + i);
        } else (e = this.path), (e += t.u ? t.u : ""), (e += t.p);
        return e;
      }),
      (AnimationItem.prototype.getAssetData = function (t) {
        for (var e = 0, i = this.assets.length; e < i; ) {
          if (t == this.assets[e].id) return this.assets[e];
          e += 1;
        }
      }),
      (AnimationItem.prototype.hide = function () {
        this.renderer.hide();
      }),
      (AnimationItem.prototype.show = function () {
        this.renderer.show();
      }),
      (AnimationItem.prototype.getDuration = function (t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate;
      }),
      (AnimationItem.prototype.trigger = function (t) {
        if (this._cbs && this._cbs[t])
          switch (t) {
            case "enterFrame":
              this.triggerEvent(
                t,
                new BMEnterFrameEvent(
                  t,
                  this.currentFrame,
                  this.totalFrames,
                  this.frameModifier
                )
              );
              break;
            case "loopComplete":
              this.triggerEvent(
                t,
                new BMCompleteLoopEvent(
                  t,
                  this.loop,
                  this.playCount,
                  this.frameMult
                )
              );
              break;
            case "complete":
              this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
              break;
            case "segmentStart":
              this.triggerEvent(
                t,
                new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)
              );
              break;
            case "destroy":
              this.triggerEvent(t, new BMDestroyEvent(t, this));
              break;
            default:
              this.triggerEvent(t);
          }
        "enterFrame" === t &&
          this.onEnterFrame &&
          this.onEnterFrame.call(
            this,
            new BMEnterFrameEvent(
              t,
              this.currentFrame,
              this.totalFrames,
              this.frameMult
            )
          ),
          "loopComplete" === t &&
            this.onLoopComplete &&
            this.onLoopComplete.call(
              this,
              new BMCompleteLoopEvent(
                t,
                this.loop,
                this.playCount,
                this.frameMult
              )
            ),
          "complete" === t &&
            this.onComplete &&
            this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)),
          "segmentStart" === t &&
            this.onSegmentStart &&
            this.onSegmentStart.call(
              this,
              new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)
            ),
          "destroy" === t &&
            this.onDestroy &&
            this.onDestroy.call(this, new BMDestroyEvent(t, this));
      }),
      (AnimationItem.prototype.triggerRenderFrameError = function (t) {
        var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e),
          this.onError && this.onError.call(this, e);
      }),
      (AnimationItem.prototype.triggerConfigError = function (t) {
        var e = new BMConfigErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e),
          this.onError && this.onError.call(this, e);
      });
    var Expressions =
        ((XW = {}),
        (XW.initExpressions = function (t) {
          var e = 0,
            i = [];
          function r() {
            var t,
              e = i.length;
            for (t = 0; t < e; t += 1) i[t].release();
            i.length = 0;
          }
          (t.renderer.compInterface = CompExpressionInterface(t.renderer)),
            t.renderer.globalData.projectInterface.registerComposition(
              t.renderer
            ),
            (t.renderer.globalData.pushExpression = function () {
              e += 1;
            }),
            (t.renderer.globalData.popExpression = function () {
              0 == (e -= 1) && r();
            }),
            (t.renderer.globalData.registerExpressionProperty = function (t) {
              -1 === i.indexOf(t) && i.push(t);
            });
        }),
        XW),
      XW;
    expressionsPlugin = Expressions;
    var ExpressionManager = (function () {
        var ob = {},
          Math = BMMath,
          window = null,
          document = null;
        function $bm_isInstanceOfArray(t) {
          return t.constructor === Array || t.constructor === Float32Array;
        }
        function isNumerable(t, e) {
          return (
            "number" === t ||
            "boolean" === t ||
            "string" === t ||
            e instanceof Number
          );
        }
        function $bm_neg(t) {
          var e = typeof t;
          if ("number" === e || "boolean" === e || t instanceof Number)
            return -t;
          if ($bm_isInstanceOfArray(t)) {
            var i,
              r = t.length,
              s = [];
            for (i = 0; i < r; i += 1) s[i] = -t[i];
            return s;
          }
          return t.propType ? t.v : void 0;
        }
        var easeInBez = BezierFactory.getBezierEasing(
            0.333,
            0,
            0.833,
            0.833,
            "easeIn"
          ).get,
          easeOutBez = BezierFactory.getBezierEasing(
            0.167,
            0.167,
            0.667,
            1,
            "easeOut"
          ).get,
          easeInOutBez = BezierFactory.getBezierEasing(
            0.33,
            0,
            0.667,
            1,
            "easeInOut"
          ).get;
        function sum(t, e) {
          var i = typeof t,
            r = typeof e;
          if ("string" === i || "string" === r) return t + e;
          if (isNumerable(i, t) && isNumerable(r, e)) return t + e;
          if ($bm_isInstanceOfArray(t) && isNumerable(r, e))
            return ((t = t.slice(0))[0] = t[0] + e), t;
          if (isNumerable(i, t) && $bm_isInstanceOfArray(e))
            return ((e = e.slice(0))[0] = t + e[0]), e;
          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (
              var s = 0, a = t.length, n = e.length, o = [];
              s < a || s < n;

            )
              ("number" == typeof t[s] || t[s] instanceof Number) &&
              ("number" == typeof e[s] || e[s] instanceof Number)
                ? (o[s] = t[s] + e[s])
                : (o[s] = void 0 === e[s] ? t[s] : t[s] || e[s]),
                (s += 1);
            return o;
          }
          return 0;
        }
        var add = sum;
        function sub(t, e) {
          var i = typeof t,
            r = typeof e;
          if (isNumerable(i, t) && isNumerable(r, e))
            return (
              "string" === i && (t = parseInt(t)),
              "string" === r && (e = parseInt(e)),
              t - e
            );
          if ($bm_isInstanceOfArray(t) && isNumerable(r, e))
            return ((t = t.slice(0))[0] = t[0] - e), t;
          if (isNumerable(i, t) && $bm_isInstanceOfArray(e))
            return ((e = e.slice(0))[0] = t - e[0]), e;
          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (
              var s = 0, a = t.length, n = e.length, o = [];
              s < a || s < n;

            )
              ("number" == typeof t[s] || t[s] instanceof Number) &&
              ("number" == typeof e[s] || e[s] instanceof Number)
                ? (o[s] = t[s] - e[s])
                : (o[s] = void 0 === e[s] ? t[s] : t[s] || e[s]),
                (s += 1);
            return o;
          }
          return 0;
        }
        function mul(t, e) {
          var i,
            r,
            s,
            a = typeof t,
            n = typeof e;
          if (isNumerable(a, t) && isNumerable(n, e)) return t * e;
          if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
            for (
              s = t.length, i = createTypedArray("float32", s), r = 0;
              r < s;
              r += 1
            )
              i[r] = t[r] * e;
            return i;
          }
          if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
            for (
              s = e.length, i = createTypedArray("float32", s), r = 0;
              r < s;
              r += 1
            )
              i[r] = t * e[r];
            return i;
          }
          return 0;
        }
        function div(t, e) {
          var i,
            r,
            s,
            a = typeof t,
            n = typeof e;
          if (isNumerable(a, t) && isNumerable(n, e)) return t / e;
          if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
            for (
              s = t.length, i = createTypedArray("float32", s), r = 0;
              r < s;
              r += 1
            )
              i[r] = t[r] / e;
            return i;
          }
          if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
            for (
              s = e.length, i = createTypedArray("float32", s), r = 0;
              r < s;
              r += 1
            )
              i[r] = t / e[r];
            return i;
          }
          return 0;
        }
        function mod(t, e) {
          return (
            "string" == typeof t && (t = parseInt(t)),
            "string" == typeof e && (e = parseInt(e)),
            t % e
          );
        }
        var $bm_sum = sum,
          $bm_sub = sub,
          $bm_mul = mul,
          $bm_div = div,
          $bm_mod = mod;
        function clamp(t, e, i) {
          if (i < e) {
            var r = i;
            (i = e), (e = r);
          }
          return Math.min(Math.max(t, e), i);
        }
        function radiansToDegrees(t) {
          return t / degToRads;
        }
        var radians_to_degrees = radiansToDegrees;
        function degreesToRadians(t) {
          return t * degToRads;
        }
        var degrees_to_radians = radiansToDegrees,
          helperLengthArray = [0, 0, 0, 0, 0, 0];
        function length(t, e) {
          if ("number" == typeof t || t instanceof Number)
            return (e = e || 0), Math.abs(t - e);
          e || (e = helperLengthArray);
          var i,
            r = Math.min(t.length, e.length),
            s = 0;
          for (i = 0; i < r; i += 1) s += Math.pow(e[i] - t[i], 2);
          return Math.sqrt(s);
        }
        function normalize(t) {
          return div(t, length(t));
        }
        function rgbToHsl(t) {
          var e,
            i,
            r = t[0],
            s = t[1],
            a = t[2],
            n = Math.max(r, s, a),
            o = Math.min(r, s, a),
            h = (n + o) / 2;
          if (n == o) e = i = 0;
          else {
            var l = n - o;
            switch (((i = 0.5 < h ? l / (2 - n - o) : l / (n + o)), n)) {
              case r:
                e = (s - a) / l + (s < a ? 6 : 0);
                break;
              case s:
                e = (a - r) / l + 2;
                break;
              case a:
                e = (r - s) / l + 4;
            }
            e /= 6;
          }
          return [e, i, h, t[3]];
        }
        function hue2rgb(t, e, i) {
          return (
            i < 0 && (i += 1),
            1 < i && (i -= 1),
            i < 1 / 6
              ? t + 6 * (e - t) * i
              : i < 0.5
              ? e
              : i < 2 / 3
              ? t + (e - t) * (2 / 3 - i) * 6
              : t
          );
        }
        function hslToRgb(t) {
          var e,
            i,
            r,
            s = t[0],
            a = t[1],
            n = t[2];
          if (0 === a) e = i = r = n;
          else {
            var o = n < 0.5 ? n * (1 + a) : n + a - n * a,
              h = 2 * n - o;
            (e = hue2rgb(h, o, s + 1 / 3)),
              (i = hue2rgb(h, o, s)),
              (r = hue2rgb(h, o, s - 1 / 3));
          }
          return [e, i, r, t[3]];
        }
        function linear(t, e, i, r, s) {
          if (
            ((void 0 !== r && void 0 !== s) ||
              ((r = e), (s = i), (e = 0), (i = 1)),
            i < e)
          ) {
            var a = i;
            (i = e), (e = a);
          }
          if (t <= e) return r;
          if (i <= t) return s;
          var n = i === e ? 0 : (t - e) / (i - e);
          if (!r.length) return r + (s - r) * n;
          var o,
            h = r.length,
            l = createTypedArray("float32", h);
          for (o = 0; o < h; o += 1) l[o] = r[o] + (s[o] - r[o]) * n;
          return l;
        }
        function random(t, e) {
          if (
            (void 0 === e &&
              (void 0 === t ? ((t = 0), (e = 1)) : ((e = t), (t = void 0))),
            e.length)
          ) {
            var i,
              r = e.length;
            t || (t = createTypedArray("float32", r));
            var s = createTypedArray("float32", r),
              a = BMMath.random();
            for (i = 0; i < r; i += 1) s[i] = t[i] + a * (e[i] - t[i]);
            return s;
          }
          return void 0 === t && (t = 0), t + BMMath.random() * (e - t);
        }
        function createPath(t, e, i, r) {
          var s,
            a = t.length,
            n = shape_pool.newElement();
          n.setPathData(!!r, a);
          var o,
            h,
            l = [0, 0];
          for (s = 0; s < a; s += 1)
            (o = e && e[s] ? e[s] : l),
              (h = i && i[s] ? i[s] : l),
              n.setTripleAt(
                t[s][0],
                t[s][1],
                h[0] + t[s][0],
                h[1] + t[s][1],
                o[0] + t[s][0],
                o[1] + t[s][1],
                s,
                !0
              );
          return n;
        }
        function initiateExpression(elem, data, property) {
          var val = data.x,
            needsVelocity = /velocity(?![\w\d])/.test(val),
            _needsRandom = -1 !== val.indexOf("random"),
            elemType = elem.data.ty,
            transform,
            $bm_transform,
            content,
            effect,
            thisProperty = property;
          (thisProperty.valueAtTime = thisProperty.getValueAtTime),
            Object.defineProperty(thisProperty, "value", {
              get: function () {
                return thisProperty.v;
              }
            }),
            (elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate),
            (elem.comp.displayStartTime = 0);
          var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
            outPoint = elem.data.op / elem.comp.globalData.frameRate,
            width = elem.data.sw ? elem.data.sw : 0,
            height = elem.data.sh ? elem.data.sh : 0,
            name = elem.data.nm,
            loopIn,
            loop_in,
            loopOut,
            loop_out,
            smooth,
            toWorld,
            fromWorld,
            fromComp,
            toComp,
            fromCompToSurface,
            position,
            rotation,
            anchorPoint,
            scale,
            thisLayer,
            thisComp,
            mask,
            valueAtTime,
            velocityAtTime,
            __expression_functions = [],
            scoped_bm_rt;
          if (data.xf) {
            var i,
              len = data.xf.length;
            for (i = 0; i < len; i += 1)
              __expression_functions[i] = eval(
                "(function(){ return " + data.xf[i] + "}())"
              );
          }
          var expression_function = eval(
              "[function _expression_function(){" +
                val +
                ";scoped_bm_rt=$bm_rt}]"
            )[0],
            numKeys = property.kf ? data.k.length : 0,
            active = !this.data || !0 !== this.data.hd,
            wiggle = function (t, e) {
              var i,
                r,
                s = this.pv.length ? this.pv.length : 1,
                a = createTypedArray("float32", s);
              var n = Math.floor(5 * time);
              for (r = i = 0; i < n; ) {
                for (r = 0; r < s; r += 1) a[r] += -e + 2 * e * BMMath.random();
                i += 1;
              }
              var o = 5 * time,
                h = o - Math.floor(o),
                l = createTypedArray("float32", s);
              if (1 < s) {
                for (r = 0; r < s; r += 1)
                  l[r] = this.pv[r] + a[r] + (-e + 2 * e * BMMath.random()) * h;
                return l;
              }
              return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h;
            }.bind(this);
          function loopInDuration(t, e) {
            return loopIn(t, e, !0);
          }
          function loopOutDuration(t, e) {
            return loopOut(t, e, !0);
          }
          thisProperty.loopIn &&
            ((loopIn = thisProperty.loopIn.bind(thisProperty)),
            (loop_in = loopIn)),
            thisProperty.loopOut &&
              ((loopOut = thisProperty.loopOut.bind(thisProperty)),
              (loop_out = loopOut)),
            thisProperty.smooth &&
              (smooth = thisProperty.smooth.bind(thisProperty)),
            this.getValueAtTime &&
              (valueAtTime = this.getValueAtTime.bind(this)),
            this.getVelocityAtTime &&
              (velocityAtTime = this.getVelocityAtTime.bind(this));
          var comp = elem.comp.globalData.projectInterface.bind(
              elem.comp.globalData.projectInterface
            ),
            time,
            velocity,
            value,
            text,
            textIndex,
            textTotal,
            selectorValue;
          function lookAt(t, e) {
            var i = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
              r =
                Math.atan2(i[0], Math.sqrt(i[1] * i[1] + i[2] * i[2])) /
                degToRads;
            return [-Math.atan2(i[1], i[2]) / degToRads, r, 0];
          }
          function easeOut(t, e, i, r, s) {
            return applyEase(easeOutBez, t, e, i, r, s);
          }
          function easeIn(t, e, i, r, s) {
            return applyEase(easeInBez, t, e, i, r, s);
          }
          function ease(t, e, i, r, s) {
            return applyEase(easeInOutBez, t, e, i, r, s);
          }
          function applyEase(t, e, i, r, s, a) {
            void 0 === s ? ((s = i), (a = r)) : (e = (e - i) / (r - i));
            var n = t((e = 1 < e ? 1 : e < 0 ? 0 : e));
            if ($bm_isInstanceOfArray(s)) {
              var o,
                h = s.length,
                l = createTypedArray("float32", h);
              for (o = 0; o < h; o += 1) l[o] = (a[o] - s[o]) * n + s[o];
              return l;
            }
            return (a - s) * n + s;
          }
          function nearestKey(t) {
            var e,
              i,
              r,
              s = data.k.length;
            if (data.k.length && "number" != typeof data.k[0])
              if (
                ((i = -1), (t *= elem.comp.globalData.frameRate) < data.k[0].t)
              )
                (i = 1), (r = data.k[0].t);
              else {
                for (e = 0; e < s - 1; e += 1) {
                  if (t === data.k[e].t) {
                    (i = e + 1), (r = data.k[e].t);
                    break;
                  }
                  if (t > data.k[e].t && t < data.k[e + 1].t) {
                    r =
                      t - data.k[e].t > data.k[e + 1].t - t
                        ? ((i = e + 2), data.k[e + 1].t)
                        : ((i = e + 1), data.k[e].t);
                    break;
                  }
                }
                -1 === i && ((i = e + 1), (r = data.k[e].t));
              }
            else r = i = 0;
            var a = {};
            return (
              (a.index = i), (a.time = r / elem.comp.globalData.frameRate), a
            );
          }
          function key(t) {
            var e, i, r;
            if (!data.k.length || "number" == typeof data.k[0])
              throw new Error("The property has no keyframe at index " + t);
            (t -= 1),
              (e = {
                time: data.k[t].t / elem.comp.globalData.frameRate,
                value: []
              });
            var s = data.k[t].hasOwnProperty("s")
              ? data.k[t].s
              : data.k[t - 1].e;
            for (r = s.length, i = 0; i < r; i += 1)
              (e[i] = s[i]), (e.value[i] = s[i]);
            return e;
          }
          function framesToTime(t, e) {
            return e || (e = elem.comp.globalData.frameRate), t / e;
          }
          function timeToFrames(t, e) {
            return (
              t || 0 === t || (t = time),
              e || (e = elem.comp.globalData.frameRate),
              t * e
            );
          }
          function seedRandom(t) {
            BMMath.seedrandom(randSeed + t);
          }
          function sourceRectAtTime() {
            return elem.sourceRectAtTime();
          }
          function substring(t, e) {
            return "string" == typeof value
              ? void 0 === e
                ? value.substring(t)
                : value.substring(t, e)
              : "";
          }
          function substr(t, e) {
            return "string" == typeof value
              ? void 0 === e
                ? value.substr(t)
                : value.substr(t, e)
              : "";
          }
          function posterizeTime(t) {
            (time = 0 === t ? 0 : Math.floor(time * t) / t),
              (value = valueAtTime(time));
          }
          var index = elem.data.ind,
            hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
            parent,
            randSeed = Math.floor(1e6 * Math.random()),
            globalData = elem.globalData;
          function executeExpression(t) {
            return (
              (value = t),
              _needsRandom && seedRandom(randSeed),
              this.frameExpressionId === elem.globalData.frameId &&
              "textSelector" !== this.propType
                ? value
                : ("textSelector" === this.propType &&
                    ((textIndex = this.textIndex),
                    (textTotal = this.textTotal),
                    (selectorValue = this.selectorValue)),
                  thisLayer ||
                    ((text = elem.layerInterface.text),
                    (thisLayer = elem.layerInterface),
                    (thisComp = elem.comp.compInterface),
                    (toWorld = thisLayer.toWorld.bind(thisLayer)),
                    (fromWorld = thisLayer.fromWorld.bind(thisLayer)),
                    (fromComp = thisLayer.fromComp.bind(thisLayer)),
                    (toComp = thisLayer.toComp.bind(thisLayer)),
                    (mask = thisLayer.mask
                      ? thisLayer.mask.bind(thisLayer)
                      : null),
                    (fromCompToSurface = fromComp)),
                  transform ||
                    ((transform = elem.layerInterface("ADBE Transform Group")),
                    ($bm_transform = transform) &&
                      (anchorPoint = transform.anchorPoint)),
                  4 !== elemType ||
                    content ||
                    (content = thisLayer("ADBE Root Vectors Group")),
                  effect || (effect = thisLayer(4)),
                  (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) &&
                    !parent &&
                    (parent = elem.hierarchy[0].layerInterface),
                  (time =
                    this.comp.renderedFrame / this.comp.globalData.frameRate),
                  needsVelocity && (velocity = velocityAtTime(time)),
                  expression_function(),
                  (this.frameExpressionId = elem.globalData.frameId),
                  "shape" === scoped_bm_rt.propType &&
                    (scoped_bm_rt = scoped_bm_rt.v),
                  scoped_bm_rt)
            );
          }
          return executeExpression;
        }
        return (ob.initiateExpression = initiateExpression), ob;
      })(),
      expressionHelpers = {
        searchExpressions: function (t, e, i) {
          e.x &&
            ((i.k = !0),
            (i.x = !0),
            (i.initiateExpression = ExpressionManager.initiateExpression),
            i.effectsSequence.push(i.initiateExpression(t, e, i).bind(i)));
        },
        getSpeedAtTime: function (t) {
          var e = this.getValueAtTime(t),
            i = this.getValueAtTime(t + -0.01),
            r = 0;
          if (e.length) {
            var s;
            for (s = 0; s < e.length; s += 1) r += Math.pow(i[s] - e[s], 2);
            r = 100 * Math.sqrt(r);
          } else r = 0;
          return r;
        },
        getVelocityAtTime: function (t) {
          if (void 0 !== this.vel) return this.vel;
          var e,
            i,
            r = this.getValueAtTime(t),
            s = this.getValueAtTime(t + -0.001);
          if (r.length)
            for (
              e = createTypedArray("float32", r.length), i = 0;
              i < r.length;
              i += 1
            )
              e[i] = (s[i] - r[i]) / -0.001;
          else e = (s - r) / -0.001;
          return e;
        },
        getValueAtTime: function (t) {
          return (
            (t *= this.elem.globalData.frameRate),
            (t -= this.offsetTime) !== this._cachingAtTime.lastFrame &&
              ((this._cachingAtTime.lastIndex =
                this._cachingAtTime.lastFrame < t
                  ? this._cachingAtTime.lastIndex
                  : 0),
              (this._cachingAtTime.value = this.interpolateValue(
                t,
                this._cachingAtTime
              )),
              (this._cachingAtTime.lastFrame = t)),
            this._cachingAtTime.value
          );
        },
        getStaticValueAtTime: function () {
          return this.pv;
        },
        setGroupProperty: function (t) {
          this.propertyGroup = t;
        }
      };
    !(function () {
      function o(t, e, i) {
        if (!this.k || !this.keyframes) return this.pv;
        t = t ? t.toLowerCase() : "";
        var r,
          s,
          a,
          n,
          o,
          h = this.comp.renderedFrame,
          l = this.keyframes,
          p = l[l.length - 1].t;
        if (h <= p) return this.pv;
        if (
          (i
            ? (s =
                p -
                (r = e
                  ? Math.abs(p - elem.comp.globalData.frameRate * e)
                  : Math.max(0, p - this.elem.data.ip)))
            : ((!e || e > l.length - 1) && (e = l.length - 1),
              (r = p - (s = l[l.length - 1 - e].t))),
          "pingpong" === t)
        ) {
          if (Math.floor((h - s) / r) % 2 != 0)
            return this.getValueAtTime(
              (r - ((h - s) % r) + s) / this.comp.globalData.frameRate,
              0
            );
        } else {
          if ("offset" === t) {
            var m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
              f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(
                (((h - s) % r) + s) / this.comp.globalData.frameRate,
                0
              ),
              d = Math.floor((h - s) / r);
            if (this.pv.length) {
              for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1)
                o[a] = (f[a] - m[a]) * d + c[a];
              return o;
            }
            return (f - m) * d + c;
          }
          if ("continue" === t) {
            var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
              y = this.getValueAtTime(
                (p - 0.001) / this.comp.globalData.frameRate,
                0
              );
            if (this.pv.length) {
              for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1)
                o[a] =
                  u[a] +
                  ((u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate)) /
                    5e-4;
              return o;
            }
            return u + ((h - p) / 0.001) * (u - y);
          }
        }
        return this.getValueAtTime(
          (((h - s) % r) + s) / this.comp.globalData.frameRate,
          0
        );
      }
      function h(t, e, i) {
        if (!this.k) return this.pv;
        t = t ? t.toLowerCase() : "";
        var r,
          s,
          a,
          n,
          o,
          h = this.comp.renderedFrame,
          l = this.keyframes,
          p = l[0].t;
        if (p <= h) return this.pv;
        if (
          (i
            ? (s =
                p +
                (r = e
                  ? Math.abs(elem.comp.globalData.frameRate * e)
                  : Math.max(0, this.elem.data.op - p)))
            : ((!e || e > l.length - 1) && (e = l.length - 1),
              (r = (s = l[e].t) - p)),
          "pingpong" === t)
        ) {
          if (Math.floor((p - h) / r) % 2 == 0)
            return this.getValueAtTime(
              (((p - h) % r) + p) / this.comp.globalData.frameRate,
              0
            );
        } else {
          if ("offset" === t) {
            var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
              f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(
                (r - ((p - h) % r) + p) / this.comp.globalData.frameRate,
                0
              ),
              d = Math.floor((p - h) / r) + 1;
            if (this.pv.length) {
              for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1)
                o[a] = c[a] - (f[a] - m[a]) * d;
              return o;
            }
            return c - (f - m) * d;
          }
          if ("continue" === t) {
            var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
              y = this.getValueAtTime(
                (p + 0.001) / this.comp.globalData.frameRate,
                0
              );
            if (this.pv.length) {
              for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1)
                o[a] = u[a] + ((u[a] - y[a]) * (p - h)) / 0.001;
              return o;
            }
            return u + ((u - y) * (p - h)) / 0.001;
          }
        }
        return this.getValueAtTime(
          (r - ((p - h) % r) + p) / this.comp.globalData.frameRate,
          0
        );
      }
      function l(t, e) {
        if (!this.k) return this.pv;
        if (((t = 0.5 * (t || 0.4)), (e = Math.floor(e || 5)) <= 1))
          return this.pv;
        var i,
          r,
          s = this.comp.renderedFrame / this.comp.globalData.frameRate,
          a = s - t,
          n = 1 < e ? (s + t - a) / (e - 1) : 1,
          o = 0,
          h = 0;
        for (
          i = this.pv.length ? createTypedArray("float32", this.pv.length) : 0;
          o < e;

        ) {
          if (((r = this.getValueAtTime(a + o * n)), this.pv.length))
            for (h = 0; h < this.pv.length; h += 1) i[h] += r[h];
          else i += r;
          o += 1;
        }
        if (this.pv.length) for (h = 0; h < this.pv.length; h += 1) i[h] /= e;
        else i /= e;
        return i;
      }
      var s = TransformPropertyFactory.getTransformProperty;
      TransformPropertyFactory.getTransformProperty = function (t, e, i) {
        var r = s(t, e, i);
        return (
          r.dynamicProperties.length
            ? (r.getValueAtTime = function (t) {
                console.warn("Transform at time not supported");
              }.bind(r))
            : (r.getValueAtTime = function (t) {}.bind(r)),
          (r.setGroupProperty = expressionHelpers.setGroupProperty),
          r
        );
      };
      var p = PropertyFactory.getProp;
      PropertyFactory.getProp = function (t, e, i, r, s) {
        var a = p(t, e, i, r, s);
        a.kf
          ? (a.getValueAtTime = expressionHelpers.getValueAtTime.bind(a))
          : (a.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(a)),
          (a.setGroupProperty = expressionHelpers.setGroupProperty),
          (a.loopOut = o),
          (a.loopIn = h),
          (a.smooth = l),
          (a.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(a)),
          (a.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(a)),
          (a.numKeys = 1 === e.a ? e.k.length : 0),
          (a.propertyIndex = e.ix);
        var n = 0;
        return (
          0 !== i &&
            (n = createTypedArray(
              "float32",
              1 === e.a ? e.k[0].s.length : e.k.length
            )),
          (a._cachingAtTime = {
            lastFrame: initialDefaultFrame,
            lastIndex: 0,
            value: n
          }),
          expressionHelpers.searchExpressions(t, e, a),
          a.k && s.addDynamicProperty(a),
          a
        );
      };
      var t = ShapePropertyFactory.getConstructorFunction(),
        e = ShapePropertyFactory.getKeyframedConstructorFunction();
      function i() {}
      (i.prototype = {
        vertices: function (t, e) {
          this.k && this.getValue();
          var i = this.v;
          void 0 !== e && (i = this.getValueAtTime(e, 0));
          var r,
            s = i._length,
            a = i[t],
            n = i.v,
            o = createSizedArray(s);
          for (r = 0; r < s; r += 1)
            o[r] =
              "i" === t || "o" === t
                ? [a[r][0] - n[r][0], a[r][1] - n[r][1]]
                : [a[r][0], a[r][1]];
          return o;
        },
        points: function (t) {
          return this.vertices("v", t);
        },
        inTangents: function (t) {
          return this.vertices("i", t);
        },
        outTangents: function (t) {
          return this.vertices("o", t);
        },
        isClosed: function () {
          return this.v.c;
        },
        pointOnPath: function (t, e) {
          var i = this.v;
          void 0 !== e && (i = this.getValueAtTime(e, 0)),
            this._segmentsLength ||
              (this._segmentsLength = bez.getSegmentsLength(i));
          for (
            var r,
              s = this._segmentsLength,
              a = s.lengths,
              n = s.totalLength * t,
              o = 0,
              h = a.length,
              l = 0;
            o < h;

          ) {
            if (l + a[o].addedLength > n) {
              var p = o,
                m = i.c && o === h - 1 ? 0 : o + 1,
                f = (n - l) / a[o].addedLength;
              r = bez.getPointInSegment(
                i.v[p],
                i.v[m],
                i.o[p],
                i.i[m],
                f,
                a[o]
              );
              break;
            }
            (l += a[o].addedLength), (o += 1);
          }
          return (
            r ||
              (r = i.c
                ? [i.v[0][0], i.v[0][1]]
                : [i.v[i._length - 1][0], i.v[i._length - 1][1]]),
            r
          );
        },
        vectorOnPath: function (t, e, i) {
          t = 1 == t ? (this.v.c ? 0 : 0.999) : t;
          var r = this.pointOnPath(t, e),
            s = this.pointOnPath(t + 0.001, e),
            a = s[0] - r[0],
            n = s[1] - r[1],
            o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
          return 0 === o
            ? [0, 0]
            : "tangent" === i
            ? [a / o, n / o]
            : [-n / o, a / o];
        },
        tangentOnPath: function (t, e) {
          return this.vectorOnPath(t, e, "tangent");
        },
        normalOnPath: function (t, e) {
          return this.vectorOnPath(t, e, "normal");
        },
        setGroupProperty: expressionHelpers.setGroupProperty,
        getValueAtTime: expressionHelpers.getStaticValueAtTime
      }),
        extendPrototype([i], t),
        extendPrototype([i], e),
        (e.prototype.getValueAtTime = function (t) {
          return (
            this._cachingAtTime ||
              (this._cachingAtTime = {
                shapeValue: shape_pool.clone(this.pv),
                lastIndex: 0,
                lastTime: initialDefaultFrame
              }),
            (t *= this.elem.globalData.frameRate),
            (t -= this.offsetTime) !== this._cachingAtTime.lastTime &&
              ((this._cachingAtTime.lastIndex =
                this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0),
              (this._cachingAtTime.lastTime = t),
              this.interpolateShape(
                t,
                this._cachingAtTime.shapeValue,
                this._cachingAtTime
              )),
            this._cachingAtTime.shapeValue
          );
        }),
        (e.prototype.initiateExpression = ExpressionManager.initiateExpression);
      var n = ShapePropertyFactory.getShapeProp;
      ShapePropertyFactory.getShapeProp = function (t, e, i, r, s) {
        var a = n(t, e, i, r, s);
        return (
          (a.propertyIndex = e.ix),
          (a.lock = !1),
          3 === i
            ? expressionHelpers.searchExpressions(t, e.pt, a)
            : 4 === i && expressionHelpers.searchExpressions(t, e.ks, a),
          a.k && t.addDynamicProperty(a),
          a
        );
      };
    })(),
      (TextProperty.prototype.getExpressionValue = function (t, e) {
        var i = this.calculateExpression(e);
        if (t.t === i) return t;
        var r = {};
        return (
          this.copyData(r, t), (r.t = i.toString()), (r.__complete = !1), r
        );
      }),
      (TextProperty.prototype.searchProperty = function () {
        var t = this.searchKeyframes(),
          e = this.searchExpressions();
        return (this.kf = t || e), this.kf;
      }),
      (TextProperty.prototype.searchExpressions = function () {
        if (this.data.d.x)
          return (
            (this.calculateExpression =
              ExpressionManager.initiateExpression.bind(this)(
                this.elem,
                this.data.d,
                this
              )),
            this.addEffect(this.getExpressionValue.bind(this)),
            !0
          );
      });
    var ShapeExpressionInterface = (function () {
        function m(t, e, i) {
          var r,
            s = [],
            a = t ? t.length : 0;
          for (r = 0; r < a; r += 1)
            "gr" == t[r].ty
              ? s.push(n(t[r], e[r], i))
              : "fl" == t[r].ty
              ? s.push(o(t[r], e[r], i))
              : "st" == t[r].ty
              ? s.push(h(t[r], e[r], i))
              : "tm" == t[r].ty
              ? s.push(l(t[r], e[r], i))
              : "tr" == t[r].ty ||
                ("el" == t[r].ty
                  ? s.push(p(t[r], e[r], i))
                  : "sr" == t[r].ty
                  ? s.push(f(t[r], e[r], i))
                  : "sh" == t[r].ty
                  ? s.push(y(t[r], e[r], i))
                  : "rc" == t[r].ty
                  ? s.push(c(t[r], e[r], i))
                  : "rd" == t[r].ty
                  ? s.push(d(t[r], e[r], i))
                  : "rp" == t[r].ty && s.push(u(t[r], e[r], i)));
          return s;
        }
        function n(t, e, i) {
          var r = function (t) {
            switch (t) {
              case "ADBE Vectors Group":
              case "Contents":
              case 2:
                return r.content;
              default:
                return r.transform;
            }
          };
          r.propertyGroup = function (t) {
            return 1 === t ? r : i(t - 1);
          };
          var s,
            a,
            n,
            o,
            h,
            l =
              ((s = t),
              (a = e),
              (n = r.propertyGroup),
              ((h = function (t) {
                for (var e = 0, i = o.length; e < i; ) {
                  if (
                    o[e]._name === t ||
                    o[e].mn === t ||
                    o[e].propertyIndex === t ||
                    o[e].ix === t ||
                    o[e].ind === t
                  )
                    return o[e];
                  e += 1;
                }
                if ("number" == typeof t) return o[t - 1];
              }).propertyGroup = function (t) {
                return 1 === t ? h : n(t - 1);
              }),
              (o = m(s.it, a.it, h.propertyGroup)),
              (h.numProperties = o.length),
              (h.propertyIndex = s.cix),
              (h._name = s.nm),
              h),
            p = (function (e, t, i) {
              function r(t) {
                return 1 == t ? s : i(--t);
              }
              t.transform.mProps.o.setGroupProperty(r),
                t.transform.mProps.p.setGroupProperty(r),
                t.transform.mProps.a.setGroupProperty(r),
                t.transform.mProps.s.setGroupProperty(r),
                t.transform.mProps.r.setGroupProperty(r),
                t.transform.mProps.sk &&
                  (t.transform.mProps.sk.setGroupProperty(r),
                  t.transform.mProps.sa.setGroupProperty(r));
              function s(t) {
                return e.a.ix === t || "Anchor Point" === t
                  ? s.anchorPoint
                  : e.o.ix === t || "Opacity" === t
                  ? s.opacity
                  : e.p.ix === t || "Position" === t
                  ? s.position
                  : e.r.ix === t ||
                    "Rotation" === t ||
                    "ADBE Vector Rotation" === t
                  ? s.rotation
                  : e.s.ix === t || "Scale" === t
                  ? s.scale
                  : (e.sk && e.sk.ix === t) || "Skew" === t
                  ? s.skew
                  : (e.sa && e.sa.ix === t) || "Skew Axis" === t
                  ? s.skewAxis
                  : void 0;
              }
              return (
                t.transform.op.setGroupProperty(r),
                Object.defineProperties(s, {
                  opacity: {
                    get: ExpressionPropertyInterface(t.transform.mProps.o)
                  },
                  position: {
                    get: ExpressionPropertyInterface(t.transform.mProps.p)
                  },
                  anchorPoint: {
                    get: ExpressionPropertyInterface(t.transform.mProps.a)
                  },
                  scale: {
                    get: ExpressionPropertyInterface(t.transform.mProps.s)
                  },
                  rotation: {
                    get: ExpressionPropertyInterface(t.transform.mProps.r)
                  },
                  skew: {
                    get: ExpressionPropertyInterface(t.transform.mProps.sk)
                  },
                  skewAxis: {
                    get: ExpressionPropertyInterface(t.transform.mProps.sa)
                  },
                  _name: { value: e.nm }
                }),
                (s.ty = "tr"),
                (s.mn = e.mn),
                (s.propertyGroup = i),
                s
              );
            })(t.it[t.it.length - 1], e.it[e.it.length - 1], r.propertyGroup);
          return (
            (r.content = l),
            (r.transform = p),
            Object.defineProperty(r, "_name", {
              get: function () {
                return t.nm;
              }
            }),
            (r.numProperties = t.np),
            (r.propertyIndex = t.ix),
            (r.nm = t.nm),
            (r.mn = t.mn),
            r
          );
        }
        function o(t, e, i) {
          function r(t) {
            return "Color" === t || "color" === t
              ? r.color
              : "Opacity" === t || "opacity" === t
              ? r.opacity
              : void 0;
          }
          return (
            Object.defineProperties(r, {
              color: { get: ExpressionPropertyInterface(e.c) },
              opacity: { get: ExpressionPropertyInterface(e.o) },
              _name: { value: t.nm },
              mn: { value: t.mn }
            }),
            e.c.setGroupProperty(i),
            e.o.setGroupProperty(i),
            r
          );
        }
        function h(t, e, i) {
          function r(t) {
            return 1 === t ? ob : i(t - 1);
          }
          function s(t) {
            return 1 === t ? h : r(t - 1);
          }
          var a,
            n,
            o = t.d ? t.d.length : 0,
            h = {};
          for (a = 0; a < o; a += 1)
            (n = a),
              Object.defineProperty(h, t.d[n].nm, {
                get: ExpressionPropertyInterface(e.d.dataProps[n].p)
              }),
              e.d.dataProps[a].p.setGroupProperty(s);
          function l(t) {
            return "Color" === t || "color" === t
              ? l.color
              : "Opacity" === t || "opacity" === t
              ? l.opacity
              : "Stroke Width" === t || "stroke width" === t
              ? l.strokeWidth
              : void 0;
          }
          return (
            Object.defineProperties(l, {
              color: { get: ExpressionPropertyInterface(e.c) },
              opacity: { get: ExpressionPropertyInterface(e.o) },
              strokeWidth: { get: ExpressionPropertyInterface(e.w) },
              dash: {
                get: function () {
                  return h;
                }
              },
              _name: { value: t.nm },
              mn: { value: t.mn }
            }),
            e.c.setGroupProperty(r),
            e.o.setGroupProperty(r),
            e.w.setGroupProperty(r),
            l
          );
        }
        function l(e, t, i) {
          function r(t) {
            return 1 == t ? s : i(--t);
          }
          function s(t) {
            return t === e.e.ix || "End" === t || "end" === t
              ? s.end
              : t === e.s.ix
              ? s.start
              : t === e.o.ix
              ? s.offset
              : void 0;
          }
          return (
            (s.propertyIndex = e.ix),
            t.s.setGroupProperty(r),
            t.e.setGroupProperty(r),
            t.o.setGroupProperty(r),
            (s.propertyIndex = e.ix),
            (s.propertyGroup = i),
            Object.defineProperties(s, {
              start: { get: ExpressionPropertyInterface(t.s) },
              end: { get: ExpressionPropertyInterface(t.e) },
              offset: { get: ExpressionPropertyInterface(t.o) },
              _name: { value: e.nm }
            }),
            (s.mn = e.mn),
            s
          );
        }
        function p(e, t, i) {
          function r(t) {
            return 1 == t ? a : i(--t);
          }
          a.propertyIndex = e.ix;
          var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;
          function a(t) {
            return e.p.ix === t ? a.position : e.s.ix === t ? a.size : void 0;
          }
          return (
            s.s.setGroupProperty(r),
            s.p.setGroupProperty(r),
            Object.defineProperties(a, {
              size: { get: ExpressionPropertyInterface(s.s) },
              position: { get: ExpressionPropertyInterface(s.p) },
              _name: { value: e.nm }
            }),
            (a.mn = e.mn),
            a
          );
        }
        function f(e, t, i) {
          function r(t) {
            return 1 == t ? a : i(--t);
          }
          var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;
          function a(t) {
            return e.p.ix === t
              ? a.position
              : e.r.ix === t
              ? a.rotation
              : e.pt.ix === t
              ? a.points
              : e.or.ix === t || "ADBE Vector Star Outer Radius" === t
              ? a.outerRadius
              : e.os.ix === t
              ? a.outerRoundness
              : !e.ir ||
                (e.ir.ix !== t && "ADBE Vector Star Inner Radius" !== t)
              ? e.is && e.is.ix === t
                ? a.innerRoundness
                : void 0
              : a.innerRadius;
          }
          return (
            (a.propertyIndex = e.ix),
            s.or.setGroupProperty(r),
            s.os.setGroupProperty(r),
            s.pt.setGroupProperty(r),
            s.p.setGroupProperty(r),
            s.r.setGroupProperty(r),
            e.ir && (s.ir.setGroupProperty(r), s.is.setGroupProperty(r)),
            Object.defineProperties(a, {
              position: { get: ExpressionPropertyInterface(s.p) },
              rotation: { get: ExpressionPropertyInterface(s.r) },
              points: { get: ExpressionPropertyInterface(s.pt) },
              outerRadius: { get: ExpressionPropertyInterface(s.or) },
              outerRoundness: { get: ExpressionPropertyInterface(s.os) },
              innerRadius: { get: ExpressionPropertyInterface(s.ir) },
              innerRoundness: { get: ExpressionPropertyInterface(s.is) },
              _name: { value: e.nm }
            }),
            (a.mn = e.mn),
            a
          );
        }
        function c(e, t, i) {
          function r(t) {
            return 1 == t ? a : i(--t);
          }
          var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;
          function a(t) {
            return e.p.ix === t
              ? a.position
              : e.r.ix === t
              ? a.roundness
              : e.s.ix === t || "Size" === t || "ADBE Vector Rect Size" === t
              ? a.size
              : void 0;
          }
          return (
            (a.propertyIndex = e.ix),
            s.p.setGroupProperty(r),
            s.s.setGroupProperty(r),
            s.r.setGroupProperty(r),
            Object.defineProperties(a, {
              position: { get: ExpressionPropertyInterface(s.p) },
              roundness: { get: ExpressionPropertyInterface(s.r) },
              size: { get: ExpressionPropertyInterface(s.s) },
              _name: { value: e.nm }
            }),
            (a.mn = e.mn),
            a
          );
        }
        function d(e, t, i) {
          var r = t;
          function s(t) {
            if (e.r.ix === t || "Round Corners 1" === t) return s.radius;
          }
          return (
            (s.propertyIndex = e.ix),
            r.rd.setGroupProperty(function (t) {
              return 1 == t ? s : i(--t);
            }),
            Object.defineProperties(s, {
              radius: { get: ExpressionPropertyInterface(r.rd) },
              _name: { value: e.nm }
            }),
            (s.mn = e.mn),
            s
          );
        }
        function u(e, t, i) {
          function r(t) {
            return 1 == t ? a : i(--t);
          }
          var s = t;
          function a(t) {
            return e.c.ix === t || "Copies" === t
              ? a.copies
              : e.o.ix === t || "Offset" === t
              ? a.offset
              : void 0;
          }
          return (
            (a.propertyIndex = e.ix),
            s.c.setGroupProperty(r),
            s.o.setGroupProperty(r),
            Object.defineProperties(a, {
              copies: { get: ExpressionPropertyInterface(s.c) },
              offset: { get: ExpressionPropertyInterface(s.o) },
              _name: { value: e.nm }
            }),
            (a.mn = e.mn),
            a
          );
        }
        function y(t, e, i) {
          var r = e.sh;
          function s(t) {
            if (
              "Shape" === t ||
              "shape" === t ||
              "Path" === t ||
              "path" === t ||
              "ADBE Vector Shape" === t ||
              2 === t
            )
              return s.path;
          }
          return (
            r.setGroupProperty(function (t) {
              return 1 == t ? s : i(--t);
            }),
            Object.defineProperties(s, {
              path: {
                get: function () {
                  return r.k && r.getValue(), r;
                }
              },
              shape: {
                get: function () {
                  return r.k && r.getValue(), r;
                }
              },
              _name: { value: t.nm },
              ix: { value: t.ix },
              propertyIndex: { value: t.ix },
              mn: { value: t.mn }
            }),
            s
          );
        }
        return function (t, e, i) {
          var r;
          function s(t) {
            if ("number" == typeof t) return r[t - 1];
            for (var e = 0, i = r.length; e < i; ) {
              if (r[e]._name === t) return r[e];
              e += 1;
            }
          }
          return (
            (s.propertyGroup = i),
            (r = m(t, e, s)),
            (s.numProperties = r.length),
            s
          );
        };
      })(),
      TextExpressionInterface = function (e) {
        var i;
        function t() {}
        return (
          Object.defineProperty(t, "sourceText", {
            get: function () {
              e.textProperty.getValue();
              var t = e.textProperty.currentData.t;
              return (
                void 0 !== t &&
                  ((e.textProperty.currentData.t = void 0),
                  ((i = new String(t)).value = t || new String(t))),
                i
              );
            }
          }),
          t
        );
      },
      LayerExpressionInterface = (function () {
        function s(t, e) {
          var i = new Matrix();
          if (
            (i.reset(),
            this._elem.finalTransform.mProp.applyToMatrix(i),
            this._elem.hierarchy && this._elem.hierarchy.length)
          ) {
            var r,
              s = this._elem.hierarchy.length;
            for (r = 0; r < s; r += 1)
              this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(i);
            return i.applyToPointArray(t[0], t[1], t[2] || 0);
          }
          return i.applyToPointArray(t[0], t[1], t[2] || 0);
        }
        function a(t, e) {
          var i = new Matrix();
          if (
            (i.reset(),
            this._elem.finalTransform.mProp.applyToMatrix(i),
            this._elem.hierarchy && this._elem.hierarchy.length)
          ) {
            var r,
              s = this._elem.hierarchy.length;
            for (r = 0; r < s; r += 1)
              this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(i);
            return i.inversePoint(t);
          }
          return i.inversePoint(t);
        }
        function n(t) {
          var e = new Matrix();
          if (
            (e.reset(),
            this._elem.finalTransform.mProp.applyToMatrix(e),
            this._elem.hierarchy && this._elem.hierarchy.length)
          ) {
            var i,
              r = this._elem.hierarchy.length;
            for (i = 0; i < r; i += 1)
              this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(e);
            return e.inversePoint(t);
          }
          return e.inversePoint(t);
        }
        function o() {
          return [1, 1, 1, 1];
        }
        return function (e) {
          var i;
          function r(t) {
            switch (t) {
              case "ADBE Root Vectors Group":
              case "Contents":
              case 2:
                return r.shapeInterface;
              case 1:
              case 6:
              case "Transform":
              case "transform":
              case "ADBE Transform Group":
                return i;
              case 4:
              case "ADBE Effect Parade":
              case "effects":
              case "Effects":
                return r.effect;
            }
          }
          (r.toWorld = s),
            (r.fromWorld = a),
            (r.toComp = s),
            (r.fromComp = n),
            (r.sampleImage = o),
            (r.sourceRectAtTime = e.sourceRectAtTime.bind(e));
          var t = getDescriptor(
            (i = TransformExpressionInterface(
              (r._elem = e).finalTransform.mProp
            )),
            "anchorPoint"
          );
          return (
            Object.defineProperties(r, {
              hasParent: {
                get: function () {
                  return e.hierarchy.length;
                }
              },
              parent: {
                get: function () {
                  return e.hierarchy[0].layerInterface;
                }
              },
              rotation: getDescriptor(i, "rotation"),
              scale: getDescriptor(i, "scale"),
              position: getDescriptor(i, "position"),
              opacity: getDescriptor(i, "opacity"),
              anchorPoint: t,
              anchor_point: t,
              transform: {
                get: function () {
                  return i;
                }
              },
              active: {
                get: function () {
                  return e.isInRange;
                }
              }
            }),
            (r.startTime = e.data.st),
            (r.index = e.data.ind),
            (r.source = e.data.refId),
            (r.height = 0 === e.data.ty ? e.data.h : 100),
            (r.width = 0 === e.data.ty ? e.data.w : 100),
            (r.inPoint = e.data.ip / e.comp.globalData.frameRate),
            (r.outPoint = e.data.op / e.comp.globalData.frameRate),
            (r._name = e.data.nm),
            (r.registerMaskInterface = function (t) {
              r.mask = new MaskManagerInterface(t, e);
            }),
            (r.registerEffectsInterface = function (t) {
              r.effect = t;
            }),
            r
          );
        };
      })(),
      CompExpressionInterface = function (r) {
        function t(t) {
          for (var e = 0, i = r.layers.length; e < i; ) {
            if (r.layers[e].nm === t || r.layers[e].ind === t)
              return r.elements[e].layerInterface;
            e += 1;
          }
          return null;
        }
        return (
          Object.defineProperty(t, "_name", { value: r.data.nm }),
          ((t.layer = t).pixelAspect = 1),
          (t.height = r.data.h || r.globalData.compSize.h),
          (t.width = r.data.w || r.globalData.compSize.w),
          (t.pixelAspect = 1),
          (t.frameDuration = 1 / r.globalData.frameRate),
          (t.displayStartTime = 0),
          (t.numLayers = r.layers.length),
          t
        );
      },
      TransformExpressionInterface = function (t) {
        function e(t) {
          switch (t) {
            case "scale":
            case "Scale":
            case "ADBE Scale":
            case 6:
              return e.scale;
            case "rotation":
            case "Rotation":
            case "ADBE Rotation":
            case "ADBE Rotate Z":
            case 10:
              return e.rotation;
            case "ADBE Rotate X":
              return e.xRotation;
            case "ADBE Rotate Y":
              return e.yRotation;
            case "position":
            case "Position":
            case "ADBE Position":
            case 2:
              return e.position;
            case "ADBE Position_0":
              return e.xPosition;
            case "ADBE Position_1":
              return e.yPosition;
            case "ADBE Position_2":
              return e.zPosition;
            case "anchorPoint":
            case "AnchorPoint":
            case "Anchor Point":
            case "ADBE AnchorPoint":
            case 1:
              return e.anchorPoint;
            case "opacity":
            case "Opacity":
            case 11:
              return e.opacity;
          }
        }
        if (
          (Object.defineProperty(e, "rotation", {
            get: ExpressionPropertyInterface(t.r || t.rz)
          }),
          Object.defineProperty(e, "zRotation", {
            get: ExpressionPropertyInterface(t.rz || t.r)
          }),
          Object.defineProperty(e, "xRotation", {
            get: ExpressionPropertyInterface(t.rx)
          }),
          Object.defineProperty(e, "yRotation", {
            get: ExpressionPropertyInterface(t.ry)
          }),
          Object.defineProperty(e, "scale", {
            get: ExpressionPropertyInterface(t.s)
          }),
          t.p)
        )
          var i = ExpressionPropertyInterface(t.p);
        return (
          Object.defineProperty(e, "position", {
            get: function () {
              return t.p ? i() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0];
            }
          }),
          Object.defineProperty(e, "xPosition", {
            get: ExpressionPropertyInterface(t.px)
          }),
          Object.defineProperty(e, "yPosition", {
            get: ExpressionPropertyInterface(t.py)
          }),
          Object.defineProperty(e, "zPosition", {
            get: ExpressionPropertyInterface(t.pz)
          }),
          Object.defineProperty(e, "anchorPoint", {
            get: ExpressionPropertyInterface(t.a)
          }),
          Object.defineProperty(e, "opacity", {
            get: ExpressionPropertyInterface(t.o)
          }),
          Object.defineProperty(e, "skew", {
            get: ExpressionPropertyInterface(t.sk)
          }),
          Object.defineProperty(e, "skewAxis", {
            get: ExpressionPropertyInterface(t.sa)
          }),
          Object.defineProperty(e, "orientation", {
            get: ExpressionPropertyInterface(t.or)
          }),
          e
        );
      },
      ProjectInterface = (function () {
        function e(t) {
          this.compositions.push(t);
        }
        return function () {
          function t(t) {
            for (var e = 0, i = this.compositions.length; e < i; ) {
              if (
                this.compositions[e].data &&
                this.compositions[e].data.nm === t
              )
                return (
                  this.compositions[e].prepareFrame &&
                    this.compositions[e].data.xt &&
                    this.compositions[e].prepareFrame(this.currentFrame),
                  this.compositions[e].compInterface
                );
              e += 1;
            }
          }
          return (
            (t.compositions = []),
            (t.currentFrame = 0),
            (t.registerComposition = e),
            t
          );
        };
      })(),
      EffectsExpressionInterface = (function () {
        function l(s, t, e, i) {
          var r,
            a = [],
            n = s.ef.length;
          for (r = 0; r < n; r += 1)
            5 === s.ef[r].ty
              ? a.push(
                  l(
                    s.ef[r],
                    t.effectElements[r],
                    t.effectElements[r].propertyGroup,
                    i
                  )
                )
              : a.push(p(t.effectElements[r], s.ef[r].ty, i, o));
          function o(t) {
            return 1 === t ? h : e(t - 1);
          }
          var h = function (t) {
            for (var e = s.ef, i = 0, r = e.length; i < r; ) {
              if (t === e[i].nm || t === e[i].mn || t === e[i].ix)
                return 5 === e[i].ty ? a[i] : a[i]();
              i += 1;
            }
            return a[0]();
          };
          return (
            (h.propertyGroup = o),
            "ADBE Color Control" === s.mn &&
              Object.defineProperty(h, "color", {
                get: function () {
                  return a[0]();
                }
              }),
            Object.defineProperty(h, "numProperties", {
              get: function () {
                return s.np;
              }
            }),
            (h.active = h.enabled = 0 !== s.en),
            h
          );
        }
        function p(t, e, i, r) {
          var s = ExpressionPropertyInterface(t.p);
          return (
            t.p.setGroupProperty && t.p.setGroupProperty(r),
            function () {
              return 10 === e ? i.comp.compInterface(t.p.v) : s();
            }
          );
        }
        return {
          createEffectsInterface: function (s, t) {
            if (s.effectsManager) {
              var e,
                a = [],
                i = s.data.ef,
                r = s.effectsManager.effectElements.length;
              for (e = 0; e < r; e += 1)
                a.push(l(i[e], s.effectsManager.effectElements[e], t, s));
              return function (t) {
                for (var e = s.data.ef || [], i = 0, r = e.length; i < r; ) {
                  if (t === e[i].nm || t === e[i].mn || t === e[i].ix)
                    return a[i];
                  i += 1;
                }
              };
            }
          }
        };
      })(),
      MaskManagerInterface = (function () {
        function a(t, e) {
          (this._mask = t), (this._data = e);
        }
        Object.defineProperty(a.prototype, "maskPath", {
          get: function () {
            return (
              this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
            );
          }
        }),
          Object.defineProperty(a.prototype, "maskOpacity", {
            get: function () {
              return (
                this._mask.op.k && this._mask.op.getValue(),
                100 * this._mask.op.v
              );
            }
          });
        return function (e, t) {
          var i,
            r = createSizedArray(e.viewData.length),
            s = e.viewData.length;
          for (i = 0; i < s; i += 1)
            r[i] = new a(e.viewData[i], e.masksProperties[i]);
          return function (t) {
            for (i = 0; i < s; ) {
              if (e.masksProperties[i].nm === t) return r[i];
              i += 1;
            }
          };
        };
      })(),
      ExpressionPropertyInterface = (function () {
        var s = { pv: 0, v: 0, mult: 1 },
          n = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
        function o(r, s, a) {
          Object.defineProperty(r, "velocity", {
            get: function () {
              return s.getVelocityAtTime(s.comp.currentFrame);
            }
          }),
            (r.numKeys = s.keyframes ? s.keyframes.length : 0),
            (r.key = function (t) {
              if (r.numKeys) {
                var e = "";
                e =
                  "s" in s.keyframes[t - 1]
                    ? s.keyframes[t - 1].s
                    : "e" in s.keyframes[t - 2]
                    ? s.keyframes[t - 2].e
                    : s.keyframes[t - 2].s;
                var i =
                  "unidimensional" === a ? new Number(e) : Object.assign({}, e);
                return (
                  (i.time =
                    s.keyframes[t - 1].t / s.elem.comp.globalData.frameRate),
                  i
                );
              }
              return 0;
            }),
            (r.valueAtTime = s.getValueAtTime),
            (r.speedAtTime = s.getSpeedAtTime),
            (r.velocityAtTime = s.getVelocityAtTime),
            (r.propertyGroup = s.propertyGroup);
        }
        function e() {
          return s;
        }
        return function (t) {
          return t
            ? "unidimensional" === t.propType
              ? (function (t) {
                  (t && "pv" in t) || (t = s);
                  var e = 1 / t.mult,
                    i = t.pv * e,
                    r = new Number(i);
                  return (
                    (r.value = i),
                    o(r, t, "unidimensional"),
                    function () {
                      return (
                        t.k && t.getValue(),
                        (i = t.v * e),
                        r.value !== i &&
                          (((r = new Number(i)).value = i),
                          o(r, t, "unidimensional")),
                        r
                      );
                    }
                  );
                })(t)
              : (function (e) {
                  (e && "pv" in e) || (e = n);
                  var i = 1 / e.mult,
                    r = e.pv.length,
                    s = createTypedArray("float32", r),
                    a = createTypedArray("float32", r);
                  return (
                    (s.value = a),
                    o(s, e, "multidimensional"),
                    function () {
                      e.k && e.getValue();
                      for (var t = 0; t < r; t += 1) s[t] = a[t] = e.v[t] * i;
                      return s;
                    }
                  );
                })(t)
            : e;
        };
      })(),
      G5,
      H5;
    function SliderEffect(t, e, i) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
    }
    function AngleEffect(t, e, i) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
    }
    function ColorEffect(t, e, i) {
      this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
    }
    function PointEffect(t, e, i) {
      this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
    }
    function LayerIndexEffect(t, e, i) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
    }
    function MaskIndexEffect(t, e, i) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
    }
    function CheckboxEffect(t, e, i) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
    }
    function NoValueEffect() {
      this.p = {};
    }
    function EffectsManager() {}
    function EffectsManager(t, e) {
      var i = t.ef || [];
      this.effectElements = [];
      var r,
        s,
        a = i.length;
      for (r = 0; r < a; r++)
        (s = new GroupEffect(i[r], e)), this.effectElements.push(s);
    }
    function GroupEffect(t, e) {
      this.init(t, e);
    }
    (G5 = (function () {
      function i(t, e) {
        return (
          (this.textIndex = t + 1),
          (this.textTotal = e),
          (this.v = this.getValue() * this.mult),
          this.v
        );
      }
      return function (t, e) {
        (this.pv = 1),
          (this.comp = t.comp),
          (this.elem = t),
          (this.mult = 0.01),
          (this.propType = "textSelector"),
          (this.textTotal = e.totalChars),
          (this.selectorValue = 100),
          (this.lastValue = [1, 1, 1]),
          (this.k = !0),
          (this.x = !0),
          (this.getValue = ExpressionManager.initiateExpression.bind(this)(
            t,
            e,
            this
          )),
          (this.getMult = i),
          (this.getVelocityAtTime = expressionHelpers.getVelocityAtTime),
          this.kf
            ? (this.getValueAtTime =
                expressionHelpers.getValueAtTime.bind(this))
            : (this.getValueAtTime =
                expressionHelpers.getStaticValueAtTime.bind(this)),
          (this.setGroupProperty = expressionHelpers.setGroupProperty);
      };
    })()),
      (H5 = TextSelectorProp.getTextSelectorProp),
      (TextSelectorProp.getTextSelectorProp = function (t, e, i) {
        return 1 === e.t ? new G5(t, e, i) : H5(t, e, i);
      }),
      extendPrototype([DynamicPropertyContainer], GroupEffect),
      (GroupEffect.prototype.getValue =
        GroupEffect.prototype.iterateDynamicProperties),
      (GroupEffect.prototype.init = function (t, e) {
        (this.data = t),
          (this.effectElements = []),
          this.initDynamicPropertyContainer(e);
        var i,
          r,
          s = this.data.ef.length,
          a = this.data.ef;
        for (i = 0; i < s; i += 1) {
          switch (((r = null), a[i].ty)) {
            case 0:
              r = new SliderEffect(a[i], e, this);
              break;
            case 1:
              r = new AngleEffect(a[i], e, this);
              break;
            case 2:
              r = new ColorEffect(a[i], e, this);
              break;
            case 3:
              r = new PointEffect(a[i], e, this);
              break;
            case 4:
            case 7:
              r = new CheckboxEffect(a[i], e, this);
              break;
            case 10:
              r = new LayerIndexEffect(a[i], e, this);
              break;
            case 11:
              r = new MaskIndexEffect(a[i], e, this);
              break;
            case 5:
              r = new EffectsManager(a[i], e, this);
              break;
            default:
              r = new NoValueEffect(a[i], e, this);
          }
          r && this.effectElements.push(r);
        }
      });
    var lottie = {},
      _isFrozen = !1;
    function setLocationHref(t) {
      locationHref = t;
    }
    function searchAnimations() {
      !0 === standalone
        ? animationManager.searchAnimations(animationData, standalone, renderer)
        : animationManager.searchAnimations();
    }
    function setSubframeRendering(t) {
      subframeEnabled = t;
    }
    function loadAnimation(t) {
      return (
        !0 === standalone && (t.animationData = JSON.parse(animationData)),
        animationManager.loadAnimation(t)
      );
    }
    function setQuality(t) {
      if ("string" == typeof t)
        switch (t) {
          case "high":
            defaultCurveSegments = 200;
            break;
          case "medium":
            defaultCurveSegments = 50;
            break;
          case "low":
            defaultCurveSegments = 10;
        }
      else !isNaN(t) && 1 < t && (defaultCurveSegments = t);
      roundValues(!(50 <= defaultCurveSegments));
    }
    function inBrowser() {
      return "undefined" != typeof navigator;
    }
    function installPlugin(t, e) {
      "expressions" === t && (expressionsPlugin = e);
    }
    function getFactory(t) {
      switch (t) {
        case "propertyFactory":
          return PropertyFactory;
        case "shapePropertyFactory":
          return ShapePropertyFactory;
        case "matrix":
          return Matrix;
      }
    }
    function checkReady() {
      "complete" === document.readyState &&
        (clearInterval(readyStateCheckInterval), searchAnimations());
    }
    function getQueryVariable(t) {
      for (var e = queryString.split("&"), i = 0; i < e.length; i++) {
        var r = e[i].split("=");
        if (decodeURIComponent(r[0]) == t) return decodeURIComponent(r[1]);
      }
    }
    (lottie.play = animationManager.play),
      (lottie.pause = animationManager.pause),
      (lottie.setLocationHref = setLocationHref),
      (lottie.togglePause = animationManager.togglePause),
      (lottie.setSpeed = animationManager.setSpeed),
      (lottie.setDirection = animationManager.setDirection),
      (lottie.stop = animationManager.stop),
      (lottie.searchAnimations = searchAnimations),
      (lottie.registerAnimation = animationManager.registerAnimation),
      (lottie.loadAnimation = loadAnimation),
      (lottie.setSubframeRendering = setSubframeRendering),
      (lottie.resize = animationManager.resize),
      (lottie.goToAndStop = animationManager.goToAndStop),
      (lottie.destroy = animationManager.destroy),
      (lottie.setQuality = setQuality),
      (lottie.inBrowser = inBrowser),
      (lottie.installPlugin = installPlugin),
      (lottie.freeze = animationManager.freeze),
      (lottie.unfreeze = animationManager.unfreeze),
      (lottie.getRegisteredAnimations =
        animationManager.getRegisteredAnimations),
      (lottie.__getFactory = getFactory),
      (lottie.version = "5.6.10");
    var standalone = "__[STANDALONE]__",
      animationData = "__[ANIMATIONDATA]__",
      renderer = "";
    if (standalone) {
      var scripts = document.getElementsByTagName("script"),
        index = scripts.length - 1,
        myScript = scripts[index] || { src: "" },
        queryString = myScript.src.replace(/^[^\?]+\??/, "");
      renderer = getQueryVariable("renderer");
    }
    var readyStateCheckInterval = setInterval(checkReady, 100);
    return lottie;
  });
