import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { createComplaint } from '@/services/api';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    details: ['Hostel 5, IIT Campus', 'Main Road, City - 123456'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91 98765 43210', '022-1234-5678'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['gsec@hostel5.iitb.ac.in', 'warden.h5@iitb.ac.in'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Mon - Fri: 9:00 AM - 5:00 PM', 'Sat: 10:00 AM - 1:00 PM'],
  },
];

const Contact: React.FC = () => {
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Complaint Form State
  const [complaintForm, setComplaintForm] = useState({
    studentName: '',
    roomNumber: '',
    type: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Contact Form Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email to Warden and GSec
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully!', {
      description: 'Copies have been forwarded to the Warden and General Secretary.',
    });

    setContactForm({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  // Handle Complaint Portal Submission
  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintForm.type) {
      toast.error("Please select a complaint type");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Call backend API to save complaint
      await createComplaint(complaintForm);

      // Determine concerned council member based on type
      const concernedAuthority = 
        ['Electrical', 'Plumbing', 'Carpentry'].includes(complaintForm.type) 
          ? 'Maintenance Secretary' 
          : 'General Secretary';

      toast.success('Complaint Registered', {
        description: `Ticket created and notified to the ${concernedAuthority}.`,
      });

      setComplaintForm({ studentName: '', roomNumber: '', type: '', description: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to register complaint', {
        description: 'Please try again later or contact the admin directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Contact & <span className="gradient-text">Support</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions or facing issues in the hostel? Reach out to us or file a complaint directly through our portal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Side: Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-6 hover-lift"
                  >
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl overflow-hidden h-64 border border-white/20"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.7329603781347!2d72.91349507507746!3d19.11936198709191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7baf60d4373%3A0x606050626359560!2sHostel%205%2C%20IIT%20Bombay!5e0!3m2!1sen!2sin!4v1710928374621!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hostel Location"
                />
              </motion.div>
            </motion.div>

            {/* Right Side: Forms (Tabs) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-strong rounded-3xl p-8 border border-white/20">
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-muted/50 rounded-xl">
                    <TabsTrigger value="contact" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Contact Us</TabsTrigger>
                    <TabsTrigger value="complaint" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-destructive data-[state=active]:shadow-sm">File Complaint</TabsTrigger>
                  </TabsList>

                  {/* Contact Us Form */}
                  <TabsContent value="contact">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold">General Query</h2>
                        <p className="text-muted-foreground text-sm">Direct line to the Warden & G-Sec</p>
                      </div>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Name</label>
                          <Input
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Your name"
                            required
                            className="rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Subject</label>
                        <Input
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="What's this about?"
                          required
                          className="rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Message</label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Type your message here..."
                          rows={5}
                          required
                          className="rounded-xl resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="glow"
                        size="lg"
                        className="w-full gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Complaints Portal Form */}
                  <TabsContent value="complaint">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold">Complaints Portal</h2>
                        <p className="text-muted-foreground text-sm">Issues will be routed to the relevant Council Member</p>
                      </div>
                    </div>

                    <form onSubmit={handleComplaintSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Student Name</label>
                          <Input
                            value={complaintForm.studentName}
                            onChange={(e) => setComplaintForm({ ...complaintForm, studentName: e.target.value })}
                            placeholder="Your full name"
                            required
                            className="rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Room Number</label>
                          <Input
                            value={complaintForm.roomNumber}
                            onChange={(e) => setComplaintForm({ ...complaintForm, roomNumber: e.target.value })}
                            placeholder="e.g. 304"
                            required
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Complaint Type</label>
                        <Select 
                          value={complaintForm.type} 
                          onValueChange={(val) => setComplaintForm({ ...complaintForm, type: val })}
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select category (e.g. Electrical)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Electrical">Electrical</SelectItem>
                            <SelectItem value="Carpentry">Carpentry</SelectItem>
                            <SelectItem value="Plumbing">Plumbing</SelectItem>
                            <SelectItem value="Cleaning">Cleaning</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Description</label>
                        <Textarea
                          value={complaintForm.description}
                          onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                          placeholder="Describe the issue in detail..."
                          rows={5}
                          required
                          className="rounded-xl resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="destructive"
                        size="lg"
                        className="w-full gap-2 shadow-lg shadow-destructive/20"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Registering...' : 'Register Complaint'}
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;