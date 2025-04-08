import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import FadeIn from '@/components/ui/fade-in';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageSquare, Users, Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for demonstration
  const categories = [
    { name: 'Weight Loss', posts: 1245, color: 'bg-blue-100 text-blue-800' },
    { name: 'Healthy Recipes', posts: 987, color: 'bg-green-100 text-green-800' },
    { name: 'Workout Routines', posts: 754, color: 'bg-orange-100 text-orange-800' },
    { name: 'Success Stories', posts: 526, color: 'bg-purple-100 text-purple-800' },
    { name: 'Nutrition', posts: 832, color: 'bg-red-100 text-red-800' },
    { name: 'Motivation', posts: 621, color: 'bg-pink-100 text-pink-800' },
  ];
  
  const popularPosts = [
    {
      id: 1,
      title: 'How I lost 30lbs in 6 months with simple diet changes',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        initials: 'SJ'
      },
      category: 'Weight Loss',
      likes: 245,
      comments: 87,
      time: '2 days ago',
      excerpt: 'I wanted to share my journey of how I managed to lose 30lbs over the course of 6 months by making some straightforward changes to my diet without any extreme measures...'
    },
    {
      id: 2,
      title: 'My favorite high-protein meals under 500 calories',
      author: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
        initials: 'MC'
      },
      category: 'Healthy Recipes',
      likes: 189,
      comments: 56,
      time: '1 week ago',
      excerpt: "I've compiled a list of my go-to meals that are all under 500 calories but packed with protein to keep you feeling full and support muscle growth..."
    },
    {
      id: 3,
      title: 'The 30-day full body transformation workout plan',
      author: {
        name: 'Alex Rivera',
        avatar: 'https://i.pravatar.cc/150?img=3',
        initials: 'AR'
      },
      category: 'Workout Routines',
      likes: 312,
      comments: 94,
      time: '3 days ago',
      excerpt: 'This comprehensive 30-day workout plan targets all major muscle groups and includes both strength training and cardio components to help you achieve a full body transformation...'
    }
  ];
  
  const recentPosts = [
    {
      id: 4,
      title: 'Does intermittent fasting actually work?',
      author: {
        name: 'Emily Watson',
        avatar: 'https://i.pravatar.cc/150?img=4',
        initials: 'EW'
      },
      category: 'Nutrition',
      likes: 45,
      comments: 23,
      time: '2 hours ago',
      excerpt: "I've been hearing a lot about intermittent fasting lately and I'm curious if anyone has had success with it. What are the pros and cons?"
    },
    {
      id: 5,
      title: 'How to stay motivated during plateau phases',
      author: {
        name: 'David Kim',
        avatar: 'https://i.pravatar.cc/150?img=5',
        initials: 'DK'
      },
      category: 'Motivation',
      likes: 67,
      comments: 31,
      time: '5 hours ago',
      excerpt: "I've hit a plateau in my weight loss journey and finding it hard to stay motivated. What strategies have worked for you?"
    }
  ];
  
  return (
    <Layout withFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Community</h1>
              <p className="text-gray-500 mt-1">Connect, share, and learn with fellow fitness enthusiasts</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  type="search" 
                  placeholder="Search discussions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-60"
                />
              </div>
              <Button>New Post</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Badge variant="outline" className={`${category.color} border-0`}>
                          {category.name}
                        </Badge>
                        <span className="text-sm text-gray-500">{category.posts} posts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Members</span>
                      <span className="font-medium">24,568</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Discussions</span>
                      <span className="font-medium">8,942</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Comments</span>
                      <span className="font-medium">56,329</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Online Now</span>
                      <span className="font-medium">342</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="popular" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                
                <TabsContent value="popular">
                  <div className="space-y-6">
                    {popularPosts.map((post) => (
                      <Card key={post.id} className="bg-white shadow-sm">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">{post.author.name}</span>
                                <p className="text-xs text-gray-500">{post.time}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-0">
                              {post.category}
                            </Badge>
                          </div>
                          <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-gray-600">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="flex items-center gap-6 pt-2">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Heart size={16} className="text-gray-500" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <MessageCircle size={16} className="text-gray-500" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Bookmark size={16} className="text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Share2 size={16} className="text-gray-500" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="recent">
                  <div className="space-y-6">
                    {recentPosts.map((post) => (
                      <Card key={post.id} className="bg-white shadow-sm">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">{post.author.name}</span>
                                <p className="text-xs text-gray-500">{post.time}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-0">
                              {post.category}
                            </Badge>
                          </div>
                          <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-gray-600">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="flex items-center gap-6 pt-2">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Heart size={16} className="text-gray-500" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <MessageCircle size={16} className="text-gray-500" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Bookmark size={16} className="text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Share2 size={16} className="text-gray-500" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="following">
                  <Card className="bg-white shadow-sm p-8 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Follow People & Topics</h3>
                      <p className="text-gray-500 mb-4">You're not following anyone yet. Find people and topics to follow to see their posts here.</p>
                      <Button>Discover</Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
};

export default Community;
