import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, Utensils, Dumbbell, BookOpen, Shirt, 
  Gamepad2, Coffee, Tv, Shield, Car, TreeDeciduous, Users 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';

const facilities = [
  {
    icon: Utensils,
    title: 'Mess Hall',
    description: 'Spacious dining area serving nutritious meals with diverse menu options including regional cuisines.',
    features: ['Breakfast, Lunch, Dinner', 'Weekend Special Menu', 'Hygienic Kitchen'],
  },
  {
    icon: Wifi,
    title: 'High-Speed WiFi',
    description: 'Campus-wide high-speed internet connectivity for seamless academic and personal use.',
    features: ['24/7 Availability', '100 Mbps Speed', 'Secure Network'],
  },
  {
    icon: Dumbbell,
    title: 'Gymnasium',
    description: 'Fully equipped fitness center with modern equipment for strength and cardio training.',
    features: ['Modern Equipment', 'Trainer Available', 'Extended Hours'],
  },
  {
    icon: BookOpen,
    title: 'Reading Room',
    description: 'Quiet study spaces with comfortable seating and adequate lighting for focused learning.',
    features: ['Air Conditioned', 'Reference Books', 'Open 24/7'],
  },
  {
    icon: Shirt,
    title: 'Laundry',
    description: 'On-campus laundry facility with washing machines and drying equipment.',
    features: ['Washing Machines', 'Drying Area', 'Iron Facilities'],
  },
  {
    icon: Gamepad2,
    title: 'Recreation Room',
    description: 'Entertainment zone with indoor games for relaxation and social interaction.',
    features: ['Table Tennis', 'Carrom', 'Chess'],
  },
  {
    icon: Coffee,
    title: 'Common Room',
    description: 'Comfortable lounge area for casual meetups and group discussions.',
    features: ['TV Area', 'Seating Space', 'AC Equipped'],
  },
  {
    icon: Tv,
    title: 'TV Room',
    description: 'Dedicated space with large screen TV for watching movies and sports together.',
    features: ['Large Screen', 'DTH Connection', 'Comfortable Seating'],
  },
  {
    icon: Shield,
    title: '24/7 Security',
    description: 'Round-the-clock security with CCTV surveillance for resident safety.',
    features: ['Security Guards', 'CCTV Coverage', 'Visitor Log'],
  },
  {
    icon: Car,
    title: 'Parking',
    description: 'Secure parking space for bicycles and two-wheelers.',
    features: ['Covered Parking', 'Bike Stands', 'Well Lit'],
  },
  {
    icon: TreeDeciduous,
    title: 'Green Spaces',
    description: 'Beautiful gardens and outdoor seating areas for relaxation.',
    features: ['Gardens', 'Benches', 'Walking Paths'],
  },
  {
    icon: Users,
    title: 'Sports Ground',
    description: 'Access to nearby sports facilities for outdoor activities.',
    features: ['Cricket', 'Football', 'Basketball'],
  },
];

const Facilities: React.FC = () => {
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
              Our <span className="gradient-text">Facilities</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              State-of-the-art amenities designed to enhance your living experience and support your academic journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl p-6 hover-lift group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform shrink-0">
                    <facility.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-lg mb-2">{facility.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{facility.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mess Timing */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Mess <span className="gradient-text">Timings</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-strong rounded-3xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left font-display font-semibold">Meal</th>
                    <th className="px-6 py-4 text-left font-display font-semibold">Weekdays</th>
                    <th className="px-6 py-4 text-left font-display font-semibold">Weekends</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="px-6 py-4 font-medium">Breakfast</td>
                    <td className="px-6 py-4 text-muted-foreground">7:30 AM - 9:30 AM</td>
                    <td className="px-6 py-4 text-muted-foreground">8:00 AM - 10:00 AM</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-6 py-4 font-medium">Lunch</td>
                    <td className="px-6 py-4 text-muted-foreground">12:00 PM - 2:30 PM</td>
                    <td className="px-6 py-4 text-muted-foreground">12:30 PM - 3:00 PM</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-6 py-4 font-medium">Snacks</td>
                    <td className="px-6 py-4 text-muted-foreground">5:00 PM - 6:00 PM</td>
                    <td className="px-6 py-4 text-muted-foreground">5:00 PM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Dinner</td>
                    <td className="px-6 py-4 text-muted-foreground">7:30 PM - 9:30 PM</td>
                    <td className="px-6 py-4 text-muted-foreground">8:00 PM - 10:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Facilities;
