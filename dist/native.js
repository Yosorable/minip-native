"use strict";
window.InitMinipNative = function (devServerApiUrl) {
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
                // dev server
                let url = "http://127.0.0.1:5000/minip-native-api";
                if (devServerApiUrl) {
                    url = devServerApiUrl;
                }
                const originFetch = fetch;
                window.fetch = function (input, init) {
                    return originFetch(url, {
                        method: "POST",
                        body: JSON.stringify({
                            apiName: "_fetch",
                            params: {
                                input,
                                init
                            }
                        }),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                };
                callback({
                    callHandler(apiName, params, call) {
                        if (params instanceof Function && !call) {
                            call = params;
                            params = undefined;
                        }
                        originFetch(url, {
                            method: "POST",
                            body: JSON.stringify({
                                apiName,
                                params
                            }),
                            headers: {
                                "content-type": "application/json"
                            }
                        })
                            .then(res => res.json())
                            .then(res => {
                            if (res.result && call) {
                                call(res.result);
                            }
                            if (res.code && call) {
                                const r = eval(res.code);
                                call(r);
                            }
                        });
                    }
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
                    showAppDetail() {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("showAppDetail", null, (res) => {
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
                    openWeb(url) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("openWeb", {
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
                    playVideo(url) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("playVideo", {
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
                    enableRefreshControl() {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("enableRefreshControl", (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    disableRefreshControl() {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("disableRefreshControl", (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    startRefresh() {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("startRefresh", (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    endRefresh() {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("endRefresh", (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    selectPhoto() {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("selectPhoto", (res) => {
                                if (res) {
                                    resolve(res);
                                }
                                else {
                                    reject();
                                }
                            });
                        });
                    },
                    getSafeAreaInsets() {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("getSafeAreaInsets", (res) => {
                                resolve(res);
                            });
                        });
                    },
                    alert(cfg) {
                        return new Promise((resolve, reject) => {
                            bridge.callHandler("alert", {
                                config: JSON.stringify(cfg)
                            }, (res) => {
                                if (res)
                                    resolve(res);
                                else
                                    reject();
                            });
                        });
                    },
                    shortShake() {
                        bridge.callHandler("shortShake");
                    }
                };
                resolve();
            });
        }
        catch (err) {
            reject(err);
        }
    });
};
