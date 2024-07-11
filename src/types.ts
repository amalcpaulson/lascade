export interface Coordinates {
  lat: number;
  lng: number;
}
export interface Point {
  lat: number;
  long: number;
  address: string;
}
export interface IntermediatePoint {
  lat: number;
  long: number;
  address: string;
}


export interface RouteupdateProps {
  closeRouteUpdate: () => void;
  startAddress: string;
  endAddress: string;
  intermediatePoints: IntermediatePoint[];
  addIntermediatePoint: (point: IntermediatePoint) => void;
}

export interface RouteSettingsProps {
  step: string;
  setStep: (step: string) => void;
  clearData: () => void;
  startAddress: string;
  endAddress: string;
  intermediatePoints: IntermediatePoint[];
  setIntermediatePoints: React.Dispatch<
    React.SetStateAction<IntermediatePoint[]>
  >;
}