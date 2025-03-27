
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import YouTubeSearch from '../components/YouTubeSearch';
import VideoCard from '../components/VideoCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { getPopularVideosByCategory } from '../services/youtubeService';
import { YouTubeVideo } from '../services/youtubeService';

// New data structure for provided videos
interface VideoData {
  video_id: string;
  title: string;
  tags: string;
  topic: string;
}

const videoData: VideoData[] = [
  { video_id: "ua-CiDNNj30", title: "Learn Data Science Tutorial - Full Course for Beginners", tags: "data science for beginners,what is data science,what is data science for beginners,data science tutorial,data science applications,introduction to data science,data science with python,who is a data scientist,data scientist day in the life,what does data scientist do,A Day In The Life Of A Data Scientist,data science explained,learn data science,data science tutorial for beginners,data science,data science course", topic: "Data science tutorials" },
  { video_id: "7eh4d6sabA0", title: "Python Machine Learning Tutorial (Data Science)", tags: "machine learning python,machine learning tutorial,machine learning,python,python tutorial,jupyter notebook,data science,python data science,python tutorial advanced,data science python,python machine learning,artificial intelligence,programming with mosh,mosh hamedani,code with mosh,jupyter,machine learning tutorial for beginners,machine learning with python,data science tutorial,machine learning course,python programming,introduction to machine learning", topic: "Data science tutorials" },
  { video_id: "Vfo5le26IhY", title: "Statistics for Data Science | Probability and Statistics | Statistics Tutorial | Ph.D. (Stanford)", tags: "Great Learning,Data Analytics,Data Science,Machine learning,Statistics for Data Science,Probability and Statistics,Statistics Tutorial,Conditional Probability,Measures of Central Tendency,descriptive statistics,correlation and regression,correlation and regression in statistics,binomial distribution,Poisson distribution,Poisson distribution probability,probablity,statistics,bayes theorem,data science tutorial,yt:cc=on,covariance,correlation", topic: "Data science tutorials" },
  { video_id: "TPMlZxRRaBQ", title: "Tableau for Data Science and Data Visualization - Crash Course Tutorial", tags: "tableau training for beginners,tableau tutorial,tableau dashboard,business intelligence tools,tableau training,data visualization tools,tableau desktop,tableau excel,tableau certification,tableau online,what is tableau,data vizualisation software,tableau reporting,business intelligence and analytics,tableau dashboard example,tableau example,tableau vizualisation,tableau course", topic: "Data science tutorials" },
  { video_id: "fV2k2ivttL0", title: "Lecture - 1 Introduction to Artificial Intelligence", tags: "Introduction", topic: "artificial intelligence" },
  { video_id: "XCPZBD9lbVo", title: "Artificial Intelligence: Introduction", tags: "", topic: "artificial intelligence" },
  { video_id: "pQVYwz6u-zA", title: "Documentary ~ Consciousness Artificial Intelligence (Conscious Super AGI)", tags: "Consciousness,Singularity,Artificial Intelligence,Ray Kurtzweil,Waking Cosmos,AI Documentary,Nick Bostrom,Superintelligence", topic: "artificial intelligence" },
  { video_id: "VrMHA3yX_QI", title: "12b: Deep Neural Nets", tags: "neural net,deep net,convolution,pooling", topic: "artificial intelligence" },
  { video_id: "n57kP5a7DW4", title: "Best #MikeEllis #ONPASSIVENATION artificial_intelligence #bonuses", tags: "", topic: "artificial intelligence" },
  { video_id: "rOyfMpf9VMU", title: "#Professional_Level|#IT_Goverance|#Chapter-02 (P-2)|#Artificial_Intelligence|#By Palash Mollik Sir|", tags: "#Professional_Level|,#IT_Goverance_Chapter-02 (Part-02)|,#Online_based_Class_2022|,ICAB online class for pL,profesional level IT class,CA online Class,PL IT class,ICAB Information technology class,#IT Class by ICAB,#CA Online class,#CA professional level IT class,CA IT class for pL,#ICAB IT class,#All IT governance Class in BD,Matin Sir's IT Class,online based CA PL online Class,MCQ online Class,CA Online Class by ICAB,|#Chapter-02 (P-2),Artificial_Intelligence", topic: "artificial intelligence" },
  { video_id: "vJe6Jk31HF4", title: "All You Need To Know About #OWALLET #artificial_intelligence #security", tags: "", topic: "artificial intelligence" },
  { video_id: "xOwjK8zGYCY", title: "Lecture25 26 Clustering#Artificial_Intelligence#Machine_Learning", tags: "", topic: "artificial intelligence" },
  { video_id: "Wgtchri0L3U", title: "How To Create Scrollbar In Kodular 2021 - Best App Developement Tutorials", tags: "create scrolbar app,kodualr app,kodular aia,app developement 2021,create android apps 2021,learn app developement,kodular tutorial,android app create,create android app,create galllery view app", topic: "app developement tutorials" },
  { video_id: "8athfv-gJEw", title: "Android Canvas Basics", tags: "Android,Canvas,drawing,drawLine,Bitmap,Images", topic: "app developement tutorials" },
  { video_id: "84xu0XiReo4", title: "Create first demo android app and Android Studio Introduction.", tags: "", topic: "app developement tutorials" },
  { video_id: "ENo3WcaciXg", title: "Android - Image Transfer Using Intent", tags: "Android,Android Bundle,Image,Bitmap,ByteArray", topic: "app developement tutorials" },
  { video_id: "PeqnnVZDEJ8", title: "Html Complete Course|| Starting Html || web developement tutorials for beginners @worldofit863", tags: "html complete course for beginners,html complete course world of it,html css js php complete course for beginners,html projects,my first page in html,hmtl tutorials fro beginners,world of it,html world of it,javascript complete course for beginners,how to create a login form in html,how can i create a login form in html,javascript complete tutorials for beginner,html complete course in english,html complete course with projects,create your website in html,html css", topic: "web developement tutorials" },
  { video_id: "1Bg4-sRWHxA", title: "CSS Tutorials : Learn , Styling Links ,Buttons And Psuedo Selector | Web Developement Tutorials.", tags: "what is psuedo selectors in html & css,how to style a links in css,how to style a buttons in css,how to set a hover effect in css,what is hover in css,how to use hover effect in css,hover effect on image in css,what is hover in html,hover effect in css", topic: "web developement tutorials" },
  { video_id: "JF0fWnsJesI", title: "Must Know JavaScript Tools🔥 for Web Developers✔️| Full stack development | CodeMarch", tags: "", topic: "web developement tutorials" },
  { video_id: "KIRT1ds4VJg", title: "PluginThemebyWP Overview, Best GPl Premium Plugins and Themes Selling Website ....", tags: "Web Developement,WordPress Developement,Online Money tricks,Tech,Tech Tutorials", topic: "web developement tutorials" },
  { video_id: "O9hmS5VgQHc", title: "04 - Stemming | Natural Language Processing Tutorials For Beginners | NLTK Tutorials", tags: "nasir soft,Natural Language Processing Tutorials For Beginners,NLTK Tutorial For Beginners,NLTK Python basics,NLTK Python For Beginners,Stemming in Python,Stemming in Natural Language Processing,Stemming NLTK Basics,NLTK Basics,Stemming in NLTK Python,how to stemming apply in python,Stemming with example python NLTK,PorterStemmer in Python,PorterStemmer With Example,Pycharm Stemming,Stemming With Example in Python NLTK,NLTK Stemming basics,Stemming Python", topic: "natural language processing tutorials" },
  { video_id: "rYfoqv5qezU", title: "05 - N Grams| Natural Language Processing Tutorials For Beginners | NLTK Tutorials", tags: "nasir soft,Ngrams in pycharm,N grams in Python,N garms in NLTK Python,Bigrams in NLTK Python,Trigrams in NLTK python,Everygrams in Python,N grams concept in Python NLTK,Natural Language Processing Basics Concept,Text Mining Basics,N grams in Python NLTK in Pycharm,Natural Language Tutorials for begineers,Beginners NLTK Tutorials,Concept of Grams in Natural Language Processing,Python NLTK,N grams Bigrams and Trigrams with exampe,Ngrams with example in NLTK python", topic: "natural language processing tutorials" },
  { video_id: "5xSz3HwbzEo", title: "06 - Lemmatization| Natural Language Processing Tutorials For Beginners | NLTK Tutorials", tags: "nasir soft,Lemmatization with NLTK,Stemming and Lemmatization in Python,Why lemmatization in Python,Difference between Lemmatization and Stemming in Python NLTk,NLTK Lemmatization in Python,Why Lemmatization instead of stemming in Python,Text mining basics lemmatization in Python,Nltk Lemmatization vs stemming,Basics of Text mining with NLTK,Natural Language processing tutorial,Python Words to Root Lemmatization,Words Root word Stemming vs Lemmatization,Lemmatization", topic: "natural language processing tutorials" },
  { video_id: "ZKC4iejmXFg", title: "Natural Language Processing in Hindi/Natural Language Processing Tutorials/Can machine understand U?", tags: "natural language processing,natural language processing tutorial,natural language processing in artificial intelligence,natural language processing training,natural language processing python,natural language processing tutorial for beginners,natural language processing applications,natural language processing basics,what is natural language processing,natural language processing in 5 minutes,natural language processing in 10 minutes", topic: "natural language processing tutorials" }
];

