"use strict";
window.InitMinipNative = function () {
    return new Promise((resolve, reject) => {
        // setup
        function setupWKWebViewJavascriptBridge(callback) {
            try {
                if (window.WKWebViewJavascriptBridge) {
                    return callback(window.WKWebViewJavascriptBridge);
                }
                if (window.WKWVJBCallbacks) {
                    return window.WKWVJBCallbacks.push(callback);
                }
                window.WKWVJBCallbacks = [callback];
                window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
            }
            catch (_a) {
                // pywebview
                window.addEventListener('pywebviewready', function () {
                    callback({
                        callHandler(apiName, params, call) {
                            window.pywebview.api[apiName](params)
                                .then((res) => call(res));
                        }
                    });
                });
            }
        }
        try {
            setupWKWebViewJavascriptBridge(function (bridge) {
                window.MinipNative = window.MinipNative || {
                    closeApp() {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("close", null, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    navigateTo(page, title) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("navigateTo", {
                                page,
                                title
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    writeFile(filename, data) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("writeFile", {
                                filename,
                                data
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    readFile(filename) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("readFile", {
                                filename
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    listFiles(path) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("listFiles", {
                                path
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    HUD(type, title, subTitle, delay) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("HUD", {
                                type,
                                title,
                                subTitle,
                                delay
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    previewImage(url) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("previewImage", {
                                url
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    setMemStore(key, val) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("setMemStore", {
                                key,
                                val
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    getMemStore(key) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("getMemStore", {
                                key
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    delMemStore(key) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("delMemStore", {
                                key
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    setKVStore(key, val) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("setKVStore", {
                                key,
                                val
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    getKVStore(key) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("getKVStore", {
                                key
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    delKVStore(key) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("delKVStore", {
                                key
                            }, (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                };
                resolve();
            });
        }
        catch (err) {
            reject(err);
        }
    });
};
