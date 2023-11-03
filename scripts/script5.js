window.addEventListener('load',()=>{
    c = JSON.parse(localStorage.getItem('c'))||[];
    const newToDoForm = document.querySelector('#new-cpt-form');
    
    newToDoForm.addEventListener('submit', e =>{
      e.preventDefault();
      const cnext = {
        createdAt : new Date().getTime(),
            content : e.target.elements.content.value,
        }
        c.push(cnext);
        localStorage.setItem('c', JSON.stringify(c));
        
        e.target.reset();
        displayTodos();
        location.reload();
    })
    displayTodos();
})

function displayTodos()
{
    const input = document.querySelector('#new-cpt-input');
    const list_el = document.querySelector('#cpts');
    c.forEach(cnext =>{
        const goal_el = document.createElement("div");
        goal_el.classList.add("cpt");

      const goal_content_el = document.createElement("div");
      goal_content_el.classList.add("content");
      goal_el.appendChild(goal_content_el);
      
      const goal_input_el = document.createElement("textarea");
      goal_input_el.id = "cpts-text";
      goal_input_el.classList.add("textarea");
      goal_input_el.type = "textarea"; 
      goal_input_el.value= cnext.content;
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
        console.log("being edited");
         if(goal_edit_el.innerText.toLowerCase()=="edit")
           { 
              goal_input_el.removeAttribute("readonly");
             goal_input_el.focus();
             goal_edit_el.innerText = "Save";
           }
           else{
             goal_input_el.focus();
             cnext.content =  goal_input_el.value,
             console.log(cnext.content);
            localStorage.setItem('c', JSON.stringify(c));
             goal_input_el.setAttribute("readonly","readonly");
             goal_edit_el.innerText ="Edit";
           }
           });


           goal_delete_el.addEventListener('click',()=>{
            var goals_dlt = localStorage.getItem('c');
            var index = c.indexOf(1);
            c.splice(index,1);
            localStorage.setItem('c', JSON.stringify(c));
            list_el.removeChild(goal_el);
          });
 
     
    })
   
}