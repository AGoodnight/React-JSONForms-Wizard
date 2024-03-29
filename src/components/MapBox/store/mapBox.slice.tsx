import { FeatureCollection } from "geojson";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MAP_BOX_INITIAL_CONTEXT,
  MAP_BOX_INITIAL_ZOOM,
} from "../constants/mapBox.constants";
import { MapBoxMapLocation, MapBoxState } from "../mapBox.models";
export const mapBoxSlicer = createSlice({
  name: "mapBox",
  initialState: MAP_BOX_INITIAL_CONTEXT,
  reducers: {
    setAddressCoordinates: (
      state: MapBoxState,
      action: PayloadAction<MapBoxMapLocation>
    ) => {
      const mapId = `${action.payload.latitude}_${action.payload.longitude}_${
        action.payload.zoom || MAP_BOX_INITIAL_ZOOM
      }`;
      state.mapId = mapId;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.zoom = action.payload.zoom || MAP_BOX_INITIAL_ZOOM;
    },
    setCurrentMapCoordinates: (
      state: MapBoxState,
      action: PayloadAction<MapBoxMapLocation>
    ) => {
      state.cLat = action.payload.latitude;
      state.cLong = action.payload.longitude;
      state.cZoom = action.payload.zoom || MAP_BOX_INITIAL_ZOOM;
      return state;
    },
    setAllCoordinates: (
      state: MapBoxState,
      action: PayloadAction<MapBoxMapLocation>
    ) => {
      state.cLat = action.payload.latitude;
      state.cLong = action.payload.longitude;
      state.cZoom = action.payload.zoom || MAP_BOX_INITIAL_ZOOM;
      if (state.mapId) {
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.zoom = action.payload.zoom || MAP_BOX_INITIAL_ZOOM;
      }
    },
    syncCoordinates: (state: MapBoxState) => {
      if (state.mapId) {
        state.cLat = state.latitude;
        state.cLong = state.longitude;
        state.cZoom = state.zoom;
      }
    },
    updateFeatures: (
      state: MapBoxState,
      action: PayloadAction<FeatureCollection>
    ) => {
      if (state.mapId) {
        state.features = action.payload;
      }
      state.status = "syncingFeatures";
    },

    initialize: (state: MapBoxState) => {
      state.status = "ready";
    },
    reset: (state: MapBoxState) => {
      state.status = "uninitialized";
    },
  },
});

export const {
  setAddressCoordinates,
  setCurrentMapCoordinates,
  setAllCoordinates,
  updateFeatures,
  initialize,
  reset,
} = mapBoxSlicer.actions;

export default mapBoxSlicer.reducer;
