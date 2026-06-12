import { useState, useRef, useEffect } from 'react';

const IPGKPP_LOGO = 'https://image.qwenlm.ai/public_source/a5365ccb-778a-4d10-aedb-64b519a3dff3/10c2878d5-8e35-49f7-9978-d6f399874b81.png';
const IPGKPP_BG = 'https://image.qwenlm.ai/public_source/a5365ccb-778a-4d10-aedb-64b519a3dff3/1ee67feb7-707c-4c46-8395-a946662c0e1d.png';

const Icons = {
  Package: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>,
  LayoutDashboard: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  Inbox: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  Users: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Search: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  CheckCircle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Clock: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  AlertTriangle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  LogOut: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Menu: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  ChevronLeft: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>,
  ChevronRight: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>,
  Trash2: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
  Eye: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Edit: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Info: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  Lock: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Unlock: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
  X: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>,
  Barcode: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/></svg>,
  Camera: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  Upload: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
  User: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Layers: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>,
  Zap: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  Shield: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>,
  Wifi: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>,
  Scale: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  Activity: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>,
  Bell: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  MapPin: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Cpu: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>,
  Scan: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" x2="7.01" y1="12" y2="12"/></svg>,
};

const COURIERS = [
  { label: 'Pos Laju', value: 'Pos Laju' },
  { label: 'J&T Express', value: 'J&T Express' },
  { label: 'Shopee Express', value: 'Shopee Express' },
  { label: 'DHL eCommerce', value: 'DHL eCommerce' },
  { label: 'FedEx', value: 'FedEx' },
  { label: 'UPS', value: 'UPS' },
  { label: 'CityLink Express', value: 'CityLink Express' },
  { label: 'Ninja Van', value: 'Ninja Van' },
  { label: 'GDEX', value: 'GDEX' },
  { label: 'Skynet', value: 'Skynet' },
  { label: 'Others', value: 'Others' }
];

const STORAGE_KEYS = {
  USERS: 'ipgkpp_parcels_users',
  PARCELS: 'ipgkpp_parcels_data',
  SESSION: 'ipgkpp_parcels_session',
  RACKS: 'ipgkpp_racks_data'
};

const getDaysAgo = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
};

const DEFAULT_USERS = [
  { username: 'student1', email: 'student1@ipgkpp.edu', password: '123456', name: 'Ahmad Ali', idNo: 'D20201234', phone: '012-3456789', role: 'student', profilePic: '', createdAt: new Date('2024-01-15T08:00:00').toISOString() },
  { username: 'staff1', email: 'staff1@ipgkpp.edu', password: '123456', name: 'Siti Aminah', idNo: 'ST-9988', phone: '013-9876543', role: 'staff', profilePic: '', createdAt: new Date('2024-03-20T10:30:00').toISOString() },
  { username: 'admin', email: 'admin@ipgkpp.edu', password: '123456', name: 'Admin Office', idNo: 'ADM-001', phone: '011-1111111', role: 'admin', profilePic: '', createdAt: new Date('2023-06-01T09:00:00').toISOString() },
];

const DEFAULT_PARCELS = [
  { id: 1, trackingNo: 'PKG-8821X', sender: 'Shopee Express', recipient: 'student1', status: 'Arrived', dateReceived: getDaysAgo(1), location: 'Main Post Office', description: 'Academic Textbooks & Stationery', otp: '849201', rackLocation: 'A-1', weight: '2.5kg' },
  { id: 2, trackingNo: 'PL-4490A', sender: 'Pos Laju', recipient: 'staff1', status: 'Pending', dateReceived: getDaysAgo(0), location: 'Admin Counter', description: 'Departmental Office Supplies', otp: '123456', rackLocation: 'B-2', weight: '1.2kg' },
  { id: 3, trackingNo: 'JT-7723B', sender: 'J&T Express', recipient: 'student1', status: 'Overdue', dateReceived: getDaysAgo(10), location: 'Storage Room B', description: 'Personal Clothing Items', otp: '654321', rackLocation: 'C-3', weight: '3.8kg' },
  { id: 4, trackingNo: 'DHL-9910C', sender: 'DHL eCommerce', recipient: 'admin', status: 'Collected', dateReceived: getDaysAgo(5), location: 'Admin Counter', description: 'Server Maintenance Parts', otp: '987654', rackLocation: 'A-4', weight: '5.1kg' },
  { id: 5, trackingNo: 'FE-1123D', sender: 'FedEx', recipient: 'student1', status: 'Arrived', dateReceived: getDaysAgo(4), location: 'Main Post Office', description: 'Electronics', otp: '112233', rackLocation: 'B-4', weight: '0.8kg' },
  { id: 6, trackingNo: 'UPS-5566E', sender: 'UPS', recipient: 'staff1', status: 'Arrived', dateReceived: getDaysAgo(2), location: 'Admin Counter', description: 'Medical Supplies', otp: '445566', rackLocation: 'C-5', weight: '1.5kg' },
];

const DEFAULT_RACKS = ['A', 'B', 'C'].map(rackLetter => ({
  id: `RACK-${rackLetter}`,
  letter: rackLetter,
  shelves: Array.from({ length: 5 }, (_, shelfIdx) => ({
    id: `${rackLetter}-${shelfIdx + 1}`,
    status: 'empty',
    parcelId: null,
    weight: 0,
    maxWeight: 10,
    ledColor: 'green',
  })),
}));

