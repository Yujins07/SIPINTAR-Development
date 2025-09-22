# SIPINTAR - Smart School Management System

SIPINTAR adalah sistem manajemen sekolah yang terintegrasi dengan Computer Vision, LLM (Large Language Model), dan Generative AI untuk deteksi kehadiran siswa dan fitur-fitur cerdas lainnya.

## 🚀 Fitur Utama

### 🎯 Sistem Manajemen Sekolah
- **Manajemen Siswa**: Pendaftaran, profil, dan data akademik siswa
- **Manajemen Guru**: Profil guru, mata pelajaran, dan jadwal mengajar
- **Manajemen Kelas**: Organisasi kelas, jadwal, dan kurikulum
- **Dashboard Analytics**: Statistik real-time dan laporan komprehensif

### 🤖 AI & Computer Vision
- **Face Recognition**: Deteksi kehadiran otomatis menggunakan pengenalan wajah
- **Smart Attendance**: Sistem absensi cerdas dengan multiple metode deteksi
- **AI Insights**: Analisis pola kehadiran dan rekomendasi berbasis AI
- **Automated Reports**: Laporan otomatis dengan insight AI

### 🧠 Generative AI Features
- **Smart Analytics**: Analisis cerdas data kehadiran dan performa
- **Personalized Recommendations**: Rekomendasi personal untuk siswa dan guru
- **Automated Notifications**: Notifikasi otomatis berbasis AI
- **Predictive Insights**: Prediksi performa dan kehadiran siswa

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + Radix UI Components
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Computer Vision**: TensorFlow.js + OpenCV.js
- **AI Integration**: OpenAI GPT API
- **Real-time Features**: WebRTC for camera access

## 📦 Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm atau yarn
- OpenAI API Key (opsional untuk fitur AI)

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Yujins07/SIPINTAR-Development.git
cd SIPINTAR-Development
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
Salin file `.env` dan sesuaikan konfigurasi:
```bash
cp .env.example .env
```

Edit `.env`:
```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/sipintar_db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI API (Optional)
OPENAI_API_KEY="your-openai-api-key"

# Upload configuration
UPLOAD_DIR="./public/uploads"
```

### 4. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 👤 Demo Accounts

Setelah seeding database, gunakan akun berikut untuk testing:

- **Admin**: admin@school.com / admin123
- **Guru**: teacher@school.com / teacher123
- **Siswa**: student1@school.com hingga student20@school.com / student123

## 📱 Fitur Utama

### 🎥 Face Recognition Attendance
1. Akses dashboard admin/guru
2. Klik "Start Attendance Detection"
3. Izinkan akses kamera
4. Sistem akan mendeteksi wajah secara otomatis
5. Kehadiran tercatat dengan tingkat kepercayaan AI

### 📊 AI Analytics
- Analisis pola kehadiran siswa
- Prediksi performa akademik
- Rekomendasi personal untuk improvement
- Laporan otomatis dengan insight AI

### 🔒 Security Features
- JWT-based authentication
- Role-based access control (Admin, Guru, Siswa)
- Encrypted password storage
- Secure API endpoints

## 🗂 Struktur Project

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── login/            # Authentication pages
├── components/            # React components
│   ├── ui/               # UI components (Radix UI)
│   ├── camera-component.tsx
│   └── login-form.tsx
├── lib/                  # Utilities & services
│   ├── auth.ts           # Authentication utilities
│   ├── face-recognition.ts # Face recognition service
│   ├── ai-service.ts     # AI/LLM integration
│   ├── prisma.ts         # Database client
│   └── utils.ts          # General utilities
prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seeding script
```

## 🔧 Database Schema

### Models Utama:
- **User**: Sistem authentication
- **Student**: Data siswa
- **Teacher**: Data guru
- **Class**: Data kelas
- **Attendance**: Record kehadiran
- **AttendanceSession**: Sesi absensi

### Relasi:
- User ↔ Student/Teacher (1:1)
- Teacher ↔ Class (1:N)
- Student ↔ Class (N:1)
- Attendance ↔ Student/Class (N:1)

## 🤖 AI Features Detail

### Face Recognition
- Menggunakan TensorFlow.js untuk deteksi wajah
- Penyimpanan face embedding di database
- Real-time recognition dengan confidence scoring
- Support multiple faces dalam satu frame

### LLM Integration
- Analisis pola kehadiran dengan AI
- Generate laporan otomatis
- Rekomendasi personal berbasis data
- Chatbot untuk tanya jawab sekolah

## 📚 API Documentation

### Authentication
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user

### Attendance
- POST `/api/attendance` - Record attendance
- GET `/api/attendance` - Get attendance records

### Face Recognition
- POST `/api/face-recognition` - Process face recognition
- PUT `/api/face-recognition` - Update face data

## 🚀 Deployment

### Using Vercel
1. Push ke GitHub
2. Connect repository di Vercel
3. Set environment variables
4. Deploy automatically

### Using Docker
```bash
# Build image
docker build -t sipintar .

# Run container
docker run -p 3000:3000 sipintar
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📈 Performance Optimization

- Server-side rendering dengan Next.js
- Lazy loading untuk komponen berat
- Image optimization otomatis
- Database query optimization dengan Prisma
- Caching strategy untuk API responses

## 🔮 Roadmap

- [ ] Mobile app dengan React Native
- [ ] Advanced AI analytics dashboard
- [ ] Integration dengan sistem akademik existing
- [ ] Multi-language support
- [ ] Advanced reporting dengan charts
- [ ] Real-time notifications
- [ ] Integration dengan smart devices (RFID, QR Code)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

Untuk bantuan dan pertanyaan:
- Email: support@sipintar.com
- GitHub Issues: [Create Issue](https://github.com/Yujins07/SIPINTAR-Development/issues)

---

**SIPINTAR** - Transforming Education with AI Technology 🎓✨
