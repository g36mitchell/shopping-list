"use strict";

/*
A shopping list should be rendered to the page
You should be able to add items to the list
You should be able to check items on the list
You should be able to delete items from the list
*/

/* initial store - this would normally come from a backend database */
const STORE = [
    {id: cuid(), name: "apples", checked: false},
    {id: cuid(), name: "oranges", checked: false},
    {id: cuid(), name: "milk", checked: true},
    {id: cuid(), name: "bread", checked: false}
  ];

function generateItemElement(item) {

//  console.log('`generateItemElement` run');

    return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {

//    console.log("Generating shopping list element");
  
    const items = shoppingList.map((item) => generateItemElement(item));
    
    return items.join("");
}


function renderShoppingList() {

    const shoppingListItemsString = generateShoppingItemsString(STORE);

    // insert that HTML into the DOM ready for new entries
    $('.js-shopping-list').html(shoppingListItemsString);
    $('.js-shopping-list-entry').val(' ');
}


function addToStore(event) {
  
   let newItem = {id: cuid(),
                  name: $(event.currentTarget).find('.js-shopping-list-entry').val(),
                  checked: false};

   STORE.unshift(newItem);
}


function removeFromStore(event) {

  //the event.currentTarget is the Delete button. traverse up the DOM to the li 
  let removeLineItem = $(event.currentTarget).closest('li').attr('data-item-id');

  for (let i = 0; i < STORE.length; i++) {
       if (STORE[i].id == removeLineItem) {
           STORE.splice(i,1);
       }
  }
}

function updateTheStore(event) {

  //the event.currentTarget is the Check button. traverse up the DOM to the li 
  let updateLineItem = $(event.currentTarget).closest('li').attr('data-item-id');

  for (let i = 0; i < STORE.length; i++) {
       if (STORE[i].id == updateLineItem) {
           STORE[i].checked = !STORE[i].checked;
       }
  }
}

function handleNewItemSubmit() {

    /* Listen for new item add event */
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();  // ignore default responses for form
        addToStore(event);
        renderShoppingList(STORE);
    });
}

function handleItemCheckClicked() {

    //  set up listener to detect user selection
    $('.js-shopping-list').on('click', '.js-item-toggle', function(event) {
        updateTheStore(event);
        renderShoppingList(STORE);
    });
}

function handleDeleteItemClicked() {

    //  set up listener to detect user selection
    $('.js-shopping-list').on('click', '.js-item-delete', function(event) {
  
          removeFromStore(event);
          renderShoppingList(STORE);
    });
}

function handleShoppingList () {

    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
}

$(handleShoppingList);