const schema = mongoose.schema

const doctorSchema= new schema({
    id: ObjectID,
    firstName: String,
    lastName: String,
    email: String,
    contact: String,
    gender: String,
    age: Number,
    speciality: [{
        field:String
    }],
    chamber: String,
    qualification: [{
        degree: String,
        year: Date,
    }],
})

const patientSchema = new schema({
    id: ObjectID,
    firstName: String,
    lastName: String,
    email: String,
    contact: String,
    gender: String,
    age: Number,
    weight: Number,
    disabilities:[{
        name: String
    }]
})

const appoinmentSchema = new schema({
    id: ObjectID,
    patientID: ObjectID(),
    doctorID: ObjectID(),
    appoinmentTime: Date,
    isVisited: Boolean,
})

const diseasesSchema = new schema({
    id: ObjectID,
    name: String,
    type: String,
    symptoms:[{
        symptomsID : Number,
        name: String
    }]
})

const prescriptionSchema = new schema({
    id: ObjectID,
    patientID: ObjectID(),
    doctorID: ObjectID(),
    nextVisitDate: Date,
    medication:[{
        medicieID: ObjectID(),
        continueTill: Date,
        timesPerDay: Number
    }],
    medicalTest: [{
        testID: ObjectID(),
    }]
})

const medicationSchema = new schema({
    id: ObjectID,
    name: String,
    type: String,
    price: Number,
    shop:{
        name: String,
        location: String,
        price: Number
    },
    alternate:[{
        alternateMedineName: String,
        location: String,
        price: Number
    }]
})

const medicalTestSchema = new schema({
    id: ObjectID,
    name: String,
    price: Number,
    location:[{
        diaginisticCenter: String,
        location: String,
        price: Number
    }]
})

const ReviewSchema = new schema({
    author: ObjectID(),
    reveiwOn: ObjectID(),
    comments: [{ 
        body: String,
        date: Date 
    }],
    date: {
        type: Date
    },
    meta: {
      votes: Number,
      favs:  Number
    }
})