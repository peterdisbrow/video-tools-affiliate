'use client';

export default function SocialProofBadges({ product }) {
  const socialProofData = {
    'sony-alpha-a7-iv': { isBestseller: true, reviewCount: 487, creatorFavorite: true, usageStat: '2,400+ creators use this', trendingBadge: true },
    'canon-eos-r6-mark-ii': { isBestseller: true, reviewCount: 521, creatorFavorite: true, usageStat: '3,100+ professionals rely on', trendingBadge: true },
    'dji-osmo-pocket-3': { isBestseller: true, reviewCount: 612, creatorFavorite: false, usageStat: '4,200+ vloggers choose', trendingBadge: true },
    'rode-nt-usb-microphone': { isBestseller: true, reviewCount: 389, creatorFavorite: true, usageStat: '1,800+ podcasters', trendingBadge: true },
    'shure-sm7b-microphone': { isBestseller: true, reviewCount: 356, creatorFavorite: true, usageStat: '5,600+ broadcast professionals', trendingBadge: true },
    'nanlite-pavo-15x-rgb': { isBestseller: true, reviewCount: 234, creatorFavorite: true, usageStat: '892 film sets', trendingBadge: true },
    'adobe-premiere-pro': { isBestseller: true, reviewCount: 1047, creatorFavorite: true, usageStat: '7,500+ studios', trendingBadge: true },
    'dji-mini-3-pro': { isBestseller: true, reviewCount: 892, creatorFavorite: false, usageStat: '6,200+ creators', trendingBadge: true },
    'elgato-key-light-air': { isBestseller: true, reviewCount: 445, creatorFavorite: true, usageStat: '2,100+ streamers', trendingBadge: true },
    'sony-wh-1000xm5': { isBestseller: true, reviewCount: 728, creatorFavorite: false, usageStat: '3,400+ audio professionals', trendingBadge: true },
  };

  const data = socialProofData[product.slug];
  if (!data) return null;

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    borderRadius: '12px',
    letterSpacing: '0.3px',
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
      {data.isBestseller && (
        <div style={{ ...badgeStyle, background: '#DBEAFE', color: '#1E40AF', fontWeight: '700', textTransform: 'uppercase' }}>
          <span>🔥</span> Best Seller
        </div>
      )}
      {data.creatorFavorite && (
        <div style={{ ...badgeStyle, background: '#EFF6FF', color: '#E84C3D', fontWeight: '700', textTransform: 'uppercase' }}>
          <span>⭐</span> Creator Fav
        </div>
      )}
      {data.trendingBadge && (
        <div style={{ ...badgeStyle, background: '#F0FDF4', color: '#166534', fontWeight: '700', textTransform: 'uppercase' }}>
          <span>📈</span> Trending
        </div>
      )}
      {data.reviewCount && (
        <div title={`${data.reviewCount} verified reviews`} style={{ ...badgeStyle, background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' }}>
          <span>💬</span> {data.reviewCount} reviews
        </div>
      )}
      {data.usageStat && (
        <div style={{ ...badgeStyle, background: '#F8F9FA', color: '#374151', border: '1px solid #E5E7EB' }}>
          <span>👥</span> {data.usageStat}
        </div>
      )}
    </div>
  );
}
