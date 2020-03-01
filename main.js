var usersData = [];
var current_page = 1;
var records_per_page = 3;
var objJson = []
var newObj = []
function mainFunction() {
fetch("https://jsonplaceholder.typicode.com/users") 
    
    // Converting received data to JSON 
    .then(response => 
	response.json()
	) 
    .then(json => { 
   
        // Loop through each data and add a table row 
        json.forEach(user => {  
			objJson.push({
				'id':user.id,
				'name':user.name,
				'username':user.username,
				'email':user.email,
				'phone':user.phone
			})
        }); 
   
	changePage(1,objJson)
}); 
}
function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  newObj = objJson.filter(function (x) {
  txtValue = x.username;
  return txtValue.toUpperCase().indexOf(filter) > -1
})
  if(newObj.length===0){
	changePage(1,objJson)  
  }else{
	changePage(1,newObj)  
  }
}
function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page,newObj.length>0?newObj:objJson);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page,newObj.length>0?newObj:objJson);
    }
}
    
function changePage(page,obj)
{
	var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("users");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = `<tr><th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>Phone</th></tr>`;

    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
		if(i<obj.length)
		listing_table.innerHTML += `<tr> 
                <td>${obj[i].id} </td>
                <td>${obj[i].name} </td>
                <td>${obj[i].username} </td>
                <td>${obj[i].email}</td>
                <td>${obj[i].phone}</td>           
            </tr>`;
    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

/*function numPages()
{
	var length = newObj.length>0?newObj.length:objJson.length
    return Math.ceil( length/ records_per_page);
}
*/
