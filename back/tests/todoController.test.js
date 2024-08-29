const todoController = require('../src/controllers/todoController');
const Todo = require('../src/models/Todo');

jest.mock('../src/models/Todo'); 

describe('Todo Controller Tests', () => {

  test('should get all todos sorted by date', async () => {
    const todos = [
      { text: 'First todo', completed: false, createdAt: new Date('2023-01-01') },
      { text: 'Second todo', completed: true, createdAt: new Date('2023-02-01') }
    ];
    
    Todo.find.mockResolvedValue(todos);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await todoController.getAllTodos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(todos));
  });

  test('should create a new todo and return status 201', async () => {
    const newTodo = { text: 'New todo', completed: false };
    
    Todo.create.mockResolvedValue(newTodo);

    const req = { body: newTodo };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await todoController.createTodo(req, res);

    expect(Todo.create).toHaveBeenCalledWith(newTodo);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newTodo);
  });

  test('should update the completed status of a todo', async () => {
    const todo = { text: 'Learn Jest', completed: false };
    
    Todo.findByIdAndUpdate.mockResolvedValue({ ...todo, completed: true });

    const req = { params: { id: '1' }, body: { completed: true } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await todoController.updateTodo(req, res);

    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith('1', { completed: true }, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ completed: true }));
  });

  test('should delete a todo and return confirmation message', async () => {
    Todo.findByIdAndDelete.mockResolvedValue(true);

    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await todoController.deleteTodo(req, res);

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todo deleted successfully' });
  });
});
