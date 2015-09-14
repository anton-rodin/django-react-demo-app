module.exports = function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
};
