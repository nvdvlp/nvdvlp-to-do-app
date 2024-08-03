import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


interface Task {
  name: string , 
  checked : boolean, 
  edit: boolean,
  editInput : string 
} 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do';
  arrayTasks:Task[] = [];
  dataTask : string = '';
  showTask: boolean = true;
  showinputEdit: boolean = false;
  editIndex: number | null = null;


  ngOnInit(): void{ 
  }

  addNewTask(){
    if(this.dataTask === ''){
      alert('write a specific task please')
    }else{
      const newTask: Task = {
        name: this.dataTask,
        checked: false,
        edit: false,
        editInput: '' 
      };
      console.log(this.arrayTasks)
      const infoTask = this.arrayTasks.push(newTask);
      console.log(newTask.name);
      this.dataTask = '';
    }
  }

  deleteTask(){
    this.arrayTasks.splice(-1);
  }

  deleteCheckedTasks(){
    this.arrayTasks = this.arrayTasks.filter(task => !task.checked);
  }

  editTask(index : number){
    this.arrayTasks[index].edit = true;
    this.arrayTasks[index].editInput = this.arrayTasks[index].name;
    console.log(this.arrayTasks[index].editInput = this.arrayTasks[index].name);
    
  }
  
  saveEditTask(index : number){
      this.arrayTasks[index].name = this.arrayTasks[index].editInput;
      this.arrayTasks[index].edit = false;
  }


}
