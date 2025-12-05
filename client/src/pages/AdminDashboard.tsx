import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { createSubreddit } from '../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [subName, setSubName] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const navigate = useNavigate();

  // Check if user is council
  const userString = localStorage.getItem('h5_user');
  const user = userString ? JSON.parse(userString).user : null;

  if (!user || user.role !== 'council') {
    return (
      <Layout>
        <div className="pt-32 text-center text-red-500 text-2xl font-bold">
          Access Denied: Council Members Only
        </div>
      </Layout>
    );
  }

  const handleCreateSubreddit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubreddit({ name: subName, description: subDesc });
      toast.success(`Subreddit r/${subName} created!`);
      setSubName('');
      setSubDesc('');
    } catch (error) {
      toast.error('Failed to create subreddit');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('h5_user');
    navigate('/login');
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-4xl font-bold gradient-text">Council Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Subreddit Card */}
          <div className="glass rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-4">Create New Community Channel</h2>
            <form onSubmit={handleCreateSubreddit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Channel Name</label>
                <Input 
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  placeholder="e.g., Gaming, Coding"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input 
                  value={subDesc}
                  onChange={(e) => setSubDesc(e.target.value)}
                  placeholder="Short description..."
                />
              </div>
              <Button type="submit" variant="glow" className="w-full">Create Channel</Button>
            </form>
          </div>

          {/* User Info Card */}
          <div className="glass rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-4">Current User</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Role:</span> <span className="text-green-500 font-bold uppercase">{user.role}</span></p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;