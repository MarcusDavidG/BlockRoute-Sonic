import { FEE_M_INFO } from '../../config/feem'

export function FeeMBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-500 text-xs font-bold">F</span>
          </div>
          <span className="text-sm font-medium">FeeM Enabled</span>
        </div>
        <p className="text-xs mt-1 opacity-90">{FEE_M_INFO}</p>
      </div>
    </div>
  )
}
