import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Users, Plus, Search, TrendingUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const subreddits = [
  { id: 1, name: 'General', members: 485, description: 'General discussions about hostel life' },
  { id: 2, name: 'Academics', members: 320, description: 'Study groups, resources, and academic help' },
  { id: 3, name: 'Sports', members: 245, description: 'Sports events, teams, and fitness discussions' },
  { id: 4, name: 'Tech', members: 180, description: 'Technology, gadgets, and coding' },
  { id: 5, name: 'Food', members: 290, description: 'Mess reviews, food recommendations, recipes' },
  { id: 6, name: 'Events', members: 210, description: 'Event announcements and discussions' },
];

const posts = [
  {
    id: 1,
    subreddit: 'General',
    author: 'Arjun_P',
    title: 'New WiFi routers installed on 3rd floor!',
    content: 'Finally! The new routers are blazing fast. Did anyone else notice the improved speeds?',
    upvotes: 48,
    comments: 15,
    timeAgo: '2h',
  },
  {
    id: 2,
    subreddit: 'Sports',
    author: 'Vikram_S',
    title: 'Cricket practice today at 5 PM',
    content: 'Inter-hostel tournament is coming up. Need all team members at the ground. New players welcome!',
    upvotes: 32,
    comments: 8,
    timeAgo: '4h',
  },
  {
    id: 3,
    subreddit: 'Food',
    author: 'FoodieNeha',
    title: 'Today\'s mess special was amazing 🔥',
    content: 'The paneer biryani was actually really good today. Kudos to the mess committee!',
    upvotes: 67,
    comments: 23,
    timeAgo: '5h',
  },
  {
    id: 4,
    subreddit: 'Tech',
    author: 'CodeMaster',
    title: 'Anyone interested in ML study group?',
    content: 'Planning to start a machine learning study group. We can meet twice a week in the common room.',
    upvotes: 28,
    comments: 12,
    timeAgo: '8h',
  },
  {
    id: 5,
    subreddit: 'Events',
    author: 'Cultural_Sec',
    title: 'Talent show next Saturday - Register now!',
    content: 'Annual talent show registrations are open. Sing, dance, perform - show us what you got!',
    upvotes: 54,
    comments: 19,
    timeAgo: '1d',
  },
];

const Community: React.FC = () => {
  const [selectedSubreddit, setSelectedSubreddit] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = selectedSubreddit
    ? posts.filter(post => post.subreddit === selectedSubreddit)
    : posts;

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Community</span> Hub
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Connect with fellow residents, share ideas, and stay updated with what's happening around the hostel.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>

              {/* Subreddits */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">Channels</h3>
                  <Button variant="ghost" size="sm" className="text-xs gap-1" disabled>
                    <Plus className="h-3 w-3" />
                    New
                  </Button>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedSubreddit(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSubreddit === null
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    <TrendingUp className="inline h-4 w-4 mr-2" />
                    All Posts
                  </button>
                  {subreddits.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubreddit(sub.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedSubreddit === sub.name
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      #{sub.name}
                      <span className="float-right text-xs opacity-60">{sub.members}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login prompt */}
              <div className="glass rounded-2xl p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground mb-3">
                  Login to post and interact with the community
                </p>
                <Button variant="glow" size="sm" className="w-full" asChild>
                  <a href="/login">Login</a>
                </Button>
              </div>
            </motion.div>

            {/* Posts Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3 space-y-4"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 hover-lift cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      #{post.subreddit}
                    </span>
                    <span className="text-muted-foreground">Posted by</span>
                    <span className="font-medium">{post.author}</span>
                    <span className="text-muted-foreground">• {post.timeAgo}</span>
                  </div>

                  <h3 className="font-display text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.content}</p>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      {post.upvotes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      {post.comments} comments
                    </button>
                  </div>
                </motion.div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="glass rounded-2xl p-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-display text-lg font-semibold mb-2">No posts yet</h3>
                  <p className="text-muted-foreground text-sm">
                    Be the first to start a conversation in this channel!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
