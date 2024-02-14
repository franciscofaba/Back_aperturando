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
        const {envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal,manifiesto,pesoEspecificado, destino_cl, estado_aduana, id_lotes} = req.body;
        await pool.query('SET FOREIGN_KEY_CHECKS=0');
        const [rows] = await pool.query('INSERT INTO envios (envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal,manifiesto,pesoEspecificado, destino_cl, estado_aduana, id_lotes)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal,manifiesto,pesoEspecificado, destino_cl, estado_aduana, id_lotes]);
        res.status(201).json({
            id: rows.insertId,
            envio, 
            pesoPreaviso, 
            envase, 
            claseEnvio, 
            estadoActual, 
            ultimoAcontecimiento, 
            paisOrigen, 
            paisDestino, 
            ultimaModificacion,
            identificadorLocal,
            manifiesto,
            pesoEspecificado,
            destino_cl,
            estado_aduana,
            id_lotes
        });
        await pool.query('SET FOREIGN_KEY_CHECKS=1');
    } catch(error) {
        console.error('Error al insertar envios:', error);
        return res.status(500).json({
            message: 'ERROR: algo salió mal'
        });
    } 
}

export const updateEnvios = async (req, res) => {
    try {
        const { envio } = req.params;
        const {
            pesoPreaviso,
            envase,
            claseEnvio,
            estadoActual,
            ultimoAcontecimiento,
            paisOrigen,
            paisDestino,
            ultimaModificacion,
            identificadorLocal,
            destino_cl,
            estado_aduana,
            id_lotes,
            en_proceso
        } = req.body;

        // Verificar si los parámetros necesarios están presentes
        if (!envio) {
            return res.status(400).json({ message: 'El parámetro envío es requerido.' });
        }

        // Iniciar una transacción
        await pool.query('START TRANSACTION');
        await pool.query('SET FOREIGN_KEY_CHECKS=0');
        const [result] = await pool.query(`
            UPDATE envios 
            SET envio = IFNULL(?, envio), 
                pesoPreaviso = IFNULL(?, pesoPreaviso), 
                envase = IFNULL(?, envase), 
                claseEnvio = IFNULL(?, claseEnvio), 
                estadoActual = IFNULL(?, estadoActual), 
                ultimoAcontecimiento = IFNULL(?, ultimoAcontecimiento), 
                paisOrigen = IFNULL(?, paisOrigen), 
                paisDestino = IFNULL(?, paisDestino), 
                ultimaModificacion = IFNULL(?, ultimaModificacion), 
                identificadorLocal = IFNULL(?, identificadorLocal), 
                destino_cl = IFNULL(?, destino_cl), 
                estado_aduana = IFNULL(?, estado_aduana), 
                id_lotes = IFNULL(?, id_lotes),
                en_proceso = IFNULL(?, en_proceso)
            WHERE envio = ?
        `, [envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal, destino_cl, estado_aduana, id_lotes, en_proceso ,envio]);

        // Commit de la transacción
        await pool.query('COMMIT');

        // Verificar si se actualizó correctamente
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'No se encontró el envío.' });
        }

        const [rows] = await pool.query('SELECT * FROM envios WHERE envio = ?', [envio]);
        res.json(rows[0]);
    } catch (error) {
        // Si hay un error, hacer rollback de la transacción
        await pool.query('ROLLBACK');
        console.error(error);
        return res.status(500).json({ message: 'ERROR: Algo salió mal.' });
    }
    await pool.query('SET FOREIGN_KEY_CHECKS=1');
}



export const deleteEnvios = async (req,res) => {
    try{
        const [result]= await pool.query('DELETE FROM envios WHERE envio = ?', [req.params.envio])
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


export const getByLotes = async (req,res) => {
    try{
        console.log([req.params.lote])
        const [rows] = await pool.query('SELECT * FROM envios WHERE id_lotes = ?', [req.params.lote])
        if (rows.length <= 0 ) return res.status(404).json({
            message:'no se encontro envio'
        })
        res.json(rows)
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }   
}



export const getEnvios_proceso = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM envios WHERE en_proceso = "si"')
        res.json(rows)

    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }
}