import { Request, Response } from "express";
import httpStatus from "http-status";
import { titleService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const deleteTitleHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    await titleService.deleteTitle(id);
    res.status(httpStatus.NO_CONTENT).send(); // No content after deletion
};

export const deleteTitleController = errorHandlerWrapper(deleteTitleHandler);
