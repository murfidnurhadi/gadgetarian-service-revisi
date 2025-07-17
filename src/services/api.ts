const API_BASE = "http://localhost:3000";

export async function getTeknisi() {
  const res = await fetch(`${API_BASE}/teknisi`);
  if (!res.ok) throw new Error("Gagal mengambil data teknisi");
  return res.json();
}

export async function addTeknisi(data: {
  kode_teknisi: string;
  nama_teknisi: string;
  nomor_telepon: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/teknisi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
