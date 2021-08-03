import React, { useState } from "react";
import IncidentDataService from "../services/IncidentService";
import { useForm } from "react-hook-form";

const Incident = ({incident}) => {
    const initialIncidentState = {
        key: null,
        ticketID: "",
        description: "",
        department: "",
        agent: "",
        status: "",
    };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [currentIncident, setCurrentIncident] = useState(initialIncidentState);

    if (currentIncident.key !== incident.key) {
        setCurrentIncident(incident);
    }
    /* useEffect(() => {
        setValue('agent', currentIncident.department, { shouldValidate: true })
        setValue('status', currentIncident.status, { shouldValidate: true })
    }, []); */

    const updateIncident = (data) => {

        IncidentDataService.update(currentIncident.key, data)
            .then(() => {
                //confirm Update
            })
            .catch((e) => {
                console.log(e);
            });
    };
    
    return (
        <div>
            {currentIncident ? (
                <div className="edit-form">
                    <h4>Incidente</h4>
                    <form onSubmit={handleSubmit(updateIncident)}>
                        <div className="mb-3">
                            <label for="ticketid" className="form-label">ID del Ticket</label>
                            <input {...register('ticketId', { required: true })} defaultValue={currentIncident.ticketID} className="form-control" id="ticketid"></input>
                            {errors.ticketID && <span className="form-text text-danger">Ingresar el Id del ticket</span>}
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">Descripción</label>
                            <input {...register('description', { required: true })} defaultValue={currentIncident.description} className="form-control" id="description"></input>
                            {errors.description && <span className="form-text text-danger">Ingresar descripción del ticket</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Asignar departamento</label>
                            <select defaultValue={currentIncident.department} {...register("department")} className="form-select" aria-label="select department">
                                <option value="Finanzas">Finanzas</option>
                                <option value="Contabilidad">Contabilidad</option>
                                <option value="Desarrollo">Desarrollo</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="agent" className="form-label">Agente a cargo</label>
                            <input {...register('agent', { required: true })} defaultValue={currentIncident.agent} className="form-control" id="agent"></input>
                            {errors.agent && <span className="form-text text-danger">Ingresar Agente a cargo del ticket</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Estado del ticket</label>
                            <select defaultValue={currentIncident.status} {...register("status")} className={currentIncident.status === 'Resuelto' ? "form-select-success" : "form-select-warning"} aria-label="select status">
                                <option value="Resuelto">Resuelto</option>
                                <option value="enProceso">En Proceso</option>
                                <option value="Pendiente">Pendiente</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-info">
                            Update
                        </input>
                    </form>
                </div>
            ) : (
                <div>
                    <br />
                    <p className="form-label">Did not Selected Incident</p>
                </div>
            )}
        </div>
    );
};

export default Incident;