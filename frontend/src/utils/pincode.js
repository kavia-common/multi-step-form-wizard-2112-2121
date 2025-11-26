 // PUBLIC_INTERFACE
 export async function lookupPincode(pincode) {
   /** Lookup a pincode and return { district, taluk } or null if not found.
    * Uses a small local dataset first; if not found and pincode looks Indian (6 digits),
    * attempts a lightweight public API fetch without API keys. Errors are swallowed gracefully.
    */
   const code = String(pincode || '').replace(/\D/g, '');
   if (!code) return null;

   // Local dataset samples (extensible)
   const LOCAL = {
     // India samples
     '560001': { district: 'Bengaluru Urban', taluk: 'Bengaluru North' },
     '560002': { district: 'Bengaluru Urban', taluk: 'Bengaluru South' },
     '600001': { district: 'Chennai', taluk: 'Chennai' },
     '682001': { district: 'Ernakulam', taluk: 'Kochi' },
     '110001': { district: 'New Delhi', taluk: 'New Delhi' },
     // Generic samples for other countries if needed
     '90001': { district: 'Los Angeles', taluk: 'Los Angeles' },
     '10001': { district: 'New York', taluk: 'Manhattan' },
   };

   if (LOCAL[code]) {
     return { ...LOCAL[code] };
   }

   // Optional: lightweight public API (India Postal Pincode)
   // Only try if 6-digit number; avoid env keys. Handle errors silently.
   if (/^\d{6}$/.test(code)) {
     try {
       const resp = await fetch(`https://api.postalpincode.in/pincode/${code}`, { method: 'GET' });
       if (!resp.ok) throw new Error('network');
       const data = await resp.json();
       if (Array.isArray(data) && data[0]?.Status === 'Success') {
         const office = data[0]?.PostOffice?.[0];
         if (office) {
           const district = office.District || office.Division || '';
           const taluk = office.Block || office.Taluk || office.Region || '';
           if (district || taluk) {
             return {
               district: district || '',
               taluk: taluk || '',
             };
           }
         }
       }
     } catch {
       // ignore; fall through to null
     }
   }

   return null;
 }
