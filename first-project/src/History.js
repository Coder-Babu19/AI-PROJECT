import quran from './components/images/Quran.jpg'
import qabah from './components/images/Qabah.jpg' 
import lantern from "./components/images/Lantern.jpg"
import tasbih from "./components/images/Tasbih.jpg"
import namaz from "./components/images/Namaz.jpg"
import masjid from "./components/images/Masjid2.jpg"
import "./History.css"
import {Col ,Container , Row , Card } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';

const History = () => {
  const nav = useNavigate();
  return(
    <Container fluid>
    <Row style={{color: 'green' , textAlign: 'center', padding:25}}>
    <h1 className='home_heading'> <span> HISTORY </span> </h1>
    </Row>
  <Row style={{padding:10 ,  textAlign: 'center'}}>
    <Col>
  <Card style={{height:600}}>
          <Card.Img variant="top" src= {quran} style={{height:350}} />
          <Card.Body>
            <Card.Title>What are Hadith?</Card.Title>
            <Card.Text>
            Hadith have been called "the backbone" of Islamic civilization,
            and within Islam the authority of hadith as a source for religious law and 
            moral guidance ranks second only to that of the Quran (which Muslims hold to
            be the word of God revealed to Muhammad). Most Muslims believe that scriptural 
            authority for hadith comes from the Quran, which enjoins Muslims to emulate Muhammad 
            and obey his judgements.
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{height:600}}>
          <Card.Img variant="top" src= {qabah} style={{height:350}}  />
          <Card.Body>
            <Card.Title> Hadith and Prophet (S.A.W)</Card.Title>
            <Card.Text>
            Traditions of the life of Muhammad and the early history of Islam were passed down 
             orally for more than a hundred years after Muhammad's death in AD 632. Muslim historians
              say that Caliph Uthman ibn Affan (the third khalifa (caliph) of the Rashidun Caliphate, 
              or third successor of Muhammad, who had formerly been Muhammad's secretary)
              {/* , is generally
              believed to urge Muslims to record the hadith just as Muhammad suggested to some of his
              followers to write down his words and actions. */}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style = {{height:600}}>
          <Card.Img variant="top" src={namaz} style={{height:350}} />
          <Card.Body>
            <Card.Title> Impact of Hadith</Card.Title>
            <Card.Text>
            The hadith had a profound and controversial influence on tafsir (commentaries of the 
            Quran). The earliest commentary of the Quran known as Tafsir Ibn Abbas is sometimes 
            attributed to the companion Ibn Abbas. The hadith were used in forming the basis of 
            Sharia (the religious law system forming part of the Islamic tradition), and fiqh 
            (Islamic jurisprudence). 
            {/* The hadith are at the root of why there is no single fiqh 
            system, but rather a collection of parallel systems within Islam.
            Much of early Islamic history available today is also based on the hadith */}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
  </Row>
  <Row style={{padding:10 ,textAlign: 'center'}}>
    <Col>
  <Card style = {{height:730}}>
          <Card.Img variant="top" src= {tasbih}  style={{height:350}}/>
          <Card.Body>
            <Card.Title>Classification of Hadith</Card.Title>
            <Card.Text>
            Having been evaluated, hadith may be categorized. Two categories are:
           <ul>
           <li> ṣaḥīḥ (sound, authentic) </li>
           <li> ḍaʿīf (weak) </li>
           <li> ḥasan (good), which refers to an otherwise ṣaḥīḥ report suffering from minor 
                deficiency, or a weak report strengthened due to numerous other corroborating 
                reports </li>
           <li> mawḍūʿ (fabricated) </li>
           <li> munkar (denounced) which is a report that is rejected due to the presence of an 
                unreliable transmitter contradicting another more reliable narrator. </li>
  </ul>
  
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style = {{height:730}}>
          <Card.Img variant="top" src= {lantern} style={{height:350}} />
          <Card.Body>
            <Card.Title>Authenticity of Hadith</Card.Title>
            <Card.Text>
            Authenticity of a hadith is primarily verified by its chain of transmission (isnad).
            Hadith studies use a number of methods of evaluation developed by early Muslim scholars in determining the veracity of reports attributed to Muhammad. This is achieved by:
            <ul>
            <li>the individual narrators involved in its transmission, </li>
            <li>the scale of the report's transmission </li>
            <li>analyzing the text of the report, and </li>
            <li>the routes through which the report was transmitted. </li>
            </ul>
            On the basis of these criteria, various classifications were devised for hadith
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style = {{height:730}}>
          <Card.Img variant="top" src= {masjid} style={{height:350}} />
          <Card.Body>
            <Card.Title> Modern Usage </Card.Title>
            <Card.Text>
            The mainstream sects consider hadith to be essential supplements to, and clarifications of,
            the Quran, Islam's holy book, as well as for clarifying issues pertaining to Islamic 
            jurisprudence. Ibn al-Salah, a hadith specialist, described the relationship between
            hadith and other aspect of the religion by saying: "It is the science most pervasive in
            respect to the other sciences in their various branches, in particular to jurisprudence 
            being the most important of them
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
  </Row>
  </Container>);
}

export default History;