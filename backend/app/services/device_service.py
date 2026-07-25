from datetime import datetime
from typing import List, Dict, Any

class DeviceService:
    @staticmethod
    def parse_device_info(user_agent: str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0", ip: str = "192.168.1.100") -> Dict[str, Any]:
        browser = "Chrome 126.0"
        os_info = "Windows 11 Enterprise"
        if "Macintosh" in user_agent:
            os_info = "macOS Sonoma"
        elif "iPhone" in user_agent or "iPad" in user_agent:
            os_info = "iOS 17.5"
            browser = "Mobile Safari"
        elif "Android" in user_agent:
            os_info = "Android 14"
            browser = "Chrome Mobile"

        return {
            "device_id": f"dev-{hash(user_agent + ip) % 899999 + 100000}",
            "device_name": f"{os_info} ({browser})",
            "browser": browser,
            "os": os_info,
            "location": "San Francisco, CA (USA)",
            "ip_address": ip,
            "last_active": "Just now",
            "is_current": True,
            "created_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        }

device_service = DeviceService()
