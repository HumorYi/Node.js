/**
 * jwt 原理解析：
 *  1、Bearer Token 有三部分组成，使用 . 连接：令牌头、payload、hash
 *    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExMTEifSwiZXhwIjoxNTk0NTM0NzQ0LCJpYXQiOjE1OTQ1MzExNDR9.BggyU0D-VhDWyA2UaCnGoBRmcwH4SukNK32WxYK9MF8
 *
 *  2、base64 可逆
 *
 *  3、签名：默认使用 base64 对 payload 编码，使用 hsa256 算法对令牌头、payload 和 密钥 进行签名生成 hash
 *
 *  4、验证：默认使用 hsa256 算法 对 令牌中数据签名并将结果和令牌中 hash 对比
 *
 *
 * HMAC SHA256 HMAC(Hash Message Authentication Code，散列消息鉴别码，基于密钥的Hash算法的认证协议。
 * 消息鉴别码实现鉴别的原理是，用公开函数和密钥产生一个固定长度的值作为认证标识，用这个标识鉴别消息的完整性。
 * 使用一个密钥生成一个固定大小的小数据块，即 MAC，并将其加入到消息中，然后传输。接收方利用与发送方共享的密钥进行鉴别认证等。
 *
 * BASE64 按照RFC2045的定义，Base64被定义为：Base64内容传送编码被设计用来把任意序列的8位字节描述为一种不易被人直接识别的形式。
 * （The Base64 Content-Transfer-Encoding is designed to represent arbitrary sequences of octets in a form that need not be humanly readable.）
 * 常见于邮件、http加密，截取http信息，你就会发现登录操作的用户名、密码字段通过BASE64编码的
 *
 * Beare
 *  Beare作为一种认证类型(基于OAuth 2.0)，使用"Bearer"关键词进行定义
 */
const jwt = require('jsonwebtoken')
const secret = '12345678'
const opt = {
  secret: 'jwt_secret',
  key: 'user'
}

const user = {
  username: 'abc',
  // 注意：敏感信息不要放在 payload 中
  password: '111111'
}

const token = jwt.sign({
  data: user,
  // 设置 token 过期时间，一小时后，秒为单位
  exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, secret)

console.log('encode token:', token)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExMTEifSwiZXhwIjoxNTk0NTM0NzQ0LCJpYXQiOjE1OTQ1MzExNDR9.BggyU0D-VhDWyA2UaCnGoBRmcwH4SukNK32WxYK9MF8

console.log('decode token:', jwt.verify(token, secret, opt))
// {
//   data: { username: 'abc', password: '111111' },
//   exp: 1594534756,
//   iat: 1594531156 // token 签名时间
// }