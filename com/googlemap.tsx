import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap as GoogleMapComponent, LoadScript, Marker } from '@react-google-maps/api';

interface Post {
  lat: number;
  lng: number;
}

interface GoogleMapProps {
    events: any;
    updateBounds: (newBounds: google.maps.LatLngBounds) => void;
}

interface Event {
  location: {
    lat: number;
    lng: number;
  };
}

const GoogleMap: React.FC<GoogleMapProps> = ({ events, updateBounds }) => {
  const [userLocation, setUserLocation] = useState({ lat: 52.5, lng: -104 });
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  const fetchPosts = useCallback(async (bounds: google.maps.LatLngBounds) => {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

  }, []);

  const onBoundsChanged = () => {
    if (mapRef.current) {
      const mapBounds = mapRef.current.getBounds();
      if (mapBounds) {
        fetchPosts(mapBounds);
        updateBounds(mapBounds);
      }
    }
  };

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    const mapBounds = map.getBounds();
    if (mapBounds) {
      fetchPosts(mapBounds);
      updateBounds(mapBounds);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBXV0elgfYX_C0zJCVkrHpQXLQdxIa5t_0">
      <GoogleMapComponent
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={userLocation}
        zoom={10}
        onLoad={onLoad}
        onBoundsChanged={onBoundsChanged}
      >
        <Marker position={userLocation} />
        {events &&events.length > 0 && events.map((event: Event, index: number) => (
          <Marker key={index} position={{ lat: event.location.lat, lng: event.location.lng }} />
        ))}
      </GoogleMapComponent>
    </LoadScript>
  );
};

export default GoogleMap;