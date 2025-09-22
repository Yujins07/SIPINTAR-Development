import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      name: 'System Administrator',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create teacher
  const teacherPassword = await hashPassword('teacher123')
  const teacher = await prisma.teacher.create({
    data: {
      teacherNum: 'TCH001',
      name: 'John Smith',
      email: 'teacher@school.com',
      phone: '+1234567890',
      subject: 'Mathematics',
    },
  })

  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@school.com' },
    update: {},
    create: {
      email: 'teacher@school.com',
      name: 'John Smith',
      password: teacherPassword,
      role: 'TEACHER',
      teacherId: teacher.id,
    },
  })

  // Create classes
  const class1 = await prisma.class.create({
    data: {
      name: 'Mathematics 10A',
      grade: '10',
      teacherId: teacher.id,
      schedule: 'Monday, Wednesday, Friday - 09:00-10:30',
    },
  })

  const class2 = await prisma.class.create({
    data: {
      name: 'Mathematics 10B',
      grade: '10',
      teacherId: teacher.id,
      schedule: 'Tuesday, Thursday - 10:00-11:30',
    },
  })

  // Create students
  const students = []
  for (let i = 1; i <= 20; i++) {
    const studentPassword = await hashPassword('student123')
    const student = await prisma.student.create({
      data: {
        studentNum: `STD${i.toString().padStart(3, '0')}`,
        name: `Student ${i}`,
        email: `student${i}@school.com`,
        phone: `+123456789${i}`,
        address: `Address ${i}, City`,
        classId: i <= 10 ? class1.id : class2.id,
      },
    })

    await prisma.user.create({
      data: {
        email: `student${i}@school.com`,
        name: `Student ${i}`,
        password: studentPassword,
        role: 'STUDENT',
        studentId: student.id,
      },
    })

    students.push(student)
  }

  // Create some sample attendance records
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  for (const student of students.slice(0, 15)) {
    await prisma.attendance.create({
      data: {
        studentId: student.id,
        classId: student.classId!,
        userId: admin.id,
        date: today,
        status: 'PRESENT',
        method: 'FACE_RECOGNITION',
        confidence: 0.95 + Math.random() * 0.05,
      },
    })

    await prisma.attendance.create({
      data: {
        studentId: student.id,
        classId: student.classId!,
        userId: admin.id,
        date: yesterday,
        status: Math.random() > 0.1 ? 'PRESENT' : 'ABSENT',
        method: 'MANUAL',
      },
    })
  }

  console.log('Database seeding completed!')
  console.log('Demo accounts created:')
  console.log('Admin: admin@school.com / admin123')
  console.log('Teacher: teacher@school.com / teacher123')
  console.log('Students: student1@school.com to student20@school.com / student123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })