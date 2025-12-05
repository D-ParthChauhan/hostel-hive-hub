import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, UserCog, User, Phone } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { fetchUsers } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  roomNumber: string;
  rollNumber?: string;
  phoneNumber?: string;
  image?: string;
}

const Team: React.FC = () => {
  const [coreCouncil, setCoreCouncil] = useState<User[]>([]);
  const [studentCouncil, setStudentCouncil] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const { data } = await fetchUsers();
        setCoreCouncil(data.filter((u: User) => u.role === 'council'));
        setStudentCouncil(data.filter((u: User) => u.role === 'student_council'));
      } catch (error) {
        console.error("Failed to fetch team", error);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  const MemberCard = ({ member }: { member: User }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 hover-lift group"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-white/20 shadow-xl">
          {member.image ? (
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              {member.role === 'council' ? <UserCog className="h-12 w-12 text-primary" /> : <User className="h-12 w-12 text-primary" />}
            </div>
          )}
        </div>
        
        <h3 className="font-display font-bold text-xl mb-1">{member.name}</h3>
        <span className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
          member.role === 'council' ? 'text-red-500' : 'text-blue-500'
        }`}>
          {member.role === 'council' ? 'Core Council' : 'Student Council'}
        </span>
        
        <div className="space-y-2 text-sm text-muted-foreground w-full">
           {member.rollNumber && <p className="bg-white/50 rounded py-1">Roll: {member.rollNumber}</p>}
           <p>Room: {member.roomNumber}</p>
           
           <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-border/50 w-full">
             <a href={`mailto:${member.email}`} className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
               <Mail className="h-5 w-5" />
             </a>
             {member.phoneNumber && (
               <a href={`tel:${member.phoneNumber}`} className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                 <Phone className="h-5 w-5" />
               </a>
             )}
           </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Layout>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Leadership <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Meet the dedicated students driving Hostel 5 forward.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
         <div className="text-center py-20">Loading team data...</div>
      ) : (
        <>
          {/* Core Council Section */}
          <section className="py-10">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-border"></div>
                <h2 className="font-display text-3xl font-bold text-center">Core Council</h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreCouncil.map((member) => <MemberCard key={member._id} member={member} />)}
                {coreCouncil.length === 0 && <p className="text-center col-span-3 text-muted-foreground">No core council members found.</p>}
              </div>
            </div>
          </section>

          {/* Student Council Section */}
          <section className="py-10 pb-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-border"></div>
                <h2 className="font-display text-3xl font-bold text-center text-blue-600">Student Council</h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {studentCouncil.map((member) => <MemberCard key={member._id} member={member} />)}
                {studentCouncil.length === 0 && <p className="text-center col-span-4 text-muted-foreground">No student council members found.</p>}
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default Team;