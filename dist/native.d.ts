type HUDType = "success" | "error" | "progress" | "label";
interface SafeAreaInsets {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
interface AlertAction {
    title?: String;
    style?: "cancel" | "destructive";
    key: String;
}
interface AlertConfig {
    title?: String;
    message?: String;
    preferredStyle?: "alert" | "actionSheet";
    actions: AlertAction[];
}
interface NativeMethods {
    closeApp(): Promise<Boolean>;
    showAppDetail(): Promise<Boolean>;
    navigateTo(page: String, title?: String): Promise<Boolean>;
    openWeb(url: String): Promise<Boolean>;
    playVideo(url: String): Promise<Boolean>;
    writeFile(filename: String, data: Number[]): Promise<Boolean>;
    readFile(filename: String): Promise<Number[]>;
    listFiles(path: String): Promise<String[]>;
    HUD(type: HUDType, title?: String, subTitle?: String, delay?: Number): Promise<Boolean>;
    alert(config: AlertConfig): Promise<String | null | undefined>;
    shortShake(): void;
    previewImage(url: String): Promise<Boolean>;
    setMemStore(key: String, val: String): Promise<Boolean>;
    getMemStore(key: String): Promise<String>;
    delMemStore(key: String): Promise<Boolean>;
    setKVStore(key: String, val: String): Promise<Boolean>;
    getKVStore(key: String): Promise<String>;
    delKVStore(key: String): Promise<Boolean>;
    enableRefreshControl(): Promise<Boolean>;
    disableRefreshControl(): Promise<Boolean>;
    startRefresh(): Promise<Boolean>;
    endRefresh(): Promise<Boolean>;
    getSafeAreaInsets(): Promise<SafeAreaInsets>;
    selectPhoto(): Promise<String[]>;
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
