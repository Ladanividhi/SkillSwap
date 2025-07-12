"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Plus, X, Edit, Save, Camera, Users } from "lucide-react"
import Link from "next/link"

const skillSuggestions = [
  "Web Development",
  "Graphic Design",
  "Photography",
  "Language Exchange",
  "Music Lessons",
  "Cooking",
  "Fitness Training",
  "Writing",
  "Marketing",
  "Data Analysis",
  "Public Speaking",
  "Gardening",
  "Carpentry",
  "Painting",
  "Excel",
  "Photoshop",
  "Video Editing",
  "3D Modeling",
  "Animation",
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    isPublic: true, // maps to !privateAccount
    availability: "",
    profilePhoto: "/placeholder.svg?height=96&width=96",
  })
  const [skillsOffered, setSkillsOffered] = useState<string[]>([])
  const [skillsWanted, setSkillsWanted] = useState<string[]>([])

  // Fetch profile from backend on mount
  React.useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")
      if (!token) return
      try {
        const res = await fetch("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (res.ok) {
          setProfileData({
            name: data.name || "",
            email: data.email || "",
            location: data.location || "",
            bio: data.bio || "",
            isPublic: !data.privateAccount,
            availability: data.availability || "",
            profilePhoto: "/placeholder.svg?height=96&width=96",
            rating: data.rating || 0,
          })
          setSkillsOffered(data.skills || [])
          setSkillsWanted(data.skillsWanted || [])
        } else {
          alert(data.message || "Failed to fetch profile")
        }
      } catch {
        alert("Network error fetching profile")
      }
    }
    fetchProfile()
  }, [])

  const [newSkillOffered, setNewSkillOffered] = useState({ name: "", level: "", description: "" })
  const [newSkillWanted, setNewSkillWanted] = useState({ name: "", priority: "" })

  // Add a skill to skillsOffered (as string)
  const [newSkillOfferedName, setNewSkillOfferedName] = useState("")
  const addSkillOffered = () => {
    if (newSkillOfferedName && !skillsOffered.includes(newSkillOfferedName)) {
      setSkillsOffered([...skillsOffered, newSkillOfferedName])
      setNewSkillOfferedName("")
    }
  }

  // Add a skill to skillsWanted (as string)
  const [newSkillWantedName, setNewSkillWantedName] = useState("")
  const addSkillWanted = () => {
    if (newSkillWantedName && !skillsWanted.includes(newSkillWantedName)) {
      setSkillsWanted([...skillsWanted, newSkillWantedName])
      setNewSkillWantedName("")
    }
  }

  // Remove by name
  const removeSkillOffered = (name: string) => {
    setSkillsOffered(skillsOffered.filter((skill) => skill !== name))
  }
  const removeSkillWanted = (name: string) => {
    setSkillsWanted(skillsWanted.filter((skill) => skill !== name))
  }

  // Save profile to backend
  const handleSave = async () => {
    setIsEditing(false)
    const token = localStorage.getItem("token")
    if (!token) return alert("Not authenticated. Please log in again.")
    try {
      const res = await fetch("http://localhost:5000/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          location: profileData.location,
          bio: profileData.bio,
          availability: profileData.availability,
          privateAccount: !profileData.isPublic,
          skills: skillsOffered,
          skillsWanted: skillsWanted,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        alert("Profile updated successfully!")
      } else {
        alert(data.message || "Failed to update profile")
      }
    } catch {
      alert("Network error updating profile")
    }
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
              <h1 className="text-xl font-bold text-gray-900">SkillSwap</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/browse" className="text-gray-700 hover:text-indigo-600">
                Browse Skills
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">
                My Dashboard
              </Link>
              <Link href="/profile" className="text-indigo-600 font-medium">
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your skills, preferences, and profile visibility</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="skills-offered">Skills I Offer</TabsTrigger>
            <TabsTrigger value="skills-wanted">Skills I Want</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your public profile information</CardDescription>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profileData.profilePhoto || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profileData.location || "Location not specified"}
                    </div>
                    <div className="flex items-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">4.9 (23 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      disabled={!isEditing}
                      placeholder="City, State/Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={profileData.availability}
                      onValueChange={(value) => setProfileData({ ...profileData, availability: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="evenings">Evenings</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell others about yourself, your interests, and what you're looking to learn or teach..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Offered Tab */}
          <TabsContent value="skills-offered">
            <Card>
              <CardHeader>
                <CardTitle>Skills I Can Teach</CardTitle>
                <CardDescription>Add the skills you can offer to others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Existing Skills */}
                <div className="space-y-4">
                  {skillsOffered.length === 0 && <p className="text-gray-500">No skills added yet.</p>}
                  {skillsOffered.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2 mb-2">
                      <Badge variant="default">{skill}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkillOffered(skill)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove ${skill}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add New Skill */}
                <Card className="p-4 border-dashed">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Skill
                    </h4>
                    <div className="space-y-4">
  <Label>Skill Name</Label>
  <div className="flex items-center gap-2">
    <Input
      type="text"
      value={newSkillOfferedName}
      onChange={e => setNewSkillOfferedName(e.target.value)}
      placeholder="Enter skill you can teach"
      disabled={!isEditing}
    />
    <Button onClick={addSkillOffered} disabled={!newSkillOfferedName.trim()}>
      Add Skill
    </Button>
  </div>
</div>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Wanted Tab */}
          <TabsContent value="skills-wanted">
            <Card>
              <CardHeader>
                <CardTitle>Skills I Want to Learn</CardTitle>
                <CardDescription>Add skills you're interested in learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Existing Skills */}
                <div className="space-y-4">
                  {skillsWanted.length === 0 && <p className="text-gray-500">No skills added yet.</p>}
                  {skillsWanted.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{skill}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkillWanted(skill)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove ${skill}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add New Skill */}
                <Card className="p-4 border-dashed">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill to Learn
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Label>Skill Name</Label>
<div className="flex items-center gap-2">
  <Input
    type="text"
    value={newSkillWantedName}
    onChange={e => setNewSkillWantedName(e.target.value)}
    placeholder="Enter skill you want to learn"
    disabled={!isEditing}
  />
  <Button onClick={addSkillWanted} disabled={!newSkillWantedName.trim()}>
    Add Skill
  </Button>
</div>
                    </div>
                    <Button onClick={addSkillWanted} className="w-full">
                      Add Skill
                    </Button>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your privacy and notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Public Profile</Label>
                    <p className="text-sm text-gray-500">Make your profile visible to other users for skill matching</p>
                  </div>
                  <Switch
                    checked={profileData.isPublic}
                    onCheckedChange={(checked) => setProfileData({ ...profileData, isPublic: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications about new swap requests and messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Location</Label>
                    <p className="text-sm text-gray-500">Display your city to help others find local skill swaps</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Digest</Label>
                    <p className="text-sm text-gray-500">Get a weekly summary of new skills and potential matches</p>
                  </div>
                  <Switch />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-4">Profile Visibility</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Your profile is currently: <strong>{profileData.isPublic ? "Public" : "Private"}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      {profileData.isPublic
                        ? "Other users can find and contact you for skill swaps."
                        : "Your profile is hidden from search results and other users cannot contact you."}
                    </p>
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
