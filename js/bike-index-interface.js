//import { OtherClass } from './../js/otherclass.js';


$(function() {
  $('#bikeIndexForm').submit(function(event) {
    event.preventDefault();
    $('.output').text("");

    let promise = new Promise(function(resolve, reject) {
      let thismanufacturer = $('#manufacturer').val();
      let thisdistance = $('#distance').val();

      let request = new XMLHttpRequest();

      let url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&manufacturer=${thismanufacturer}&location=IP&distance=${thisdistance}&stolenness=stolen`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        }
        else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
        //let body = JSON.parse(response);
        let bikeArry = JSON.parse(response.bikes);
        console.log(bikeArry);
        bikeArry.forEach(function(bike) {
          $('output').append(`<p>${bike}</p>`);
        });
      }, function(error) {
        $('.showErrors').text(`There was an error: ${error.message}`);
      });
  });
});
