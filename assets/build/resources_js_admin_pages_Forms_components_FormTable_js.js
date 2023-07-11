"use strict";
(globalThis["webpackChunkhelpgent"] = globalThis["webpackChunkhelpgent"] || []).push([["resources_js_admin_pages_Forms_components_FormTable_js"],{

/***/ "./resources/js/admin/pages/Forms/components/FormTable.js":
/*!****************************************************************!*\
  !*** ./resources/js/admin/pages/Forms/components/FormTable.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormTable)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hooks_forms_useForms_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../hooks/forms/useForms.js */ "./resources/js/hooks/forms/useForms.js");
/* harmony import */ var _hooks_useFetchData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hooks/useFetchData.js */ "./resources/js/hooks/useFetchData.js");
/* harmony import */ var _helper_formatter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @helper/formatter.js */ "./resources/js/helper/formatter.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.js */ "./resources/js/admin/pages/Forms/components/style.js");





const TitleBox = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "resources_js_admin_pages_Forms_components_TitleBox_js").then(__webpack_require__.bind(__webpack_require__, /*! ./TitleBox */ "./resources/js/admin/pages/Forms/components/TitleBox.js")));
const TableActions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "resources_js_admin_pages_Forms_components_TableActions_js").then(__webpack_require__.bind(__webpack_require__, /*! ./TableActions.js */ "./resources/js/admin/pages/Forms/components/TableActions.js")));
const WelcomeBox = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "resources_js_admin_pages_Forms_components_WelcomeBox_js").then(__webpack_require__.bind(__webpack_require__, /*! ./WelcomeBox.js */ "./resources/js/admin/pages/Forms/components/WelcomeBox.js")));




function FormTable(props) {
  const {
    forms,
    isFetchError,
    formErrorMessage,
    isCreatePopupOpen,
    setCreatePopupStatus
  } = props;

  /**
   * Function for load data with dom
   * @returns Dom of table body
   */
  function tableContent() {
    if (isFetchError) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, formErrorMessage);
    }
    const dateFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return forms.length !== 0 ? forms.map(form => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: form.id
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, form.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, form.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "helpgent-form-shortCode"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      readOnly: true,
      value: `[helpgent_form id="${form.id}"]`
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, form.total_submissions), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "helpgent-toggle helpgent-toggle-success"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormToggle, null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_helper_formatter_js__WEBPACK_IMPORTED_MODULE_4__.formatDate)('en-US', form.created_at, dateFormatOptions)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
      fallback: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableActions, {
      id: form.id
    }))))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      colSpan: 7
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_5__.WelcomeBoxStyleWrap, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
      fallback: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(WelcomeBox, {
      isCreatePopupOpen: isCreatePopupOpen,
      setCreatePopupStatus: setCreatePopupStatus
    })))));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_5__.FormTableStyle, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-table-wrap helpgent-table-responsive"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "helpgent-table"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-id"
  }, "Id"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-name"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-shortCode"
  }, "ShortCode"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-response"
  }, "Responses"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-status"
  }, "Status"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-created"
  }, "Created"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-action"
  }, "Action"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, forms ? tableContent() : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 7
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null)))))));
}
FormTable.propTypes = {
  forms: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().array),
  isFetchError: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  formErrorMessage: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
  isCreatePopupOpen: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  setCreatePopupStatus: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func)
};

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
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/useQuery.mjs");
/* harmony import */ var _helper_fetchData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helper/fetchData */ "./resources/js/helper/fetchData.js");
/* harmony import */ var _helper_getError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @helper/getError */ "./resources/js/helper/getError.js");



function useForms() {
  const {
    data,
    isLoading,
    error
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)(['helpgent-forms'], () => (0,_helper_fetchData__WEBPACK_IMPORTED_MODULE_0__["default"])('/helpgent/admin/form'), {
    refetchOnWindowFocus: false
  });
  return {
    forms: !!error || isLoading ? {} : data.forms,
    isLoading,
    errorMessage: !!error ? (0,_helper_getError__WEBPACK_IMPORTED_MODULE_1__["default"])(error ? error.data.status : '') : '',
    isError: !!error
  };
}

/***/ })

}]);
//# sourceMappingURL=resources_js_admin_pages_Forms_components_FormTable_js.js.map