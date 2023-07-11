"use strict";
(globalThis["webpackChunkhelpgent"] = globalThis["webpackChunkhelpgent"] || []).push([["resources_js_admin_pages_Forms_components_TitleBox_js"],{

/***/ "./assets/svg/icon/times.svg":
/*!***********************************!*\
  !*** ./assets/svg/icon/times.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgTimes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgTimes = function SvgTimes(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 6,
    height: 5.999
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M3.706 3.004 5.854.861a.501.501 0 1 0-.709-.709L3 2.295.857.147a.501.501 0 0 0-.709.709l2.148 2.148L.148 5.142a.501.501 0 1 0 .709.709L3 3.704l2.143 2.148a.501.501 0 1 0 .709-.709Z",
    fill: "#3c3c3c"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjUuOTk5IiB2aWV3Qm94PSIwIDAgNiA1Ljk5OSI+DQogIDxwYXRoIGlkPSJ0aW1lcyIgZD0iTTkuNyw5bDIuMTQ4LTIuMTQzYS41LjUsMCwxLDAtLjcwOS0uNzA5TDguOTk0LDguMjkxLDYuODUxLDYuMTQzYS41LjUsMCwwLDAtLjcwOS43MDlMOC4yOSw5LDYuMTQyLDExLjEzOGEuNS41LDAsMSwwLC43MDkuNzA5TDguOTk0LDkuN2wyLjE0MywyLjE0OGEuNS41LDAsMSwwLC43MDktLjcwOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01Ljk5NCAtNS45OTYpIiBmaWxsPSIjM2MzYzNjIi8+DQo8L3N2Zz4NCg==");

/***/ }),

/***/ "./resources/js/admin/pages/Forms/components/TitleBox.js":
/*!***************************************************************!*\
  !*** ./resources/js/admin/pages/Forms/components/TitleBox.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_FormAppStateContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/FormAppStateContext */ "./resources/js/admin/pages/Forms/context/FormAppStateContext.js");
/* harmony import */ var react_inlinesvg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-inlinesvg */ "./node_modules/react-inlinesvg/esm/index.js");
/* harmony import */ var _hooks_useStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @hooks/useStore.js */ "./resources/js/hooks/useStore.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.js */ "./resources/js/admin/pages/Forms/components/style.js");
/* harmony import */ var _icon_times_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @icon/times.svg */ "./assets/svg/icon/times.svg");
/* harmony import */ var _icon_check_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @icon/check.svg */ "./assets/svg/icon/check.svg");








function titleBox(props) {
  const {
    isEditModeActive,
    setEditModeStatus,
    form
  } = props;
  const {
    title
  } = form;
  const {
    formAppState,
    setFormAppState
  } = (0,_context_FormAppStateContext__WEBPACK_IMPORTED_MODULE_1__.useFormAppState)();
  function handleCancelEditMode() {
    setEditModeStatus(false);
  }
  function handleChangeFormTitle(e) {
    setFormAppState({
      ...formAppState,
      formInputTitle: e.target.value
    });
  }
  function handleRenameFormTitle() {}
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_3__.TitleBoxStyle, {
    className: "helpgent-titleBox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-titleBox__data"
  }, isEditModeActive ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-titleBox__editor"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "helpgent-title-input",
    value: formAppState.formInputTitle,
    onChange: handleChangeFormTitle
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-titleBox__content helpgent-show"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-titleBox-media"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-titleBox-text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "helpgent-title"
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "helpgent-titleBox-meta"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "helpgent-titleBox-meta__id"
  }, "ID #20"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "helpgent-titleBox-meta__date"
  }, "Created: May 29, 2023"))))), isEditModeActive && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-titleBox__actions"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "helpgent-titleBox-action-item helpgent-titleBox__actions-cancel",
    onClick: handleCancelEditMode
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_inlinesvg__WEBPACK_IMPORTED_MODULE_6__["default"], {
    src: _icon_times_svg__WEBPACK_IMPORTED_MODULE_4__["default"]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "helpgent-titleBox-action-item helpgent-titleBox__actions-yes",
    onClick: handleRenameFormTitle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_inlinesvg__WEBPACK_IMPORTED_MODULE_6__["default"], {
    src: _icon_check_svg__WEBPACK_IMPORTED_MODULE_5__["default"]
  }))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (titleBox);

/***/ }),

/***/ "./resources/js/hooks/useStore.js":
/*!****************************************!*\
  !*** ./resources/js/hooks/useStore.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs");

function useStore() {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQueryClient)();
  const setStoreData = (queryKey, data) => {
    queryClient.setQueryData(queryKey, data);
  };
  const getStoreData = queryKey => {
    return queryClient.getQueryData(queryKey);
  };
  const removeStoreData = queryKey => {
    queryClient.removeQueries(queryKey);
  };
  return {
    setStoreData,
    getStoreData,
    removeStoreData
  };
}

/***/ })

}]);
//# sourceMappingURL=resources_js_admin_pages_Forms_components_TitleBox_js.js.map