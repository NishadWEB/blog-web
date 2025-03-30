if(window.innerWidth < 740){
  document.body.innerHTML = '<h1 class="errorMsg">Not available on phones</h1>'
}

//form title
$("#title").keydown((event) => {
  if (event.key === "Enter") {
    emptySpaceChecker(event);
  }
});

//form quote
$("#quote").keydown((event) => {
  // if (event.key === "Enter" && event.shiftKey) {
    // console.log("shift + enter is pressed");
  // } else 
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // next line prevention ( defualt action of text area is to move next line when pressed ENTER button)
    emptySpaceChecker(event);
  }
});

//form submit button
$(".subBtn").click((event) => {
  emptySpaceChecker(event);
});

//edit functionaity
$(".editBtn").click(function (event) {
  var Title = prompt("enter the TITLE to edit");
  var Quote = prompt("enter the QUOTE to edit");

  if (Title === "" || Quote === "") {
    alert("Warning : fill both TITLE and QUOTE !");
    return;
  } else if (Title === null || Quote === null) {
    //if canceled the prompt then the value will be NULL so this condition
    return;
  }

  var idOfPost = parseInt($(this).parent().parent().attr("id"));

  var data = {
    id: idOfPost,
    title: Title,
    quote: Quote,
  };

  //this is to POST the edited data
  fetch("/edit", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((updatedPost) => {
      //Dynamic updation sucess hehe ...
      var newDate = updatedPost.date;
      var currentElement = $(this).parent().parent(); // selecting the div .blog

      $(currentElement).children().eq(0).text(Title); // title h3
      $(currentElement).children().eq(1).text(Quote); //qiote p
      $(currentElement).children().eq(2).text(newDate); //date p.time
    })
    .catch((error) => console.log("error caught : " + error));
});

$(".delBtn").click(function () {
  var postToDelete = $(this).parent().parent();
  var idOfPost = parseInt(postToDelete.attr("id"));

  postToDelete.children().fadeOut(1000);
  postToDelete.slideUp(1700);

  var data = { id: idOfPost };

  //GET reqst to update the blogs[] array in the server side
  fetch("/delete", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => {
    if(data.blog.length === 0){ //recieved data is =>  blog : arrayOfBlogs (i.e = blogs)
      setTimeout(() => location.reload() , 1700)
      
    }
  })
  .catch(() => console.log('error cuaght!'));
 
  
  // postToDelete.remove();
});



function emptySpaceChecker(event) {
  var quote = $("#quote").val().trim();
  var title = $("#title").val().trim();

  if (title === "" || quote === "") {
    alert("Fill the both input fields !");
    event.preventDefault();
    // heyy uu... u can also use preventDefault() , this prevents the default action , that is ,in our case submitting the form as default behaviour of the inout field ,,, hehe..
    // return false ,. prevents both , default action and the event bubbling up , i mean propogation
  } else {
    $("#blogForm").submit();
  }
}
