"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ruta de inicio 
// /api/usuarios
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const db_validators_1 = require("../helpers/db-validators");
const validacionesUsuario_1 = require("../middlewares/validacionesUsuario");
const router = (0, express_1.Router)();
router.get('/', [], usuarios_controller_1.getUsuarios);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'Nombre es requerido').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email es requerido').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password es requerido').not().isEmpty(),
    (0, express_validator_1.check)('email').custom(db_validators_1.checarEmailExiste),
    validarCampos_1.validarCampos
], usuarios_controller_1.crearUsuario);
router.put('/:id', [
    // check('id_user', 'Id no válido').isMongoId(),
    validacionesUsuario_1.validaUsuarioExiste,
    validarCampos_1.validarCampos
], usuarios_controller_1.updateUsuario);
router.delete('/:id', [
// check('id_user', 'Id no válido').isMongoId(),
// validaUsuarioExiste,
// validarCampos
], usuarios_controller_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map