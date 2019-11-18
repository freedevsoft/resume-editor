/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Resume.tsx":
/*!************************!*\
  !*** ./src/Resume.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const LoadComponent_1 = __webpack_require__(/*! ./components/LoadComponent */ "./src/components/LoadComponent.tsx");
const SideMenu_1 = __webpack_require__(/*! ./components/SideMenu */ "./src/components/SideMenu.tsx");
__webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
const resumeData = [
    {
        type: 'FlexibleRow',
        children: [
            {
                type: 'Title',
                value: 'Vincent La'
            },
            {
                type: 'Paragraph',
                value: 'Email: vincela9@hotmail.com\nPhone: 123-456-7890'
            }
        ]
    },
    {
        type: 'Section',
        title: 'Objective',
        children: [
            {
                type: 'Paragraph',
                value: 'To conquer the world.'
            }
        ]
    },
    {
        type: 'Section',
        title: 'Education',
        children: [
            {
                type: 'Entry'
            }
        ]
    }
];
class Resume extends React.Component {
    constructor(props) {
        super(props);
        // Custom CSS
        const head = document.getElementsByTagName("head")[0];
        this.style = document.createElement("style");
        this.style.innerHTML = "";
        head.appendChild(this.style);
        this.state = {
            children: resumeData,
            customCss: `body {
    width: 70vw;
    margin: 1em auto 1em auto;
    font-family: Tahoma, sans-serif;
    font-size: 10pt;
}

body * {
    margin: 0;
}

h1, h2, h3, h4 {
    font-family: Georgia, serif;
}

h2 { border-bottom: 1px solid; }

section {
    margin-bottom: 1.5em;
}`
        };
        this.renderStyle();
        // this.addSection = this.addSection.bind(this);
        this.addChild = this.addChild.bind(this);
        this.updateData = this.updateData.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.renderStyle = this.renderStyle.bind(this);
        this.onStyleChange = this.onStyleChange.bind(this);
    }
    /*
    addSection() {
        this.setState({
            children: this.state.children.addChild({
                type: 'Section',
                title: 'Add title here'
            })
        });
    }
    */
    // Update custom CSS
    onStyleChange(event) {
        this.setState({
            customCss: event.target.value,
        });
    }
    // Push style changes to browser
    renderStyle() {
        this.style.innerHTML = this.state.customCss;
    }
    addChild(idx, node) {
        this.state.children[idx]['children'].push(node);
        this.setState({
            children: this.state.children
        });
    }
    deleteChild(idx) {
        let newChildren = new Array();
        for (let i = 0; i < this.state.children.length; i++) {
            if (i != idx) {
                newChildren.push(this.state.children[i]);
            }
        }
        this.setState({
            children: newChildren
        });
    }
    updateData(idx, key, data) {
        this.state.children[idx][key] = data;
        this.setState({
            children: this.state.children
        });
    }
    toggleEdit(idx) {
        console.log("Toggle edit received", idx);
        let currentValue = this.state.children[idx]['isEditing'];
        this.state.children[idx]['isEditing'] = !currentValue;
        this.setState({
            children: this.state.children
        });
    }
    render() {
        console.log(this.state.children);
        // <button style={{}} onClick={this.addSection}>Add Section</button>
        /*<div>
                <h2>Style Editor</h2>
                <textarea onChange={this.onStyleChange} value={this.state.customCss} />
                <button onClick={this.renderStyle}>Update</button>
            </div>*/
        return React.createElement("div", { style: {
                display: 'flex',
                flexDirection: 'row'
            } },
            React.createElement("div", { id: "resume" }, this.state.children.map((elem, idx) => React.createElement(React.Fragment, { key: idx }, LoadComponent_1.default(elem, {
                addChild: this.addChild.bind(this, idx),
                deleteChild: this.deleteChild.bind(this, idx),
                toggleEdit: this.toggleEdit.bind(this, idx),
                updateData: this.updateData.bind(this, idx)
            })))),
            React.createElement(SideMenu_1.SideMenu, null));
    }
}
exports.default = Resume;


/***/ }),

