'use strict';

var assert      = require('../../helpers/assert');
var TestTask    = require('../../../lib/tasks/test');
var MockProject = require('../../helpers/mock-project');

describe('test', function() {
  var subject;

  it('transforms the options and invokes testem properly', function() {
    subject = new TestTask({
      project: new MockProject(),
      addonMiddlewares: function() {
        return ['middleware1', 'middleware2'];
      },
      testem: {
        startCI: function(options, cb) {
          assert.equal(options.file, 'blahzorz.conf');
          assert.equal(options.port, 123324);
          assert.equal(options.cwd, 'blerpy-derpy');
          assert.deepEqual(options.middleware, ['middleware1', 'middleware2']);
          cb(0);
        },
        app: { reporter: { total: 1 } }
      }
    });

    subject.run({
      configFile: 'blahzorz.conf',
      port: 123324,
      outputPath: 'blerpy-derpy'
    });
  });
});
