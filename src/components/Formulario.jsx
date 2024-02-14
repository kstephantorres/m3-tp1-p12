import { Container, Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { Row, Col} from 'react-bootstrap'
import ListaNoticias from "./ListaNoticias.jsx";

const Formulario = () => {

    const [noticias, setNoticias] = useState([])
    const [pais,setPais] = useState('')
    const [tag, setTag] = useState('')
    const [mostrarSpinner, setMostrarSpinner] = useState(true)

    const mostrarComponente = mostrarSpinner ? 
                            (<div className="d-flex justify-content-center my-5">
                                <Spinner animation="border" variant="dark" className='my-4'/>
                            </div>) 
                            : (noticias.length === 0 ? 
                                <h3 className="text-center mb-5">No se encontro noticias</h3> :
                                <ListaNoticias noticias={noticias}></ListaNoticias> )
    
    const consultarApi = async(tag,pais)=>{
        try {
            setMostrarSpinner(true)
        let respuesta = '' 
        if (tag && pais){
           respuesta =  await fetch(`https://newsdata.io/api/1/news?apikey=pub_378948b71cfdc1810b0e7167844b4204fe314&category=${tag}&country=${pais}`)
        } else if (!tag && !pais){
            respuesta = await fetch(`https://newsdata.io/api/1/news?apikey=pub_378948b71cfdc1810b0e7167844b4204fe314&category=business&country=af`)
        } else if (tag && !pais){
            respuesta = await fetch(`https://newsdata.io/api/1/news?apikey=pub_378948b71cfdc1810b0e7167844b4204fe314&category=${tag}&country=af`)
        } else if (!tag && pais){
            respuesta = await fetch(`https://newsdata.io/api/1/news?apikey=pub_378948b71cfdc1810b0e7167844b4204fe314&category=business&country=${pais}`)
        }
          const datos = await respuesta.json()        
          setNoticias(datos.results)
          setMostrarSpinner(false)      
        } catch (error) {
          console.log(error)
          alert(error)
        }
    }

    useEffect(()=>{
        consultarApi(tag, pais)   
    },[tag,pais])

    const handleChange =(e)=>{
        const nuevoTag = e.target.value
        setTag(nuevoTag)
    }
    const handleChange2 =(e)=>{
        const nuevoPais = e.target.value
        setPais(nuevoPais)
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
                    <Col sm={2} md = {4} className="mt-3">
                        <Form.Label  htmlFor="genero" className="form-label">
                            Buscar por país:
                        </Form.Label>
                    </Col>
                    <Col sm={10} md={8} className="mt-3">
                    <Form.Select
                        className="form-select"
                        id="pais"
                        name="pais"
                        onChange={handleChange2}
                        required
                        >
                            <option value="af">Afghanistan</option>
                            <option value="al">Albania</option>
                            <option value="dz">Algeria</option>
                            <option value="ad">Andorra</option>
                            <option value="ao">Angola</option>
                            <option value="ar">Argentina</option>
                            <option value="am">Armenia</option>
                            <option value="au">Australia</option>
                            <option value="at">Austria</option>
                            <option value="az">Azerbaijan</option>
                            <option value="bs">Bahamas</option>
                            <option value="bh">Bahrain</option>
                            <option value="bd">Bangladesh</option>
                            <option value="bb">Barbados</option>
                            <option value="by">Belarus</option>
                            <option value="be">Belgium</option>
                            <option value="bz">Belize</option>
                            <option value="bj">Benin</option>
                            <option value="bm">Bermuda</option>
                            <option value="bt">Bhutan</option>
                            <option value="bo">Bolivia</option>
                            <option value="ba">Bosnia And Herzegovina</option>
                        </Form.Select>
                    </Col>

                </Row>
            </Form>
            {mostrarComponente}
        </Container>
    );
};

export default Formulario;