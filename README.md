# 塔羅秘境 · Arcana v3（AI 易經塔羅）

AI 塔羅占卜：每日一牌、多種牌陣、深度分析、占卜日誌與牌義辭典。

**線上使用**：https://kftseng2oo1.github.io/v3taro/

## 說明
與 [tarot](https://github.com/kftseng2oo1/tarot) 幾乎是同一個 App（tarot 版多了一個文字格式化函式，約多 2 KB），差別主要在 App 名稱（這裡叫「AI易經塔羅」）。功能說明請見 tarot 的 README；建議擇一保留。

## 主要功能
- 每日一牌、牌陣占卜（9 種問題類別，自動判斷）、✦ 深度分析（元素、星體、月相、節氣）
- 解讀風格：詩意、心理、直白；語音朗讀
- 占卜日誌、牌義辭典、每日提醒

## 技術與依賴
- 單檔 HTML PWA（`index.html` 內含全部 HTML/CSS/JS），`manifest.json` + `sw.js` 提供安裝到主畫面與離線快取。
- AI 經 `arcar.kftseng2oo1.workers.dev` 代理
