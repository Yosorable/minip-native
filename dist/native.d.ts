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
interface SetObservableDataConfig {
    key: String;
    initValue?: String;
}
interface NativeMethods {
    closeApp(): Promise<Boolean>;
    showAppDetail(): Promise<Boolean>;
    navigateTo(page: String, title?: String): Promise<Boolean>;
    openWeb(url: String): Promise<Boolean>;
    navigateBack(): void;
    writeFile(filename: String, data: Number[]): Promise<Boolean>;
    readFile(filename: String): Promise<Number[]>;
    listFiles(path: String): Promise<String[]>;
    HUD(type: HUDType, title?: String, subTitle?: String, delay?: Number): Promise<Boolean>;
    alert(config: AlertConfig): Promise<String | null | undefined>;
    shortShake(): void;
    previewImage(url: String): Promise<Boolean>;
    playVideo(url: String): Promise<Boolean>;
    selectPhoto(): Promise<String[]>;
    setMemStore(key: String, val: String): Promise<Boolean>;
    getMemStore(key: String): Promise<String>;
    delMemStore(key: String): Promise<Boolean>;
    setKVStore(key: String, val: String): Promise<Boolean>;
    getKVStore(key: String): Promise<String>;
    delKVStore(key: String): Promise<Boolean>;
    setObservableData(config: SetObservableDataConfig): Promise<String>;
    enableRefreshControl(): Promise<Boolean>;
    disableRefreshControl(): Promise<Boolean>;
    startRefresh(): Promise<Boolean>;
    endRefresh(): Promise<Boolean>;
    getSafeAreaInsets(): Promise<SafeAreaInsets>;
    localAuthentication(): Promise<Boolean>;
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
