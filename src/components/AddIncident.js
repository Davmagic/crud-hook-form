import React, { useState } from "react";
import { Link } from 'react-router-dom';
import IncidentsDataService from '../services/IncidentService';
import { useForm } from "react-hook-form";

const AddIncident = () => {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const saveIncident = (data) => {
        console.log(data)
        IncidentsDataService.create(data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }
    if (submitted) {
        return (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <div>
                    Ticket Registrado Correctamente
                </div>
                <Link to={'/Incidents'}>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setSubmitted(false)}></button>
                </Link>
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit(saveIncident)} className="row justify-content-center">
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="ticketid" className="form-label">ID del Ticket</label>
                    <input {...register('ticketID', { required: true })} className="form-control" id="ticketid"></input>
                    {errors.ticketID && <span className="form-text text-danger">Ingresar el Id del ticket</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <input {...register('description', { required: true })} className="form-control" id="description"></input>
                    {errors.description && <span className="form-text text-danger">Ingresar descripción del ticket</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Asignar departamento</label>
                    <select {...register("department")} className="form-select" aria-label="select department" required>
                        <option value="">Open this select menu</option>
                        <option value="Finanzas">Finanzas</option>
                        <option value="Contabilidad">Contabilidad</option>
                        <option value="Desarrollo">Desarrollo</option>
                    </select>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="agent" className="form-label">Agente</label>
                    <input {...register('agent', { required: true })} className="form-control" id="agent"></input>
                    {errors.agent && <span className="form-text text-danger">Ingresar Agente a cargo</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado del ticket</label>
                    <select defaultValue="Pendiente" {...register("status")} className="form-select" aria-label="select status">
                        <option value="Resuelto">Resuelto</option>
                        <option value="enProceso">En Proceso</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                </div>
                <input className="btn btn-primary" type="submit" />
            </div>
        </form>
    );
}

export default AddIncident;