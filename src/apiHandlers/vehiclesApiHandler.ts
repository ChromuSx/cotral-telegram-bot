import { Context } from 'telegraf';
import { handleApiResponse } from '../utils/apiUtils';
import { VehiclePosition } from '../interfaces/VehiclePosition';

export async function getVehicleRealTimePositions(ctx: Context, vehicleCode: string): Promise<void> {
    const apiUrl = `/vehiclerealtimepositions/${vehicleCode}`;
    await handleApiResponse(ctx, apiUrl, formatVehicleRealTimePositions);
}

function formatVehicleRealTimePositions(vehicleData: VehiclePosition): string {
    return [
        `Coordinate X: ${vehicleData.coordX ?? 'Non disponibile'}`,
        `Coordinate Y: ${vehicleData.coordY ?? 'Non disponibile'}`,
        `Ora: ${vehicleData.time ?? 'Non disponibile'}`
    ].join('\n');
}
