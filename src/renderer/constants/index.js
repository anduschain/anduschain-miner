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

export {
    COLOR, UNIT
}
