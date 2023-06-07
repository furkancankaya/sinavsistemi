import React, { Component } from 'react'
import { Form ,Label,FormGroup,Col,Input,Button } from 'reactstrap';

export default class Quiz extends Component {
    render() {
        const { secilenSorular } = this.props;
      
        return (
          <div>
            <h2>Quiz</h2>
            <Form onSubmit={this.props.handleSubmit}>
                <FormGroup row>
                    <Label for="isim" sm={2}>İsim
                    </Label>
                    <Col sm={10}>
                    <Input
                        id="isim"
                        name="isim"
                        placeholder="Adınızı ve Soyadınızı Girinizr"
                        type="text"
                    />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="zaman" sm={2}>Tarih
                    </Label>
                    <Col sm={10}>
                    <Input
                        id="zaman"
                        name="zaman"
                        placeholder="Adınızı ve Soyadınızı Girinizr"
                        type="date"
                        
                    />
                    </Col>
                </FormGroup>
                
                {secilenSorular.map((soru, index) => (
                    
                    <FormGroup row tag="fieldset" key={index}>             
                    <legend className="col-form-label col-sm-2">
                    {soru.soru}
                    </legend>
                    <Col sm={10}>
                    {soru.secenekler.map((secenek, secenekIndex) => (
                        <FormGroup check key={secenekIndex}>
                        <Input
                        name={`${soru.id}`}
                        type="radio"
                        value={secenek}
                        onChange={this.props.handleCevapChange}
                        />
                        {' '}
                        <Label check>
                        {secenek}
                        </Label>
                    </FormGroup>
                    ))}
                    </Col>
                    </FormGroup>
                ))}
                
                
                <FormGroup
                    check
                    row
                >
                    <Col
                    sm={{
                        offset: 2,
                        size: 10
                    }}
                    >
                    <Button>
                        Submit
                    </Button>
                    </Col>
                </FormGroup>
                </Form>
            
           
          </div>
        );
      }
    }
