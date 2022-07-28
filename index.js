
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

fs.readFileSync('./list/todo.json','utf-8',(err,data)=>{
    if (err){
        return response.status(500).send("Sorry, something went wrong.")

    }
    const todo=JSON.parse(data)
    return response.json({todo : todo})
})

})


app.listen(3000,() => {
    console.log("working on http://localhost:3000");
})