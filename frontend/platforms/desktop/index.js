const {app, BrowserWindow} = require('electron');


let browserWindow;

const createBrowserWindow = () => {
    browserWindow = new BrowserWindow({
        width: 1200,
        height: 800
    });

    browserWindow.loadFile('../build/index.html');

    browserWindow.on('closed', () => browserWindow = null);
}

app.on('ready', createBrowserWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (browserWindow === null) createBrowserWindow();
});
