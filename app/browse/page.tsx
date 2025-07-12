"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Star, Clock, MessageSquare, Heart, SlidersHorizontal, Users } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const skillsData = [
  {
    id: 1,
    user: {
      name: "Vidhi Ladani",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      reviewCount: 23,
      location: "San Francisco, CA",
      responseTime: "Usually responds within 2 hours",
      isPublic: true,
    },
    skill: {
      name: "Web Development",
      level: "Expert",
      description:
        "Full-stack development with React, Node.js, Python. 5+ years experience building scalable web applications.",
      tags: ["React", "Node.js", "Python", "MongoDB"],
      availability: "Weekends",
      wantsToLearn: ["Graphic Design", "Photography"],
    },
    isOnline: true,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Dhyey Shah",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviewCount: 15,
      location: "New York, NY",
      responseTime: "Usually responds within 4 hours",
      isPublic: true,
    },
    skill: {
      name: "Graphic Design",
      level: "Expert",
      description:
        "Brand identity, logo design, and digital illustrations. Adobe Creative Suite expert with 8 years experience.",
      tags: ["Adobe Illustrator", "Photoshop", "Branding", "Logo Design"],
      availability: "Evenings",
      wantsToLearn: ["Web Development", "Animation"],
    },
    isOnline: false,
    lastActive: "1 day ago",
  },
  {
    id: 3,
    user: {
      name: "Harmi kotak",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      reviewCount: 31,
      location: "Austin, TX",
      responseTime: "Usually responds within 1 hour",
      isPublic: true,
    },
    skill: {
      name: "Spanish Language",
      level: "Native",
      description:
        "Native Spanish speaker offering conversational practice and grammar lessons. Experience teaching all levels.",
      tags: ["Photography", "Video editing"],
      availability: "Flexible",
      wantsToLearn: ["python", "mongodb"],
    },
    isOnline: true,
    lastActive: "30 minutes ago",
  },
  {
    id: 4,
    user: {
      name: "Parth Chandegara",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      reviewCount: 12,
      location: "Seattle, WA",
      responseTime: "Usually responds within 3 hours",
      isPublic: true,
    },
    skill: {
      name: "Excel",
      level: "Expert",
      description:
        "Advanced Excel functions, VBA programming, data analysis, and dashboard creation for business applications.",
      tags: ["VBA", "Pivot Tables", "Data Analysis", "Dashboards"],
      availability: "Weekends",
      wantsToLearn: ["Web Development", "Marketing"],
    },
    isOnline: false,
    lastActive: "5 hours ago",
  },
  {
    id: 5,
    user: {
      name: "Shubham",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5.0,
      reviewCount: 8,
      location: "Portland, OR",
      responseTime: "Usually responds within 1 hour",
      isPublic: true,
    },
    skill: {
      name: "Photoshop",
      level: "Expert",
      description:
        "Photo editing, digital art creation, and advanced Photoshop techniques. 10+ years of professional experience.",
      tags: ["Photo Editing", "Digital Art", "Retouching", "Compositing"],
      availability: "Weekdays",
      wantsToLearn: ["Video Editing", "3D Modeling"],
    },
    isOnline: true,
    lastActive: "Just now",
  },
]

