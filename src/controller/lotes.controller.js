import {pool} from '../db.js'


export const getLotes = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM lotes WHERE estado_despacho = "en espera" ')
        res.json(rows)

    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }
    
}

export const getById_lotes = async (req,res) => {
    try{
        console.log([req.params.id_lote])
        const [rows] = await pool.query('SELECT * FROM lotes WHERE id_lote = ?', [req.params.id_lote])
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

export const createLotes = async (req, res) => {
    try {
        const { id_lote, estado_aduana, estado_despacho } = req.body;
        const [rows] = await pool.query('INSERT INTO lotes (id_lote, estado_aduana, estado_despacho) VALUES (?,?,?)', [id_lote, estado_aduana, estado_despacho]);
        res.status(201).json({
            id: rows.insertId,
            id_lote,
            estado_aduana,
            estado_despacho   
        });
    } catch(error) {
        console.error('Error al insertar el lote:', error);
        return res.status(500).json({
            message: 'ERROR: algo salió mal'
        });
    }
};

export const updateLotes = async (req, res) => {
    try {
        const { id_lote } = req.params;
        const {estado_aduana, estado_despacho } = req.body;
        await pool.query('SET FOREIGN_KEY_CHECKS=0');
        const [result] = await pool.query('UPDATE lotes SET id_lote = IFNULL(?, id_lote), estado_aduana = IFNULL(?, estado_aduana), estado_despacho = IFNULL(?, estado_despacho) WHERE id_lote = ?', [id_lote, estado_aduana, estado_despacho, id_lote]);

        console.log(result);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'No se encontró el envío'
            });
        }

        const [rows] = await pool.query('SELECT * FROM lotes WHERE id_lote = ?', [id_lote]);
        await pool.query('SET FOREIGN_KEY_CHECKS=1');
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'ERROR: algo salió mal'
        });
    }
}


export const deleteLotes = async (req,res) => {
    try{
        console.log([req.params.id_lote])
        const [result]= await pool.query('DELETE FROM lotes WHERE id_lote = ?', [req.params.id_lote])
        if (result.affectedRows <= 0 ) return res.status(404).json({
            message:'no se encontro envio'
        })
        console.log(result)
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    } 
}