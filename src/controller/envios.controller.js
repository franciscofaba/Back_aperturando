import {pool} from '../db.js'

export const getEnvios = async (req,res) => {
    const [rows] = await pool.query('SELECT * FROM envios')
    res.json(rows)
}

export const createEnvios = async (req,res) => {
    const {envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal} = req.body
    const [rows] = await pool.query('INSERT INTO envios (envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal)  VALUES (?,?,?,?,?,?,?,?,?,?)',[envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal])
    res.send({
        id:rows.insertId,
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
}

export const updateEnvios = (req,res) => res.send('creando envios')

export const deleteEnvios = (req,res) => res.send('eliminando envios')