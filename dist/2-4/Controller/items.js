import { deleteOneTodo, findOneTodo, getAllTodos, insertOneTodo, updateOneTodo } from "../services/data.service.js";
export const getAllItems = async function (req, res) {
    try {
        if (req.session.userID) {
            res.status(200).send(JSON.stringify({ items: await getAllTodos(req.session.userID) }));
        }
        else {
            res.status(404).send({ error: 'forbidden' });
        }
    }
    catch (err) {
        res.status(500).send({ error: `${err.message}` });
    }
};
export const postItems = async function (req, res) {
    try {
        let newTodo = req.body;
        if (req.session.userID) {
            const chekTodo = await findOneTodo(req.session.userID, newTodo.text);
            if (!chekTodo) {
                newTodo.user = req.session.userID;
                if (!newTodo.checked)
                    newTodo.checked = false;
                let result = await insertOneTodo(newTodo);
                let id = result.insertedId;
                res.status(201).send(JSON.stringify({ id: id }));
            }
            else {
                res.status(200).send(JSON.stringify({ id: chekTodo._id }));
            }
        }
        else {
            res.status(404).send({ error: 'forbidden' });
        }
    }
    catch (err) {
        res.status(400).send({ error: `${err.message}` });
        console.error(err);
    }
};
export const putItems = async function (req, res) {
    try {
        if (req.session.userID) {
            let todo = req.body;
            const result = await updateOneTodo(req.session.userID, todo);
            result
                ? res.status(200).send(JSON.stringify({ ok: true }))
                : res.status(304).send(JSON.stringify({ error: 'Not Modified' }));
        }
        else {
            res.status(404).send({ error: 'forbidden' });
        }
    }
    catch (err) {
        res.status(400).send({ error: `${err.message}` });
        console.error(err);
    }
};
export const delItems = async function (req, res) {
    try {
        if (req.session.userID) {
            const result = await deleteOneTodo(req.session.userID, req.body.id);
            if (result && result.deletedCount) {
                res.status(202).send(JSON.stringify({ ok: true }));
            }
            else if (!result) {
                res.status(400).send(JSON.stringify({ error: 'Not deleted' }));
            }
            else if (!result.deletedCount) {
                res.status(404).send(JSON.stringify({ error: 'Not found' }));
            }
        }
        else {
            res.status(404).send({ error: 'forbidden' });
        }
    }
    catch (err) {
        res.status(400).send({ error: `${err.message}` });
        console.error(err);
    }
};
//# sourceMappingURL=items.js.map