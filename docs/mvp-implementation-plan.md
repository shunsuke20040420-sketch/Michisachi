# MVP実装計画書

## 方針

- 既存のスマホモック、配色、余白、角丸、影、下部ナビの見た目を維持する。
- TypeScript化は行わず、既存のReact + JSX構成に合わせる。
- `今日`タブをMVPのホーム画面として、習慣チェック、ダッシュボード、成長ログ入力を追加する。
- `つくる`タブに習慣管理、`相談`タブにログ一覧を追加する。
- 保存先はlocalStorageのみとし、外部API、DB、認証、通知、AI機能は追加しない。

## 変更予定/変更ファイル

- `src/lib/date.js`: 今日の日付、表示用日付、日付ソート。
- `src/lib/storage.js`: localStorageの読み書き、初期習慣データ。
- `src/lib/useHabitGrowthApp.js`: 習慣、チェック、ログの状態管理。
- `src/types/index.js`: JSDoc型定義。
- `src/components/DashboardStats.jsx`: 今日の達成率、完了数、連続記録、ログ数。
- `src/components/HabitList.jsx`: 今日の習慣チェック。
- `src/components/GrowthLogForm.jsx`: 今日の成長ログ入力と保存。
- `src/components/GrowthLogList.jsx`: 保存済みログ一覧。
- `src/components/HabitManager.jsx`: 習慣の追加と削除。
- `src/components/MainScreens.jsx`: 既存タブへMVP機能を最小差し込み。

## TODO

1. 現状調査、既存UIと保存処理の有無確認。
2. JSDoc型、日付utility、localStorage保存処理、初期習慣を追加。
3. `今日`タブに習慣チェック、達成率、完了数、連続記録、ログ数を追加。
4. `今日`タブに成長ログ入力、`相談`タブにログ一覧を追加。
5. `つくる`タブに習慣追加・削除を追加し、削除時のチェック整合性を保つ。
6. build確認、画面確認、必要最小限の修正、コミット可否確認。

## 受け入れ基準

- 習慣を追加・削除できる。
- 今日の習慣をチェック/未チェックにでき、達成率が変わる。
- 今日の成長ログを保存でき、ログ一覧に日付順で表示される。
- localStorageに保存され、リロード後も残る。
- 既存のスマホ枠、色、カード調、下部ナビを大きく変えていない。
- `npm run build` が成功する。
