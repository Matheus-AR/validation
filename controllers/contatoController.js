const { ObjectId } = require('bson');
const Contato = require('../models/contatoModel');

async function criar(req, res) {
    const contato = new Contato(req.body);
    await contato.save()
        .then(doc => { return res.status(201).json(doc)})
        .catch(error => {
            
        });
}

async function listar(req, res) {
    await Contato.find({})
        .then(contato => { return res.json(contato) })
        .catch(error => { res.status(500).json(error)});
}

async function consultar(req, res) {
    await Contato.findOne({_id: ObjectId(req.params.id)})
        .then(contato => {
            if(contato) return res.json(contato);
            else return res.status(404).json('Contato não encontrado');
        })
        .catch(error => { return res.status(500).json(error)});
}

async function atualizar(req, res) {
    await Contato.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body, { runValidators: true })
        .then(contato => {
            if(contato) return res.status(204).end();
            else return res.status(404).json('Contato não encontrado')
        })
        .catch(error => {
            const msgErro = {};
            Object.values(error.errors).forEach(({ properties })=>{
                msgErro(properties.path) = properties.message;
            });
        });
}

async function remover(req, res) {
    await Contato.findOneAndDelete({_id: ObjectId(req.params.id)})
        .then(contato => {
            if (contato) return res.status(204).end();
            else return res.status(404).json('Contato não encontrado');
        })
        .catch(error => { res.status(500).json(error)});
}

module.exports = { criar, listar, consultar, atualizar, remover };