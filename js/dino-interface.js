$(document).ready(function(){
  $('#dinoButton').click(function(event){
    $('#result').text("");
    event.preventDefault();
    let paragraph = $('.paragraph').val();
    let words = $('.words').val();
    $('.paragraph').val("");
    $('.words').val("");

    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=${paragraph}&words=${words}`;
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
      body.forEach(function(sentence){
        sentence.forEach(function(word){
          $('#result').append(word + " ");
        })
          $('#result').append("<br>");
      })
      }, function(error){
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
