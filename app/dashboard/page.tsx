"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, MessageSquare, Star, Calendar, Users, Trash2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const swapRequests = [
  {
    id: 1,
    type: "incoming",
    user: { name: "Dhyey shah", avatar: "/placeholder.svg?height=40&width=40", rating: 4.8 },
    skillOffered: "Graphic Design",
    skillWanted: "Grammer",
    message: "Hi! I'd love to learn Grammer in exchange for helping with your design projects.",
    status: "pending",
    date: "2024-07-12",
  },
  {
    id: 2,
    type: "outgoing",
    user: { name: "Shubham", avatar: "/placeholder.svg?height=40&width=40", rating: 4.9 },
    skillOffered: "Video editing",
    skillWanted: "Spanish Language",
    message: "I'm interested in learning Spanish Language!",
    status: "accepted",
    date: "2024-07-14",
  },
  {
    id: 3,
    type: "outgoing",
    user: { name: "Parth", avatar: "/placeholder.svg?height=40&width=40", rating: 4.6 },
    skillOffered: "VBA",
    skillWanted: "Grammer",
    message: "Would love to trade cooking lessons for web development help!",
    status: "pending",
    date: "2024-01-13",
  },
]

const activeSwaps = [
  {
    id: 1,
    user: { name: "Shubham", avatar: "/placeholder.svg?height=40&width=40" },
    skillExchange: "Video editing <-> Spanish language ",
    nextSession: "2024-07-18",
    progress: 60,
    messages: 12,
  },
  
]

