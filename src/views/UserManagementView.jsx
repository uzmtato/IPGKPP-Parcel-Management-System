import { Icons } from '../components/Icons';
import { createStyles } from '../utils/theme';

export function UserManagementView({ users = [], userForm, setUserForm, onSaveUser, onEditUser, onDeleteUser, onCancelUserEdit, theme }) {
  const styles = createStyles(theme);
  const upUser = (k) => (e) => setUserForm(prev => ({ ...prev, [k]: e.target.value }));
  const roleRank = { student: 1, staff: 2 };
  const managedUsers = users
    .filter(u => u.role === 'student' || u.role === 'staff')
    .sort((a, b) => (roleRank[a.role] || 99) - (roleRank[b.role] || 99) || (a.name || a.username || '').localeCompare(b.name || b.username || ''));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={styles.card}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <h3 style={{ fontWeight: 600, color: theme.text, margin: 0, fontSize: '16px' }}>Student & Staff Management</h3>
        </div>
        <form onSubmit={onSaveUser} style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <input value={userForm.name} onChange={upUser('name')} placeholder="Full Name" style={styles.input} required />
          <input value={userForm.username} onChange={upUser('username')} placeholder="Username" style={styles.input} required />
          <input value={userForm.email} onChange={upUser('email')} type="email" placeholder="Email Address" style={styles.input} required />
          <input value={userForm.idNo} onChange={upUser('idNo')} placeholder={userForm.role === 'student' ? "Matric Number" : "Staff ID Number"} style={styles.input} required />
          <input value={userForm.phone} onChange={upUser('phone')} type="tel" placeholder="Phone Number" style={styles.input} required />
          <input value={userForm.password} onChange={upUser('password')} type="password" placeholder={userForm.id ? 'New password (optional)' : 'Password'} style={styles.input} required={!userForm.id} />
          <select value={userForm.role} onChange={upUser('role')} style={styles.input}>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" style={{ ...styles.btnPrimary, flex: 1 }}>{userForm.id ? 'Update User' : 'Add User'}</button>
            {userForm.id && (
              <button type="button" onClick={onCancelUserEdit} style={{ ...styles.btnSecondary, justifyContent: 'center' }}>Cancel</button>
            )}
          </div>
        </form>
        <div style={{ overflowX: 'auto', borderTop: `1px solid ${theme.border}` }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Matric / ID</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {managedUsers.length === 0 ? (
                <tr><td colSpan="6" style={{ ...styles.td, textAlign: 'center', color: theme.textSecondary }}>No student or staff accounts yet</td></tr>
              ) : managedUsers.map(u => (
                <tr key={u.id || u.username}>
                  <td style={styles.td}>{u.name || '-'}</td>
                  <td style={styles.td}><span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{u.username}</span></td>
                  <td style={styles.td}><span style={styles.badge(u.role === 'staff' ? 'Arrived' : 'Pending')}>{u.role === 'staff' ? 'Staff' : 'Student'}</span></td>
                  <td style={styles.td}>{u.idNo || u.id_no || '-'}</td>
                  <td style={styles.td}>{u.phone || '-'}</td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button type="button" onClick={() => onEditUser(u)} style={styles.btnSecondary}><Icons.Edit width={16} height={16} />Edit</button>
                      <button type="button" onClick={() => onDeleteUser(u)} style={styles.btnDanger} title="Delete user"><Icons.Trash2 width={18} height={18} /></button>
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