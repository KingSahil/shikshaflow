"use client";

import { motion } from "framer-motion";
import { 
  Calculator, 
  Pencil, 
  Cog, 
  Atom, 
  Languages, 
  Briefcase,
  ArrowLeft,
  BookOpen,
  Trophy,
  Star,
  Loader2,
  LogOut,
  Crown,
  Medal,
  Gift,
  Ticket,
  Utensils,
  ShoppingBag,
  Award
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";

function SubjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, logout } = useAuth();
  const [studentName, setStudentName] = useState("Student");
  const [year, setYear] = useState("1");
  const [semester, setSemester] = useState("1");
  const [activeTab, setActiveTab] = useState<"subjects" | "leaderboard" | "coupons">("subjects");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const name = searchParams.get("name") || user?.email?.split('@')[0] || "Student";
    const yr = searchParams.get("year") || "1";
    const sem = searchParams.get("semester") || "1";
    setStudentName(name);
    setYear(yr);
    setSemester(sem);
  }, [searchParams, user]);

  const subjects = [
    {
      id: "mathematics",
      name: "Mathematics-I",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
      description: "Calculus, Linear Algebra & Differential Equations",
      topicCount: 4,
      totalXP: 450
    },
    {
      id: "engineering-graphics",
      name: "Engineering Graphics",
      icon: Pencil,
      color: "from-purple-500 to-purple-600",
      description: "Technical Drawing & CAD Fundamentals",
      topicCount: 4,
      totalXP: 400
    },
    {
      id: "engineering-mechanics",
      name: "Engineering Mechanics",
      icon: Cog,
      color: "from-orange-500 to-orange-600",
      description: "Statics, Dynamics & Strength of Materials",
      topicCount: 6,
      totalXP: 600
    },
    {
      id: "physics",
      name: "Physics",
      icon: Atom,
      color: "from-green-500 to-green-600",
      description: "Modern Physics & Wave Optics",
      topicCount: 4,
      totalXP: 540
    },
    {
      id: "punjabi",
      name: "Punjabi",
      icon: Languages,
      color: "from-pink-500 to-pink-600",
      description: "Language, Literature & Communication",
      topicCount: 4,
      totalXP: 300
    },
    {
      id: "entrepreneurship",
      name: "Entrepreneurship",
      icon: Briefcase,
      color: "from-yellow-500 to-yellow-600",
      description: "Business Fundamentals & Innovation",
      topicCount: 4,
      totalXP: 360
    }
  ];

  const leaderboardData = [
    { rank: 1, name: "Priya Singh", xp: 2850, level: 15, avatar: "PS", color: "from-yellow-400 to-orange-500" },
    { rank: 2, name: "Rahul Kumar", xp: 2720, level: 14, avatar: "RK", color: "from-gray-300 to-gray-400" },
    { rank: 3, name: "Sneha Patel", xp: 2650, level: 14, avatar: "SP", color: "from-orange-400 to-orange-600" },
    { rank: 4, name: studentName, xp: 1850, level: 10, avatar: studentName.substring(0, 2).toUpperCase(), color: "from-blue-500 to-purple-500", isCurrentUser: true },
    { rank: 5, name: "Amit Sharma", xp: 1720, level: 9, avatar: "AS", color: "from-gray-400 to-gray-500" },
    { rank: 6, name: "Vikram Reddy", xp: 1650, level: 9, avatar: "VR", color: "from-gray-400 to-gray-500" },
    { rank: 7, name: "Anjali Verma", xp: 1580, level: 8, avatar: "AV", color: "from-gray-400 to-gray-500" },
    { rank: 8, name: "Karan Mehta", xp: 1420, level: 8, avatar: "KM", color: "from-gray-400 to-gray-500" },
  ];

  const couponsData = [
    {
      id: 1,
      brand: "Zomato",
      discount: "₹200 OFF",
      description: "Get ₹200 off on orders above ₹500",
      xpRequired: 2000,
      icon: Utensils,
      color: "from-red-500 to-red-600",
      code: "SIKSHA200",
      expiresIn: "30 days",
      unlocked: false
    },
    {
      id: 2,
      brand: "Swiggy",
      discount: "40% OFF",
      description: "Get 40% off upto ₹150 on your order",
      xpRequired: 1500,
      icon: Utensils,
      color: "from-orange-500 to-orange-600",
      code: "LEARN40",
      expiresIn: "15 days",
      unlocked: true
    },
    {
      id: 3,
      brand: "Amazon",
      discount: "₹500 Voucher",
      description: "₹500 Amazon shopping voucher",
      xpRequired: 3000,
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
      code: "SHOP500",
      expiresIn: "60 days",
      unlocked: false
    },
    {
      id: 4,
      brand: "BookMyShow",
      discount: "Buy 1 Get 1",
      description: "Buy 1 Get 1 free on movie tickets",
      xpRequired: 1000,
      icon: Ticket,
      color: "from-pink-500 to-pink-600",
      code: "MOVIE2X",
      expiresIn: "20 days",
      unlocked: true
    },
    {
      id: 5,
      brand: "Flipkart",
      discount: "₹300 OFF",
      description: "Get ₹300 off on orders above ₹1000",
      xpRequired: 2500,
      icon: Gift,
      color: "from-yellow-500 to-yellow-600",
      code: "FLIP300",
      expiresIn: "45 days",
      unlocked: false
    },
    {
      id: 6,
      brand: "Uber Eats",
      discount: "50% OFF",
      description: "Get 50% off upto ₹200 on food delivery",
      xpRequired: 1800,
      icon: Utensils,
      color: "from-green-500 to-green-600",
      code: "UBER50",
      expiresIn: "25 days",
      unlocked: true
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleSubjectClick = (subjectId: string) => {
    // Navigate to topics page with gamification
    router.push(`/topics?subject=${subjectId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render content if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SikshaFlow
                </h1>
                <p className="text-sm text-gray-600">Year {year} - Semester {semester}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-semibold text-gray-900">{studentName}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Welcome Section */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6">
              <Trophy className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Start Earning XP Today!</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Your Subjects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select a subject to start learning and earn XP by completing topics
            </p>
          </motion.div>

          {/* Info Banner */}
          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 mb-8 text-white shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Gamified Learning Experience</h3>
                <p className="text-sm text-blue-100">
                  Complete topics, earn XP, level up, and unlock achievements! Each subject has multiple topics worth varying XP points.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={fadeInUp} className="flex gap-4 mb-8 bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab("subjects")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === "subjects"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Subjects
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === "leaderboard"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Trophy className="w-5 h-5" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("coupons")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === "coupons"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Gift className="w-5 h-5" />
              Coupons & Goodies
            </button>
          </motion.div>

          {/* Subjects Grid */}
          {activeTab === "subjects" && (
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubjectClick(subject.id)}
                className="cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-blue-300">
                  {/* Subject Header */}
                  <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <subject.icon className="w-8 h-8" />
                      </div>
                      <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm font-semibold">{subject.topicCount} Topics</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">{subject.name}</h3>
                  </div>

                  {/* Subject Body */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{subject.description}</p>
                    
                    {/* Progress Info */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">0%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-blue-600 w-0"></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Star className="w-4 h-4 text-orange-500 fill-current" />
                          Total XP
                        </span>
                        <span className="font-semibold text-orange-600">{subject.totalXP} XP</span>
                      </div>
                    </div>

                    {/* Start Button */}
                    <button
                      className={`w-full mt-6 py-3 bg-gradient-to-r ${subject.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      Start Learning
                      <BookOpen className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}

          {/* Leaderboard Section */}
          {activeTab === "leaderboard" && (
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Global Leaderboard</h2>
                <p className="text-gray-600">Compete with students worldwide and climb the ranks!</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {leaderboardData.map((student, index) => (
                  <motion.div
                    key={student.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-all ${
                      student.isCurrentUser ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">
                      {student.rank <= 3 ? (
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${student.color} flex items-center justify-center shadow-lg`}>
                          {student.rank === 1 && <Crown className="w-7 h-7 text-white" />}
                          {student.rank === 2 && <Medal className="w-7 h-7 text-white" />}
                          {student.rank === 3 && <Award className="w-7 h-7 text-white" />}
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-600">#{student.rank}</span>
                        </div>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${student.color} flex items-center justify-center text-white font-bold shadow-md`}>
                      {student.avatar}
                    </div>

                    {/* Student Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold ${student.isCurrentUser ? 'text-blue-600' : 'text-gray-900'}`}>
                          {student.name}
                          {student.isCurrentUser && <span className="text-xs ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded-full">You</span>}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-orange-500 fill-current" />
                          {student.xp.toLocaleString()} XP
                        </span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full font-semibold">
                          Level {student.level}
                        </span>
                      </div>
                    </div>

                    {/* Rank Number for Top 3 */}
                    {student.rank <= 3 && (
                      <div className="text-right">
                        <span className="text-3xl font-bold text-gray-300">#{student.rank}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Keep learning to improve your rank! 🚀
                </p>
              </div>
            </motion.div>
          )}

          {/* Coupons & Goodies Section */}
          {activeTab === "coupons" && (
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Coupons & Goodies</h2>
                <p className="text-gray-600">Redeem your XP for exclusive rewards and discounts!</p>
                <div className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg">
                  <Star className="w-5 h-5" />
                  <span className="font-bold">Your XP: 1850</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {couponsData.map((coupon, index) => (
                  <motion.div
                    key={coupon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
                      coupon.unlocked ? 'border-green-400' : 'border-gray-200'
                    } hover:shadow-xl transition-all`}
                  >
                    {/* Coupon Header */}
                    <div className={`bg-gradient-to-r ${coupon.color} p-6 text-white relative`}>
                      {coupon.unlocked && (
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-bold">✓ Unlocked</span>
                        </div>
                      )}
                      <coupon.icon className="w-12 h-12 mb-3" />
                      <h3 className="text-2xl font-bold mb-1">{coupon.brand}</h3>
                      <p className="text-3xl font-black">{coupon.discount}</p>
                    </div>

                    {/* Coupon Body */}
                    <div className="p-6 space-y-4">
                      <p className="text-gray-700 text-sm">{coupon.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Required XP:</span>
                        <span className="font-bold text-orange-600 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
                          {coupon.xpRequired}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Expires in:</span>
                        <span className="font-semibold text-gray-700">{coupon.expiresIn}</span>
                      </div>

                      {coupon.unlocked ? (
                        <div className="space-y-3">
                          <div className="bg-gray-100 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-600 mb-1">Coupon Code:</p>
                            <p className="text-xl font-bold text-gray-900 tracking-wider">{coupon.code}</p>
                          </div>
                          <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                            Copy Code
                          </button>
                        </div>
                      ) : (
                        <button
                          disabled={1850 < coupon.xpRequired}
                          className={`w-full py-3 rounded-xl font-semibold transition-all ${
                            1850 >= coupon.xpRequired
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {1850 >= coupon.xpRequired ? 'Unlock Now' : `Need ${coupon.xpRequired - 1850} more XP`}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Complete more topics to unlock exclusive rewards! 🎁
                </p>
              </div>
            </motion.div>
          )}

          {/* Bottom Info */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <p className="text-gray-600">
              Complete all topics in a subject to unlock a special achievement! 🏆
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SubjectsContent />
    </Suspense>
  );
}
