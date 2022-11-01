import {TaskContainer} from './TaskContainer.js'

const taskListContainer = document.querySelector('.task-list-container')

const taskContainer = new TaskContainer()

taskListContainer.appendChild(taskContainer)