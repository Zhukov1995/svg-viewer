export function generateRandomHash(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function interpolateColor(color, percentage) {
    // Преобразуем hex в RGB
    const hexToRgb = hex => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    };

    // Преобразуем RGB в hex
    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };

    const [r1, g1, b1] = hexToRgb('#ffffff');
    const [r2, g2, b2] = hexToRgb(color);

    const r = Math.round(r1 + (r2 - r1) * (percentage / 100));
    const g = Math.round(g1 + (g2 - g1) * (percentage / 100));
    const b = Math.round(b1 + (b2 - b1) * (percentage / 100));

    return rgbToHex(r, g, b);
}