var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.vue',
  compilers: {
    sass: {
      outputStyle: 'compressed'
    }
  }
}
