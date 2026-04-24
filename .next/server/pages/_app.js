/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/contexts/AuthContext.js":
/*!*************************************!*\
  !*** ./src/contexts/AuthContext.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);\nreact_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const fetchMe = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{\n        try {\n            const res = await fetch(\"/api/auth/me\");\n            if (res.ok) {\n                const data = await res.json();\n                setUser(data.user);\n            } else {\n                setUser(null);\n            }\n        } catch  {\n            setUser(null);\n        } finally{\n            setLoading(false);\n        }\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchMe();\n    }, [\n        fetchMe\n    ]);\n    const login = async (email, password)=>{\n        const res = await fetch(\"/api/auth/login\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                email,\n                password\n            })\n        });\n        const data = await res.json();\n        if (!res.ok) throw new Error(data.error || \"Login failed\");\n        setUser(data.user);\n        return data.user;\n    };\n    const register = async (name, email, password)=>{\n        const res = await fetch(\"/api/auth/register\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                name,\n                email,\n                password\n            })\n        });\n        const data = await res.json();\n        if (!res.ok) throw new Error(data.error || \"Registration failed\");\n        setUser(data.user);\n        return data.user;\n    };\n    const logout = async ()=>{\n        await fetch(\"/api/auth/logout\", {\n            method: \"POST\"\n        });\n        setUser(null);\n        router.push(\"/auth/login\");\n        react_hot_toast__WEBPACK_IMPORTED_MODULE_3__[\"default\"].success(\"Signed out\");\n    };\n    const refreshUser = ()=>fetchMe();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            loading,\n            login,\n            register,\n            logout,\n            refreshUser\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/project/src/contexts/AuthContext.js\",\n        lineNumber: 66,\n        columnNumber: 5\n    }, this);\n}\nfunction useAuth() {\n    const ctx = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (!ctx) throw new Error(\"useAuth must be used within AuthProvider\");\n    return ctx;\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvQXV0aENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRjtBQUM1QztBQUNKO0FBRW5DLE1BQU1PLDRCQUFjUCxvREFBYUEsQ0FBQztBQUUzQixTQUFTUSxhQUFhLEVBQUVDLFFBQVEsRUFBRTtJQUN2QyxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1QsK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDVSxTQUFTQyxXQUFXLEdBQUdYLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU1ZLFNBQVNULHNEQUFTQTtJQUV4QixNQUFNVSxVQUFVWCxrREFBV0EsQ0FBQztRQUMxQixJQUFJO1lBQ0YsTUFBTVksTUFBTSxNQUFNQyxNQUFNO1lBQ3hCLElBQUlELElBQUlFLEVBQUUsRUFBRTtnQkFDVixNQUFNQyxPQUFPLE1BQU1ILElBQUlJLElBQUk7Z0JBQzNCVCxRQUFRUSxLQUFLVCxJQUFJO1lBQ25CLE9BQU87Z0JBQ0xDLFFBQVE7WUFDVjtRQUNGLEVBQUUsT0FBTTtZQUNOQSxRQUFRO1FBQ1YsU0FBVTtZQUNSRSxXQUFXO1FBQ2I7SUFDRixHQUFHLEVBQUU7SUFFTFYsZ0RBQVNBLENBQUM7UUFDUlk7SUFDRixHQUFHO1FBQUNBO0tBQVE7SUFFWixNQUFNTSxRQUFRLE9BQU9DLE9BQU9DO1FBQzFCLE1BQU1QLE1BQU0sTUFBTUMsTUFBTSxtQkFBbUI7WUFDekNPLFFBQVE7WUFDUkMsU0FBUztnQkFBRSxnQkFBZ0I7WUFBbUI7WUFDOUNDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztnQkFBRU47Z0JBQU9DO1lBQVM7UUFDekM7UUFDQSxNQUFNSixPQUFPLE1BQU1ILElBQUlJLElBQUk7UUFDM0IsSUFBSSxDQUFDSixJQUFJRSxFQUFFLEVBQUUsTUFBTSxJQUFJVyxNQUFNVixLQUFLVyxLQUFLLElBQUk7UUFDM0NuQixRQUFRUSxLQUFLVCxJQUFJO1FBQ2pCLE9BQU9TLEtBQUtULElBQUk7SUFDbEI7SUFFQSxNQUFNcUIsV0FBVyxPQUFPQyxNQUFNVixPQUFPQztRQUNuQyxNQUFNUCxNQUFNLE1BQU1DLE1BQU0sc0JBQXNCO1lBQzVDTyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQUUsZ0JBQWdCO1lBQW1CO1lBQzlDQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVJO2dCQUFNVjtnQkFBT0M7WUFBUztRQUMvQztRQUNBLE1BQU1KLE9BQU8sTUFBTUgsSUFBSUksSUFBSTtRQUMzQixJQUFJLENBQUNKLElBQUlFLEVBQUUsRUFBRSxNQUFNLElBQUlXLE1BQU1WLEtBQUtXLEtBQUssSUFBSTtRQUMzQ25CLFFBQVFRLEtBQUtULElBQUk7UUFDakIsT0FBT1MsS0FBS1QsSUFBSTtJQUNsQjtJQUVBLE1BQU11QixTQUFTO1FBQ2IsTUFBTWhCLE1BQU0sb0JBQW9CO1lBQUVPLFFBQVE7UUFBTztRQUNqRGIsUUFBUTtRQUNSRyxPQUFPb0IsSUFBSSxDQUFDO1FBQ1o1QiwrREFBYSxDQUFDO0lBQ2hCO0lBRUEsTUFBTThCLGNBQWMsSUFBTXJCO0lBRTFCLHFCQUNFLDhEQUFDUixZQUFZOEIsUUFBUTtRQUFDQyxPQUFPO1lBQUU1QjtZQUFNRTtZQUFTUztZQUFPVTtZQUFVRTtZQUFRRztRQUFZO2tCQUNoRjNCOzs7Ozs7QUFHUDtBQUVPLFNBQVM4QjtJQUNkLE1BQU1DLE1BQU12QyxpREFBVUEsQ0FBQ007SUFDdkIsSUFBSSxDQUFDaUMsS0FBSyxNQUFNLElBQUlYLE1BQU07SUFDMUIsT0FBT1c7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL3BhaWRmb3JtLy4vc3JjL2NvbnRleHRzL0F1dGhDb250ZXh0LmpzPzc4NzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xuaW1wb3J0IHRvYXN0IGZyb20gJ3JlYWN0LWhvdC10b2FzdCdcblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0KG51bGwpXG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbiAgY29uc3QgZmV0Y2hNZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvYXV0aC9tZScpXG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXG4gICAgICAgIHNldFVzZXIoZGF0YS51c2VyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VXNlcihudWxsKVxuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgc2V0VXNlcihudWxsKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfSwgW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaE1lKClcbiAgfSwgW2ZldGNoTWVdKVxuXG4gIGNvbnN0IGxvZ2luID0gYXN5bmMgKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL2F1dGgvbG9naW4nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCwgcGFzc3dvcmQgfSksXG4gICAgfSlcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxuICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCAnTG9naW4gZmFpbGVkJylcbiAgICBzZXRVc2VyKGRhdGEudXNlcilcbiAgICByZXR1cm4gZGF0YS51c2VyXG4gIH1cblxuICBjb25zdCByZWdpc3RlciA9IGFzeW5jIChuYW1lLCBlbWFpbCwgcGFzc3dvcmQpID0+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9hdXRoL3JlZ2lzdGVyJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0pLFxuICAgIH0pXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcbiAgICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgJ1JlZ2lzdHJhdGlvbiBmYWlsZWQnKVxuICAgIHNldFVzZXIoZGF0YS51c2VyKVxuICAgIHJldHVybiBkYXRhLnVzZXJcbiAgfVxuXG4gIGNvbnN0IGxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBmZXRjaCgnL2FwaS9hdXRoL2xvZ291dCcsIHsgbWV0aG9kOiAnUE9TVCcgfSlcbiAgICBzZXRVc2VyKG51bGwpXG4gICAgcm91dGVyLnB1c2goJy9hdXRoL2xvZ2luJylcbiAgICB0b2FzdC5zdWNjZXNzKCdTaWduZWQgb3V0JylcbiAgfVxuXG4gIGNvbnN0IHJlZnJlc2hVc2VyID0gKCkgPT4gZmV0Y2hNZSgpXG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdXNlciwgbG9hZGluZywgbG9naW4sIHJlZ2lzdGVyLCBsb2dvdXQsIHJlZnJlc2hVc2VyIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUF1dGgoKSB7XG4gIGNvbnN0IGN0eCA9IHVzZUNvbnRleHQoQXV0aENvbnRleHQpXG4gIGlmICghY3R4KSB0aHJvdyBuZXcgRXJyb3IoJ3VzZUF1dGggbXVzdCBiZSB1c2VkIHdpdGhpbiBBdXRoUHJvdmlkZXInKVxuICByZXR1cm4gY3R4XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZUNhbGxiYWNrIiwidXNlUm91dGVyIiwidG9hc3QiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInJvdXRlciIsImZldGNoTWUiLCJyZXMiLCJmZXRjaCIsIm9rIiwiZGF0YSIsImpzb24iLCJsb2dpbiIsImVtYWlsIiwicGFzc3dvcmQiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJFcnJvciIsImVycm9yIiwicmVnaXN0ZXIiLCJuYW1lIiwibG9nb3V0IiwicHVzaCIsInN1Y2Nlc3MiLCJyZWZyZXNoVXNlciIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VBdXRoIiwiY3R4Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.js\n");

/***/ }),

