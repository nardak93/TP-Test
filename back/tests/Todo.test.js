const Todo = require('../src/models/Todo') 


describe('Todo Model Tests', () => {

  test('doit creer un todo avec tout les champs requis', () => {
    const todo = new Todo({
      text: 'Learn Jest',
      completed: false
    });
    expect(todo).toBeDefined();
    expect(todo.text).toBe('Learn Jest');
    expect(todo.completed).toBe(false);
  });

  test('doit retourner une erreur si le champs de  texte est vide', () => {
    const todo = new Todo({ completed: false });
    let error;
    try {
      todo.validateSync(); 
    } catch (e) {
      error = e;
    }
    expect(error.errors['text']).toBeDefined();
  });

  test('doit passer defaut le completed a false', () => {
    const todo = new Todo({
      text: 'Learn Jest'
    });
    expect(todo.completed).toBe(false);
  });
});
