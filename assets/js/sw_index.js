// Register service worker
function registerServiceWorker(){
    navigator.serviceWorker
        .register("./sw.js")
        .then(registration => {
            console.log(
                "ServiceWorker: Pendaftaran berhasil. Scope:",
                registration.scope
            );
        })
        .catch (error => {
            console.error("ServiceWorker: Pendaftaran gagal. Error:", error);
        });
}

/* tambahkan kode untuk berlangganan pesan push melalui objek PushManager */
function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }

            navigator.serviceWorker.ready.then(() => {    
                if (('PushManager' in window)) {        
                    navigator.serviceWorker.getRegistration().then((registration) => {            
                        registration.pushManager.subscribe({                            
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BJeg7EigBUWeY6dUaS5KZwy1ByPbkpLYnO9IC3IdBWDYcn1arJZUQWN7FIvJI1Av6E9Kw7WC1D7WJjng3KRcGu8")
                    }).then(subscribe=> {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch( e => {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
              }
            })
          });
        }
      }

/* fungsi ini tulis di dalam tag <script> index.html, untuk mengubah string menjadi Uint8Array */
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const pushNotification = msg => {
    const title = 'Liga Calcio Serie A';
    const options = {
        body: msg,
        image: './assets/images/logo.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}


export { registerServiceWorker, requestPermission , pushNotification};
