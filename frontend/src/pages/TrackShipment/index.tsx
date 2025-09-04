import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlockRoute } from '../../hooks/useBlockRoute'
import { ShipmentStatus, type Location } from '../../config/contracts'
import Map from '../../components/shared/Map'

export default function TrackShipment() {
  const { shipmentId } = useParams<{ shipmentId: string }>()
  const navigate = useNavigate()
  const [inputShipmentId, setInputShipmentId] = useState('')
  const { useShipment, useTransitHistory } = useBlockRoute()

  // Always call hooks unconditionally
  const shipment = useShipment(shipmentId ? BigInt(shipmentId) : BigInt(0))
  const transitHistory = useTransitHistory(shipmentId ? BigInt(shipmentId) : BigInt(0))

  const handleTrackShipment = () => {
    if (inputShipmentId.trim()) {
      navigate(`/track/${inputShipmentId.trim()}`)
    }
  }

  if (!shipmentId) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Track Shipment</h1>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Enter Shipment ID</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={inputShipmentId}
                onChange={(e) => setInputShipmentId(e.target.value)}
                placeholder="Enter shipment ID (e.g., 1, 2, 3...)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={handleTrackShipment}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Track Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (shipment.isLoading || transitHistory.isLoading) {
    return <div>Loading...</div>
  }

  if (shipment.error || transitHistory.error) {
    return <div>Error loading shipment data</div>
  }

  if (!shipment.data) {
    return <div>Shipment not found</div>
  }

  // Fix: Convert BigInt to string for react-query serialization in transit history
  const transitHistoryData = transitHistory.data?.map((location: Location) => ({
    ...location,
    timestamp: location.timestamp.toString(),
  })) || []

  // Fix: Convert BigInt to string for react-query serialization in shipment data
  const shipmentData = {
    ...shipment.data,
    id: shipment.data.id.toString(),
    estimatedDeliveryDate: shipment.data.estimatedDeliveryDate.toString(),
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Track Shipment</h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{shipmentData.productName}</h2>
          <p className="mb-2">Description: {shipmentData.description}</p>
          <p className="mb-2">Status: {ShipmentStatus[shipmentData.status]}</p>
          <p className="mb-2">Estimated Delivery Date: {new Date(Number(shipmentData.estimatedDeliveryDate) * 1000).toLocaleDateString()}</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Transit History</h3>
          {transitHistoryData.length > 0 ? (
            <>
              <ul className="list-disc list-inside mb-6">
                {transitHistoryData.map((location: Location, index: number) => (
                  <li key={index}>
                    {location.name} - {new Date(Number(location.timestamp) * 1000).toLocaleString()}
                  </li>
                ))}
              </ul>
              {/* Map component to display shipment tracking */}
              <div className="h-96 rounded-lg overflow-hidden">
                <Map locations={transitHistoryData} />
              </div>
            </>
          ) : (
            <p>No transit history available</p>
          )}
        </div>
      </div>
    </div>
  )
}
