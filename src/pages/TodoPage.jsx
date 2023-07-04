import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';
import { getTodos, createTodo } from '../api/todos';
import axios from 'axios';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  function handleChange(value) {
    setInputValue(value);
  }

  async function handleAddTodo() {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        idDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            title: data.title,
            isDone: data.isDone,
            id: data.id,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleKeyDown() {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        idDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            title: data.title,
            isDone: data.isDone,
            id: data.id,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleDone(id) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      });
    });
  }

  function handleChangeMode({ id, isEdit }) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEdit: isEdit };
        }

        return { ...todo, isEdit: false };
      });
    });
  }

  function handleSave({ id, title }) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: title, isEdit: false };
        }
        return { ...todo };
      });
    });
  }

  function handleDelete(id) {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  }

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();

        setTodos(
          todos.map((todo) => {
            return { ...todo, idEdit: false };
          }),
        );
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  });
  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
