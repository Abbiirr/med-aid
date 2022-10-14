import React,{useState} from 'react';
import './style.scss'
import Select from 'react-select'
import {Icon} from 'react-icons-kit';
import {ic_search} from 'react-icons-kit/md'
import {useForm} from 'react-hook-form'


const Index = ({ lat,lang }) =>{
    const {register,handleSubmit,formState: { errors }} = useForm()
    const [specialist, setSpecialist] = useState()

    const options = [
        {value: 'Specialist' , label:'Specialist'},
        {value: 'Medicine' , label:'Medicine'},
        {value: 'Diagnostic' , label:'Diagnostic'}
    ]


     //onchange Specialist select
    const onChangeSpecialist= event =>{
        setSpecialist(event.value)
    }

    const onSubmit = data =>{
        //code here
    }
    return(
        <div className="search">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="d-flex">
                                    <div className="flex-fill">
                                        <input
                                            type="text"
                                            placeholder="Your Symptoms"
                                            {...register('deases', { required: true })}
                                            className={errors.deases ? "form-control shadow-none form-control-error" : "form-control shadow-none"}
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