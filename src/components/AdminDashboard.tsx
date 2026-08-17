import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import * as XLSX from 'xlsx';
import {
  ShieldCheck,
  LogOut,
  Search,
  Download,
  Trash2,
  Eye,
  X,
  Filter,
  RefreshCw,
  UserCheck,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  Lock,
  Mail,
  Key,
  ChevronDown,
  Building2,
  FileSpreadsheet,
} from 'lucide-react';

interface RegistrationDoc {
  id: string;
  teamName?: string;
  leaderName?: string;
  email?: string;
  phone?: string;
  country?: string;
  professionalStatus?: string;
  college?: string;
  track?: string;
  stage?: string;
  oneLiner?: string;
  problemStatement?: string;
  solution?: string;
  targetMarket?: string;
  revenueModel?: string;
  teamSize?: number;
  teamMembers?: Array<{ name: string; email: string; role?: string; phone?: string }>;
  deckName?: string;
  createdAt?: any;
  submittedAtFormatted?: string;
  status?: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const formatRegisteredAtIST = (createdAt: any) => {
  if (!createdAt) return { date: 'N/A', time: 'N/A', full: 'N/A' };
  try {
    const d = typeof createdAt?.toDate === 'function' ? createdAt.toDate() : new Date(createdAt);
    if (isNaN(d.getTime())) return { date: 'N/A', time: 'N/A', full: 'N/A' };
    
    const optionsDate = { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' } as const;
    const optionsTime = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true } as const;
    
    const datePart = new Intl.DateTimeFormat('en-GB', optionsDate).format(d);
    const timePart = new Intl.DateTimeFormat('en-US', optionsTime).format(d);
    
    return {
      date: datePart,
      time: timePart,
      full: `${datePart}, ${timePart}`
    };
  } catch (e) {
    return { date: 'N/A', time: 'N/A', full: 'N/A' };
  }
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Auth form state
  const [isSignUp, setIsSignUp] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Firestore registrations
  const [registrations, setRegistrations] = useState<RegistrationDoc[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Table filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [selectedStage, setSelectedStage] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Detail Modal
  const [selectedDoc, setSelectedDoc] = useState<RegistrationDoc | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Delete Confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Live Firestore Listener for "registrations"
  useEffect(() => {
    if (!adminUser) {
      setRegistrations([]);
      return;
    }

    setLoadingData(true);
    const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: RegistrationDoc[] = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() } as RegistrationDoc);
        });
        setRegistrations(docs);
        setLoadingData(false);
      },
      (error) => {
        console.error('Error fetching registrations snapshot:', error);
        setLoadingData(false);
      }
    );

    return () => unsubscribe();
  }, [adminUser]);

  if (!isOpen) return null;

  // Handle Admin Auth
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubmitting(true);

    // Hardcoded custom credentials bypass
    if (authEmail === 'Juned@9966' && authPassword === 'Juned@9966') {
      setAdminUser({ email: 'Juned@9966', uid: 'master-juned' } as User);
      setAuthSubmitting(false);
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, authEmail, authPassword);
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
      }
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setAuthError('Invalid admin email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setAuthError('An admin account with this email already exists. Try logging in.');
      } else {
        setAuthError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Quick Demo Admin Login
  const handleQuickDemoAdminLogin = async () => {
    setAuthError('');
    setAuthSubmitting(true);
    const demoEmail = 'admin@eureka.ecell.in';
    const demoPassword = 'AdminSecret2026!';

    try {
      await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
    } catch (err: any) {
      try {
        await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
      } catch (createErr: any) {
        console.error('Quick demo login error:', createErr);
        setAuthError('Could not log in as demo admin: ' + createErr.message);
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  // Delete registration from Firestore
  const handleDeleteRegistration = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'registrations', id));
      setDeletingId(null);
      if (selectedDoc?.id === id) {
        setIsDetailModalOpen(false);
      }
    } catch (err) {
      console.error('Error deleting registration:', err);
      alert('Failed to delete document from Firestore.');
    }
  };

  // Update status in Firestore
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status: newStatus });
      if (selectedDoc && selectedDoc.id === id) {
        setSelectedDoc({ ...selectedDoc, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Export to Excel using xlsx
  const handleExportToExcel = () => {
    if (registrations.length === 0) {
      alert('No registration records available to export.');
      return;
    }

    const exportData = filteredRegistrations.map((r, index) => ({
      'S.No': index + 1,
      'Document ID': r.id,
      'Team / Startup Name': r.teamName || 'N/A',
      'Team Leader': r.leaderName || 'N/A',
      'Email ID': r.email || 'N/A',
      'Phone Number': r.phone || 'N/A',
      'College / Institution': r.college || 'N/A',
      'Track': r.track || 'N/A',
      'Stage': r.stage || 'N/A',
      'Team Size': r.teamSize || 1,
      'Elevator Pitch': r.oneLiner || 'N/A',
      'Problem Statement': r.problemStatement || 'N/A',
      'Solution': r.solution || 'N/A',
      'Target Market': r.targetMarket || 'N/A',
      'Revenue Model': r.revenueModel || 'N/A',
      'Deck File': r.deckName || 'N/A',
      'Submission Date': r.submittedAtFormatted || (r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'N/A'),
      'Status': r.status || 'Under Review',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Auto-width column adjustment
    const colWidths = Object.keys(exportData[0] || {}).map((key) => ({
      wch: Math.max(key.length, 15),
    }));
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hackathon Registrations');

    const fileName = `Eureka_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      !searchTerm ||
      (r.teamName && r.teamName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.leaderName && r.leaderName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.email && r.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.college && r.college.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.track && r.track.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.oneLiner && r.oneLiner.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTrack = selectedTrack === 'ALL' || r.track === selectedTrack;
    const matchesStage = selectedStage === 'ALL' || r.stage === selectedStage;
    const matchesStatus = selectedStatus === 'ALL' || r.status === selectedStatus;

    return matchesSearch && matchesTrack && matchesStage && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <span>Eureka! Admin Portal</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-600/30 border border-blue-500/40 text-blue-300 font-extrabold uppercase">
                  Firebase Live
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Firestore Collection: <code className="text-blue-400 font-mono">registrations</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {adminUser && (
              <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">{adminUser.email}</span>
                <button
                  onClick={handleSignOut}
                  className="ml-2 text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                  title="Sign Out Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* STATE 1: LOADING AUTH */}
          {authLoading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
              <p className="text-sm font-medium text-slate-400">Checking Firebase Authentication...</p>
            </div>
          ) : !adminUser ? (
            /* STATE 2: NOT AUTHENTICATED -> SHOW ADMIN LOGIN FORM */
            <div className="py-10 max-w-md mx-auto">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight uppercase">
                    {isSignUp ? 'Create Admin Account' : 'Admin Portal Login'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sign in with Firebase Auth to manage registrations and export data
                  </p>
                </div>

                {/* Quick Demo Login Option */}
                <button
                  onClick={handleQuickDemoAdminLogin}
                  disabled={authSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span>Quick Demo Admin Access (Instant)</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-800 w-full" />
                  <span className="bg-slate-950 px-3 text-[11px] uppercase tracking-wider font-bold text-slate-500 absolute">
                    Or use credentials
                  </span>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span>Admin Email or Username</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="admin@eureka.ecell.in or Username"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-blue-400" />
                      <span>Password</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {authError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                      {authError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authSubmitting}
                    className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {authSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                    ) : (
                      <span>{isSignUp ? 'Create Admin User' : 'Sign In'}</span>
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setAuthError('');
                    }}
                    className="text-xs text-blue-400 hover:underline font-semibold cursor-pointer"
                  >
                    {isSignUp ? 'Already have an admin account? Sign In' : 'Need to create an admin user? Sign Up'}
                  </button>
                </div>

              </div>
            </div>
          ) : (
            /* STATE 3: AUTHENTICATED ADMIN DASHBOARD */
            <div className="space-y-6">
              
              {/* Metric Cards Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Submissions</span>
                  <p className="text-2xl sm:text-3xl font-black text-white">{registrations.length}</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Under Review</span>
                  <p className="text-2xl sm:text-3xl font-black text-amber-300">
                    {registrations.filter((r) => r.status === 'Under Review' || !r.status).length}
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Shortlisted</span>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-300">
                    {registrations.filter((r) => r.status === 'Shortlisted' || r.status === 'Accepted').length}
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Filtered Records</span>
                  <p className="text-2xl sm:text-3xl font-black text-blue-300">{filteredRegistrations.length}</p>
                </div>
              </div>

              {/* Action Toolbar: Search, Filters & Excel Export */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by team, leader, email, track, college..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-3 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Dropdown Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="ALL">All Tracks</option>
                    <option value="business">Business Track</option>
                    <option value="tech">Tech Track</option>
                    <option value="green">Green Tech</option>
                    <option value="fintech">Fintech Track</option>
                    <option value="social">Social Track</option>
                  </select>

                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="ALL">All Stages</option>
                    <option value="Idea">Idea</option>
                    <option value="Prototype/MVP">Prototype / MVP</option>
                    <option value="Early Traction">Early Traction</option>
                    <option value="Revenue Generating">Revenue Generating</option>
                  </select>

                  {/* Excel Export Button */}
                  <button
                    onClick={handleExportToExcel}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export to Excel (.xlsx)</span>
                  </button>
                </div>

              </div>

              {/* Data Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto shadow-inner">
                {loadingData ? (
                  <div className="py-16 text-center space-y-2">
                    <RefreshCw className="w-6 h-6 text-blue-400 animate-spin mx-auto" />
                    <p className="text-xs text-slate-400 font-medium">Loading Firestore documents...</p>
                  </div>
                ) : filteredRegistrations.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <p className="text-sm font-bold text-slate-400">No registrations found matching criteria.</p>
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedTrack('ALL');
                          setSelectedStage('ALL');
                          setSelectedStatus('ALL');
                        }}
                        className="text-xs text-blue-400 hover:underline font-semibold"
                      >
                        Reset filters
                      </button>
                    )}
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-black tracking-wider text-[10px]">
                        <th className="p-3.5">#</th>
                        <th className="p-3.5">Startup / Team</th>
                        <th className="p-3.5">Team Leader</th>
                        <th className="p-3.5">Contact</th>
                        <th className="p-3.5">Track & Stage</th>
                        <th className="p-3.5">College</th>
                        <th className="p-3.5">Registered At</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredRegistrations.map((reg, idx) => (
                        <tr key={reg.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-3.5 text-slate-500 font-mono">{idx + 1}</td>
                          <td className="p-3.5">
                            <span className="font-bold text-white text-sm block">{reg.teamName || 'Untitled Team'}</span>
                            <span className="text-[10px] text-slate-400 truncate block max-w-[200px]" title={reg.oneLiner}>
                              {reg.oneLiner || 'No pitch elevator pitch provided'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-slate-200 font-semibold block">{reg.leaderName || 'N/A'}</span>
                            <span className="text-[10px] text-slate-500 block">{reg.professionalStatus || 'Student'}</span>
                          </td>
                          <td className="p-3.5 space-y-0.5">
                            <div className="text-slate-300">{reg.email || 'N/A'}</div>
                            <div className="text-slate-500 text-[10px]">{reg.phone || 'N/A'}</div>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50 text-[10px] font-bold uppercase block w-max">
                              {reg.track || 'General'}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">{reg.stage || 'Idea'}</span>
                          </td>
                          <td className="p-3.5 text-slate-300">{reg.college || 'N/A'}</td>
                          <td className="p-3.5 text-slate-400 whitespace-nowrap">
                            {formatRegisteredAtIST(reg.createdAt).full}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={reg.status || 'Under Review'}
                              onChange={(e) => handleUpdateStatus(reg.id, e.target.value)}
                              className="bg-slate-900 border border-slate-700 text-xs font-bold rounded px-2 py-1 focus:outline-none cursor-pointer"
                            >
                              <option value="Under Review">Under Review</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedDoc(reg);
                                setIsDetailModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors cursor-pointer"
                              title="View Full Submission"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingId(reg.id)}
                              className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors cursor-pointer"
                              title="Delete Document"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* DETAIL MODAL FOR SELECTED REGISTRATION */}
      {isDetailModalOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 space-y-6 max-h-[85vh] overflow-y-auto text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-white">{selectedDoc.teamName}</h3>
                <p className="text-xs text-blue-400 font-mono">ID: {selectedDoc.id}</p>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 font-bold block uppercase">Team Leader</span>
                  <span className="text-white font-semibold">{selectedDoc.leaderName}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block uppercase">Contact Email</span>
                  <span className="text-white font-semibold">{selectedDoc.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block uppercase">Phone Number</span>
                  <span className="text-white font-semibold">{selectedDoc.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block uppercase">College / Organization</span>
                  <span className="text-white font-semibold">{selectedDoc.college}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-800/50">
                  <span className="text-slate-500 font-bold block uppercase">Registered At</span>
                  <div className="text-white font-semibold">
                    {formatRegisteredAtIST(selectedDoc.createdAt).full}
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                      Date: {formatRegisteredAtIST(selectedDoc.createdAt).date} | Time: {formatRegisteredAtIST(selectedDoc.createdAt).time}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block uppercase mb-1">One-Liner Pitch</span>
                <p className="p-3 bg-slate-950 rounded-xl text-slate-300 leading-relaxed">
                  {selectedDoc.oneLiner || 'N/A'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block uppercase mb-1">Problem Statement</span>
                <p className="p-3 bg-slate-950 rounded-xl text-slate-300 leading-relaxed">
                  {selectedDoc.problemStatement || 'N/A'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block uppercase mb-1">Proposed Solution</span>
                <p className="p-3 bg-slate-950 rounded-xl text-slate-300 leading-relaxed">
                  {selectedDoc.solution || 'N/A'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 font-bold block uppercase mb-1">Target Market</span>
                  <p className="p-2.5 bg-slate-950 rounded-xl text-slate-300">{selectedDoc.targetMarket || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block uppercase mb-1">Revenue Model</span>
                  <p className="p-2.5 bg-slate-950 rounded-xl text-slate-300">{selectedDoc.revenueModel || 'N/A'}</p>
                </div>
              </div>

              {selectedDoc.teamMembers && selectedDoc.teamMembers.length > 0 && (
                <div>
                  <span className="text-slate-400 font-bold block uppercase mb-2">Co-founders & Team Members</span>
                  <div className="space-y-1.5">
                    {selectedDoc.teamMembers.map((m, i) => (
                      <div key={i} className="p-2 bg-slate-950 rounded-lg flex justify-between items-center text-slate-300">
                        <span>{m.name || 'Member'}</span>
                        <span className="text-slate-500">{m.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 text-center">
            <h4 className="text-lg font-black text-white">Delete Registration?</h4>
            <p className="text-xs text-slate-400">
              This action will permanently delete this document from Firestore.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRegistration(deletingId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
