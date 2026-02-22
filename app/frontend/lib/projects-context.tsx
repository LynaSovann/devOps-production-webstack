'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
  status: 'active' | 'archived';
  members: number;
}

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getUserProjects: (userId: string) => Project[];
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// Mock data
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    userId: '1',
    createdAt: '2024-01-15',
    status: 'active',
    members: 4,
  },
  {
    id: '2',
    name: 'DevOps Infrastructure',
    description: 'Cloud infrastructure setup with Kubernetes and Docker',
    userId: '1',
    createdAt: '2024-02-01',
    status: 'active',
    members: 3,
  },
  {
    id: '3',
    name: 'Mobile App v2',
    description: 'React Native mobile application',
    userId: '2',
    createdAt: '2024-01-20',
    status: 'active',
    members: 5,
  },
  {
    id: '4',
    name: 'AI Chatbot',
    description: 'AI-powered customer support chatbot',
    userId: '3',
    createdAt: '2024-02-10',
    status: 'active',
    members: 2,
  },
  {
    id: '5',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard with WebSocket updates',
    userId: '2',
    createdAt: '2024-01-30',
    status: 'archived',
    members: 3,
  },
];

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from localStorage
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(MOCK_PROJECTS);
      localStorage.setItem('projects', JSON.stringify(MOCK_PROJECTS));
    }
    setIsLoading(false);
  }, []);

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: Math.random().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
  };

  const getUserProjects = (userId: string) => {
    return projects.filter((p) => p.userId === userId);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject, getUserProjects }}>
      {!isLoading && children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
}
