# CLASP認証トラブルシューティングガイド

## 🔥 認証プロセスが完了できない場合の解決方法

### 症状
- `npx @google/clasp login` 実行後、ブラウザで認証してもCLIに戻らない
- "認証プロセスが完了できません" エラー
- ブラウザで認証後、CLIが反応しない

## ✅ 解決方法

### 方法1: ポート変更（最も一般的な原因）
```bash
# デフォルトポート(8085)が使用されている場合
npx @google/clasp login --port 8086

# または別のポート番号を試す
npx @google/clasp login --port 9000
```

### 方法2: 既存の認証ファイルをクリア
```bash
# Windows
del %USERPROFILE%\.clasprc.json

# Mac/Linux
rm ~/.clasprc.json

# 再度ログイン
npx @google/clasp login
```

### 方法3: --no-localhost オプション使用
```bash
# ローカルホスト認証を回避
npx @google/clasp login --no-localhost

# コードが表示されるので、それをターミナルに貼り付け
```

### 方法4: 手動認証（確実な方法）
```bash
# 1. ローカルサーバーを使わない認証
npx @google/clasp login --no-localhost

# 2. ブラウザが開く
# 3. Google認証を完了
# 4. 表示される認証コードをコピー
# 5. ターミナルに戻って貼り付け
# 6. Enterキーを押す
```

### 方法5: 環境変数経由での認証
```bash
# 1. 他のマシンで認証済みの.clasprc.jsonをコピー
# 2. 環境変数に設定
set CLASP_CREDENTIALS=%USERPROFILE%\.clasprc.json

# 3. 認証確認
npx @google/clasp projects
```

## 🔍 認証状態の確認方法

### 正しい確認コマンド
```bash
# ⚠️ 間違い（存在しない）
npx @google/clasp login --status  # ❌ このオプションは存在しません

# ✅ 正しい確認方法
npx @google/clasp projects  # プロジェクト一覧が表示されれば認証成功
```

### 認証ファイルの直接確認
```bash
# Windows
type %USERPROFILE%\.clasprc.json

# Mac/Linux
cat ~/.clasprc.json

# ファイルが存在し、tokenが含まれていれば認証済み
```

## 🚨 よくあるエラーと対処法

### エラー1: "Error retrieving access token"
```bash
# 解決策
npx @google/clasp login --creds credentials.json
```

### エラー2: "Invalid grant"
```bash
# トークンが期限切れ
# 解決策: 再ログイン
del %USERPROFILE%\.clasprc.json
npx @google/clasp login
```

### エラー3: "EADDRINUSE: address already in use"
```bash
# ポートが使用中
# 解決策: 別のポートを使用
npx @google/clasp login --port 8087
```

### エラー4: "Could not read API credentials"
```bash
# 認証ファイルが壊れている
# 解決策: ファイル削除して再認証
del %USERPROFILE%\.clasprc.json
npx @google/clasp login --no-localhost
```

## 🔄 プロキシ環境での認証

### 企業プロキシ経由の場合
```bash
# プロキシ設定
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=http://proxy.company.com:8080

# no-localhost必須
npx @google/clasp login --no-localhost
```

## 💡 認証のベストプラクティス

### 1. 初回セットアップスクリプト
```bash
@echo off
echo CLASPログインを開始します...

REM 既存の認証をクリア
if exist %USERPROFILE%\.clasprc.json (
    echo 既存の認証をクリアします...
    del %USERPROFILE%\.clasprc.json
)

REM 複数の方法を試す
echo 方法1: 通常ログインを試行...
npx @google/clasp login

if errorlevel 1 (
    echo 方法1失敗。方法2を試行...
    npx @google/clasp login --port 9000
)

if errorlevel 1 (
    echo 方法2失敗。方法3（手動認証）を試行...
    npx @google/clasp login --no-localhost
)

REM 認証確認
npx @google/clasp projects
if errorlevel 0 (
    echo ✅ 認証成功！
) else (
    echo ❌ 認証失敗。手動で設定してください。
)
```

### 2. 認証バックアップ
```bash
# 認証成功後、バックアップを作成
copy %USERPROFILE%\.clasprc.json %USERPROFILE%\.clasprc.backup

# 問題が発生したら復元
copy %USERPROFILE%\.clasprc.backup %USERPROFILE%\.clasprc.json
```

## 📋 チェックリスト

認証が失敗する場合、以下を確認：

- [ ] Google アカウントにログインしているか
- [ ] Apps Script APIが有効になっているか
- [ ] ポート8085が空いているか（`netstat -an | findstr :8085`）
- [ ] ファイアウォール/アンチウイルスがブロックしていないか
- [ ] プロキシ設定が正しいか
- [ ] ブラウザのポップアップブロッカーが無効か
- [ ] 正しいGoogleアカウントで認証しているか

## 🆘 それでも解決しない場合

### 最終手段: 手動で.clasprc.jsonを作成

1. 他の環境で認証成功した`.clasprc.json`を取得
2. 以下の形式で手動作成:

```json
{
  "tokens": {
    "default": {
      "access_token": "ya29.xxx...",
      "refresh_token": "1//xxx...",
      "scope": "https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/logging.read https://www.googleapis.com/auth/script.webapp.deploy https://www.googleapis.com/auth/script.deployments",
      "token_type": "Bearer",
      "expiry_date": 1234567890000
    }
  }
}
```

3. ファイルを`%USERPROFILE%\.clasprc.json`に保存

## 🎯 推奨: 最も確実な方法

```bash
# この順番で試す
1. npx @google/clasp login --no-localhost
2. 表示されるURLをブラウザで開く
3. Googleアカウントで認証
4. 表示される認証コードをコピー
5. ターミナルに貼り付けてEnter
6. npx @google/clasp projects で確認
```

---

**⚠️ 重要**: `clasp login --status`は存在しないコマンドです。`npx @google/clasp projects`で認証状態を確認してください。