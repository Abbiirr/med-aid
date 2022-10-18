import React,{useState} from 'react';
import './style.scss'
import Select from 'react-select'
import {Icon} from 'react-icons-kit';
import {ic_search} from 'react-icons-kit/md'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'


const Index = ({
    lat,lang
}) =>{
    const history= useHistory()
    const {register,handleSubmit,formState: { errors }} = useForm()
    const [specialist, setSpecialist] = useState()
    
    const [symptom, setSymptom] = useState("");

    const options = [
        { value: 'Specialist', label: 'Specialist' },
        { value: 'Medicine', label: 'Medicine' },
        { value: 'Diagnostic', label: 'Diagnostic' }
    ]


     //onchange Specialist select
    const onChangeSpecialist= event =>{
        setSpecialist(event.value)
    }


    const onSubmit = data =>{

         // const newData = {
        //     lattitude: lat,
        //     longitude: lang,
        //     deases: data.deases,
        //     specialist: specialist
        // }

        //setSymptom(data.symptom)
        console.log(data.symptom)
     
        history.push(`/search?lat=${lat}&lang=${lang}&symptom=${data.symptom}&specialist=${specialist || options[0].value}`)

    }

    //get symptom data
    //need to use asyncSelect
    //Just implimenting multi-select
    const aquaticCreatures = [
        { label: 'Fever', value: 'Fever' },
        { label: 'Cough', value: 'Cough' },
        { label: 'Headache', value: 'Headache' },
        { label: 'Vomitting', value: 'Vomitting' },
        { label: 'Nausia', value: 'Nausia' },
        { label: 'Cramp', value: 'Cramp' },
    ];

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
                                            classNamePrefix="custom-aselect"
                                            options={aquaticCreatures}
                                            isMulti
                                            placeholder="Your Symptoms"
                                            {...register('symptom', { required: true })}
                                            className={errors.symptom ? "form-control shadow-none form-control-error" : "form-control shadow-none"}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            classNamePrefix="custom-select"
                                            styles={customStyles}
                                            placeholder={'Select Specialist'}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            options={options}
                                            defaultValue={options[0]}
                                            onChange={onChangeSpecialist}
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