/***/ "./src/components/EditButton.tsx":
/*!***************************************!*\
  !*** ./src/components/EditButton.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function EditButton(props) {
    if (props.isEditing && props.toggleEdit) {
        return React.createElement("button", { onClick: props.toggleEdit }, "Done");
    }
    return React.createElement("button", { onClick: props.toggleEdit }, "Edit");
}
exports.default = EditButton;


/***/ }),

/***/ "./src/components/Entry.tsx":
/*!**********************************!*\
  !*** ./src/components/Entry.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const LoadComponent_1 = __webpack_require__(/*! ./LoadComponent */ "./src/components/LoadComponent.tsx");
const ResumeComponent_1 = __webpack_require__(/*! ./ResumeComponent */ "./src/components/ResumeComponent.tsx");
class Entry extends ResumeComponent_1.default {
    constructor(props) {
        super(props);
        this.addChild = this.addChild.bind(this);
    }
    addChild() {
        if (this.props.addChild) {
            this.props.addChild({
                type: 'List'
            });
        }
    }
    render() {
        if (this.props.isEditing) {
            return React.createElement("div", null,
                React.createElement("input", { onChange: this.updateData.bind(this, "title"), value: this.props.title || "" }),
                React.createElement("input", { onChange: this.updateData.bind(this, "subtitle"), value: this.props.subtitle || "" }),
                React.createElement("button", { onClick: this.toggleEdit }, "Done"));
        }
        return React.createElement("div", null,
            React.createElement("h3", null, this.props.title || "Enter a title"),
            React.createElement("p", null, this.props.subtitle || "Enter a subtitle"),
            this.props.children.map((elem, idx) => React.createElement(React.Fragment, { key: idx }, LoadComponent_1.default(elem, {
                addChild: this.addNestedChild.bind(this, idx),
                toggleEdit: this.toggleNestedEdit.bind(this, idx),
                updateData: this.updateNestedData.bind(this, idx)
            }))),
            React.createElement("button", { onClick: this.addChild }, "Add"),
            React.createElement("button", { onClick: this.toggleEdit }, "Edit"));
    }
}
exports.default = Entry;


/***/ }),

/***/ "./src/components/FlexibleRow.tsx":
/*!****************************************!*\
  !*** ./src/components/FlexibleRow.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const LoadComponent_1 = __webpack_require__(/*! ./LoadComponent */ "./src/components/LoadComponent.tsx");
const ResumeComponent_1 = __webpack_require__(/*! ./ResumeComponent */ "./src/components/ResumeComponent.tsx");
class FlexibleRow extends ResumeComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%"
            } }, this.props.children.map((elem, idx) => React.createElement(React.Fragment, { key: idx }, LoadComponent_1.default(elem, {
            toggleEdit: this.toggleNestedEdit.bind(this, idx),
            updateData: this.updateNestedData.bind(this, idx)
        }))));
    }
}
exports.default = FlexibleRow;


/***/ }),

/***/ "./src/components/List.tsx":
/*!*********************************!*\
  !*** ./src/components/List.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const LoadComponent_1 = __webpack_require__(/*! ./LoadComponent */ "./src/components/LoadComponent.tsx");
const ResumeComponent_1 = __webpack_require__(/*! ./ResumeComponent */ "./src/components/ResumeComponent.tsx");
class ListItem extends ResumeComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.isEditing) {
            return React.createElement(React.Fragment, null,
                React.createElement("input", { onChange: this.props.updateData.bind(this, "value"), value: this.props.value, type: "text" }),
                React.createElement("div", { style: { float: "right" } },
                    React.createElement("button", { onClick: this.toggleEdit }, "Done")));
        }
        return React.createElement("li", null,
            this.props.value,
            React.createElement("div", { style: { float: "right" } },
                React.createElement("button", { onClick: this.toggleEdit }, "Edit")));
    }
}
exports.ListItem = ListItem;
class List extends ResumeComponent_1.default {
    constructor(props) {
        super(props);
        this.addChild = this.addChild.bind(this);
    }
    addChild() {
        if (this.props.addChild) {
            this.props.addChild({
                type: 'ListItem'
            });
        }
    }
    render() {
        return React.createElement(React.Fragment, null,
            React.createElement("div", { style: { float: "right" } },
                React.createElement("button", { onClick: this.addChild }, "Add")),
            React.createElement("ul", null, this.props.children.map((elem, idx) => React.createElement(React.Fragment, { key: idx }, LoadComponent_1.default(elem, {
                toggleEdit: this.toggleNestedEdit.bind(this, idx),
                updateData: this.updateNestedData.bind(this, idx)
            })))));
    }
}
exports.default = List;


