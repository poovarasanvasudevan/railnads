export default function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var colors = [
    "#e74c3c",
    "#27ae60",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#1abc9c",
    "#e67e22",
    "#487eb0",
    "#8c7ae6",
    "#ED4C67",
    "#0652DD",
    "#833471",
    "#3B3B98",
    "#F97F51"
]

export function randomFlatColors() {

    return colors[randomNumber(0, colors.length - 1)]
}
