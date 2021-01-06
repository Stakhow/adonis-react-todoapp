/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('api/v1/test', () => 'helllo from adonis!!');
Route.get('api/v1/test1', () => 'from test1');

Route.group(() => {
  Route.post('register', 'UserController.userStore').validator('UserValidator');
  Route.post('login', 'UserController.loginStore').validator('UserValidator');
})
  .prefix('api/v1')
  .middleware('guest');

Route.group(() => {
  Route.get('getUser', 'UserController.getUser');
  Route.get('users/:id', 'UserController.show');
  Route.post('logout', 'UserController.logoutStore');
})
  .prefix('api/v1')
  .middleware(['auth:jwt']);

Route.post('refreshToken', 'UserController.refreshToken');

Route.group(() => {
  Route.get('/', 'TodoController.index');
  Route.get('todos', 'TodoController.index');
  Route.post('todos', 'TodoController.create').validator('TodoValidator');
  Route.put('todos/:id', 'TodoController.update').validator('TodoValidator');
  Route.delete('todos/:id', 'TodoController.delete');
})
  .prefix('api/v1')
  .middleware(['auth:jwt']);
