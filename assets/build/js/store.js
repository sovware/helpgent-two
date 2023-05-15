/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/module/registerModule.js":
/*!***********************************************!*\
  !*** ./resources/js/module/registerModule.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ registerModule)
/* harmony export */ });
/**
 *
 * @param { string } moduleName
 * @param { Object } module
 */
function registerModule(moduleName, module) {
  for (let itemName of Object.keys(module)) {
    //check if the moduleName already exists.
    if (!window[moduleName]) {
      window[moduleName] = {};
      window[moduleName][itemName] = module[itemName];
    } else {
      //check if the module already exists.
      if (!window[moduleName][itemName]) {
        window[moduleName][itemName] = module[itemName];
      }
    }
  }
}

/***/ }),

/***/ "./resources/js/store/forms.js":
/*!*************************************!*\
  !*** ./resources/js/store/forms.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formsActions": () => (/* binding */ formsActions),
/* harmony export */   "formsReducer": () => (/* binding */ formsReducer),
/* harmony export */   "formsSelectors": () => (/* binding */ formsSelectors)
/* harmony export */ });
const formsReducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'SET_FORMS':
      return [...action.payload];
  }
  return state;
};
const formsActions = {
  setForms(data) {
    return {
      type: 'SET_FORMS',
      payload: data
    };
  }
};
const formsSelectors = {
  getForms(_ref) {
    let {
      formsReducer
    } = _ref;
    return formsReducer;
  }
};

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./resources/js/store/index.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms */ "./resources/js/store/forms.js");
/* harmony import */ var _module_registerModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../module/registerModule */ "./resources/js/module/registerModule.js");
/**
 * WordPress dependencies
 */



const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('helpgent-store', {
  reducer: (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({
    formsReducer: _forms__WEBPACK_IMPORTED_MODULE_1__.formsReducer
  }),
  actions: _forms__WEBPACK_IMPORTED_MODULE_1__.formsActions,
  selectors: _forms__WEBPACK_IMPORTED_MODULE_1__.formsSelectors
});

// register store at window
(0,_module_registerModule__WEBPACK_IMPORTED_MODULE_2__["default"])('helpgent', {
  store
});

// register store to app
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);
})();

/******/ })()
;
//# sourceMappingURL=store.js.map