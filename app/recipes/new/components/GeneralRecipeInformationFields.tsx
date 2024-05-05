import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { putFirstLetterCapital } from "@/lib/utils/string.utils";
import { ICategory } from "@/validators/category";
import { IngredientSchema } from "@/validators/recipe/ingredient.validator";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import RecipeCategoriesSelectField, {
  RecipeCategorySelectFieldSchema,
} from "./RecipeCategoriesSelectField";

const IngredientsListFields = dynamic(() => import("./IngredientsListFields"));

type GeneralRecipeInformationFieldsProps = {
  categories: ICategory[];
};

export const GeneralRecipeInformationFieldsSchema = z
  .object({
    title: z.coerce
      .string({ required_error: "Requis." })
      .min(1, { message: "Le nom doit être renseigné." })
      .transform(putFirstLetterCapital),
    labels: z.array(z.coerce.string().nullable()),
    numberOfPersons: z.coerce.number().optional().nullable(),
    preparationTime: z.coerce
      .string()
      .regex(new RegExp("^[0-9]*$"), {
        message: "Le temps de préparation doit être un nombre.",
      })
      .optional()
      .nullable(),
    cookingTime: z.coerce
      .string()
      .regex(new RegExp("^[0-9]*$"), {
        message: "Le temps de cuisson doit être un nombre.",
      })
      .optional()
      .nullable(),
    ovenTemperature: z.coerce
      .string()
      .regex(new RegExp("^[0-9]*$"), {
        message: "La température du four doit être un nombre.",
      })
      .optional()
      .nullable(),
    ingredients: z.array(IngredientSchema).nullable(),
  })
  .merge(RecipeCategorySelectFieldSchema);

export type GeneralRecipeInformationFieldsValues = z.infer<
  typeof GeneralRecipeInformationFieldsSchema
>;

const GeneralRecipeInformationFields = ({
  categories,
}: GeneralRecipeInformationFieldsProps) => {
  const form = useFormContext<GeneralRecipeInformationFieldsValues>();

  const category = form.watch("category");

  const { errors } = form.formState;
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de la recette *</FormLabel>
            <FormControl>
              <Input type="text" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="w-1/2">
        <RecipeCategoriesSelectField categories={categories} />
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="numberOfPersons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de personnes</FormLabel>
                <FormControl>
                  <Input
                    max="20"
                    min="0"
                    placeholder=""
                    step="1"
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temps de préparation (en min)</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Temps de cuisson <br /> (en min)
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="ovenTemperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Température du four <br /> (en °)
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralRecipeInformationFields;
