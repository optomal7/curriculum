'use strict'
const loadDigest = require('../../digest')
const cheerio = require('cheerio')

describe('GET /guide route', function() {

  whenNotLoggedIn(function(){
    describe('GET /guide', function() {
      it('should redirect to login', function(){
        return this
          .get('/guide/')
          .expectToRedirectToLogin()
      })
    })
  })

  whenLoggedIn(function() {
    describe('GET /guide', function () {
      it('should render a page with iframe containing guide', function (){
        return this
          .get('/guide/')
          .then((response) => {
            const $ = cheerio.load(response.text)
            const iframes = $('iframe')
            expect(response).to.have.status(200)
            expect($('title').text()).to.equal('Guide | Curriculum - Learners Guild')
            expect(iframes.length).to.equal(1)
            expect(iframes.attr('src')).to.equal('https://guide.learnersguild.org')
            expect(iframes.attr('class')).to.equal('guide-iframe')
          })
      })
    })
  })

})