// Convert the video data to YouTubeVideo format for compatibility with existing components
const convertToYouTubeVideo = (data: VideoData): YouTubeVideo => {
  return {
    id: data.video_id,
    title: data.title,
    description: data.tags.split(',').slice(0, 3).join(', '), // Use first 3 tags as description
    thumbnail: `https://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`, // YouTube thumbnail URL
    channelTitle: "YouTube Creator",
    publishedAt: new Date().toISOString(),
    viewCount: Math.floor(Math.random() * 100000).toString() // Random view count
  };
};

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>('Data science tutorials');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 8;

  // Get all unique topics from the video data
  const allTopics = Array.from(new Set(videoData.map(video => video.topic)));

  useEffect(() => {
    // Load videos based on the selected category
    if (activeCategory) {
      fetchVideosByCategory(activeCategory);
    } else {
      // If no category selected, show all videos
      const allVideos = videoData.map(video => convertToYouTubeVideo(video));
      setVideos(allVideos);
      setIsLoading(false);
    }
  }, [activeCategory]);

  const fetchVideosByCategory = (category: string) => {
    setIsLoading(true);
    try {
      // Filter videos by category
      const filteredVideos = videoData
        .filter(video => video.topic.toLowerCase() === category.toLowerCase())
        .map(video => convertToYouTubeVideo(video));
      
      setVideos(filteredVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        {/* Header + Search */}
        <header className="pt-16 md:pt-8 px-4 md:px-8 pb-6 sticky top-0 bg-background z-10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Discover</h1>
                <p className="text-muted-foreground">Find videos to expand your knowledge</p>
              </div>
              <YouTubeSearch />
            </div>
          </div>
        </header>
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Categories */}
            <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex gap-2 min-w-max">
                {allTopics.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Videos Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="rounded-lg bg-secondary h-48 mb-3"></div>
                    <div className="bg-secondary h-5 w-3/4 rounded mb-2"></div>
                    <div className="bg-secondary h-4 w-1/2 rounded mb-4"></div>
                    <div className="bg-secondary h-4 w-full rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  {activeCategory ? `${activeCategory} Videos` : 'Recommended Videos'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentVideos.map(video => (
                    <VideoCard key={video.id} video={{
                      id: video.id,
                      title: video.title,
                      description: video.description,
                      thumbnail: video.thumbnail,
                      author: video.channelTitle,
                      views: video.viewCount,
                      createdAt: video.publishedAt,
                      category: activeCategory || 'Programming',
                      duration: '10:30' // Default duration as it's not provided by the API
                    }} />
                  ))}
                </div>
                
                {/* Pagination */}
                {videos.length > videosPerPage && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => paginate(currentPage - 1)} 
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <PaginationItem key={number}>
                          <PaginationLink 
                            isActive={currentPage === number}
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => paginate(currentPage + 1)} 
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
            
            {/* Empty State */}
            {!isLoading && videos.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No videos found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or check back later.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