const completedSwaps = [
  {
    id: 1,
    user: { name: "harmi", avatar: "/placeholder.svg?height=40&width=40" },
    skillExchange: "Photography ↔ Conversation",
    completedDate: "2024-01-10",
    rating: 5,
    feedback: "Amazing teacher! Learned so much about Conversation.",
    canRate: false,
  },
 
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const cardHoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

const progressBarVariants = {
  initial: { width: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  }),
}

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [requests, setRequests] = useState(swapRequests)

  const handleRequestAction = (requestId: number, action: "accept" | "decline") => {
    setRequests(
      requests.map((request) =>
        request.id === requestId ? { ...request, status: action === "accept" ? "accepted" : "declined" } : request,
      ),
    )
    alert(`Request ${action}ed successfully!`)
  }

  const handleDeleteRequest = (requestId: number) => {
    setRequests(requests.filter((request) => request.id !== requestId))
    alert("Request deleted successfully!")
  }

  const handleRateSwap = (swapId: number, rating: number) => {
    alert(`Rated swap with ${rating} stars!`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="w-5 h-5 text-white" />
                </motion.div>
                <h1 className="text-xl font-bold text-gray-900">SkillSwap</h1>
              </Link>
            </motion.div>
            <motion.nav
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { href: "/browse", text: "Browse Skills", active: false },
                { href: "/dashboard", text: "My Dashboard", active: true },
                { href: "/profile", text: "Profile", active: false },
              ].map((item, index) => (
                <motion.div key={item.href} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className={item.active ? "text-indigo-600 font-medium" : "text-gray-700 hover:text-indigo-600"}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your skill swaps and track your learning progress</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: Clock,
              color: "blue",
              label: "Pending Requests",
              value: requests.filter((r) => r.status === "pending").length,
            },
            { icon: Users, color: "green", label: "Active Swaps", value: activeSwaps.length },
            { icon: CheckCircle, color: "purple", label: "Completed", value: completedSwaps.length },
            { icon: Star, color: "yellow", label: "Avg Rating", value: "4.9" },
          ].map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants} whileHover={cardHoverVariants.hover}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <motion.div
                      className={`p-2 bg-${stat.color}-100 rounded-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </motion.div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <motion.p
                        className="text-2xl font-bold text-gray-900"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requests">
                Requests ({requests.filter((r) => r.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="active">Active Swaps</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Recent Activity */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest skill swap activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { color: "green", text: "Completed swap with harmi", time: "2 days ago" },
                      { color: "blue", text: "New request from Dhyey shah", time: "6 hour ago" },
                      { color: "yellow", text: "Session scheduled with Shubham", time: "tomorrow" },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className={`w-2 h-2 bg-${activity.color}-500 rounded-full`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        />
                        <p className="text-sm">{activity.text}</p>
                        <span className="text-xs text-gray-500 ml-auto">{activity.time}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Upcoming Sessions */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Your scheduled learning sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeSwaps.map((swap, index) => (
                      <motion.div
                        key={swap.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={swap.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {swap.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <div>
                            <p className="font-medium text-sm">{swap.user.name}</p>
                            <p className="text-xs text-gray-500">{swap.skillExchange}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{swap.nextSession}</p>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">Next session</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
              <AnimatePresence mode="popLayout">
                {requests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    variants={itemVariants}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={cardHoverVariants.hover}
                    layout
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <Avatar>
                                <AvatarImage src={request.user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {request.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold">{request.user.name}</h4>
                                <div className="flex items-center">
                                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  </motion.div>
                                  <span className="text-sm text-gray-600 ml-1">{request.user.rating}</span>
                                </div>
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                  <Badge variant={request.type === "incoming" ? "default" : "secondary"}>
                                    {request.type === "incoming" ? "Incoming" : "Outgoing"}
                                  </Badge>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                  <Badge
                                    variant={
                                      request.status === "pending"
                                        ? "outline"
                                        : request.status === "accepted"
                                          ? "default"
                                          : "destructive"
                                    }
                                  >
                                    {request.status}
                                  </Badge>
                                </motion.div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                <strong>Offering:</strong> {request.skillOffered} • <strong>Wants:</strong>{" "}
                                {request.skillWanted}
                              </p>
                              <p className="text-sm text-gray-700 mb-3">{request.message}</p>
                              <p className="text-xs text-gray-500">{request.date}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {request.status === "pending" && request.type === "incoming" && (
                              <>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button size="sm" onClick={() => handleRequestAction(request.id, "accept")}>
                                    Accept
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRequestAction(request.id, "decline")}
                                  >
                                    Decline
                                  </Button>
                                </motion.div>
                              </>
                            )}
                            {request.status === "pending" && request.type === "outgoing" && (
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="sm" variant="destructive" onClick={() => handleDeleteRequest(request.id)}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>

          {/* Active Swaps Tab */}
          <TabsContent value="active" className="space-y-6">
            <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
              {activeSwaps.map((swap, index) => (
                <motion.div key={swap.id} variants={itemVariants} whileHover={cardHoverVariants.hover}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Avatar>
                              <AvatarImage src={swap.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {swap.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <div>
                            <h4 className="font-semibold">{swap.user.name}</h4>
                            <p className="text-sm text-gray-600">{swap.skillExchange}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message ({swap.messages})
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <motion.span
                            key={swap.progress}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {swap.progress}%
                          </motion.span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="bg-blue-600 h-2 rounded-full"
                            variants={progressBarVariants}
                            initial="initial"
                            animate="animate"
                            custom={swap.progress}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                        <span>Next session: {swap.nextSession}</span>
                        <span>{swap.messages} messages</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed" className="space-y-6">
            <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
              {completedSwaps.map((swap, index) => (
                <motion.div key={swap.id} variants={itemVariants} whileHover={cardHoverVariants.hover}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Avatar>
                              <AvatarImage src={swap.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {swap.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{swap.user.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{swap.skillExchange}</p>
                            {swap.feedback && <p className="text-sm text-gray-700 mb-2">"{swap.feedback}"</p>}
                            <p className="text-xs text-gray-500">Completed on {swap.completedDate}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {swap.rating ? (
                            <motion.div
                              className="flex items-center space-x-1"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {[1, 2, 3, 4, 5].map((star) => (
                                <motion.div
                                  key={star}
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      star <= swap.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                </motion.div>
                              ))}
                            </motion.div>
                          ) : swap.canRate ? (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">Rate this swap:</p>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <motion.button
                                    key={star}
                                    onClick={() => handleRateSwap(swap.id, star)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Star className="w-5 h-5 text-gray-300 hover:text-yellow-400" />
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
