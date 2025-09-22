// Mock Prisma client for environments without database access
interface User {
  id: string
  email: string
  name: string | null
  password: string
  role: 'ADMIN' | 'TEACHER' | 'STUDENT'
  student?: Student | null
  teacher?: Teacher | null
}

interface Student {
  id: string
  name: string
  studentNum: string
  email: string
  classId?: string | null
  faceData?: string | null
}

interface Teacher {
  id: string
  name: string
  teacherNum: string
  email: string
}

interface MockPrismaClient {
  user: {
    findUnique: (args: any) => Promise<User | null>
    create: (args: any) => Promise<User>
    upsert: (args: any) => Promise<User>
  }
  student: {
    findMany: (args: any) => Promise<Student[]>
    create: (args: any) => Promise<Student>
    update: (args: any) => Promise<Student>
  }
  teacher: {
    create: (args: any) => Promise<Teacher>
  }
  class: {
    create: (args: any) => Promise<any>
  }
  attendance: {
    findUnique: (args: any) => Promise<any | null>
    findMany: (args: any) => Promise<any[]>
    create: (args: any) => Promise<any>
    update: (args: any) => Promise<any>
  }
}

const mockPrisma: MockPrismaClient = {
  user: {
    findUnique: async (args: any) => {
      // Return demo user data for admin credentials
      if (args.where?.email === 'admin@school.com') {
        return {
          id: 'admin-1',
          email: 'admin@school.com',
          name: 'System Administrator',
          password: 'admin123',
          role: 'ADMIN',
          student: null,
          teacher: null,
        }
      }
      if (args.where?.email === 'teacher@school.com') {
        return {
          id: 'teacher-1',
          email: 'teacher@school.com',
          name: 'John Smith',
          password: 'teacher123',
          role: 'TEACHER',
          student: null,
          teacher: { id: 'teacher-1', name: 'John Smith', teacherNum: 'TCH001', email: 'teacher@school.com' },
        }
      }
      return null
    },
    create: async () => ({ id: '1', email: '', name: null, password: '', role: 'STUDENT' }),
    upsert: async () => ({ id: '1', email: '', name: null, password: '', role: 'STUDENT' }),
  },
  student: {
    findMany: async () => [],
    create: async () => ({ id: '1', name: '', studentNum: '', email: '', classId: null, faceData: null }),
    update: async () => ({ id: '1', name: '', studentNum: '', email: '', classId: null, faceData: null }),
  },
  teacher: {
    create: async () => ({ id: '1', name: '', teacherNum: '', email: '' }),
  },
  class: {
    create: async () => ({ id: '1' }),
  },
  attendance: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({ id: '1' }),
    update: async () => ({ id: '1' }),
  },
}

export const prisma = mockPrisma