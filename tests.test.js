import 'jsdom-global/register'
import { TaskContainer } from './TaskContainer'

test("TaskContainer is not null", async ()=>{
    expect(TaskContainer).not.toBe(null)
})