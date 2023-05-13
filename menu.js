//list of categories
let categoryList = ["General Products", "Sajj", "Hot Beverages","Cold Beverages","Alcohol","Shisha"];
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBposqrlKUrs3bIaB1-1WIR10OWLMwWesE",
  authDomain: "zoukyhouse.firebaseapp.com",
  projectId: "zoukyhouse",
  storageBucket: "zoukyhouse.appspot.com",
  messagingSenderId: "879773953861",
  appId: "1:879773953861:web:121ed9346a65643759582c",
  measurementId: "G-X8NYN8T0N1"
};
firebase.initializeApp(firebaseConfig);

var categoriesDiv = document.querySelector('.categories');


categoryList.forEach((category) => {

  var firestorecollection = firebase.firestore().collection(category).orderBy('price');
  firestorecollection.get().then(function(querySnapshot) {
    var categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.id = category.toLowerCase().replace(/\s/g, '-');
    categoriesDiv.appendChild(categoryDiv);

    var categoryName = document.createElement('h2');
    categoryName.textContent = category;
    categoryDiv.appendChild(categoryName);

    var itemList = document.createElement('ul');
    categoryDiv.appendChild(itemList);
    querySnapshot.forEach(function(doc) {
      var data = doc.data();
      var listItem = document.createElement('li');
      var price = "$" + data.price.toFixed(2);
      listItem.innerHTML = '<span>' + data.name + '</span><span>' + price + '</span>';
      itemList.appendChild(listItem);
    });
  });
});

// Create buttons to scroll to each category
var buttonList = document.createElement('button');
buttonList.classList.add('button-list');
buttonList.style.border = 'none';
buttonList.style.backgroundColor = "transparent";


categoriesDiv.insertBefore(buttonList, categoriesDiv.firstChild);

categoryList.forEach((category) => {
    var button = document.createElement('button');
    button.textContent = category;
    
    button.setAttribute('data-category', category.toLowerCase().replace(/\s/g, '-'));
    button.addEventListener('click', function() {
      var category = this.getAttribute('data-category');
      var element = document.getElementById(category);
      element.scrollIntoView({ behavior: 'smooth' });
      
    });
    buttonList.appendChild(button);
});
var buttonListButtons = buttonList.querySelectorAll('button');
    buttonListButtons.forEach(function(button) {
      button.style.marginRight = '10px';
    });