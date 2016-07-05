var GithubApi = require('github'),
    chai = require('chai'),
    expect = chai.expect,
    config = require('../config');

describe('Repository: ', function() {
  var github = new GithubApi({
    Promise: require('bluebird'),
    headers: {
      'user-agent': 'kanbanize-it'
    }
  });

  github.authenticate({
    type: 'oauth',
    token: config.token
  });

  // it('Delete', function() {
  //   github.repos.delete({
  //     user: config.owner,
  //     repo: config.repo
  //   });
  // });

  it('Create Commit', function(done) {

    // 1. get the current commit object
    // 2. retrieve the tree it points to
    // 3. retrieve the content of the blob object that tree has for that particular file path
    // 4. change the content somehow and post a new blob object with that new content, getting a blob SHA back
    // 5. post a new tree object with that file path pointer replaced with your new blob SHA getting a tree SHA back
    // 6. create a new commit object with the current commit SHA as the parent and the new tree SHA, getting a commit SHA back
    // 7. update the reference of your branch to point to the new commit SHA

    github.repos.getShaOfCommitRef({
      user: config.owner,
      repo: config.repo,
      ref: 'heads/master'
    })
    .then(function(res) {
      var sha = res.sha;
      var shaOfTree = res.commit.tree.sha;
      return shaOfTree;
    })
    .then(function(shaOfTree) {
      return github.gitdata.getTree({
        user: config.owner,
        repo: config.repo,
        sha: shaOfTree,
        shaOfTree: true
      });
    })
    .then(function(tree) {
      console.log(tree);
      done();
    })

    // github.gitdata.createBlob({
    //   user: config.owner,
    //   repo: config.repo,
    //   content: 'file content',
    //   encoding: 'utf-8'
    // })
    // .then(function(res) {
    //   var sha = res.sha;

    // });

    // github.repos.create({
    //   name: config.repo,
    //   auto_init: true,
    //   license_template: 'mit'
    // })
    // .then(function(res) {
    //   expect(res.id).to.not.be.null;
    //   done();
    // })
    // .catch(done);
  });
})
