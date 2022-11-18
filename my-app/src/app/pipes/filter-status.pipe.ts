import { Pipe } from "@angular/core";
import { Task } from "../models/project"

@Pipe({
    name: 'filterStatusPipe',
})
export class FilterStatusPipe {

    transform(tasks: Task[] | undefined, status: "to-do" | "in-prog" | "needs-approved" | "completed"): Task[] | undefined {
        if(tasks) {
            return tasks.filter(task =>
                task.status === status
            );
        }
        //console.log("pipe filter issue.")
        return tasks;
    }
}
