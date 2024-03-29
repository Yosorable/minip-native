type HUDType = "success" | "error" | "progress" | "label"
interface SafeAreaInsets {
  top: number
  left: number
  right: number
  bottom: number
}

interface AlertAction {
  title?: String
  style?: "cancel" | "destructive"
  key: String // callback arg
}

interface AlertConfig {
  title?: String
  message?: String
  preferredStyle?: "alert" | "actionSheet"
  actions: AlertAction[]
}

interface NativeMethods {
  // navigate
  closeApp(): Promise<Boolean>;
  showAppDetail(): Promise<Boolean>;
  navigateTo(page: String, title?: String): Promise<Boolean>;
  openWeb(url: String): Promise<Boolean>;
  playVideo(url: String): Promise<Boolean>;
  // file
  writeFile(filename: String, data: Number[]): Promise<Boolean>;
  readFile(filename: String): Promise<Number[]>;
  listFiles(path: String): Promise<String[]>;
  // notification
  HUD(type: HUDType, title?: String, subTitle?: String, delay?: Number): Promise<Boolean>;
  alert(config: AlertConfig): Promise<String | null | undefined>;
  shortShake(): void;
  // preview
  previewImage(url: String): Promise<Boolean>;
  // memory tmp store
  setMemStore(key: String, val: String): Promise<Boolean>;
  getMemStore(key: String): Promise<String>;
  delMemStore(key: String): Promise<Boolean>;
  // persistent data (lmdb)
  setKVStore(key: String, val: String): Promise<Boolean>;
  getKVStore(key: String): Promise<String>;
  delKVStore(key: String): Promise<Boolean>;
  // refresh control
  enableRefreshControl(): Promise<Boolean>;
  disableRefreshControl(): Promise<Boolean>;
  startRefresh(): Promise<Boolean>;
  endRefresh(): Promise<Boolean>;
  // test
  selectPhoto(): Promise<String[]>
  // device
  getSafeAreaInsets(): Promise<SafeAreaInsets>
  localAuthentication(): Promise<Boolean>
}

declare interface Window {
  MinipNative: NativeMethods;
  InitMinipNative: (devServerApiUrl: String | undefined) => Promise<void>;
  WKWebViewJavascriptBridge: any;
  WKWVJBCallbacks: any;
  webkit: any;
  pywebview: any;
}

interface Bridge {
  callHandler(methodName: String, data?: any, callback?: any): void;
}

window.InitMinipNative = function (devServerApiUrl: String | undefined): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // setup
    function setupWKWebViewJavascriptBridge(callback: any) {
      try {
        if (window.WKWebViewJavascriptBridge) { return callback(window.WKWebViewJavascriptBridge); }
        if (window.WKWVJBCallbacks) { return window.WKWVJBCallbacks.push(callback); }
        window.WKWVJBCallbacks = [callback];
        window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
      } catch {
        // dev server

        let url = "http://127.0.0.1:5000/minip-native-api"
        if (devServerApiUrl) {
          url = devServerApiUrl as string
        }

        const originFetch = fetch
        window.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
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
          })
        }
        callback({
          callHandler(apiName: any, params: any, call: any) {
            if (params instanceof Function && !call) {
              call = params
              params = undefined
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
                  call(res.result)
                }
                if (res.code && call) {
                  eval(res.code)
                }
              })
          }
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
          showAppDetail() {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("showAppDetail", null, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
                  reject()
                }
              })
            })
          },
          playVideo(url) {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("playVideo", {
                url
              }, (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
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
                } else if (reject) {
                  reject()
                }
              })
            })
          },
          enableRefreshControl() {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("enableRefreshControl", (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else if (reject) {
                  reject()
                }
              })
            })
          },
          disableRefreshControl() {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("disableRefreshControl", (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else if (reject) {
                  reject()
                }
              })
            })
          },
          startRefresh() {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("startRefresh", (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else if (reject) {
                  reject()
                }
              })
            })
          },
          endRefresh() {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("endRefresh", (res: Boolean) => {
                if (res) {
                  resolve(res)
                } else if (reject) {
                  reject()
                }
              })
            })
          },
          selectPhoto() {
            return new Promise<String[]>((resolve, reject) => {
              bridge.callHandler("selectPhoto", (res: String[]) => {
                if (res) {
                  resolve(res)
                } else if (reject) {
                  reject()
                }
              })
            })
          },
          getSafeAreaInsets() {
            return new Promise<SafeAreaInsets>((resolve, reject) => {
              bridge.callHandler("getSafeAreaInsets", (res: SafeAreaInsets) => {
                resolve(res)
              })
            })
          },
          alert(cfg) {
            return new Promise<String | null | undefined>((resolve, reject) => {
              bridge.callHandler("alert", {
                config: JSON.stringify(cfg)
              }, (res: String | null | undefined) => {
                if (res)
                  resolve(res)
                else if (reject)
                  reject()
              })
            })
          },
          shortShake() {
            bridge.callHandler("shortShake")
          },
          localAuthentication() {
            return new Promise<Boolean>((resolve, reject) => {
              bridge.callHandler("localAuthentication", null,
                (res: Boolean) => {
                  if (res === true || res === false)
                    resolve(res)
                  else if (reject)
                    reject()
                })
            })
          }
        }

        resolve()
      })
    } catch (err) {
      reject(err)
    }
  })
}