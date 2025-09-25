import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import NewUserForm from "../../components/users/NewUserForm";
import {
  fetchUsers,
  deleteUserRemote,
} from "../../services/remote";
import type { User } from "../../types";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchUsers();
        setUsers(list);
      } catch (e) {
        setErr((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
    document.title = "Users | App";
  }, []);

  async function onDelete(id: number) {
    if (!confirm("Silinsin mi?")) return;
    try {
      await deleteUserRemote(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      alert((e as Error).message);
    }
  }

  return (
    <main id="main" className="container">
      <section className="panel" aria-labelledby="users-title">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 id="users-title">Kullanıcılar</h2>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setEditingUser(null);
              setOpenModal(true);
            }}
          >
            + Yeni Kullanıcı
          </Button>
        </div>

        <div className="table-wrap" style={{ marginTop: 12 }}>
          <table className="table--stack" aria-label="Kullanıcı tablosu">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Kullanıcı Adı</th>
                <th>E-posta</th>
                <th>Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="empty">
                    Yükleniyor…
                  </td>
                </tr>
              )}
              {err && !loading && (
                <tr>
                  <td colSpan={5} className="empty">
                    {err}
                  </td>
                </tr>
              )}
              {!loading &&
                !err &&
                users.map((u) => (
                  <tr key={u.id}>
                    <td data-label="ID">{u.id}</td>
                    <td data-label="Ad">{u.name}</td>
                    <td data-label="Kullanıcı Adı">{u.username}</td>
                    <td data-label="E-posta">{u.email}</td>
                    <td data-label="Aksiyon">
                      <Button
                        type="button"
                        onClick={() => {
                          setEditingUser(u);
                          setOpenModal(true);
                        }}
                      >
                        Düzenle
                      </Button>{" "}
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => onDelete(u.id)}
                      >
                        Sil
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
  open={openModal}
  onClose={() => { setOpenModal(false); setEditingUser(null); }}
  title={editingUser ? "Kullanıcı Güncelle" : "Yeni Kullanıcı"}
>
  <NewUserForm
    initial={editingUser}
    onDone={(saved) => {
      if (editingUser) {
        setUsers(prev => prev.map(u => u.id === saved.id ? saved : u)); // update
      } 
      else {
        setUsers(prev => [...prev, saved]); // create
      }
      setEditingUser(null);
      setOpenModal(false);
    }}
  />
</Modal>

    </main>
  );
}
