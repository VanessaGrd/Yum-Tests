import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findCategoryById } from "@/database/categories/category.repository";
import { findRecipesByCategories } from "@/database/recipes/recipe.repository";
import connectToDatabase from "@/lib/mongodb";
import CategoryProvider from "@/context/category/provider";
import EditCategory from "./components/EditCategory";
import RecipeList from "./components/RecipeList";

type PageCategoryProps = {
  params: {
    category_id: string;
  };
};

const PageCategory = async ({ params }: PageCategoryProps) => {
  const { category_id } = params;

  await connectToDatabase();

  const category = await findCategoryById(category_id);

  const recipes = await findRecipesByCategories(category_id);

  return (
    <CategoryProvider category={category}>
      <div className="mx-auto flex w-full max-w-[1024px] flex-col p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>
                  <span className="block sm:inline">
                    Visualisez les recettes de la
                  </span>{" "}
                  catégorie {category.name}.
                </CardDescription>
              </div>
              <EditCategory currentCategory={category.name} />
            </div>
          </CardHeader>
          <RecipeList recipes={recipes} />
        </Card>
      </div>
    </CategoryProvider>
  );
};

export default PageCategory;
