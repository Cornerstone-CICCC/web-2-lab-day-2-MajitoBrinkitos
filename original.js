'use strict'; 
const userId = 1;
const userUrl = `https://dummyjson.com/users/${userId}`; 
const postsUrl = `https://dummyjson.com/users/${userId}/posts`; 
const todosUrl = `https://dummyjson.com/users/${userId}/todos`;


//function
$(function() {
  const fetchData = () => {
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
        result.posts.forEach(post => {
          postsContent.append(`<li>${post.title}</li>`);
          postsContent.append(`${post.body}`);
        });
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
        result.todos.forEach(todo => {
          const listItem = $('<li></li>').text(todo.todo);
          todosContent.append(listItem);
        });
      }
    })
   } //end fetchData

   fetchData();

   //posts
    $('.posts h3').on('click', function() {
      console.log('clicked'); 
      $(this).next().slideToggle(1000); 
    });

    //todos
    $('.todos h3').on('click', function() {
      $(this).next().slideToggle(1000);
    });

  }); //end function


