import { g as getHash, d as dataMediaQueries, s as slideDown, a as setHash, b as slideUp, c as slideToggle } from "./app.min.js";
import "./arrowlink.min.js";
/* empty css               */
/* empty css          */
/* empty css                */
/* empty css                */
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function tabs() {
  const tabs2 = document.querySelectorAll("[data-fls-tabs]");
  let tabsActiveHash = [];
  if (tabs2.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith("tab-")) {
      tabsActiveHash = hash.replace("tab-", "").split("-");
    }
    tabs2.forEach((tabsBlock, index) => {
      tabsBlock.classList.add("--tab-init");
      tabsBlock.setAttribute("data-fls-tabs-index", index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });
    let mdQueriesArray = dataMediaQueries(tabs2, "flsTabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        mdQueriesItem.matchMedia.addEventListener("change", function() {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach((tabsMediaItem) => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector("[data-fls-tabs-titles]");
      let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-fls-tabs-title]");
      let tabsContent = tabsMediaItem.querySelector("[data-fls-tabs-body]");
      let tabsContentItems = tabsMediaItem.querySelectorAll("[data-fls-tabs-item]");
      tabsTitleItems = Array.from(tabsTitleItems).filter((item) => item.closest("[data-fls-tabs]") === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter((item) => item.closest("[data-fls-tabs]") === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add("--tab-spoller");
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove("--tab-spoller");
        }
      });
    });
  }
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-fls-tabs-titles]>*");
    let tabsContent = tabsBlock.querySelectorAll("[data-fls-tabs-body]>*");
    const tabsBlockIndex = tabsBlock.dataset.flsTabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector("[data-fls-tabs-titles]>.--tab-active");
      tabsActiveTitle ? tabsActiveTitle.classList.remove("--tab-active") : null;
    }
    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute("data-fls-tabs-title", "");
        tabsContentItem.setAttribute("data-fls-tabs-item", "");
        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add("--tab-active");
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains("--tab-active");
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-fls-tabs-title]");
    let tabsContent = tabsBlock.querySelectorAll("[data-fls-tabs-item]");
    const tabsBlockIndex = tabsBlock.dataset.flsTabsIndex;
    function isTabsAnamate(tabsBlock2) {
      if (tabsBlock2.hasAttribute("data-fls-tabs-animate")) {
        return tabsBlock2.dataset.flsTabsAnimate > 0 ? Number(tabsBlock2.dataset.flsTabsAnimate) : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute("data-fls-tabs-hash");
      tabsContent = Array.from(tabsContent).filter((item) => item.closest("[data-fls-tabs]") === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter((item) => item.closest("[data-fls-tabs]") === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains("--tab-active")) {
          if (tabsBlockAnimate) {
            slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest(".popup")) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest("[data-fls-tabs-title]")) {
      const tabTitle = el.closest("[data-fls-tabs-title]");
      const tabsBlock = tabTitle.closest("[data-fls-tabs]");
      if (!tabTitle.classList.contains("--tab-active") && !tabsBlock.querySelector(".--slide")) {
        let tabActiveTitle = tabsBlock.querySelectorAll("[data-fls-tabs-title].--tab-active");
        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item) => item.closest("[data-fls-tabs]") === tabsBlock) : null;
        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("--tab-active") : null;
        tabTitle.classList.add("--tab-active");
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
window.addEventListener("load", tabs);
function spollers() {
  const spollersArray = document.querySelectorAll("[data-fls-spollers]");
  if (spollersArray.length > 0) {
    let initSpollers = function(spollersArray2, matchMedia = false) {
      spollersArray2.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("--spoller-init");
          initSpollerBody(spollersBlock);
        } else {
          spollersBlock.classList.remove("--spoller-init");
          initSpollerBody(spollersBlock, false);
        }
      });
    }, initSpollerBody = function(spollersBlock, hideSpollerBody = true) {
      let spollerItems = spollersBlock.querySelectorAll("details");
      if (spollerItems.length) {
        spollerItems.forEach((spollerItem) => {
          let spollerTitle = spollerItem.querySelector("summary");
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerItem.hasAttribute("data-fls-spollers-open")) {
              spollerItem.open = false;
              spollerTitle.nextElementSibling.hidden = true;
            } else {
              spollerTitle.classList.add("--spoller-active");
              spollerItem.open = true;
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.classList.remove("--spoller-active");
            spollerItem.open = true;
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }, setSpollerAction = function(e) {
      const el = e.target;
      if (el.closest("summary") && el.closest("[data-fls-spollers]")) {
        e.preventDefault();
        if (el.closest("[data-fls-spollers]").classList.contains("--spoller-init")) {
          const spollerTitle = el.closest("summary");
          const spollerBlock = spollerTitle.closest("details");
          const spollersBlock = spollerTitle.closest("[data-fls-spollers]");
          const oneSpoller = spollersBlock.hasAttribute("data-fls-spollers-one");
          const scrollSpoller = spollerBlock.hasAttribute("data-fls-spollers-scroll");
          const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
          if (!spollersBlock.querySelectorAll(".--slide").length) {
            if (oneSpoller && !spollerBlock.open) {
              hideSpollersBody(spollersBlock);
            }
            !spollerBlock.open ? spollerBlock.open = true : setTimeout(() => {
              spollerBlock.open = false;
            }, spollerSpeed);
            spollerTitle.classList.toggle("--spoller-active");
            slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
            if (scrollSpoller && spollerTitle.classList.contains("--spoller-active")) {
              const scrollSpollerValue = spollerBlock.dataset.flsSpollersScroll;
              const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
              const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-fls-spollers-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
              window.scrollTo(
                {
                  top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                  behavior: "smooth"
                }
              );
            }
          }
        }
      }
      if (!el.closest("[data-fls-spollers]")) {
        const spollersClose = document.querySelectorAll("[data-fls-spollers-close]");
        if (spollersClose.length) {
          spollersClose.forEach((spollerClose) => {
            const spollersBlock = spollerClose.closest("[data-fls-spollers]");
            const spollerCloseBlock = spollerClose.parentNode;
            if (spollersBlock.classList.contains("--spoller-init")) {
              const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
              spollerClose.classList.remove("--spoller-active");
              slideUp(spollerClose.nextElementSibling, spollerSpeed);
              setTimeout(() => {
                spollerCloseBlock.open = false;
              }, spollerSpeed);
            }
          });
        }
      }
    }, hideSpollersBody = function(spollersBlock) {
      const spollerActiveBlock = spollersBlock.querySelector("details[open]");
      if (spollerActiveBlock && !spollersBlock.querySelectorAll(".--slide").length) {
        const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
        const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
        spollerActiveTitle.classList.remove("--spoller-active");
        slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
        setTimeout(() => {
          spollerActiveBlock.open = false;
        }, spollerSpeed);
      }
    };
    document.addEventListener("click", setSpollerAction);
    const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
      return !item.dataset.flsSpollers.split(",")[0];
    });
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }
    let mdQueriesArray = dataMediaQueries(spollersArray, "flsSpollers");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        mdQueriesItem.matchMedia.addEventListener("change", function() {
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
}
window.addEventListener("load", spollers);
var datepicker_min = { exports: {} };
var hasRequiredDatepicker_min;
function requireDatepicker_min() {
  if (hasRequiredDatepicker_min) return datepicker_min.exports;
  hasRequiredDatepicker_min = 1;
  (function(module, exports) {
    !function(e, t) {
      module.exports = t();
    }(window, function() {
      return function(e) {
        var t = {};
        function n(a) {
          if (t[a]) return t[a].exports;
          var r = t[a] = { i: a, l: false, exports: {} };
          return e[a].call(r.exports, r, r.exports, n), r.l = true, r.exports;
        }
        return n.m = e, n.c = t, n.d = function(e2, t2, a) {
          n.o(e2, t2) || Object.defineProperty(e2, t2, { enumerable: true, get: a });
        }, n.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        }, n.t = function(e2, t2) {
          if (1 & t2 && (e2 = n(e2)), 8 & t2) return e2;
          if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule) return e2;
          var a = /* @__PURE__ */ Object.create(null);
          if (n.r(a), Object.defineProperty(a, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2) for (var r in e2) n.d(a, r, (function(t3) {
            return e2[t3];
          }).bind(null, r));
          return a;
        }, n.n = function(e2) {
          var t2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return n.d(t2, "a", t2), t2;
        }, n.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, n.p = "", n(n.s = 0);
      }([function(e, t, n) {
        n.r(t);
        var a = [], r = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], i = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], o = { t: "top", r: "right", b: "bottom", l: "left", c: "centered" };
        function s() {
        }
        var l = ["click", "focusin", "keydown", "input"];
        function d(e2) {
          l.forEach(function(t2) {
            e2.addEventListener(t2, e2 === document ? L : Y);
          });
        }
        function c(e2) {
          return Array.isArray(e2) ? e2.map(c) : "[object Object]" === x(e2) ? Object.keys(e2).reduce(function(t2, n2) {
            return t2[n2] = c(e2[n2]), t2;
          }, {}) : e2;
        }
        function u(e2, t2) {
          var n2 = e2.calendar.querySelector(".qs-overlay"), a2 = n2 && !n2.classList.contains("qs-hidden");
          t2 = t2 || new Date(e2.currentYear, e2.currentMonth), e2.calendar.innerHTML = [h(t2, e2, a2), f(t2, e2, a2), v(e2, a2)].join(""), a2 && window.requestAnimationFrame(function() {
            M(true, e2);
          });
        }
        function h(e2, t2, n2) {
          return ['<div class="qs-controls' + (n2 ? " qs-blur" : "") + '">', '<div class="qs-arrow qs-left"></div>', '<div class="qs-month-year' + (t2.disableYearOverlay ? " qs-disabled-year-overlay" : "") + '">', '<span class="qs-month">' + t2.months[e2.getMonth()] + "</span>", '<span class="qs-year">' + e2.getFullYear() + "</span>", "</div>", '<div class="qs-arrow qs-right"></div>', "</div>"].join("");
        }
        function f(e2, t2, n2) {
          var a2 = t2.currentMonth, r2 = t2.currentYear, i2 = t2.dateSelected, o2 = t2.maxDate, s2 = t2.minDate, l2 = t2.showAllDates, d2 = t2.days, c2 = t2.disabledDates, u2 = t2.startDay, h2 = t2.weekendIndices, f2 = t2.events, v2 = t2.getRange ? t2.getRange() : {}, m2 = +v2.start, y2 = +v2.end, p2 = g(new Date(e2).setDate(1)), w2 = p2.getDay() - u2, D2 = w2 < 0 ? 7 : 0;
          p2.setMonth(p2.getMonth() + 1), p2.setDate(0);
          var b2 = p2.getDate(), q2 = [], S2 = D2 + 7 * ((w2 + b2) / 7 | 0);
          S2 += (w2 + b2) % 7 ? 7 : 0;
          for (var M2 = 1; M2 <= S2; M2++) {
            var E2 = (M2 - 1) % 7, x2 = d2[E2], C2 = M2 - (w2 >= 0 ? w2 : 7 + w2), L2 = new Date(r2, a2, C2), Y2 = f2[+L2], j2 = C2 < 1 || C2 > b2, O2 = j2 ? C2 < 1 ? -1 : 1 : 0, P2 = j2 && !l2, k2 = P2 ? "" : L2.getDate(), N2 = +L2 == +i2, _2 = E2 === h2[0] || E2 === h2[1], I2 = m2 !== y2, A2 = "qs-square " + x2;
            Y2 && !P2 && (A2 += " qs-event"), j2 && (A2 += " qs-outside-current-month"), !l2 && j2 || (A2 += " qs-num"), N2 && (A2 += " qs-active"), (c2[+L2] || t2.disabler(L2) || _2 && t2.noWeekends || s2 && +L2 < +s2 || o2 && +L2 > +o2) && !P2 && (A2 += " qs-disabled"), +g(/* @__PURE__ */ new Date()) == +L2 && (A2 += " qs-current"), +L2 === m2 && y2 && I2 && (A2 += " qs-range-start"), +L2 > m2 && +L2 < y2 && (A2 += " qs-range-middle"), +L2 === y2 && m2 && I2 && (A2 += " qs-range-end"), P2 && (A2 += " qs-empty", k2 = ""), q2.push('<div class="' + A2 + '" data-direction="' + O2 + '">' + k2 + "</div>");
          }
          var R2 = d2.map(function(e3) {
            return '<div class="qs-square qs-day">' + e3 + "</div>";
          }).concat(q2);
          return R2.unshift('<div class="qs-squares' + (n2 ? " qs-blur" : "") + '">'), R2.push("</div>"), R2.join("");
        }
        function v(e2, t2) {
          var n2 = e2.overlayPlaceholder, a2 = e2.overlayButton;
          return ['<div class="qs-overlay' + (t2 ? "" : " qs-hidden") + '">', "<div>", '<input class="qs-overlay-year" placeholder="' + n2 + '" inputmode="numeric" />', '<div class="qs-close">&#10005;</div>', "</div>", '<div class="qs-overlay-month-container">' + e2.overlayMonths.map(function(e3, t3) {
            return '<div class="qs-overlay-month" data-month-num="' + t3 + '">' + e3 + "</div>";
          }).join("") + "</div>", '<div class="qs-submit qs-disabled">' + a2 + "</div>", "</div>"].join("");
        }
        function m(e2, t2, n2) {
          var a2 = t2.el, r2 = t2.calendar.querySelector(".qs-active"), i2 = e2.textContent, o2 = t2.sibling;
          (a2.disabled || a2.readOnly) && t2.respectDisabledReadOnly || (t2.dateSelected = n2 ? void 0 : new Date(t2.currentYear, t2.currentMonth, i2), r2 && r2.classList.remove("qs-active"), n2 || e2.classList.add("qs-active"), p(a2, t2, n2), n2 || q(t2), o2 && (y({ instance: t2, deselect: n2 }), t2.first && !o2.dateSelected && (o2.currentYear = t2.currentYear, o2.currentMonth = t2.currentMonth, o2.currentMonthName = t2.currentMonthName), u(t2), u(o2)), t2.onSelect(t2, n2 ? void 0 : new Date(t2.dateSelected)));
        }
        function y(e2) {
          var t2 = e2.instance.first ? e2.instance : e2.instance.sibling, n2 = t2.sibling;
          t2 === e2.instance ? e2.deselect ? (t2.minDate = t2.originalMinDate, n2.minDate = n2.originalMinDate) : n2.minDate = t2.dateSelected : e2.deselect ? (n2.maxDate = n2.originalMaxDate, t2.maxDate = t2.originalMaxDate) : t2.maxDate = n2.dateSelected;
        }
        function p(e2, t2, n2) {
          if (!t2.nonInput) return n2 ? e2.value = "" : t2.formatter !== s ? t2.formatter(e2, t2.dateSelected, t2) : void (e2.value = t2.dateSelected.toDateString());
        }
        function w(e2, t2, n2, a2) {
          n2 || a2 ? (n2 && (t2.currentYear = +n2), a2 && (t2.currentMonth = +a2)) : (t2.currentMonth += e2.contains("qs-right") ? 1 : -1, 12 === t2.currentMonth ? (t2.currentMonth = 0, t2.currentYear++) : -1 === t2.currentMonth && (t2.currentMonth = 11, t2.currentYear--)), t2.currentMonthName = t2.months[t2.currentMonth], u(t2), t2.onMonthChange(t2);
        }
        function D(e2) {
          if (!e2.noPosition) {
            var t2 = e2.position.top, n2 = e2.position.right;
            if (e2.position.centered) return e2.calendarContainer.classList.add("qs-centered");
            var a2 = e2.positionedEl.getBoundingClientRect(), r2 = e2.el.getBoundingClientRect(), i2 = e2.calendarContainer.getBoundingClientRect(), o2 = r2.top - a2.top + (t2 ? -1 * i2.height : r2.height) + "px", s2 = r2.left - a2.left + (n2 ? r2.width - i2.width : 0) + "px";
            e2.calendarContainer.style.setProperty("top", o2), e2.calendarContainer.style.setProperty("left", s2);
          }
        }
        function b(e2) {
          return "[object Date]" === x(e2) && "Invalid Date" !== e2.toString();
        }
        function g(e2) {
          if (b(e2) || "number" == typeof e2 && !isNaN(e2)) {
            var t2 = /* @__PURE__ */ new Date(+e2);
            return new Date(t2.getFullYear(), t2.getMonth(), t2.getDate());
          }
        }
        function q(e2) {
          e2.disabled || !e2.calendarContainer.classList.contains("qs-hidden") && !e2.alwaysShow && ("overlay" !== e2.defaultView && M(true, e2), e2.calendarContainer.classList.add("qs-hidden"), e2.onHide(e2));
        }
        function S(e2) {
          e2.disabled || (e2.calendarContainer.classList.remove("qs-hidden"), "overlay" === e2.defaultView && M(false, e2), D(e2), e2.onShow(e2));
        }
        function M(e2, t2) {
          var n2 = t2.calendar, a2 = n2.querySelector(".qs-overlay"), r2 = a2.querySelector(".qs-overlay-year"), i2 = n2.querySelector(".qs-controls"), o2 = n2.querySelector(".qs-squares");
          e2 ? (a2.classList.add("qs-hidden"), i2.classList.remove("qs-blur"), o2.classList.remove("qs-blur"), r2.value = "") : (a2.classList.remove("qs-hidden"), i2.classList.add("qs-blur"), o2.classList.add("qs-blur"), r2.focus());
        }
        function E(e2, t2, n2, a2) {
          var r2 = isNaN(+(/* @__PURE__ */ new Date()).setFullYear(t2.value || void 0)), i2 = r2 ? null : t2.value;
          if (13 === e2.which || 13 === e2.keyCode || "click" === e2.type) a2 ? w(null, n2, i2, a2) : r2 || t2.classList.contains("qs-disabled") || w(null, n2, i2);
          else if (n2.calendar.contains(t2)) {
            n2.calendar.querySelector(".qs-submit").classList[r2 ? "add" : "remove"]("qs-disabled");
          }
        }
        function x(e2) {
          return {}.toString.call(e2);
        }
        function C(e2) {
          a.forEach(function(t2) {
            t2 !== e2 && q(t2);
          });
        }
        function L(e2) {
          if (!e2.__qs_shadow_dom) {
            var t2 = e2.which || e2.keyCode, n2 = e2.type, r2 = e2.target, o2 = r2.classList, s2 = a.filter(function(e3) {
              return e3.calendar.contains(r2) || e3.el === r2;
            })[0], l2 = s2 && s2.calendar.contains(r2);
            if (!(s2 && s2.isMobile && s2.disableMobile)) {
              if ("click" === n2) {
                if (!s2) return a.forEach(q);
                if (s2.disabled) return;
                var d2 = s2.calendar, c2 = s2.calendarContainer, h2 = s2.disableYearOverlay, f2 = s2.nonInput, v2 = d2.querySelector(".qs-overlay-year"), y2 = !!d2.querySelector(".qs-hidden"), p2 = d2.querySelector(".qs-month-year").contains(r2), D2 = r2.dataset.monthNum;
                if (s2.noPosition && !l2) (c2.classList.contains("qs-hidden") ? S : q)(s2);
                else if (o2.contains("qs-arrow")) w(o2, s2);
                else if (p2 || o2.contains("qs-close")) h2 || M(!y2, s2);
                else if (D2) E(e2, v2, s2, D2);
                else {
                  if (o2.contains("qs-disabled")) return;
                  if (o2.contains("qs-num")) {
                    var b2 = r2.textContent, g2 = +r2.dataset.direction, x2 = new Date(s2.currentYear, s2.currentMonth + g2, b2);
                    if (g2) {
                      s2.currentYear = x2.getFullYear(), s2.currentMonth = x2.getMonth(), s2.currentMonthName = i[s2.currentMonth], u(s2);
                      for (var L2, Y2 = s2.calendar.querySelectorAll('[data-direction="0"]'), j2 = 0; !L2; ) {
                        var O2 = Y2[j2];
                        O2.textContent === b2 && (L2 = O2), j2++;
                      }
                      r2 = L2;
                    }
                    return void (+x2 == +s2.dateSelected ? m(r2, s2, true) : r2.classList.contains("qs-disabled") || m(r2, s2));
                  }
                  o2.contains("qs-submit") ? E(e2, v2, s2) : f2 && r2 === s2.el && (S(s2), C(s2));
                }
              } else if ("focusin" === n2 && s2) S(s2), C(s2);
              else if ("keydown" === n2 && 9 === t2 && s2) q(s2);
              else if ("keydown" === n2 && s2 && !s2.disabled) {
                var P2 = !s2.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");
                13 === t2 && P2 && l2 ? E(e2, r2, s2) : 27 === t2 && P2 && l2 && M(true, s2);
              } else if ("input" === n2) {
                if (!s2 || !s2.calendar.contains(r2)) return;
                var k2 = s2.calendar.querySelector(".qs-submit"), N2 = r2.value.split("").reduce(function(e3, t3) {
                  return e3 || "0" !== t3 ? e3 + (t3.match(/[0-9]/) ? t3 : "") : "";
                }, "").slice(0, 4);
                r2.value = N2, k2.classList[4 === N2.length ? "remove" : "add"]("qs-disabled");
              }
            }
          }
        }
        function Y(e2) {
          L(e2), e2.__qs_shadow_dom = true;
        }
        function j(e2, t2) {
          l.forEach(function(n2) {
            e2.removeEventListener(n2, t2);
          });
        }
        function O() {
          S(this);
        }
        function P() {
          q(this);
        }
        function k(e2, t2) {
          var n2 = g(e2), a2 = this.currentYear, r2 = this.currentMonth, i2 = this.sibling;
          if (null == e2) return this.dateSelected = void 0, p(this.el, this, true), i2 && (y({ instance: this, deselect: true }), u(i2)), u(this), this;
          if (!b(e2)) throw new Error("`setDate` needs a JavaScript Date object.");
          if (this.disabledDates[+n2] || n2 < this.minDate || n2 > this.maxDate) throw new Error("You can't manually set a date that's disabled.");
          this.dateSelected = n2, t2 && (this.currentYear = n2.getFullYear(), this.currentMonth = n2.getMonth(), this.currentMonthName = this.months[n2.getMonth()]), p(this.el, this), i2 && (y({ instance: this }), u(i2));
          var o2 = a2 === n2.getFullYear() && r2 === n2.getMonth();
          return o2 || t2 ? u(this, n2) : o2 || u(this, new Date(a2, r2, 1)), this;
        }
        function N(e2) {
          return I(this, e2, true);
        }
        function _(e2) {
          return I(this, e2);
        }
        function I(e2, t2, n2) {
          var a2 = e2.dateSelected, r2 = e2.first, i2 = e2.sibling, o2 = e2.minDate, s2 = e2.maxDate, l2 = g(t2), d2 = n2 ? "Min" : "Max";
          function c2() {
            return "original" + d2 + "Date";
          }
          function h2() {
            return d2.toLowerCase() + "Date";
          }
          function f2() {
            return "set" + d2;
          }
          function v2() {
            throw new Error("Out-of-range date passed to " + f2());
          }
          if (null == t2) e2[c2()] = void 0, i2 ? (i2[c2()] = void 0, n2 ? (r2 && !a2 || !r2 && !i2.dateSelected) && (e2.minDate = void 0, i2.minDate = void 0) : (r2 && !i2.dateSelected || !r2 && !a2) && (e2.maxDate = void 0, i2.maxDate = void 0)) : e2[h2()] = void 0;
          else {
            if (!b(t2)) throw new Error("Invalid date passed to " + f2());
            i2 ? ((r2 && n2 && l2 > (a2 || s2) || r2 && !n2 && l2 < (i2.dateSelected || o2) || !r2 && n2 && l2 > (i2.dateSelected || s2) || !r2 && !n2 && l2 < (a2 || o2)) && v2(), e2[c2()] = l2, i2[c2()] = l2, (n2 && (r2 && !a2 || !r2 && !i2.dateSelected) || !n2 && (r2 && !i2.dateSelected || !r2 && !a2)) && (e2[h2()] = l2, i2[h2()] = l2)) : ((n2 && l2 > (a2 || s2) || !n2 && l2 < (a2 || o2)) && v2(), e2[h2()] = l2);
          }
          return i2 && u(i2), u(e2), e2;
        }
        function A() {
          var e2 = this.first ? this : this.sibling, t2 = e2.sibling;
          return { start: e2.dateSelected, end: t2.dateSelected };
        }
        function R() {
          var e2 = this.shadowDom, t2 = this.positionedEl, n2 = this.calendarContainer, r2 = this.sibling, i2 = this;
          this.inlinePosition && (a.some(function(e3) {
            return e3 !== i2 && e3.positionedEl === t2;
          }) || t2.style.setProperty("position", null));
          n2.remove(), a = a.filter(function(e3) {
            return e3 !== i2;
          }), r2 && delete r2.sibling, a.length || j(document, L);
          var o2 = a.some(function(t3) {
            return t3.shadowDom === e2;
          });
          for (var s2 in e2 && !o2 && j(e2, Y), this) delete this[s2];
          a.length || l.forEach(function(e3) {
            document.removeEventListener(e3, L);
          });
        }
        function F(e2, t2) {
          var n2 = new Date(e2);
          if (!b(n2)) throw new Error("Invalid date passed to `navigate`");
          this.currentYear = n2.getFullYear(), this.currentMonth = n2.getMonth(), u(this), t2 && this.onMonthChange(this);
        }
        function B() {
          var e2 = !this.calendarContainer.classList.contains("qs-hidden"), t2 = !this.calendarContainer.querySelector(".qs-overlay").classList.contains("qs-hidden");
          e2 && M(t2, this);
        }
        t.default = function(e2, t2) {
          var n2 = function(e3, t3) {
            var n3, l3, d2 = function(e4) {
              var t4 = c(e4);
              t4.events && (t4.events = t4.events.reduce(function(e5, t5) {
                if (!b(t5)) throw new Error('"options.events" must only contain valid JavaScript Date objects.');
                return e5[+g(t5)] = true, e5;
              }, {}));
              ["startDate", "dateSelected", "minDate", "maxDate"].forEach(function(e5) {
                var n5 = t4[e5];
                if (n5 && !b(n5)) throw new Error('"options.' + e5 + '" needs to be a valid JavaScript Date object.');
                t4[e5] = g(n5);
              });
              var n4 = t4.position, i2 = t4.maxDate, l4 = t4.minDate, d3 = t4.dateSelected, u3 = t4.overlayPlaceholder, h3 = t4.overlayButton, f3 = t4.startDay, v3 = t4.id;
              if (t4.startDate = g(t4.startDate || d3 || /* @__PURE__ */ new Date()), t4.disabledDates = (t4.disabledDates || []).reduce(function(e5, t5) {
                var n5 = +g(t5);
                if (!b(t5)) throw new Error('You supplied an invalid date to "options.disabledDates".');
                if (n5 === +g(d3)) throw new Error('"disabledDates" cannot contain the same date as "dateSelected".');
                return e5[n5] = 1, e5;
              }, {}), t4.hasOwnProperty("id") && null == v3) throw new Error("`id` cannot be `null` or `undefined`");
              if (null != v3) {
                var m3 = a.filter(function(e5) {
                  return e5.id === v3;
                });
                if (m3.length > 1) throw new Error("Only two datepickers can share an id.");
                m3.length ? (t4.second = true, t4.sibling = m3[0]) : t4.first = true;
              }
              var y3 = ["tr", "tl", "br", "bl", "c"].some(function(e5) {
                return n4 === e5;
              });
              if (n4 && !y3) throw new Error('"options.position" must be one of the following: tl, tr, bl, br, or c.');
              function p2(e5) {
                throw new Error('"dateSelected" in options is ' + (e5 ? "less" : "greater") + ' than "' + (e5 || "max") + 'Date".');
              }
              if (t4.position = function(e5) {
                var t5 = e5[0], n5 = e5[1], a2 = {};
                a2[o[t5]] = 1, n5 && (a2[o[n5]] = 1);
                return a2;
              }(n4 || "bl"), i2 < l4) throw new Error('"maxDate" in options is less than "minDate".');
              d3 && (l4 > d3 && p2("min"), i2 < d3 && p2());
              if (["onSelect", "onShow", "onHide", "onMonthChange", "formatter", "disabler"].forEach(function(e5) {
                "function" != typeof t4[e5] && (t4[e5] = s);
              }), ["customDays", "customMonths", "customOverlayMonths"].forEach(function(e5, n5) {
                var a2 = t4[e5], r2 = n5 ? 12 : 7;
                if (a2) {
                  if (!Array.isArray(a2) || a2.length !== r2 || a2.some(function(e6) {
                    return "string" != typeof e6;
                  })) throw new Error('"' + e5 + '" must be an array with ' + r2 + " strings.");
                  t4[n5 ? n5 < 2 ? "months" : "overlayMonths" : "days"] = a2;
                }
              }), f3 && f3 > 0 && f3 < 7) {
                var w3 = (t4.customDays || r).slice(), D3 = w3.splice(0, f3);
                t4.customDays = w3.concat(D3), t4.startDay = +f3, t4.weekendIndices = [w3.length - 1, w3.length];
              } else t4.startDay = 0, t4.weekendIndices = [6, 0];
              "string" != typeof u3 && delete t4.overlayPlaceholder;
              "string" != typeof h3 && delete t4.overlayButton;
              var q3 = t4.defaultView;
              if (q3 && "calendar" !== q3 && "overlay" !== q3) throw new Error('options.defaultView must either be "calendar" or "overlay".');
              return t4.defaultView = q3 || "calendar", t4;
            }(t3 || { startDate: g(/* @__PURE__ */ new Date()), position: "bl", defaultView: "calendar" }), u2 = e3;
            if ("string" == typeof u2) u2 = "#" === u2[0] ? document.getElementById(u2.slice(1)) : document.querySelector(u2);
            else {
              if ("[object ShadowRoot]" === x(u2)) throw new Error("Using a shadow DOM as your selector is not supported.");
              for (var h2, f2 = u2.parentNode; !h2; ) {
                var v2 = x(f2);
                "[object HTMLDocument]" === v2 ? h2 = true : "[object ShadowRoot]" === v2 ? (h2 = true, n3 = f2, l3 = f2.host) : f2 = f2.parentNode;
              }
            }
            if (!u2) throw new Error("No selector / element found.");
            if (a.some(function(e4) {
              return e4.el === u2;
            })) throw new Error("A datepicker already exists on that element.");
            var m2 = u2 === document.body, y2 = n3 ? u2.parentElement || n3 : m2 ? document.body : u2.parentElement, w2 = n3 ? u2.parentElement || l3 : y2, D2 = document.createElement("div"), q2 = document.createElement("div");
            D2.className = "qs-datepicker-container qs-hidden", q2.className = "qs-datepicker";
            var M2 = { shadowDom: n3, customElement: l3, positionedEl: w2, el: u2, parent: y2, nonInput: "INPUT" !== u2.nodeName, noPosition: m2, position: !m2 && d2.position, startDate: d2.startDate, dateSelected: d2.dateSelected, disabledDates: d2.disabledDates, minDate: d2.minDate, maxDate: d2.maxDate, noWeekends: !!d2.noWeekends, weekendIndices: d2.weekendIndices, calendarContainer: D2, calendar: q2, currentMonth: (d2.startDate || d2.dateSelected).getMonth(), currentMonthName: (d2.months || i)[(d2.startDate || d2.dateSelected).getMonth()], currentYear: (d2.startDate || d2.dateSelected).getFullYear(), events: d2.events || {}, defaultView: d2.defaultView, setDate: k, remove: R, setMin: N, setMax: _, show: O, hide: P, navigate: F, toggleOverlay: B, onSelect: d2.onSelect, onShow: d2.onShow, onHide: d2.onHide, onMonthChange: d2.onMonthChange, formatter: d2.formatter, disabler: d2.disabler, months: d2.months || i, days: d2.customDays || r, startDay: d2.startDay, overlayMonths: d2.overlayMonths || (d2.months || i).map(function(e4) {
              return e4.slice(0, 3);
            }), overlayPlaceholder: d2.overlayPlaceholder || "4-digit year", overlayButton: d2.overlayButton || "Submit", disableYearOverlay: !!d2.disableYearOverlay, disableMobile: !!d2.disableMobile, isMobile: "ontouchstart" in window, alwaysShow: !!d2.alwaysShow, id: d2.id, showAllDates: !!d2.showAllDates, respectDisabledReadOnly: !!d2.respectDisabledReadOnly, first: d2.first, second: d2.second };
            if (d2.sibling) {
              var E2 = d2.sibling, C2 = M2, L2 = E2.minDate || C2.minDate, Y2 = E2.maxDate || C2.maxDate;
              C2.sibling = E2, E2.sibling = C2, E2.minDate = L2, E2.maxDate = Y2, C2.minDate = L2, C2.maxDate = Y2, E2.originalMinDate = L2, E2.originalMaxDate = Y2, C2.originalMinDate = L2, C2.originalMaxDate = Y2, E2.getRange = A, C2.getRange = A;
            }
            d2.dateSelected && p(u2, M2);
            var j2 = getComputedStyle(w2).position;
            m2 || j2 && "static" !== j2 || (M2.inlinePosition = true, w2.style.setProperty("position", "relative"));
            var I2 = a.filter(function(e4) {
              return e4.positionedEl === M2.positionedEl;
            });
            I2.some(function(e4) {
              return e4.inlinePosition;
            }) && (M2.inlinePosition = true, I2.forEach(function(e4) {
              e4.inlinePosition = true;
            }));
            D2.appendChild(q2), y2.appendChild(D2), M2.alwaysShow && S(M2);
            return M2;
          }(e2, t2);
          if (a.length || d(document), n2.shadowDom && (a.some(function(e3) {
            return e3.shadowDom === n2.shadowDom;
          }) || d(n2.shadowDom)), a.push(n2), n2.second) {
            var l2 = n2.sibling;
            y({ instance: n2, deselect: !n2.dateSelected }), y({ instance: l2, deselect: !l2.dateSelected }), u(l2);
          }
          return u(n2, n2.startDate || n2.dateSelected), n2.alwaysShow && D(n2), n2;
        };
      }]).default;
    });
  })(datepicker_min);
  return datepicker_min.exports;
}
var datepicker_minExports = requireDatepicker_min();
const datepicker = /* @__PURE__ */ getDefaultExportFromCjs(datepicker_minExports);
const ru = { "week": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], "month": ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"], "button": "Применять", "year": "Год (4 цифры)" };
const en = { "week": ["Md", "Tu", "Wn", "Th", "Fr", "St", "Sn"], "month": ["Jan", "Feb", "Mr", "Apr", "May", "Jun", "Jul", "Ags", "Sep", "Oct", "Nov", "Dec"], "button": "Apply", "year": "Year (4 digits)" };
const langs = {
  ru,
  en
};
if (document.querySelector("[data-fls-datepicker]")) {
  const LANG = "ru";
  const datePicker = datepicker("[data-fls-datepicker]", {
    customDays: langs[LANG].week,
    customMonths: langs[LANG].month,
    overlayButton: langs[LANG].button,
    overlayPlaceholder: langs[LANG].year,
    startDay: 1,
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString();
      input.value = value;
    },
    onSelect: function(input, instance, date) {
    }
  });
  window.flsDatepicker = datePicker;
}
