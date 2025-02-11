'use strict'; 
let userId = 1;

//Url's based on userId
const generateUrls = (userId) => ({
  userUrl: `https://dummyjson.com/users/${userId}`, 
  postsUrl: `https://dummyjson.com/users/${userId}/posts`,
  todosUrl: `https://dummyjson.com/users/${userId}/todos`,
});

//fetch and display
const fetchData = (userId) => {
  const { userUrl, postsUrl, todosUrl } = generateUrls(userId);

  $.ajax({
    url: userUrl,
    method: 'GET',
    //success
    success: function(result){
      $('.info__image img').attr('src', result.image);
      $('.info__content').html(`
          <h1> ${result.firstName} ${result.lastName}</h1>
          <p>Age: ${result.age} </p>
          <p>Email: ${result.email}</p>
          <p>Phone: ${result.phone}</p>
        `);

        //posts
        $('.posts h3').text(`${result.firstName}'s Posts`);
    
        //todos
        $('.todos h3').text(`${result.firstName}'s To Dos`);

    },
    //error
    error: function(xhr, status, error){
      console.error('Error during connection: ', xhr.status, status, error);
    }
  });

    //Posts Content
    $.ajax({
      url: postsUrl,
      method: 'GET',
      //success
      success: function(result){
        const postsContent = $('.posts ul');
        postsContent.empty();
        
        if(result.posts && result.posts.length > 0){
          result.posts.forEach(post => {
            postsContent.append(`<li>${post.title}</li>`);
            postsContent.append(`${post.body}`);
          });
        } else {
          postsContent.append('<li>No posts available</li>');
        }
      },
      //error
      error: function(xhr, status, error){
        console.error('Error during connection: ', xhr.status, status, error);
      }
    });

    //Todos Content
    $.ajax({
      url: todosUrl,
      method: 'GET',
      //success
      success: function(result){
        const todosContent = $('.todos ul');
        todosContent.empty();

        if(result.todos && result.todos.length > 0){
          result.todos.forEach(todo => {
            const listItem = $('<li></li>').text(todo.todo);
            todosContent.append(listItem);
          });
        } else {
          todosContent.append(`<li>User has no todos</li>`);
        }
      },
      //error
      error: function(xhr, status, error){
        console.error('Error during connection: ', xhr.status, status, error);
      }
    });
};

//function
$(function() {
  fetchData(userId);

  //next user
  $('button:contains("Next User")').on('click', function() {
    userId += 1;
    fetchData(userId);
  })

  //previous user
  $('button:contains("Previous User")').on('click', function() {
    if(userId > 1) {
      userId -= 1;
      fetchData(userId);
    }
  });

  //Toggle posts
    $('.posts h3').on('click', function() {
      console.log('clicked'); 
      $(this).next().slideToggle(1000); 
    });

    //Toggle todos
    $('.todos h3').on('click', function() {
      $(this).next().slideToggle(1000);
    });
});

  