const STYLES = {
  app: { display: 'flex', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: '#1e293b', backgroundColor: '#f8fafc' },
  sidebar: { width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100, transition: 'transform 0.2s ease' },
  sidebarMobile: { transform: 'translateX(-100%)' },
  sidebarOpen: { transform: 'translateX(0)' },
  sidebarHeader: { padding: '16px 10px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  sidebarLogo: { width: '220px', height: 'auto', objectFit: 'contain' },
  nav: { flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' },
  navItem: (isActive) => ({ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.15s', backgroundColor: isActive ? '#eef2ff' : 'transparent', color: isActive ? '#4f46e5' : '#475569', textAlign: 'left' }),
  main: { flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 },
  mainNoSidebar: { marginLeft: 0 },
  header: { backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 },
  headerInstitution: { display: 'flex', alignItems: 'center', gap: '6px' },
  headerInstitutionLogo: { height: '32px', width: 'auto', objectFit: 'contain' },
  content: { flex: 1, padding: '24px 32px', overflowY: 'auto', position: 'relative' },
  contentBg: { position: 'absolute', inset: 0, backgroundImage: `url(${IPGKPP_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, pointerEvents: 'none', zIndex: 0 },
  contentInner: { position: 'relative', zIndex: 1 },
  hamburger: { padding: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#475569', borderRadius: '8px', display: 'none' },
  userMenuContainer: { position: 'relative' },
  userMenuBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#ffffff', cursor: 'pointer', color: '#475569', transition: 'all 0.15s' },
  userAvatar: (size = 32) => ({ width: size, height: size, borderRadius: '50%', objectFit: 'cover', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }),
  avatarPlaceholder: (size = 32) => ({ width: size, height: size, borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', flexShrink: 0 }),
  dropdown: { position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '224px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', padding: '8px', zIndex: 200 },
  dropdownItem: { width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '14px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: '#334155', textAlign: 'left', transition: 'all 0.15s' },
  dropdownLogout: { color: '#dc2626' },
  divider: { height: '1px', backgroundColor: '#e2e8f0', margin: '8px 0' },
  modal: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' },
  modalContent: { backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: '448px', overflow: 'hidden' },
  modalContentLarge: { backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: '640px', overflow: 'hidden', maxHeight: '90vh' },
  modalContentXLarge: { backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: '900px', overflow: 'hidden', maxHeight: '90vh' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' },
  modalBody: { padding: '20px', overflowY: 'auto', maxHeight: 'calc(90vh - 70px)' },
  input: { width: '100%', padding: '10px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box' },
  btnPrimary: { width: '100%', padding: '10px 16px', backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.15s' },
  btnSecondary: { padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '6px' },
  btnDanger: { padding: '6px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#dc2626', borderRadius: '6px' },
  badge: (status) => {
    const colors = { Pending: { bg: '#fef3c7', color: '#92400e', border: '#fde68a' }, Arrived: { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe' }, Collected: { bg: '#d1fae5', color: '#065f46', border: '#a7f3d0' }, Overdue: { bg: '#fee2e2', color: '#991b1b', border: '#fecaca' } };
    const c = colors[status] || colors.Pending;
    return { display: 'inline-flex', padding: '4px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: c.bg, color: c.color, border: `1px solid ${c.border}` };
  },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', position: 'relative', zIndex: 1 },
  statCard: { backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'relative', zIndex: 1 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: { padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#475569', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  td: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#334155' },
  pagination: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', position: 'relative', zIndex: 1 },
  pageBtn: (active) => ({ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: active ? 'none' : '1px solid #e2e8f0', backgroundColor: active ? '#4f46e5' : '#ffffff', color: active ? '#ffffff' : '#475569', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }),
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 99 },
  pageBanner: { position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 20px', marginBottom: '20px', backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: '12px', border: '1px solid #e2e8f0', backdropFilter: 'blur(8px)' },
  bannerLogo: { height: '48px', width: 'auto', objectFit: 'contain' },
  bannerText: { display: 'flex', flexDirection: 'column' },
  bannerTitle: { fontSize: '14px', fontWeight: 700, color: '#1e3a8a', margin: 0, letterSpacing: '0.025em' },
  bannerSubtitle: { fontSize: '10px', color: '#64748b', margin: 0, marginTop: '2px' },
  scannerContainer: { width: '100%', maxWidth: '400px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', position: 'relative' },
  scannerOverlay: { position: 'absolute', inset: 0, border: '3px solid #4f46e5', borderRadius: '12px', pointerEvents: 'none' },
  scannerLine: { position: 'absolute', left: '10%', right: '10%', height: '2px', backgroundColor: '#4f46e5', boxShadow: '0 0 10px #4f46e5', animation: 'scanline 2s ease-in-out infinite' },
  scanSuccess: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', backgroundColor: '#d1fae5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#065f46', fontSize: '14px', fontWeight: 500, marginTop: '12px' },
  profilePicUpload: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px' },
  profilePicPreview: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid #e2e8f0', transition: 'border-color 0.2s' },
  profilePicPlaceholder: { width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '3px dashed #cbd5e1' },
  uploadBtn: { padding: '8px 20px', backgroundColor: '#ffffff', color: '#4f46e5', border: '1px solid #4f46e5', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '6px' },
  removePicBtn: { padding: '6px 12px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.15s' },
};

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getTimeAgo(dateString) {
  if (!dateString) return '';
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now - created;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);
  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return 'Today';
}

function BarcodeScanner({ onScan, onClose }) {
  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState('');
  const [error, setError] = useState('');
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    if (window.Html5Qrcode) { setIsLibraryLoaded(true); return; }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';
    script.async = true;
    script.onload = () => setIsLibraryLoaded(true);
    script.onerror = () => setError('Failed to load barcode scanner library.');
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  useEffect(() => {
    if (!isLibraryLoaded || !scannerRef.current) return;
    let qrCodeInstance = null;
    let scanTimeout = null;
    const startScanning = async () => {
      try {
        setError('');
        qrCodeInstance = new window.Html5Qrcode(scannerRef.current.id);
        const config = { fps: 10, qrbox: { width: 250, height: 150 }, aspectRatio: 1.0 };
        await qrCodeInstance.start({ facingMode: "environment" }, config, (decodedText) => {
          clearTimeout(scanTimeout);
          setLastScanned(decodedText);
          setIsScanning(false);
          if (qrCodeInstance) { qrCodeInstance.stop().then(() => qrCodeInstance.clear()).catch(() => {}); }
          scanTimeout = setTimeout(() => onScan(decodedText), 500);
        }, () => {});
        setIsScanning(true);
      } catch (err) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') setError('Camera permission denied.');
        else if (err.name === 'NotFoundError') setError('No camera found.');
        else setError('Failed to start camera: ' + err.message);
      }
    };
    startScanning();
    return () => { clearTimeout(scanTimeout); if (qrCodeInstance) { qrCodeInstance.stop().then(() => qrCodeInstance.clear()).catch(() => {}); } };
  }, [isLibraryLoaded, onScan]);

  return (
    <Modal title="Imbas Kod Barcode / QR" onClose={onClose} large>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0, textAlign: 'center' }}>Point your camera at the parcel barcode or student QR code</p>
        {!isLibraryLoaded ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #4f46e5', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ margin: 0, fontSize: '14px' }}>Loading barcode scanner...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#dc2626', fontSize: '14px', margin: '0 0 8px 0' }}>{error}</p>
            <button onClick={() => window.location.reload()} style={{ ...STYLES.btnPrimary, marginTop: '16px', maxWidth: '200px', margin: '16px auto 0' }}>Reload Page</button>
          </div>
        ) : (
          <>
            <div style={STYLES.scannerContainer}>
              <div id="barcode-scanner-container" ref={scannerRef} style={{ width: '100%', minHeight: '300px' }}></div>
              {isScanning && (<><div style={STYLES.scannerOverlay}></div><div style={STYLES.scannerLine}></div></>)}
            </div>
            {lastScanned && (<div style={STYLES.scanSuccess}><Icons.CheckCircle width={20} height={20} /><span>Kod dikesan: <strong>{lastScanned}</strong></span></div>)}
            {!isScanning && !lastScanned && !error && (
              <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '13px' }}>
                <Icons.Camera width={32} height={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                <p style={{ margin: 0 }}>Initializing camera...</p>
              </div>
            )}
          </>
        )}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ ...STYLES.btnPrimary, backgroundColor: '#f1f5f9', color: '#334155' }}>Tutup Pengimbas</button>
        </div>
      </div>
    </Modal>
  );
}

function ProfilePicUpload({ currentUser, onUpdate, onClose }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(currentUser?.profilePic || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setUploadError('Please select an image file'); return; }
    if (file.size > 2 * 1024 * 1024) { setUploadError('Image size must be less than 2MB'); return; }
    setIsUploading(true);
    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => { setPreview(event.target.result); setIsUploading(false); onUpdate(event.target.result); };
    reader.onerror = () => { setUploadError('Failed to read image file'); setIsUploading(false); };
    reader.readAsDataURL(file);
  };

  const handleRemovePic = () => { setPreview(''); onUpdate(''); };

  return (
    <Modal title="Gambar Profil" onClose={onClose} large>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0, textAlign: 'center' }}>Muat naik gambar profil untuk memperibadikan akaun anda</p>
        <div style={STYLES.profilePicUpload}>
          {preview ? <img src={preview} alt="Profile" style={STYLES.profilePicPreview} /> : (<div style={STYLES.profilePicPlaceholder}><Icons.User width={40} height={40} /></div>)}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={() => fileInputRef.current?.click()} style={STYLES.uploadBtn} disabled={isUploading}>
              <Icons.Upload width={16} height={16} />{isUploading ? 'Memuat Naik...' : 'Pilih Foto'}
            </button>
            {preview && <button onClick={handleRemovePic} style={STYLES.removePicBtn}>Buang</button>}
          </div>
          {uploadError && <p style={{ color: '#dc2626', fontSize: '12px', margin: 0, textAlign: 'center' }}>{uploadError}</p>}
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, textAlign: 'center' }}>Format disokong: JPG, PNG, GIF • Saiz maksimum: 2MB</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '280px' }}>
          <button onClick={onClose} style={{ ...STYLES.btnPrimary, backgroundColor: '#f1f5f9', color: '#334155' }}>Selesai</button>
        </div>
      </div>
    </Modal>
  );
}

function CollectionVerifier({ parcel, onClose, onVerify, onOpenScanner }) {
  const [inputOtp, setInputOtp] = useState('');
  const [error, setError] = useState('');

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
    <Modal title="Pengesahan Pengambilan Parcel" onClose={onClose} large>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maklumat Parcel</p>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '18px', color: '#0f172a' }}>{parcel.trackingNo}</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#334155' }}>Penerima: <strong>{parcel.recipient}</strong></p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#334155' }}>Penghantar: <strong>{parcel.sender}</strong></p>
          {parcel.rackLocation && <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#334155' }}>Rak: <strong style={{ color: '#4f46e5' }}>{parcel.rackLocation}</strong></p>}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Masukkan Kod OTP 6-Digit atau Imbas Kod QR Pelajar</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={inputOtp} onChange={(e) => { setInputOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }} placeholder="Contoh: 123456" style={{ ...STYLES.input, fontFamily: 'monospace', fontSize: '20px', letterSpacing: '6px', textAlign: 'center', borderColor: error ? '#dc2626' : '#cbd5e1', fontWeight: 700 }} />
            <button type="button" onClick={() => onOpenScanner(handleScanSuccess)} style={{ ...STYLES.btnSecondary, padding: '10px 16px', whiteSpace: 'nowrap' }}>
              <Icons.Camera width={18} height={18} />Imbas QR
            </button>
          </div>
          {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px', fontWeight: 500 }}>{error}</p>}
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={onClose} style={{ ...STYLES.btnPrimary, backgroundColor: '#f1f5f9', color: '#334155', flex: 1 }}>Batal</button>
          <button onClick={handleVerify} style={{ ...STYLES.btnPrimary, backgroundColor: '#16a34a', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Icons.CheckCircle width={18} height={18} />Sahkan & Ambil
          </button>
        </div>
      </div>
    </Modal>
  );
}

function SmartRackView({ racks, parcels, onShelfClick }) {
  const totalShelves = racks.reduce((sum, r) => sum + r.shelves.length, 0);
  const occupiedShelves = racks.reduce((sum, r) => sum + r.shelves.filter(s => s.status === 'occupied').length, 0);
  const readyShelves = racks.reduce((sum, r) => sum + r.shelves.filter(s => s.status === 'ready').length, 0);
  const emptyShelves = totalShelves - occupiedShelves - readyShelves;

  const getShelfColor = (shelf) => {
    if (shelf.status === 'empty') return { bg: '#f0fdf4', border: '#bbf7d0', led: '#16a34a', label: 'Empty' };
    if (shelf.status === 'ready') return { bg: '#eff6ff', border: '#bfdbfe', led: '#2563eb', label: 'Ready' };
    return { bg: '#fef2f2', border: '#fecaca', led: '#dc2626', label: 'Occupied' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ ...STYLES.card, padding: '24px', background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
            <Icons.Layers width={32} height={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Smart Rack System (Smart Shelf)</h2>
            <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '14px' }}>Organized • Tracked • Real-Time Monitoring</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Total Shelves</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700 }}>{totalShelves}</p>
          </div>
          <div style={{ backgroundColor: 'rgba(22,163,74,0.3)', padding: '12px', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>🟢 Empty</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700 }}>{emptyShelves}</p>
          </div>
          <div style={{ backgroundColor: 'rgba(220,38,38,0.3)', padding: '12px', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>🔴 Occupied</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700 }}>{occupiedShelves}</p>
          </div>
          <div style={{ backgroundColor: 'rgba(37,99,235,0.3)', padding: '12px', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>🔵 Ready</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700 }}>{readyShelves}</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {[
          { icon: Icons.Zap, label: 'LED Indicator (Status)', desc: 'Green/Red/Blue status' },
          { icon: Icons.Activity, label: 'Occupancy Sensor', desc: 'Detects parcel presence' },
          { icon: Icons.Scale, label: 'Weight Sensor', desc: 'Monitors parcel weight' },
          { icon: Icons.MapPin, label: 'Shelf / Location ID', desc: 'Precise location tracking' },
          { icon: Icons.Wifi, label: 'Real-Time Tracking', desc: 'IoT-based monitoring' },
          { icon: Icons.Cpu, label: 'Smart Campus IoT', desc: 'Integrated with website' },
        ].map((feat, idx) => (
          <div key={idx} style={{ ...STYLES.statCard, display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: '#eef2ff', borderRadius: '8px' }}>
              <feat.icon width={20} height={20} style={{ color: '#4f46e5' }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{feat.label}</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rack Visualization */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {racks.map((rack) => (
          <div key={rack.id} style={{ ...STYLES.card, overflow: 'visible' }}>
            <div style={{ padding: '12px 16px', backgroundColor: '#1e3a8a', color: 'white', borderRadius: '12px 12px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <Icons.Layers width={18} height={18} />
              <span style={{ fontWeight: 700, fontSize: '14px' }}>RACK {rack.letter}</span>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#f8fafc' }}>
              {rack.shelves.map((shelf) => {
                const shelfInfo = getShelfColor(shelf);
                const shelfParcel = parcels.find(p => p.id === shelf.parcelId);
                return (
                  <div
                    key={shelf.id}
                    onClick={() => onShelfClick(shelf, rack.letter)}
                    style={{
                      backgroundColor: shelfInfo.bg,
                      border: `2px solid ${shelfInfo.border}`,
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: shelfInfo.led,
                        boxShadow: `0 0 10px ${shelfInfo.led}`,
                        animation: shelf.status !== 'empty' ? 'pulse 2s infinite' : 'none',
                        flexShrink: 0,
                      }} />
                      <div>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{shelf.id}</p>
                        {shelfParcel && <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>{shelfParcel.trackingNo}</p>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: shelfInfo.led, textTransform: 'uppercase' }}>{shelfInfo.label}</span>
                      {shelf.weight > 0 && <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Scale width={10} height={10} />{shelf.weight}kg</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ ...STYLES.card, padding: '16px 24px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>LED Status Legend</h4>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#16a34a', boxShadow: '0 0 8px #16a34a' }} />
            <span style={{ fontSize: '13px', color: '#334155' }}><strong>GREEN</strong> = Empty</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#dc2626', boxShadow: '0 0 8px #dc2626' }} />
            <span style={{ fontSize: '13px', color: '#334155' }}><strong>RED</strong> = Occupied</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2563eb', boxShadow: '0 0 8px #2563eb' }} />
            <span style={{ fontSize: '13px', color: '#334155' }}><strong>BLUE</strong> = Ready for Pickup</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShelfDetailModal({ shelf, rackLetter, parcel, onClose }) {
  if (!shelf) return null;
  const shelfInfo = shelf.status === 'empty' ? { color: '#16a34a', label: 'Empty' } : shelf.status === 'ready' ? { color: '#2563eb', label: 'Ready for Pickup' } : { color: '#dc2626', label: 'Occupied' };

  return (
    <Modal title={`Shelf ${shelf.id} Details`} onClose={onClose} large>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: shelfInfo.color, boxShadow: `0 0 12px ${shelfInfo.color}` }} />
          <div>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Rack {rackLetter} - Shelf {shelf.id}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: shelfInfo.color, fontWeight: 600 }}>{shelfInfo.label}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Weight Sensor</p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Scale width={20} height={20} style={{ color: '#4f46e5' }} />
              {shelf.weight}kg
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Max capacity: {shelf.maxWeight}kg</p>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Occupancy Sensor</p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: shelf.status === 'empty' ? '#16a34a' : '#dc2626' }}>
              {shelf.status === 'empty' ? '✓ Clear' : '● Detected'}
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Real-time monitoring</p>
          </div>
        </div>
        {parcel && (
          <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#1e40af', fontWeight: 600, textTransform: 'uppercase' }}>Assigned Parcel</p>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{parcel.trackingNo}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#334155' }}>Recipient: <strong>{parcel.recipient}</strong></p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#334155' }}>Sender: <strong>{parcel.sender}</strong></p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#334155' }}>Weight: <strong>{parcel.weight}</strong></p>
            <div style={{ marginTop: '8px' }}><span style={STYLES.badge(parcel.status)}>{parcel.status}</span></div>
          </div>
        )}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ ...STYLES.btnPrimary, backgroundColor: '#f1f5f9', color: '#334155' }}>Close</button>
        </div>
      </div>
    </Modal>
  );
}

export default function ParcelManagementSystem() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trackInput, setTrackInput] = useState('');
  const [foundParcel, setFoundParcel] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerCallback, setScannerCallback] = useState(null);
  const [scannedTracking, setScannedTracking] = useState('');
  const [picModalOpen, setPicModalOpen] = useState(false);
  const [verifyParcel, setVerifyParcel] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [selectedShelfRack, setSelectedShelfRack] = useState(null);

  const menuRef = useRef(null);
  const parcelsRef = useRef([]);

  const [mockUsers, setMockUsers] = useState(() => {
    try { const saved = localStorage.getItem(STORAGE_KEYS.USERS); return saved ? JSON.parse(saved) : DEFAULT_USERS; } catch { return DEFAULT_USERS; }
  });

  const [parcels, setParcels] = useState(() => {
    try { const saved = localStorage.getItem(STORAGE_KEYS.PARCELS); return saved ? JSON.parse(saved) : DEFAULT_PARCELS; } catch { return DEFAULT_PARCELS; }
  });

  const [racks, setRacks] = useState(() => {
    try { const saved = localStorage.getItem(STORAGE_KEYS.RACKS); return saved ? JSON.parse(saved) : DEFAULT_RACKS; } catch { return DEFAULT_RACKS; }
  });

  const [adminForm, setAdminForm] = useState({ trackingNo: '', sender: '', senderOther: '', recipient: '', status: 'Pending', location: 'Main Post Office', description: '', assignRack: false, selectedRackShelf: '' });
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

  useEffect(() => { parcelsRef.current = parcels; }, [parcels]);

  useEffect(() => {
    const checkOverdue = () => {
      const now = new Date();
      let hasChanges = false;
      const currentParcels = parcelsRef.current;
      const updatedParcels = currentParcels.map(p => {
        if (p.status === 'Arrived' && p.dateReceived) {
          const receivedDate = new Date(p.dateReceived);
          const diffTime = now - receivedDate;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 3) { hasChanges = true; return { ...p, status: 'Overdue' }; }
        }
        return p;
      });
      if (hasChanges) setParcels(updatedParcels);
    };
    checkOverdue();
    const interval = setInterval(checkOverdue, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers)); } catch (e) {} }, [mockUsers]);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(parcels)); } catch (e) {} }, [parcels]);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEYS.RACKS, JSON.stringify(racks)); } catch (e) {} }, [racks]);

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (savedSession) { const parsed = JSON.parse(savedSession); setUser(parsed); setProfileForm({ name: parsed.name, email: parsed.email, phone: parsed.phone || '', address: '' }); }
    } catch {}
  }, []);

  useEffect(() => {
    if (user) { try { localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user)); } catch {} }
    else { try { localStorage.removeItem(STORAGE_KEYS.SESSION); } catch {} }
  }, [user]);

  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer); }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeModal || verifyParcel || scannerOpen || picModalOpen || selectedShelf) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [activeModal, verifyParcel, scannerOpen, picModalOpen, selectedShelf]);

  const showNotification = (message) => { setNotification(message); setTimeout(() => setNotification(null), 5000); };

  const handleLogin = (username, password) => {
    const found = mockUsers.find(u => u.username === username && u.password === password);
    if (found) { const loggedUser = { ...found, lastLogin: new Date().toISOString() }; setUser(loggedUser); setProfileForm({ name: found.name, email: found.email, phone: found.phone || '', address: '' }); setView('dashboard'); }
    else alert('Invalid credentials');
  };

  const handleLogout = () => { setUser(null); setView('login'); setUserMenuOpen(false); localStorage.removeItem(STORAGE_KEYS.SESSION); };

  const handleSignUp = (data) => {
    if (mockUsers.some(u => u.username === data.username || u.email === data.email)) { alert('Account already exists'); return; }
    const newUser = { ...data, profilePic: '', createdAt: new Date().toISOString() };
    setMockUsers(prev => [...prev, newUser]);
    alert('Account created successfully');
    setView('login');
  };

  const handleAddParcel = (e) => {
    e.preventDefault();
    if (!adminForm.trackingNo || !adminForm.recipient) return;
    const senderValue = adminForm.sender === 'Others' ? adminForm.senderOther : adminForm.sender;
    if (!senderValue) return;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    let assignedRack = null;

    if (adminForm.assignRack && adminForm.selectedRackShelf) {
      assignedRack = adminForm.selectedRackShelf;
      const [rackLetter, shelfNum] = adminForm.selectedRackShelf.split('-');
      setRacks(prev => prev.map(r => r.letter === rackLetter ? { ...r, shelves: r.shelves.map(s => s.id === adminForm.selectedRackShelf ? { ...s, status: 'occupied', parcelId: Date.now(), weight: parseFloat((Math.random() * 5 + 0.5).toFixed(1)) } : s) } : prev));
    } else if (adminForm.assignRack) {
      for (const rack of racks) {
        const emptyShelf = rack.shelves.find(s => s.status === 'empty');
        if (emptyShelf) {
          assignedRack = emptyShelf.id;
          setRacks(prev => prev.map(r => r.id === rack.id ? { ...r, shelves: r.shelves.map(s => s.id === emptyShelf.id ? { ...s, status: 'occupied', parcelId: Date.now(), weight: parseFloat((Math.random() * 5 + 0.5).toFixed(1)) } : s) } : prev));
          break;
        }
      }
    }

    const newParcel = {
      ...adminForm,
      sender: senderValue,
      id: Date.now(),
      dateReceived: new Date().toISOString().split('T')[0],
      otp: otp,
      status: adminForm.status || 'Pending',
      rackLocation: assignedRack,
      weight: `${(Math.random() * 5 + 0.5).toFixed(1)}kg`,
    };
    delete newParcel.senderOther;
    delete newParcel.assignRack;
    delete newParcel.selectedRackShelf;

    setParcels(p => [newParcel, ...p]);
    setAdminForm({ trackingNo: '', sender: '', senderOther: '', recipient: '', status: 'Pending', location: 'Main Post Office', description: '', assignRack: false, selectedRackShelf: '' });
    setScannedTracking('');

    const recipientUser = mockUsers.find(u => u.username === newParcel.recipient);
    const phone = recipientUser?.phone || newParcel.recipient;
    let notifyMsg = `Parcel dari ${newParcel.sender} telah sampai. Kod OTP: ${otp}`;
    if (assignedRack) notifyMsg += ` | Rak: ${assignedRack}`;
    showNotification(`API WhatsApp/Telegram: "${notifyMsg}" dihantar kepada ${phone}.`);
  };

  const handleDeleteParcel = (id) => {
    const parcel = parcels.find(p => p.id === id);
    if (window.confirm('Are you sure you want to delete this parcel record?')) {
      if (parcel?.rackLocation) {
        const [rackLetter] = parcel.rackLocation.split('-');
        setRacks(prev => prev.map(r => r.letter === rackLetter ? { ...r, shelves: r.shelves.map(s => s.id === parcel.rackLocation ? { ...s, status: 'empty', parcelId: null, weight: 0 } : s) } : prev));
      }
      setParcels(p => p.filter(parcel => parcel.id !== id));
    }
  };

  const updateStatus = (id, status) => {
    const parcel = parcels.find(p => p.id === id);
    setParcels(p => p.map(x => x.id === id ? { ...x, status } : x));
    if (status === 'Collected' && parcel) {
      if (parcel.rackLocation) {
        const [rackLetter] = parcel.rackLocation.split('-');
        setRacks(prev => prev.map(r => r.letter === rackLetter ? { ...r, shelves: r.shelves.map(s => s.id === parcel.rackLocation ? { ...s, status: 'empty', parcelId: null, weight: 0 } : s) } : prev));
      }
    }
  };

  const handleTrackParcel = (e) => {
    e.preventDefault();
    if (!user) return;
    const inputTrim = trackInput.trim().toLowerCase();
    if (!inputTrim) return;
    let found = user.role === 'admin' ? parcels.find(p => p.trackingNo.toLowerCase() === inputTrim) : parcels.find(p => p.recipient === user.username && p.trackingNo.toLowerCase() === inputTrim);
    if (found) setFoundParcel(found);
    else { setFoundParcel(null); alert('Parcel not found.'); }
  };

  const handleSaveInfo = () => {
    if (!profileForm.name || !profileForm.email) { alert('Name and email are required'); return; }
    const updatedUser = { ...user, ...profileForm };
    setUser(updatedUser);
    setMockUsers(prev => prev.map(u => u.username === updatedUser.username ? updatedUser : u));
    setActiveModal(null);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (passwordForm.new !== passwordForm.confirm) { alert('Passwords do not match'); return; }
    if (passwordForm.new.length < 6) { alert('Password must be at least 6 characters'); return; }
    const updatedUser = { ...user, password: passwordForm.new };
    setUser(updatedUser);
    setMockUsers(prev => prev.map(u => u.username === updatedUser.username ? updatedUser : u));
    setPasswordForm({ current: '', new: '', confirm: '' });
    setActiveModal(null);
    alert('Password updated successfully!');
  };

  const handleUpdateProfilePic = (picData) => {
    const updatedUser = { ...user, profilePic: picData };
    setUser(updatedUser);
    setMockUsers(prev => prev.map(u => u.username === updatedUser.username ? updatedUser : u));
  };

  const handleBarcodeScan = (decodedText) => {
    if (scannerCallback) { scannerCallback(decodedText); setScannerCallback(null); }
    else { const cleanText = decodedText.trim().toUpperCase(); setScannedTracking(cleanText); setAdminForm(prev => ({ ...prev, trackingNo: cleanText })); }
    setScannerOpen(false);
  };

  const openScannerForTracking = () => { setScannerCallback(null); setScannerOpen(true); };
  const openScannerForVerification = (callback) => { setScannerCallback(() => callback); setScannerOpen(true); };

  const handleRequestCollect = (parcel) => setVerifyParcel(parcel);
  const handleVerifiedCollect = (id) => {
    updateStatus(id, 'Collected');
    showNotification("Parcel berjaya disahkan dan ditanda sebagai 'Collected'. Rak telah dibebaskan.");
  };

  const isAdmin = user?.role === 'admin';
  const filtered = isAdmin ? parcels : parcels.filter(p => p.recipient === user?.username && p.status !== 'Collected');
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedParcels = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [view]);

  const stats = {
    total: filtered.length,
    pending: filtered.filter(p => p.status === 'Pending').length,
    arrived: filtered.filter(p => p.status === 'Arrived').length,
    collected: filtered.filter(p => p.status === 'Collected').length,
    overdue: filtered.filter(p => p.status === 'Overdue').length,
    racksTotal: racks.reduce((sum, r) => sum + r.shelves.length, 0),
    racksOccupied: racks.reduce((sum, r) => sum + r.shelves.filter(s => s.status !== 'empty').length, 0),
  };

  const renderAvatar = (size = 32) => {
    if (user?.profilePic) return <img src={user.profilePic} alt={user.name} style={STYLES.userAvatar(size)} />;
    return (<div style={STYLES.avatarPlaceholder(size)}><Icons.User width={size * 0.55} height={size * 0.55} /></div>);
  };

  if (!user) return <AuthView onLogin={handleLogin} onSignUp={handleSignUp} view={view === 'dashboard' ? 'login' : view} setView={setView} />;

  const viewTitles = { dashboard: 'Dashboard', myparcels: 'Parcel Tracking', admin: 'Admin Panel', rack: 'Smart Rack' };

  return (
    <div style={STYLES.app}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes scanline { 0% { top: 10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 90%; opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      {isMobile && sidebarOpen && <div style={STYLES.overlay} onClick={() => setSidebarOpen(false)} />}

      <aside style={{ ...STYLES.sidebar, ...(isMobile ? (sidebarOpen ? STYLES.sidebarOpen : STYLES.sidebarMobile) : {}) }}>
        <div style={STYLES.sidebarHeader}>
          <img src={IPGKPP_LOGO} alt="IPGKPP" style={STYLES.sidebarLogo} />
        </div>
        <nav style={STYLES.nav}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
            { id: 'myparcels', label: 'My Parcels', icon: Icons.Inbox },
            { id: 'rack', label: 'Smart Rack', icon: Icons.Layers },
            { id: 'admin', label: 'Admin Panel', icon: Icons.Users, adminOnly: true }
          ].filter(item => !item.adminOnly || isAdmin).map(item => (
            <button key={item.id} onClick={() => { setView(item.id); setSidebarOpen(false); }} style={STYLES.navItem(view === item.id)}>
              <item.icon width={20} height={20} />{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
          <p style={{ margin: 0, fontWeight: 600 }}>Smart Parcel System v2.0</p>
          <p style={{ margin: '4px 0 0 0' }}>IoT • Secure • Connected</p>
        </div>
      </aside>

      <div style={{ ...STYLES.main, ...(isMobile ? STYLES.mainNoSidebar : {}) }}>
        <header style={STYLES.header}>
          <button onClick={() => setSidebarOpen(true)} style={{ ...STYLES.hamburger, display: isMobile ? 'flex' : 'none' }}>
            <Icons.Menu width={24} height={24} />
          </button>
          <div style={STYLES.headerInstitution}>
            <img src={IPGKPP_LOGO} alt="IPGKPP" style={STYLES.headerInstitutionLogo} />
          </div>
          <div style={STYLES.userMenuContainer} ref={menuRef}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={STYLES.userMenuBtn}>
              {renderAvatar(28)}
              {!isMobile && <span style={{ fontSize: '14px', fontWeight: 500 }}>{user.name}</span>}
            </button>
            {userMenuOpen && (
              <div style={STYLES.dropdown}>
                <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f1f5f9', marginBottom: '4px' }}>
                  {renderAvatar(40)}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', margin: 0, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                  </div>
                </div>
                <button onClick={() => { setActiveModal('viewInfo'); setUserMenuOpen(false); }} style={STYLES.dropdownItem} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#eef2ff'; e.currentTarget.style.color = '#4f46e5'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#334155'; }}>
                  <Icons.Eye width={18} height={18} /> View Info
                </button>
                <button onClick={() => { setActiveModal('changeInfo'); setUserMenuOpen(false); }} style={STYLES.dropdownItem} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#eef2ff'; e.currentTarget.style.color = '#4f46e5'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#334155'; }}>
                  <Icons.Edit width={18} height={18} /> Change Info
                </button>
                <button onClick={() => { setPicModalOpen(true); setUserMenuOpen(false); }} style={STYLES.dropdownItem} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#eef2ff'; e.currentTarget.style.color = '#4f46e5'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#334155'; }}>
                  <Icons.Camera width={18} height={18} /> Profile Picture
                </button>
                <button onClick={() => { setActiveModal('details'); setUserMenuOpen(false); }} style={STYLES.dropdownItem} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#eef2ff'; e.currentTarget.style.color = '#4f46e5'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#334155'; }}>
                  <Icons.Info width={18} height={18} /> Details
                </button>
                <button onClick={() => { setActiveModal('password'); setUserMenuOpen(false); }} style={STYLES.dropdownItem} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#eef2ff'; e.currentTarget.style.color = '#4f46e5'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#334155'; }}>
                  <Icons.Lock width={18} height={18} /> Password
                </button>
                <div style={STYLES.divider} />
                <button onClick={handleLogout} style={{ ...STYLES.dropdownItem, ...STYLES.dropdownLogout }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                  <Icons.LogOut width={18} height={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        <div style={STYLES.content}>
          <div style={STYLES.contentBg} />
          <div style={STYLES.contentInner}>
            <div style={STYLES.pageBanner}>
              <img src={IPGKPP_LOGO} alt="IPGKPP" style={STYLES.bannerLogo} />
              <div style={STYLES.bannerText}>
                <h2 style={STYLES.bannerTitle}>INSTITUT PENDIDIKAN GURU KAMPUS PULAU PINANG</h2>
                <p style={STYLES.bannerSubtitle}>Smart Parcel Locker & Smart Rack System — {viewTitles[view] || 'Dashboard'}</p>
              </div>
            </div>

            {view === 'dashboard' && (
              <DashboardView
                parcels={paginatedParcels}
                trackInput={trackInput} setTrackInput={setTrackInput} onTrack={handleTrackParcel}
                foundParcel={foundParcel} onRequestCollect={handleRequestCollect}
                stats={stats} isAdmin={isAdmin} user={user}
                racks={racks}
                onGoToRack={() => setView('rack')}
              />
            )}

            {view === 'myparcels' && <MyParcelsView parcels={paginatedParcels} user={user} />}

            {view === 'rack' && (
              <SmartRackView
                racks={racks}
                parcels={parcels}
                onShelfClick={(shelf, rackLetter) => {
                  const parcel = parcels.find(p => p.id === shelf.parcelId);
                  setSelectedShelf({ shelf, rackLetter, parcel });
                }}
              />
            )}

            {view === 'admin' && isAdmin && (
              <AdminView
                parcels={parcels} form={adminForm} setForm={setAdminForm}
                onAdd={handleAddParcel} onRequestCollect={handleRequestCollect} onDelete={handleDeleteParcel}
                onOpenScanner={openScannerForTracking}
                scannedTracking={scannedTracking}
                racks={racks}
              />
            )}

            {totalPages > 1 && (view === 'dashboard' || view === 'myparcels' || view === 'admin') && (
              <div style={STYLES.pagination}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} records
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ ...STYLES.pageBtn(false), opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>
                    <Icons.ChevronLeft width={16} height={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                    <button key={pg} onClick={() => setCurrentPage(pg)} style={STYLES.pageBtn(currentPage === pg)}>{pg}</button>
                  ))}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ ...STYLES.pageBtn(false), opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>
                    <Icons.ChevronRight width={16} height={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeModal === 'viewInfo' && (
        <Modal onClose={() => setActiveModal(null)} title="Your Information">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              {user?.profilePic ? <img src={user.profilePic} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #e2e8f0' }} /> : (<div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}><Icons.User width={36} height={36} /></div>)}
            </div>
            <DetailRow label="Name" value={user.name} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Phone" value={user.phone || 'Not set'} />
            <DetailRow label="Role" value={user.role} />
            <DetailRow label="ID No" value={user.idNo} />
          </div>
        </Modal>
      )}

      {activeModal === 'changeInfo' && (
        <Modal onClose={() => setActiveModal(null)} title="Change Information">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} placeholder="Full Name" style={STYLES.input} />
            <input value={profileForm.email} onChange={e => setProfileForm({ ...profileForm, email: e.target.value })} placeholder="Email Address" style={STYLES.input} />
            <input value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} placeholder="Phone Number" style={STYLES.input} />
            <button onClick={handleSaveInfo} style={STYLES.btnPrimary}>Save Changes</button>
          </div>
        </Modal>
      )}

      {activeModal === 'details' && (
        <Modal onClose={() => setActiveModal(null)} title="Account Details">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <DetailRow label="Status" value="● Active" valueColor="#16a34a" />
            <DetailRow label="Verification" value="Email & Phone Verified" valueColor="#2563eb" />
            <DetailRow label="Member Since" value={user.createdAt ? formatDate(user.createdAt) : 'N/A'} />
            <DetailRow label="Duration" value={user.createdAt ? getTimeAgo(user.createdAt) : ''} valueColor="#4f46e5" />
            <DetailRow label="Last Login" value={user.lastLogin ? currentTime.toLocaleString() : 'Just now'} />
          </div>
        </Modal>
      )}

      {activeModal === 'password' && (
        <Modal onClose={() => setActiveModal(null)} title="Change Password">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="password" value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} placeholder="Current Password" style={STYLES.input} />
            <input type="password" value={passwordForm.new} onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })} placeholder="New Password" style={STYLES.input} />
            <input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} placeholder="Confirm Password" style={STYLES.input} />
            <button onClick={handleChangePassword} style={STYLES.btnPrimary}>Update Password</button>
          </div>
        </Modal>
      )}

      {verifyParcel && (
        <CollectionVerifier parcel={verifyParcel} onClose={() => setVerifyParcel(null)} onVerify={handleVerifiedCollect} onOpenScanner={openScannerForVerification} />
      )}

      {scannerOpen && (
        <BarcodeScanner onScan={handleBarcodeScan} onClose={() => { setScannerOpen(false); setScannerCallback(null); }} />
      )}

      {picModalOpen && (
        <ProfilePicUpload currentUser={user} onUpdate={handleUpdateProfilePic} onClose={() => setPicModalOpen(false)} />
      )}

      {selectedShelf && (
        <ShelfDetailModal
          shelf={selectedShelf.shelf}
          rackLetter={selectedShelf.rackLetter}
          parcel={selectedShelf.parcel}
          onClose={() => setSelectedShelf(null)}
        />
      )}

      {notification && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#16a34a', color: 'white', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', gap: '12px', maxWidth: '400px', animation: 'slideIn 0.3s ease-out' }}>
          <Icons.CheckCircle width={20} height={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '14px', letterSpacing: '0.025em' }}>Notifikasi Dihantar</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.95, lineHeight: '1.4' }}>{notification}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ color: '#64748b' }}>{label}</span>
      <span style={{ fontWeight: 500, color: valueColor || '#1e293b' }}>{value}</span>
    </div>
  );
}

function Modal({ title, children, onClose, large, xlarge }) {
  return (
    <div style={STYLES.modal} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={xlarge ? STYLES.modalContentXLarge : large ? STYLES.modalContentLarge : STYLES.modalContent}>
        <div style={STYLES.modalHeader}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px', borderRadius: '6px' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
            <Icons.X width={20} height={20} />
          </button>
        </div>
        <div style={STYLES.modalBody}>{children}</div>
      </div>
    </div>
  );
}

function AuthView({ onLogin, onSignUp, view, setView }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <img src={IPGKPP_LOGO} alt="IPGKPP" style={{ width: '360px', height: 'auto', marginBottom: '16px', objectFit: 'contain' }} />
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.025em' }}>Smart Parcel Locker & Rack System</h1>
        <p style={{ color: '#c7d2fe', marginTop: '4px', fontSize: '13px' }}>Secure, efficient campus logistics tracking with IoT</p>
      </div>
      <div style={{ width: '100%', maxWidth: '448px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9' }}>
          <button onClick={() => setView('login')} style={{ flex: 1, padding: '16px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', borderBottom: view === 'login' ? '2px solid #4f46e5' : 'none', backgroundColor: view === 'login' ? '#eef2ff' : 'transparent', color: view === 'login' ? '#4f46e5' : '#64748b', transition: 'all 0.15s' }}>Sign In</button>
          <button onClick={() => setView('signup')} style={{ flex: 1, padding: '16px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', borderBottom: view === 'signup' ? '2px solid #4f46e5' : 'none', backgroundColor: view === 'signup' ? '#eef2ff' : 'transparent', color: view === 'signup' ? '#4f46e5' : '#64748b', transition: 'all 0.15s' }}>Create Account</button>
        </div>
        <div style={{ padding: '32px' }}>
          {view === 'login' ? <LoginForm onLogin={onLogin} /> : <SignUpForm onSignUp={onSignUp} />}
        </div>
      </div>
      <footer style={{ marginTop: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>© {new Date().getFullYear()} IPGKPP Campus Logistics. All rights reserved.</footer>
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onLogin(u, p); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>Username</label>
        <input value={u} onChange={e => setU(e.target.value)} style={{ ...STYLES.input, boxSizing: 'border-box' }} placeholder="e.g. student1, staff1, admin" required />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>Password</label>
        <input type="password" value={p} onChange={e => setP(e.target.value)} style={{ ...STYLES.input, boxSizing: 'border-box' }} placeholder="••••••••" required />
      </div>
      <button type="submit" style={STYLES.btnPrimary}>Access Dashboard</button>
      <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>Demo: student1/staff1/admin — Password: 123456</p>
    </form>
  );
}

function SignUpForm({ onSignUp }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ username: '', email: '', password: '', name: '', idNo: '', phone: '', role: 'student' });
  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => Math.max(1, s - 1));
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={step === 3 ? e => { e.preventDefault(); onSignUp(form); } : e => { e.preventDefault(); next(); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        {[1, 2, 3].map(s => <div key={s} style={{ height: '4px', flex: 1, borderRadius: '9999px', backgroundColor: s <= step ? '#4f46e5' : '#e2e8f0' }} />)}
      </div>
      {step === 1 && <>
        <input name="username" value={form.username} onChange={handleChange} style={STYLES.input} placeholder="Username" required />
        <input name="email" value={form.email} onChange={handleChange} type="email" style={STYLES.input} placeholder="Email Address" required />
        <input name="password" value={form.password} onChange={handleChange} type="password" style={STYLES.input} placeholder="Password" required />
        <button type="button" onClick={next} style={STYLES.btnPrimary}>Continue</button>
      </>}
      {step === 2 && <>
        <input name="name" value={form.name} onChange={handleChange} style={STYLES.input} placeholder="Full Name" required />
        <input name="idNo" value={form.idNo} onChange={handleChange} style={STYLES.input} placeholder="Matric / Staff ID" required />
        <input name="phone" value={form.phone} onChange={handleChange} type="tel" style={STYLES.input} placeholder="Phone Number" required />
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={prev} style={{ ...STYLES.btnPrimary, backgroundColor: '#f1f5f9', color: '#334155' }}>Back</button>
          <button type="button" onClick={next} style={STYLES.btnPrimary}>Next</button>
        </div>
      </>}
      {step === 3 && <>
        <select name="role" value={form.role} onChange={handleChange} style={{ ...STYLES.input, backgroundColor: '#ffffff' }}>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Administrator</option>
        </select>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={prev} style={{ ...STYLES.btnPrimary, backgroundColor: '#f1f5f9', color: '#334155' }}>Back</button>
          <button type="submit" style={{ ...STYLES.btnPrimary, backgroundColor: '#16a34a' }}>Complete Registration</button>
        </div>
      </>}
    </form>
  );
}

function DashboardView({ parcels, trackInput, setTrackInput, onTrack, foundParcel, onRequestCollect, stats, isAdmin, user, racks, onGoToRack }) {
  const cardGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {isAdmin && (
        <div style={{ ...STYLES.statCard, backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', color: '#3730a3', padding: '10px 16px', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icons.Users width={16} height={16} />Administrator View: Showing all system parcels
        </div>
      )}

      <div style={{ backgroundColor: '#4f46e5', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '0 0 8px 0' }}>Track Your Parcel</h2>
        <p style={{ color: '#c7d2fe', marginBottom: '16px', fontSize: '14px' }}>Enter your tracking number to find the status and description of your package.</p>
        <form onSubmit={onTrack} style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Icons.Search style={{ position: 'absolute', left: '12px', top: '10px', width: 20, height: 20, color: '#a5b4fc' }} />
            <input value={trackInput} onChange={e => setTrackInput(e.target.value)} style={{ width: '100%', paddingLeft: '40px', paddingRight: '12px', padding: '10px 12px 10px 40px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid #818cf8', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. PKG-8821X" required />
          </div>
          <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#ffffff', color: '#4f46e5', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Search</button>
        </form>
      </div>

      {foundParcel && (
        <div style={{ ...STYLES.card, border: '2px solid #bfdbfe' }}>
          <div style={{ backgroundColor: '#eff6ff', padding: '16px 24px', borderBottom: '1px solid #bfdbfe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.CheckCircle width={20} height={20} style={{ color: '#2563eb' }} />
              <h3 style={{ fontWeight: 700, color: '#1e40af', margin: 0, fontSize: '16px' }}>Parcel Found: {foundParcel.trackingNo}</h3>
            </div>
            <span style={STYLES.badge(foundParcel.status)}>{foundParcel.status}</span>
          </div>
          <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0 }}><span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Sender</span><br /><span style={{ fontWeight: 500 }}>{foundParcel.sender}</span></p>
              <p style={{ margin: 0 }}><span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Location</span><br /><span style={{ fontWeight: 500 }}>{foundParcel.location}</span></p>
              <p style={{ margin: 0 }}><span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Date Received</span><br /><span style={{ fontWeight: 500 }}>{foundParcel.dateReceived}</span></p>
              {foundParcel.rackLocation && <p style={{ margin: 0 }}><span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Rack Location</span><br /><span style={{ fontWeight: 600, color: '#4f46e5' }}>{foundParcel.rackLocation}</span></p>}
              {foundParcel.weight && <p style={{ margin: 0 }}><span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Weight</span><br /><span style={{ fontWeight: 500 }}>{foundParcel.weight}</span></p>}
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Package Description</span>
              <p style={{ marginTop: '8px', color: '#1e293b', fontWeight: 500, lineHeight: '1.6', margin: '8px 0 0 0' }}>{foundParcel.description || "No description provided"}</p>
            </div>
          </div>
          {foundParcel.status === 'Arrived' && user?.role !== 'admin' && (
            <div style={{ padding: '24px', backgroundColor: '#f0fdf4', borderTop: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#166534', fontSize: '16px' }}>Kod Pengambilan Anda</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#166534', fontWeight: 600, textTransform: 'uppercase' }}>Kod OTP</p>
                  <div style={{ backgroundColor: '#ffffff', padding: '12px 24px', borderRadius: '8px', border: '2px dashed #16a34a', fontFamily: 'monospace', fontSize: '32px', fontWeight: 700, color: '#16a34a', letterSpacing: '4px' }}>{foundParcel.otp || '------'}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#166534', fontWeight: 600, textTransform: 'uppercase' }}>Kod QR</p>
                  <div style={{ backgroundColor: '#ffffff', padding: '8px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(foundParcel.otp || '')}`} alt="QR Code" style={{ width: '120px', height: '120px', display: 'block' }} />
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#15803d', textAlign: 'center', maxWidth: '400px' }}>Tunjukkan kod ini kepada staf pos untuk pengesahan sebelum mengambil parcel.</p>
            </div>
          )}
          {foundParcel.status === 'Arrived' && (
            <div style={{ padding: '12px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
              <button onClick={() => onRequestCollect(foundParcel)} style={{ padding: '8px 24px', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.Lock width={16} height={16} />Sahkan & Ambil (OTP/QR)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Smart Rack Quick Stats */}
      <div onClick={onGoToRack} style={{ ...STYLES.statCard, cursor: 'pointer', background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)', color: 'white', border: 'none' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(15,23,42,0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ padding: '10px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }}><Icons.Layers width={24} height={24} /></div>
          <span style={{ fontSize: '12px', opacity: 0.9, fontWeight: 600 }}>SMART RACK (SMART SHELF)</span>
        </div>
        <p style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 4px 0' }}>{stats.racksTotal}</p>
        <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>{stats.racksOccupied} occupied • {stats.racksTotal - stats.racksOccupied} available</p>
        <div style={{ marginTop: '12px', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', backgroundColor: '#16a34a', width: `${((stats.racksTotal - stats.racksOccupied) / stats.racksTotal) * 100}%`, transition: 'width 0.5s' }} />
        </div>
      </div>

      <div style={cardGrid}>
        {[
          { l: 'Total Parcels', v: stats.total, i: Icons.Package, c: '#4f46e5' },
          { l: 'Pending', v: stats.pending, i: Icons.Clock, c: '#d97706' },
          { l: 'Arrived', v: stats.arrived, i: Icons.Inbox, c: '#2563eb' },
          { l: 'Collected', v: stats.collected, i: Icons.CheckCircle, c: '#16a34a' }
        ].map((s, i) => (
          <div key={i} style={STYLES.statCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: s.c + '15' }}><s.i width={20} height={20} style={{ color: s.c }} /></div>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>{s.v}</span>
            </div>
            <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, margin: 0 }}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div style={STYLES.card}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: 600, color: '#0f172a', margin: 0, fontSize: '16px' }}>Benefits of Smart Parcel System</h3>
        </div>
        <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { icon: Icons.Users, title: 'For Students', desc: 'Easy & fast collection, Real-time notification, Secure & convenient' },
            { icon: Icons.User, title: 'For Staff', desc: 'Easy parcel management, Less manual work, Faster organization' },
            { icon: Icons.Shield, title: 'Secure', desc: 'Multi-layer authentication, Real-time monitoring, Auto-lock system' },
            { icon: Icons.Zap, title: 'Efficient', desc: 'Save time & space, Improve workflow, Smart automation' },
            { icon: Icons.MapPin, title: 'Trackable', desc: 'Real-time tracking of every parcel, Location-based storage' },
            { icon: Icons.Wifi, title: 'Smart & Connected', desc: 'IoT based system, Integrated with website, Smart Campus' },
          ].map((b, idx) => (
            <div key={idx} style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ padding: '8px', backgroundColor: '#eef2ff', borderRadius: '8px', display: 'inline-block', marginBottom: '8px' }}>
                <b.icon width={20} height={20} style={{ color: '#4f46e5' }} />
              </div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{b.title}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={STYLES.card}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: 600, color: '#0f172a', margin: 0, fontSize: '16px' }}>{isAdmin ? 'All System Parcels' : 'Active Parcels'}</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={STYLES.table}>
            <thead>
              <tr>
                <th style={STYLES.th}>Tracking</th>
                <th style={STYLES.th}>Sender</th>
                <th style={STYLES.th}>Recipient</th>
                <th style={STYLES.th}>Rack</th>
                <th style={STYLES.th}>Status</th>
                <th style={STYLES.th}>Date</th>
                <th style={STYLES.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.length === 0 ? (
                <tr><td colSpan="7" style={{ ...STYLES.td, textAlign: 'center', padding: '32px', color: '#64748b' }}>No parcels found</td></tr>
              ) : parcels.map(p => (
                <tr key={p.id} style={{ transition: 'background-color 0.15s' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                  <td style={STYLES.td}><span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.trackingNo}</span></td>
                  <td style={STYLES.td}>{p.sender}</td>
                  <td style={STYLES.td}>{p.recipient}</td>
                  <td style={STYLES.td}>{p.rackLocation ? <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#4f46e5' }}>{p.rackLocation}</span> : <span style={{ color: '#94a3b8' }}>—</span>}</td>
                  <td style={STYLES.td}><span style={STYLES.badge(p.status)}>{p.status}</span></td>
                  <td style={STYLES.td}>{p.dateReceived}</td>
                  <td style={STYLES.td}>
                    {p.status === 'Arrived' && (
                      <button onClick={() => onRequestCollect(p)} style={{ padding: '4px 12px', backgroundColor: '#eef2ff', color: '#4f46e5', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icons.Lock width={14} height={14} />Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MyParcelsView({ parcels, user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {parcels.map(p => (
        <div key={p.id} style={{ ...STYLES.card, padding: '0' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '16px', color: '#0f172a' }}>{p.trackingNo}</span>
              <span style={{ marginLeft: '12px' }}><span style={STYLES.badge(p.status)}>{p.status}</span></span>
            </div>
            <span style={{ fontSize: '14px', color: '#64748b' }}>{p.dateReceived}</span>
          </div>
          <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Penghantar</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>{p.sender}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Lokasi</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>{p.location}</p>
            </div>
            {p.rackLocation && (
              <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Rak</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#4f46e5' }}>{p.rackLocation}</p>
              </div>
            )}
            {p.weight && (
              <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Berat</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>{p.weight}</p>
              </div>
            )}
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Deskripsi</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#334155' }}>{p.description || '-'}</p>
            </div>
          </div>
          {p.status === 'Arrived' && user?.role !== 'admin' && (
            <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderTop: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#166534', fontSize: '15px' }}>Kod Pengambilan Anda</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: '#166534', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kod OTP</p>
                  <div style={{ backgroundColor: '#ffffff', padding: '10px 20px', borderRadius: '8px', border: '2px dashed #16a34a', fontFamily: 'monospace', fontSize: '28px', fontWeight: 800, color: '#16a34a', letterSpacing: '4px' }}>{p.otp || '------'}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: '#166534', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kod QR</p>
                  <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(p.otp || '')}`} alt="QR Code" style={{ width: '100px', height: '100px', display: 'block' }} />
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#15803d', textAlign: 'center', maxWidth: '350px', lineHeight: '1.4' }}>Tunjukkan kod ini kepada staf pos untuk pengesahan sebelum mengambil parcel.</p>
            </div>
          )}
        </div>
      ))}
      {parcels.length === 0 && (
        <div style={{ ...STYLES.card, padding: '40px', textAlign: 'center', color: '#64748b' }}>
          <Icons.Inbox width={48} height={48} style={{ marginBottom: '12px', opacity: 0.3 }} />
          <p style={{ margin: 0, fontSize: '15px' }}>Tiada rekod parcel aktif.</p>
        </div>
      )}
    </div>
  );
}

function AdminView({ parcels, form, setForm, onAdd, onRequestCollect, onDelete, onOpenScanner, scannedTracking, racks }) {
  const up = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [k]: value }));
  };

  const isOthers = form.sender === 'Others';
  const emptyShelves = racks.flatMap(r => r.shelves.filter(s => s.status === 'empty').map(s => ({ ...s, rackLetter: r.letter })));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={STYLES.card}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 600, color: '#0f172a', margin: 0, fontSize: '16px' }}>Register Incoming Parcel</h3>
          <button type="button" onClick={onOpenScanner} style={STYLES.btnSecondary} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}>
            <Icons.Barcode width={18} height={18} />Scan Barcode
          </button>
        </div>
        <form onSubmit={onAdd} style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tracking Number {scannedTracking && <span style={{ color: '#16a34a', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}>✓ Scanned from barcode</span>}
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={form.trackingNo} onChange={up('trackingNo')} placeholder="Tracking Number (or scan barcode)" style={{ ...STYLES.input, flex: 1, borderColor: scannedTracking ? '#86efac' : '#cbd5e1' }} required />
              <button type="button" onClick={onOpenScanner} style={{ ...STYLES.btnSecondary, flexShrink: 0, padding: '10px 14px' }} title="Scan barcode">
                <Icons.Camera width={18} height={18} />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <select value={form.sender} onChange={up('sender')} style={{ ...STYLES.input, backgroundColor: '#ffffff' }} required>
              <option value="" disabled>Select Courier</option>
              {COURIERS.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
            </select>
            {isOthers && <input value={form.senderOther} onChange={up('senderOther')} placeholder="Enter courier name" style={STYLES.input} required={isOthers} />}
          </div>
          <input value={form.recipient} onChange={up('recipient')} placeholder="Recipient Username" style={STYLES.input} required />
          <select value={form.status} onChange={up('status')} style={{ ...STYLES.input, backgroundColor: '#ffffff' }}>
            <option>Pending</option>
            <option>Arrived</option>
            <option>Overdue</option>
          </select>
          <input value={form.location} onChange={up('location')} placeholder="Storage Location" style={{ ...STYLES.input, gridColumn: '1 / -1' }} required />
          <input value={form.description} onChange={up('description')} placeholder="Package Description (Visible to User)" style={{ ...STYLES.input, gridColumn: '1 / -1' }} />

          {/* Smart Rack Assignment Section */}
          <div style={{ gridColumn: '1 / -1', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Zap width={18} height={18} style={{ color: '#4f46e5' }} />Smart Rack Assignment (IoT Integration)
            </h4>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.assignRack || false} onChange={up('assignRack')} style={{ width: '16px', height: '16px' }} />
                Assign to Smart Rack Shelf
              </label>
              {form.assignRack && (
                <select value={form.selectedRackShelf || ''} onChange={up('selectedRackShelf')} style={{ ...STYLES.input, backgroundColor: '#ffffff', fontSize: '13px' }}>
                  <option value="">Auto-find empty shelf</option>
                  {emptyShelves.map(s => (<option key={s.id} value={s.id}>Rack {s.rackLetter} - Shelf {s.id} (Empty)</option>))}
                </select>
              )}
            </div>
          </div>

          <button type="submit" style={{ ...STYLES.btnPrimary, gridColumn: '1 / -1' }}>Register Parcel</button>
        </form>
      </div>

      <div style={STYLES.card}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: 600, color: '#0f172a', margin: 0, fontSize: '16px' }}>System Parcel Management (All Records)</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={STYLES.table}>
            <thead>
              <tr>
                <th style={STYLES.th}>Tracking</th>
                <th style={STYLES.th}>Recipient</th>
                <th style={STYLES.th}>Rack</th>
                <th style={STYLES.th}>Description</th>
                <th style={STYLES.th}>Status</th>
                <th style={STYLES.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(p => (
                <tr key={p.id} style={{ transition: 'background-color 0.15s' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                  <td style={STYLES.td}><span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.trackingNo}</span></td>
                  <td style={STYLES.td}>{p.recipient}</td>
                  <td style={STYLES.td}>{p.rackLocation ? <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#4f46e5' }}>{p.rackLocation}</span> : <span style={{ color: '#94a3b8' }}>—</span>}</td>
                  <td style={{ ...STYLES.td, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description || '-'}</td>
                  <td style={STYLES.td}><span style={STYLES.badge(p.status)}>{p.status}</span></td>
                  <td style={STYLES.td}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {p.status === 'Arrived' && (
                        <button onClick={() => onRequestCollect(p)} style={{ padding: '6px 12px', backgroundColor: '#4f46e5', color: '#ffffff', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Icons.Lock width={14} height={14} />Verify
                        </button>
                      )}
                      <button onClick={() => onDelete(p.id)} style={STYLES.btnDanger}>
                        <Icons.Trash2 width={18} height={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
