import { useState } from 'react';
import { Icons } from './Icons';
import { Modal } from './Modal';
import { createStyles } from '../utils/theme';

export function CollectionVerifier({ parcel, onClose, onVerify, onOpenScanner, theme }) {
  const [inputOtp, setInputOtp] = useState('');
  const [error, setError] = useState('');
  const styles = createStyles(theme);

  const handleVerify = () => {
    if (inputOtp === parcel.otp) { onVerify(parcel.id); onClose(); }
    else setError('Kod OTP tidak sah. Sila cuba lagi.');
  };

  const handleScanSuccess = (decodedText) => {
    const cleanText = decodedText.trim();
    setInputOtp(cleanText);
    setTimeout(() => {
      if (cleanText === parcel.otp) { onVerify(parcel.id); onClose(); }
      else setError('Kod QR tidak sah untuk parcel ini.');
    }, 500);
  };

  return (
    <Modal title="Pengesahan Pengambilan Parcel" onClose={onClose} large theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ backgroundColor: styles.sectionBg, padding: '16px', borderRadius: '8px', border: `1px solid ${styles.sectionBorder}` }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: theme.textSecondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maklumat Parcel</p>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '18px', color: theme.text }}>{parcel.trackingNo}</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: theme.text }}>Penerima: <strong>{parcel.recipient}</strong></p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: theme.text }}>Penghantar: <strong>{parcel.sender}</strong></p>
          {parcel.rackLocation && <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: theme.text }}>Rak: <strong style={{ color: '#4f46e5' }}>{parcel.rackLocation}</strong></p>}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: theme.text, marginBottom: '8px' }}>Masukkan Kod OTP 6-Digit atau Imbas Kod QR Pelajar</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={inputOtp} onChange={(e) => { setInputOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }} placeholder="Contoh: 123456" style={{ ...styles.input, fontFamily: 'monospace', fontSize: '20px', letterSpacing: '6px', textAlign: 'center', borderColor: error ? '#dc2626' : styles.inputBorder, fontWeight: 700 }} />
            <button type="button" onClick={() => onOpenScanner(handleScanSuccess)} style={{ ...styles.btnSecondary, padding: '10px 16px', whiteSpace: 'nowrap' }}><Icons.Camera width={18} height={18} />Imbas QR</button>
          </div>
          {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px', fontWeight: 500 }}>{error}</p>}
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={onClose} style={{ ...styles.btnPrimary, backgroundColor: styles.btnSecondaryBg, color: styles.btnSecondaryText, flex: 1 }}>Batal</button>
          <button onClick={handleVerify} style={{ ...styles.btnPrimary, backgroundColor: '#16a34a', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Icons.CheckCircle width={18} height={18} />Sahkan & Ambil</button>
        </div>
      </div>
    </Modal>
  );
}