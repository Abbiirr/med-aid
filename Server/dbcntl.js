const mongoose = require ('mongoose')
const diseaseSchema = require ("../Schemas/Models/disease.models.js")

mongoose.connect("mongodb://localhost/testdb")

run()

async function run(){
    try{
        //run once
        // const disease1 = await diseaseSchema.create({
        //     name:"Hepatitis",
        //     variant:"B",
        //     diseaseType:"viral",
        //     symptoms:["Fever","Fatigue","Loss of Appetite","Nausea","Vomiting","Abdominal Pain","Dark Urine"]
        // })
        const findDisease = await diseaseSchema.find({symptoms: "Nausea"})
        console.log(findDisease)
    }catch(e){
        console.log(e.message)
    }

}



