'use client';

import { useAuth } from '@/lib/auth-context';
import { useUsers } from '@/lib/users-context';
import { useProjects } from '@/lib/projects-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const { user: currentUser } = useAuth();
  const { getUserById } = useUsers();
  const { projects } = useProjects();
  const router = useRouter();

  const user = getUserById(params.id);
  const userProjects = projects.filter((p) => p.userId === params.id);

  if (!user) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-8 flex flex-col items-center justify-center min-h-screen">
          <p className="text-muted-foreground mb-4">User not found</p>
          <Link href="/dashboard/users">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Back to Users
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === params.id;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Back Button */}
        <Link href="/dashboard/users" className="inline-block mb-6">
          <Button variant="outline" className="border-border text-foreground hover:bg-muted">
            ← Back to Users
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border border-border bg-card sticky top-8">
              <CardContent className="pt-6 text-center">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/20"
                />
                <h2 className="text-2xl font-bold text-foreground">{user.username}</h2>
                <p className="text-sm text-muted-foreground mt-2">{user.email}</p>

                {isOwnProfile && (
                  <Link href="/dashboard/profile" className="block mt-6">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Edit Profile
                    </Button>
                  </Link>
                )}

                <div className="mt-8 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">JOINED</p>
                    <p className="font-medium text-foreground">
                      {new Date(user.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">PROJECTS</p>
                    <p className="font-medium text-foreground">{userProjects.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {user.bio || 'No bio added yet.'}
                </p>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  {isOwnProfile ? 'Your projects' : `${user.username}'s projects`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userProjects.length > 0 ? (
                  <div className="space-y-4">
                    {userProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/dashboard/projects/${project.id}`}
                        className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{project.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                              project.status === 'active'
                                ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                                : 'bg-gray-500/20 text-gray-700 dark:text-gray-400'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                          <span>{project.members} members</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No projects yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{userProjects.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Active Projects</p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-lg">
                    <p className="text-2xl font-bold text-accent">
                      {userProjects.reduce((sum, p) => sum + p.members, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Total Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
