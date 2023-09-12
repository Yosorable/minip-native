type HUDType = "success" | "error" | "progress" | "label"

interface NativeMethods {
  // navigate
  closeApp(): Promise<Boolean>;
  navigateTo(page: String, title?: String): Promise<Boolean>;
  openWeb(url: String): Promise<Boolean>;
  // file
  writeFile(filename: String, data: Number[]): Promise<Boolean>;
  readFile(filename: String): Promise<Number[]>;
  listFiles(path: String): Promise<String[]>;
  // hud
  HUD(type: HUDType, title?: String, subTitle?: String, delay?: Number): Promise<Boolean>;
  // preview
  previewImage(url: String): Promise<Boolean>;
  // memory tmp store
  setMemStore(key: String, val: String): Promise<Boolean>;
  getMemStore(key: String): Promise<String>;
  delMemStore(key: String): Promise<Boolean>;
  // present data (lmdb)
  setKVStore(key: String, val: String): Promise<Boolean>;
  getKVStore(key: String): Promise<String>;
  delKVStore(key: String): Promise<Boolean>;
}

declare interface Window {
  MinipNative: NativeMethods;
  InitMinipNative: () => Promise<void>;
  WKWebViewJavascriptBridge: any;
  WKWVJBCallbacks: any;
  webkit: any;
  pywebview: any;
}

interface Bridge {
  callHandler(methodName: String, data?: any, callback?: any): void;
}

window.InitMinipNative = function (): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // setup
    function setupWKWebViewJavascriptBridge(callback: any) {
      try {
        if (window.WKWebViewJavascriptBridge) { return callback(window.WKWebViewJavascriptBridge); }
        if (window.WKWVJBCallbacks) { return window.WKWVJBCallbacks.push(callback); }
        window.WKWVJBCallbacks = [callback];
        window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
      } catch {
        // pywebview
        window.addEventListener('pywebviewready', function () {
          callback({
            callHandler(apiName: any, params: any, call: any) {
              window.pywebview.api[apiName](params)
                .then((res: any) => call(res))
            }
          })
        })
      }
    }

    try {
      setupWKWebViewJavascriptBridge(function (bridge: Bridge) {
        window.MinipNative = window.MinipNative || {
          closeApp() {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("close", null, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
          navigateTo(page, title) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("navigateTo", {
                page,
                title
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
          openWeb(url) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("openWeb", {
                url
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
          writeFile(filename, data) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("writeFile", {
                filename,
                data
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
          readFile(filename) {
            return new Promise<Number[]>((resolve, reject) => {
              bridge.callHandler("readFile", {
                filename
              }, (res: Number[]) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
          listFiles(path) {
            return new Promise<String[]>((resolve, reject) => {
              bridge.callHandler("listFiles", {
                path
              }, (res: String[]) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },

          HUD(type, title, subTitle, delay) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("HUD", {
                type,
                title,
                subTitle,
                delay
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },

          previewImage(url) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("previewImage", {
                url
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },

          setMemStore(key, val) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("setMemStore", {
                key,
                val
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })

          },
          getMemStore(key) {
            return new Promise<String>((resolve, reject) => {
              bridge.callHandler("getMemStore", {
                key
              }, (res?: String) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
          delMemStore(key) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("delMemStore", {
                key
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },

          setKVStore(key, val) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("setKVStore", {
                key,
                val
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
          getKVStore(key) {
            return new Promise<String>((resolve, reject) => {
              bridge.callHandler("getKVStore", {
                key
              }, (res?: String) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
          delKVStore(key) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("delKVStore", {
                key
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else {
                  reject()
                }
              })
            })
          },
        }

        resolve()
      })
    } catch (err) {
      reject(err)
    }
  })
}