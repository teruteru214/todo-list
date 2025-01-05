# Todoアプリ概要

## アプリURL
初期表示にラグあり
- [Vite + React + TypeScript 版 Todo アプリ](https://green-island-06327a400.4.azurestaticapps.net/)

## インフラ構成図
![インフラ構成図](https://i.gyazo.com/fa1480bc0e3dd0eb634c9590f2e9f106.png)

### **インフラ構成**
- **Static Web Apps（フロントエンド）**
  - ユーザーはStatic Web Appsを通じてTodoアプリを操作します。
  - フロントエンドはApp Service（バックエンド）にリクエストを送信し、データのやり取りを行います。
- **App Service（バックエンド）**
  - CORS設定を構成し、指定URLからのリクエストのみ許可。
  - 環境変数で管理されたSQL認証を使用し、SQL Databaseと接続。
  - `Microsoft.EntityFrameworkCore` を利用してデータベース操作を実現。
  - **注意**: 無料枠の制限でApp Serviceが東南アジアリージョンに配置されており、若干の遅延が発生する可能性あり。
- **SQL Server**
  - CRUD操作のエンジンとして機能。
- **SQL Database**
  - データの保存場所として使用。


## データベース設計

| tasks        | 型       | 説明                                    |
|--------------|----------|-----------------------------------------|
| `name`       | string   | タスク名（100文字以下の制限あり）        |
| `schedule`   | string   | タスク予定日（YYYY-MM-DD形式）          |
| `complete`   | bool     | タスクの完了状態（true/false）          |
| `create`     | datetime | 作成日時                               |
| `update`     | datetime | 更新日時                               |

## デザイン原案
- [Figma デザイン](https://www.figma.com/design/SMQJVYIwojJK0oQP9CgskC/Todo%E3%82%A2%E3%83%97%E3%83%AA?node-id=0-1&p=f&t=D38jyyTNhMnM4tYm-0)

---

# 使用技術

## フロントエンド
- React
- TypeScript
- TailwindCSS
- Shadcn/ui

TailwindCSSをベースに簡単にデザインを適用可能。

## インフラ
- Azure Static Web Apps

## CI/CD
- GitHub Actions

## ビルドツール
- Vite

開発速度を向上させるため使用。

## Formatter & Linter
- Biome

簡単に導入可能なため採用。

## パッケージマネージャ
- bun

Azure環境では未対応のため、本番環境ではnpmを使用。

## その他ライブラリ
- react-hook-form
- zod

フロント側でもフォーム入力時にバリテーションを適用。

# ディレクトリ構造

```
src
├─ components
│  ├─ parts（自作コンポーネント）
│  └─ ui（Shadcnからインストールしたコンポーネント）
├─ hooks
│  └─ index.ts（タスク管理の関数）
├─ types
│  └─ index.ts（全体で使用する型定義）
└─ App.tsx
```

# タスク管理

```
App.tsx（データベースからタスクを取得）
├─ TaskMenu（取得したタスクを管理）
│  ├─ TaskDialog
│  │  └─ AddTasksForm（複数タスクの新規作成）
│  └─ TaskTable
│     └─ TaskDialog
│        └─ TaskForm（タスクの編集）
└─ AboutAccordion
```

## タスク管理の概要

### 1. データベースとのやり取り
- タスクデータ（`tasks`）は `App.tsx` でデータベースから一括取得。
- データベースとの通信は基本的に `App.tsx` のみが担当。

### 2. フロントエンドでのデータ管理
- `TaskMenu` コンポーネントで `tasks` を受け取り、`useTasksManager` を使ってフロント側で状態を管理。
- データベースと同期しながらフロントでの表示速度を最適化。

### 3. タスクの操作フロー
- **タスクの新規作成**:
  - `TaskDialog` → `AddTasksForm` で複数タスクを登録。
- **タスクの更新**:
  - `TaskTable` → `TaskDialog` → `TaskForm` で編集。
- **タスクの削除**:
  - `TaskTable` で不要なタスクを削除。
- **タスクのチェック**:
  - `TaskTable` で完了／未完了を切り替え。
