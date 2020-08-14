const express = require('express');
const pool = require('../db');
const router = express.Router();

//wokrs
router.get('/anexo_instrumental_academico', async (req, res) => {
    try {
        const anexoIA = await pool.query('SELECT * FROM anexo_instrumental_academico');
        res.body = anexoIA;
        res.json(anexoIA.rows);
        console.log(res.body);
    } catch (err) {
        res.body = err.message;
        res.json(err.message);
        console.log(res.body);
    }
});

// function getLocalDate() {
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();
//     today = mm + '/' + dd + '/' + yyyy;
//     return today;
// }

//Registrar un comite
//works
router.post('/anexo_instrumental_academico', async (req, res) => {
    try {
        const { id_tg, cedula_p, tema_propuesta, organizacion, criterio1, criterio2, criterio3, criterio4, criterio5, criterio6,decision_revisor, observaciones, fec_revision, iniciativa, responsabilidad, adaptacion, hpcinstrucciones, hpphechos, aporteideas, observacionesemp, tetotal, taresresponsabilidad, tadocumento, presentacion, seleccion, justificacion, metodologia, documentacion, precisionproducto, cumplimientoobj, recomendacionpt, definicion, profundidad, validez, recomendaciones, bibliografia, tiempo, contenido, calidad, desenvolvimiento, demostracion, respuestase, jurado, total300, total20, mencionh, justificacionh } = req.body;
        const newAnexoIA = await pool.query(
            "INSERT INTO anexo_instrumental_academico ( id_tg, cedula_p, tema_propuesta, organizacion, criterio1, criterio2, criterio3, criterio4, criterio5, criterio6,decision_revisor, observaciones, fec_revision, iniciativa, responsabilidad, adaptacion, hpcinstrucciones, hpphechos, aporteideas, observacionesemp, tetotal, taresresponsabilidad, tadocumento, presentacion, seleccion, justificacion, metodologia, documentacion, precisionproducto, cumplimientoobj, recomendacionpt, definicion, profundidad, validez, recomendaciones, bibliografia, tiempo, contenido, calidad, desenvolvimiento, demostracion, respuestase, jurado, total300, total20, mencionh, justificacionh ) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47 ) ",
            [id_tg, cedula_p, tema_propuesta, organizacion, criterio1, criterio2, criterio3, criterio4, criterio5, criterio6,decision_revisor, observaciones, fec_revision, iniciativa, responsabilidad, adaptacion, hpcinstrucciones, hpphechos, aporteideas, observacionesemp, tetotal, taresresponsabilidad, tadocumento, presentacion, seleccion, justificacion, metodologia, documentacion, precisionproducto, cumplimientoobj, recomendacionpt, definicion, profundidad, validez, recomendaciones, bibliografia, tiempo, contenido, calidad, desenvolvimiento, demostracion, respuestase, jurado, total300, total20, mencionh, justificacionh]
        );

        res.json(`Anexo creado exitosamente`);

    } catch (err) {
        res.body = err.message;
        res.json(err.message);
        console.log(res.body);
    }
})

//Get Un comite
//works
router.get('/anexo_instrumental_academico/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const AnexoIA = await pool.query("SELECT * FROM anexo_instrumental_academico WHERE id_tg = $1", [id]);

        if (AnexoIA.rows[0]) {
            res.json(AnexoIA.rows[0]);
        } else {
            res.json(`No existe ningun Anexo de codigo ${id}`)
        }

    } catch (err) {
        res.body = err.message;
        res.json(err.message);
        console.log(res.body);
    }
});


//Actualizar un comite
//works
router.put('/anexo_instrumental_academico/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { tema_propuesta, organizacion, criterio1, criterio2, criterio3, criterio4, criterio5, criterio6,decision_revisor, observaciones, fec_revision, iniciativa, responsabilidad, adaptacion, hpcinstrucciones, hpphechos, aporteideas, observacionesemp, tetotal, taresresponsabilidad, tadocumento, presentacion, seleccion, justificacion, metodologia, documentacion, precisionproducto, cumplimientoobj, recomendacionpt, definicion, profundidad, validez, recomendaciones, bibliografia, tiempo, contenido, calidad, desenvolvimiento, demostracion, respuestase, jurado, total300, total20, mencionh, justificacionh } = req.body;
        const updateAnexo = await pool.query("UPDATE anexo_instrumental_academico SET  tema_propuesta = $1, organizacion = $2, criterio1 = $3, criterio2 = $4, criterio3 = $5, criterio4 = $6, criterio5 = $7, criterio6 = $8,decisio_revisor = $9, observaciones = $10, fec_revision = $11, iniciativa = $12, responsabilidad = $13, adaptacion = $14, hpcinstrucciones = $15, hpphechos = $16, aporteideas = $17, observacionesemp = $18, tetotal = $19, taresresponsabilidad = $20, tadocumento = $21, presentacion = $22, seleccion = $23, justificacion = $24, metodologia = $25, documentacion = $26, precisionproducto = $27, cumplimientoobj = $28, recomendacionpt = $29, definicion = $30, profundidad = $31, validez = $32, recomendaciones = $33, bibliografia = $34, tiempo = $35, contenido = $36, calidad = $37, desenvolvimiento = $38, demostracion = $39, respuestase = $40, jurado = $41, total300 = $42, total20 = $43, mencionh = $44, justificacionh = $45 WHERE id_tg = $46",
            [tema_propuesta, organizacion, criterio1, criterio2, criterio3, criterio4, criterio5, criterio6,decision_revisor, observaciones, fec_revision, iniciativa, responsabilidad, adaptacion, hpcinstrucciones, hpphechos, aporteideas, observacionesemp, tetotal, taresresponsabilidad, tadocumento, presentacion, seleccion, justificacion, metodologia, documentacion, precisionproducto, cumplimientoobj, recomendacionpt, definicion, profundidad, validez, recomendaciones, bibliografia, tiempo, contenido, calidad, desenvolvimiento, demostracion, respuestase, jurado, total300, total20, mencionh, justificacionh, id]);

        res.json(`El Anexo ${id} ha sido actualizado exitosamente`);
    } catch (err) {
        res.body = err.message;
        res.json(err.message);
        console.log(res.body);
    }
});

//Borar un comite
//works
router.delete('/anexo_instrumental_academico/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAnexo = await pool.query("DELETE FROM anexo_instrumental_academico WHERE id_tg = $1", [id]);

        res.json(`El Anexo ${id} ha sido eliminado exitosamente`);

    } catch (err) {
        res.body = err.message;
        res.json(err.message);
        console.log(res.body);
    }
})

module.exports = router;