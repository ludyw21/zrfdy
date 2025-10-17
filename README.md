# TXT Processor Worker

一个Cloudflare Workers，用于从GitHub获取txt文件并处理内容。

## 功能

- 从 `https://raw.githubusercontent.com/shaoyouvip/free/refs/heads/main/base64.txt` 获取txt文件
- 处理文本内容：去掉最后一个#及#后面的时间戳
- 返回处理后的纯文本内容

## 部署

1. 安装依赖：
```bash
npm install
```

2. 登录Cloudflare账户：
```bash
npx wrangler login
```

3. 部署Worker：
```bash
npm run deploy
```

## 本地开发

```bash
npm run dev
```

## 使用

部署后，访问Worker的URL即可获取处理后的文本内容。

## 处理逻辑

Worker会：
1. 从指定的GitHub URL获取原始文本
2. 找到文本中最后一个#的位置
3. 返回最后一个#之前的内容（不包含#）
4. 如果文本中没有#，则返回原始文本

## 示例

假设原始文本为：
```
这是内容第一行
这是内容第二行#2024-01-01 12:00:00
```

处理后的文本为：
```
这是内容第一行
这是内容第二行
```