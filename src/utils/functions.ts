export function convertAndValidateCoords(coordX: string, coordY: string): { latitude: number, longitude: number } | null {
    const latitude = parseFloat(coordX);
    const longitude = parseFloat(coordY);
    if (!isNaN(latitude) && !isNaN(longitude)) {
        return { latitude, longitude };
    }
    return null;
}