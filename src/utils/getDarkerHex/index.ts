export function darkenHex(hex: string, percent: number): string {
    const cleanHex = hex.replace(/^#/, '');

    let r: number = parseInt(cleanHex.substring(0, 2), 16);
    let g: number = parseInt(cleanHex.substring(2, 4), 16);
    let b: number = parseInt(cleanHex.substring(4, 6), 16);

    r = Math.max(0, Math.floor(r * (1 - percent)));
    g = Math.max(0, Math.floor(g * (1 - percent)));
    b = Math.max(0, Math.floor(b * (1 - percent)));

    const toHex = (n: number): string => n.toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}