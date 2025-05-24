
// selectors
  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const item = document.querySelector('input[name="item"]');
  const actions = document.querySelector('.actions');

// constants
let items = JSON.parse(localStorage.getItem('items')) || [];

// handlers
  function handleAddItem(e){
    e.preventDefault();

   const text = item.value;
   // alert if not text
   if(!text){
    alert('Input cannot be empty.');
    return;
   }

   // create and push new item
   const newItem = {
    text,
    done: false
   }


   items.push(newItem);

   // set localstorage
   updateLocalStorage('items', items);

   // render the list of items
   renderPlatesItems(items, itemsList);

   addItems.reset();
  }


  function renderPlatesItems(items, listElement){
    if(items.length === 0){
     itemsList.innerHTML = `<li>Loading Tapas...</li>`;
      return;
    }
    // rendering all elements every render not good for perfomance
   const html = items.map((item, i) => {
     return `<li>
        <input type="checkbox" id="item${i}" data-index="${i}" ${item.done ? 'checked' : ''}/>
        <label for="item${i}">${item.text}</label>
      </li>`
    }).join('');
    listElement.innerHTML = html;
  }

  function updateState(e){
    if(!e.target.closest('input[type="checkbox"]')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    // update localstorage;
     updateLocalStorage('items', items);
  }

  function updateLocalStorage(id, data){
    localStorage.setItem(id, JSON.stringify(data));
  }

  function clearItems(id, data){
     if(items.length === 0) {
      alert('Enter items first...')
      return;
    };
    data.length = 0;
    localStorage.removeItem(id);
  }

  function handleActions(e){
    if(!e.target.closest('.btn')) return;
    const element = e.target;
    
    if(element.classList.contains('checked-all')){
      changeAllCheckBoxStatus(true);
    } else if(element.classList.contains('un-checked-all')){
      changeAllCheckBoxStatus(false);
    } else if(element.classList.contains('clear-all')){
      clearItems('items', items);
      renderPlatesItems(items, itemsList);
    }
  }




  function changeAllCheckBoxStatus(status){
    if(items.length === 0) {
      alert('Enter items first...')
      return;
    };
    if(typeof status !== 'boolean') {
      console.error('Not valid boolean type');
      return;
    }
    items = items.map(item => {
      return {
        ...item,
        done: status
      }
    } )
   
   // set localstorage
   updateLocalStorage('items', items);
   // render the list of items
   renderPlatesItems(items, itemsList);
  }

  // event hooks
  addItems.addEventListener('submit', handleAddItem);
  itemsList.addEventListener('click', updateState);
  actions.addEventListener('click', handleActions);

  // initial rendering
  renderPlatesItems(items, itemsList);