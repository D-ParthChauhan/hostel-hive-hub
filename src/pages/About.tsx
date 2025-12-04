import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Target, Heart, Lightbulb } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const milestones = [
  { year: '1970', event: 'Hostel 5 Founded', description: 'Established as part of the campus expansion.' },
  { year: '1985', event: 'First Major Renovation', description: 'Modern amenities added to all floors.' },
  { year: '2000', event: 'Cultural Hub Recognition', description: 'Awarded best hostel for cultural activities.' },
  { year: '2015', event: 'Tech Infrastructure Upgrade', description: 'High-speed WiFi and smart systems installed.' },
  { year: '2023', event: 'Sustainability Initiative', description: 'Green campus certification achieved.' },
];

const values = [
  { icon: Heart, title: 'Brotherhood', description: 'A family away from home, supporting each other through thick and thin.' },
  { icon: Trophy, title: 'Excellence', description: 'Striving for the best in academics, sports, and cultural activities.' },
  { icon: Target, title: 'Leadership', description: 'Nurturing future leaders through responsibility and teamwork.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Encouraging creative thinking and novel solutions.' },
];

const About: React.FC = () => {
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
              About <span className="gradient-text">Hostel 5</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For over five decades, Hostel 5 has been more than just a place to stay – it's been a crucible where friendships are forged, leaders are born, and memories are made that last a lifetime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold mb-12 text-center"
          >
            Our <span className="gradient-text">Journey</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass rounded-2xl p-6 hover-lift">
                      <div className="font-display text-3xl font-bold gradient-text mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{milestone.event}</h3>
                      <p className="text-muted-foreground text-sm">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="w-4 h-4 rounded-full gradient-primary shadow-lg shadow-primary/30 relative z-10" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide our community and shape our culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover-lift group"
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  <value.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-display text-5xl font-bold gradient-text mb-2">500+</div>
                <div className="text-muted-foreground">Proud Residents</div>
              </div>
              <div>
                <div className="font-display text-5xl font-bold gradient-text mb-2">50+</div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </div>
              <div>
                <div className="font-display text-5xl font-bold gradient-text mb-2">10K+</div>
                <div className="text-muted-foreground">Alumni Network</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
