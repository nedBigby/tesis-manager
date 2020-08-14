import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import useForm from '../useForm/useForm'

// id_tg, cedula_p, tema_propuesta, organizacion, criterio1, criterio2, criterio3, criterio4, criterio5, criterio6, decision_revisor, observaciones, fec_revision, margenes, 
//encuadernado, precision, claridad, brevedad, id_problema, objetivos, importancia, limitaciones, seleccion, uso, precisionp, cumplimientoobj, aplicacion, alcance, profundidad, 
//validez, recomendaciones, bibliografia, tiempo, contenido, demostracion, calidad, desenvolvimiento, respuestas, calidad2, desenvolvimiento2, respuestas2, pjurado, jurado, tutor,
//toral1300, total120, total2300, total220, mencionh, justificacionh, mencionp, justificacionp 


//Dios mio que horrible es esta tabla
const AnexoExperimentalForm = () => {
    const [jurado, setjurado] = useState([{}])
    //const [instituciones, setInstituciones] = useState([{}])
    const [toggle, setToggle] = useState(false)
    const proxy = 'jurado'
    const { handleChange, handleSubmit, values } = useForm({
        id_tg: '',
        cedula_p: '',
        tema_propuesta: '',
        organizacion: '',
        criterio1: '',
        criterio2: '',
        criterio3: '',
        criterio4: '',
        criterio5: '',
        criterio6: '',
        decision_revisor: '',
        observaciones: '',
        fec_revision: '',
        margenes: '',
        encuadernado: '',
        precision: '',
        claridad: '',
        brevedad: '',
        id_problema: '',
        objetivos: '',
        importancia: '',
        limitaciones: '',
        seleccion: '',
        uso: '',
        precisionp: '',
        cumplimientoobj: '',
        aplicacion: '',
        alcance: '',
        profundidad: '',
        validez: '',
        recomendaciones: '',
        bibliografia: '',
        tiempo: '',
        contenido: '',
        demostracion: '',
        calidad: '',
        respuestas: '',
        calidad2: '',
        desenvolvimiento2: '',
        respuestas2: '',
        pjurado: '',
        jurado: '',
        tutor: '',
        toral1300: '',
        total120: '',
        total2300: '',
        total220: '',
        mencionh: '',
        justificacionh: '',
        mencionp: '',
        justificacionp: '',
    }, proxy)

    const toggleSelect = ({ target }) => setToggle(target.value == "F" ? true : false)

    const fetchjurado = () => {
        fetch('http://localhost:3000/profesores')
            .then(res => res.json())
            .then(result => setjurado(result))
            .catch(err => console.log(err.message))
    }

    // const fetchInstituciones = () => {
    //     fetch('http://localhost:3000/instituciones')
    //         .then(res => res.json())
    //         .then(result => setInstituciones(result))
    //         .catch(err => console.log(err.message))
    // }

    useEffect(() => {
        fetchjurado()
        //fetchInstituciones()
    }, [])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormControl className="form-profesor">
                    <div className="form-profesor-1">
                        <TextField
                            className="text-field"
                            size="small"
                            label="Cedula"
                            name="cedula_p"
                            variant="outlined"
                            value={values.cedula_p}
                            onChange={handleChange} />
                        <TextField
                            className="text-field"
                            size="small"
                            label="Nombre"
                            name="nombre_p"
                            variant="outlined"
                            value={values.nombre_p}
                            onChange={handleChange} />
                        <TextField
                            className="text-field"
                            size="small"
                            label="Direccion"
                            name="direccion_p"
                            variant="outlined"
                            value={values.direccion_p}
                            onChange={handleChange} />
                    </div>
                    <TextField
                        className="text-field"
                        size="small"
                        label="Correo"
                        name="correo_p"
                        variant="outlined"
                        value={values.correo_p}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        label="Telefono"
                        name="telefono_p"
                        variant="outlined"
                        value={values.telefono_p}
                        onChange={handleChange} />
                    <RadioGroup aria-label="tipo" name="tipo" value={values.tipo} onChange={handleChange}>
                        <FormControlLabel onClick={toggleSelect} value="I" control={<Radio />} label="Interno" />
                        <FormControlLabel onClick={toggleSelect} value="F" control={<Radio />} label="Foraneo" />
                    </RadioGroup>
                    <FormControl>
                        <InputLabel id="jurado-label">jurado</InputLabel>
                        <Select
                            labelId="jurado-label"
                            id="jurado"
                            value={values.cod_esp}
                            name="cod_esp"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {jurado.map((especialidad, i) => (
                                <MenuItem value={especialidad.cod_esp} key={i}>
                                    {especialidad.nombre_esp}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {toggle ?
                        <FormControl className="instituciones">
                            <InputLabel id="instituciones-label">Instituciones</InputLabel>
                            <Select
                                labelId="instituciones-label"
                                id="instituciones"
                                value={values.cod_inst}
                                name="cod_inst"
                                onChange={handleChange}
                                onBlur={handleChange}
                            >
                                {instituciones.map((institucion, i) => (
                                    <MenuItem value={institucion.cod_inst} key={i}>
                                        {institucion.nombre_inst}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        : <div></div>
                    }
                    <Button type="submit" variant="contained" size="small" disableElevation>Añadir Profesor</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default AnexoExperimentalForm