(globalThis["webpackChunkhelpgent"] = globalThis["webpackChunkhelpgent"] || []).push([["resources_js_admin_pages_Forms_FormsMap_js"],{

/***/ "./resources/js/admin/pages/Forms/FormsMap.js":
/*!****************************************************!*\
  !*** ./resources/js/admin/pages/Forms/FormsMap.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Screen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Screen */ "./resources/js/admin/pages/Forms/components/Screen.js");
/* harmony import */ var _components_Screen__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_Screen__WEBPACK_IMPORTED_MODULE_1__);


const initialNodes = [{
  id: '1',
  position: {
    x: -150,
    y: 0
  },
  fields: [{
    id: '1',
    //string
    label: 'Graduation',
    //string
    type: 'text',
    //elementor,gutenburg,shortcode
    value: '',
    //string
    placeholder: '',
    //string
    confirmationField: true,
    defaultValue: '',
    //string
    validation: [{
      type: 'required',
      isRequired: true,
      message: 'This field is required'
    }, {
      type: 'url',
      isUrl: true,
      message: 'This field must be a valid URL'
    }, {
      type: 'string',
      isString: false,
      message: 'This field must be a valid String'
    }, {
      type: 'email',
      isEmail: false,
      message: 'This field must be a valid Email'
    }, {
      type: 'decimal',
      isDecimal: false,
      message: 'This field must be a valid Decimal'
    }, {
      type: 'number',
      isNumber: false,
      message: 'This field must be a valid Email'
    }, {
      type: 'greater_than',
      targetValue: 100,
      message: 'This field must be greater than 100'
    }, {
      type: 'greater_than_equal',
      targetValue: 100,
      message: 'This field must be greater than or equal 100'
    }, {
      type: 'less_than',
      targetValue: 100,
      message: 'This field must be less than 100'
    }, {
      type: 'less_than_equal',
      targetValue: 100,
      message: 'This field must be less than or equal 100'
    }, {
      type: 'ip',
      isIp: false,
      message: 'This field must be a IP'
    }, {
      type: 'password',
      passwordContains: ['uppercase', 'lowercase', 'number', 'special_char'],
      message: 'The password must having One number'
    }, {
      type: 'date',
      isDate: true,
      message: ''
    }, {
      type: 'after_date',
      targetValue: '5/11/2023',
      message: 'This date must be after 5/11/2023'
    }, {
      type: 'before_date',
      targetValue: '5/11/2023',
      message: 'This date must be before 5/11/2023'
    }, {
      type: 'file',
      allowedMemeType: ['3dml', '3gp', '7z'],
      message: ''
    }, {
      type: 'min',
      targetValue: 20,
      message: 'This field must be at least 20'
    }, {
      type: 'max',
      targetValue: 20,
      message: 'This field must not be greater than 20'
    }]
  }, {
    id: '1',
    label: '',
    type: 'text',
    //elementor,gutenburg,shortcode
    value: '',
    placeholder: '',
    confirmationField: true,
    defaultValue: '' //string
  }]
}, {
  id: '2',
  position: {
    x: -150,
    y: 0
  },
  fields: [{
    id: '1',
    label: 'Graduation',
    type: 'input',
    //elementor,gutenburg,shortcode
    value: '',
    placeholder: ''
  }]
}, {
  id: '3',
  position: {
    x: -150,
    y: 0
  },
  fields: [{
    id: '1',
    label: 'Graduation',
    type: 'input',
    //elementor,gutenburg,shortcode
    value: '',
    placeholder: ''
  }]
}, {
  id: '4',
  position: {
    x: -150,
    y: 0
  },
  fields: [{
    id: '1',
    label: 'Graduation',
    type: 'input',
    //elementor,gutenburg,shortcode
    value: '',
    placeholder: ''
  }]
}, {
  id: '5',
  position: {
    x: -150,
    y: 0
  },
  fields: [{
    id: '1',
    label: 'Graduation',
    type: 'input',
    //elementor,gutenburg,shortcode
    value: '',
    placeholder: ''
  }]
}];
const conditions = [{
  source: 1,
  target: 2,
  label: 'Move To Screen Two',
  relation: 'and',
  fields: [{
    field_id: 4554,
    value: 'Obi'
  }, {
    field_id: 4554,
    value: 'Tanjim'
  }]
}, {
  source: 1,
  target: 3,
  label: 'Move To Screen Three',
  relation: 'or',
  fields: [{
    field_id: 4554,
    value: 'a',
    relation: 'contains'
  }, {
    field_id: 4554,
    value: 'Galib',
    relation: 'contains'
  }]
}];
const initialEdges = [{
  id: '1->2',
  source: '1',
  target: '2'
}, {
  id: '1->5',
  source: '1',
  target: '5'
}, {
  id: '2->5',
  source: '2',
  target: '5'
}, {
  id: '2->10',
  source: '2',
  target: '10'
}];
const FormMap = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)((_components_Screen__WEBPACK_IMPORTED_MODULE_1___default()), null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormMap);
fields = [/* Text Field */
{
  id: '1',
  //string
  type: 'text',
  // elementor, gutenburg, shortcode
  label: 'Graduation',
  //string
  description: '',
  inputMask: false,
  inputMaskValue: '',
  //string
  inputMaskIsCustom: false,
  maxLength: '',
  rules: [isRequired,
  // isNumber,
  isString,
  // isUrl,
  // isDate,
  // isEmail,
  // isDecimal,
  noDuplicates],
  value: '',
  //string
  fieldSize: 'large',
  // large, medium, small
  descriptionPlacement: '',
  confirmationField: true,
  autoComplete: true,
  autoCompleteAttribute: '',
  visibility: 'visible',
  //visible,hidden,Administrative(ref: gravity form)
  defaultValue: '',
  //string
  placeholder: '',
  //string
  labelVisibility: '',
  customClass: '',
  useRichTextEditor: true,
  // those options is only for number
  comparison: true,
  comparisonType: 'less-than',
  // less-than, less-than-equal, greater-than, greater-than-equal, max, min
  comparedValue: 100,
  errorMessage: ''
}];
fields = [/* Text Field */
{
  id: '1',
  //string
  type: 'text',
  // elementor, gutenburg, shortcode
  label: 'Graduation',
  //string
  description: '',
  maxLength: '',
  inputMask: false,
  inputMaskValue: '',
  //string
  inputMaskIsCustom: false,
  rules: [isRequired, isString, noDuplicates],
  value: '',
  //string
  placeholder: '',
  //string
  fieldSize: 'large',
  // large, medium, small
  descriptionPlacement: '',
  confirmationField: true,
  autoComplete: true,
  autoCompleteAttribute: '',
  visibility: 'visible',
  //visible,hidden,Administrative(ref: gravity form)
  defaultValue: '',
  //string
  labelVisibility: '',
  customClass: '',
  validationMessage: ''
}, /* Paragraph Text Field */
{
  id: '1',
  //string
  type: 'paragraph',
  // elementor, gutenburg, shortcode
  label: 'Graduation',
  //string
  description: '',
  maxLength: '',
  rules: [isRequired, noDuplicates],
  value: '',
  //string
  placeholder: '',
  //string
  fieldSize: 'large',
  // large, medium, small
  descriptionPlacement: '',
  confirmationField: true,
  visibility: 'visible',
  //visible,hidden,Administrative(ref: gravity form)
  defaultValue: '',
  //string
  labelVisibility: '',
  useRichTextEditor: true,
  customClass: '',
  validationMessage: ''
}, /* Drop down */
{
  id: '1',
  //string
  type: 'dropdown',
  // elementor, gutenburg, shortcode
  label: 'Graduation',
  //string
  description: '',
  rules: [isRequired, noDuplicates],
  showValues: true,
  choices: [{
    index: 1,
    label: '',
    value: '',
    isSelected: false
  }],
  isSearchable: true,
  fieldSize: 'large',
  // large, medium, small
  descriptionPlacement: '',
  visibility: 'visible',
  //visible,hidden,Administrative(ref: gravity form)
  defaultValue: '',
  //string
  labelVisibility: '',
  customClass: '',
  validationMessage: ''
}, /* Number */
{
  id: '1',
  //string
  type: 'number',
  // elementor, gutenburg, shortcode
  label: 'Number',
  //string
  description: '',
  rules: [isRequired, isNumber, noDuplicates],
  numberFormat: '',
  value: '',
  //string
  fieldSize: 'large',
  // large, medium, small
  descriptionPlacement: '',
  confirmationField: true,
  autoComplete: true,
  autoCompleteAttribute: '',
  visibility: 'visible',
  //visible,hidden,Administrative(ref: gravity form)
  defaultValue: '',
  //string
  placeholder: '',
  //string
  labelVisibility: '',
  customClass: '',
  // those options is only for number
  comparison: true,
  comparisonType: 'less-than',
  // less-than, less-than-equal, greater-than, greater-than-equal, max, min
  comparedValue: 100,
  errorMessage: ''
}, /* Checkboxes */
{
  id: '1',
  //string
  type: 'checkbox',
  // elementor, gutenburg, shortcode
  label: 'Graduation',
  //string
  description: '',
  rules: [isRequired, noDuplicates],
  showValues: true,
  choices: [{
    index: 1,
    label: '',
    value: '',
    isSelected: false
  }],
  isAllSelectable: true,
  fieldSize: 'large',
  // large, medium, small
  descriptionPlacement: '',
  visibility: 'visible',
  //visible,hidden,Administrative(ref: gravity form)
  defaultValue: '',
  //string
  labelVisibility: '',
  customClass: '',
  validationMessage: ''
}, /* Radios */
{
  id: '1',
  //string
  type: 'radio',
  // elementor, gutenburg, shortcode
  label: 'Graduation',
  //string
  description: '',
  rules: [isRequired, noDuplicates],
  showValues: true,
  choices: [{
    index: 1,
    label: '',
    value: '',
    isSelected: false
  }],
  isActiveOtherChoice: true,
  fieldSize: 'large',
  // large, medium, small
  descriptionPlacement: '',
  visibility: 'visible',
  //visible,hidden,Administrative(ref: gravity form)
  defaultValue: '',
  //string
  labelVisibility: '',
  customClass: '',
  validationMessage: ''
}];

/***/ }),

/***/ "./resources/js/admin/pages/Forms/components/Screen.js":
/*!*************************************************************!*\
  !*** ./resources/js/admin/pages/Forms/components/Screen.js ***!
  \*************************************************************/
/***/ (() => {

// import ScreenWrapStyle from '../style';

// function Screen() {
// 	return (
// 		<ScreenWrapStyle className="helpgent-form-screen">
// 			<div className="helpgent-form-screen__header"></div>
// 			<div className="helpgent-form-screen__body"></div>
// 			<div className="helpgent-form-screen__footer"></div>
// 		</ScreenWrapStyle>
// 	);
// }

// export default Screen;

/***/ })

}]);
//# sourceMappingURL=resources_js_admin_pages_Forms_FormsMap_js.js.map