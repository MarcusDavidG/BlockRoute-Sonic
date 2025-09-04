import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { MAPBOX_ACCESS_TOKEN, defaultMapConfig, addRouteLayer, createMarkerElement } from '../../config/mapbox'
import { type Location } from '../../config/contracts'
import { MapLoading, MapError, MapNoData } from './MapLoading'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../../styles/map.css'

interface MapProps {
  locations: Location[]
  className?: string
}

export default function Map({ locations, className = '' }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    try {
      // Set the access token
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

      // Calculate center point from all locations
      const centerLat = locations.reduce((sum, loc) => sum + parseFloat(loc.latitude), 0) / locations.length
      const centerLng = locations.reduce((sum, loc) => sum + parseFloat(loc.longitude), 0) / locations.length

      // Create the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        ...defaultMapConfig,
        center: [centerLng, centerLat],
        zoom: locations.length > 1 ? 8 : 12,
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      // Wait for map to load
      map.current.on('load', () => {
        setIsLoading(false)

        if (locations.length === 0) return

        // Create route coordinates
        const coordinates: [number, number][] = locations.map(location => [
          parseFloat(location.longitude),
          parseFloat(location.latitude)
        ])

        // Add route layer
        addRouteLayer(map.current!, coordinates)

        // Add markers for each location
        locations.forEach((location, index) => {
          const markerType = index === 0 ? 'start' : index === locations.length - 1 ? 'end' : 'current'
          const markerElement = createMarkerElement(markerType)

          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([parseFloat(location.longitude), parseFloat(location.latitude)])
            .addTo(map.current!)

          // Add popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="text-sm">
                <h3 class="font-semibold">${location.name}</h3>
                <p class="text-gray-600">${new Date(Number(location.timestamp) * 1000).toLocaleString()}</p>
                <p class="text-xs text-gray-500 mt-1">
                  Lat: ${location.latitude}, Lng: ${location.longitude}
                </p>
                ${index === 0 ? '<p class="text-xs text-green-600 font-medium mt-1">Origin</p>' : ''}
                ${index === locations.length - 1 && locations.length > 1 ? '<p class="text-xs text-red-600 font-medium mt-1">Current Location</p>' : ''}
              </div>
            `)

          marker.setPopup(popup)
        })

        // Fit bounds to show all locations
        if (locations.length > 1) {
          const bounds = new mapboxgl.LngLatBounds()
          locations.forEach(location => {
            bounds.extend([parseFloat(location.longitude), parseFloat(location.latitude)])
          })
          map.current!.fitBounds(bounds, { padding: 50 })
        }
      })

      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e)
        setError('Failed to load map')
        setIsLoading(false)
      })

    } catch (err) {
      console.error('Error initializing map:', err)
      setError('Failed to initialize map')
      setIsLoading(false)
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [locations])

  if (error) {
    return <MapError message={error} />
  }

  if (locations.length === 0) {
    return <MapNoData />
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-full" />
      {isLoading && <MapLoading />}
    </div>
  )
}
