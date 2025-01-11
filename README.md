# Next.js Modern Stack Template 🚀

A modern, feature-rich Next.js template that helps you kickstart your project with the best tools and practices in the React ecosystem.

## ✨ Features

- ⚡️ **Next.js 15** - The latest version with App Router and Server Components
- 🎨 **Tailwind CSS** - A utility-first CSS framework for rapid UI development
- 🔐 **Authentication** - Secure authentication using Auth.js (formerly NextAuth.js)
- 🗃️ **Drizzle ORM** - Type-safe database queries and schema management
- 🎯 **shadcn/ui** - Beautiful and accessible UI components
- 📦 **TypeScript** - Type safety and better developer experience
- 🔍 **ESLint & Prettier** - Code linting and formatting
- 🧪 **Testing Setup** - Ready-to-use testing configuration
- 🚄 **Bun** - Super fast JavaScript runtime and package manager

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ecarry/nextjs-template
cd nextjs-template
```

2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
bun run dev
```

Visit `http://localhost:3000` to see your application.

## 📚 Project Structure

```
./src
├── app
│   ├── (auth)
│   ├── (home)
│   ├── api
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components
├── db
├── features
│   └── auth
└── lib
    └── utils.ts
```

## 🛠️ Technologies

- **Framework**: Next.js 15
- **Package Manager**: Bun
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database ORM**: Drizzle
- **Authentication**: Auth.js
- **State Management**: React Hooks + Context
- **Deployment**: Vercel (recommended)

## 🔧 Configuration

### Database Setup

1. Update your database configuration in `drizzle.config.ts`
2. Run migrations:

```bash
bun db:migrate
```

### Authentication

1. Configure your authentication providers in `.env.local`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💫 Support

If you find this template helpful, please give it a ⭐️ on GitHub!
