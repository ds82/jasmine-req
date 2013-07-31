# jasmine-req #

Makes testing with jasmine-node easier.

This module can stub *require* calls and replace defined module
with mocks/stubs in the testing unit.

```JavaScript
var jasmine = require('jasmine-node')
  , jasreq  = require('jasmine-req')();

var someStub = jasreq.stub(
    './someModule',
    'someModule', /* this one is optional */
    ['fn1', 'fn2']);

var uut = jasreq.req('path/to/someModule');
```