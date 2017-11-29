$(document).ready(function(){
  $('#searchBike').submit(function(event){
    $("#result").text("");
    event.preventDefault();
    let title = $('.title').val();
    let location = $('.location').val();
    $('.title').val("");
    $('.location').val("");

    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://bikeindex.org/api/v3/search?page=1&per_page=25&manufacturer=${title}&location=${location}&stolenness=stolen`;
      request.onload = function() {
        if(this.status === 200){
          resolve(request.response);
        } else{
          reject(Error(request.statusText));
        }
      };
      request.open("GET",url,true);
      request.send();
    });

    promise.then(function(response){
      let body = JSON.parse(response);
      body.bikes.forEach(function(bike){
        // date in UNIX timestamp(formula to convert is =(((givenNumber)/60)/60)/24)+DATE(1970,1,1);
        if(bike.date_stolen >= 1511308800 && bike.date_stolen <= 1511848800)
        {
          $('#result').append(`Bike ID: ${bike.id}` +"<br>"+ `Bike title: ${bike.title}` +"<br>");
        }
      })
    }, function(error){
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
