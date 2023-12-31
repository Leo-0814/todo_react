import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/todos';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'Context/authContext';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const { isAuthenticated, currentMember } = useAuth();

  function handleChange(value) {
    setInputValue(value);
  }

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });

      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };
  // async function handleKeyDown() {
  //   if (inputValue.length === 0) {
  //     return;
  //   }

  //   try {
  //     const data = await createTodo({
  //       title: inputValue,
  //       idDone: false,
  //     });

  //     setTodos((prevTodos) => {
  //       return [
  //         ...prevTodos,
  //         {
  //           id: data.id,
  //           title: data.title,
  //           isDone: data.isDone,
  //           isEdit: false,
  //         },
  //       ];
  //     });
  //     setInputValue('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function handleToggleDone(id) {
    const currentTodo = todos.find((todo) => todo.id === id);

    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });
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
    } catch (error) {
      console.error(error);
    }
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

  async function handleSave({ id, title }) {
    try {
      await patchTodo({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, title, isEdit: false };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
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
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
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
