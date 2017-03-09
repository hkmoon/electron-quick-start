var fit = require('canvas-fit')
var debounce = require('frame-debounce')

var canvas = document.querySelector('canvas')
var display = require('./display')(canvas)
var fitter = fit(canvas)
window.addEventListener('resize', debounce(fitter), false)

var examples = require('./examples')
var src = examples.blob.trim()

const app = require('electron').remote.app

const resolver = require('glslify-resolve-remote')
  (
    { cache: app.getPath('userData') + '/.glslify' }
  )
const bundle   = require('glslify-bundle')
const deps     = require('glslify-deps')
const bl       = require('bl')

var depper = deps({ resolve: resolver })
var source = '';
depper.inline(src+'', '/', function(err, tree) {
      var source = bundle(tree)
      display.update(source.replace('#define GLSLIFY 1', '').trim());

      document.body.classList.toggle('fullscreen')
      fitter(canvas)
})
