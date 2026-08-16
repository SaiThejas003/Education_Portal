import { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, X, Save, GraduationCap, UserCog } from 'lucide-react';
import PortalLayout from '../../components/PortalLayout';
import PageHeader from '../../components/PageHeader';
import { useApp } from '../../store/AppContext';
import type { ManagedUser, Role } from '../../data/types';

export default function AdminManageUsers() {
  const { managedUsers, addManagedUser, updateManagedUser, deleteManagedUser } = useApp();
  const [filter, setFilter] = useState<'all' | 'student' | 'faculty' | 'admin'>('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<ManagedUser | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ManagedUser | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'student' as Role,
    department: '',
    rollNo: '',
    employeeId: '',
    year: 1,
    designation: '',
    status: 'active' as 'active' | 'inactive',
  });

  const filtered = managedUsers.filter((u) => {
    const matchFilter = filter === 'all' || u.role === filter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || (u.rollNo ?? '').toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const openCreate = () => {
    setEditTarget(null);
    setForm({ name: '', email: '', role: 'student', department: '', rollNo: '', employeeId: '', year: 1, designation: '', status: 'active' });
    setShowForm(true);
  };

  const openEdit = (u: ManagedUser) => {
    setEditTarget(u);
    setForm({
      name: u.name, email: u.email, role: u.role, department: u.department ?? '', rollNo: u.rollNo ?? '',
      employeeId: u.employeeId ?? '', year: u.year ?? 1, designation: u.designation ?? '', status: u.status,
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (editTarget) {
      updateManagedUser(editTarget.id, form);
    } else {
      addManagedUser(form);
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      deleteManagedUser(confirmDelete.id);
      setConfirmDelete(null);
    }
  };

  const filters: { key: 'all' | 'student' | 'faculty' | 'admin'; label: string; count: number }[] = [
    { key: 'all', label: 'All Users', count: managedUsers.length },
    { key: 'student', label: 'Students', count: managedUsers.filter((u) => u.role === 'student').length },
    { key: 'faculty', label: 'Faculty', count: managedUsers.filter((u) => u.role === 'faculty').length },
    { key: 'admin', label: 'Administrators', count: managedUsers.filter((u) => u.role === 'admin').length },
  ];

  return (
    <PortalLayout role="admin">
      <PageHeader
        title="Manage Users"
        subtitle="CRUD operations on student and faculty profiles"
        icon={<Users className="h-5 w-5" />}
        actions={<button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add User</button>}
      />

      {/* Filters & Search */}
      <div className="card mb-6 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.key ? 'bg-crimson-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>
          <div className="relative lg:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="input-field pl-9 py-2" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Department / ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} className="table-row-hover">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson-700 text-xs font-bold text-white">
                        {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`badge ${u.role === 'student' ? 'bg-crimson-50 text-crimson-700' : u.role === 'faculty' ? 'bg-ai-50 text-ai-600' : 'bg-gray-100 text-gray-600'}`}>
                      {u.role === 'student' ? <GraduationCap className="h-3 w-3" /> : <UserCog className="h-3 w-3" />} {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {u.department ?? u.designation ?? '-'}
                    {(u.rollNo || u.employeeId) && <span className="block text-xs text-gray-400">{u.rollNo ?? u.employeeId}</span>}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`badge ${u.status === 'active' ? 'bg-mint-100 text-mint-700' : 'bg-gray-100 text-gray-500'}`}>{u.status}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{u.joinedDate}</td>
                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(u)} className="rounded-lg p-2 text-gray-500 hover:bg-crimson-50 hover:text-crimson-700"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => setConfirmDelete(u)} className="rounded-lg p-2 text-gray-500 hover:bg-crimson-50 hover:text-crimson-700"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">No users found</div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <div className="relative z-10 w-full max-w-lg max-h-[90vh] animate-scale-in overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">{editTarget ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Enter name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="user@kit.edu.in" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Role</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })} className="input-field">
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })} className="input-field">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Department</label>
                <input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="input-field" placeholder="Department" />
              </div>
              {form.role === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Roll No.</label>
                    <input type="text" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} className="input-field" placeholder="24EEE042" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Year</label>
                    <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 1 })} className="input-field" />
                  </div>
                </div>
              )}
              {form.role === 'faculty' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Employee ID</label>
                    <input type="text" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} className="input-field" placeholder="KIT-FAC-XXX" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Designation</label>
                    <input type="text" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="input-field" placeholder="Professor" />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSave} disabled={!form.name || !form.email} className="btn-primary flex-1"><Save className="h-4 w-4" /> {editTarget ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmDelete(null)} />
          <div className="relative z-10 w-full max-w-sm animate-scale-in rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-crimson-50 text-crimson-700"><Trash2 className="h-6 w-6" /></div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">Delete User?</h3>
            <p className="mt-1 text-sm text-gray-500">Are you sure you want to delete <span className="font-semibold">{confirmDelete.name}</span>? This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleDelete} className="flex-1 rounded-lg bg-crimson-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crimson-800">Delete</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
