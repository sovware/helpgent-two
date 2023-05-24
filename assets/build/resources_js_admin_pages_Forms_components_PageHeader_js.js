"use strict";
(globalThis["webpackChunkhelpgent"] = globalThis["webpackChunkhelpgent"] || []).push([["resources_js_admin_pages_Forms_components_PageHeader_js"],{

/***/ "./resources/js/admin/pages/Forms/components/CreatePopup.js":
/*!******************************************************************!*\
  !*** ./resources/js/admin/pages/Forms/components/CreatePopup.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.js */ "./resources/js/admin/pages/Forms/components/style.js");




function CreatePopup(props) {
  const {
    isCreatePopupOpen,
    setCreatePopupStatus
  } = props;
  const formData = {
    "title": "Helpgent version 2",
    "status": "publish",
    content: {}
  };
  return isCreatePopupOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    overlayClassName: "helpgent-modal helpgent-create-modal-wrap",
    shouldCloseOnClickOutside: true,
    onRequestClose: () => setCreatePopupStatus(false)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_2__.CreatePopupStyle, {
    className: "helpgent-create-form-modal"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-form-group"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "helpgent-form__element",
    placeholder: "Form Name",
    value: ""
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "helpgent-btn helpgent-btn-md helpgent-btn-dark helpgent-btn-block"
  }, "Create Form")));
}
CreatePopup.propTypes = {
  isCreatePopupOpen: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  setCreatePopupStatus: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreatePopup);

/***/ }),

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
/* harmony import */ var _CreatePopup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreatePopup.js */ "./resources/js/admin/pages/Forms/components/CreatePopup.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.js */ "./resources/js/admin/pages/Forms/components/style.js");




function PageHeader() {
  const [createPopupStatus, setCreatePopupStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_2__.PageHeaderStyle, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "helpgent-page-header-title"
  }, "All Forms"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    href: "#",
    className: "helpgent-btn helpgent-btn-dark helpgent-page-header-btn",
    onClick: () => setCreatePopupStatus(!createPopupStatus)
  }, "Create New"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CreatePopup_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isCreatePopupOpen: createPopupStatus,
    setCreatePopupStatus: setCreatePopupStatus
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageHeader);

/***/ }),

/***/ "./resources/js/admin/pages/Forms/components/style.js":
/*!************************************************************!*\
  !*** ./resources/js/admin/pages/Forms/components/style.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreatePopupStyle: () => (/* binding */ CreatePopupStyle),
/* harmony export */   FormTableStyle: () => (/* binding */ FormTableStyle),
/* harmony export */   PageHeaderStyle: () => (/* binding */ PageHeaderStyle),
/* harmony export */   TitleBoxStyle: () => (/* binding */ TitleBoxStyle)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");

const PageHeaderStyle = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    .helpgent-page-header-title{
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--helpgent-color-dark);
    }
    .helpgent-page-header-btn{
        ${_ref => {
  let {
    theme
  } = _ref;
  return theme.direction === 'ltr' ? 'margin-left' : 'margin-right';
}}: 20px;
    }
`;
const FormTableStyle = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    border-radius: 10px;
    padding: 20px;
    background-color: var(--helpgent-color-white);
    .helpgent-table-wrap{
        position: relative;
        min-height: 200px;
    }
    .helpgent-table{
        th{
            &.helpgent-head-name{
                width: 200px;
            }
            &.helpgent-head-shortcode{
                width: 210px;
            }
            &.helpgent-head-status{
                width: 80px;
            }
        }
    }
`;
const TitleBoxStyle = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
   
`;
const CreatePopupStyle = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
   
`;


/***/ })

}]);
//# sourceMappingURL=resources_js_admin_pages_Forms_components_PageHeader_js.js.map