const skillCategories = [
  "All Skills",
  "Technology",
  "Creative Arts",
  "Languages",
  "Music",
  "Photography",
  "Business",
  "Fitness",
  "Cooking",
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
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export default function BrowseSkillsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Skills")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedAvailability, setSelectedAvailability] = useState("Any Time")
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [showPublicOnly, setShowPublicOnly] = useState(true)
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)

  const filteredSkills = skillsData.filter((item) => {
    const matchesSearch =
      item.skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skill.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesOnline = !showOnlineOnly || item.isOnline
    const matchesPublic = !showPublicOnly || item.user.isPublic

    return matchesSearch && matchesOnline && matchesPublic
  })

  const handleSendRequest = (skillId: number) => {
    alert(`Sending swap request for skill ${skillId}`)
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
                { href: "/browse", text: "Browse Skills", active: true },
                { href: "/dashboard", text: "My Dashboard", active: false },
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Skills</h1>
          <p className="text-gray-600">Discover skills you can learn from our community</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border p-6 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search skills, technologies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
          </motion.div>

          {/* Filter Toggle */}
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <motion.div animate={{ rotate: showFilters ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <SlidersHorizontal className="w-4 h-4" />
                </motion.div>
                <span>Filters</span>
              </Button>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.span
                className="text-sm text-gray-600"
                key={filteredSkills.length}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {filteredSkills.length} skills found
              </motion.span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  {
                    label: "Category",
                    value: selectedCategory,
                    onChange: setSelectedCategory,
                    options: skillCategories,
                  },
                  {
                    label: "Skill Level",
                    value: selectedLevel,
                    onChange: setSelectedLevel,
                    options: ["All Levels", "Beginner", "Intermediate", "Expert"],
                  },
                  {
                    label: "Availability",
                    value: selectedAvailability,
                    onChange: setSelectedAvailability,
                    options: ["Any Time", "Weekdays", "Weekends", "Evenings", "Flexible"],
                  },
                ].map((filter, index) => (
                  <motion.div
                    key={filter.label}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="text-sm font-medium">{filter.label}</label>
                    <Select value={filter.value} onValueChange={filter.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filter.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                ))}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label className="text-sm font-medium">Status</label>
                  <div className="space-y-2">
                    {[
                      { id: "online-only", label: "Online now", checked: showOnlineOnly, onChange: setShowOnlineOnly },
                      {
                        id: "public-only",
                        label: "Public profiles only",
                        checked: showPublicOnly,
                        onChange: setShowPublicOnly,
                      },
                    ].map((checkbox) => (
                      <motion.div
                        key={checkbox.id}
                        className="flex items-center space-x-2"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Checkbox id={checkbox.id} checked={checkbox.checked} onCheckedChange={checkbox.onChange} />
                        <label htmlFor={checkbox.id} className="text-sm">
                          {checkbox.label}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover="hover"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <motion.div variants={cardHoverVariants}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      {/* User Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {item.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            </motion.div>
                            {item.isOnline && (
                              <motion.div
                                className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{item.user.name}</h3>
                              <div className="flex items-center">
                                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                </motion.div>
                                <span className="text-sm font-medium ml-1">{item.user.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({item.user.reviewCount})</span>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm mb-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {item.user.location}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {item.isOnline ? "Online now" : item.lastActive}
                            </div>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>

                      {/* Skill Info */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-xl font-bold">{item.skill.name}</h4>
                          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <Badge
                              variant={
                                item.skill.level === "Expert"
                                  ? "default"
                                  : item.skill.level === "Intermediate"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {item.skill.level}
                            </Badge>
                          </motion.div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{item.skill.description}</p>

                        {/* Tags */}
                        <motion.div
                          className="flex flex-wrap gap-2 mb-3"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {item.skill.tags.map((tag, tagIndex) => (
                            <motion.div
                              key={tag}
                              variants={itemVariants}
                              whileHover={{ scale: 1.1, y: -2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Availability and Wants to Learn */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Available:</span>
                            <span className="ml-2 text-gray-600">{item.skill.availability}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Wants to learn:</span>
                            <span className="ml-2 text-gray-600">{item.skill.wantsToLearn.join(", ")}</span>
                          </div>
                        </div>
                      </div>

                      {/* Response Time */}
                      <motion.div
                        className="mb-4 p-3 bg-gray-50 rounded-lg"
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm text-gray-600">{item.user.responseTime}</p>
                      </motion.div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full" onClick={() => handleSendRequest(item.id)}>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Request
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline">View Profile</Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredSkills.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Search className="w-12 h-12 text-gray-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All Skills")
                    setShowOnlineOnly(false)
                    setShowPublicOnly(true)
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
