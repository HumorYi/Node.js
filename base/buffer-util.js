module.exports = {
  split(buffer, delimiter) {
    /*
      // 处理的buffer
      ------WebKitFormBoundary8WtYAhgAk3YQjXNy
      Content-Disposition: form-data; name="username"

      bamboo
      ------WebKitFormBoundary8WtYAhgAk3YQjXNy
      Content-Disposition: form-data; name="password"

      123456
      ------WebKitFormBoundary8WtYAhgAk3YQjXNy
      Content-Disposition: form-data; name="file"; filename="post-file.txt"
      Content-Type: text/plain

      aaa
      bbb
      ------WebKitFormBoundary8WtYAhgAk3YQjXNy--

      //返回的buffer
      Content-Disposition: form-data; name="username"

      bamboo

      Content-Disposition: form-data; name="password"

      123456

      Content-Disposition: form-data; name="file"; filename="post-file.txt"
      Content-Type: text/plain

      aaa
      bbb
    */

    let delimiterLen = delimiter.length
    let pos = delimiterLen - 1
    let last = pos
    let arr = []

    while ((pos = buffer.indexOf(delimiter, pos)) !== -1) {
      arr.push(buffer.slice(last, pos))
      pos = pos + delimiterLen
      last = pos
    }

    return arr;
  },
  foreach(buffer, delimiter, cb) {
    // 分割buffer，处理每一个buffer
    this.split(buffer, delimiter).forEach((buffer) => {
      // 去掉前面和后面的\r\n
      buffer = buffer.slice(2, buffer.length - 2)

      // 截取信息和数据
      let pos = buffer.indexOf('\r\n\r\n')
      let info = buffer.slice(0, pos).toString()
      let data = buffer.slice(pos + 4)
      let name = info.split('; ')[1].split('=')[1].slice(1, -1)
      let type = 'text'
      let filename

      // 文件信息
      if (info.indexOf('\r\n') !== -1) {
        type = 'file'
        filename = info.split('\r\n')[0].split('filename=')[1].slice(1, -1)
      }

      cb({ type, name, filename, data })
    })
  }
}