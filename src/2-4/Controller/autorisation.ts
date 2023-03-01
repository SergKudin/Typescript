// External Dependencies
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { collections } from "../services/database.service.js";

// Global Config
export const login = async function (req: Request, res: Response) {
  try {
    // { "login": "...", "pass": "..." }
    const { login, pass } = req.body;
    let collUser = collections.user;
    if (collUser === undefined) { throw new Error('no connect DB'); }
    const chekUser = await collUser.findOne({ autUser: login });
    if (chekUser) {
      const passCompareResult = bcrypt.compareSync(pass, chekUser.autPass);
      if (passCompareResult) {
        req.session.userID = login;
        res.status(200).send(JSON.stringify({ ok: true }));
      } else {
        res.status(401).send(JSON.stringify({ error: 'Error. Password is not correct' }));
      }
    } else {
      res.status(404).send(JSON.stringify({ error: 'Error. User is not found' }))
    }
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
  }
};

export const logout = async function (req: Request, res: Response) {
  try {
    req.session.destroy;
    delete req.session.userID;
    res.status(200).send(JSON.stringify({ ok: true }));
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
  }
};

export const register = async function (req: Request, res: Response) {
  try {
    const { login, pass } = req.body;
    let collUser = collections.user;
    if (collUser === undefined) { throw new Error('no connect DB'); }
    const chekUser = await collUser.findOne({ autUser: login });
    if (!chekUser) {
      const salt = bcrypt.genSaltSync(10);
      const result = await collUser.insertOne({ autUser: login, autPass: bcrypt.hashSync(pass, salt) });
      res.status(201).send(JSON.stringify({ ok: true }))
    } else {
      res.status(409).send(JSON.stringify({ error: 'Error. User exists' }))
    }
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
  }
};


