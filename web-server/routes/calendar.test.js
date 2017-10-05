'use strict'
const loadDigest = require('../../digest')
const cheerio = require('cheerio')

describe('GET /calendar route', function() {

  whenNotLoggedIn(function(){
    describe('GET /calendar', function() {
      it('should redirect to login', function(){
        return this
          .get('/calendar/')
          .expectToRedirectToLogin()
      })
    })
  })

  whenLoggedIn(function() {
    describe('GET /calendar', function () {
      it('should render a page with iframe containing calendar', function (){
        return this
          .get('/calendar/')
          .then((response) => {
            const $ = cheerio.load(response.text)
            const iframes = $('iframe')
            expect(response).to.have.status(200);
            expect($('title').text()).to.equal('Calendar | Curriculum - Learners Guild')
            expect(iframes.length).to.equal(1)
            expect(iframes.attr('src')).to.equal('https://calendar.google.com/calendar/embed?wkst=1&mode=AGENDA&src=learnersguild.org_r2argrccjqlrd6md4shel1lad4%40group.calendar.google.com&showPrint=0&showCalendars=0&ctz=America%2FLos_Angeles')
            expect(iframes.attr('class')).to.equal('phase-calendar-iframe')
            expect(iframes.attr('style')).to.equal('border-width:0')
            expect(iframes.attr('frameborder')).to.equal('0')
            expect(iframes.attr('scrolling')).to.equal('no')
          })
      })
    })
  })

})
