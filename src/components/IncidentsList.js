import React, { useState } from "react";
import { useList } from "react-firebase-hooks/database";
import IncidentDataService from "../services/IncidentService";
import Incident from "./Incident";

const IncidentsList = () => {
  const [currentIncident, setCurrentIncident] = useState(null);
  const [editar, setEditar] = useState(false);

  /* use react-firebase-hooks */
  const [incidents, loading, error] = useList(IncidentDataService.getAll());

  const setActiveIncident = (incident) => {
    const { ticketID, description, department, agent, status } = incident.val();

    setCurrentIncident({
      key: incident.key,
      ticketID,
      description,
      department,
      agent,
      status,
    });
    setEditar(!editar);
  };
  const deleteIncident = (key) => {
    IncidentDataService.remove(key)
        .then(() => {
            //confirm remove
        })
        .catch((e) => {
            console.log(e);
        });
};

  return (
    <div className="list row">
      <div className="col-md-12">
        <h4>Lista de Tickets de Incidentes</h4>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Despcription</th>
              <th>Department</th>
              <th>Agent</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {error && <span>error</span>}
            {!loading &&
              incidents &&
              incidents.map((incident) => (
                <>
                  <tr key={incident.key}>
                    <td>{incident.val().ticketID}</td>
                    <td>{incident.val().description}</td>
                    <td>{incident.val().department}</td>
                    <td>{incident.val().agent}</td>
                    <td>{incident.val().status}</td>
                    <td>
                      <button className="btn btn-primary"  onClick={() => setActiveIncident(incident)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => deleteIncident(incident.key)}>Eliminar</button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>

        {currentIncident?
          (
            <Incident incident={currentIncident}/>
          ) : ""}
        
      </div>
    </div>
  );
}

export default IncidentsList;