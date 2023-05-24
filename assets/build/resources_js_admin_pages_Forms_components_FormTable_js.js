"use strict";
(globalThis["webpackChunkhelpgent"] = globalThis["webpackChunkhelpgent"] || []).push([["resources_js_admin_pages_Forms_components_FormTable_js"],{

/***/ "./resources/js/admin/pages/Forms/components/FormTable.js":
/*!****************************************************************!*\
  !*** ./resources/js/admin/pages/Forms/components/FormTable.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_forms_useForms_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../hooks/forms/useForms.js */ "./resources/js/hooks/forms/useForms.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.js */ "./resources/js/admin/pages/Forms/components/style.js");


const TitleBox = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "resources_js_admin_pages_Forms_components_TitleBox_js").then(__webpack_require__.bind(__webpack_require__, /*! ./TitleBox */ "./resources/js/admin/pages/Forms/components/TitleBox.js")));


function FormTable() {
  const {
    forms,
    isLoading,
    isError,
    errorCode
  } = (0,_hooks_forms_useForms_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  console.log(forms, isLoading, isError, errorCode);
  function tableContent() {
    if (isError) {
      return errorCode === 404 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Server Error") : null;
    }
    if (isLoading) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Loader");
    }
    return forms.map(form => {
      (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null));
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_2__.FormTableStyle, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-table-wrap helpgent-table-responsive"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "helpgent-table"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-name"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-shortcode"
  }, "ShortCode"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-status"
  }, "Status"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-action"
  }, "Actions"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, tableContent()))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormTable);

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


/***/ }),

/***/ "./resources/js/hooks/forms/useForms.js":
/*!**********************************************!*\
  !*** ./resources/js/hooks/forms/useForms.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useForms)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/useQuery.mjs");
/* harmony import */ var _lib_dataFetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/dataFetcher */ "./resources/js/lib/dataFetcher.js");


function useForms() {
  const {
    data,
    isLoading,
    error
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)(['helpgent-forms'], () => (0,_lib_dataFetcher__WEBPACK_IMPORTED_MODULE_0__["default"])('/helpgent/admin/formo'));
  console.log(data, error);
  return {
    forms: !!error || isLoading ? {} : data.forms,
    isLoading,
    errorCode: !!error ? error.data.status : null,
    isError: !!error
  };
}

/***/ }),

/***/ "./resources/js/lib/dataFetcher.js":
/*!*****************************************!*\
  !*** ./resources/js/lib/dataFetcher.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dataFetcher)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

async function dataFetcher(path) {
  return await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: path
  }).then(res => res);
  ;
}

/***/ })

}]);
//# sourceMappingURL=resources_js_admin_pages_Forms_components_FormTable_js.js.map