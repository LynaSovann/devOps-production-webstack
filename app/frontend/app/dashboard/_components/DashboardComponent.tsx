"use client";

import { useAuth } from "@/lib/auth-context";
import { useProjects } from "@/lib/projects-context";
import { useUsers } from "@/lib/users-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DashboardComponent() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { getAllUsers } = useUsers();

  const userProjects = projects.filter((p) => p.userId === user?.id);
  const allUsers = getAllUsers();

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Your Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {userProjects.length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Active projects
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {allUsers.length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total in workspace
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {projects.length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Across all teams
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Your Projects</h2>
            <Link
              href="/dashboard/projects"
              className="text-primary text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {userProjects.length > 0 ? (
              userProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-medium text-foreground">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.status === "active"
                          ? "bg-green-500/20 text-green-700 dark:text-green-400"
                          : "bg-gray-500/20 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No projects yet. Create one to get started!
              </p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Quick Stats
          </h2>
          <Card className="border border-border bg-card">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Project Completion
                    </span>
                    <span className="text-sm text-muted-foreground">80%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-4/5"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Team Utilization
                    </span>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full w-2/3"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Development Speed
                    </span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
