# 概要
LGTM用の画像をFirebase Hosting経由で取得するchromeの拡張機能

### 事前準備
- Firebase Hostingに画像をアップロード
- アップロードした画像のリストをjson形式でconfig/hoge.jsonとして保存
- manifest.jsonに追加したjsonを指定
- js/lttm.js内でキーに対して対象のjsonを呼び出すロジックを追加

### 使い方
- chromeの拡張機能にてパッケージされていない拡張機能を読み込むでこのリポジトリのmanifest.jsonがあるディレクトリを指定して読み込む
- textボックスがある場所で`!b`などとタイプするとLGTM画像が表示される

### Thanks
[lttm-crx](https://github.com/fukayatsu/lttm-crx)
