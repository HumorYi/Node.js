module.exports = {
  username(username) {
    if (!username) {
      return '用户名不能为空';
    } else if (username.length > 32) {
      return '用户名最长32位';
    } else if (!/^\w{4,32}$/.test(username)) {
      return '格式不对';
    } else {
      return null;
    }
  },
  password(password) {
    if (!password) {
      return '密码不能为空';
    } else if (password.length > 32) {
      return '密码最长32位';
    } else {
      return null;
    }
  }
};
