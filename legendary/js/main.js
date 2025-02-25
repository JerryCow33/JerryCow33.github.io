var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var content = this.nextElementSibling;
  $(content).slideToggle(500);
  });
} 

function hello(n){
n.scrollIntoView(true);
window.scrollBy(0, -150);
}

let storageData = localStorage.getItem('darkmode');
window.onload = init_mode();

function init_mode(){

if(storageData === "true"){
  toogle_darkmode();
}
}

function toogle_darkmode(){

document.documentElement.style.filter = "invert(100%)";
localStorage.setItem('darkmode', true);

document.getElementById("legendary_header_profile_image").style.filter = "invert(100%)";
document.getElementById("legendary_header_profile_image").style.border = "5px solid #4364ac";
document.getElementById("legendary_left_sidebar_container").style.boxShadow = "10px 5px 5px #ffffff40";
document.getElementById("legendary_top_sidebar_container").style.boxShadow = "10px 5px 5px #ffffff40";
document.getElementById("legendary_header_profile_image_border").style.boxShadow = "10px 5px 5px #ffffff40";
document.getElementById("legendary_header_profile_image_border").style.backgroundColor = "white";

document.getElementById("legendary_logo").style.filter = "invert(100%)";

document.getElementById("legendary_header_container").style.filter = "invert(100%)";
document.getElementById("legendary_header_container").style.backgroundColor = "black";
document.getElementById("legendary_header_container").style.border = "1px solid #000";

document.getElementById("legendary_header_left_image").style.display = "none";
document.getElementById("legendary_header_right_image").style.display = "none";

var elements = document.getElementsByTagName("img")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = "invert(100%)";
});

document.getElementById("legendary_header_title").style.filter = "unset";

var elements = document.getElementsByClassName("legendary_cat_image")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = "invert(100%)";
});

var elements = document.getElementsByClassName("online_user")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = "invert(100%)";
});

var elements = document.getElementsByClassName("legendary_qeel_circle")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = "invert(100%)";
  
});

var elements = document.getElementsByClassName("button-secondary")
Array.prototype.forEach.call(elements, function(element) {
  element.style.color = "#805c5c";
  element.style.border = "2px solid #fff;";
});

var elements = document.getElementsByClassName("legendary_responsive_panneau_acceuil_element")
Array.prototype.forEach.call(elements, function(element) {
  element.style.border = "1px solid #fff";
});

var elements = document.getElementsByClassName("inner")
Array.prototype.forEach.call(elements, function(element) {
  element.style.border = "1px solid #fff";
});

var elements = document.getElementsByClassName("legendary_topicview_post_banner")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = "invert(100%)";
  element.style.border = "1px solid #000";
});

var elements = document.getElementsByClassName("legendary_player_post_container")
Array.prototype.forEach.call(elements, function(element) {
  element.style.background = "#fff5dd";
});

var elements = document.getElementsByClassName("content")
Array.prototype.forEach.call(elements, function(element) {
  element.style.backgroundColor = "#eceae6";
  element.style.border = "1px solid #d2cab7";
});

var elements = document.getElementsByClassName("legendary_forum_last_poster_avatar")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = "invert(100%)";
});

var elements = document.getElementsByClassName("legendary_forum_noindex_container2")
Array.prototype.forEach.call(elements, function(element) {
  element.style.background = null;
});

var elements = document.getElementsByClassName("legendary_cat_title")
Array.prototype.forEach.call(elements, function(element) {
  element.style.backgroundColor = "#c49c71";
});

var elements = document.getElementsByClassName("legendary_memberlist_avatar_box")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = "invert(100%)";
});

var elements = document.getElementsByClassName("legendary_cat_number_image")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = null;
});

document.getElementById("darkmode_button").style.display = "none";
document.getElementById("lightmode_button").style.display = "block";

document.getElementById("legendary_staff_images").style.filter = "invert(100%)";
document.getElementById("legendary_top_voteurs_images").style.filter = "invert(100%)";

}

function toogle_lightmode(){
  document.documentElement.style.filter = null;
document.getElementById("legendary_header_profile_image").style.filter = null;
var elements = document.getElementsByTagName("img")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = null;
});

var elements = document.getElementsByClassName("legendary_cat_image")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = null;
});

var elements = document.getElementsByClassName("online_user")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = null;
});

var elements = document.getElementsByClassName("legendary_cat_number_image")
Array.prototype.forEach.call(elements, function(element) {
  element.style.filter = null;
});

document.getElementById("legendary_logo").style.filter = null;

document.getElementById("darkmode_button").style.display = "block";
document.getElementById("lightmode_button").style.display = "none";
localStorage.setItem('darkmode', false);

location.reload();
return false;
}
