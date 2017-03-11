var new_topic = {
    topic: '',
    detail: '',
    category: ''
};


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    return false;
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

$(document).ready(function(){
  $(".dropdownItem").click(function() {
    var value = this.id;
    new_topic.category = value;
    $("#displaySelectedText").text(value);
    console.log(value);
  });
});