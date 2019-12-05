module.exports = {
  name: 'book-store',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/book-store',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
