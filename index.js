'use strict';

const searchURL = 'https://api.github.com/users/'

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    
    if (responseJson.message == 'Not Found') {
        $('.error').removeClass('hidden');
        $('#results').addClass('hidden');
    } else {
        for (let i = 0; i < responseJson.length; i++){
            $('#results-list').append(
                `<li><p><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></p>
                </li>`
            )};
        $('#results').removeClass('hidden');
        $('.error').addClass('hidden');
    }
  };

function getRepos(username) {
    const url = searchURL + username + '/repos';
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const username = $('#js-username').val();
      getRepos(username);
    });
}
  
  $(watchForm);