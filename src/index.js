import React from 'react';
import ReactDOM from 'react-dom';
import TodoListApp from './TodoListApp.jsx';

const todos = [
  { id: 1, text: 'Solomon Grundy' },
  { id: 2, text: 'Born on a Monday' },
  { id: 3, text: 'Christened on Tuesday' },
  { id: 4, text: 'Married on Wednesday' },
  { id: 5, text: 'Took ill on Thursday' },
  { id: 6, text: 'Grew worse on Friday' },
  { id: 7, text: 'Died on Saturday' },
  { id: 8, text: 'Buried on Sunday' },
  { id: 9, text: 'That was the end' },
  { id: 10, text: 'Of Solomon Grundy' }
];

class Hello extends React.Component {
  render() {
    return (
      <div className={"row"}>
        <TodoListApp message="Todo List App" todos={todos} />
      </div>
    );
  }
}

ReactDOM.render(<Hello />, document.getElementById("app"));