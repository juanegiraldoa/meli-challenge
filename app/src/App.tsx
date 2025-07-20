import { Button } from "flowbite-react";
import { InputField } from "./components/InputField";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { doFectch } from "./lib/network/Api";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { SelectField } from "./components/SelectField";
import { Modal } from "./components/Modal";

export default function App() {
  const [seller, setSeller] = useState<Record<string, any>>({});
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [sellers, setSellers] = useState([]);
  const [modal, setModal] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getSellers();
  }, []);

  const getSellers = useCallback(async () => {
    setLoading(true);
    const { data } = await doFectch({ endpoint: "seller", method: "GET" });
    setSellers(data);
    setLoading(false);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditMode(false);
    setSeller({});
  }, []);

  const openModal = useCallback((message: string) => {
    setModal((m: any) => ({ ...m, open: true, message }));
  }, []);

  const saveSeller = useCallback(
    async (body: Record<string, any>) => {
      setLoading(true);
      const { data = {}, message = "" } = await doFectch({
        endpoint: "seller",
        method: "POST",
        body: body,
      });
      setLoading(false);
      const { id } = data;
      if (id) {
        setSeller({});
        getSellers();
      } else openModal(message);
    },
    [openModal],
  );

  const updateSeller = useCallback(async () => {
    setLoading(true);
    const { data = {}, message = "" } = await doFectch({
      endpoint: "seller",
      method: "PUT",
      body: seller,
    });
    setLoading(false);
    const { id } = data;
    if (id) {
      cancelEdit();
      getSellers();
    } else openModal(message);
  }, [isEditMode, seller, openModal]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setSeller((s) => ({ ...s, [name]: value }));
    },
    [],
  );

  const setEdit = useCallback((seller: Record<string, any>) => {
    setSeller(seller);
    setEditMode(true);
  }, []);

  const tableDetails = useMemo(
    () =>
      sellers.map((s: any) => ({
        ...s,
        actions: <Button onClick={() => setEdit(s)}>Edit</Button>,
      })),
    [sellers, setEdit],
  );

  const closeModal = useCallback(() => {
    setModal((m: any) => ({ ...m, open: false }));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Modal open={modal.open} onClose={closeModal} title="Error">
        <p>{modal.message}</p>
      </Modal>
      <div className="top-0 flex h-[100vh] w-full gap-4 p-8">
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
        <div className="w-6/12">
          <Table
            headers={[
              { title: "Title", key: "title" },
              { title: "Site", key: "site" },
              { title: "Nickname", key: "nickname" },
              { title: "Price", key: "price" },
              { title: "Currency", key: "currency" },
              { title: "Actions", key: "actions" },
            ]}
            details={tableDetails}
          />
        </div>
      </div>
    </main>
  );
}
