import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebaseConfig";
import { collection, deleteDoc, onSnapshot, query, doc } from "firebase/firestore";
import { useState, useEffect } from "react";



export default function TodoComponent() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "Todos"))
        const unSubscribed = onSnapshot(q, (querySnapshot)=>{
            let todosArr = [];
            querySnapshot.forEach((doc)=>{
                todosArr.push({...doc.data(), id: doc.id})
            })
            setTodos(todosArr)
        })
        return unSubscribed
    }
    , [])

    const deleteTodo = async(id) => {
        await deleteDoc(doc(db, "Todos", id))
    }

    const sahil = todos.map((todo) => {
        return (
            <div className="todo-component">
                <h1>{todo.todo}</h1>
                <FontAwesomeIcon onClick={()=>deleteTodo(todo.id)} icon={faXmark} id="icon" />
            </div>
        )
    })

    return (
        <>
            {sahil}
        </>
            
    )
}