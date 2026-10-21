# Smart BUKATSU 操作ガイド（初版・公開前確認用）

作成日：2026-10-21（日本時間）

## 成果物と編集場所

- `index.html`：利用者向け本文。導入チェックリスト、6分野のガイド、32件のQ＆A、講習用課題、用語集。見出しのIDで各手順へ直接リンク可能。
- `guide.css`：操作ガイドの画面表示とA4印刷の組版。既存の `../../style.css` と `../../smartbukatsu-lp.css` を読み込み、既存の色・ヘッダー・フッターを使用。共通CSSは変更していない。
- `guide.js`：モバイル目次、共通ヘッダーのメニュー、Q＆A検索、印刷時の全回答展開。外部ライブラリ、外部通信、アクセス解析、入力内容の保存はない。JavaScript無効でも本文・目次・Q＆Aを読める。
- `smartbukatsu-guide.pdf`：同じHTMLから生成したA4配布版。22ページ、ページ番号・内部リンク・しおりあり。PDFの目次ページ番号と実ページを一致させること。
- `../index.html`：既存の導入ガイド付近とフッターに操作ガイドへのリンクを追加。既存の初回登録用A4 PDFは変更していない。

このREADMEは管理・更新用。利用者向けページからはリンクしていない。

## 作成基準・根拠

アプリの参照先：`C:/projects/smartbukatsu/SMARTBUKATSU/SMARTBUKATSU`

- 調査時ブランチ：`master`
- 調査時コミット：`0b798fbc201ed464b7c83f117fc87fefab6e135f`
- `package.json` のアプリバージョン：`1.1.3`。配布中バージョンとの同一性は未確認。
- 実機・本番データには接続していない。案内図はボタン名や移動順を表したHTMLであり、実画面のスクリーンショットではない。

| 記載内容 | 主に照合したソース |
| --- | --- |
| ホーム、タブの長押し、公開範囲、通知先、新規投稿 | `src/screens/WorkspaceHomeScreen.js`、`functions/workspaceAudience.js` |
| 初回登録、既存アカウントでの参加、メール確認 | `src/screens/LoginScreen.js`、`TeamSelectScreen.js`、`EmailVerificationScreen.js` |
| 招待コード、役割、学年・グループ、子供、個別権限 | `src/screens/SettingsScreen.js` |
| 共有予定、日付選択、複数日、鉛筆からの編集、添付・場所 | `src/screens/CalendarScreen.js` |
| 通知設定、対象項目、全体・項目・チーム別の表示条件 | `src/screens/NotificationSettingsScreen.js`、`src/notifications/notificationConfig.js` |
| 動画登録、閲覧用プロジェクト、タグのOR/AND、場面選択 | `src/screens/ProjectListScreen.js` |
| タグ記録、未公開、一括公開、全体・個別の秒数 | `src/screens/ProjectDetailScreen.js`、`src/utils/recordedTagPermissions.js` |
| ノート作成、確認対象者、画像、タスク、質問・返信 | `src/screens/TacticalNotesScreen.js`、`src/components/TacticalNotePhaseTwo.js`、`src/utils/tacticalNotes.js` |

画面内の古い説明文よりも、実際のボタン表示条件・権限判定を優先して記載した。特に一般部員の動画追加・タグ編集、戦術ノートの編集権限は役割名だけで判断しない。

## 公開前の手動確認

- [ ] Android・iOSの配布版で、画面名・ボタン名・操作順を照合する。
- [ ] 監督・スタッフ・キャプテン・一般部員・保護者の見え方と、個別権限ON/OFFを確認する。
- [ ] 新規登録→メール確認→チーム参加と、既存アカウントでの参加を確認する。
- [ ] 公開範囲と通知先の異なる連絡タブで、投稿者以外の端末の受信を確認する。
- [ ] 動画タグの記録・公開→閲覧用プロジェクト→ノート添付→確認・質問を一連で確認する。
- [ ] 実画面の画像を追加する場合は、練習用データで撮影し、個人情報・招待コード・認証情報を含めない。
- [ ] 初版・確認用の注記を、実機確認後の公開版の表記へ更新する。
- [ ] 本文を変更したらPDFも再生成し、22ページを超えた場合はPDF用目次のページ番号も更新する。

アプリ側に使い方リンクやインフォメーションアイコンは追加していない。Firebase・認証・Firestore Rules・EAS・パッケージ設定も変更していない。

## 更新・検証

戦術ノート作成の冒頭に、動画の場面を添付するには先に「動画閲覧」のプロジェクトへ対象動画を登録する必要がある旨を追記。閲覧用プロジェクト作成手順へのリンクを設置し、配布用PDFにも反映した。画像だけで投稿する場合の説明は維持している。

インストール・ビルドは不要。既存サイトのルートをローカルHTTPサーバーで配信し、`/smartbukatsu/guide/` を開く。ブラウザーの印刷ではA4・倍率100%・背景の印刷を有効にする。PDF生成時はCSSの余白を使用し、ページ下部にページ番号を付与した。

初版では、Chromiumで幅320 / 390 / 768 / 1440px、目次・ヘッダーメニュー、Q＆A検索、JavaScript無効時の閲覧、内部リンク・ID重複・参照ファイルを確認。PDFはPopplerで全ページを画像化し、pypdfでページ数と全32問の収録を検査する。

実行・検証内容：

- `git status --short`、`git branch --show-current`、`git rev-parse HEAD`、`rg`、`Get-Content`：作業前後の状態と現行コードを読み取り確認。
- `node --check smartbukatsu/guide/guide.js`：構文チェック成功。
- Python `http.server`：127.0.0.1に限定した一時プレビュー。公開サーバーには接続していない。
- 一時検証スクリプト `render-guide.cjs`：リンク・画面幅・目次・検索を確認し、同じHTMLをChromiumでPDF化。JSエラー、参照先の欠落、内部リンク切れ、ID重複、横はみ出しはいずれもなし。
- `pdftoppm -r 80 -png ...`：全22ページを画像化。ページ送り・文字切れ・重なりを目視確認。
- 一時検証スクリプト `inspect-guide.py`：22ページ、Q01〜Q32の収録、文字置換エラーなし、PDF内のローカル確認用URLが残っていないことを確認。
- `git diff --check`：成功。既存HTMLの改行コードに関するGitの警告のみ。

一時検証スクリプト・画像・検証ログはCodex作業用フォルダに保存し、公開用のガイドフォルダには含めていない。アプリのテスト・実機操作・Firebase/EAS操作は実施していない。

Web用の章リンク例：`/smartbukatsu/guide/#members`、`#calendar`、`#communication`、`#video-create`、`#video-watch`、`#tactics`。将来アプリから誘導するときは、該当章へ直接リンクできる。

## 差分を戻す場合

この作業で新規作成した `guide/` 一式と、`../index.html` に追加したガイド案内・フッターリンクのみを対象にする。既存のPDF・画像・他の変更を含む一括リセットは行わない。

公開・commit・push・PR作成・管理シート更新は未実施。
