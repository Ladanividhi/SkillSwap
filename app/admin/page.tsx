"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Shield,
  AlertTriangle,
  MessageSquare,
  Download,
  Ban,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const pendingSkills = [
  {
    id: 1,
    user: { name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    skill: "Advanced Hacking",
    description: "I can teach you how to hack into any system",
    status: "pending",
    reportedBy: 3,
    submittedDate: "2024-01-15",
  },
  {
    id: 2,
    user: { name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    skill: "Professional Photography",
    description: "Portrait and landscape photography with 10+ years experience",
    status: "pending",
    reportedBy: 0,
    submittedDate: "2024-01-14",
  },
]

const reportedUsers = [
  {
    id: 1,
    user: { name: "Bob Wilson", email: "bob@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    reportedBy: { name: "Alice Johnson", email: "alice@example.com" },
    reason: "Inappropriate behavior during skill swap",
    description: "User was unprofessional and made inappropriate comments",
    status: "pending",
    reportDate: "2024-01-13",
  },
]

const platformStats = {
  totalUsers: 2847,
  activeSwaps: 156,
  completedSwaps: 1203,
  pendingReports: 5,
  bannedUsers: 12,
  averageRating: 4.8,
}

const swapActivity = [
  {
    id: 1,
    user1: "Sarah Chen",
    user2: "Marcus Johnson",
    skills: "Web Development ↔ Graphic Design",
    status: "active",
    startDate: "2024-01-10",
  },
  {
    id: 2,
    user1: "Elena Rodriguez",
    user2: "David Kim",
    skills: "Spanish ↔ Excel",
    status: "completed",
    startDate: "2024-01-08",
  },
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [skills, setSkills] = useState(pendingSkills)
  const [users, setUsers] = useState(reportedUsers)
  const [broadcastMessage, setBroadcastMessage] = useState("")

  const handleSkillAction = (skillId: number, action: "approve" | "reject") => {
    setSkills(
      skills.map((skill) =>
        skill.id === skillId ? { ...skill, status: action === "approve" ? "approved" : "rejected" } : skill,
      ),
    )
    alert(`Skill ${action}d successfully!`)
  }

  const handleUserAction = (userId: number, action: "ban" | "warn" | "dismiss") => {
    if (action === "ban") {
      alert("User has been banned from the platform")
    } else if (action === "warn") {
      alert("Warning sent to user")
    } else {
      alert("Report dismissed")
    }
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleBroadcastMessage = () => {
    if (broadcastMessage.trim()) {
      alert(`Broadcast message sent to all users: "${broadcastMessage}"`)
      setBroadcastMessage("")
    }
  }

  const downloadReport = (type: string) => {
    alert(`Downloading ${type} report...`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <header className="bg-white shadow-sm border-b mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SkillSwap Admin</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/browse" className="text-gray-700 hover:text-indigo-600">
                Browse Skills
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">
                Dashboard
              </Link>
              <Link href="/admin" className="text-indigo-600 font-medium">
                Admin Panel
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, moderate content, and monitor platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.activeSwaps}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.completedSwaps.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.pendingReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Ban className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Banned Users</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.bannedUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skill Moderation</TabsTrigger>
            <TabsTrigger value="users">User Reports</TabsTrigger>
            <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Swap Activity</CardTitle>
                  <CardDescription>Latest skill swaps on the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {swapActivity.map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">
                          {swap.user1} ↔ {swap.user2}
                        </p>
                        <p className="text-xs text-gray-500">{swap.skills}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={swap.status === "completed" ? "default" : "secondary"}>{swap.status}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{swap.startDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Review Pending Skills ({skills.filter((s) => s.status === "pending").length})
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Handle User Reports ({users.length})
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Platform Message
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Activity Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Moderation Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Skill Descriptions</CardTitle>
                <CardDescription>Review and moderate skill descriptions submitted by users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills
                  .filter((skill) => skill.status === "pending")
                  .map((skill) => (
                    <Card key={skill.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={skill.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {skill.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold">{skill.user.name}</h4>
                              <span className="text-sm text-gray-500">({skill.user.email})</span>
                              {skill.reportedBy > 0 && <Badge variant="destructive">{skill.reportedBy} reports</Badge>}
                            </div>
                            <h5 className="font-medium mb-1">{skill.skill}</h5>
                            <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
                            <p className="text-xs text-gray-500">Submitted: {skill.submittedDate}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleSkillAction(skill.id, "approve")}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleSkillAction(skill.id, "reject")}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Reports Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Reports</CardTitle>
                <CardDescription>Handle reports about user behavior and policy violations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {users.map((report) => (
                  <Card key={report.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={report.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {report.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{report.user.name}</h4>
                            <span className="text-sm text-gray-500">({report.user.email})</span>
                            <Badge variant="outline">{report.status}</Badge>
                          </div>
                          <p className="text-sm font-medium mb-1">Reported by: {report.reportedBy.name}</p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Reason:</strong> {report.reason}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          <p className="text-xs text-gray-500">Report date: {report.reportDate}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="destructive" onClick={() => handleUserAction(report.id, "ban")}>
                          <Ban className="w-4 h-4 mr-2" />
                          Ban User
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleUserAction(report.id, "warn")}>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Send Warning
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleUserAction(report.id, "dismiss")}>
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Broadcast Tab */}
          <TabsContent value="broadcast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Broadcast</CardTitle>
                <CardDescription>Send messages to all platform users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message Type</label>
                  <Select defaultValue="announcement">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Platform Announcement</SelectItem>
                      <SelectItem value="maintenance">Maintenance Notice</SelectItem>
                      <SelectItem value="feature">New Feature Update</SelectItem>
                      <SelectItem value="policy">Policy Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message Content</label>
                  <Textarea
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Enter your message to all users..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Button onClick={handleBroadcastMessage} disabled={!broadcastMessage.trim()}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send to All Users
                  </Button>
                  <span className="text-sm text-gray-500">
                    This will notify all {platformStats.totalUsers.toLocaleString()} users
                  </span>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Recent Broadcasts</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>"Platform maintenance scheduled for this weekend"</span>
                      <span className="text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>"New skill verification feature now available"</span>
                      <span className="text-gray-500">1 week ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Report</CardTitle>
                  <CardDescription>Download comprehensive user activity data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                    onClick={() => downloadReport("user-activity")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback Logs</CardTitle>
                  <CardDescription>Export all user feedback and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                    onClick={() => downloadReport("feedback-logs")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Swap Statistics</CardTitle>
                  <CardDescription>Detailed statistics about skill swaps</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                    onClick={() => downloadReport("swap-stats")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Key metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">This Month</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>New Users:</span>
                        <span className="font-medium">247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>New Swaps:</span>
                        <span className="font-medium">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed Swaps:</span>
                        <span className="font-medium">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Rating:</span>
                        <span className="font-medium">4.8/5</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Popular Skills</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Web Development</span>
                        <span className="font-medium">45 swaps</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Graphic Design</span>
                        <span className="font-medium">32 swaps</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Photography</span>
                        <span className="font-medium">28 swaps</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Language Exchange</span>
                        <span className="font-medium">24 swaps</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
