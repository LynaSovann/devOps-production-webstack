"use client";

import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your workspace
          </p>
        </div>
      </div>
    </div>
  );
}
