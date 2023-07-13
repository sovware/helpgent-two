"use strict";
(self["webpackChunkhelpgent"] = self["webpackChunkhelpgent"] || []).push([["resources_js_admin_pages_Forms_components_PageHeader_js"],{

/***/ "./resources/js/admin/pages/Forms/components/PageHeader.js":
/*!*****************************************************************!*\
  !*** ./resources/js/admin/pages/Forms/components/PageHeader.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CreatePopup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CreatePopup.js */ "./resources/js/admin/pages/Forms/CreatePopup.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.js */ "./resources/js/admin/pages/Forms/components/style.js");





function PageHeader(props) {
  const {
    forms,
    setCreatePopupStatus,
    isCreatePopupOpen
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_2__.PageHeaderStyle, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "helpgent-page-header-title"
  }, "All Forms"), forms && forms.length !== 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    href: "#",
    className: "helpgent-btn helpgent-btn-dark helpgent-page-header-btn",
    onClick: () => setCreatePopupStatus(!isCreatePopupOpen)
  }, "Create New") : null);
}
PageHeader.propTypes = {
  forms: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().array),
  setCreatePopupStatus: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
  isCreatePopupOpen: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageHeader);

/***/ })

}]);
//# sourceMappingURL=resources_js_admin_pages_Forms_components_PageHeader_js.js.map