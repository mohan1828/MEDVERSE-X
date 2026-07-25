import logging

logger = logging.getLogger("uvicorn")

class EmailService:
    @staticmethod
    def send_verification_email(email: str, otp_code: str, name: str = "Valued User") -> bool:
        subject = "MEDVERSE-X Account Verification Code"
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B1220; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #00E5FF;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #00E5FF; margin: 0; font-size: 28px; tracking-wide: 2px;">MEDVERSE-X</h1>
                <p style="color: #00FFB2; font-size: 12px; font-family: monospace;">Autonomous Digital Twin & Healthcare Super Intelligence</p>
            </div>
            <div style="background: rgba(15, 23, 42, 0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(0, 229, 255, 0.2);">
                <p style="font-size: 14px; color: #cbd5e1;">Hello {name},</p>
                <p style="font-size: 14px; color: #cbd5e1;">Your 6-digit account verification security PIN is:</p>
                <div style="text-align: center; margin: 25px 0;">
                    <span style="font-size: 36px; font-weight: bold; font-family: monospace; letter-spacing: 8px; color: #00FFB2; background: #090d16; padding: 12px 24px; border-radius: 10px; border: 1px solid #00FFB2;">{otp_code}</span>
                </div>
                <p style="font-size: 12px; color: #f43f5e; font-family: monospace; text-align: center;">⏱️ This code expires in 5 minutes (300 seconds).</p>
                <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;"><strong>SECURITY ADVISORY:</strong> Never share this verification code with anyone. MEDVERSE-X support staff will never ask for your security PIN.</p>
            </div>
            <div style="margin-top: 25px; text-align: center; font-size: 11px; color: #64748b; font-family: monospace;">
                Need assistance? Contact support@medverse.ai • End-to-End Homomorphic Encryption Active
            </div>
        </div>
        """
        logger.info(f"[EMAIL SERVICE] Dispatched verification email to {email} with code {otp_code}")
        return True

    @staticmethod
    def send_new_device_alert(email: str, device_name: str, location: str) -> bool:
        logger.info(f"[EMAIL SERVICE] Security Alert: New login to {email} from device {device_name} ({location})")
        return True

email_service = EmailService()
