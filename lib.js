//
// jasmine-require
//
var path     = require('path')
  , jasmine  = require('jasmine-node')
;

function Mockreq() {
  
  var parent = module.parent
    , dir    = path.dirname( parent.id )
    , pub    = {}
    , stubs  = {}
    , __req  = require;

  function resolve( ax ) {
    
    var len = ax.length;
    if ( ax[len-1][0] !== '.' ) {
      return ax[len-1];
    } else {
      return path.resolve.apply( null, ax );
    }
  }

  function getStub( path ) {
    return stubs[path];
  }

  function setStub( path, mock, methods ) {
    
    var fn;
    
    if ( arguments.length === 3 ) {
      fn = jasmine.createSpyObj( mock, methods ); 
    
    } else {
      fn = jasmine.createSpy();
    }

    stubs[path] = fn;
    return stubs[path];
  }

  pub.req = function( mod ) {
    
    var ext = path.extname( mod ) || '.js'
      , super_require = require.extensions[ext];

    require.extensions[ext] = function( mod, filename ) {

      var base = path.basename( filename )
        , mod_super_require = mod.require.bind( mod );

      mod.require = function( req ) {
        
        if ( stubs[req] ) {
          return stubs[req];
        
        } else {
          return mod_super_require( req );
        }
      };

      return super_require( mod, filename );
    };

    try { 
      return __req( resolve([ dir , mod ]) );

    } finally {
      require.extensions[ext] = super_require;
    }
  };

  pub.stub = function( path, mock, methods ) {
    return ( arguments.length === 1 ) ?
      getStub( path ) : setStub( path, mock, methods );
  };

  return pub;
}

module.exports = function() {
  return new Mockreq();
};