// Related product pairings — keyed by product name (or partial match)
// Each entry: array of { name, url } objects

const TAG = 'disbrowproduc-20';
const amz = (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

export const RELATED_PRODUCTS = {
  'Sony Alpha a7 IV': [
    { name: 'Sony 24-70mm f/2.8 GM II', url: amz('Sony FE 24-70mm f2.8 GM II') },
    { name: 'DJI RS 3 Gimbal', url: amz('DJI RS 3 Gimbal') },
  ],
  'Sony FX30': [
    { name: 'DJI RS 4 Pro', url: amz('DJI RS 4 Pro gimbal') },
    { name: 'Rode Wireless GO II', url: amz('Rode Wireless GO II') },
  ],
  'Sony a6700': [
    { name: 'Sigma 18-35mm f/1.8', url: amz('Sigma 18-35mm f1.8 Art') },
    { name: 'Rode Wireless GO II', url: amz('Rode Wireless GO II') },
  ],
  'Canon EOS R6 Mark II': [
    { name: 'Canon RF 24-70mm f/2.8', url: amz('Canon RF 24-70mm f2.8 L') },
    { name: 'DJI RS 3 Gimbal', url: amz('DJI RS 3 Gimbal') },
  ],
  'Canon EOS R8': [
    { name: 'Canon RF 50mm f/1.8', url: amz('Canon RF 50mm f1.8 STM') },
    { name: 'Amaran 60d S', url: amz('Amaran 60d S LED') },
  ],
  'Shure SM7B Microphone': [
    { name: 'Focusrite Scarlett 2i2', url: amz('Focusrite Scarlett 2i2 4th Gen') },
    { name: 'Rode PSA1+ Boom Arm', url: amz('Rode PSA1+ boom arm') },
  ],
  'Rode Wireless GO II': [
    { name: 'Rode Lavalier GO', url: amz('Rode Lavalier GO') },
    { name: 'Sony FX30', url: amz('Sony FX30') },
  ],
  'Audio-Technica AT2020': [
    { name: 'Focusrite Scarlett Solo', url: amz('Focusrite Scarlett Solo 4th Gen') },
    { name: 'Boom Arm Stand', url: amz('microphone boom arm stand') },
  ],
  'Rode NT-USB+ Microphone': [
    { name: 'Rode PSA1+ Boom Arm', url: amz('Rode PSA1+ boom arm') },
    { name: 'Acoustic Foam Panels', url: amz('acoustic foam panels studio') },
  ],
  'Amaran 60d S': [
    { name: 'Large Softbox', url: amz('Aputure Light Dome softbox') },
    { name: 'Manfrotto Light Stand', url: amz('Manfrotto light stand') },
  ],
  'Aputure Amaran 200d': [
    { name: 'Aputure Light Dome III', url: amz('Aputure Light Dome III') },
    { name: 'Manfrotto Light Stand', url: amz('Manfrotto light stand') },
  ],
  'Aputure LS 300X': [
    { name: 'Aputure Light Dome III', url: amz('Aputure Light Dome III') },
    { name: 'V-Mount Battery', url: amz('V-Mount battery 150Wh') },
  ],
  'DJI RS 3 Gimbal': [
    { name: 'Sony a6700', url: amz('Sony a6700') },
    { name: 'SmallRig Quick Release Plate', url: amz('SmallRig quick release plate') },
  ],
  'DJI RS 4 Pro': [
    { name: 'Sony FX30', url: amz('Sony FX30') },
    { name: 'SmallRig Quick Release Plate', url: amz('SmallRig quick release plate') },
  ],
  'Elgato Stream Deck': [
    { name: 'Bitfocus Companion (Free)', url: 'https://bitfocus.io/companion' },
    { name: 'ATEM Mini Pro', url: amz('ATEM Mini Pro') },
  ],
  'Focusrite Scarlett 2i2 (4th Gen)': [
    { name: 'Shure SM7B', url: amz('Shure SM7B') },
    { name: 'Rode PSA1+ Boom Arm', url: amz('Rode PSA1+ boom arm') },
  ],
  'Logitech C920 Webcam': [
    { name: 'Elgato Key Light', url: amz('Elgato Key Light') },
    { name: 'Elgato Stream Deck', url: amz('Elgato Stream Deck MK.2') },
  ],
  'Aputure MC': [
    { name: 'Aputure MC 4-Light Kit', url: amz('Aputure MC 4-light travel kit') },
    { name: 'MagSafe Mount', url: amz('magnetic light mount') },
  ],
  'Atomos Ninja V+': [
    { name: 'Samsung T7 SSD', url: amz('Samsung T7 1TB SSD') },
    { name: 'V-Mount Battery Plate', url: amz('Atomos V-Mount battery plate') },
  ],
  'Sennheiser MKE 600': [
    { name: 'K-Tek Boom Pole', url: amz('K-Tek KP10 boom pole') },
    { name: 'Rycote Windshield', url: amz('Rycote windshield shotgun') },
  ],
};

export function getRelatedForProduct(productName) {
  // Exact match first
  if (RELATED_PRODUCTS[productName]) return RELATED_PRODUCTS[productName];
  // Partial match
  const key = Object.keys(RELATED_PRODUCTS).find(k =>
    productName.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(productName.toLowerCase())
  );
  return key ? RELATED_PRODUCTS[key] : [];
}
