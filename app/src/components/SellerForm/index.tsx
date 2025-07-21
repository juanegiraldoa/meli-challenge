import { Button } from "flowbite-react";
import { Form } from "../Form";
import { InputField } from "../InputField";
import { SelectField } from "../SelectField";

export function SellerForm({
  isEditMode,
  updateSeller,
  saveSeller,
  seller,
  handleChange,
  isLoading,
  cancelEdit,
}: any) {
  return (
    <Form
      className="flex w-6/12 flex-col gap-2"
      onSubmit={isEditMode ? updateSeller : saveSeller}
    >
      <InputField
        label="Title"
        name="title"
        onChange={handleChange}
        value={seller.title}
        required
      />
      <InputField
        label="Site"
        name="site"
        required
        onChange={handleChange}
        value={seller.site}
      />
      <InputField
        label="Nickname"
        name="nickname"
        required
        value={seller.nickname}
        onChange={handleChange}
      />
      <InputField
        label="Price"
        name="price"
        required
        type="number"
        value={seller.price}
        onChange={handleChange}
      />
      <SelectField
        label="Currency"
        name="currency"
        id="currency"
        required
        value={seller.currency}
        options={[
          { label: "COP", value: "COP" },
          { label: "USD", value: "USD" },
          { label: "EUR", value: "EUR" },
        ]}
        onChange={handleChange}
      />
      <Button type="submit" disabled={isLoading}>
        Guardar
      </Button>
      {isEditMode && (
        <Button onClick={cancelEdit} disabled={isLoading}>
          Cancelar
        </Button>
      )}
    </Form>
  );
}
