import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap as GoogleMapComponent, LoadScript, Marker, MarkerClusterer, MarkerF, InfoWindow } from '@react-google-maps/api';

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
  categoryDetail: Array<{
    description: string;
    parentCategory: {
      description: string;
    };
  }>
}

const GoogleMap: React.FC<GoogleMapProps> = ({ events, updateBounds }) => {
  const [userLocation, setUserLocation] = useState({ lat: 52.5, lng: -104 });
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

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
  // const anchor = new google.maps.Point(16, 16);
  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    const mapBounds = map.getBounds();
    if (mapBounds) {
      fetchPosts(mapBounds);
      updateBounds(mapBounds);
    }
    // const anchor = new google.maps.Point(16, 16);


  };

  const svgMarker = {
    path: "M14 2C14 0.89543 14.8954 0 16 0C17.1046 0 18 0.89543 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2ZM12.3753 4.21913C12.8006 3.87893 13.4116 3.94479 13.7572 4.34663L13.8321 4.4453L15.535 7H18C18.5128 7 18.9355 7.38604 18.9933 7.88338L19 8C19 8.51284 18.614 8.93551 18.1166 8.99327L18 9H15C14.7074 9 14.4318 8.87206 14.2432 8.65371L14.1679 8.5547L12.772 6.462L9.497 9.082L11.7071 11.2929C11.8634 11.4492 11.9626 11.6519 11.9913 11.8686L12 12V16C12 16.5523 11.5523 17 11 17C10.4872 17 10.0645 16.614 10.0067 16.1166L10 16V12.415L7.29289 9.70711C6.90155 9.31577 6.90675 8.68924 7.28212 8.30363L7.37531 8.21913L12.3753 4.21913ZM4 11C1.79086 11 0 12.7909 0 15C0 17.2091 1.79086 19 4 19C6.20914 19 8 17.2091 8 15C8 12.7909 6.20914 11 4 11ZM4 13C5.10457 13 6 13.8954 6 15C6 16.1046 5.10457 17 4 17C2.89543 17 2 16.1046 2 15C2 13.8954 2.89543 13 4 13ZM18 11C15.7909 11 14 12.7909 14 15C14 17.2091 15.7909 19 18 19C20.2091 19 22 17.2091 22 15C22 12.7909 20.2091 11 18 11ZM18 13C19.1046 13 20 13.8954 20 15C20 16.1046 19.1046 17 18 17C16.8954 17 16 16.1046 16 15C16 13.8954 16.8954 13 18 13Z",
    fillColor: "currentColor",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 1,
    anchor: { x: 16, y: 16 },
    origin: { x: 16, y: 16 },
    labelOrigin: { x: 16, y: 16 },
    strokeColor: "#000000",
    strokeOpacity: 1,
  };

  const handleMarkerClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleInfoWindowClose = () => {
    setSelectedEvent(null);
  };

  function getMarkerIcon(circleColor) {
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer circle -->
        <circle cx="18" cy="18" r="18" fill="${circleColor}" />
        <!-- Your dynamic SVG here -->
        <svg x="6" y="6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63609 4.63647C2.12139 8.15112 2.12129 13.8495 5.63588 17.3643L9.87998 21.6074C11.0516 22.7778 12.9494 22.7778 14.1208 21.6077L18.3641 17.3643C21.8787 13.8495 21.8786 8.15112 18.3639 4.63647C14.8492 1.12183 9.1508 1.12183 5.63609 4.63647ZM16.9497 6.05082C19.6833 8.78443 19.6834 13.2165 16.9499 15.9502L12.7069 20.1932C12.3168 20.5829 11.6842 20.5829 11.2937 20.1929L7.05001 15.9501C4.31654 13.2165 4.31662 8.78443 7.05028 6.05082C9.78394 3.31721 14.216 3.31721 16.9497 6.05082ZM12 6.99988C9.79089 6.99988 8.00003 8.79074 8.00003 10.9999C8.00003 13.209 9.79089 14.9999 12 14.9999C14.2092 14.9999 16 13.209 16 10.9999C16 8.79074 14.2092 6.99988 12 6.99988ZM12 9.00006C13.1045 9.00006 14 9.89549 14 11.0001C14 12.1046 13.1045 13.0001 12 13.0001C10.8954 13.0001 9.99997 12.1046 9.99997 11.0001C9.99997 9.89549 10.8954 9.00006 12 9.00006Z" fill="white"/>
        </svg>
      </svg>`)}`
    };
  }


  const getClusterStyle = () => {
    if (clicked) {
      return `%23000000`; // Black color when clicked
    } else if (hovered) {
      return `%23721931`; // Dark red on hover
    } else {
      return `%23F77E2D`; // Default color
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
        options={{
          styles: [
            {
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "weight": "2.00"
                }
              ]
            },
            {
              "featureType": "all",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#9c9c9c"
                }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                {
                  "color": "#f2f2f2"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                {
                  "saturation": -100
                },
                {
                  "lightness": 45
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#7b7b7b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                {
                  "color": "#46bcec"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#c8d7d4"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#070707"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            }
          ]
        }}
      >
        <Marker position={userLocation}

          onLoad={
            (marker) => {
              marker.setIcon(getMarkerIcon('#F77E2D'));
              google.maps.event.addListener(marker, 'mouseover', function () {
                marker.setIcon(getMarkerIcon('#721931'));
              });
              google.maps.event.addListener(marker, 'mouseout', function () {
                marker.setIcon(getMarkerIcon('#F77E2D'));
              });
              google.maps.event.addListener(marker, 'click', function () {
                marker.setIcon(getMarkerIcon('#000000'));
              })

            }
          }
        />
        <MarkerClusterer
          styles={[
            {
              url: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23F77E2D" /></svg>`,
              height: 40,
              width: 40,
              textColor: 'white',
              textSize: 12,
            },
          ]}
          onLoad={(markerCluster) => {
            let lastClickedCluster: any = null;

            google.maps.event.addListener(markerCluster, 'mouseover', function (c) {
              if (c.clusterIcon.div && c.clusterIcon.div.firstChild) {
                (c.clusterIcon.div.firstChild as HTMLImageElement).src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23721931" /></svg>`;
              }
            });

            google.maps.event.addListener(markerCluster, 'mouseout', function (c) {
              if (c.clusterIcon.div && c.clusterIcon.div.firstChild) {
                (c.clusterIcon.div.firstChild as HTMLImageElement).src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23F77E2D" /></svg>`;
              }
            });

            google.maps.event.addListener(markerCluster, 'click', function (c) {
              if (lastClickedCluster && lastClickedCluster !== c) {
                if (lastClickedCluster.clusterIcon.div && lastClickedCluster.clusterIcon.div.firstChild) {
                  (lastClickedCluster.clusterIcon.div.firstChild as HTMLImageElement).src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23F77E2D" /></svg>`;
                }
              }
              if (c.clusterIcon.div && c.clusterIcon.div.firstChild) {
                (c.clusterIcon.div.firstChild as HTMLImageElement).src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23000000" /></svg>`;
              }
              lastClickedCluster = c;
            });
          }}

        >
          {(clusterer) =>
            events.map((event: Event, index: number) => (
              <Marker
                key={event.location.lat + '' + event.location.lng}
                position={{ lat: event.location.lat, lng: event.location.lng }}
                clusterer={clusterer}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="%23889D1E" />
          ${encodeURIComponent(event?.categoryDetail?.length > 0
                    ? event?.categoryDetail[0]?.parentCategory?.description
                      ? event?.categoryDetail[0]?.parentCategory?.description.replaceAll(
                        'currentColor',
                        'white'
                      ).replaceAll(
                        'height=',
                        'x="8" y="8" height='
                      )
                      : event?.categoryDetail[0]?.description.replaceAll(
                        'currentColor',
                        'white'
                      ).replaceAll(
                        'height=',
                        'x="8" y="8" height='
                      )
                    : '')}
          </svg>`,
                }}
                onClick={() => setSelectedEvent(event)}
                onLoad={(marker) => {

                  if (!marker.get('iconModified')) {
                    const iconElement = marker.getIcon();
                    if (iconElement) {
                      iconElement.url = `data:image/svg+xml;charset=UTF-8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="%23889D1E" />
              ${encodeURIComponent(event?.categoryDetail?.length > 0
                        ? event?.categoryDetail[0]?.parentCategory?.description
                          ? event?.categoryDetail[0]?.parentCategory?.description.replaceAll(
                            'currentColor',
                            'white'
                          ).replaceAll(
                            'height=',
                            'x="8" y="8" height='
                          )
                          : event?.categoryDetail[0]?.description.replaceAll(
                            'currentColor',
                            'white'
                          ).replaceAll(
                            'height=',
                            'x="8" y="8" height='
                          )
                        : '')}
            </svg>`;
                      marker.setIcon(iconElement);
                      marker.set('iconModified', true);
                    }
                  }

                  google.maps.event.addListener(marker, 'mouseover', function () {
                    const iconElement = marker.getIcon();
                    if (iconElement) {
                      iconElement.url = `data:image/svg+xml;charset=UTF-8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="%234B612C" />
            ${encodeURIComponent(event?.categoryDetail?.length > 0
                        ? event?.categoryDetail[0]?.parentCategory?.description
                          ? event?.categoryDetail[0]?.parentCategory?.description.replaceAll(
                            'currentColor',
                            'white'
                          ).replaceAll(
                            'height=',
                            'x="8" y="8" height='
                          )
                          : event?.categoryDetail[0]?.description.replaceAll(
                            'currentColor',
                            'white'
                          ).replaceAll(
                            'height=',
                            'x="8" y="8" height='
                          )
                        : '')}
          </svg>`;
                      marker.setIcon(iconElement);
                    }
                  });

                  google.maps.event.addListener(marker, 'mouseout', function () {
                    const iconElement = marker.getIcon();
                    if (iconElement) {
                      iconElement.url = `data:image/svg+xml;charset=UTF-8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                                          <circle cx="20" cy="20" r="20" fill="%23889D1E" />
                                          ${encodeURIComponent(event?.categoryDetail?.length > 0
                        ? event?.categoryDetail[0]?.parentCategory?.description
                          ? event?.categoryDetail[0]?.parentCategory?.description.replaceAll(
                            'currentColor',
                            'white'
                          ).replaceAll(
                            'height=',
                            'x="8" y="8" height='
                          )
                          : event?.categoryDetail[0]?.description.replaceAll(
                            'currentColor',
                            'white'
                          ).replaceAll(
                            'height=',
                            'x="8" y="8" height='
                          )
                        : '')}
                          </svg>`;
                      marker.setIcon(iconElement);
                    }
                  });
                  google.maps.event.addListener(marker, 'click', function () {
                    setSelectedEvent(event);
                    setInfoWindowOpen(true);
                    const iconElement = marker.getIcon();
                    if (iconElement) {
                      iconElement.url = `data:image/svg+xml;charset=UTF-8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="black" />
          ${encodeURIComponent(event?.categoryDetail?.length > 0
                        ? event?.categoryDetail[0]?.parentCategory?.description
                          ? event?.categoryDetail[0]?.parentCategory?.description.replaceAll(
                            'currentColor',
                            'white'
                          ).replaceAll(
                            'height=',
                            'x="8" y="8" height='
                          )
                          : event?.categoryDetail[0]?.description.replaceAll(
                            'currentColor',
                            'white'
                          ).replaceAll(
                            'height=',
                            'x="8" y="8" height='
                          )
                        : '')}
        </svg>`;
                      marker.setIcon(iconElement);
                    }
                  });
                }}
              />

            ))
          }
        </MarkerClusterer>
          {
            selectedEvent && infoWindowOpen && (
              <InfoWindow
                position={{ lat: selectedEvent.location.lat, lng: selectedEvent.location.lng }}
                onCloseClick={() => { setInfoWindowOpen(false); setSelectedEvent(null); }}
                
              >
                <div className="relative w-full h-32">
                  <img src={selectedEvent.imageUrl ? selectedEvent.imageUrl : 'https://via.placeholder.com/2070x1380'} alt={selectedEvent.title} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute bottom-0 left-0 p-2 bg-transparent w-full">
                    <h3 className="text-lg font-semibold text-white bg-transparent">{selectedEvent.title}</h3>
                  </div>
                </div>
              </InfoWindow>
            )
          }




      </GoogleMapComponent>
    </LoadScript>
  );
};

export default GoogleMap;