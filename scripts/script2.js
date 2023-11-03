window.addEventListener('load',()=>{
    todos = JSON.parse(localStorage.getItem('todos'))||[];
    const newToDoForm = document.querySelector('#new-goal-form');
    
    newToDoForm.addEventListener('submit', e =>{
      e.preventDefault();
      const todo = {
        createdAt : new Date().getTime(),
            content : e.target.elements.content.value,
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        
        e.target.reset();
        displayTodos();
        location.reload();
    })
    displayTodos();
})

function displayTodos()
{
    const input = document.querySelector('#new-goal-input');
    const list_el = document.querySelector('#goals');
    todos.forEach(todo =>{
        const goal_el = document.createElement("div");
        goal_el.classList.add("goal");
    console.log("int loop");

      const goal_content_el = document.createElement("div");
      goal_content_el.classList.add("content");
      goal_el.appendChild(goal_content_el);

      const goal_input_el = document.createElement("input");
      goal_input_el.classList.add("text");
      goal_input_el.type = "text"; 
      goal_input_el.value= todo.content;
      goal_input_el.setAttribute("readonly", "readonly");
      goal_content_el.appendChild(goal_input_el);

      const goal_actions_el = document.createElement("div");
      goal_actions_el.classList.add("actions");

      const goal_edit_el = document.createElement("button");
      goal_edit_el.classList.add("edit");
      goal_edit_el.innerHTML = "Edit";
      const goal_delete_el = document.createElement("button");
      goal_delete_el.classList.add("delete");
      goal_delete_el.innerHTML = "Delete";

      goal_actions_el.appendChild(goal_edit_el);
      goal_actions_el.appendChild(goal_delete_el);

      goal_el.appendChild(goal_actions_el);
      list_el.appendChild(goal_el);
      input.value = "";
      goal_edit_el.addEventListener('click',()=>
      {
        console.log("beig edited");
         if(goal_edit_el.innerText.toLowerCase()=="edit")
           { 
              goal_input_el.removeAttribute("readonly");
             goal_input_el.focus();
             todo.content =  goal_input_el.value,
            localStorage.setItem('todos', JSON.stringify(todos));
             goal_edit_el.innerText = "Save";
           }
           else{
             goal_input_el.setAttribute("readonly","readonly");
             goal_edit_el.innerText ="Edit";
           }
           });


           goal_delete_el.addEventListener('click',()=>{
            var goals_dlt = localStorage.getItem('todos');
            var index = todos.indexOf(1);
            todos.splice(index,1);
            localStorage.setItem('todos', JSON.stringify(todos));
            list_el.removeChild(goal_el);
          });
 
     
    })
   
}