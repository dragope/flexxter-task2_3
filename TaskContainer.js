import { TaskElement } from './TaskElement.js'

export class TaskContainer extends HTMLElement{
    constructor(){
        super()
    };

    loadTasks(tasks){
        for(let i = 0; i <= tasks.length; i++){
            let newTask = tasks[i]
            let taskToAdd = new TaskElement(newTask)
            this.appendChild(taskToAdd)
        }
    }

    fetchTasks(){
        fetch('https://flexxter.de/Tasks/Get')
            .then(res => {
                if(!res.ok){
                    throw new Error("HTTP Error " + res.status)
                }
                return res.json()
            })
            .then(data => this.loadTasks(data))
            .catch(err => console.log(err))
    }

    connectedCallback(){
        this.fetchTasks()
    }
}

window.customElements.define('task-container', TaskContainer)