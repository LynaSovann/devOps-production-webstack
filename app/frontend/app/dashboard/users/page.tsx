"use client";

import { useState } from "react";
import { useUsers } from "@/lib/users-context";
import { useProjects } from "@/lib/projects-context";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function UsersPage() {
  const { getAllUsers } = useUsers();
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");

  const allUsers = getAllUsers().filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-1">
            View and interact with team members
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Users Grid */}
        {allUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUsers.map((userProfile) => {
              const userProjectCount = projects.filter(
                (p) => p.userId === userProfile.id,
              ).length;
              return (
                <Card
                  key={userProfile.id}
                  className="border border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.username}
                        className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-primary/20"
                      />
                      <h3 className="text-lg font-bold text-foreground">
                        {userProfile.username}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.email}
                      </p>
                    </div>

                    {userProfile.bio && (
                      <p className="text-sm text-foreground mt-4 text-center italic">
                        {userProfile.bio}
                      </p>
                    )}

                    <Link
                      href={`/dashboard/users/${userProfile.id}`}
                      className="block mt-6"
                    >
                      <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium">
                        View Profile
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border border-border bg-card">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-muted-foreground">No users found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
