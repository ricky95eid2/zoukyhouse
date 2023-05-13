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

function editProduct(category, id,name,price) {

  // Get the edit product form and container
    var editProductForm = document.getElementById("edit-product-form");
    var editProductFormContainer = document.querySelector(".edit-product-form-container");
    const exitBtn = document.getElementById('exit-btn');
    exitBtn.addEventListener('click', hideEditProductForm);
    // Show the edit product form
    function showEditProductForm(category,name,price) {
      // Populate the form fields with the product data
      document.getElementById("edit-product-category").value = category;
      document.getElementById("edit-product-name").value = name;
      document.getElementById("edit-product-price").value = price;

      // Display the edit product form container
      editProductFormContainer.style.display = "block";
    }

    // Hide the edit product form
    function hideEditProductForm() {
      editProductFormContainer.style.display = "none";
    }
    showEditProductForm(category,name,price);
    // Handle the form submission
    editProductForm.addEventListener("submit", function(event) {
      event.preventDefault();

      // Get the form data

      var productName = document.getElementById("edit-product-name").value;
      var productPrice = document.getElementById("edit-product-price").value;

      // Update the product in the database
      firebase.firestore().collection(category).doc(id).update({
        name: productName,
        price: parseFloat(productPrice)
      })
      .then(function() {
        console.log("Product updated successfully");
        hideEditProductForm();
        location.reload();
      })
      .catch(function(error) {
        console.error("Error updating product: ", error);
      });
    });
  }
  
  function deleteProduct(category,doc) {
    // Get the product document reference
    var productRef = firebase.firestore().collection(category).doc(doc.id).delete()
    .then(function() {
      console.log("Product deleted successfully");
      location.reload();
    })
    .catch(function(error) {
      console.error("Error deleting product: ", error);
    });
  }
    
function createTable() {
    // Get the reference to the table body
    const tableBody = document.querySelector('#product-table tbody');
  
    // Clear the existing rows from the table
    tableBody.innerHTML = '';
    
    categoryList.forEach((category) => {
        var firestorecollection = firebase.firestore().collection(category);
        firestorecollection.get().then(function(querySnapshot) {
            querySnapshot.forEach((doc) => {
                
                const data = doc.data();
          
                // Create a new row element
                const row = document.createElement('tr');
          
                // Create a cell for the category
                const categoryCell = document.createElement('td');
                categoryCell.innerText = category;
                row.appendChild(categoryCell);
          
                // Create a cell for the name
                const nameCell = document.createElement('td');
                nameCell.innerText = data.name;
                row.appendChild(nameCell);
          
                // Create a cell for the price
                const priceCell = document.createElement('td');
                priceCell.innerText = data.price;
                row.appendChild(priceCell);
          
                // Create a cell for the actions (edit and delete buttons)
                const actionsCell = document.createElement('td');
          
                // Create the edit button
                const editButton = document.createElement('button');
                editButton.innerText = 'Edit';
                editButton.addEventListener('click', () => {
                  // Call the editProduct function and pass the document ID
                  editProduct(category,doc.id,data.name,data.price);
                });
                actionsCell.appendChild(editButton);
          
                // Create the delete button
                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', () => {
                  // Call the deleteProduct function and pass the document ID
                  deleteProduct(category,doc);
                });
                actionsCell.appendChild(deleteButton);
          
                row.appendChild(actionsCell);
          
                // Add the row to the table body
                tableBody.appendChild(row);
              });

        });

    });
  }
  
// Call the createTable function to create the initial table
createTable();