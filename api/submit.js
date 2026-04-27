// api/submit.js
export default async function handler(req, res) {
  // 1. 关键步骤：设置 CORS（跨域资源共享）
  //    这告诉浏览器，允许来自任何前端地址的请求访问这个 API[reference:3]
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. 处理预检请求（Preflight Request）
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. 仅接受 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不被允许，请使用 POST' });
  }

  try {
    // 4. 解析前端传来的数据
    const { phoneNumber, colorName } = req.body;

    // 5. 简单的数据验证
    if (!phoneNumber || !colorName) {
      return res.status(400).json({ error: '手机号或颜色信息缺失' });
    }

    // 6. 🎉 最激动人心的部分：成功接收到数据！
    //    这里就是通往你手机的“数据中转站”。
    //    你可以在 Vercel 的后台日志中实时看到这些输出。
    console.log('🚀 收到新的客户意向:');
    console.log('📞 手机号:', phoneNumber, '🎨 颜色:', colorName);
    console.log('🕒 接收时间:', new Date().toISOString());

    // 7. 返回成功响应给前端
    res.status(200).json({ success: true, message: '提交成功！' });
  } catch (error) {
    console.error('处理请求时出错:', error);
    res.status(500).json({ error: '服务器内部错误，请稍后再试' });
  }
}
