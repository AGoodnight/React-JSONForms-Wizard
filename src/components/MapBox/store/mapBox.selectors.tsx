import { MAP_BOX_INITIAL_ZOOM } from "../constants/mapBox.constants";
import { MapBoxMapLocation, MapBoxState } from "../mapBox.models";

export const selectSavedCoordinates = (
  state: MapBoxState,
  mapId: string
): MapBoxMapLocation => {
  return {
    longitude: state.maps[mapId].longitude,
    latitude: state.maps[mapId].latitude,
    zoom: state.maps[mapId].zoom,
  };
};

export const selectCurrentCoordinates = (
  state: MapBoxState
): MapBoxMapLocation => {
  return {
    longitude: state.cLong,
    latitude: state.cLat,
    zoom: state.cZoom || MAP_BOX_INITIAL_ZOOM,
  };
};

export const selectFeatures = (state: MapBoxState, mapId: string) =>
  state.maps[mapId].features;
export const selectStatus = (state: MapBoxState) => state.status;
