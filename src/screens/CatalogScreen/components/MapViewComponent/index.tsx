import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, View } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import styles from "./styles";
import { AuthContext } from "@/src/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { getDistanceRadiusForKm } from "@/src/utils/getDistanceRadiusForKm";
import {
  collection,
  GeoPoint,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { StoresItemPicker } from "../HeaderCatalog";
import {
  setIsLoading,
  setListStore,
  setShowMapSearchStores,
  setStoreSelected,
} from "@/src/redux/storeSlice";
import { StoresModel } from "@/src/models/StoresModel";
import { RootState } from "@/src/redux/store";

type MapViewComponentProps = {
  location: GeoPoint;
};
const MapViewComponent: React.FC<MapViewComponentProps> = ({ location }) => {
  const [currentRadius] = useState(new Animated.Value(0));
  const [loadStores, setLoadStores] = useState(false);
  const [storesFound, setStoresFound] = useState<
    Pick<StoresModel, "id" | "location" | "name" | "openNow">[]
  >([]);
  const [radius, setRadius] = useState(0);

  const { listStore } = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    Animated.timing(currentRadius, {
      toValue: 10000,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  }, []);

  const fetchStores = useCallback(
    async (
      coords: Location.LocationObjectCoords | GeoPoint,
      radius: number
    ) => {
      const radiusInDegrees = radius / 111;

      const storesRef = collection(db, "stores");

      const queryStores = query(
        storesRef,
        where(
          "location",
          ">=",
          new GeoPoint(
            coords.latitude - radiusInDegrees,
            coords.longitude - radiusInDegrees
          )
        ),
        where(
          "location",
          "<=",
          new GeoPoint(
            coords.latitude + radiusInDegrees,
            coords.longitude + radiusInDegrees
          )
        )
      );

      const snapshotData = await getDocs(queryStores);

      const listUniqueStore = new Set(storesFound);

      snapshotData.forEach((doc) => {
        const storeData = doc.data();
        const storeLocation = storeData.location;

        const distance = getDistanceRadiusForKm(
          coords.latitude,
          coords.longitude,
          storeLocation.latitude,
          storeLocation.longitude
        );

        if (distance <= radius) {
          listUniqueStore.add({
            id: doc.id,
            name: storeData.name,
            location: storeData.location,
            openNow: storeData.openNow,
          });
        }
      });
      setStoresFound(Array.from(listUniqueStore));
    },
    []
  );

  useEffect(() => {
    if (loadStores) {
      const stores: StoresItemPicker[] = storesFound.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      dispatch(setListStore(stores));
      dispatch(setStoreSelected(stores[0].value));
      setShowMapSearchStores(false);
    }
  }, [loadStores]);

  useEffect(() => {
    if (location) {
      const intervalId = setInterval(() => {
        setRadius((prevRadius) => {
          const newRadius = prevRadius + 5000;
          if (newRadius <= 32000) {
            fetchStores(location, newRadius / 1000);
          } else {
            clearInterval(intervalId);
            setLoadStores(true);
            setShowMapSearchStores(false);
          }
          return newRadius;
        });
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [location, fetchStores]);

  useEffect(() => {
    if (mapRef.current) {
      const deltaLat = radius / 111320;
      const deltaLng =
        radius / (111320 * Math.cos((location.latitude * Math.PI) / 180));

      mapRef.current.fitToCoordinates(
        [
          {
            latitude: location.latitude + deltaLat,
            longitude: location.longitude + deltaLng,
          },
          {
            latitude: location.latitude - deltaLat,
            longitude: location.longitude - deltaLng,
          },
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [radius, location]);

  return (
    <MapView
      ref={mapRef}
      style={styles.containerMap}
      showsUserLocation={true}
      initialRegion={{
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {storesFound.map((store, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: store.location.latitude,
            longitude: store.location.longitude,
          }}
          title={store.name}
          description={store.openNow ? "Aberto agora!" : "Fechado!"}
        />
      ))}

      <Circle
        center={{
          latitude: location?.latitude!,
          longitude: location?.longitude!,
        }}
        radius={radius}
        fillColor="rgba(0, 0, 255, 0.3)"
        strokeColor="rgba(0, 0, 255, 1)"
        strokeWidth={2}
      />
    </MapView>
  );
};

export default MapViewComponent;
