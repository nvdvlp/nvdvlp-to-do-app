import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Task {
  name: string , 
  checked : boolean, 
  edit: boolean,
  editInput : string,
  date: Date
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
  //data arrays with Task
  arrayTasks:Task[] = [];
  fiteredTask: Task[] = [];

  dataTask : string = '';
  searchValue: string = '';
  showTask: boolean = true;
  showinputEdit: boolean = false;
  editIndex: number | null = null;
  setOrder:number = 3;
  itemsRequired: boolean = true;
  
  errorMessage:string = '';
  showError:boolean = false;

  ngOnInit(): void{ 
    this.fiteredTask = this.arrayTasks; 
  }

  orderPriority(order: 'asc' | 'desc'){
    this.fiteredTask.sort((a, b) => {
      if(order === 'asc'){
        return a.date.getTime() - b.date.getTime()
      }else{
        return b.date.getTime() - a.date.getTime()
      }
    })
  }


  addNewTask(){
    if(this.dataTask === ''){
      this.errorMessage = 'write a specific task please *';
      this.showError = true;
    }else{
      const newTask: Task = {
        name: this.dataTask,
        checked: false,
        edit: false,
        editInput: '',
        date: new Date()
      };
      this.itemsRequired = false;
      this.showError = false;
      this.arrayTasks.push(newTask);
      this.dataTask = '';
      this.fiteredTask = [...this.arrayTasks];
      console.log(newTask.date);
      console.log(newTask.name);
      console.log(this.arrayTasks);
      
    }
  }

  deleteTask(index : number){
    this.arrayTasks.splice(index, 1);
    this.fiteredTask = this.arrayTasks; 
  }

  deleteCheckedTasks(){
    this.fiteredTask = this.arrayTasks.filter(task => !task.checked);
    
  }

  editTask(index : number){
    this.arrayTasks[index].edit = true;
    this.arrayTasks[index].editInput = this.arrayTasks[index].name;
    // console.log(this.arrayTasks[index].editInput = this.arrayTasks[index].name);
  }
  
  saveEditTask(index : number){
      this.arrayTasks[index].name = this.arrayTasks[index].editInput;
      this.arrayTasks[index].edit = false;
  }

  search(){
  if(this.searchValue === ''){
    this.fiteredTask = this.arrayTasks;
  }else{
    this.fiteredTask = this.arrayTasks.filter(task =>
      task.name.toLowerCase().includes(this.searchValue.toLowerCase()))
  }
  }

  emptySearch(){
    if(this.searchValue == '' ){
      this.fiteredTask = this.arrayTasks;
    }
  }


}
