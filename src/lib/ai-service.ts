import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface StudentData {
  name: string
  studentNum: string
  class?: { name: string }
}

interface AttendanceRecord {
  date: string
  status: string
  method: string
}

interface ClassData {
  name: string
  grade: string
  teacher?: { name: string }
  students?: unknown[]
}

interface AttendanceStats {
  date: string
  present: number
  total: number
}

export class AIService {
  async generateStudentReport(studentData: StudentData, attendanceData: AttendanceRecord[]): Promise<string> {
    try {
      const prompt = `
        Analyze the following student data and attendance records to generate a comprehensive report:
        
        Student: ${studentData.name}
        Student ID: ${studentData.studentNum}
        Class: ${studentData.class?.name || 'Not assigned'}
        
        Attendance Records (last 30 days):
        ${attendanceData.map(record => 
          `Date: ${record.date}, Status: ${record.status}, Method: ${record.method}`
        ).join('\n')}
        
        Please provide:
        1. Attendance percentage and trend analysis
        2. Behavioral insights based on attendance patterns
        3. Recommendations for improvement
        4. Potential concerns to address
        
        Keep the report professional and constructive.
      `

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an educational AI assistant that generates insightful student reports based on attendance data."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000
      })

      return response.choices[0]?.message?.content || 'Unable to generate report at this time.'
    } catch (error) {
      console.error('AI report generation failed:', error)
      return 'Error generating AI report. Please try again later.'
    }
  }

  async generateClassInsights(classData: ClassData, attendanceData: AttendanceStats[]): Promise<string> {
    try {
      const prompt = `
        Analyze the following class attendance data to provide insights:
        
        Class: ${classData.name}
        Grade: ${classData.grade}
        Teacher: ${classData.teacher?.name}
        Total Students: ${classData.students?.length || 0}
        
        Recent Attendance Data:
        ${attendanceData.map(record => 
          `Date: ${record.date}, Present: ${record.present}, Total: ${record.total}, Rate: ${((record.present/record.total)*100).toFixed(1)}%`
        ).join('\n')}
        
        Provide insights on:
        1. Overall attendance trends
        2. Days with concerning attendance rates
        3. Recommendations for improving attendance
        4. Patterns that might indicate issues
      `

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an educational data analyst providing insights on class attendance patterns."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800
      })

      return response.choices[0]?.message?.content || 'Unable to generate insights at this time.'
    } catch (error) {
      console.error('AI insights generation failed:', error)
      return 'Error generating AI insights. Please try again later.'
    }
  }

  async generateAttendanceReminder(studentName: string, missedDays: number): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Generate a friendly but professional attendance reminder message for a student."
          },
          {
            role: "user",
            content: `Create a personalized attendance reminder for ${studentName} who has missed ${missedDays} days recently. Keep it encouraging and supportive.`
          }
        ],
        max_tokens: 200
      })

      return response.choices[0]?.message?.content || `Dear ${studentName}, we've noticed you've missed ${missedDays} days recently. Please reach out if you need any support.`
    } catch (error) {
      console.error('AI reminder generation failed:', error)
      return `Dear ${studentName}, we've noticed you've missed ${missedDays} days recently. Please reach out if you need any support.`
    }
  }
}

export const aiService = new AIService()