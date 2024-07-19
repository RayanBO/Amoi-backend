const express = require('express');
const router = express.Router();
const crudOperations = require('../CRUD/messages');

// Discution routes
router.post('/discution', async (req, res) => {
    try {
        const { idUser, idOther } = req.body;
        const id = await crudOperations.createDiscution(idUser, idOther);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/discution/:id', async (req, res) => {
    try {
        const discution = await crudOperations.getDiscution(req.params.id);
        if (discution) {
            res.json(discution);
        } else {
            res.status(404).json({ message: 'Discution not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/discution/:id', async (req, res) => {
    try {
        const { dateLast, lu } = req.body;
        await crudOperations.updateDiscution(req.params.id, dateLast, lu);
        res.json({ message: 'Discution updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/discution/:id', async (req, res) => {
    try {
        await crudOperations.deleteDiscution(req.params.id);
        res.json({ message: 'Discution deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Messages routes
router.post('/message', async (req, res) => {
    try {
        const { discutionId, expediteurId, contenu, reaction } = req.body;
        const id = await crudOperations.createMessage(discutionId, expediteurId, contenu, reaction);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/message/:id', async (req, res) => {
    try {
        const message = await crudOperations.getMessage(req.params.id);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/message/:id', async (req, res) => {
    try {
        const { contenu, reaction } = req.body;
        await crudOperations.updateMessage(req.params.id, contenu, reaction);
        res.json({ message: 'Message updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/message/:id', async (req, res) => {
    try {
        await crudOperations.deleteMessage(req.params.id);
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/discution/:id/messages', async (req, res) => {
    try {
        const messages = await crudOperations.getMessagesForDiscution(req.params.id);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;