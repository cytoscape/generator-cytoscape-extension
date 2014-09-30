;(function( $, $$ ){ 'use strict';
  
  // if you need jquery (if not, then you can remove this block and the refs in the outer callback)
  if( !$ ){
    try {
      $ = require('jquery');
    } catch(e){
      console.error('Cytoscape extension tried to pull in `jquery` via require() but failed');
    }
  }

  if( !$$ ){
    try {
      $$ = require('cytoscape');
    } catch(e){
      console.error('Cytoscape extension tried to pull in `cytoscape` via require() but failed');
    }
  }

  // if you want a collection extension
  $$('collection', '{{name}}', function( options ){
    var eles = this;
    var cy = this.cy();
    
    // extension impl...

    return this; // chainability
    
  });

  // if you want a core extension
  $$('core', 'qtip', function( options ){
    var cy = this;
    var container = cy.container();

    // extension impl...

    return this; // chainability
    
  });
  
})( jQuery, cytoscape );