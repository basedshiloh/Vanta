# Vanta Trading Bot - Landing Page

The official landing page for **Vanta Trading Bot**, a chat-native, command-based crypto trading bot on Telegram.

## About Vanta Bot

**Vanta Bot** is designed for users who want to execute trades instantly—right where conversations already happen. Imagine text-based trading native to Telegram and optimized for speed.

Most Telegram trading bots rely heavily on button-based interfaces, which add friction: multiple clicks, delayed execution, and slower reaction times. **Vanta Bot removes that friction** with direct command execution.

### Chat-Native, Command-Based Trading

Trade through simple text prompts instead of navigating button-heavy interfaces:

```
/buy {TOKEN} {amount} ETH
```

Because Vanta Bot operates directly inside chats, it transforms Telegram from a messaging app into a **live trading environment**.

### Features

- Buy and sell tokens directly in group chats
- Send tokens to other Telegram handles instantly
- Distribute airdrops on group chats
- Limit Orders and Stop Loss (via command)
- Trailing Stop Loss (via command — Coming Soon)
- Multi-chain support
- And more to come

### Built for Speed & Reliability

Vanta Bot runs on fast, dedicated infrastructure optimized for low-latency command execution and reliable transaction submission—even during high-traffic moments.

### Platform Today, Vision Tomorrow

Vanta Bot is currently available on **Telegram**. The roadmap includes:

- Desktop trading terminals
- Expanded multi-chain support
- Multi-platform support (Base App, Farcaster, X, Discord, WhatsApp)

Vanta is building toward a **universal trading layer for chat-based crypto execution**.

---

## Documentation

- [Vanta Trading Documentation](https://vanta-trading.gitbook.io/vanta-trading-docs)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP, Lenis smooth scrolling
- **Theme**: next-themes (dark/light mode)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/             # Next.js App Router (pages, layout)
│   ├── components/      # React components (homepage sections, shared)
│   ├── data/            # Static content
│   ├── hooks/           # Custom hooks
│   ├── styles/          # CSS
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utilities
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

## 📖 Additional Docs

- [Development Guide](./DEVELOPMENT.md) - Development workflow and code quality tools
