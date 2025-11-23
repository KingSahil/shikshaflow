"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreVertical, Play, Pause, Volume2, VolumeX, BookOpen, Sparkles, Loader2 } from "lucide-react";

interface Reel {
  id: string;
  videoUrl: string;
  title: string;
  subject: string;
  author: string;
  likes: number;
  comments: number;
  description: string;
  tags: string[];
}

export default function StudyReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchReels = useCallback(async (pageToken?: string) => {
    try {
      const isInitial = !pageToken;
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      let url = '/api/youtube?q=engineering study shorts&maxResults=5&videoDuration=short&order=viewCount';
      if (pageToken) {
        url += `&pageToken=${pageToken}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        const formattedReels: Reel[] = data.items.map((item: any) => ({
          id: item.id.videoId,
          videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
          title: item.snippet.title,
          subject: "General Engineering",
          author: item.snippet.channelTitle,
          likes: Math.floor(Math.random() * 5000) + 100,
          comments: Math.floor(Math.random() * 200) + 10,
          description: item.snippet.description,
          tags: ["Study", "Engineering", "Shorts"]
        }));

        setReels(prev => isInitial ? formattedReels : [...prev, ...formattedReels]);
        setNextPageToken(data.nextPageToken || null);
      }
    } catch (error) {
      console.error("Failed to fetch reels:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);

      if (index !== activeReelIndex) {
        setActiveReelIndex(index);
      }

      // Load more when near bottom (within 2 reels)
      if (scrollHeight - scrollTop - clientHeight < clientHeight * 2 && !loadingMore && nextPageToken) {
        fetchReels(nextPageToken);
      }
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full py-4">
        <div className="relative w-full max-w-[400px] h-[85vh] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-blue-500" />
            <p>Curating study reels...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full py-4">
      <div
        className="relative w-full max-w-[400px] h-[85vh] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-900"
      >
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {reels.map((reel, index) => (
            <div key={`${reel.id}-${index}`} className="w-full h-full snap-start relative bg-gray-900 flex items-center justify-center border-b border-gray-800">
              {/* Video Placeholder */}
              <div className="relative w-full h-full flex items-center justify-center bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 pointer-events-none" />

                <iframe
                  className="w-full h-full object-cover pointer-events-none"
                  src={`${reel.videoUrl}?autoplay=${index === activeReelIndex && isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${reel.id}`}
                  title={reel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />

                {/* Overlay Controls */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={togglePlay}>
                  {!isPlaying && <Play className="w-16 h-16 text-white/80 fill-white/80" />}
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-20 z-30 flex flex-col items-center gap-6">
                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-full group-hover:bg-gray-700/50 transition-colors">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">{reel.likes}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-full group-hover:bg-gray-700/50 transition-colors">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">{reel.comments}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-full group-hover:bg-gray-700/50 transition-colors">
                    <Share2 className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">Share</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-full group-hover:bg-gray-700/50 transition-colors">
                    <MoreVertical className="w-7 h-7 text-white" />
                  </div>
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute left-0 bottom-0 right-16 z-30 p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                    {reel.author[0]}
                  </div>
                  <span className="font-semibold text-sm">{reel.author}</span>
                  <button className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium hover:bg-white/30 transition-colors">
                    Follow
                  </button>
                </div>

                <h3 className="text-lg font-bold mb-2 line-clamp-2">{reel.title}</h3>
                <p className="text-sm text-gray-200 mb-3 line-clamp-2">{reel.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="px-2 py-1 bg-gray-800/60 backdrop-blur-sm rounded-md flex items-center gap-1 text-xs text-gray-300">
                    <BookOpen className="w-3 h-3" />
                    {reel.subject}
                  </div>
                  {reel.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 bg-black/30 backdrop-blur-sm p-2 rounded-lg w-fit">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  AI-Curated for your syllabus
                </div>
              </div>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 z-30 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          ))}
          {loadingMore && (
            <div className="w-full h-20 flex items-center justify-center bg-black">
              <Loader2 className="w-6 h-6 animate-spin text-white/50" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
