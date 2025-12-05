import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { createSubreddit, fetchUsers, createUser, deleteUser, createEvent } from '../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Trash2, UserPlus, Calendar, MessageSquare, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("students");
  
  // State for Community
  const [subName, setSubName] = useState('');
  const [subDesc, setSubDesc] = useState('');

  // State for Users
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: 'password123', role: 'student', roomNumber: '' });

  // State for Events
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', description: '' });

  // Auth Check
  const userString = localStorage.getItem('h5_user');
  const currentUser = userString ? JSON.parse(userString).user : null;

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'council') {
      // Allow render to finish before redirecting (avoids flicker/errors)
    } else {
      loadUsers();
    }
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('h5_user');
    navigate('/login');
  };

  // --- Handlers ---

  const handleCreateSubreddit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubreddit({ name: subName, description: subDesc });
      toast.success(`Subreddit r/${subName} created!`);
      setSubName(''); setSubDesc('');
    } catch (error) {
      toast.error('Failed to create subreddit');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      toast.success('User added successfully');
      setNewUser({ name: '', email: '', password: 'password123', role: 'student', roomNumber: '' });
      loadUsers();
    } catch (error) {
      toast.error('Failed to add user');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      await deleteUser(id);
      toast.success('User deleted');
      loadUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent(newEvent);
      toast.success('Event published!');
      setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  if (!currentUser || currentUser.role !== 'council') {
    return (
      <Layout>
        <div className="pt-32 text-center text-red-500 text-2xl font-bold">
          Access Denied: Council Members Only
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-28 pb-20 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold gradient-text">Council Dashboard</h1>
            <p className="text-muted-foreground">Manage students, events, and community.</p>
          </div>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>

        <Tabs defaultValue="students" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="students" className="gap-2"><Users className="h-4 w-4"/> Students</TabsTrigger>
            <TabsTrigger value="events" className="gap-2"><Calendar className="h-4 w-4"/> Events</TabsTrigger>
            <TabsTrigger value="community" className="gap-2"><MessageSquare className="h-4 w-4"/> Community</TabsTrigger>
          </TabsList>

          {/* --- STUDENT MANAGEMENT TAB --- */}
          <TabsContent value="students" className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary"/> Add New Student
              </h2>
              <form onSubmit={handleAddUser} className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} required />
                <Input placeholder="Email" type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
                <Input placeholder="Default Password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required />
                <Input placeholder="Room Number" value={newUser.roomNumber} onChange={e => setNewUser({...newUser, roomNumber: e.target.value})} required />
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newUser.role} 
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="student">Student</option>
                  <option value="council">Council</option>
                </select>
                <Button type="submit" variant="glow">Register User</Button>
              </form>
            </div>

            <div className="glass rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4">Student Database</h2>
              <div className="space-y-2">
                {users.map((u: any) => (
                  <div key={u._id} className="flex justify-between items-center p-3 bg-white/50 rounded-lg border">
                    <div>
                      <p className="font-semibold">{u.name} <span className="text-xs text-muted-foreground">({u.role})</span></p>
                      <p className="text-sm text-muted-foreground">{u.email} | Room: {u.roomNumber}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(u._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* --- EVENT MANAGEMENT TAB --- */}
          <TabsContent value="events">
            <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold mb-4">Publish New Event</h2>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <Input placeholder="Event Title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} required />
                  <Input type="time" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} required />
                </div>
                <Input placeholder="Location" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} required />
                <Input placeholder="Description" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} required />
                <Button type="submit" variant="glow" className="w-full">Publish Event</Button>
              </form>
            </div>
          </TabsContent>

          {/* --- COMMUNITY MANAGEMENT TAB --- */}
          <TabsContent value="community">
            <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold mb-4">Create Community Channel</h2>
              <form onSubmit={handleCreateSubreddit} className="space-y-4">
                <Input placeholder="Channel Name (e.g. Gaming)" value={subName} onChange={e => setSubName(e.target.value)} required />
                <Input placeholder="Description" value={subDesc} onChange={e => setSubDesc(e.target.value)} required />
                <Button type="submit" variant="glow" className="w-full">Create Channel</Button>
              </form>
            </div>
          </TabsContent>

        </Tabs>
      </section>
    </Layout>
  );
};

export default AdminDashboard;