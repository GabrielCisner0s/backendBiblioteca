const db = require("../db");

exports.getLibros = (req,res)=>{

    db.query(
        "SELECT * FROM libros",
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );

};

exports.getLibro = (req,res)=>{

    const id = req.params.id;

    db.query(
        "SELECT * FROM libros WHERE id=?",
        [id],
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            if(result.length===0){
                return res.status(404).json({
                    mensaje:"Libro no encontrado"
                });
            }

            res.json(result[0]);
        }
    );
};


exports.createLibro = (req,res)=>{

    const {
        id,
        titulo,
        autor,
        anio,
        disponible
    } = req.body;

    if(!id || !titulo || !autor || !anio){

        return res.status(400).json({
            mensaje:"Todos los campos son obligatorios"
        });
    }

    if(anio < 1900){

        return res.status(400).json({
            mensaje:"El año debe ser mayor o igual a 1900"
        });
    }

    db.query(
        "SELECT * FROM libros WHERE id=?",
        [id],
        (err,datos)=>{

            if(datos.length>0){

                return res.status(400).json({
                    mensaje:"ID duplicado"
                });
            }

            db.query(
                "INSERT INTO libros VALUES(?,?,?,?,?)",
                [
                    id,
                    titulo,
                    autor,
                    anio,
                    disponible
                ],
                (err)=>{

                    if(err)
                        return res.status(500).json(err);

                    res.status(201).json({
                        mensaje:"Libro agregado"
                    });
                }
            );
        }
    );
};



exports.updateLibro = (req,res)=>{

    const id = req.params.id;

    const {
        titulo,
        autor,
        anio,
        disponible
    } = req.body;

    db.query(
        `UPDATE libros
         SET titulo=?,
             autor=?,
             anio=?,
             disponible=?
         WHERE id=?`,
        [
            titulo,
            autor,
            anio,
            disponible,
            id
        ],
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                mensaje:"Libro actualizado"
            });
        }
    );
};



exports.deleteLibro=(req,res)=>{

    db.query(
        "DELETE FROM libros WHERE id=?",
        [req.params.id],
        (err)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                mensaje:"Libro eliminado"
            });
        }
    );
};