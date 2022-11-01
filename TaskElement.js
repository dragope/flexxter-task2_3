export class TaskElement extends HTMLElement {
    constructor(task){
        super();
        this.attachShadow({ mode: 'open' })
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.checked = task.checked;
    }

    connectedCallback(){
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/TaskElement.css">
            <div class='task-container'>
                <p class='task-status' ${this.checked === false && `id="unchecked"`}>${this.checked === true ? "✓" : ""}<p>
                <div class='task'>
                    <p class='task-title'>${this.title}</p>
                    <p class='task-description'>${this.description}</p>
                </div>
                <p class='task-explore'>></p>
            </div>
        `
        this.taskContainer = this.shadowRoot.querySelector('.task-container');
        this.taskContainer.addEventListener('click', ()=> this.changeStatus());
    }

    updateTaskInServer(){
        fetch('https://flexxter.de/Tasks/Save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": this.id,
                "title": this.title,
                "description": this.description,
                "checked": this.checked
            })
        })
        .then(res => {
            if(res.status === "error"){
                throw new Error("The task has not been properly updated, please try again")
            }
        })
    }

    changeStatus(){
        this.taskStatus = this.shadowRoot.querySelector('.task-status')
        if(this.checked){
            this.checked = false
            this.taskStatus.innerHTML = ""
            this.taskStatus.setAttribute('id', 'unchecked')
            this.updateTaskInServer()
        } else {
            this.checked = true
            this.taskStatus.innerHTML = "✓"
            this.taskStatus.removeAttribute('id')
            this.updateTaskInServer()
        }
        
    }

}

window.customElements.define('task-element', TaskElement)