/***/ }),

/***/ "./src/components/LoadComponent.tsx":
/*!******************************************!*\
  !*** ./src/components/LoadComponent.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FlexibleRow_1 = __webpack_require__(/*! ./FlexibleRow */ "./src/components/FlexibleRow.tsx");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Section_1 = __webpack_require__(/*! ./Section */ "./src/components/Section.tsx");
const Entry_1 = __webpack_require__(/*! ./Entry */ "./src/components/Entry.tsx");
const List_1 = __webpack_require__(/*! ./List */ "./src/components/List.tsx");
const Paragraph_1 = __webpack_require__(/*! ./Paragraph */ "./src/components/Paragraph.tsx");
const Title_1 = __webpack_require__(/*! ./Title */ "./src/components/Title.tsx");
function loadComponent(data, extraProps) {
    // Load prop data
    let props = {};
    for (let key in data) {
        if (data[key] != 'children' && data[key] != 'type') {
            props[key] = data[key];
        }
    }
    if (extraProps) {
        props['addChild'] = extraProps.addChild;
        props['deleteChild'] = extraProps.deleteChild;
        props['toggleEdit'] = extraProps.toggleEdit;
        props['updateData'] = extraProps.updateData;
    }
    props['children'] = new Array();
    // Load children
    if (data['children']) {
        props['children'] = data['children'];
    }
    switch (data['type']) {
        case 'FlexibleRow':
            return React.createElement(FlexibleRow_1.default, Object.assign({}, props));
        case 'Section':
            return React.createElement(Section_1.default, Object.assign({}, props));
        case 'Entry':
            return React.createElement(Entry_1.default, Object.assign({}, props));
        case 'List':
            return React.createElement(List_1.default, Object.assign({}, props));
        case 'ListItem':
            return React.createElement(List_1.ListItem, Object.assign({}, props));
        case 'Paragraph':
            return React.createElement(Paragraph_1.default, Object.assign({}, props));
        case 'Title':
            return React.createElement(Title_1.default, Object.assign({}, props));
    }
}
exports.default = loadComponent;


/***/ }),

/***/ "./src/components/Paragraph.tsx":
/*!**************************************!*\
  !*** ./src/components/Paragraph.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const EditButton_1 = __webpack_require__(/*! ./EditButton */ "./src/components/EditButton.tsx");
const ResumeComponent_1 = __webpack_require__(/*! ./ResumeComponent */ "./src/components/ResumeComponent.tsx");
class Paragraph extends ResumeComponent_1.default {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);
    }
    // Convert newlines ('\n') into HTML line breaks
    processTextArea() {
        let textArea = this.props.value.split("\n");
        return React.createElement(React.Fragment, null, textArea.map((x, idx) => React.createElement(React.Fragment, { key: idx },
            x,
            React.createElement("br", null))));
    }
    render() {
        if (this.props.isEditing) {
            return React.createElement(React.Fragment, null,
                React.createElement("textarea", { onChange: this.updateData.bind(this, "value"), value: this.props.value }),
                React.createElement(EditButton_1.default, Object.assign({}, this.props)));
        }
        return React.createElement("p", null,
            this.processTextArea(),
            React.createElement("span", { style: { display: "inline-block" } },
                React.createElement(EditButton_1.default, Object.assign({}, this.props)),
                React.createElement("button", { onClick: this.props.deleteChild }, "Delete")));
    }
}
exports.default = Paragraph;


/***/ }),

