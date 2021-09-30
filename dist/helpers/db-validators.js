"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checarEmailExisteLogin = exports.checarEmailExiste = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
//verificar si el correo existe
const checarEmailExiste = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeMail = yield usuario_1.default.findOne({ email });
    if (existeMail) {
        throw new Error(`Este correo ${email} ya esta registrado`);
    }
});
exports.checarEmailExiste = checarEmailExiste;
//verificar si el correo existe para LOGIN
const checarEmailExisteLogin = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeMail = yield usuario_1.default.findOne({ email, status: true });
    if (!existeMail) {
        throw new Error(`La cuenta con este correo no existe`);
    }
});
exports.checarEmailExisteLogin = checarEmailExisteLogin;
//# sourceMappingURL=db-validators.js.map