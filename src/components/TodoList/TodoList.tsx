import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  query: string;
  filter: string;
  onListLoader: (l: boolean) => void;
  listLoader: boolean;
  selectedId: number | null;
  onSelectedId: (id: number) => void;
};

export const TodoList = ({
  todos,
  query,
  filter,
  onListLoader,
  listLoader,
  selectedId,
  onSelectedId,
}: Props) => {
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  const [currTodos, setTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    if (isFirstLoading) {
      setTimeout(() => {
        setIsFirstLoading(false);
        onListLoader(false);
      }, 300);
    }

    setTodos(
      todos.filter(todo => {
        if (todo.completed && filter === 'active') {
          return false;
        } else if (!todo.completed && filter === 'completed') {
          return false;
        }

        return todo.title.includes(query);
      }),
    );
  }, [todos, selectedId, query, filter, isFirstLoading, onListLoader]);

  return (
    <>
      {!listLoader && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>
              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {currTodos.map(todo => (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className={`far ${selectedId === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={() => {
                          onSelectedId(todo.id);
                        }}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
