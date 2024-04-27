import bridge from "./bridge";

type HUDType = "success" | "error" | "progress" | "label";
interface SafeAreaInsets {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface AlertAction {
  title?: string;
  style?: "cancel" | "destructive";
  key: string; // callback arg
}

interface AlertConfig {
  title?: string;
  message?: string;
  preferredStyle?: "alert" | "actionSheet";
  actions: AlertAction[];
}

interface SetObservableDataConfig {
  key: string;
  initValue?: string;
}

interface NativeMethods {
  // navigate
  closeApp(): Promise<boolean>;
  showAppDetail(): Promise<boolean>;
  navigateTo(page: string, title?: string): Promise<boolean>;
  openWeb(url: string): Promise<boolean>;
  navigateBack(): void;
  // file
  writeFile(filename: string, data: number[]): Promise<boolean>;
  readFile(filename: string): Promise<number[]>;
  listFiles(path: string): Promise<string[]>;
  // notification
  HUD(
    type: HUDType,
    title?: string,
    subTitle?: string,
    delay?: number
  ): Promise<boolean>;
  alert(config: AlertConfig): Promise<string | null | undefined>;
  // media
  previewImage(url: string): Promise<boolean>;
  playVideo(url: string): Promise<boolean>;
  selectPhoto(): Promise<string[]>;
  // memory tmp store
  setMemStore(key: string, val: string): Promise<boolean>;
  getMemStore(key: string): Promise<string>;
  delMemStore(key: string): Promise<boolean>;
  // persistent data (lmdb)
  setKVStore(key: string, val: string): Promise<boolean>;
  getKVStore(key: string): Promise<string>;
  delKVStore(key: string): Promise<boolean>;
  setObservableData(config: SetObservableDataConfig): Promise<string>; // data observer `window.addEventListener("observedDataChanged", e => setData(e.detail.key, e.detail.value))`
  // refresh control
  enableRefreshControl(): Promise<boolean>;
  disableRefreshControl(): Promise<boolean>;
  startRefresh(): Promise<boolean>;
  endRefresh(): Promise<boolean>;
  // device
  getSafeAreaInsets(): Promise<SafeAreaInsets>;
  localAuthentication(): Promise<boolean>;
  getClipboardData(): Promise<string>;
  setClipboardData(data: string): Promise<boolean>;
  shortShake(): void;
  vibrateShort(type: "light" | "medium" | "heavy"): void;
}

const minip: NativeMethods = {
  closeApp() {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler("close", null, (res: boolean) => {
        if (res) {
          resolve(res);
        } else {
          reject();
        }
      });
    });
  },
  showAppDetail() {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler("showAppDetail", null, (res: boolean) => {
        if (res) {
          resolve(res);
        } else if (reject) {
          reject();
        }
      });
    });
  },
  navigateTo(page, title) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "navigateTo",
        {
          page,
          title,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  navigateBack() {
    bridge.callHandler("navigateBack");
  },
  openWeb(url) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "openWeb",
        {
          url,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  playVideo(url) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "playVideo",
        {
          url,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  writeFile(filename, data) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "writeFile",
        {
          filename,
          data,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  readFile(filename) {
    return new Promise<number[]>((resolve, reject) => {
      bridge.callHandler(
        "readFile",
        {
          filename,
        },
        (res: number[]) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  listFiles(path) {
    return new Promise<string[]>((resolve, reject) => {
      bridge.callHandler(
        "listFiles",
        {
          path,
        },
        (res: string[]) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },

  HUD(type, title, subTitle, delay) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "HUD",
        {
          type,
          title,
          subTitle,
          delay,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },

  previewImage(url) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "previewImage",
        {
          url,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },

  setMemStore(key, val) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "setMemStore",
        {
          key,
          val,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  getMemStore(key) {
    return new Promise<string>((resolve, reject) => {
      bridge.callHandler(
        "getMemStore",
        {
          key,
        },
        (res?: string) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  delMemStore(key) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "delMemStore",
        {
          key,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  setKVStore(key, val) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "setKVStore",
        {
          key,
          val,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  getKVStore(key) {
    return new Promise<string>((resolve, reject) => {
      bridge.callHandler(
        "getKVStore",
        {
          key,
        },
        (res?: string) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  delKVStore(key) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler(
        "delKVStore",
        {
          key,
        },
        (res: boolean) => {
          if (res) {
            resolve(res);
          } else if (reject) {
            reject();
          }
        }
      );
    });
  },
  enableRefreshControl() {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler("enableRefreshControl", (res: boolean) => {
        if (res) {
          resolve(res);
        } else if (reject) {
          reject();
        }
      });
    });
  },
  disableRefreshControl() {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler("disableRefreshControl", (res: boolean) => {
        if (res) {
          resolve(res);
        } else if (reject) {
          reject();
        }
      });
    });
  },
  startRefresh() {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler("startRefresh", (res: boolean) => {
        if (res) {
          resolve(res);
        } else if (reject) {
          reject();
        }
      });
    });
  },
  endRefresh() {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler("endRefresh", (res: boolean) => {
        if (res) {
          resolve(res);
        } else if (reject) {
          reject();
        }
      });
    });
  },
  selectPhoto() {
    return new Promise<string[]>((resolve, reject) => {
      bridge.callHandler("selectPhoto", (res: string[]) => {
        if (res) {
          resolve(res);
        } else if (reject) {
          reject();
        }
      });
    });
  },
  getSafeAreaInsets() {
    return new Promise<SafeAreaInsets>((resolve, reject) => {
      bridge.callHandler("getSafeAreaInsets", (res: SafeAreaInsets) => {
        resolve(res);
      });
    });
  },
  alert(cfg) {
    return new Promise<string | null | undefined>((resolve, reject) => {
      bridge.callHandler(
        "alert",
        {
          config: JSON.stringify(cfg),
        },
        (res: string | null | undefined) => {
          if (res) resolve(res);
          else if (reject) reject();
        }
      );
    });
  },
  shortShake() {
    bridge.callHandler("shortShake");
  },
  localAuthentication() {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler("localAuthentication", null, (res: boolean) => {
        if (res === true || res === false) resolve(res);
        else if (reject) reject();
      });
    });
  },
  setObservableData(config) {
    return new Promise<string>((resolve) => {
      bridge.callHandler("setObservableData", config, (res: string) => {
        resolve(res);
      });
    });
  },
  getClipboardData() {
    return new Promise<string>((resolve, reject) => {
      bridge.callHandler("getClipboardData", null, (res: string) => {
        if (res) resolve(res);
        else reject();
      });
    });
  },
  setClipboardData(data) {
    return new Promise<boolean>((resolve, reject) => {
      bridge.callHandler("setClipboardData", { data }, (res: boolean) => {
        if (res) resolve(res);
        else reject(res);
      });
    });
  },
  vibrateShort(type) {
    bridge.callHandler("shortShake", { type });
  },
};

export default minip;
