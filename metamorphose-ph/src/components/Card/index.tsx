import { Ifotos } from "@/context/context";
interface CardProps extends Ifotos {
  handleDelete?: () => void;
  handleUpdate?: () => void;
}

export const Card: React.FC<CardProps> = (fotos: CardProps) => {
  const { url, title, history, category, createdAt, active, handleDelete, handleUpdate } = fotos;

  return (
    <div>
      <div>
        <img src={url} alt={title} />
      </div>
      <div>
        <h1>{title}</h1>
        <h3>{history}</h3>
        <h2>{category?.name}</h2>
        <h2>{createdAt}</h2>
        <h2>
          {active} esto tiene que ser un boton para que visible o invisible la
          imagen
        </h2>
      </div>
      <button onClick={handleDelete}>eliminar</button>
      <button onClick={handleUpdate}>editar</button>
    </div>
  );
};
