import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    title: 'Hostel Building',
    category: 'Building',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    title: 'Cultural Night',
    category: 'Events',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    title: 'Common Room',
    category: 'Facilities',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
    title: 'Sports Day',
    category: 'Events',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    title: 'Gymnasium',
    category: 'Facilities',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    title: 'Graduation Day',
    category: 'Events',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800',
    title: 'Study Room',
    category: 'Facilities',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800',
    title: 'Fresher Welcome',
    category: 'Events',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    title: 'Garden Area',
    category: 'Building',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
    title: 'Group Photo',
    category: 'Events',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800',
    title: 'Night View',
    category: 'Building',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    title: 'Campus Sunrise',
    category: 'Building',
  },
];

const categories = ['All', 'Building', 'Facilities', 'Events'];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const currentImageIndex = lightboxImage !== null
    ? filteredImages.findIndex(img => img.id === lightboxImage)
    : -1;

  const goToPrevious = () => {
    if (currentImageIndex > 0) {
      setLightboxImage(filteredImages[currentImageIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setLightboxImage(filteredImages[currentImageIndex + 1].id);
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
              Photo <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Capturing moments, preserving memories. Explore the visual story of Hostel 5.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'glow' : 'glass'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setLightboxImage(image.id)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-medium text-sm">{image.title}</h3>
                    <span className="text-white/70 text-xs">{image.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => setLightboxImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            {currentImageIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/10"
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {currentImageIndex < filteredImages.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/10"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            <motion.img
              key={lightboxImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filteredImages[currentImageIndex]?.src}
              alt={filteredImages[currentImageIndex]?.title}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
              <h3 className="font-display font-semibold text-lg">
                {filteredImages[currentImageIndex]?.title}
              </h3>
              <span className="text-white/70 text-sm">
                {currentImageIndex + 1} / {filteredImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
