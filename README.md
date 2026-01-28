# 📖 My-Quran

A digital Al-Qur'an application built with React Native that provides complete access to all surahs of the Al-Qur'an with Arabic text, Latin transliteration, Indonesian translation, and Qori audio recitation.

## ✨ Features

### ✅ Available

- **Digital Al-Qur'an**
  - Complete 30 Juz with all 114 Surahs
  - Original Arabic text
  - Latin transliteration
  - Indonesian translation
  - Qori audio recitation for each verse
  - Easy navigation between surahs

### 🚧 Coming Soon

- **Prayer Time Reminder**
  - Automatic notifications at adhan time
  - Alarm reminders for all 5 prayer times
  - Location-based prayer times

- **Yasin & Tahlil**
  - Complete Surah Yasin
  - Tahlil recitation

- **Dhikir and Dua**
  - Daily dhikr collection
  - Selected Islamic supplications

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Platform**: Android
- **API**: [Equran.id API v2](https://equran.id/apidev/v2)

## 📋 Prerequisites

Make sure you have installed:

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for emulator) or VS Code if use Expo Go in your own android

## 🚀 Installation

1. Clone this repository

```bash
git clone https://github.com/Codenames-Ren/My-Quran.git
cd My-Quran
```

2. Install dependencies

```bash
npm install
```

3. Start the application

```bash
npm start
```

4. Choose an option to run:
   - Press `a` for Android emulator
   - Scan QR code with Expo Go on your Android device

## 📁 Project Structure

```
My-Quran/
├── app/                    # Main screens & routing (Expo Router)
│   └── surah/             # Surah-related screens
│       ├── _layout.tsx    # Surah layout
│       ├── index.tsx      # Surah home screen
│       ├── modal.tsx      # Modal components
│       └── quran.tsx      # Quran reading screen
├── assets/                # Images, fonts, and other resources
├── components/            # Reusable UI components
├── src/                   # Core source code
│   ├── api/              # API integration & data fetching
│   ├── constants/        # App constants and configurations
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles and themes
│   └── utils/            # Utility functions and helpers
├── scripts/              # Build and utility scripts
├── .vscode/              # VSCode configuration
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🌐 API Reference

This application uses [Equran.id API v2](https://equran.id/apidev/v2)

### Main Endpoints:

- `/surat` - Get list of all surah
- `/surat/{number}` - Get specific surah details with verses

API integration is handled in the `src/api` directory.

## 📱 Screenshots

_(Coming Soon)_

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork this repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📄 License

This open-source project is designed to help fellow Muslims read the Quran more easily.

## 👨‍💻 Developer

**Codenames-Ren**

- GitHub: [@Codenames-Ren](https://github.com/Codenames-Ren)

## 🙏 Acknowledgments

- [Equran.id](https://equran.id) for the amazing Al-Qur'an API
- Expo team for the powerful framework
- All open source contributors

---

**Made with ❤️ to help Muslims read the Al-Qur'an easily**
