const Role = require('../models/Role')

exports.createRole = async (req, res, next) => {
	try {
		if (req.body.role && req.body.role !== '') {
			const newRole = new Role(req.body)
			await newRole.save()
			return res.send('Role Created')
		} else {
			return res.status(400).json('Bad Request')
		}
	} catch (error) {
		return res.status(500).send('Internal server error!')
	}
}

exports.updateRole = async (req, res, next) => {
	try {
		const role = await Role.findById({ _id: req.params.id })
		if (role) {
			const newData = await Role.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true }
			)
			return res.status(200).send('Role Updated')
		} else {
			return res.status(404).send('Role Not Found!')
		}
	} catch (error) {
		return res.status(500).send('Internal server error!')
	}
}

exports.getAllRoles = async (req, res, next) => {
	try {
		const roles = await Role.find({})
		return res.status(200).send(roles)
	} catch (error) {
		return res.status(500).send('Internal server error!')
	}
}

exports.deleteRole = async (req, res, next) => {
	try {
		const roleId = req.params.id
		const role = await Role.findById({ _id: roleId })
		if (role) {
			await Role.findByIdAndDelete(roleId)
			return res.status(200).send('Role Deleted')
		} else {
			return res.status(404).send('ROle not FOund!')
		}
	} catch (error) {
		return res.status(500).send('Internal server error!')
	}
}