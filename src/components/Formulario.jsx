import { Container, Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { Row, Col} from 'react-bootstrap'
import ListaNoticias from "./ListaNoticias.jsx";

const Formulario = () => {

    const [noticias, setNoticias] = useState([])
    const [tag, setTag] = useState('')
    const [mostrarSpinner, setMostrarSpinner] = useState(true)

    const mostrarComponente = mostrarSpinner ? 
                            (<div className="d-flex justify-content-center my-5">
                                <Spinner animation="border" variant="dark" className='my-4'/>
                            </div>) 
                            : (<ListaNoticias noticias={noticias}></ListaNoticias> )
    
    const consultarApi = async(tag)=>{
        try {
          const respuesta = tag ? 
            await fetch(`https://newsdata.io/api/1/news?apikey=pub_378948b71cfdc1810b0e7167844b4204fe314&language=es&category=${tag}`)
            :  await fetch(`https://newsdata.io/api/1/news?apikey=pub_378948b71cfdc1810b0e7167844b4204fe314&language=es&category=business`)
          const datos = await respuesta.json()        
          console.log("🚀 ~ consultarApi ~ datos:", datos)
          setNoticias(datos.results)
          setMostrarSpinner(false)      
        } catch (error) {
          console.log(error)
          alert(error)
        }
    }

    useEffect(()=>{
        consultarApi(tag)   
    },[tag])

    const handleChange =(e)=>{
        const nuevoTag = e.target.value
        console.log(e.target.value)
        setTag(nuevoTag)
        // consultarApi(tag)
    }
   
    console.log(tag)
    return (
        <Container className="my-5 border border-dark">
            <Form className="my-5">
                <Row>
                    <Col sm={2} md = {4}>
                        <Form.Label  htmlFor="genero" className="form-label">
                            Buscar por categoria:
                        </Form.Label>
                    </Col>
                    <Col sm={10} md={8}>
                        <Form.Select
                        className="form-select"
                        id="genero"
                        name="genero"
                        onChange={handleChange}
                        required
                        >
                            <option value="business">Negocios</option>
                            <option value="crime">Delitos</option>
                            <option value="domestic">Domestico</option>
                            <option value="education">Educación</option>
                            <option value="entertainment">Entretenimiento</option>
                            <option value="environment">Medioambiente</option>
                            <option value="food">Gastronomia</option>
                            <option value="health">Salud</option>
                            <option value="lifestyle">Estilo de vida</option>
                            <option value="politics">Politica</option>
                            <option value="science">Ciencia</option>
                            <option value="sports">Deporte</option>
                            <option value="technology">Tecnología</option>
                            <option value="top">Top</option>
                            <option value="tourism">Turismo</option>
                            <option value="world">Internacional</option>
                            <option value="other">Otros</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form>
            {mostrarComponente}
        </Container>
    );
};

export default Formulario;