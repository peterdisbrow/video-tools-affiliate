'use client';

/**
 * Urgency Signals Component
 * Displays price trends, inventory status, and update freshness
 * Designed to increase conversion by adding trust + scarcity
 */

export default function UrgencySignals({ product }) {
  // Define urgency data for all products
  const urgencyData = {
    'sony-alpha-a7-iv': {
      priceChange: -50,
      priceChangeMonth: 'this month',
      inventoryStatus: 'In Stock',
      inventoryCount: 12,
      lastUpdated: 'Today',
    },
    'canon-eos-r6-mark-ii': {
      priceChange: -75,
      priceChangeMonth: 'this month',
      inventoryStatus: 'Limited Stock',
      inventoryCount: 3,
      lastUpdated: 'Today',
    },
    'dji-osmo-pocket-3': {
      priceChange: -30,
      priceChangeMonth: 'last week',
      inventoryStatus: 'In Stock',
      inventoryCount: 18,
      lastUpdated: 'Yesterday',
    },
    'rode-nt-usb-microphone': {
      priceChange: 0,
      priceChangeMonth: 'stable',
      inventoryStatus: 'In Stock',
      inventoryCount: 25,
      lastUpdated: 'Today',
    },
    'shure-sm7b-microphone': {
      priceChange: -25,
      priceChangeMonth: 'last week',
      inventoryStatus: 'Limited Stock',
      inventoryCount: 5,
      lastUpdated: 'Yesterday',
    },
    'nanlite-pavo-15x-rgb': {
      priceChange: -45,
      priceChangeMonth: 'this month',
      inventoryStatus: 'In Stock',
      inventoryCount: 8,
      lastUpdated: 'Today',
    },
    'adobe-premiere-pro': {
      priceChange: 0,
      priceChangeMonth: 'stable',
      inventoryStatus: 'In Stock',
      inventoryCount: 999,
      lastUpdated: 'Today',
    },
    'dji-mini-3-pro': {
      priceChange: -60,
      priceChangeMonth: 'this month',
      inventoryStatus: 'In Stock',
      inventoryCount: 14,
      lastUpdated: 'Today',
    },
    'elgato-key-light-air': {
      priceChange: -20,
      priceChangeMonth: 'this month',
      inventoryStatus: 'Limited Stock',
      inventoryCount: 4,
      lastUpdated: 'Today',
    },
    'sony-wh-1000xm5': {
      priceChange: -40,
      priceChangeMonth: 'last week',
      inventoryStatus: 'In Stock',
      inventoryCount: 22,
      lastUpdated: 'Yesterday',
    },
  };

  const data = urgencyData[product.slug];
  if (!data) return null;

  const isLowStock = data.inventoryCount > 0 && data.inventoryCount <= 5;
  const isPriceDown = data.priceChange < 0;
  const isRecent = data.lastUpdated === 'Today';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '10px',
      background: '#f8fafc',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
    }}>
      {/* Price Trend */}
      {isPriceDown && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: '#059669',
          fontWeight: '600',
        }}>
          <span>📉</span>
          Price down ${Math.abs(data.priceChange)} {data.priceChangeMonth}
        </div>
      )}

      {/* Inventory Alert */}
      {isLowStock && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: '#dc2626',
          fontWeight: '700',
          padding: '6px 8px',
          background: '#fee2e2',
          borderRadius: '4px',
        }}>
          <span>⚠️</span>
          Only {data.inventoryCount} left in stock
        </div>
      )}

      {/* Updated Badge */}
      {isRecent && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: '#0ea5e9',
          fontWeight: '600',
          padding: '4px 8px',
          background: '#e0f2fe',
          borderRadius: '4px',
          width: 'fit-content',
        }}>
          <span>✨</span>
          Updated {data.lastUpdated}
        </div>
      )}
    </div>
  );
}
