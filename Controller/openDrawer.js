const usb = require('usb');

const openDrawer = async(req, res) => {

    try {
        // Constants for ESC/POS commands
        const ESC = '\x1B';
        const OPEN_DRAWER = ESC + 'p\x00\x10\xFF';  // m=0, t1=10, t2=255

        // Find the thermal printer (you might need to provide the right idVendor and idProduct)
        let dev = usb.findByIds(0x0fe6, 0x811e);  // Replace with your vendor and product IDs


        if (!dev) {
            console.error('Device not found');
            return res.status(404).send('Device not found');
        }

        dev.open();


        let interface = dev.interfaces[0];

        // Detach kernel driver if active
        if (interface.isKernelDriverActive()) {
            interface.detachKernelDriver();
        }

        interface.claim();


        let endpoint = interface.endpoints[1];  // Usually the first endpoint is the one you want, but verify

        // Print and then open the drawer
        endpoint.transfer(Buffer.from(OPEN_DRAWER, 'ascii'), (err) => {
            if (err) {
                console.error('Error opening drawer:', err);
            } else {
                console.log('Drawer opened successfully');
            }

            interface.release(true, (releaseErr) => {
                if (releaseErr) {
                    console.error('Error releasing interface:', releaseErr);
                }

                dev.close();
            });
        });

        res.send('Drawer opened successfully');
    } catch (error) {
        console.log(error);
        res.send('Error: ' + error);
    }
}

module.exports = { openDrawer };