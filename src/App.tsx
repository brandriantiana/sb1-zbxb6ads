import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date()
      },
      ...todos
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mes tâches</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CheckCircle size={20} className="text-green-500" />
              <span>{completedCount}/{todos.length} terminées</span>
            </div>
          </div>
          
          <TodoInput onAdd={addTodo} />
          
          <div className="mt-8 space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucune tâche pour le moment. Ajoutez-en une !
              </p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;