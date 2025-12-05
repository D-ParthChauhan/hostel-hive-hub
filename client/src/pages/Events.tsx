import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';
// Changed to relative import
import Layout from '../components/layout/Layout';
// Changed to relative import
import { Button } from '../components/ui/button';
// Changed to relative import
import { fetchEvents } from '../services/api';
import { Link } from 'react-router-dom';

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  image?: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Check if user is council
  const userString = localStorage.getItem('h5_user');
  const user = userString ? JSON.parse(userString).user : null;
  const isCouncil = user?.role === 'council';

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data } = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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
              Events & <span className="gradient-text">Activities</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Stay updated with the latest happenings at Hostel 5.
            </p>
            
            {isCouncil && (
              <Link to="/admin">
                <Button variant="glow" className="gap-2">
                  <Plus className="h-4 w-4" /> Manage Events
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

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

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl">
              <p className="text-xl text-muted-foreground">No upcoming events scheduled.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-3xl overflow-hidden hover-lift group"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Fallback image logic or real image if available */}
                    <div className="md:w-2/5 bg-muted flex items-center justify-center min-h-[200px] md:min-h-full">
                       {event.image ? (
                         <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                       ) : (
                         <Calendar className="h-12 w-12 text-muted-foreground/50" />
                       )}
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="font-display text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
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
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;