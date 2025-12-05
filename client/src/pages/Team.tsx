import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User as UserIcon } from 'lucide-react';
// Changed to relative import
import Layout from '../components/layout/Layout';
// Changed to relative import
import { fetchUsers } from '../services/api';

// Interface for User data from API
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  phoneNumber?: string;
  roomNumber?: string;
}

const Team: React.FC = () => {
  const [coreCouncil, setCoreCouncil] = useState<User[]>([]);
  const [studentCouncil, setStudentCouncil] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const { data } = await fetchUsers();
        
        // Filter users based on roles
        const core = data.filter((u: User) => u.role === 'council');
        const student = data.filter((u: User) => u.role === 'student_council');
        
        setCoreCouncil(core);
        setStudentCouncil(student);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  // Helper to render a card (DRY principle)
  const renderMemberCard = (member: User, title: string) => (
    <motion.div
      key={member._id}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass rounded-3xl p-6 hover-lift"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 ring-4 ring-primary/20 bg-muted flex items-center justify-center">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className="h-12 w-12 text-primary/50" />
          )}
        </div>
        <h3 className="font-display text-xl font-semibold">{member.name}</h3>
        {/* Display the passed title (e.g. Warden) or map the role */}
        <span className="text-primary font-medium text-sm mb-3">
            {title}
        </span>
        
        {/* Bio placeholder if you want one, or remove */}
        <p className="text-muted-foreground text-sm mb-4">Dedicated to serving the hostel community.</p>

        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            {member.email}
          </a>
          {member.phoneNumber && (
            <a href={`tel:${member.phoneNumber}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              {member.phoneNumber}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

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

      {/* Administration Section (Core Council) */}
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

          {loading ? (
            <div className="text-center py-10 text-muted-foreground">Loading administration...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-center">
              {coreCouncil.length > 0 ? (
                coreCouncil.map((member) => renderMemberCard(member, 'Core Council'))
              ) : (
                <p className="col-span-full text-center text-muted-foreground">No administration members found.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Student Council Section */}
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

          {loading ? (
             <div className="text-center py-10 text-muted-foreground">Loading council...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentCouncil.length > 0 ? (
                studentCouncil.map((member, index) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-6 hover-lift group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all shrink-0 bg-muted flex items-center justify-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserIcon className="h-8 w-8 text-primary/50" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold truncate">{member.name}</h3>
                        <span className="text-primary text-sm font-medium">Student Council</span>
                        
                        <div className="flex flex-col gap-1 mt-2">
                          <a 
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-1 text-muted-foreground text-xs hover:text-primary transition-colors"
                          >
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{member.email}</span>
                          </a>
                          {member.phoneNumber && (
                            <a 
                              href={`tel:${member.phoneNumber}`}
                              className="flex items-center gap-1 text-muted-foreground text-xs hover:text-primary transition-colors"
                            >
                              <Phone className="h-3 w-3" />
                              <span className="truncate">{member.phoneNumber}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground">No student council members found.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Team;