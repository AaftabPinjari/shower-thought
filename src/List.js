import React from 'react'
import  Container  from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const List = ({items, removePost,editPost}) => {
  return (
  <Container className="mb-1" >
    {items.map((item)=>{
      const {id,title} = item;
      return <Card key={id} >
       <Card.Text>{title}</Card.Text>
       <Container className="btn-container" >
        <Button type="button" 
        variant="primary"
        className="edit-btn "
        onClick={()=> editPost(id)}>
          Edit
        </Button>
        <Button type="button" variant="outline-danger" className="delete-btn" 
        onClick={()=> removePost(id)}>
          Delete
        </Button>
       </Container>
      
      </Card>
    })}
  
  </Container>
  );
}

export default List
