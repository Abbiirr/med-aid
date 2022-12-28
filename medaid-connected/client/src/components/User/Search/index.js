import React, { useEffect, useState } from "react";
import './style.scss'
import Select from 'react-select'
//import AsyncSelect from 'react-select/async';
import {Icon} from 'react-icons-kit';
import {ic_search} from 'react-icons-kit/md'
import {redo} from 'react-icons-kit/icomoon/redo'
import {useHistory} from 'react-router-dom'
import axios from "axios";


//http://localhost:4000/api/v1/patient/findDoctors?

const Index = () =>{

    const [symptoms, setSymptoms] = useState([])
    
    useEffect(() => {
        //search symptoms
    
        const searchSymptoms = async () => {
          try {
            const response = await axios.get(
              `http://localhost:4000/api/v1/disease/symptoms`
            );
            //console.log(response.data);
            let diseases = response.data

            let symptomsArray = new Set();

            diseases.forEach(function (item) {
                //item.symptoms.toString()
                //console.log(item.symptoms);
                item.symptoms.forEach(function (sym) {
                    symptomsArray.add(sym);
                });
            });

            console.log(symptomsArray)
            setSymptoms(symptomsArray);

          } catch (error) {
            if (error) console.log("error");
          }
        };
        searchSymptoms();
      }, []);
    

    const options = [
        { value: 'Specialist', label: 'Specialist' },
        // { value: 'Medicine', label: 'Medicine' },
        // { value: 'Diagnostic', label: 'Diagnostic' }
    ]

    //const symptomOptions = symptoms;
    //console.log(symptoms);

    let symptomOptions = []

    symptoms.forEach( function (item){
        symptomOptions.push({
            label: item,
            value: item
        })
    })

    //console.log(symptomOptions);
    

    const aquaticCreatures = symptomOptions

    const history= useHistory()

    const [option, setOption] = useState([options[0]])

    // useEffect(() => {
    //     console.log(option)
    // }, [option]);

    const [selectedOptions, setSelectedOptions] = useState([])

    //let s = ''

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log("Selected symptoms : ", selectedOptions)
        let s = ''
        for (let i = 0; i < selectedOptions.length; i++) {
            s = s + selectedOptions[i].value.toString() + ','
        }
        s = s.slice(0, -1);

        //console.log(selectedOptions)
        //console.log(s)

        history.push(`/search?symptoms=${s}&specialist=${options[0] || options[0].value}`)
        // setOption([options[0]])
    }

    const reloadSearch = () => {
        console.log('reload');
        const response = axios.get(
            `http://localhost:4000/api/v1/patient/reload`
        );
        
        console.log("reload succesfull")
    };

    return (
        <div className="search">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow">
                            <form>
                                <div className="d-flex">
                                    <div className="flex-fill">
                                        <Select
                                            onChange={(item) => setSelectedOptions(item)}
                                            maxMenuHeight={175}
                                            classNamePrefix="custom-select"
                                            options={aquaticCreatures}
                                            //options={symptoms}
                                            isMulti
                                            isClearable={true}
                                            isSearchable={true}
                                            placeholder="Your Symptoms"
                                            // have to make this field required to make the search work
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="reload"
                                            className="btn0 shadow-none"
                                            onClick={reloadSearch}
                                        >
                                            <Icon icon={redo} size={15} />
                                        </button>
                                    </div>

                                    <div>
                                        <Select
                                            classNamePrefix="custom-select"
                                            value={options[0]}
                                            styles={customStyles}
                                            placeholder={'Select Specialist'}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            options={options}
                                            defaultValue={options[0]}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            onClick={onSubmit}
                                            type="submit"
                                            className="btn shadow-none"
                                        >
                                            <Icon icon={ic_search} size={28} />
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Index;

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: 170,
        height: 45,
        fontSize: 14,
        color: '#000',
        boxShadow: 'none',
        '&:hover': { borderColor: 'none' },
        border: state.isFocused ? 'none' : 'none',
        borderRadius: '25px'
    })
}