# ALPODEC PRO — Deviz importat și urmărirea execuției

Status: cerință aprobată pentru implementare; NU este încă funcțională în interfața publicată.

## Import deviz
- PDF, XLSX, XLS; upload cu previzualizare și validare manuală a extragerii (OCR doar dacă PDF este scanat).
- Mapare articole: cod, descriere, UM, cantitate contractată, preț unitar, valoare, capitol.
- Asociază obligatoriu șantierului și opțional unuia sau mai multor centre de cost; utilizatorul poate crea un centru nou.
- Importul nu suprascrie automat devize existente; păstrează versiuni și sursa originală.

## Situații de lucrări și măsurători
- Fiecare situație are dată, număr, perioadă, articole, cantități din măsurători și status (ciornă, aprobată, facturată).
- Evidență cantitate cumulată executată și rămasă per articol; diferența față de contract; marcarea depășirilor.
- Situațiile cumulative nu se însumează ca situații de perioadă; previne dublarea cantităților.
- Lucrări suplimentare și revizii contractuale cu aprobare, istoric și trasabilitate.

## Financiare
- Valoare contract curentă = deviz aprobat + acte adiționale aprobate.
- Valoare executată = sumă cantități acceptate × prețuri unitare contractuale, cu tratament explicit pentru lucrări suplimentare.
- Valoare rămasă de executat = valoare contract curentă − executat (separat pentru depășiri).
- Valoare facturată și încasată sunt indicatori separați; încasările sunt legate de facturi sau contract și pot fi parțiale.
- Rest de încasat din contract = valoare contract curentă − încasări; creanță facturată restantă = facturat − încasat alocat; executat nefacturat = executat acceptat − facturat pentru lucrări.
- TVA, rețineri de garanție, avansuri, ajustări și moneda trebuie modelate explicit, nu presupuse.

## Dashboard
- Progres fizic pe articole (cantitate), progres valoric (executat / contract), facturat, încasat, rămas de executat, rămas de încasat.
- Filtre șantier, centru de cost, capitol, perioadă; drill-down până la măsurători, situații, facturi.
- Export fișă de evoluție PDF/Excel; evidență cronologică a modificărilor.

## Criterii de acceptare
1. Import Excel/PDF și confirmare corecții înainte de salvare.
2. Deviz asociat șantierului și centrului de cost.
3. Două situații succesive calculează corect cumulul fără dublare.
4. Plată parțială nu schimbă progresul fizic și nu este confundată cu facturarea.
5. Situațiile și devizele revizuite păstrează istoricul și documentele sursă.
6. Date persistate în backend multi-tenant cu permisiuni; localStorage singur nu este acceptabil pentru versiunea comercială.
