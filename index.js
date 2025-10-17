export default {
  async fetch(request, env, ctx) {
    // 只处理GET请求
    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      // 从GitHub获取txt文件
      const githubUrl = 'https://raw.githubusercontent.com/shaoyouvip/free/refs/heads/main/base64.txt';
      const response = await fetch(githubUrl);
      
      if (!response.ok) {
        return new Response('Failed to fetch from GitHub', { status: 500 });
      }
      
      // 获取原始文本内容
      const originalText = await response.text();
      
      // 处理文本：去掉最后一个#及#后面的时间戳
      const processedText = processText(originalText);
      
      // 返回处理后的文本
      return new Response(processedText, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
      
    } catch (error) {
      return new Response('Internal Server Error: ' + error.message, { status: 500 });
    }
  }
};

/**
 * 处理文本内容：去掉最后一个#及#后面的时间戳
 * @param {string} text - 原始文本
 * @returns {string} - 处理后的文本
 */
function processText(text) {
  // 找到最后一个#的位置
  const lastHashIndex = text.lastIndexOf('#');
  
  if (lastHashIndex === -1) {
    // 如果没有找到#，返回原始文本
    return text;
  }
  
  // 返回最后一个#之前的内容（不包含#）
  return text.substring(0, lastHashIndex).trim();
}