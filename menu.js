var menuData;

$.ajax({
  url: 'menu.json',
  dataType: 'json',
  async: true,
  success: function(data) {
    menuData = data;

    // Populate the menu with the JSON data
    var categoriesDiv = document.querySelector('.categories');

    for (var category in menuData) {
      var categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category');
      categoryDiv.id = category.toLowerCase().replace(/\s/g, '-');
      categoriesDiv.appendChild(categoryDiv);
  
      var categoryName = document.createElement('h2');
      categoryName.textContent = category;
      categoryDiv.appendChild(categoryName);
  
      var itemList = document.createElement('ul');
      categoryDiv.appendChild(itemList);
  
      menuData[category].forEach(function(item) {
          var listItem = document.createElement('li');
          var price = "$" + item.price.toFixed(2);
          listItem.innerHTML = '<span>' + item.name + '</span><span>' + price + '</span>';
          itemList.appendChild(listItem);
      });
    }
    

    // Create buttons to scroll to each category
    var buttonList = document.createElement('button');
    buttonList.classList.add('button-list');
    buttonList.style.border = 'none';
    buttonList.style.backgroundColor = "transparent";
    

    categoriesDiv.insertBefore(buttonList, categoriesDiv.firstChild);

    for (var category in menuData) {
      var button = document.createElement('button');
      button.textContent = category;
      
      button.setAttribute('data-category', category.toLowerCase().replace(/\s/g, '-'));
      button.addEventListener('click', function() {
        var category = this.getAttribute('data-category');
        var element = document.getElementById(category);
        element.scrollIntoView({ behavior: 'smooth' });
        
      });
      buttonList.appendChild(button);
    }  
    // Add some margin to the buttons in buttonList
    var buttonListButtons = buttonList.querySelectorAll('button');
    buttonListButtons.forEach(function(button) {
      button.style.marginRight = '10px';
    });
  }
});
