import { Ifotos } from "@/context/context"

interface CardProps extends Ifotos{

}

export const Card:React.FC<CardProps> =(fotos:CardProps)=>{
        return(
                <div>
                    <h1>
                    {fotos.title}
                    </h1>
                    <h3>
                        {fotos.history}
                    </h3>
                    <h2>
                        {fotos.category?.name}
                    </h2>
                    <div>
                        {fotos.createdAt}
                    </div>
                </div>
        )
}