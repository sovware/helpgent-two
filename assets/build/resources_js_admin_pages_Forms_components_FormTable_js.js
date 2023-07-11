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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helper_formatter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @helper/formatter.js */ "./resources/js/helper/formatter.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.js */ "./resources/js/admin/pages/Forms/components/style.js");





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
  const [isEditModeActive, setEditModeStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [formTitleInput, setFormTitleInput] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');

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
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TitleBox, {
      isEditModeActive: isEditModeActive,
      setEditModeStatus: setEditModeStatus,
      form: form
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "helpgent-form-shortCode"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      readOnly: true,
      value: `[helpgent_form id="${form.id}"]`
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, form.total_responses), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_helper_formatter_js__WEBPACK_IMPORTED_MODULE_2__.formatDate)('en-US', form.created_at, dateFormatOptions)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "helpgent-toggle helpgent-toggle-success"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormToggle, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "helpgent-form-status"
    }, "Active"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
      fallback: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableActions, {
      id: form.id,
      form: form,
      setEditModeStatus: setEditModeStatus,
      setFormTitleInput: setFormTitleInput
    }))))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      colSpan: 7
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_3__.WelcomeBoxStyleWrap, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
      fallback: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(WelcomeBox, {
      isCreatePopupOpen: isCreatePopupOpen,
      setCreatePopupStatus: setCreatePopupStatus
    })))));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_js__WEBPACK_IMPORTED_MODULE_3__.FormTableStyle, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "helpgent-table-wrap helpgent-table-responsive-"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "helpgent-table"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-name"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-shortCode"
  }, "ShortCode"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-response"
  }, "Responses"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-created"
  }, "Updated"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-status"
  }, "Status"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "helpgent-head-action"
  }, "Action"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, forms ? tableContent() : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 7
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null)))))));
}
FormTable.propTypes = {
  forms: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().array),
  isFetchError: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
  formErrorMessage: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  isCreatePopupOpen: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool),
  setCreatePopupStatus: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func)
};

/***/ })

}]);
//# sourceMappingURL=resources_js_admin_pages_Forms_components_FormTable_js.js.map