import { useAddress, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { BLOCKROUTE_ADDRESS, BLOCKROUTE_ABI } from '../config/contracts'

export function useBlockRoute() {
  const address = useAddress()
  const { contract } = useContract(BLOCKROUTE_ADDRESS, BLOCKROUTE_ABI)

  // Read total shipments
  const {
    data: totalShipments,
    isLoading: isLoadingTotal,
    error: totalError
  } = useContractRead(contract, "getTotalShipments")

  // Read shipment details
  const useShipment = (shipmentId: bigint) => {
    // Convert bigint to string to avoid serialization error in react-query
    const id = shipmentId.toString()
    return useContractRead(contract, "getShipment", [id])
  }

  // Create shipment
  const useCreateShipment = () => {
    return useContractWrite(contract, "createShipment")
  }

  // Update shipment status
  const useUpdateShipmentStatus = () => {
    return useContractWrite(contract, "updateShipmentStatus")
  }

  // Get transit history
  const useTransitHistory = (shipmentId: bigint) => {
    // Convert bigint to string to avoid serialization error in react-query
    const id = shipmentId.toString()
    return useContractRead(contract, "getTransitHistory", [id])
  }

  // Update temperature and humidity
  const useUpdateEnvironmentalData = () => {
    return useContractWrite(contract, "updateTemperatureAndHumidity")
  }

  return {
    address,
    totalShipments,
    isLoadingTotal,
    totalError,
    useShipment,
    useCreateShipment,
    useUpdateShipmentStatus,
    useTransitHistory,
    useUpdateEnvironmentalData,
  }
}
