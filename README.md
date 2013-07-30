# jasmine-req #

Makes testing with jasmine-node easier.

This module can stub *require* calls and replace defined module
with mocks/stubs in the testing unit.

```JavaScript
var jasmine = require('jasmine-node')
  , jasreq  = require('jasmine-req')();

var someDep = jasreq.stub(
    './someDep',
    'someDep', 
    ['fn1', 'fn2']);

someDep.fn1.andCallFake(function() {
  console.log('I am a fake');
});

var uut = jasreq.req('path/to/someModule');
uut.someDep.fn1(); /* will output "I am a fake" */

```