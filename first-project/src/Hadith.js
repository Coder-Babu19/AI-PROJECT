import { Component } from "react"
import {ListGroup ,Container , Row , Card , InputGroup , Button , FormControl, ListGroupItem } from 'react-bootstrap';
class Hadith extends Component {
    state = {data : ["Hadith1","Hadith2","Hadith3","Hadith4"], usrInput : '',loading: false};

  render() {
    const {data,usrInput} = this.state;
    const { loading } = this.state;

    this.onInputchange = async (event)=>{
      await this.setState({usrInput : event.target.value});
      console.log(this.state.usrInput);
  };


      const addHadiths = (data) => {
      this.setState({data : data["Hadiths"]});
      Object.entries(this.state.data).map(item => {
        console.log(item[1])
      })
    };


   const handleClick = () => {
    this.setState({ loading: true });
    fetch('/api/post',{
      method: 'POST',
      body: JSON.stringify({
        message: this.state.usrInput
      })
      , headers: { 'Content-Type': 'application/json' }
    }).then(responce => responce.json())
    .then(message => console.log(message))

    fetch('/api/get').then(responce =>{
      if(responce.ok){
        return responce.json()
      }
    }).then(data => {addHadiths(data)})
    
    setTimeout(() => {
      this.setState({ loading: false });
    }, 20000);

   
  }

   return (
    <Container fluid>
    <Row style={{color: 'green' , textAlign: 'center', padding:25}}>
    <h1 className='home_heading'> <span> Hadith </span> </h1>
    </Row>
  <Row style={{padding:0 ,  textAlign: 'center',margin:5}}>
  <InputGroup className="mb-3 input" style={{width:1420}} >
    <FormControl 
      placeholder="Enter hadith"
      aria-label="Enter hadith"
      aria-describedby="basic-addon2"
      value={this.state.usrInput}
      onChange={this.onInputchange}
    />

    <Button className="button" onClick={handleClick} disabled={loading}>
    {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Loading</span>}
          {!loading && <span>Search</span>}
    </Button>
  
  </InputGroup>
  </Row>
  <Row style={{padding:15 , margin:3}}>
  <Card >
  <ListGroup variant="flush">
     {data.map((d)=> {
        return <ListGroup.Item> {d}</ListGroup.Item>
     })}
  </ListGroup>
</Card>
  </Row>
  </Container>
   );
  }
}

export default Hadith;