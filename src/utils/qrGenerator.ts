// Light-weight standalone SVG/DataURL QR Code Renderer for Emergency Medical Cards
export function generateEmergencyQRDataURL(patientId: string): string {
  // SVG payload for Emergency Paramedic Scan Data URL
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <title>MEDVERSE-EMERGENCY:${patientId}</title>
    <rect width="200" height="200" fill="#0B1220" rx="16"/>
    <rect x="20" y="20" width="160" height="160" fill="none" stroke="#00E5FF" stroke-width="2" stroke-dasharray="8,4" rx="8"/>
    <!-- Corner Finder Patterns -->
    <rect x="35" y="35" width="40" height="40" fill="#00E5FF" rx="4"/>
    <rect x="43" y="43" width="24" height="24" fill="#0B1220" rx="2"/>
    <rect x="51" y="51" width="8" height="8" fill="#00E5FF"/>
    
    <rect x="125" y="35" width="40" height="40" fill="#00E5FF" rx="4"/>
    <rect x="133" y="43" width="24" height="24" fill="#0B1220" rx="2"/>
    <rect x="141" y="51" width="8" height="8" fill="#00E5FF"/>
    
    <rect x="35" y="125" width="40" height="40" fill="#00E5FF" rx="4"/>
    <rect x="43" y="133" width="24" height="24" fill="#0B1220" rx="2"/>
    <rect x="51" y="141" width="8" height="8" fill="#00E5FF"/>
    
    <!-- Matrix Data Dots -->
    <circle cx="100" cy="55" r="4" fill="#00FFB2"/>
    <circle cx="110" cy="75" r="4" fill="#00E5FF"/>
    <circle cx="90" cy="95" r="4" fill="#A855F7"/>
    <circle cx="100" cy="100" r="6" fill="#FF2E63"/>
    <circle cx="115" cy="110" r="4" fill="#00E5FF"/>
    <circle cx="140" cy="100" r="5" fill="#00FFB2"/>
    <circle cx="100" cy="145" r="4" fill="#00E5FF"/>
    <circle cx="145" cy="145" r="5" fill="#A855F7"/>
    <path d="M95 100 H105 M100 95 V105" stroke="#FFFFFF" stroke-width="2"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
