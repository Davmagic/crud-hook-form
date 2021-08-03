import fb from "../firebase";

const db = fb.ref("incidents");

const getAll = () => {
    return db;
}
const create = (data) => {
    return db.push(data);
}
const update = (key, data) => {
    return db.child(key).update(data);
}
const remove = (key) => {
    return db.child(key).remove();
}
const removeAll = () => {
    return db.remove();
}

const IncidentService = {
    getAll,
    create,
    update,
    remove,
    removeAll,
}

export default IncidentService;