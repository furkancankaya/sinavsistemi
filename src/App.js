import { Col, Container, Row } from "reactstrap";
import Navbarr from "./Navbarr";
import React from "react";
import Quiz from "./Quiz";
import Results from "./Results";
import { Route, Routes } from "react-router-dom";


export default class App extends React.Component{

  state = {
    sorular: [],
    secilenSorular: [],
    kisi: {ad: "",
            tarih:"",
            cevaplar:[],
            dogruSayisi: 0 },
    kisiler:[]
   
  };

  componentDidMount() {
    fetch("http://localhost:3000/sorular")
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch:" + data)
        this.setState({ sorular: data}, 
        
        () => {this.selectRandomQuestions();});
           
      })
  
  }



  selectRandomQuestions = () => {
    const  sorular  = this.state.sorular;
    console.log("SOrular: "+ sorular +"  typee  "+ typeof(sorular))
    const secilenSorular = [];
  
    while (secilenSorular.length < 5) {
      const randomIndex = Math.floor(Math.random() * sorular.length);
      const randomSoru = sorular[randomIndex];
  
      if (!secilenSorular.includes(randomSoru)) {
        secilenSorular.push(randomSoru);
      }
    }
  
    this.setState({ secilenSorular });
  };

  

  

handleSubmit = (event) => {
  event.preventDefault();
  const evnt =event.target.elements
  const { secilenSorular } = this.state;
  const cevaplar = this.state.kisi.cevaplar
 
  let dogruSayisi = 0;
  const ad = evnt.isim.value
  const zaman = evnt.zaman.value
  console.log("isim: " + ad)
  secilenSorular.forEach((soru) => {
    
          cevaplar.forEach((cevap)=>{

            console.log("soru.id :"+ soru.id+
          "cevap.soruName :"+ cevap.soruName+
          "soru.dogruCevap :"+ soru.dogruCevap+
          "cevap.value :"+ cevap.value)

              if (Number(soru.id)===Number(cevap.soruName) && soru.dogruCevap === cevap.value) {
                console.log("if içi")
                dogruSayisi++;
              }
          })
    
  });
  console.log("dogrusayısı"+dogruSayisi)
  this.setState({ kisi: {name:ad,
                        tarih: zaman,
                        dogruSayisi: dogruSayisi} });

  const kisiler = this.state.kisiler
  kisiler.push(this.state.kisi)
  this.setState({kisiler});
};




handleCevapChange = (event) => {
  const value = event.target.value;
  const soruName = event.target.name;
  this.controlCevaplar(value,soruName)
}

controlCevaplar(value,soruName){


  const  cevaplar  = this.state.kisi.cevaplar

  const ayniCevap= cevaplar.find( x => x.soruName===soruName)
  console.log(ayniCevap)
  if (ayniCevap===undefined)
  {
    console.log("farklı")
    cevaplar.push({soruName:soruName,value: value})
    this.setState({ kisi: { cevaplar} });
  }
  else{
    console.log("aynı")
    const ayniCevapIndex= cevaplar.findIndex( x => x.soruName===soruName)
    cevaplar.splice(ayniCevapIndex, 1); 
    cevaplar.push({soruName:soruName,value: value})
  }
  
 }



  render(){
    
    return(
      <div >
      <Container>
        <Navbarr />
          <Row>
            <Col xs="12">
              <Routes>
                <Route path='/' element={<Quiz 
                                            secilenSorular={this.state.secilenSorular}
                                            handleSubmit={this.handleSubmit}
                                            handleCevapChange={this.handleCevapChange}
                                            />} />
                <Route path='/results' element={<Results 
                                                kisiler={this.state.kisiler}/>} />                            
              </Routes>

              
            </Col>
          </Row>
      </Container>
    </div>
    )
  }
}


