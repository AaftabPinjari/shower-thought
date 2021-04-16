import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import Button from 'react-bootstrap/Button'

import Card from 'react-bootstrap/Card'
import { Container } from 'react-bootstrap'

const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}


function App() {
  const [name,setName]=useState('');
  const [list,setList]=useState(getLocalStorage())
  const [isEditing,setIsEditing]=useState(false);
  const [editId,setEditId]=useState(null);
  const [alert,setAlert]=useState(
      {show:false , msg:'' ,type:''}
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      //alert
      showAlert(true,'danger','Think of Something')
    }
    else if(name && isEditing){
      //edit
      setList(list.map((item)=>{
        if(item.id === editId){
          return {...item,title: name}
        }
        return item
      }))
    
    setName('');
    setEditId(null);
    setIsEditing(false);
    showAlert(true,'success','Editted')
    }
    else {
      showAlert(true,'success','Brilliant Words')
      const newItem = {id: new Date().getTime().toString(),title: name};
      setList([newItem,...list])
      setName("");
    }
  }

  const showAlert = (show= false ,type="",msg="") => {
    setAlert({show,type,msg})
  }

  const clearAllItems = () => {
    showAlert(true,'danger','All Clear')
    setList([])
  }

  const clearPost = (id) => {
    showAlert(true,'danger','Unspoken')
    setList(list.filter((item)=> item.id !== id))
  }

  const editPost = (id) => {
    const specificPost = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id)
    setName(specificPost.title)
  }

   useEffect(()=>{
     localStorage.setItem('list',JSON.stringify(list))
   },[list])

  return (
    <Container >
    <Card>
      <form className="input-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} 
        removeAlert={showAlert}
        list={list}
         />}
        
        
        <h3>Your Thoughts</h3>
        <div className="form-control">
          <input type="text" 
          className=" input-thought" 
          placeholder="Speak your mind!"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
          {isEditing ? 'edit' : 'Post'}
          </button>
        </div>
      </form>
    </Card>
    <Container>
      {list.length > 0 && (
      <Container >
       <Container className="thought-card">
        <List items={list} 
        removePost={clearPost}
        editPost={editPost}
        />
        
      </Container>
        {list.length > 1 && 
          <Button variant="danger"
        className="clear-btn" 
        onClick={clearAllItems} >Delete All
          </Button>}
        
        
        </Container>
      )}
      
    </Container>
  </Container>
    );
}

export default App
