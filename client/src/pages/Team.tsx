import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const warden = {
  name: 'Dr. Rajesh Kumar',
  role: 'Warden',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
  email: 'warden.h5@iit.edu',
  phone: '+91 XXX XXX XXXX',
  bio: 'Professor of Computer Science with 20+ years of experience in academia and administration.',
};

const assistantWarden = {
  name: 'Dr. Priya Sharma',
  role: 'Assistant Warden',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
  email: 'asst.warden.h5@iit.edu',
  phone: '+91 XXX XXX XXXX',
  bio: 'Associate Professor of Physics, dedicated to student welfare and hostel management.',
};

const council = [
  {
    name: 'Arjun Patel',
    role: 'General Secretary',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    email: 'gs.h5@iit.edu',
  },
  {
    name: 'Neha Gupta',
    role: 'Mess Secretary',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    email: 'mess.h5@iit.edu',
  },
  {
    name: 'Vikram Singh',
    role: 'Sports Secretary',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    email: 'sports.h5@iit.edu',
  },
  {
    name: 'Ananya Reddy',
    role: 'Cultural Secretary',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    email: 'cultural.h5@iit.edu',
  },
  {
    name: 'Rohit Mehta',
    role: 'Tech Secretary',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    email: 'tech.h5@iit.edu',
  },
  {
    name: 'Kavya Nair',
    role: 'Maintenance Secretary',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    email: 'maintenance.h5@iit.edu',
  },
];

const Team: React.FC = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Meet the dedicated team working tirelessly to make Hostel 5 the best place to live and thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Warden Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold mb-12 text-center"
          >
            Administration
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Warden Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-6 hover-lift"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 ring-4 ring-primary/20">
                  <img
                    src={warden.image}
                    alt={warden.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold">{warden.name}</h3>
                <span className="text-primary font-medium text-sm mb-3">{warden.role}</span>
                <p className="text-muted-foreground text-sm mb-4">{warden.bio}</p>
                <div className="flex flex-col gap-2 text-sm">
                  <a href={`mailto:${warden.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    {warden.email}
                  </a>
                  <a href={`tel:${warden.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    {warden.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Assistant Warden Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-6 hover-lift"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 ring-4 ring-primary/20">
                  <img
                    src={assistantWarden.image}
                    alt={assistantWarden.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold">{assistantWarden.name}</h3>
                <span className="text-primary font-medium text-sm mb-3">{assistantWarden.role}</span>
                <p className="text-muted-foreground text-sm mb-4">{assistantWarden.bio}</p>
                <div className="flex flex-col gap-2 text-sm">
                  <a href={`mailto:${assistantWarden.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    {assistantWarden.email}
                  </a>
                  <a href={`tel:${assistantWarden.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    {assistantWarden.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Council Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold mb-12 text-center"
          >
            Student <span className="gradient-text">Council</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {council.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover-lift group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold truncate">{member.name}</h3>
                    <span className="text-primary text-sm font-medium">{member.role}</span>
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-1 text-muted-foreground text-xs mt-1 hover:text-primary transition-colors"
                    >
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
