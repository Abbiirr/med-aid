// import React, { useEffect, useState } from "react";
// import './style.scss'
// import Select from 'react-select'
// //import AsyncSelect from 'react-select/async';
// import {Icon} from 'react-icons-kit';
// import {ic_search} from 'react-icons-kit/md'
// import {redo} from 'react-icons-kit/icomoon/redo'
// import {useHistory} from 'react-router-dom'
// import axios from "axios";


// //http://localhost:4000/api/v1/medicine/findMedicine


// const Index = () =>{

//     const [medicines, setMedicines] = useState([])
//     const [searchInput, setSearchInput] = useState("")
    
//     useEffect(() => {
//         //search medicines
    
//         const searchMedicines = async () => {
//           try {
//             const response = await axios.get(
//               ``
//             );
//             setMedicines(response.data);
//           } catch (error) {
//             if (error) console.log("error");
//           }
//         };
//         searchMedicines();
//       }, []);
    

//     const submitSearch = (e) =>{
//         e.preventDefault();
//         //dispatch(fetchSearch(searchInput));
//         setSearchInput("");
//     }

//     const handleChange = e => {
//        setSearchInput(e.target.value)
//     };
    

//     return (
//         <div>
//             <section className="garamond">
//                 <div className="navy georgia ma0 grow">
//                     <h2 className="f2">Search your medicine</h2>
//                 </div>
//                 <div className="pa2">
//                     <input 
//                     className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
//                     type = "search" 
//                     placeholder = "Search Medicine" 
//                     onChange = {handleChange}
//                     value={searchInput}
//                     />
//                     <button onClick={submitSearch} type="submit">Search</button>
//                 </div>
//             </section>  
//         </div>
//     )
// }

// export default Index;
