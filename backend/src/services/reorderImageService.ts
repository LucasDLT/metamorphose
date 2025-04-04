import {Image} from "../models/image"
import {AppDataSource} from "../config/data-source"

export const swapCategoryOrder = async (id1: number, id2:number):Promise<Image[]>=>{
    const imageRepository = AppDataSource.getRepository(Image)
    const image1 = await imageRepository.findOne({where:{id:id1}})
    const image2 = await imageRepository.findOne({where:{id:id2}})

    if (!image1 || !image2) {
        throw new Error("Una o ambas imagenes no se encontraron")
    }
    const tempOrder = image1.categoryOrder;
    image1.categoryOrder = image2.categoryOrder;
    image2.categoryOrder = tempOrder

    await imageRepository.save([image1, image2])

    return[image1, image2]
}

export const swapGlobalOrder = async (id1:number, id2:number):Promise<Image[]>=>{
    const imageRepository = AppDataSource.getRepository(Image)
    const image1 = await imageRepository.findOne({where:{id:id1}})
    const image2 = await imageRepository.findOne({where:{id:id2}})

    if (!image1 || !image2) {
        throw new Error("Una o ambas imagenes no se encontraron")
    }

    const tempOrder = image1.globalOrder;
    image1.globalOrder = image2.globalOrder;
    image2.globalOrder = tempOrder
    await imageRepository.save([image1, image2])

    return imageRepository.find()
}