const { Schema , model} = require("mongoose");

const diagnosticCenterSchema = new Schema({
      name: {
        type: String,
      },
      tests: [
        {
            test_name: String,
            test_cost: Number
        }
      ],
      location:{
          type: String,
      },
})


const DiagnosticCenter = model('DiagnosticCenter' , diagnosticCenterSchema);
module.exports = DiagnosticCenter;


// how to take input of this schema in postman
// {
//     "name": "Apollo",
//     "tests": [
//         {
//             "test_name": "Blood Test",
//             "test_cost": 1000
//         },
//         {

//             "test_name": "X-Ray",
//             "test_cost": 2000
//         }
//     ],
//     "location": "Kolkata"
// }

// how to take input of this schema in postman in x-www-form-urlencoded
// name=Apollo
// tests[0][test_name]=Blood Test
// tests[0][test_cost]=1000
// tests[1][test_name]=X-Ray
// tests[1][test_cost]=2000
// location=Kolkata


// and how to parse the value of request body in the controller
// const setCenter = async (req, res) => {
//   try {
//     const { name, tests, location } = req.body;
//     console.log(req.body);
//     const newCenter = await Center.create({
//       name: name,
//       location: location,
//       tests: tests
//     });
//     const createCenter = await newCenter.save();
//     res.json(newCenter);
//     if (createCenter)
//       return res.status(201).json({
//         status: true,
//         message: "New Center have been added.",
//       });
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       //   return res.status(300).json({
//       //     status: false,
//       //     message: error,
//       //   });

//       //   next(error);
//     }

// how to get the list of unique tests from all the centers added
// const getTests = async (req, res) => {
//   try {
//     const centers = await Center.find();
//     let tests = [];
//     centers.forEach((center) => {
//       center.tests.forEach((test) => {
//         tests.push(test.test_name);
//       });
//     });
//     const uniqueTests = [...new Set(tests)];
//     res.json(uniqueTests);
//   } catch (error) {
//     if (error) {
//       console.log(error);

//       //   next(error);
//     }
//   }
// };

//how to create a set of objects based on one attribute
// const getTests = async (req, res) => {
//   try {
//     const centers = await Center.find();
//     let tests = [];
//     centers.forEach((center) => {
//       center.tests.forEach((test) => {
//         tests.push(test.test_name);
//       });
//     });
//     const uniqueTests = [...new Set(tests)];
//     let testObject = {};
//     uniqueTests.forEach((test) => {
//       testObject[test] = [];
//     });
//     centers.forEach((center) => {
//       center.tests.forEach((test) => {
//         testObject[test.test_name].push({
//           center_name: center.name,
//           center_location: center.location,
//           test_cost: test.test_cost,
//         });
//       });
//     });
//     res.json(testObject);
//   } catch (error) {
//     if (error) {
//       console.log(error);

//       //   next(error);
//     }
//   }
// };




