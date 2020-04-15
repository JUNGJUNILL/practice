webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_AppLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/AppLayout */ "./components/AppLayout.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers */ "./reducers/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next-redux-wrapper */ "./node_modules/next-redux-wrapper/es6/index.js");
var _this = undefined,
    _jsxFileName = "D:\\git Repository\\practice\\front\\pages\\_app.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;
//next에서 제공하는 최상위 컴포넌트 파일 (_app.js로 직접 만들어야 한다. )
//페이지들의 공통적인 부분기여주기 



 // 모든 컴포넌트는 _app.js를 공유한다. 
// redux는 state의 중앙통제실 역할을 하므로 모든 컴포넌트의 state를 컨트롤 하기 위해
// _app.js에다가 redux를 연결해 주는 작업이 필요하다. 
//--react, redux 연결하기 

 //redux state 제공, 이것으로 전체 컴포넌트의 state를 관리 할 수 있다. 





var NodeBird = function NodeBird(_ref) {
  var Component = _ref.Component,
      store = _ref.store;
  //▲ next에서 제공하는 props
  return __jsx(react_redux__WEBPACK_IMPORTED_MODULE_4__["Provider"], {
    store: store,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }, " ", __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, __jsx("title", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 17
    }
  }, "NodeBird"), __jsx("link", {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.min.css",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 17
    }
  })), __jsx(_components_AppLayout__WEBPACK_IMPORTED_MODULE_0__["default"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 13
    }
  }, __jsx(Component, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 17
    }
  }))));
};

NodeBird.propTypes = {
  Component: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.elementType,
  store: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
}; //제로초가 그냥 외우라고함... 

/* harmony default export */ __webpack_exports__["default"] = (Object(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_7__["default"])(function (initialState, options) {
  var middleWares = [];
  var enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_6__["compose"])(redux__WEBPACK_IMPORTED_MODULE_6__["applyMiddleware"].apply(void 0, middleWares),  true && window.__REDUX_DEVTOOLS_EXTENSION !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
    return f;
  } //브라우저에 REDUX DEVTOOLS 설치시 
  //window객체애 해당 변수(__REDUX_DEVTOOLS_EXTENSION)가 생성됨, __REDUX_DEVTOOLS_EXTENSION__()해당 함수를 사용할 수 있게됨
  );
  var store = Object(redux__WEBPACK_IMPORTED_MODULE_6__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_5__["default"], initialState, enhancer);
  return store;
})(NodeBird));

/***/ })

})
//# sourceMappingURL=_app.js.7b5118d0f7c811e52047.hot-update.js.map