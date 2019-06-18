import isDev from "electron-is-dev";

const COLOR = {
    black : "#000000",
    darkGray : "#191b1f",
    blue : "#0074e2",
    gray : "#484b58",
    white : "#ffffff",
};

const UNIT = (value) => {
    if (value <= 0) {
        return `0 Daon`;
    }
    return `${value / Math.pow(10, 18)} Daon`;
};

const Images = {
    start : isDev ? require('../../resources/images/icon-start@3x.png') : `${__dirname}/images/icon-start@3x.png`,
    stop : isDev ? require('../../resources/images/icon-stop@3x.png') :  `${__dirname}/images/icon-stop@3x.png`,
    logo : isDev ? require('../../resources/icon.png') :  `${__dirname}/icon.png`,
};

export {
    COLOR, UNIT, Images
}
