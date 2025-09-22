import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const { studentId, classId, status, method = 'MANUAL', confidence, notes } = await request.json()

    if (!studentId || !classId || !status) {
      return NextResponse.json(
        { message: 'Student ID, class ID, and status are required' },
        { status: 400 }
      )
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if attendance already exists for today
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        studentId_classId_date: {
          studentId,
          classId,
          date: today,
        },
      },
    })

    let attendance
    if (existingAttendance) {
      // Update existing attendance
      attendance = await prisma.attendance.update({
        where: { id: existingAttendance.id },
        data: {
          status,
          method,
          confidence,
          notes,
          userId: payload.userId,
        },
        include: {
          student: true,
          class: true,
        },
      })
    } else {
      // Create new attendance record
      attendance = await prisma.attendance.create({
        data: {
          studentId,
          classId,
          userId: payload.userId,
          date: today,
          status,
          method,
          confidence,
          notes,
        },
        include: {
          student: true,
          class: true,
        },
      })
    }

    return NextResponse.json(attendance)
  } catch (error) {
    console.error('Attendance creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')
    const studentId = searchParams.get('studentId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {}
    
    if (classId) where.classId = classId
    if (studentId) where.studentId = studentId
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    const attendances = await prisma.attendance.findMany({
      where,
      include: {
        student: true,
        class: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(attendances)
  } catch (error) {
    console.error('Attendance fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}