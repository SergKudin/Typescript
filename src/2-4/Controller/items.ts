// External Dependencies
import express, { Request, Response } from "express";
import Todo from "../Models/todo.js";
import { deleteOneTodo, findOneTodo, getAllTodos, insertOneTodo, updateOneTodo } from "../services/data.service.js";

// processing requests to work with Todo
export const getAllItems = async function (req: Request, res: Response) {
  console.log(JSON.stringify(req.session));
  try {
    if (req.session.userID) {
      res.status(200).send(JSON.stringify({ items: await getAllTodos(req.session.userID) }));
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(500).send({ error: `${(err as Error).message}` });
  }
};

export const postItems = async function (req: Request, res: Response) {
  try {
    let newTodo = req.body as Todo;
    console.log(JSON.stringify(req.session));
    if (req.session.userID) {
      const chekTodo = await findOneTodo(req.session.userID, newTodo.text);
      if (!chekTodo) {
        newTodo.user = req.session.userID;
        if (!newTodo.checked) newTodo.checked = false;
        let result = await insertOneTodo(newTodo);
        let id = result.insertedId;
        res.status(201).send(JSON.stringify({ id: id }));
      } else {
        res.status(200).send(JSON.stringify({ id: chekTodo._id }));
      }
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
    console.error(err);
  }
};

export const putItems = async function (req: Request, res: Response) {
  try {
    console.log(JSON.stringify(req.session));
    if (req.session.userID) {
      let todo = req.body as Todo;
      const result = await updateOneTodo(req.session.userID, todo);
      result
        ? res.status(200).send(JSON.stringify({ ok: true }))
        : res.status(304).send(JSON.stringify({ error: 'Not Modified' }));
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
    console.error(err);
  }
};

export const delItems = async function (req: Request, res: Response) {
  try {
    console.log(JSON.stringify(req.session));
    if (req.session.userID) {
      const result = await deleteOneTodo(req.session.userID, req.body.id);
      if (result && result.deletedCount) {
        res.status(202).send(JSON.stringify({ ok: true }));
      } else if (!result) {
        res.status(400).send(JSON.stringify({ error: 'Not deleted' }));
      } else if (!result.deletedCount) {
        res.status(404).send(JSON.stringify({ error: 'Not found' }));
      }
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
    console.error(err);
  }
};
