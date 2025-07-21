import { Button } from "flowbite-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { doFectch } from "./lib/network/Api";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";
import { SellerForm } from "./components/SellerForm";

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
        <SellerForm
          isEditMode={isEditMode}
          updateSeller={updateSeller}
          saveSeller={saveSeller}
          seller={seller}
          handleChange={handleChange}
          isLoading={isLoading}
          cancelEdit={cancelEdit}
        />
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
