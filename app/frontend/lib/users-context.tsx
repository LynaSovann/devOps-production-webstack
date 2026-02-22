'use client';

import React, { createContext, useContext } from 'react';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  joinDate: string;
  projectsCount: number;
}

interface UsersContextType {
  getAllUsers: () => UserProfile[];
  getUserById: (id: string) => UserProfile | undefined;
  updateUser: (id: string, updates: Partial<UserProfile>) => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Mock users data
const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    username: 'alex_dev',
    email: 'alex@example.com',
    bio: 'Full-stack developer | DevOps enthusiast | Cloud architect',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex@example.com',
    joinDate: '2023-06-15',
    projectsCount: 2,
  },
  {
    id: '2',
    username: 'jessica_code',
    email: 'jessica@example.com',
    bio: 'React specialist | Passionate about UX design | Open source contributor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jessica@example.com',
    joinDate: '2023-08-20',
    projectsCount: 2,
  },
  {
    id: '3',
    username: 'mike_cloud',
    email: 'mike@example.com',
    bio: 'Cloud architect | Kubernetes expert | DevOps engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike@example.com',
    joinDate: '2023-07-10',
    projectsCount: 1,
  },
  {
    id: '4',
    username: 'sara_designer',
    email: 'sara@example.com',
    bio: 'Product designer | UI/UX expert | Design systems',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara@example.com',
    joinDate: '2023-09-01',
    projectsCount: 0,
  },
  {
    id: '5',
    username: 'john_backend',
    email: 'john@example.com',
    bio: 'Backend engineer | Database optimization | System design',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john@example.com',
    joinDate: '2023-05-12',
    projectsCount: 3,
  },
];

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const getAllUsers = (): UserProfile[] => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    localStorage.setItem('users', JSON.stringify(MOCK_USERS));
    return MOCK_USERS;
  };

  const getUserById = (id: string): UserProfile | undefined => {
    const users = getAllUsers();
    return users.find((u) => u.id === id);
  };

  const updateUser = (id: string, updates: Partial<UserProfile>) => {
    const users = getAllUsers();
    const updated = users.map((u) => (u.id === id ? { ...u, ...updates } : u));
    localStorage.setItem('users', JSON.stringify(updated));
  };

  return (
    <UsersContext.Provider value={{ getAllUsers, getUserById, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within UsersProvider');
  }
  return context;
}
