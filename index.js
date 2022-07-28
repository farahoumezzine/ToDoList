
const express=require("express")
const fs =require ("fs")

const app =express()

app.get('/', (request,response) =>{
    return response.send("hello world")
})
app.get('/todo.json',(request,response) => {
fs.readFile('./list/todo.json','utf-8',(err,data) =>{
    if (err){
        return response.status(500).send("Sorry, something went wrong.")
    }
        const todo =JSON.parse(data)
        return response.json({todo : todo})
})
})

app.put('/todo.json/:id/complete' , (request,response) =>{

    const id =request.params.id

    const findTodoById=(todo,id)=>{
        for(let i=0; i<todo.length; i++){
            if(todo[i].id===id){
                return i
            }
        }
        return -1 
    }

fs.readFileSync('./list/todo.json','utf-8',(err,data)=>{
    if (err){
        return response.status(500).send("Sorry, something went wrong.")

    }
    const todo=JSON.parse(data)
    const IndexId = findTodoById(todo,id)

    return response.json(todo[IndexId])
})

})


app.listen(3000,() => {
    console.log("working on http://localhost:3000");
})