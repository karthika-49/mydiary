window.addEventListener('load',()=>{
    j = JSON.parse(localStorage.getItem('j'))||[];
    const newToDoForm = document.querySelector('#new-jrnl-form');
    
    newToDoForm.addEventListener('submit', e =>{
      e.preventDefault();
      const jnext = {
        createdAt : new Date().getTime(),
            content : e.target.elements.content.value,
        }
        j.push(jnext);
        localStorage.setItem('j', JSON.stringify(j));
        
        e.target.reset();
        displayTodos();
        location.reload();
    })
    displayTodos();
})

function displayTodos()
{
    const input = document.querySelector('#new-jrnl-input');
    const list_el = document.querySelector('#jrnls');
    j.forEach(jnext =>{
        const goal_el = document.createElement("div");
        goal_el.classList.add("jrnl");

      const goal_content_el = document.createElement("div");
      goal_content_el.classList.add("content");
      goal_el.appendChild(goal_content_el);
      
      const goal_input_el = document.createElement("textarea");
      goal_input_el.id = "jrnls-text";
      goal_input_el.classList.add("textarea");
      goal_input_el.type = "textarea"; 
      goal_input_el.value= jnext.content;
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
             jnext.content =  goal_input_el.value,
             console.log(jnext.content);
            localStorage.setItem('j', JSON.stringify(j));
             goal_input_el.setAttribute("readonly","readonly");
             goal_edit_el.innerText ="Edit";
           }
           });


           goal_delete_el.addEventListener('click',()=>{
            var goals_dlt = localStorage.getItem('j');
            var index = j.indexOf(1);
            j.splice(index,1);
            localStorage.setItem('j', JSON.stringify(j));
            list_el.removeChild(goal_el);
          });
 
     
    })
   
}