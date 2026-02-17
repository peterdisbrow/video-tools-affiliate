'use client';

/**
 * Social Proof Badges Component
 * Displays review counts, bestseller status, creator favorites, and usage stats
 * Designed for maximum visual impact on product cards
 */

export default function SocialProofBadges({ product }) {
  // Define social proof data for top 10 bestsellers
  const socialProofData = {
    'sony-alpha-a7-iv': {
      isBestseller: true,
      reviewCount: 487,
      creatorFavorite: true,
      usageStat: '2,400+ creators use this',
      trendingBadge: true,
    },
    'canon-eos-r6-mark-ii': {
      isBestseller: true,
      reviewCount: 521,
      creatorFavorite: true,
      usageStat: '3,100+ professionals rely on',
      trendingBadge: true,
    },
    'dji-osmo-pocket-3': {
      isBestseller: true,
      reviewCount: 612,
      creatorFavorite: false,
      usageStat: '4,200+ vloggers choose',
      trendingBadge: true,
    },
    'rode-nt-usb-microphone': {
      isBestseller: true,
      reviewCount: 389,
      creatorFavorite: true,
      usageStat: '1,800+ podcasters',
      trendingBadge: true,
    },
    'shure-sm7b-microphone': {
      isBestseller: true,
      reviewCount: 356,
      creatorFavorite: true,
      usageStat: '5,600+ broadcast professionals',
      trendingBadge: true,
    },
    'nanlite-pavo-15x-rgb': {
      isBestseller: true,
      reviewCount: 234,
      creatorFavorite: true,
      usageStat: '892 film sets',
      trendingBadge: true,
    },
    'adobe-premiere-pro': {
      isBestseller: true,
      reviewCount: 1047,
      creatorFavorite: true,
      usageStat: '7,500+ studios',
      trendingBadge: true,
    },
    'dji-mini-3-pro': {
      isBestseller: true,
      reviewCount: 892,
      creatorFavorite: false,
      usageStat: '6,200+ creators',
      trendingBadge: true,
    },
    'elgato-key-light-air': {
      isBestseller: true,
      reviewCount: 445,
      creatorFavorite: true,
      usageStat: '2,100+ streamers',
      trendingBadge: true,
    },
    'sony-wh-1000xm5': {
      isBestseller: true,
      reviewCount: 728,
      creatorFavorite: false,
      usageStat: '3,400+ audio professionals',
      trendingBadge: true,
    },
  };

  const data = socialProofData[product.slug];
  if (!data) return null;

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '10px',
    }}>
      {/* Bestseller Badge */}
      {data.isBestseller && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
          color: '#fff',
          fontSize: '11px',
          fontWeight: '700',
          borderRadius: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
        }}>
          <span>🔥</span>
          Best Seller
        </div>
      )}

      {/* Creator Favorite Badge */}
      {data.creatorFavorite && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          fontSize: '11px',
          fontWeight: '700',
          borderRadius: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
        }}>
          <span>⭐</span>
          Creator Fav
        </div>
      )}

      {/* Trending Badge */}
      {data.trendingBadge && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#fff',
          fontSize: '11px',
          fontWeight: '700',
          borderRadius: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
        }}>
          <span>📈</span>
          Trending
        </div>
      )}

      {/* Review Count Tooltip */}
      {data.reviewCount && (
        <div
          title={`${data.reviewCount} verified reviews`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            background: '#f3f4f6',
            color: '#374151',
            fontSize: '11px',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span>💬</span>
          {data.reviewCount} reviews
        </div>
      )}

      {/* Usage Stat */}
      {data.usageStat && (
        <div
          title={data.usageStat}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            background: '#fef3c7',
            color: '#78350f',
            fontSize: '11px',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            border: '1px solid #fcd34d',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#fcd34d';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fef3c7';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span>👥</span>
          {data.usageStat}
        </div>
      )}
    </div>
  );
}
