---
name: maplibre
description: >
  react-maplibre patterns for map rendering, layers, and controls.
  Trigger: When building map views, layers, or map interactions (Map, Source, Layer, Marker, controls, hooks).
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root, ui]
  auto_invoke: "Working with react-maplibre"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Core Components

```typescript
import Map, { MapProvider, NavigationControl, Marker, Source, Layer } from "react-map-gl/maplibre";

<MapProvider>
  <Map
    initialViewState={{ longitude: -74, latitude: 40.7, zoom: 10 }}
    mapStyle="https://demotiles.maplibre.org/style.json"
  >
    <NavigationControl position="top-right" />
    <Marker longitude={-74} latitude={40.7} />
  </Map>
</MapProvider>
```

## Map State Management

```typescript
import { useState } from "react";
import Map from "react-map-gl/maplibre";

const [viewState, setViewState] = useState({
  longitude: -74,
  latitude: 40.7,
  zoom: 10,
});

<Map
  {...viewState}
  onMove={(event) => setViewState(event.viewState)}
  mapStyle="https://demotiles.maplibre.org/style.json"
/>
```

## Adding Custom Data

```typescript
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-74, 40.7] },
      properties: { name: "HQ" },
    },
  ],
};

<Source id="locations" type="geojson" data={geojson}>
  <Layer
    id="locations-layer"
    type="circle"
    paint={{ "circle-color": "#2563eb", "circle-radius": 6 }}
  />
</Source>
```

## Controls & Hooks

```typescript
import {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  useMap,
  useControl,
} from "react-map-gl/maplibre";

const { current: map } = useMap();

<Map>
  <NavigationControl position="top-right" />
  <FullscreenControl position="top-right" />
  <GeolocateControl position="top-right" />
  <ScaleControl position="bottom-left" />
  <AttributionControl position="bottom-right" />
</Map>
```

## Notes
- Keep map provider configurable for future tile sources.
- Use hooks and controls only in client components.
- Keep map state in local component state or Zustand when shared.
