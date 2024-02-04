import {pool} from '../db.js'


export const getEnvios = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM envios')
        res.json(rows)

    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }
    
}

export const getById = async (req,res) => {
    try{
        console.log([req.params.envio])
        const [rows] = await pool.query('SELECT * FROM envios WHERE envio = ?', [req.params.envio])
        if (rows.length <= 0 ) return res.status(404).json({
            message:'no se encontro envio'
        })
        res.json(rows[0])
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }   
}

export const createEnvios = async (req,res) => {
    try{
        const {envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal} = req.body
        const [rows] = await pool.query('INSERT INTO envios (envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal)  VALUES (?,?,?,?,?,?,?,?,?,?)',[envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal])
        res.send({
            id: rows.insertId,
            envio, 
            pesoPreaviso, 
            envase, claseEnvio, 
            estadoActual, 
            ultimoAcontecimiento, 
            paisOrigen, 
            paisDestino, 
            ultimaModificacion,
            identificadorLocal
        })
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    } 
}

export const updateEnvios = async (req,res) => {
    try{
        const {envio} = req.params
        const {pesoPreaviso,envase, claseEnvio,estadoActual,ultimoAcontecimiento,paisOrigen,paisDestino,ultimaModificacionidentificadorLocal} = req.body
        const [result] = await pool.query('UPDATE envios SET envio = IFNULL(?, envio), pesoPreaviso = IFNULL(?, pesoPreaviso), envase = IFNULL(?, envase), claseEnvio = IFNULL(?, claseEnvio), estadoActual = IFNULL(?, estadoActual), ultimoAcontecimiento = IFNULL(?, ultimoAcontecimiento), paisOrigen = IFNULL(?, paisOrigen), paisDestino = IFNULL(?, paisDestino), ultimaModificacion = IFNULL(?, ultimaModificacion), identificadorLocal = IFNULL(?, identificadorLocal)',[envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal])
        console.log(result)
        if (result.afffectedRows <= 0 ) return res.status(404).json({
            message:'no se encontro envio'
        })
        const [rows] = await pool.query('SELECT * FROM envios WHERE envio = ?', [req.param.envio])
        res.json(rows[0])
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    } 
}

export const deleteEnvios = async (req,res) => {
    try{
        const [result]= await pool.query('DELETE FROM envios WHERE envio = ?', [req.param.envio])
        if (result.afffectedRows <= 0 ) return res.status(404).json({
            message:'no se encontro envio'
        })
        console.log(result)
        res.sendStatus(204)
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    } 
}