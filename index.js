
const { json, response } = require('express')
const express=require('express')
const fs =require ('fs')
const { request } = require('http')

const app =express()

app.use(express.json())
//built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended : true}))

app.get('/', (request,response) =>{
    return response.send("Hello world")
})

app.get('/todo',(request,response) => {

const showpending =request.query.showpending

fs.readFile('./list/todo.json','utf-8',(err,data) =>{
    if (err){
        return response.status(500).send("Sorry, something went wrong.")
    }
        const todo =JSON.parse(data)
        if (showpending !== "1"){
            return response.json({todo : todo})

        }else {
            return response.json({todo : todo.filter(a =>{return a.complete ===false})
                
                 })
        }
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

app.post('/todo',(request,response)=>{
    if (!request.body.name){
        return response.status(400).send('Missing name')
    }
    fs.readFile('./list/todo.json','utf-8',(err,data)=>{
        if (err){
            return response.status(500).send("Sorry, something went wrong.")
    
        }
        const todo=JSON.parse(data)
        const MaxId=Math.max.apply(Math,todo.map(a =>{ return a.id}))
        todo.push({
            id : MaxId+1,
            name :request.body.name,
            complete: false

        })
        fs.writeFile('./list/todo.json',JSON.stringify(todo) ,()=>{

            return response.send({'status':'ok'})
        }
        )

    })
 
})

app.listen(3000,() => {
    console.log("working on http://localhost:3000");
})