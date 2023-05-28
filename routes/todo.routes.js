const express = require('express')
const router = express.Router()
router.post("/", async (req, res) => {
    const todo = {
        title: req.body.title
    }
    const conn = req.conn
    const todoRepo = conn.getRepository("todo_orm");
    const savedTodo = await todoRepo.save(todo)
    res.json({
        message: "todo saved",
        todo: savedTodo
    })
})

router.get("/", async (req, res) => {
    const conn = req.conn
    const todoRepo = conn.getRepository("todo_orm");
    const todos = await todoRepo.find();
    res.json({
        message: "All todos",
        todos: todos
    })
})

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const todoRepo = req.conn.getRepository("todo_orm")
    const todo = await todoRepo.findOneBy({ id: id })
    if (todo) {
        res.json({ todo: todo })
    } else {
        res.json({ message: "no todo with id " + id })
    }
})

router.patch("/:id",async (req,res)=>{
    const id = parseInt(req.params.id)
    const todoRepo = req.conn.getRepository("todo_orm")
    const todo = await todoRepo.findOneBy({id:id})
    if(todo){
        todo.title = req.body.title
        const updatedTodo = await todoRepo.save(todo)
        res.json({message: "todo updated",todo: todo })
    }else{
        res.json({ message: "no todo with id " + id })
    }
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const todoRepo = req.conn.getRepository("todo_orm")
    const todo = await todoRepo.findOneBy({ id: id })
    if (todo) {
        await todoRepo.remove(todo)
        res.json({ message: "todo deleted", todo: todo })
    }else{
        res.json({ message: "no todo with id " + id })
    }
})

module.exports = router