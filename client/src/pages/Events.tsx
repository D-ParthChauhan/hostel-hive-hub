import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const upcomingEvents = [
  {
    id: 1,
    title: 'Fresher Welcome Party',
    date: '2024-08-15',
    time: '6:00 PM',
    location: 'Main Auditorium',
    description: 'Welcome the new batch with cultural performances, games, and refreshments.',
    attendees: 150,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
  },
  {
    id: 2,
    title: 'Inter-Hostel Cricket Tournament',
    date: '2024-08-20',
    time: '9:00 AM',
    location: 'Sports Ground',
    description: 'Annual cricket championship between all hostels. Come support Team H5!',
    attendees: 80,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
  },
  {
    id: 3,
    title: 'Tech Talk: AI & Future',
    date: '2024-08-25',
    time: '4:00 PM',
    location: 'Common Room',
    description: 'Industry expert sharing insights on AI trends and career opportunities.',
    attendees: 60,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
  },
  {
    id: 4,
    title: 'Movie Night',
    date: '2024-08-30',
    time: '8:00 PM',
    location: 'TV Room',
    description: 'Weekend movie screening with popcorn and refreshments.',
    attendees: 40,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
  },
];

const pastEvents = [
  {
    id: 5,
    title: 'Annual Day Celebration',
    date: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
  },
  {
    id: 6,
    title: 'Republic Day Event',
    date: '2024-01-26',
    image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400',
  },
  {
    id: 7,
    title: 'Diwali Celebration',
    date: '2023-11-12',
    image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400',
  },
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const Events: React.FC = () => {
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
              Events & <span className="gradient-text">Activities</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay updated with the latest happenings at Hostel 5. From cultural nights to sports tournaments, there's always something exciting going on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold mb-12"
          >
            Upcoming <span className="gradient-text">Events</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-3xl overflow-hidden hover-lift group"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        Upcoming
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        {event.attendees} interested
                      </div>
                    </div>

                    <Button variant="glow" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold mb-12"
          >
            Past <span className="gradient-text">Events</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden hover-lift group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-display font-semibold">{event.title}</h3>
                    <span className="text-white/70 text-sm">{formatDate(event.date)}</span>
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

export default Events;