/***/ "./src/pages/_app.jsx":
/*!****************************!*\
  !*** ./src/pages/_app.jsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.js\");\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/globals.scss */ \"./src/styles/globals.scss\");\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_scss__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_components_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/components.scss */ \"./src/styles/components.scss\");\n/* harmony import */ var _styles_components_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_components_scss__WEBPACK_IMPORTED_MODULE_4__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_1__, _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__]);\n([react_hot_toast__WEBPACK_IMPORTED_MODULE_1__, _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/home/project/src/pages/_app.jsx\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_1__.Toaster, {\n                position: \"top-right\",\n                toastOptions: {\n                    duration: 3000,\n                    style: {\n                        borderRadius: \"8px\",\n                        background: \"#161616\",\n                        color: \"#fff\",\n                        fontSize: \"0.875rem\",\n                        fontFamily: \"Inter, sans-serif\"\n                    },\n                    success: {\n                        iconTheme: {\n                            primary: \"#24A148\",\n                            secondary: \"#fff\"\n                        }\n                    },\n                    error: {\n                        iconTheme: {\n                            primary: \"#DA1E28\",\n                            secondary: \"#fff\"\n                        }\n                    }\n                }\n            }, void 0, false, {\n                fileName: \"/home/project/src/pages/_app.jsx\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/project/src/pages/_app.jsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNhO0FBQ3ZCO0FBQ0c7QUFFbkIsU0FBU0UsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNsRCxxQkFDRSw4REFBQ0gsK0RBQVlBOzswQkFDWCw4REFBQ0U7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7OzBCQUN4Qiw4REFBQ0osb0RBQU9BO2dCQUNOSyxVQUFTO2dCQUNUQyxjQUFjO29CQUNaQyxVQUFVO29CQUNWQyxPQUFPO3dCQUNMQyxjQUFjO3dCQUNkQyxZQUFZO3dCQUNaQyxPQUFPO3dCQUNQQyxVQUFVO3dCQUNWQyxZQUFZO29CQUNkO29CQUNBQyxTQUFTO3dCQUNQQyxXQUFXOzRCQUFFQyxTQUFTOzRCQUFXQyxXQUFXO3dCQUFPO29CQUNyRDtvQkFDQUMsT0FBTzt3QkFDTEgsV0FBVzs0QkFBRUMsU0FBUzs0QkFBV0MsV0FBVzt3QkFBTztvQkFDckQ7Z0JBQ0Y7Ozs7Ozs7Ozs7OztBQUlSIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFpZGZvcm0vLi9zcmMvcGFnZXMvX2FwcC5qc3g/NGM3NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSAncmVhY3QtaG90LXRvYXN0J1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLnNjc3MnXG5pbXBvcnQgJy4uL3N0eWxlcy9jb21wb25lbnRzLnNjc3MnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPFRvYXN0ZXJcbiAgICAgICAgcG9zaXRpb249XCJ0b3AtcmlnaHRcIlxuICAgICAgICB0b2FzdE9wdGlvbnM9e3tcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMTYxNjE2JyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICBmb250U2l6ZTogJzAuODc1cmVtJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdJbnRlciwgc2Fucy1zZXJpZicsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgICBpY29uVGhlbWU6IHsgcHJpbWFyeTogJyMyNEExNDgnLCBzZWNvbmRhcnk6ICcjZmZmJyB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIGljb25UaGVtZTogeyBwcmltYXJ5OiAnI0RBMUUyOCcsIHNlY29uZGFyeTogJyNmZmYnIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9BdXRoUHJvdmlkZXI+XG4gIClcbn1cbiJdLCJuYW1lcyI6WyJUb2FzdGVyIiwiQXV0aFByb3ZpZGVyIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicG9zaXRpb24iLCJ0b2FzdE9wdGlvbnMiLCJkdXJhdGlvbiIsInN0eWxlIiwiYm9yZGVyUmFkaXVzIiwiYmFja2dyb3VuZCIsImNvbG9yIiwiZm9udFNpemUiLCJmb250RmFtaWx5Iiwic3VjY2VzcyIsImljb25UaGVtZSIsInByaW1hcnkiLCJzZWNvbmRhcnkiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.jsx\n");

/***/ }),

/***/ "./src/styles/components.scss":
/*!************************************!*\
  !*** ./src/styles/components.scss ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/globals.scss":
/*!*********************************!*\
  !*** ./src/styles/globals.scss ***!
  \*********************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "react-hot-toast":
/*!**********************************!*\
  !*** external "react-hot-toast" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_app.jsx")));
module.exports = __webpack_exports__;

})();