import { useSearchParams } from "react-router-dom";

const SubCatagories = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id"); // Get ID from query params

  return <h1>Subcategory Page for ID: {categoryId}</h1>;
};

export default SubCatagories;
