# 使用技術
## フロントエンド
- React
- Typescript
- TailwindCSS
- Shadcn/ui

## インフラ
- Azure Static Web Apps

## CI/CD
- Github Actions

## ビルドツール
- Vite

## Formatter & Linter
- Biome

## パッケージマネージャ-
- bun

Azure環境ではbun非対応であるため、本番環境ではnpmを使用しています。

## その他ライブラリ
- react-hook-form
- zod

# ディレクトリ
```
src
├─ components
│  ├─ parts(自作コンポーネント)
│  └─ ui(Shadcnからインストールしたコンポーネント)
├─ hooks
│  └─ index.ts(タスク管理の関数)
├─ types
│  └─ index.ts(全体で使用する型)
└─ App.tsx
```

# 画面遷移図
[figma](https://www.figma.com/design/SMQJVYIwojJK0oQP9CgskC/Todo%E3%82%A2%E3%83%97%E3%83%AA?node-id=0-1&p=f&t=D38jyyTNhMnM4tYm-0)
