const { Form } = require('multiparty')
const file = require('../libs/file')
const router = require('../libs/router')()
const { HTTP_ROOT, HTTP_UPLOAD } = require('../config')

router.get('/', (req, res) => {
  let filePath = HTTP_ROOT + 'index.html'
  file.gzip(filePath, res);
})

router.post('/upload', (req, res) => {
  //文件POST
  let form = new Form({ uploadDir: HTTP_UPLOAD });
  form.parse(req);

  form.on('field', (name, value) => {
    console.log("fieldName :", name);
    console.log("fieldValue :", value);

  });
  form.on('file', (name, file) => {
    console.log("fileName :", name);
    console.log("file :", file);
  });

  form.on('error', err => {
    console.error(err);
  });
  form.on('close', () => {
    console.log('close');
  });
})

module.exports = router