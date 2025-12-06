import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin,Facebook } from 'lucide-react';
import logo from "@/assets/logo.png";
const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
      
      <div className="relative container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center gap-3 group">
  <img
    src={logo}
    alt="Hostel Five Logo"
    className="w-12 h-12 object-contain rounded-xl"
  />
  <span className="font-display font-bold text-xl tracking-tight">
    Hostel <span className="gradient-text">Five</span>
  </span>
</Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Where excellence meets community. Building leaders, fostering friendships, creating memories.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/penthouse_h5_iitb" className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/hostel5.iitb" className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/hostel5/?originalSubdomain=in" className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-display font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Facilities', 'Team', 'Gallery', 'Events'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-display font-semibold">Resources</h4>
            <ul className="space-y-2">
              {['Community', 'Contact', 'Complaints', 'Rules', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-display font-semibold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Hostel 5, IIT Area, Powai
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                hostel5@iit.edu
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +91 77769 92436
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © 2024 Hostel 5. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with passion by Hostel 5 Tech Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
