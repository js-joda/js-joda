var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, '.publish'), {
  src: ['_includes/README.md', '_includes/CheatSheet.md'],
  branch: 'gh-pages',
  add: true, // otherwise all other files will be deleted
  message: 'Auto-generated commit'
}, function(err, res) {
  if (err != null) {
    console.log(err);
  } else {
    console.log('pushed gh-branch');
  }
});
