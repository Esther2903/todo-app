const {Router} = require("express")
const todoController = require("../controllers/todo-controller")

const router = Router()

router.get('/', todoController.getTodos)
router.post('/add', todoController.addTodo)
router.put('/update/:id', todoController.updateTodo)
router.delete('/delete/:id', todoController.deleteTodo)

module.exports = router;