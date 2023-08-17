// mockData.ts
export enum UserRole {
   Subscriber = 'Subscriber',
   Developer = 'Developer',
   Manager = 'Manager',
   None = 'None',
}

export interface Project {
   id: number;
   role: UserRole;
   name: string;
   description: string;
   createDate: string;
   count: number;
   version: string;
}

export const mockProjects: Project[] = [
   {
      id: 1,
      role: UserRole.Manager,
      name: 'Manager1',
      description: '사내 릴리즈 노트 공유 시스템',
      createDate: 'Wed Jul 12 2023',
      version: '3.6.7',
      count: 5,
   },
   {
      id: 2,
      role: UserRole.Manager,
      name: 'Manager2',
      description: '사내 릴리즈 노트 공유 시스템',
      createDate: 'Wed Jul 12 2023',
      version: '3.6.7',
      count: 5,
   },
   {
      id: 3,
      role: UserRole.Developer,
      name: 'Developer1',
      description: '사내 릴리즈 노트 공유 시스템',
      createDate: 'Wed Jul 12 2023',
      version: '3.6.7',
      count: 5,
   },
   {
      id: 4,
      role: UserRole.Developer,
      name: 'Developer2',
      description: '사내 릴리즈 노트 공유 시스템',
      createDate: 'Wed Jul 12 2023',
      version: '3.6.7',
      count: 5,
   },
   {
      id: 5,
      role: UserRole.Developer,
      name: 'Developer3',
      description: '사내 릴리즈 노트 공유 시스템',
      createDate: 'Wed Jul 12 2023',
      version: '3.6.7',
      count: 5,
   },
   {
      id: 6,
      role: UserRole.Developer,
      name: 'Developer4',
      description: '사내 릴리즈 노트 공유 시스템',
      createDate: 'Wed Jul 12 2023',
      version: '3.6.7',
      count: 5,
   },
   {
      id: 7,
      role: UserRole.Developer,
      name: 'Developer5',
      description: '사내 릴리즈 노트 공유 시스템',
      createDate: 'Wed Jul 12 2023',
      version: '3.6.7',
      count: 5,
   },
   {
      id: 8,
      role: UserRole.Subscriber,
      name: '사내 릴리즈 노트 공유 시스템',
      description: '사내 릴리즈 노트 공유 시스템',
      createDate: 'Wed Jul 12 2023',
      version: '3.6.7',
      count: 5,
   },
];
