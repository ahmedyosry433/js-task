

// async function getAdhanTime() { 

//     let url = "https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt";

//     try {
//         let response = await fetch(url, {
//             method: "GET",
//         });
//         if (response.ok) {
            
//             let data = await response.json();
//             let date = document.querySelector(".date-time");
//             date.textContent = data.data.date.readable;
            
//             let hajry = document.querySelector(".hajry-date");
//             hajry.textContent = data.data.date.hijri.date;

//             let counter = document.querySelector(".country");
//             counter.textContent = data.data.meta.timezone;

//             let parent = document.querySelector(".prayer-time");
//             parent.innerHTML = `
               
//                 <div class="fs-2 p-2">
//                     <p class =" prayer d-flex justify-content-between align-items-center  p-3 rounded mt-2 mb-2 bg-white">Fajr <span>${data.data.timings.Fajr}</span></p>
//                     <p class =" prayer d-flex justify-content-between align-items-center p-3 rounded mt-2 mb-2 bg-white">Sunrise <span>${data.data.timings.Sunrise}</span></p>
//                     <p class =" prayer d-flex justify-content-between align-items-center p-3 rounded mt-2 mb-2 bg-white">Dhuhr <span>${data.data.timings.Dhuhr}</span></p>
//                     <p class =" prayer d-flex justify-content-between align-items-center p-3 rounded mt-2 mb-2 bg-white">Asr <span>${data.data.timings.Asr}</span></p>
//                     <p class =" prayer d-flex justify-content-between align-items-center p-3 rounded mt-2 mb-2 bg-white">Maghrib <span>${data.data.timings.Maghrib}</span></p>
//                     <p class =" prayer d-flex justify-content-between align-items-center p-3 rounded mt-2 mb-2 bg-white">Isha <span>${data.data.timings.Isha}</span></p>
//                 </div>
         
//             `;
           
//         }
//     } catch (e) {
//         console.error(`Error fetching data:${e.message}`);
//     }
    
// }
//  getAdhanTime();





async function getAdhanTime(city, country) { 

    let url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`;

    try {
        let response = await fetch(url, {
            method: "GET",
        });
        if (response.ok) {
            
            let data = await response.json();
            let date = document.querySelector(".date-time");
            date.textContent = data.data.date.readable;
            
            let hajry = document.querySelector(".hajry-date");
            hajry.textContent = data.data.date.hijri.date;

            let counter = document.querySelector(".country");
            counter.textContent = data.data.meta.timezone;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const now = new Date();
            const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

/////////////////////////////////FILLTER Prayer///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const requiredPrayers = ["Fajr","Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

            let fillterPrayers = Object.entries(data.data.timings).filter(([prayer]) =>
                requiredPrayers.includes(prayer)
            );
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const prayerTimes = fillterPrayers.map(([prayer, time]) => {
                const [hours, minutes] = time.split(":").map(Number);
                const totalMinutes = hours * 60 + minutes; // Prayer time in minutes
                return { prayer, time, totalMinutes };
            });

            // Find the next prayer
            const nextPrayer = prayerTimes.find(pt => pt.totalMinutes > currentTime) || prayerTimes[0];

            // Generate HTML with the highlight for the upcoming prayer
            const prayerTimesHTML = prayerTimes
                .map(
                    ({ prayer, time }) => `
                    <p class="prayer d-flex justify-content-between align-items-center p-3 rounded mt-2 mb-2 ${
                        nextPrayer.prayer === prayer ? "bg-warning" : "bg-white"
                    }">
                        ${prayer} <span>${time}</span>
                    </p>`
                )
                .join("");

    // Update the prayer times in the DOM
            document.querySelector(".prayer-time").innerHTML = `<div class="fs-3 p-2">${prayerTimesHTML}</div>`;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
           
        }
    } catch (e) {
        console.error(`Error fetching data:${e.message}`);
    }
    
}

 getAdhanTime("Cairo" , "Egypt");







 