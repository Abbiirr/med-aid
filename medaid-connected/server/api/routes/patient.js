const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Permission')
const ProfileController = require('../controllers/Patient/ProfileController')
const AppointmentController = require('../controllers/Patient/AppointmentController')
const searchDoctorsController = require('../controllers/Patient/SearchDoctor')
const patientController = require('../controllers/Patient/PatientFind')

router.get('/profile', patientController.findPatient)

router.get('/me', Authenticate.isPatient, ProfileController.Me)
router.post('/profile/:id/update/photo', Authenticate.isPatient, ProfileController.updatePhoto)
router.post('/profile/:id/update/bio', Authenticate.isPatient, ProfileController.updateBio)

router.get('/findDoctors', searchDoctorsController.findNearestDoctors);
router.get('/reload', searchDoctorsController.reloadSearch);

router.get('/appointment/request/:id/index', Authenticate.isPatient, AppointmentController.GetAppointmentRequests)
router.post('/appointment/request', Authenticate.isPatient, AppointmentController.SetAppointmentRequest)


module.exports = router