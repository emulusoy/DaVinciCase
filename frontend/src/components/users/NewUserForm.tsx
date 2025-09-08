import { useEffect, useState } from 'react';

import { createUserRemote, updateUserRemote } from '../../services/remote';
import type { User } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';

type Props = {
  initial?: User | null;
  onDone: (u: User) => void;
};

export default function NewUserForm({ initial, onDone }: Props) {
  const [form, setForm] = useState({ name: '', username: '', email: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({ name: initial.name, username: initial.username, email: initial.email });
    } else {
      setForm({ name: '', username: '', email: '' });
    }
  }, [initial]);

  function validate() {
    if (!form.name || !form.username || !form.email) {
      setError('Tüm alanlar zorunlu');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Geçerli e-posta girin');
      return false;
    }
    setError('');
    return true;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      let saved: User;
      if (initial) {
        //UPDATE
        saved = await updateUserRemote(initial.id, {
          name: form.name,
          username: form.username,
          email: form.email
        });
      } else {
        // CREATE
        saved = await createUserRemote({
          name: form.name,
          username: form.username,
          email: form.email
        });
      }
      onDone(saved);
    } catch (err) {
      setError((err as Error).message || 'İşlem başarısız');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display:'grid', gap:12 }}>
      <div>
        <label className="label" htmlFor="name">Ad Soyad</label>
        <Input id="name" value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })} placeholder="Ad Soyad" />
      </div>
      <div>
        <label className="label" htmlFor="username">Kullanıcı Adı</label>
        <Input id="username" value={form.username} onChange={e=>setForm({ ...form, username: e.target.value })} placeholder="@kullanici" />
      </div>
      <div>
        <label className="label" htmlFor="email">E-posta</label>
        <Input id="email" type="email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} placeholder="mail@ornek.com" />
      </div>
      {error && <div role="alert" className="empty">{error}</div>}
      <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
        <Button type="submit" variant="primary" disabled={busy}>
          {initial ? 'Güncelle' : 'Ekle'}
        </Button>
      </div>
    </form>
  );
}
