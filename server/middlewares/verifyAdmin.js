//==============
// Verify Admin role
//==============
let verifyAdmin = (req, res, next) => {


    console.log(req + "-...........-" + res);

    //TODO: para hacer esto, si o si hay que usar tokens?
    // let usuario = req.usuario;

    // if (usuario.role !== "ADMIN_ROLE") {
    //     return res.json({
    //         ok: false,
    //         error: {
    //             message: 'El usuario no es administrador'
    //         }
    //     });
    // }

    // next();
};



module.exports = {
    verifyAdmin,
}