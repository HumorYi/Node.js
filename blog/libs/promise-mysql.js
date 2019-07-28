module.exports = (client, method = 'query') => {
  return {
    [method]: (...args) => {
      args = Array.from(args)

      return new Promise((resolve, reject) => {
        args.push((err, rows) => err ? reject(err) : resolve(rows));
        client[method].apply(client, args);
      });
    }
  };
};