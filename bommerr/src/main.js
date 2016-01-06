import Vue from 'vue'
import App from './App'
/* eslint-disable no-new */
import Firebase from 'firebase'

var ref = new Firebase('https://popping-torch-4390.firebaseio.com/')

ref.set({
  title: 'Aldo Mendez!',
  author: 'Firebase',
  location: {
    city: 'San Francisco',
    state: 'California',
    zip: 94103
  }
})

var v = new Vue({
  el: 'body',
  data: {fb: {}},
  components: { App },
  ready: function () {
    console.log(this)
  }
})

ref.on('value', function (snapshot) {
  console.log(snapshot.val())
  v.$set('fb', snapshot.val())
})
