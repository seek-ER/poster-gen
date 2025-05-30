# 信息可视化长海报生成器 Wiki

## 简介

本项目是一个现代化、可高度自定义的信息可视化长海报生成器，适用于产品介绍、数据报告、运营看板等多种场景。支持丰富的内容区块、主视觉插画、艺术字标题、企业Logo与底标、所见即所得导出等。

---

## 功能特性

- **主副标题**：支持多行主标题（蓝色艺术字）、副标题（加粗+渐变分割线）。
- **主视觉插画**：支持上传主视觉图片，图片与背景自然融合。
- **内容区块**：区块数量动态调整，每块支持主副标题、emoji、正文、图片上传。
- **样式自定义**：主题色、背景色、内容宽度、边框色、图片边框色、字号等均可实时调整。
- **Logo与底标**：支持右上角Logo和底部企业底标，底标自适应美观。
- **导出高清PNG**：所见即所得，导出图片与预览高度一致。

---

## 使用说明

1. 克隆或下载本项目，打开`index.html`。
2. 填写主标题、副标题，上传主视觉图片、Logo、底标。
3. 动态调整内容区块数量，填写每块内容、上传图片、选择emoji。
4. 调整样式参数，实时预览。
5. 点击"生成海报"预览，满意后点击"下载海报"保存为高清PNG图片。

---

## 样式自定义

- 主题色、背景色、内容宽度、边框色、图片边框色、字号等均可自定义。
- 主标题支持蓝色渐变艺术字、描边、阴影、发光等特效。
- 内容区块为白色大圆角卡片，主副标题分层，卡片之间有留白。
- 页脚底标自适应宽度，整体风格统一。

---

## 常见问题

### 1. 导出图片和预览不一致？
- 已针对主标题艺术字、图片加载等做兼容优化，导出图片与预览高度一致。
- 如遇特殊字体或图片未显示，请确保图片为本地上传，字体为系统字体。

### 2. 如何自定义内容区块？
- 在"内容部分数量"处调整区块数，填写每块主副标题、正文、上传图片、选择emoji。

### 3. 如何二次开发？
- 直接修改`index.html`、`styles.css`、`script.js`，结构清晰，易于扩展。

---

## 贡献方式

欢迎提交PR、Issue，或在团队内部二次开发。

---

## 许可

MIT 