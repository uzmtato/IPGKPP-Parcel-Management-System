import { useState } from 'react';
import { Icons } from '../components/Icons';
import { createStyles } from '../utils/theme';
import { IPGKPP_LOGO } from '../utils/constants';

export function AuthView({ onLogin, onSignUp, view, setView, theme }) {
  const [authMode, setAuthMode] = useState('user'); // 'user' or 'admin'

  return (
    <div style={{ minHeight: '100vh', background: authMode === 'admin' ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' : 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <img src={IPGKPP_LOGO} alt="IPGKPP" style={{ width: '360px', height: 'auto', marginBottom: '16px', objectFit: 'contain' }} />
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.025em' }}>IPGKPP Smart Rack Parcel Management System</h1>
        <p style={{ color: '#c7d2fe', marginTop: '4px', fontSize: '13px' }}>{authMode === 'admin' ? 'Administrator Secure Login Portal' : 'Student & Staff Parcel Portal'}</p>
      </div>
      <div style={{ width: '100%', maxWidth: '448px', backgroundColor: theme.authCardBg || '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: `1px solid ${theme.authBorder || '#f1f5f9'}` }}>
          {authMode === 'user' ? (
            <>
              <button onClick={() => setView('login')} style={{ flex: 1, padding: '16px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', borderBottom: view === 'login' ? '2px solid #4f46e5' : 'none', backgroundColor: view === 'login' ? (theme.authTabActive || '#eef2ff') : 'transparent', color: view === 'login' ? (theme.authTabActiveText || '#4f46e5') : (theme.authTabInactiveText || '#64748b'), transition: 'all 0.15s' }}>Pelajar / Staf Sign In</button>
              <button onClick={() => setView('signup')} style={{ flex: 1, padding: '16px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', borderBottom: view === 'signup' ? '2px solid #4f46e5' : 'none', backgroundColor: view === 'signup' ? (theme.authTabActive || '#eef2ff') : 'transparent', color: view === 'signup' ? (theme.authTabActiveText || '#4f46e5') : (theme.authTabInactiveText || '#64748b'), transition: 'all 0.15s' }}>Daftar Akaun</button>
            </>
          ) : (
            <div style={{ flex: 1, padding: '16px', fontSize: '14px', fontWeight: 800, textAlign: 'center', backgroundColor: '#1e1b4b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Icons.Shield width={18} height={18} /> Administrator Login
            </div>
          )}
        </div>
        <div style={{ padding: '32px' }}>
          {view === 'login' || authMode === 'admin' ? (
            <LoginForm onLogin={(u, p) => onLogin(u, p, authMode)} theme={theme} isAdmin={authMode === 'admin'} />
          ) : (
            <SignUpForm onSignUp={onSignUp} theme={theme} />
          )}
        </div>
        <div style={{ padding: '12px', borderTop: `1px solid ${theme.authBorder || '#f1f5f9'}`, textAlign: 'center', backgroundColor: theme.authCardBg || '#ffffff' }}>
          <button
            onClick={() => { setAuthMode(authMode === 'user' ? 'admin' : 'user'); setView('login'); }}
            style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            {authMode === 'user' ? 'Akses Portal Admin' : 'Kembali ke Portal Pelajar/Staf'}
          </button>
        </div>
      </div>
      <footer style={{ marginTop: '32px', textAlign: 'center', color: theme.footerText || '#94a3b8', fontSize: '12px' }}>© {new Date().getFullYear()} IPGKPP Campus Logistics. All rights reserved.</footer>
    </div>
  );
}

function LoginForm({ onLogin, theme, isAdmin = false }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const styles = createStyles(theme);
  return (
    <form onSubmit={e => { e.preventDefault(); onLogin(u, p); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: theme.text, marginBottom: '4px' }}>{isAdmin ? 'Admin Username' : 'Username'}</label>
        <input value={u} onChange={e => setU(e.target.value)} style={{ ...styles.input, boxSizing: 'border-box' }} placeholder={isAdmin ? "Enter admin ID" : "e.g. student1, staff1"} required />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: theme.text, marginBottom: '4px' }}>Password</label>
        <input type="password" value={p} onChange={e => setP(e.target.value)} style={{ ...styles.input, boxSizing: 'border-box' }} placeholder="••••••••" required />
      </div>
      <button type="submit" style={{ ...styles.btnPrimary, backgroundColor: isAdmin ? '#1e1b4b' : '#4f46e5' }}>
        {isAdmin ? 'Sign In as Administrator' : 'Access Portal'}
      </button>
      <p style={{ fontSize: '11px', color: theme.textMuted, textAlign: 'center', margin: 0 }}>
        {isAdmin ? 'This portal is restricted to authorized personnel only.' : 'Sign in with your registered IPGKPP parcel account.'}
      </p>
    </form>
  );
}

function SignUpForm({ onSignUp, theme }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ username: '', email: '', password: '', name: '', idNo: '', phone: '', role: 'student' });
  const styles = createStyles(theme);
  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => Math.max(1, s - 1));
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={step === 3 ? e => { e.preventDefault(); onSignUp(form); } : e => { e.preventDefault(); next(); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        {[1, 2, 3].map(s => <div key={s} style={{ height: '4px', flex: 1, borderRadius: '9999px', backgroundColor: s <= step ? '#4f46e5' : theme.border }} />)}
      </div>
      {step === 1 && <>
        <input name="username" value={form.username} onChange={handleChange} style={styles.input} placeholder="Username" required />
        <input name="email" value={form.email} onChange={handleChange} type="email" style={styles.input} placeholder="Email Address" required />
        <input name="password" value={form.password} onChange={handleChange} type="password" style={styles.input} placeholder="Password" required />
        <button type="button" onClick={next} style={styles.btnPrimary}>Continue</button>
      </>}
      {step === 2 && <>
        <input name="name" value={form.name} onChange={handleChange} style={styles.input} placeholder="Full Name" required />
        <input name="idNo" value={form.idNo} onChange={handleChange} style={styles.input} placeholder={form.role === 'student' ? "Matric Number" : "Staff ID Number"} required />
        <input name="phone" value={form.phone} onChange={handleChange} type="tel" style={styles.input} placeholder="Phone Number" required />
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={prev} style={{ ...styles.btnPrimary, backgroundColor: styles.btnSecondaryBg, color: styles.btnSecondaryText }}>Back</button>
          <button type="button" onClick={next} style={styles.btnPrimary}>Next</button>
        </div>
      </>}
      {step === 3 && <>
        <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={prev} style={{ ...styles.btnPrimary, backgroundColor: styles.btnSecondaryBg, color: styles.btnSecondaryText }}>Back</button>
          <button type="submit" style={{ ...styles.btnPrimary, backgroundColor: '#16a34a' }}>Complete Registration</button>
        </div>
      </>}
    </form>
  );
}