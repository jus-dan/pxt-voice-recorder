//% weight=0 color=#b9a0e6 icon="\uf001" block="MP3 PRO-Player"
namespace DFPlayerPro {
    
    let MP3_tx = SerialPin.P1
    let MP3_rx = SerialPin.P2

    /**
     * 
     * 
     */
    export function testConnection(): string{
        return "Hello World"
    }

    /**
     * @param pinRX to pinRX ,eg: SerialPin.P2
     * @param pinTX to pinTX ,eg: SerialPin.P1
    */
    //% blockId="DFPlayerPro_setSerial" block="set DFPlayer PRO RX to %pinTX| TX to %pinRX"
    //% weight=100 blockGap=20
    export function setSerial(pinTX: SerialPin, pinRX: SerialPin): void {
        MP3_tx = pinTX;
        MP3_rx = pinRX;
        serial.redirect(
            MP3_tx,
            MP3_rx,
            BaudRate.BaudRate115200
        )
        basic.pause(100)
    }
}
