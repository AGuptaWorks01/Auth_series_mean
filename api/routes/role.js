const express = require('express')
const { createRole, updateRole, getAllRoles, deleteRole } = require('../controllers/role.controller')

const router = express.Router()

router.post('/create', createRole)

router.put('/update/:id', updateRole)

router.get('/getAll', getAllRoles)

router.delete('/deleteRole/:id', deleteRole)

module.exports = router;