export interface Pole {
    codicePalina?: string;
    codiceStop?: string | number;
    nomePalina?: string;
    nomeStop?: string;
    localita?: string;
    comune?: string;
    coordX?: number;
    coordY?: number;
    mapLink?: string;
    zonaTariffaria?: string;
    distanza?: string;
    destinazioni?: string[];
    isCotral?: number;
    isCapolinea?: number;
    isBanchinato?: number;
    preferita?: boolean;
}
