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
    key: string;
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
    closeApp(): Promise<boolean>;
    showAppDetail(): Promise<boolean>;
    navigateTo(page: string, title?: string): Promise<boolean>;
    openWeb(url: string): Promise<boolean>;
    navigateBack(): void;
    writeFile(filename: string, data: number[]): Promise<boolean>;
    readFile(filename: string): Promise<number[]>;
    listFiles(path: string): Promise<string[]>;
    HUD(type: HUDType, title?: string, subTitle?: string, delay?: number): Promise<boolean>;
    alert(config: AlertConfig): Promise<string | null | undefined>;
    shortShake(): void;
    previewImage(url: string): Promise<boolean>;
    playVideo(url: string): Promise<boolean>;
    selectPhoto(): Promise<string[]>;
    setMemStore(key: string, val: string): Promise<boolean>;
    getMemStore(key: string): Promise<string>;
    delMemStore(key: string): Promise<boolean>;
    setKVStore(key: string, val: string): Promise<boolean>;
    getKVStore(key: string): Promise<string>;
    delKVStore(key: string): Promise<boolean>;
    setObservableData(config: SetObservableDataConfig): Promise<string>;
    enableRefreshControl(): Promise<boolean>;
    disableRefreshControl(): Promise<boolean>;
    startRefresh(): Promise<boolean>;
    endRefresh(): Promise<boolean>;
    getSafeAreaInsets(): Promise<SafeAreaInsets>;
    localAuthentication(): Promise<boolean>;
}
declare interface Window {
    MinipNative: NativeMethods;
    InitMinipNative: (devServerApiUrl: string | undefined) => Promise<void>;
    WKWebViewJavascriptBridge: any;
    WKWVJBCallbacks: any;
    webkit: any;
}
interface Bridge {
    callHandler(methodName: string, data?: any, callback?: any): void;
}
