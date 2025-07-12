"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, BookOpen, Star, ArrowRight, TrendingUp, Shield, MessageSquare } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const featuredSkills = [
  "Web Development",
  "Graphic Design",
  "Photography",
  "Language Exchange",
  "Music Lessons",
  "Cooking",
  "Fitness Training",
  "Writing",
  "Excel",
  "Photoshop",
]

const recentSwaps = [
  {
    id: 1,
    user1: { name: "Alice Johnson", skill: "Web Development", avatar: "/placeholder.svg?height=40&width=40" },
    user2: { name: "Bob Smith", skill: "Graphic Design", avatar: "/placeholder.svg?height=40&width=40" },
    status: "completed",
    rating: 5,
  },
  {
    id: 2,
    user1: { name: "Carol Davis", skill: "Photography", avatar: "/placeholder.svg?height=40&width=40" },
    user2: { name: "David Wilson", skill: "Music Lessons", avatar: "/placeholder.svg?height=40&width=40" },
    status: "active",
    rating: null,
  },
]

const platformStats = {
  totalUsers: 2847,
  activeSwaps: 156,
  completedSwaps: 1203,
  averageRating: 4.8,
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
}

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
}

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b"
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
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { href: "/browse", text: "Browse Skills" },
                { href: "/dashboard", text: "My Dashboard" },
                { href: "/profile", text: "Profile" },
              ].map((item, index) => (
                <motion.div key={item.href} variants={fadeInUp} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link href={item.href} className="text-gray-700 hover:text-indigo-600">
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/auth/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost">Sign In</Button>
                </motion.div>
              </Link>
              <Link href="/auth/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button>Get Started</Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Trade Skills,{" "}
            <motion.span
              className="text-indigo-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Build Community
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Connect with people in your area to exchange skills and knowledge. Teach what you know, learn what you need.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="relative max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for skills like 'Photoshop', 'Excel', 'cooking'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-indigo-500"
            />
            <Link href={`/browse?search=${searchQuery}`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">Search</Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Featured Skills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/browse?search=${skill}`}>
                  <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-indigo-100 cursor-pointer">
                    {skill}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { value: platformStats.totalUsers.toLocaleString() + "+", label: "Active Members" },
              { value: platformStats.activeSwaps + "+", label: "Active Swaps" },
              { value: platformStats.completedSwaps.toLocaleString() + "+", label: "Successful Swaps" },
              { value: platformStats.averageRating.toString(), label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div key={index} variants={scaleIn} whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="text-4xl font-bold text-indigo-600 mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h3
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            How It Works
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: BookOpen,
                title: "1. Create Profile",
                description:
                  "Set up your profile with skills you offer and want to learn. Choose public or private visibility.",
              },
              {
                icon: Search,
                title: "2. Browse & Search",
                description: "Find people with skills you want to learn by searching or browsing through profiles.",
              },
              {
                icon: MessageSquare,
                title: "3. Request Swap",
                description:
                  "Send swap requests to other users. They can accept, reject, or you can delete pending requests.",
              },
              {
                icon: Star,
                title: "4. Learn & Rate",
                description: "Complete your skill exchange and provide feedback to help build our trusted community.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 50 },
                  animate: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className="w-8 h-8 text-indigo-600" />
                    </motion.div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Recent Activity */}
      <motion.section
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Recent Skill Swaps
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {recentSwaps.map((swap, index) => (
              <motion.div
                key={swap.id}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Avatar>
                          <AvatarImage src={swap.user1.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {swap.user1.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <div className="font-medium">{swap.user1.name}</div>
                        <div className="text-sm text-gray-500">{swap.user1.skill}</div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="text-right">
                        <div className="font-medium">{swap.user2.name}</div>
                        <div className="text-sm text-gray-500">{swap.user2.skill}</div>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Avatar>
                          <AvatarImage src={swap.user2.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {swap.user2.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    </motion.div>
                  </div>
                  <motion.div
                    className="mt-4 flex justify-center items-center space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge variant={swap.status === "completed" ? "default" : "secondary"}>
                        {swap.status === "completed" ? "Completed" : "In Progress"}
                      </Badge>
                    </motion.div>
                    {swap.rating && (
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                        <span className="text-sm ml-1">{swap.rating}</span>
                      </motion.div>
                    )}
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Platform Features
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Shield,
                title: "Privacy Control",
                description:
                  "Choose to make your profile public or private. Control who can see your skills and contact you.",
              },
              {
                icon: TrendingUp,
                title: "Smart Matching",
                description: "Our algorithm suggests the best skill matches based on your interests and availability.",
              },
              {
                icon: Star,
                title: "Rating System",
                description: "Build trust in the community with our comprehensive rating and feedback system.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                      <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-indigo-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Ready to Start Swapping Skills?
          </motion.h3>
          <motion.p
            className="text-xl text-indigo-100 mb-8"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of learners and teachers in your community today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Create Your Profile
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center space-x-2 mb-4">
                <motion.div
                  className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="w-5 h-5 text-white" />
                </motion.div>
                <h4 className="text-xl font-bold">SkillSwap</h4>
              </div>
              <p className="text-gray-400">Building communities through skill sharing and knowledge exchange.</p>
            </motion.div>
            {[
              {
                title: "Platform",
                links: [
                  { href: "/browse", text: "Browse Skills" },
                  { href: "/how-it-works", text: "How It Works" },
                  { href: "/success-stories", text: "Success Stories" },
                ],
              },
              {
                title: "Community",
                links: [
                  { href: "/guidelines", text: "Guidelines" },
                  { href: "/safety", text: "Safety" },
                  { href: "/support", text: "Support" },
                ],
              },
              {
                title: "Company",
                links: [
                  { href: "/about", text: "About" },
                  { href: "/contact", text: "Contact" },
                  { href: "/privacy", text: "Privacy" },
                ],
              },
            ].map((section, index) => (
              <motion.div key={section.title} variants={fadeInUp}>
                <h5 className="font-semibold mb-4">{section.title}</h5>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link) => (
                    <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link href={link.href} className="hover:text-white">
                        {link.text}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p>&copy; 2024 SkillSwap. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