/***/ "./src/components/ResumeComponent.tsx":
/*!********************************************!*\
  !*** ./src/components/ResumeComponent.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
// Represents a component that is part of the user's resume
class ResumeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.addNestedChild = this.addNestedChild.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleNestedEdit = this.toggleNestedEdit.bind(this);
        this.updateNestedData = this.updateNestedData.bind(this);
    }
    addNestedChild(idx, node) {
        let newChildren = this.props.children;
        if (!newChildren[idx]['children']) {
            newChildren[idx]['children'] = new Array();
        }
        newChildren[idx]['children'].push(node);
        if (this.props.updateData) {
            this.props.updateData("children", newChildren);
        }
    }
    toggleEdit(event) {
        if (this.props.toggleEdit) {
            this.props.toggleEdit();
        }
    }
    toggleNestedEdit(idx) {
        let currentChildData = this.props.children[idx]['isEditing'];
        this.updateNestedData(idx, "isEditing", !currentChildData);
    }
    updateNestedData(idx, key, data) {
        let newChildren = this.props.children;
        newChildren[idx][key] = data;
        if (this.props.updateData) {
            this.props.updateData("children", newChildren);
        }
    }
    updateData(key, event) {
        if (this.props.updateData) {
            this.props.updateData(key, event.target.value);
        }
    }
}
exports.default = ResumeComponent;


/***/ }),

/***/ "./src/components/Section.tsx":
/*!************************************!*\
  !*** ./src/components/Section.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const LoadComponent_1 = __webpack_require__(/*! ./LoadComponent */ "./src/components/LoadComponent.tsx");
const EditButton_1 = __webpack_require__(/*! ./EditButton */ "./src/components/EditButton.tsx");
const ResumeComponent_1 = __webpack_require__(/*! ./ResumeComponent */ "./src/components/ResumeComponent.tsx");
class Section extends ResumeComponent_1.default {
    constructor(props) {
        super(props);
        this.addChild = this.addChild.bind(this);
    }
    addChild() {
        if (this.props.addChild) {
            this.props.addChild({
                type: "Paragraph",
                value: "Enter value here"
            });
        }
    }
    render() {
        let buttons = React.createElement("div", { style: { float: "right" } },
            React.createElement("button", { onClick: this.addChild }, "Add"),
            React.createElement(EditButton_1.default, Object.assign({}, this.props)),
            React.createElement("button", { onClick: this.props.deleteChild }, "Delete"));
        let title = this.props.title;
        if (this.props.isEditing) {
            title = React.createElement("input", { onChange: this.updateData.bind(this, "title"), type: "text", value: this.props.title });
        }
        return React.createElement("section", null,
            React.createElement("h2", null,
                title,
                buttons),
            this.props.children.map((elem, idx) => React.createElement(React.Fragment, { key: idx }, LoadComponent_1.default(elem, {
                addChild: this.addNestedChild.bind(this, idx),
                toggleEdit: this.toggleNestedEdit.bind(this, idx),
                updateData: this.updateNestedData.bind(this, idx)
            }))));
    }
}
exports.default = Section;


/***/ }),

/***/ "./src/components/SideMenu.tsx":
/*!*************************************!*\
  !*** ./src/components/SideMenu.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function SideMenu() {
    const [open, setOpen] = react_1.useState(false);
    return (React.createElement(React.Fragment, null,
        React.createElement(react_bootstrap_1.Button, { onClick: () => setOpen(!open), "aria-controls": "side-bar", "aria-expanded": open }, "Click"),
        React.createElement(react_bootstrap_1.Collapse, { in: open },
            React.createElement("div", null, "Test test test testse testse"))));
}
exports.SideMenu = SideMenu;


/***/ }),

/***/ "./src/components/Title.tsx":
/*!**********************************!*\
  !*** ./src/components/Title.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const EditButton_1 = __webpack_require__(/*! ./EditButton */ "./src/components/EditButton.tsx");
const ResumeComponent_1 = __webpack_require__(/*! ./ResumeComponent */ "./src/components/ResumeComponent.tsx");
class Title extends ResumeComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.isEditing) {
            return React.createElement(React.Fragment, null,
                React.createElement("input", { onChange: this.updateData.bind(this, "value"), value: this.props.value, type: "text" }),
                React.createElement(EditButton_1.default, Object.assign({}, this.props)));
        }
        return React.createElement("h1", null,
            this.props.value,
            React.createElement("div", { style: { display: "inline-block" } },
                React.createElement(EditButton_1.default, Object.assign({}, this.props))));
    }
}
exports.default = Title;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
const Resume_1 = __webpack_require__(/*! ./Resume */ "./src/Resume.tsx");
// import * as serviceWorker from './serviceWorker';
ReactDOM.render(React.createElement(Resume_1.default, null), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map