const { application } = require('express');
const express = require('express');
const router = express.Router();

const contatoController = require('../controllers/contatoController');

router.post('/', contatoController.criar);

router.get('/', contatoController.listar);

router.get('/:id', contatoController.consultar);

router.put('/:id', contatoController.atualizar);

router.delete('/:id', contatoController.remover);

module.exports = router;