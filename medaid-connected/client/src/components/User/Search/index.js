import React, { useEffect, useState } from "react";
import './style.scss'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import {Icon} from 'react-icons-kit';
import {ic_search} from 'react-icons-kit/md'
import {cross} from 'react-icons-kit/icomoon/cross'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from "axios";

//http://localhost:4000/api/v1/patient/findDoctors?

const Index = () =>{

    const options = [
        { value: 'Specialist', label: 'Specialist' },
        { value: 'Medicine', label: 'Medicine' },
        { value: 'Diagnostic', label: 'Diagnostic' }
    ]

    const aquaticCreatures = [
        { label: 'Fever', value: 'Fever' },
        { label: 'Cough', value: 'Cough' },
        { label: 'Headache', value: 'Headache' },
        { label: 'Vomitting', value: 'Vomitting' },
        { label: 'Nausia', value: 'Nausia' },
        { label: 'Cramp', value: 'Cramp' },
    ];


    const history= useHistory()
    const {register,handleSubmit,formState: { errors }} = useForm()
    
    const [option, setOption] = useState(options[0])
    const [doctors, setDoctors] = useState([]);
    const [symptoms, setSymptoms] = useState([]);

    useEffect(() => {
        console.log(option)
        
    }, [option]);


    const onSubmit = data =>{

        history.push(`/search?symptoms=${data.symptom}&specialist=${option || options[0].value}`)

    }

    const reloadSearch = () => {
        console.log('reload');
        const response = axios.get(
            `http://localhost:4000/api/v1/patient/reload`
        );
    };

    return (
        <div className="search">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="d-flex">
                                    <div className="flex-fill">
                                        <input
                                            maxMenuHeight={175}
                                            classNamePrefix="custom-select"
                                            //value={symptoms}
                                            options={aquaticCreatures}
                                            isMulti
                                            placeholder="Your Symptoms"
                                            {...register('symptom', { required: true })}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            className={errors.symptom ? "form-control shadow-none form-control-error" : "form-control shadow-none"}
                                            //onClick={() => setSymptoms(symptoms)}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="reload"
                                            className="btn0 shadow-none"
                                            //onClick={reloadSearch}
                                        >
                                            <Icon icon={cross} size={15} />
                                        </button>
                                    </div>
                                    <div>
                                        <Select
                                            classNamePrefix="custom-select"
                                            value={option}
                                            styles={customStyles}
                                            placeholder={'Select Specialist'}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            options={options}
                                            defaultValue={options[0]}
                                            //onClick={() => setOption(this.value)}
                                        />
                                    </div>
                                    <div>
                                        <button
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