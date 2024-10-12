import { Repository } from "typeorm";
import { AppDataSouce } from "../db";
import { TitleEntity } from "../entities";
import { CreateTitleType } from "../types";

export const createTitle = async (
  data: CreateTitleType
): Promise<TitleEntity> => {
  const titleRepository = AppDataSouce.getRepository(TitleEntity);
  const newTitle = titleRepository.create(data);
  await titleRepository.save(newTitle);

  return newTitle;
};

export const readTitle = async (uuid: string): Promise<TitleEntity[]> => {
  const titleRepository: Repository<TitleEntity> =
    AppDataSouce.getRepository(TitleEntity);

  return titleRepository.find({
    where: {
      userId: {
        uuid,
      },
    },
  });
};

export const deleteTitle = async (uuid: string): Promise<{ success: boolean; uuid: string }> => {
  const titleRepository: Repository<TitleEntity> =
    AppDataSouce.getRepository(TitleEntity);

  // Find the title by its uuid
  const title = await titleRepository.findOne({
    where: {
      uuid,
    },
  });

  if (!title) {
    throw new Error('Title not found');
  }

  // Remove the found title from the database
  await titleRepository.remove(title);

  // Return success true and the uuid
  return { success: true, uuid };
};
