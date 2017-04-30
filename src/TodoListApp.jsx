import React from "react";

export default class TodoListApp extends React.Component {

  constructor(props) {
    super(props);

    // state of Component
    this.state = {
      text: 'I show time, when asked!',
      todos: this.props.todos ? this.props.todos : [],
    };

    // binding methods

    this.updateTime = this.updateTime.bind(this);

    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  /**
   * This will change value of `text` in state.
   */
  updateTime() {
    this.setState({
      text: 'Time is: ' + new Date().toLocaleTimeString(),
      edit: !this.state.edit
    });
  }


  addTodo(todo) {

    if (todo) {
      let vm = this.state;
      vm.todos.push({
        id: vm.todos.length + 1,
        text: todo
      });

      this.setState({
        todos: vm.todos
      });
    }

  }

  /**
   * @param {*} todo Todo item.
   */
  removeTodo(todo) {
    let vm = this.state;
    let removeIndex = vm.todos.indexOf(todo);
    vm.todos.splice(removeIndex, 1);
    this.setState({todos: vm.todos});
  }

  editTodo(todo) {
    // defined tod.o edit on state
    // this will start showing edit to-do component
    this.setState({
      todoToEdit: todo
    });
  }

  updateTodo(oldTodo, newTodo) {
    let vm = this.state;
    let index = vm.todos.indexOf(oldTodo);

    vm.todos[index] = newTodo;
    //now this will hide edit to-do component
    vm.todoToEdit = null;

    this.setState({
      todos: vm.todos
    });

  }

  render() {

    return (
      <div>
        <div className="well">
          <h2 class="text-center">{this.props.message}</h2>
          <h5>{this.state.text}</h5>
          <button className={"btn btn-default"} onClick={this.updateTime}>Current Time!</button>
        </div>
        <EditTodoComponent todo={this.state.todoToEdit} onSave={this.updateTodo}/>
        <AddTodoComponent onSave={this.addTodo}/>

        <ListTodoComponent todos={this.state.todos} onEdit={this.editTodo} onRemove={this.removeTodo}/>
      </div>
    );
  }
}

class AddTodoComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <div className={'well'}>
        <h4>Add new todo item!</h4>
        <input type="text"
               className="form-control"
               placeholder="Type new todo!"
               ref={node => {
                 this.todo = node
               }}/>
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            if (this.todo.value) {
              this.props.onSave(this.todo.value);
              this.todo.value = '';
            }
          }}>
          Add
        </button>
      </div>
    );
  }
}

class EditTodoComponent extends React.Component {

  update() {
    // send back old and new copy of to'do!
    this.props.onSave(this.props.todo, this.state.todo);
  }

  onEdit(text){
    this.setState({
      todo: {
        id: this.props.todo.id,
        text: text
      }
    });
  }

  render() {
    if (this.props.todo) {
      // if to-do prop is defined, then render the component (show)

      // if state is not already defined
      if (!this.state) {
        this.state = {
          todo: this.props.todo
        }
      }
      return (
        <div className={'well'}>
          <p>{this.state.todo.text}</p>
          <input type="text"
                 className={"form-control"}
                 value={this.state.todo.text}
                 ref={node => this.edit = node}
                 onChange={(e) => this.onEdit(this.edit.value)}/>
          <br/>
          <button
            className="btn btn-warning"
            onClick={this.update.bind(this)}>
            Save
          </button>
        </div>
      );
    }
    else {
      // Do not render!
      return null;
    }
  }

}

class ListTodoComponent extends React.Component {

  render() {
    return (
      <table className={'table table-bordered'}>
        <thead>
        <tr>
          <td>#</td>
          <td>Todo</td>
          <td>Actions</td>
        </tr>
        </thead>
        <tbody>
        {this.props.todos.map(todo =>
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>
              <button className={"btn btn-sm btn-danger"} onClick={() => this.props.onRemove(todo)}>
                Remove
              </button>
              <span> </span>
              <button className={"btn btn-sm btn-info"} onClick={() => this.props.onEdit(todo)}>Edit
              </button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
    );
  }
}