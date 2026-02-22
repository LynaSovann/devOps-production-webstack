"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useUsers } from "@/lib/users-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { getUserById, updateUser } = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isSaving, setIsSaving] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const userProfile = user ? getUserById(user.id) : null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (user) {
        updateUser(user.id, {
          username,
          bio,
        });
      }
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your Profile
        </h1>
        <p className="text-muted-foreground mb-8">
          Manage your account settings
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border border-border bg-card sticky top-8">
              <CardContent className="pt-6 text-center">
                {user && (
                  <>
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/20"
                    />
                    <h2 className="text-xl font-bold text-foreground">
                      {user.username}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user.email}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="border border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      if (isEditing) {
                        setUsername(user?.username || "");
                        setBio(user?.bio || "");
                      }
                      setIsEditing(!isEditing);
                    }}
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted"
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Username */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                    className={`bg-input border border-border text-foreground placeholder:text-muted-foreground ${
                      !isEditing ? "opacity-50" : ""
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                    className={`bg-input border border-border text-foreground placeholder:text-muted-foreground ${
                      !isEditing ? "opacity-50" : ""
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled={true}
                    className="bg-input border border-border text-foreground placeholder:text-muted-foreground opacity-50"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Email cannot be changed
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    className={`w-full p-2 bg-input border border-border text-foreground placeholder:text-muted-foreground rounded-md ${
                      !isEditing ? "opacity-50" : ""
                    }`}
                    rows={4}
                  />
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
