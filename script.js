const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMXPgT2QojHMsH3RmWxsH5f2pSpYvMPS8o2kZgzEJQ141oj_Mt1pI8HeuNO_UKXH5vTB_AsTwpzelP/pub?gid=0&single=true&output=csv";

let siswaData = {};

// Load CSV → simpan ke objek
fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {
    const rows = text.split("\n").map(r => r.split(","));
    rows.slice(1).forEach(r => {
      const nomor = r[0]?.trim();
      const nama = r[1]?.trim();
      const kelas = r[2]?.trim();
      if (nomor) siswaData[nomor] = { nama, kelas };
    });
  });

// Saat nomor ujian selesai diketik
document.getElementById("noUjian").addEventListener("input", () => {
  const no = document.getElementById("noUjian").value.trim();
  if (siswaData[no]) {
    document.getElementById("nama").value = siswaData[no].nama;
    document.getElementById("kelas").value = siswaData[no].kelas;
  }
});

// Submit → redirect ke Google Form prefill
function submitForm() {
  const no = document.getElementById("noUjian").value.trim();
  const nama = document.getElementById("nama").value;
  const kelas = document.getElementById("kelas").value;
  const waktu = new Date().toLocaleTimeString("id-ID", {hour: '2-digit', minute:'2-digit'});

  const ket = document.querySelector('input[name="ket"]:checked')?.value;
  if (!ket) return alert("Pilih keterangan!");

  const url =
    "https://docs.google.com/forms/d/e/1FAIpQLSdO9Y2B63WggJqznkfa42loBNY1R4YPOyRlg_4nWDk3u0kaHQ/formResponse" +
    `?entry.1749392653=${encodeURIComponent(no)}` +
    `&entry.654442501=${encodeURIComponent(nama)}` +
    `&entry.1848626470=${encodeURIComponent(kelas)}` +
    `&entry.871942555=${encodeURIComponent(waktu)}` +
    `&entry.2057027565=${encodeURIComponent(ket)}` +
    "&submit=Submit";

  window.location.href = url;
}
