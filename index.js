
const express=require('express')
const fs =require ('fs')

const app =express()

app.get('/', (request,response) =>{
    return response.send("Hello world")
})

app.get('/todo',(request,response) => {
fs.readFile('./list/todo.json','utf-8',(err,data) =>{
    if (err){
        return response.status(500).send("Sorry, something went wrong.")
    }
        const todo =JSON.parse(data)
        return response.json({todo : todo})
})
})

app.put('/todo/:id/complete' ,(request,response) =>{

    const id =request.params.id

    const findTodoById=(todo,id)=>{
        for(let i=0; i<todo.length ; i++){
            if(todo[i].id===parseInt(id)){
                return i
            }
        }
        return -1 
    }


fs.readFile('./list/todo.json','utf-8',(err,data)=>{
    if (err){
        return response.status(500).send("Sorry, something went wrong.")

    }
    let todo=JSON.parse(data)
    const IndexId = findTodoById(todo,id)

    if ( IndexId === -1){
        return response.status(440).send("Sorry, not found.")
    } 
    todo[IndexId].complete = true

    fs.writeFile('./list/todo.json',JSON.stringify(todo) ,()=>{

        return response.send({'status':'ok'})
    }
    )
})

})


app.listen(3000,() => {
    console.log("working on http://localhost:3000");
})