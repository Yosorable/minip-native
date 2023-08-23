type HUDType = "success" | "error" | "progress" | "label";
interface NativeMethods {
    closeApp(): Promise<Boolean>;
    navigateTo(page: String, title?: String): Promise<Boolean>;
    writeFile(filename: String, data: Number[]): Promise<Boolean>;
    readFile(filename: String): Promise<Number[]>;
    listFiles(path: String): Promise<String[]>;
    HUD(type: HUDType, title?: String, subTitle?: String, delay?: Number): Promise<Boolean>;
    previewImage(url: String): Promise<Boolean>;
    setMemStore(key: String, val: String): Promise<Boolean>;
    getMemStore(key: String): Promise<String>;
    delMemStore(key: String): Promise<Boolean>;
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
