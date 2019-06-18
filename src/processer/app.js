import {BrowserWindow, app} from "electron";
import SetMenu from "./menu";
import isDev from "electron-is-dev";

class App {
    constructor() {
        this.windows = null
    }

    get getWindows() {
        return this.windows;
    }

    Create = () => {
        this.windows = new BrowserWindow({
            width: 900,
            height: 600,
            webPreferences: {
                nodeIntegration : true,
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
            resizable: false,
            icon : `${app.getAppPath()}/.webpack/renderer/main_window/icon.icns`,
        });

        // setting menu
        SetMenu();

        // Emitted when the window is closed.
        this.windows.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.windows = null;
        });

        this.windows.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

        // Open the DevTools.
        if (isDev) this.windows.webContents.openDevTools();
    };
}

export default new App();
