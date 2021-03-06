import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'

// titulo_propuesta, cedula_t, fec_entrega
const PropuestasTable = () => {
    const history = useHistory()
    const [propuestas, setPropuestas] = useState([{}])
    const [state, setState] = useState({
        columns: [
            { title: 'Titulo', field: 'titulo_propuesta' },
            { title: 'ID', field: 'id_propuesta', editable: 'never' },
            { title: 'Fecha de Entrega', field: 'fec_entrega' },
            { title: 'Tesista', field: 'nombre_t' },
        ],
        data: [],
    })

    useEffect(() => {
        fetchPropuestas()
    }, [])

    const handleRowClick = (e, rowData) => {
        const { id_propuesta } = rowData;
        history.push({
            pathname: '/propuesta',
            search: `?query=${id_propuesta}`,
            state: { rowData }
        })
    }

    //obtener todas las propuestas
    const fetchPropuestas = () => {
        fetch('http://tesis-manager.herokuapp.com/propuestasT')
            .then(res => res.json())
            .then(result => setPropuestas(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una propuesta
    const deletePropuesta = (id_propuesta) => {
        console.log(id_propuesta)
        fetch(`http://tesis-manager.herokuapp.com/propuestas/${id_propuesta}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una especialidad
    const updatePropuesta = (propuesta) => {
        console.log(propuesta)
        const { id_propuesta, id_comite, estatus_aprobacion, titulo_propuesta,
            observaciones_comite, fec_comite, fec_veredicto, fec_aprobacion } = propuesta;
        const updateP = fetch(`http://tesis-manager.herokuapp.com/propuestas/${id_propuesta}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                id_comite, estatus_aprobacion, titulo_propuesta,
                observaciones_comite, fec_comite, fec_veredicto, fec_aprobacion, id_propuesta
            })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateP)
    }

    return (
        <MaterialTable
            title="Propuestas"
            columns={state.columns}
            data={propuestas}
            onRowClick={handleRowClick}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    updatePropuesta(newData);                //AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deletePropuesta(oldData.id_propuesta);                    //AQUI SE DELETEA LA ESPECIALIDAD
                        console.log(oldData.id_propuesta);
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    )
}

export default PropuestasTable
