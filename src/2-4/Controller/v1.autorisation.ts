// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import Todo from "../Models/todo.js";
import { log } from "../utils/function.js";
import { create } from "domain";

// Global Config
export const login = async function (_req: Request, res: Response) {
  try {
    res.status(200)
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
  }
};

export const logout = async function (_req: Request, res: Response) {
  try {
    res.status(200)
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
  }
};

export const register = async function (_req: Request, res: Response) {
  try {
    res.status(200)
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
  }
};
