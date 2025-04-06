import { useContext } from "react";
import { Context, ICategory } from "@/context/context";

interface IselectCategoryProps {
  onChange: (selectedCategory: ICategory | null) => void;
  style?: React.CSSProperties;
}

export const SelectCategory: React.FC<IselectCategoryProps> = ({
  onChange,
  style,
}) => {
  const { category } = useContext(Context);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName =
      event.target.value === "" ? null : event.target.value;
    const selectedCategory = category.find(
      (category) => category.name === selectedCategoryName
    );
    if (selectedCategory) {
      onChange(selectedCategory);
    }
  };

  return (
    <>
      <select
        name="selectCategory"
        id="selectCategory"
        onChange={handleChange}
        style={style}
      >
        <option value="">Categorias</option>
        {category.map((categoria: ICategory) => (
          <option key={categoria.id} className="bg-zinc-900 hover:bg-gray-700">
            {categoria.name}
          </option>
        ))}
      </select>
    </>
  );
};
