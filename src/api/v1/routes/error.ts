import express, { Request, Response, NextFunction } from "express";

import Debug from "debug";
const debug = Debug("server:debug");

// Error handler
const errorHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("404 not found.");

  res.status(404).json({
    message: error.message
  });
  debug("404 not found message sent.");
};

export default errorHandler;
